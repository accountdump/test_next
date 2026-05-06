import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/dashboard"];
const guestRoutes = ["/login", "/register"];

export function proxy(request: NextRequest) {
    const authCookieKey = process.env.NEXT_PUBLIC_TOKEN_KEY || "auth_token";
    const token = request.cookies.get(authCookieKey)?.value;

    const { pathname } = request.nextUrl;

    const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));
    const isGuestRoute = guestRoutes.some((route) => pathname.startsWith(route));

    if (isProtectedRoute && !token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (isGuestRoute && token) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/login", "/register"],
};
