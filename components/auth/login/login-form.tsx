"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { authService } from "@/services/auth.service";
import { loginSchema } from "@/schemas/auth.schema";
import { LoginPayload } from "@/types/auth.type";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldSeparator } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {svgs} from "@/assets/images/svgs";
import Link from "next/link";

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
    const router = useRouter();

    const form = useForm<LoginPayload>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const { isSubmitting } = form.formState;

    const handleLogin = async (payload: LoginPayload) => {
        try {
            await authService.login(payload);
            toast.success("Login berhasil!", { position: "top-right" });
            router.push("/dashboard");
        } catch (error) {
            const apiError = error as { response?: { data?: { message?: string } } };

            toast.error(apiError.response?.data?.message || "Login gagal. Silakan coba lagi.", { position: "top-right" });
        }
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden p-0">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <form className="p-6 md:p-8" onSubmit={form.handleSubmit(handleLogin)}>
                        <FieldGroup>
                            <div className="flex flex-col items-center gap-2 text-center">
                                <h1 className="text-2xl font-bold">Selamat datang kembali</h1>
                                <p className="text-balance text-muted-foreground">Masuk untuk melanjutkan</p>
                            </div>

                            <Controller
                                name="email"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="email">Email</FieldLabel>
                                        <Input
                                            {...field}
                                            id="email"
                                            type="email"
                                            placeholder="Masukkan email"
                                            autoComplete="email"
                                            disabled={isSubmitting}
                                            aria-invalid={fieldState.invalid}
                                        />
                                        {fieldState.error && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />

                            <Controller
                                name="password"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <div className="flex items-center">
                                            <FieldLabel htmlFor="password">Kata sandi</FieldLabel>
                                            <Link href="/forgot-password" className="ml-auto text-sm underline-offset-2 hover:underline">
                                                Lupa kata sandi?
                                            </Link>
                                        </div>
                                        <Input
                                            {...field}
                                            id="password"
                                            type="password"
                                            placeholder="Masukkan kata sandi"
                                            autoComplete="current-password"
                                            disabled={isSubmitting}
                                            aria-invalid={fieldState.invalid}
                                        />
                                        {fieldState.error && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />

                            <Field>
                                <Button type="submit" disabled={isSubmitting} className="w-full">
                                    {isSubmitting ? "Memproses..." : "Masuk"}
                                </Button>
                            </Field>

                            <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">Atau lanjutkan dengan</FieldSeparator>

                            <Field className="grid grid-cols-1 gap-4">
                                <Button variant="outline" type="button" className="w-full">
                                    <Image
                                        src={svgs.GoogleIcon}
                                        alt="Google Icon"
                                        width={16}
                                        height={16}
                                    />
                                    Google
                                </Button>
                            </Field>

                            <FieldDescription className="text-center">
                                Belum punya akun?{" "}
                                <Link href="/register" className="underline underline-offset-2">
                                    Daftar
                                </Link>
                            </FieldDescription>
                        </FieldGroup>
                    </form>

                    <div className="relative hidden bg-muted md:flex items-center justify-center p-8">
                        {/*<Image*/}
                        {/*    src="https://res.cloudinary.com/dzcmadjl1/image/upload/v1700000000/mascot.png"*/}
                        {/*    alt="Maskot"*/}
                        {/*    width={464}*/}
                        {/*    height={482}*/}
                        {/*    priority*/}
                        {/*    className="object-contain p-4 dark:brightness-[0.2] dark:grayscale"*/}
                        {/*/>*/}
                    </div>
                </CardContent>
            </Card>

            <FieldDescription className="px-6 text-center">
                Dengan melanjutkan, Anda menyetujui{" "}
                <Link href="/terms" className="underline underline-offset-2">
                    Ketentuan Layanan
                </Link>{" "}
                dan{" "}
                <Link href="/privacy" className="underline underline-offset-2">
                    Kebijakan Privasi
                </Link>{" "}
                kami.
            </FieldDescription>
        </div>
    );
}