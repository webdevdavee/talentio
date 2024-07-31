import { z } from "zod";
import { isValidUrl } from "../utils";

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
    .regex(/\d/, "Should have at least one number")
    .regex(/[^a-zA-Z0-9]/, "Should have at least one special character")
    .trim()
    .refine(
      (s) => !s.includes(" "),
      "Only letters, numbers and special characters allowed. No spacing."
    ),
});

export type TAuthSignUpFormSchema = z.infer<typeof AuthSignUpFormSchema>;

// SIGN IN FORM SCHEMA
export const AuthSignInFormSchema = z.object({
  email: z.string().email().toLowerCase().trim(),
  password: z.string().trim(),
});

export type TAuthSignInFormSchema = z.infer<typeof AuthSignInFormSchema>;

// SECURITY QUESTIONS SCHEMA
export const SecurityQuestionsSchema = z.object({
  answer: z.string().min(3, "Use 3 characters or more").trim(),
});

export type TSecurityQuestionsSchema = z.infer<typeof SecurityQuestionsSchema>;

// RECOVER ACCOUNT EMAIL SCHEMA
export const RecoverAccountEmailsSchema = z.object({
  email: z.string().email().toLowerCase().trim(),
});

export type TRecoverAccountEmailsSchemaSchema = z.infer<
  typeof RecoverAccountEmailsSchema
>;

// RESET PASSWORD SCHEMA
export const ResetPasswordSchema = z.object({
  newPassword: z
    .string()
    .min(8, "Should be at least 8 characters long.")
    .regex(/[a-zA-Z]/, "Should have at least one letter")
    .regex(/\d/, "Should have at least one number")
    .regex(/[^a-zA-Z0-9]/, "Should have at least one special character")
    .trim()
    .refine(
      (s) => !s.includes(" "),
      "Only letters, numbers and special characters allowed. No spacing."
    ),
  confirmPassword: z
    .string()
    .min(8, "Should be at least 8 characters long.")
    .regex(/[a-zA-Z]/, "Should have at least one letter")
    .regex(/\d/, "Should have at least one number")
    .regex(/[^a-zA-Z0-9]/, "Should have at least one special character")
    .trim()
    .refine(
      (s) => !s.includes(" "),
      "Only letters, numbers and special characters allowed. No spacing."
    ),
});

export type TResetPasswordSchema = z.infer<typeof ResetPasswordSchema>;

// COMPANY STEP 1 SIGN UP FORM SCHEMA
export const CompanySignUpFormSchema1 = z.object({
  name: z.string().min(3, "Use 3 characters or more").trim(),
  email: z.string().email().toLowerCase().trim(),
  password: z
    .string()
    .min(8, "Should be at least 8 characters long.")
    .regex(/[a-zA-Z]/, "Should have at least one letter")
    .regex(/\d/, "Should have at least one number")
    .regex(/[^a-zA-Z0-9]/, "Should have at least one special character")
    .trim()
    .refine(
      (s) => !s.includes(" "),
      "Only letters, numbers and special characters allowed. No spacing."
    ),
  size: z.string().min(1, "Required").trim(),
});

export type TCompanySignUpFormSchema1 = z.infer<
  typeof CompanySignUpFormSchema1
>;

// COMPANY STEP 2 SIGN UP FORM SCHEMA
export const CompanySignUpFormSchema2 = z.object({
  about: z.string().min(3, "Use 3 characters or more").trim(),
  logo: z.string(),
});

export type TCompanySignUpFormSchema2 = z.infer<
  typeof CompanySignUpFormSchema2
>;

// COMPANY STEP 3 SIGN UP FORM SCHEMA
export const CompanySignUpFormSchema3 = z.object({
  twitter: z
    .string()
    .min(3, "Use 3 characters or more")
    .url()
    .trim()
    .refine((data) => isValidUrl(data), {
      message: "Please enter a valid URL",
    }),
  facebook: z
    .string()
    .min(3, "Use 3 characters or more")
    .url()
    .trim()
    .refine((data) => isValidUrl(data), {
      message: "Please enter a valid URL",
    }),
  linkedin: z
    .string()
    .min(3, "Use 3 characters or more")
    .url()
    .trim()
    .refine((data) => isValidUrl(data), {
      message: "Please enter a valid URL",
    }),
  mail: z.string().email().toLowerCase().trim(),
});

export type TCompanySignUpFormSchema3 = z.infer<
  typeof CompanySignUpFormSchema3
>;

// COMPANY SIGN UP SCHEMA
export const CompanySignUpFormSchema = z.object({
  name: z.string().min(3, "Use 3 characters or more").trim(),
  email: z.string().email().toLowerCase().trim(),
  password: z
    .string()
    .min(8, "Should be at least 8 characters long.")
    .regex(/[a-zA-Z]/, "Should have at least one letter")
    .regex(/\d/, "Should have at least one number")
    .regex(/[^a-zA-Z0-9]/, "Should have at least one special character")
    .trim()
    .refine(
      (s) => !s.includes(" "),
      "Only letters, numbers and special characters allowed. No spacing."
    ),
  size: z.string().min(1, "Required").trim(),
  industry: z.array(z.string()),
  about: z.string().min(3, "Use 3 characters or more").trim(),
  logo: z.string(),
  twitter: z
    .string()
    .min(3, "Use 3 characters or more")
    .url()
    .trim()
    .refine((data) => isValidUrl(data), {
      message: "Please enter a valid URL",
    }),
  facebook: z
    .string()
    .min(3, "Use 3 characters or more")
    .url()
    .trim()
    .refine((data) => isValidUrl(data), {
      message: "Please enter a valid URL",
    }),
  linkedin: z
    .string()
    .min(3, "Use 3 characters or more")
    .url()
    .trim()
    .refine((data) => isValidUrl(data), {
      message: "Please enter a valid URL",
    }),
  mail: z.string().email().toLowerCase().trim(),
});

export type TCompanySignUpFormSchema = z.infer<typeof CompanySignUpFormSchema>;
