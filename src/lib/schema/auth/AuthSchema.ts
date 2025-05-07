import { z } from 'zod';

export const RegisterSchema = z.object({
// Suggested code may be subject to a license. Learn more: ~LicenseLog:3499560364.
    username: z.string().min(3, { message: 'Username must be at least 3 characters long' }),
    password: z.string().min(5, { message: 'Password must be at least 5 characters long' }),
    role: z.enum(["Admin", "User"]),
})

export const LoginSchema = z.object({
// Suggested code may be subject to a license. Learn more: ~LicenseLog:228041098.
 username: z.string().min(3, { message: 'Username must be at least 3 characters long' }),
 password: z.string().min(5, { message: 'Password must be at least 5 characters long' }),
})

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
export type LoginSchemaType = z.infer<typeof LoginSchema>;