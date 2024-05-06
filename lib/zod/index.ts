import { z } from "zod";

// SEARCH JOB SCHEMA
export const searchJobSchema = z.object({
  title: z.string().min(3, "Use 3 characters or more"),
  location: z.string().min(3, "Use 3 characters or more"),
});

export type TSearchJobSchema = z.infer<typeof searchJobSchema>;

// FOOTER FORM SCHEMA
export const footerFormSchema = z.object({
  email: z.string().email().min(3, "Use 3 characters or more"),
});

export type TFooterFormSchema = z.infer<typeof footerFormSchema>;
