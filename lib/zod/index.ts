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

// INDIVIDUAL SETTINGS FORM
export const individualSettingsFormSchema = z.object({
  name: z.string().min(3, "Use 3 characters or more"),
  email: z.string().email(),
  currentPassword: z
    .string()
    .min(8, "Should be at least 8 characters long.")
    .regex(/[a-zA-Z]/, "Should have at least one letter")
    .regex(/[0-9]/, "Should have at least one number")
    .regex(/[^a-zA-Z0-9]/, "Should have at least one special character")
    .trim()
    .refine(
      (s) => !s.includes(" "),
      "Only letters, numbers and special characters allowed. No spacing."
    )
    .optional(),
  newPassord: z
    .string()
    .min(8, "Should be at least 8 characters long.")
    .regex(/[a-zA-Z]/, "Should have at least one letter")
    .regex(/[0-9]/, "Should have at least one number")
    .regex(/[^a-zA-Z0-9]/, "Should have at least one special character")
    .trim()
    .refine(
      (s) => !s.includes(" "),
      "Only letters, numbers and special characters allowed. No spacing."
    )
    .optional(),
  confirmPassword: z
    .string()
    .min(8, "Should be at least 8 characters long.")
    .regex(/[a-zA-Z]/, "Should have at least one letter")
    .regex(/[0-9]/, "Should have at least one number")
    .regex(/[^a-zA-Z0-9]/, "Should have at least one special character")
    .trim()
    .refine(
      (s) => !s.includes(" "),
      "Only letters, numbers and special characters allowed. No spacing."
    )
    .optional(),
  image: z.string(),
});

export type TIndividualSettingsFormSchema = z.infer<
  typeof individualSettingsFormSchema
>;

// POST JOB FORM
export const PostJobFormSchema = z.object({
  title: z.string().min(3, "Use 3 characters or more"),
  description: z.string().min(10, "Use 10 characters or more"),
  location: z.string().min(3, "Use 3 characters or more"),
  salary: z.object({
    from: z.string().min(3, "Use 3 characters or more"),
    to: z.string().min(3, "Use 3 characters or more"),
  }),
  capacity: z.string().min(1, "Required"),
});

export type TPostJobFormSchema = z.infer<typeof PostJobFormSchema>;
