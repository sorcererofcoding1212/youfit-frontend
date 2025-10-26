import { z } from "zod";

export const registerSchema = z.object({
  fullName: z.string(),
  password: z.string().min(8, { error: "Minimum 8 characters are required" }),
  phoneNumber: z.string(),
});

export type RegisterSchema = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  password: z.string().min(8, { error: "Minimum 8 characters are required" }),
  phoneNumber: z.string(),
});

export type LoginSchema = z.infer<typeof loginSchema>;
