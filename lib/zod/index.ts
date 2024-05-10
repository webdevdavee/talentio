import { z } from "zod";

// SEARCH SCHEMA
export const searchSchema = z.object({
  title: z.string().min(3, "Use 3 characters or more"),
  list: z.string().min(3, "Use 3 characters or more"),
});

export type TSearchSchema = z.infer<typeof searchSchema>;

// FOOTER FORM SCHEMA
export const footerFormSchema = z.object({
  email: z.string().email().min(3, "Use 3 characters or more"),
});

export type TFooterFormSchema = z.infer<typeof footerFormSchema>;
