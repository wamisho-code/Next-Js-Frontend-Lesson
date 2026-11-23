import z from "zod";

export const passwordSchema= z.string()    
    .min(8, "Password must be at least 8 characters")
    .max(32, "Password must not exceed 32 characters")
    .regex(/[A-Z]/, "Must contain an uppercase letter")
    .regex(/[a-z]/, "Must contain a lowercase letter")
    .regex(/[0-9]/, "Must contain a number")
    .regex(/[^A-Za-z0-9]/, "Must contain a special character");
export const emailSchema=z.string().min(1,"Please enter email").email();