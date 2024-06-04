import type { NextAuthConfig } from "next-auth";
import google from "next-auth/providers/google";

export default {
  providers: [google],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accountType = user.accountType;
        token.id = user._id;
        token.picture = user.photo;
      }
      console.log("TOKEN: ", token);
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.accountType = token.accountType;
        session.user.id = token.id;
      }
      console.log("SESSION: ", session);
      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
    error: "/error",
  },
} satisfies NextAuthConfig;
