import z from "zod";

export const createUserSchema = z
    .object({
        name: z.string().min(3, "The name must have at least 3 characters").max(50, "The name must have at most 50 characters"),
        email: z.string().email("Invalid email"),
        confirmEmail: z.string().email("Invalid email"),
        password: z
            .string()
            .min(8, "The password must have at least 8 characters")
            .regex(/[A-Z]/, "Must contain at least one uppercase letter")
            .regex(/[a-z]/, "Must contain at least one lowercase letter")
            .regex(/[0-9]/, "Must contain at least one number")
            .regex(/[^a-zA-Z0-9]/, "Must contain at least one special character"),
        confirmPassword: z.string().min(8, "The password must have at least 8 characters"),
        country: z.enum(["US", "BR"], { required_error: "Select a country" }).default("BR").nullable().optional(),
        phone: z.string().min(10, "The phone number must have at least 10 characters").max(15, "The phone number must have at most 15 characters"),
        photo: z.string().optional().nullable(),
        terms: z.boolean().default(false).optional(),
    })
    // .superRefine((data, ctx) => {
    //     const { country, phone } = data;

    //     const digits = phone.replace(/\D/g, '');

    //     switch (country) {
    //         case 'US':
    //             if (digits.length !== 10) {
    //                 ctx.addIssue({
    //                     code: z.ZodIssueCode.custom,
    //                     message: "The phone number must have 10 digits.",
    //                     path: ['phone']
    //                 });
    //             }
    //             break;

    //         case 'BR':
    //             if (digits.length !== 10 && digits.length !== 11) {
    //                 ctx.addIssue({
    //                     code: z.ZodIssueCode.custom,
    //                     message: "The phone number must have 10 or 11 digits. (DDD + number)",
    //                     path: ['phone']
    //                 });
    //             }
    //             break;
    //     }
    // })
    .refine((data) => data.email === data.confirmEmail, {
        message: "The email and confirm email must be the same",
        path: ["confirmEmail"],
    }).refine((data) => data.password === data.confirmPassword, {
        message: "The password and confirm password must be the same",
        path: ["confirmPassword"],
    });

export type CreateUserSchema = z.infer<typeof createUserSchema>;