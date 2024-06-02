import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

export default {
  providers: [Google],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.accountType = user.accountType;
      console.log("TOKEN: ", token);
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.accountType = token.accountType;
        session.user.id = token.sub;
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
