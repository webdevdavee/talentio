import { z } from "zod";

// SEARCH SCHEMA
export const searchSchema = z.object({
  title: z.string().min(3, "Use 3 characters or more"),
  list: z.string().min(3, "Use 3 characters or more").optional(),
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
