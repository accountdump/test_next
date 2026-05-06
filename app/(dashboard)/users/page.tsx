"use client";
import PermissionGate from "@/components/guard/permission-gate";

export default function UsersPage() {
    return (
        <div>
            <h1>Manajemen Pengguna</h1>

            {/* User dengan role Admin OR Manager bisa melihat ini */}
            <PermissionGate role={["admin", "manager"]}>
                <button>Export Data Users</button>
            </PermissionGate>

            {/* HANYA user yang punya spesifik permission 'create-user' */}
            <PermissionGate permission="create-user">
                <button>+ Tambah User Baru</button>
            </PermissionGate>

            {/* Harus Superadmin DAN punya permission 'delete-user' */}
            <PermissionGate role="superadmin" permission="delete-user" requireAll>
                <button color="red">Hapus Semua User</button>
            </PermissionGate>

            {/* Contoh penggunaan fallback */}
            <PermissionGate permission="view-salary" fallback={<p className="text-gray-400">Anda tidak memiliki akses melihat gaji.</p>}>
                <div>Daftar Gaji: Rp 10.000.000</div>
            </PermissionGate>
        </div>
    );
}
