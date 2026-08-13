import { z } from "zod";


export const projectSchema = z.object({
  title: z.string().min(2),

  description: z.string().optional(),

  skills: z.array(z.string()),

  status: z.enum([
    "IDEA",
    "IN_PROGRESS",
    "COMPLETED",
  ]),

  category: z.enum([
    "WEB",
    "AI_ML",
    "HARDWARE",
    "RESEARCH",
    "OTHER",
  ]),

githubUrl: z.string().optional(),
demoUrl: z.string().optional(),
imageUrl: z.string().optional(),
});