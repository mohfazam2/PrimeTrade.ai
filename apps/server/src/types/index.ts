import {z} from "zod"

export const createUserSchema = z.object({
    name: z.string().min(3).max(50),
    email: z.string().min(3).max(50).email({ message: "Invalid email" }),
    password: z.string().min(3).max(50),
    role: z.enum(["USER", "ADMIN"]).optional(),
});

export const loginUserSchema = z.object({
    email: z.string().min(3).max(50).email({ message: "Invalid email" }),
    password: z.string().min(3).max(50),
});

export const productSchema = z.object({
    name: z.string().min(3).max(100),
    description: z.string().min(3).max(250).optional(),
    price: z.number().min(0).max(999999),
    image: z.string().optional()
});

export const updateProductSchema = z.object({
    id: z.number().int().positive(),
    name: z.string().min(3).max(100),
    description: z.string().min(3).max(250).optional(),
    price: z.number().min(0).max(999999),
});