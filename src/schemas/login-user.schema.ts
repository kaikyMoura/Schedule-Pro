import z from "zod";

export const loginUserSchema = z
    .object({
        email: z.string().email("Email format is invalid"),
        password: z
            .string()
            .min(8, "The password must have at least 8 characters")
            .max(50, "The password must have at most 50 characters")
            .regex(/[A-Z]/, "Must contain at least one uppercase letter")
            .regex(/[a-z]/, "Must contain at least one lowercase letter")
            .regex(/[0-9]/, "Must contain at least one number")
            .regex(/[^a-zA-Z0-9]/, "Must contain at least one special character"),
    });

export type LoginUserSchema = z.infer<typeof loginUserSchema>;    