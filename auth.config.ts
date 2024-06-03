import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

export default {
  providers: [Google],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accountType = user.accountType;
        token.id = user._id;
        token.picture = user.photo;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.accountType = token.accountType;
        session.user.id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
    error: "/error",
  },
} satisfies NextAuthConfig;
