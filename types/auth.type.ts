import { User } from "@/types/user.type";
import { z } from "zod";
import { loginSchema, registerSchema } from "@/schemas/auth.schema";

export interface AuthResponse {
    success: boolean;
    message: string;
    data: {
        token: string;
        user: User;
    };
}

export type LoginPayload = z.infer<typeof loginSchema>;
export type RegisterPayload = z.infer<typeof registerSchema>;
