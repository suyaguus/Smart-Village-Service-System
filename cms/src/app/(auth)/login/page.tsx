"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
// Validasi Form Login menggunakan Zod
const loginSchema = z.object({
  email: z.string().email("Email Tidak Valid!"),
  password: z.string().min(6, "Password minimal 6 karakter!"),
});

// Tipe data untuk form login berdasarkan skema Zod
type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  // validasi useState untuk form login
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  //   Inisialisasi useForm dengan skema validasi Zod
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  //   fungsi untuk menangani submit form login
  function onSubmit(values: LoginFormValues) {
    // todo: hubungkan ke api login saat auth service sudah tersedia
    setIsLoading(true);
    console.log(values);
    setTimeout(() => setIsLoading(false), 5000);
  }

  //   bagian UI
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-100">
      <section className="w-full max-w-md px-4">
        {/* title */}
        <header className="text-center mb-8">
          {/* logo */}
          <figure className="inline-flex items-center justify-center w-16 h-16 bg-slate-800 rounded-2xl mb-4">
            <span className="text-white text-2xl font-bold">SV</span>
          </figure>

          {/* judul */}
          <h1 className="text-2xl font-bold text-slate-800">Smart Village</h1>
          {/* deskripsi */}
          <p className="text-slate-500 text-sm mt-1">
            Sistem Layanan Desa Digital
          </p>
        </header>

        {/* card login */}
        <article className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          {/* header */}
          <header className="mb-6">
            {/* judul */}
            <h2 className="text-xl font-semibold text-slate-800">
              Masuk ke CMS
            </h2>
            {/* deskripsi */}
            <p className="text-sm text-slate-500 mt-1">
              Login sebagai admin desa
            </p>
          </header>

          {/* form login */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* input email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="admin@desa.id"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* input password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                          aria-label={
                            showPassword
                              ? "Sembunyikan password"
                              : "Tampilkan password"
                          }
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* button submit */}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Masuk
              </Button>
            </form>
          </Form>
        </article>
      </section>
    </main>
  );
}
