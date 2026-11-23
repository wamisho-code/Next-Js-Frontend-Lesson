import z from "zod";
import { emailSchema, passwordSchema } from "./schemaUtils";

export const registerSchema= z.object({
    FullName: z.string().min(1,"Please enter full name")
    .max(24,"Full name can't be longer than 24 character"),
    Email: emailSchema,
    Password:passwordSchema,
    Phone:z.string().regex(/^(09|07)/, "Enter a valid Ethiopian phone number"),
})
export type RegisterData= z.infer<typeof registerSchema>