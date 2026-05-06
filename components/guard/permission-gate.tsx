"use client";

import React from "react";
import { useAuthStore } from "@/store/authStore";

interface PermissionGateProps {
    permission?: string | string[];
    role?: string | string[];
    requireAll?: boolean;
    children: React.ReactNode;
    fallback?: React.ReactNode;
}

export default function PermissionGate({ permission, role, requireAll = false, children, fallback = null }: PermissionGateProps) {
    const { roles, permissions, isAuthenticated } = useAuthStore();

    if (!isAuthenticated) {
        return <>{fallback}</>;
    }

    const checkAccess = () => {
        const roleArray = role ? (Array.isArray(role) ? role : [role]) : [];
        const permissionArray = permission ? (Array.isArray(permission) ? permission : [permission]) : [];

        let hasRole = roleArray.length === 0;
        let hasPermission = permissionArray.length === 0;

        if (roleArray.length > 0) {
            hasRole = requireAll ? roleArray.every((r) => roles.includes(r)) : roleArray.some((r) => roles.includes(r));
        }

        if (permissionArray.length > 0) {
            hasPermission = requireAll ? permissionArray.every((p) => permissions.includes(p)) : permissionArray.some((p) => permissions.includes(p));
        }

        if (roleArray.length > 0 && permissionArray.length > 0) {
            return requireAll ? hasRole && hasPermission : hasRole || hasPermission;
        }

        return hasRole && hasPermission;
    };

    if (checkAccess()) {
        return <>{children}</>;
    }

    return <>{fallback}</>;
}
