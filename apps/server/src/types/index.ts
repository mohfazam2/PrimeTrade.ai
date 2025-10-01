import {z} from "zod"

export const createUserSchema = z.object({
    name: z.string().min(3).max(50),
    email: z.string().min(3).max(50).email({ message: "Invalid email" }),
    password: z.string().min(3).max(50)
});