import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { createUser, findUser } from "@/database/actions/user.action";
import * as bcrypt from "bcrypt";
import { handleError } from "@/lib/utils";

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      profile(profile) {
        const updatedProfile = {
          ...profile,
          id: profile.sub,
          accountType: "individual",
        };

        // Create user from OAuth provider
        const newUser = {
          firstname: updatedProfile.given_name,
          lastname: updatedProfile.family_name,
          username: `${updatedProfile.given_name}${updatedProfile.family_name}`,
          email: updatedProfile.email,
          photo: updatedProfile.picture,
          accountType: updatedProfile.accountType,
          email_verified: updatedProfile.email_verified,
        };

        (async () => {
          await createUser(newUser);
        })();

        return updatedProfile;
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
        // This authorize function attempts to log a user in
        try {
          // Check if credentials are inputed, if not throw an error
          if (!credentials?.email || !credentials.password) {
            throw new Error("Invalid email or password.");
          }

          // Find if a user in the database has the same email with the email in the credentials object
          const user: any = await findUser({ email: credentials?.email });

          // Check if user exists and credentials are given
          if (user && credentials) {
            // Then match the passwords
            const passwordMatch = await bcrypt.compare(
              credentials.password,
              user.password
            );
            if (passwordMatch) {
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
      if (user) token.accountType = user.accountType;
      return token;
    },
    async session({ session, token }) {
      if (session.user) session.user.accountType = token.accountType;
      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
    error: "/error",
  },
  session: {
    strategy: "jwt",
  },
};
