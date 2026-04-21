"use client";

import { useState } from "react";
import { z } from "zod";

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
}
