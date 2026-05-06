import { getCookie, deleteCookie, setCookie } from "cookies-next";

const authCookieKey = process.env.NEXT_PUBLIC_TOKEN_KEY || "auth_token";

export const setToken = (token: string): void => {
    setCookie(authCookieKey, token, {
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
    });
};

export const getToken = (): string | undefined => {
    return getCookie(authCookieKey) as string | undefined;
};

export const clearToken = (): void => {
    deleteCookie(authCookieKey, { path: "/" });
};
