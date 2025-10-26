import { z } from "zod";

export const registerSchema = z.object({
  fullName: z.string(),
  password: z.string().min(8, { error: "Minimum 8 characters are required" }),
  phoneNumber: z
    .string()
    .regex(/^\d+$/, { message: "Phone number must contain only digits" })
    .min(10, { message: "Phone number must be at least 10 digits" })
    .max(20, { message: "Phone number can't exceed 20 digits" }),
});

export const loginSchema = z.object({
  password: z.string().min(8, { error: "Minimum 8 characters are required" }),
  phoneNumber: z
    .string()
    .regex(/^\d+$/, { message: "Phone number must contain only digits" })
    .min(10, { message: "Phone number must be at least 10 digits" })
    .max(20, { message: "Phone number can't exceed 20 digits" }),
});
