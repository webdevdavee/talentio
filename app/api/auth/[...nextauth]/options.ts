import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { findUser } from "@/database/actions/user.action";
import * as bcrypt from "bcrypt";
import { handleError } from "@/lib/utils";

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      profile(profile) {
        console.log("Profile Google: ", profile);

        let userRole = "user";
        if (profile?.email === "anayookpala26@gmail.com") {
          userRole = "admin";
        }

        return {
          ...profile,
          id: profile.sub,
          role: userRole,
        };
      },
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        try {
          const user: any = await findUser({ email: credentials?.email });
          if (!credentials) throw new Error("All fields are required.");
          if (user && credentials) {
            console.log("User exists.");
            const passwordMatch = await bcrypt.compare(
              credentials.password,
              user.password
            );
            if (passwordMatch) {
              console.log("Password match.");
              return user;
            } else {
              throw new Error("Incorrect password.");
            }
          }
        } catch (error: any) {
          handleError(error);
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      if (session.user) session.user.role = token.role;
      return session;
    },
  },
};
