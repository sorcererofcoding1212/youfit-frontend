import z from "zod";

export const createRoutineSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
});
