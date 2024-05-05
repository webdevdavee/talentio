import { z } from "zod";

// SEARCH JOB SCHEMA
export const searchJobSchema = z.object({
  title: z.string().min(3, "Use 3 characters or more"),
  location: z.string().min(3, "Use 3 characters or more"),
});

export type TSearchJobSchema = z.infer<typeof searchJobSchema>;
