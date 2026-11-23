import z from "zod";
import { emailSchema, passwordSchema } from "./schemaUtils";

export const loginSchema = z.object({
    Email: emailSchema,
    Password: passwordSchema,
});
export type LoginData = z.infer<typeof loginSchema>