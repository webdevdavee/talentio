import type { NextAuthConfig } from "next-auth";
import google from "next-auth/providers/google";

export default {
  providers: [google],
  pages: {
    signIn: "/sign-in",
    error: "/error",
  },
} satisfies NextAuthConfig;
