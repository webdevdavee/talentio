import NextAuth from "next-auth";
import authConfig from "./auth.config";
import credentials from "next-auth/providers/credentials";
import { AuthSignInFormSchema } from "./lib/zod/authZod";
import { findByEmail } from "./database/actions/user.action";
import bcrypt from "bcryptjs";
import google from "next-auth/providers/google";

export const {
  auth,
  handlers: { GET, POST },
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    google,
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
});
