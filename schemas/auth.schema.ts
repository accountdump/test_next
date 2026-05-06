import { z } from "zod";

export const loginSchema = z.object({
    email: z
        .string()
        .min(1, { message: "Email wajib diisi" })
        .max(255, { message: "Email maksimal 255 karakter" })
        .email({ message: "Format email tidak valid" }),
    password: z.string().min(8, { message: "Password minimal 8 karakter" }),
});

export const registerSchema = z
    .object({
        name: z.string().min(3, { message: "Nama minimal 3 karakter" }).max(255, { message: "Nama maksimal 255 karakter" }),
        email: z.string().min(1, { message: "Email wajib diisi" }).email({ message: "Format email tidak valid" }),
        password: z.string().min(8, { message: "Password minimal 8 karakter" }),
        password_confirmation: z.string(),
    })
    .refine((data) => data.password === data.password_confirmation, {
        message: "Konfirmasi password tidak cocok",
        path: ["password_confirmation"],
    });
