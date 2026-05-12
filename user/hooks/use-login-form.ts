import { useState } from "react";
import { router } from "expo-router";
import { useAuth } from "@/hooks/use-auth";

interface FormValues {
  nik: string;
  password: string;
}

interface FormErrors {
  nik?: string;
  password?: string;
  general?: string;
}

export const MOCK_ACCOUNT = {
  nik: "1212121212121212",
  password: "11111111",
  nama: "Budi Santoso",
};

export function useLoginForm() {
  const { login } = useAuth();
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (values: FormValues): FormErrors => {
    const errs: FormErrors = {};
    if (!values.nik.trim()) errs.nik = "NIK wajib diisi";
    else if (!/^\d{16}$/.test(values.nik))
      errs.nik = "NIK harus 16 digit angka";
    if (!values.password) errs.password = "Kata sandi wajib diisi";
    else if (values.password.length < 6)
      errs.password = "Kata sandi minimal 6 karakter";
    return errs;
  };

  const handleSubmit = async (values: FormValues) => {
    const errs = validate(values);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      await new Promise((res) => setTimeout(res, 1000));

      if (
        values.nik !== MOCK_ACCOUNT.nik ||
        values.password !== MOCK_ACCOUNT.password
      ) {
        setErrors({ general: "NIK atau kata sandi salah." });
        return;
      }

      // Simpan user via AuthContext (yang handle AsyncStorage)
      await login({ nik: MOCK_ACCOUNT.nik, nama: MOCK_ACCOUNT.nama });

      router.replace("/(tabs)");
    } catch {
      setErrors({ general: "Terjadi kesalahan. Coba lagi." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearError = (field: keyof FormErrors) => {
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  return { errors, isSubmitting, handleSubmit, clearError };
}
