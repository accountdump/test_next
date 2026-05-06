"use client";

import PermissionGate from "@/components/guard/permission-gate";
import { useAuthStore } from "@/store/authStore";
import { authService } from "@/services/auth.service";

export default function DashboardPage() {
    const { user } = useAuthStore();

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Selamat datang, {user?.name}!</h1>

            <div className="flex gap-4">
                <PermissionGate role="admin">
                    <button className="bg-green-600 text-white px-4 py-2 rounded">Menu Khusus Admin</button>
                </PermissionGate>

                <PermissionGate permission="create-user">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded">Tambah User</button>
                </PermissionGate>
            </div>

            <button onClick={() => authService.logout()} className="mt-8 bg-red-600 text-white px-4 py-2 rounded">
                Logout
            </button>
        </div>
    );
}
