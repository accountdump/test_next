import axiosInstance from "@/lib/axios";
import { setToken, clearToken } from "@/lib/cookie";
import { AuthResponse, LoginPayload, RegisterPayload } from "@/types/auth.type";
import { User } from "@/types/user.type";
import { useAuthStore } from "@/store/authStore";

export const authService = {
    login: async (payload: LoginPayload): Promise<User> => {
        const response = await axiosInstance.post<AuthResponse>("/v1/login", payload);
        const { user, token } = response.data.data;

        setToken(token);
        useAuthStore.getState().setAuth(user);

        return user;
    },

    register: async (payload: RegisterPayload): Promise<User> => {
        const response = await axiosInstance.post<AuthResponse>("/v1/register", payload);
        const { user, token } = response.data.data;

        setToken(token);
        useAuthStore.getState().setAuth(user);

        return user;
    },

    logout: async () => {
        try {
            await axiosInstance.post("/v1/logout");
        } finally {
            clearToken();
            useAuthStore.getState().clearAuth();
            window.location.href = "/login";
        }
    },

    fetchProfile: async () => {
        const response = await axiosInstance.get<{ data: User }>("/v1/profile");
        useAuthStore.getState().setAuth(response.data.data);
    },
};
