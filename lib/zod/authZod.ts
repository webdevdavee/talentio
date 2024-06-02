import { z } from "zod";
import { validatePassword } from "../utils";

// SIGN UP FORM SCHEMA
export const AuthSignUpFormSchema = z.object({
  name: z
    .string()
    .min(3, "Use 3 characters or more")
    .trim()
    .refine(
      (s) => !s.includes(" "),
      "Only letters, numbers and underscores allowed. No spacing."
    ),
  email: z.string().email().toLowerCase().trim(),
  password: z
    .string()
    .min(8, "Should be at least 8 characters long.")
    .regex(/[a-zA-Z]/, "Should have at least one letter")
    .regex(/[0-9]/, "Should have at least one number")
    .regex(/[^a-zA-Z0-9]/, "Should have at least one special character")
    .trim()
    .refine(
      (s) => !s.includes(" "),
      "Only letters, numbers and special characters allowed. No spacing."
    ),
  // password: z.string().trim().refine(validatePassword, {
  //   message:
  //     "Invalid password. Password must include at least 8 characters, have an uppercase character, have a lowercase character, have a number, and have a special character.",
  // }),
});

export type TAuthSignUpFormSchema = z.infer<typeof AuthSignUpFormSchema>;

// SIGN IN FORM SCHEMA
export const AuthSignInFormSchema = z.object({
  email: z.string().email().toLowerCase().trim(),
  password: z.string().trim(),
});

export type TAuthSignInFormSchema = z.infer<typeof AuthSignInFormSchema>;
