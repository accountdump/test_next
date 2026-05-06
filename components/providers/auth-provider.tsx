"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { authService } from "@/services/auth.service";
import { getToken, clearToken } from "@/lib/cookie";
import {Spinner} from "@/components/ui/spinner";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const { isAuthenticated } = useAuthStore();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const token = getToken();

                if (!token) {
                    router.replace("/login");
                    return;
                }

                if (!isAuthenticated) {
                    try {
                        await authService.fetchProfile();
                    } catch (error) {
                        console.error("Gagal verifikasi token", error);
                        clearToken();
                        router.replace("/login");
                        return;
                    }
                }
            } finally {
                setIsLoading(false);
            }
        };

        initializeAuth();
    }, [isAuthenticated, router]);

    if (isLoading) {
        return <div className="flex min-h-screen items-center justify-center"><Spinner className="size-8" /></div>;
    }

    return <>{children}</>;
}
