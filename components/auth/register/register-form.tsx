"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { authService } from "@/services/auth.service";
import { registerSchema } from "@/schemas/auth.schema";
import { RegisterPayload } from "@/types/auth.type";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldSeparator} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {svgs} from "@/assets/images/svgs";

export function RegisterForm({ className, ...props }: React.ComponentProps<"div">) {
    const router = useRouter();

    const form = useForm<RegisterPayload>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
        },
    });

    const { isSubmitting } = form.formState;

    const handleRegister = async (payload: RegisterPayload) => {
        try {
            await authService.register(payload);
            toast.success("Registrasi berhasil!", { position: "top-right" });
            router.push("/dashboard");
        } catch (error) {
            const apiError = error as { response?: { data?: { message?: string } } };

            toast.error(apiError.response?.data?.message || "Registrasi gagal. Silakan coba lagi.", { position: "top-right" });
        }
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden p-0">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <form className="p-6 md:p-8" onSubmit={form.handleSubmit(handleRegister)}>
                        <FieldGroup>
                            <div className="flex flex-col items-center gap-2 text-center">
                                <h1 className="text-2xl font-bold">Buat akun baru</h1>
                                <p className="text-balance text-muted-foreground">Daftar untuk mulai menggunakan</p>
                            </div>

                            <Controller
                                name="name"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="name">Nama</FieldLabel>
                                        <Input
                                            {...field}
                                            id="name"
                                            type="text"
                                            placeholder="Masukkan nama Anda"
                                            autoComplete="name"
                                            disabled={isSubmitting}
                                            aria-invalid={fieldState.invalid}
                                        />
                                        {fieldState.error && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />

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
                                        <FieldDescription>
                                            Pastikan email yang Anda masukkan benar, karena akan digunakan untuk verifikasi akun.
                                        </FieldDescription>
                                    </Field>
                                )}
                            />

                            <div className="grid grid-cols-2 gap-4">
                                <Controller
                                    name="password"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="password">Password</FieldLabel>
                                            <Input
                                                {...field}
                                                id="password"
                                                type="password"
                                                placeholder="Password"
                                                disabled={isSubmitting}
                                                aria-invalid={fieldState.invalid}
                                            />
                                            {fieldState.error && <FieldError errors={[fieldState.error]} />}
                                        </Field>
                                    )}
                                />

                                <Controller
                                    name="password_confirmation"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
                                            <Input
                                                {...field}
                                                id="confirm-password"
                                                type="password"
                                                placeholder="Konfirmasi"
                                                disabled={isSubmitting}
                                                aria-invalid={fieldState.invalid}
                                            />
                                            {fieldState.error && <FieldError errors={[fieldState.error]} />}
                                        </Field>
                                    )}
                                />
                            </div>

                            <Field>
                                <Button type="submit" disabled={isSubmitting} className="w-full">
                                    {isSubmitting ? "Memproses..." : "Daftar"}
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
                                Sudah punya akun?{" "}
                                <Link href="/login" className="underline underline-offset-2">
                                    Masuk
                                </Link>
                            </FieldDescription>
                        </FieldGroup>
                    </form>

                    <div className="relative hidden items-center justify-center bg-muted p-8 md:flex">
                        {/*<Image*/}
                        {/*    src="https://res.cloudinary.com/dk-find-out/image/upload/q_80,w_1920,f_auto/MA_00235397_000001.png"*/}
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


