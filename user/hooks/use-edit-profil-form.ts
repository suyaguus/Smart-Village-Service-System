/**
 * hooks/use-edit-profil-form.ts
 * Validasi + submit perubahan profil ke PATCH /user/:id.
 * Setelah sukses → sinkron ke AuthContext lalu kembali.
 */

import { useState } from 'react';
import { router } from 'expo-router';
import { AxiosError } from 'axios';
import { updateUser } from '@/services/user.service';
import { useAuth } from '@/hooks/use-auth';
import type { UpdateUserRequest, User } from '@/types';

const GENERAL_ERROR_KEY = '_general';

type FormErrors = Record<string, string>;

export function useEditProfilForm() {
  const { user, updateLocalUser } = useAuth();
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (values: UpdateUserRequest): FormErrors => {
    const errs: FormErrors = {};

    if (!values.nama?.trim()) {
      errs.nama = 'Nama wajib diisi';
    } else if (values.nama.trim().length < 3) {
      errs.nama = 'Nama minimal 3 karakter';
    }

    if (values.no_telepon && !/^08\d{8,11}$/.test(values.no_telepon)) {
      errs.no_telepon = 'Format telepon tidak valid (08xxxxxxxxxx)';
    }

    return errs;
  };

  const submit = async (userId: string, values: UpdateUserRequest) => {
    const errs = validate(values);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const updated = await updateUser(userId, values);

      // Gabung dengan data lama agar field yang tak dikembalikan tetap ada
      const merged: User = { ...(user as User), ...updated };
      await updateLocalUser(merged);

      router.back();
    } catch (err) {
      const axiosErr = err as AxiosError<{ message?: string }>;
      setErrors({
        [GENERAL_ERROR_KEY]:
          axiosErr.response?.data?.message ??
          'Gagal menyimpan perubahan. Coba lagi.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearError = (key: string) => {
    setErrors((prev) => {
      const next = { ...prev };
      delete next[key];
      delete next[GENERAL_ERROR_KEY];
      return next;
    });
  };

  return {
    errors,
    generalError: errors[GENERAL_ERROR_KEY],
    isSubmitting,
    submit,
    clearError,
  };
}