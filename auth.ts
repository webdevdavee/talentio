import NextAuth from "next-auth";
import authConfig from "./auth.config";
import credentials from "next-auth/providers/credentials";
import { AuthSignInFormSchema } from "./lib/zod/authZod";
import { OauthUserLogin, findByEmail } from "./database/actions/user.action";
import bcrypt from "bcryptjs";
import google from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "./lib/db";
import { Adapter } from "next-auth/adapters";
import { handleError } from "./lib/utils";
import foursquare from "next-auth/providers/foursquare";
import User from "./database/models/user.model";
import { connectToDatabase } from "./database";

export const {
  auth,
  handlers: { GET, POST },
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  adapter: MongoDBAdapter(clientPromise) as Adapter,
  providers: [
    google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    credentials({
      async authorize(credentials) {
        const validateCredentials = AuthSignInFormSchema.safeParse(credentials);
        if (validateCredentials.success) {
          const { email, password } = validateCredentials.data;

          // Find if a user in the database has the same email with the email in the validateCredentials email
          const user = await findByEmail(email);
          if (!user || !user.password) return null;
          // Then match the passwords
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (passwordMatch) {
            return user;
          } else {
            throw new Error("Incorrect password.");
          }
        } else {
          throw new Error("Invalid credentials.");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const existingUser = await findByEmail(user.email as string);
        if (!existingUser) return token;
        token.accountType = existingUser.accountType;
        token.id = existingUser._id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.accountType = token.accountType;
        session.user.id = token.id;
      }
      return session;
    },
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          await OauthUserLogin({ ...user, emailVerified: true });
        } catch (error: any) {
          handleError(error);
          return false;
        }
      }
      return true;
    },
  },
  session: { strategy: "jwt" },
});
