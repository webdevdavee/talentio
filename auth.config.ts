import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";

export default {
  providers: [Google],
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
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
    error: "/error",
  },
} satisfies NextAuthConfig;
