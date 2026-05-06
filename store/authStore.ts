import { create } from "zustand";
import { User } from "@/types/user.type";

interface AuthState {
    user: User | null;
    roles: string[];
    permissions: string[];
    isAuthenticated: boolean;
    setAuth: (user: User) => void;
    clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    roles: [],
    permissions: [],
    isAuthenticated: false,

    setAuth: (user) =>
        set({
            user,
            roles: user.roles || [],
            permissions: user.permissions || [],
            isAuthenticated: true,
        }),

    clearAuth: () =>
        set({
            user: null,
            roles: [],
            permissions: [],
            isAuthenticated: false,
        }),
}));
