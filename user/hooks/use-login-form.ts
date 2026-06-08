import { useState } from 'react';
import { router } from 'expo-router';
import { useAuth } from '@/hooks/use-auth';
import { AxiosError } from 'axios';

interface FormValues {
  nik: string;
  password: string;
}

interface FormErrors {
  nik?: string;
  password?: string;
  general?: string;
}

export function useLoginForm() {
  const { signIn } = useAuth();
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (values: FormValues): FormErrors => {
    const errs: FormErrors = {};
    if (!values.nik.trim())
      errs.nik = 'NIK wajib diisi';
    else if (!/^\d{16}$/.test(values.nik))
      errs.nik = 'NIK harus 16 digit angka';
    if (!values.password)
      errs.password = 'Kata sandi wajib diisi';
    else if (values.password.length < 6)
      errs.password = 'Kata sandi minimal 6 karakter';
    return errs;
  };

  const handleSubmit = async (values: FormValues) => {
    const errs = validate(values);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setErrors({});
    setIsSubmitting(true);

    try {
      // POST /auth/login
      await signIn({ nik: values.nik, password: values.password });
      router.replace('/(tabs)');

    } catch (err) {
      const axiosErr = err as AxiosError<{ message?: string }>;
      const status = axiosErr.response?.status;

      if (status === 401 || status === 404) {
        setErrors({ general: 'NIK atau kata sandi salah.' });
      } else {
        setErrors({ general: 'Terjadi kesalahan. Coba lagi.' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearError = (field: keyof FormErrors) => {
    setErrors((prev) => { const next = { ...prev }; delete next[field]; return next; });
  };

  return { errors, isSubmitting, handleSubmit, clearError };
}