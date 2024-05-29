import { z } from "zod";

// SEARCH SCHEMA
export const searchSchema = z.object({
  title: z.string().min(3, "Use 3 characters or more"),
  list: z.string().optional(),
});

export type TSearchSchema = z.infer<typeof searchSchema>;

// FOOTER FORM SCHEMA
export const footerFormSchema = z.object({
  email: z.string().email().min(3, "Use 3 characters or more"),
});

export type TFooterFormSchema = z.infer<typeof footerFormSchema>;

// JOB APPLICATION FORM SCHEMA
export const jobApplicationFormSchema = z.object({
  firstname: z.string().min(3, "Use 3 characters or more"),
  lastname: z.string().min(3, "Use 3 characters or more"),
  email: z.string().email(),
  phone: z.string().regex(/^(0|\+?[1-9])[0-9]{7,14}$/, "Invalid phone number"),
  nationality: z.string().min(3, "Use 3 characters or more"),
  coverletter: z.string().min(3, "Use 3 characters or more"),
  resume: z.string(),
});

export type TJobApplicationFormSchema = z.infer<
  typeof jobApplicationFormSchema
>;

// SIGN UP FORM SCHEMA

// Custom password validation function
const validatePassword = (password: string) => {
  // Define your password validation rules here
  const minLength = 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-\\/]/.test(password);

  // Check if all conditions are met
  return (
    password.length >= minLength &&
    hasUppercase &&
    hasLowercase &&
    hasNumber &&
    hasSpecialChar
  );
};

export const AuthFormSchema = z.object({
  username: z.string().min(3, "Use 3 characters or more").trim().optional(),
  email: z.string().email().toLowerCase().trim(),
  password: z.string().trim().refine(validatePassword, {
    message:
      "Invalid password. Password must include at least 8 characters, have an uppercase character, have a lowercase character, have a number, and have a special character.",
  }),
  // password: z
  //   .string()
  //   .min(8, "Should be at least 8 characters long.")
  //   .regex(/[a-zA-Z]/, "Should have at least one letter")
  //   .regex(/[0-9]/, "Should have at least one number")
  //   .regex(/[^a-zA-Z0-9]/, "Should have at least one special character")
  //   .trim(),
});

export type TAuthFormSchema = z.infer<typeof AuthFormSchema>;
