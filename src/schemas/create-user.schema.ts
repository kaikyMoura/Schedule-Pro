import z from "zod";

export const createUserSchema = z
    .object({
        name: z.string().min(3, "The name must have at least 3 characters").max(50, "The name must have at most 50 characters").nullable(),
        email: z.string().email("Invalid email").regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email"),
        confirmEmail: z.string().email("Invalid email").regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email"),
        password: z
            .string()
            .min(8, "The password must have at least 8 characters")
            .regex(/[A-Z]/, "Must contain at least one uppercase letter")
            .regex(/[a-z]/, "Must contain at least one lowercase letter")
            .regex(/[0-9]/, "Must contain at least one number")
            .regex(/[^a-zA-Z0-9]/, "Must contain at least one special character"),
        confirmPassword: z.string().min(8, "The password must have at least 8 characters"),
        phone: z.string().min(6, "Invalid phone number").regex(/^\(\d{2}\) \d{4,5}-\d{4}$/, "Phone number is invalid"),
        photo: z.string().optional().nullable(),
    })
    .refine((data) => data.email === data.confirmEmail, {
        message: "The email and confirm email must be the same",
        path: ["confirmEmail"],
    }).refine((data) => data.password === data.confirmPassword, {
        message: "The password and confirm password must be the same",
        path: ["confirmPassword"],
    });

export type CreateUserSchema = z.infer<typeof createUserSchema>;