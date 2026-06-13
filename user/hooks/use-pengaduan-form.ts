/**
 * hooks/use-pengaduan-form.ts
 * Validasi + submit pengaduan ke POST /pengaduan.
 * Setelah sukses → kembali ke daftar pengaduan.
 */

import { useState } from 'react';
import { router } from 'expo-router';
import { AxiosError } from 'axios';
import { createPengaduan } from '@/services/pengaduan.service';
import type { KategoriPengaduan } from '@/types';

const GENERAL_ERROR_KEY = '_general';

export interface PengaduanFormValues {
  judul: string;
  kategori: KategoriPengaduan | '';
  deskripsi: string;
}

type FormErrors = Record<string, string>;

export function usePengaduanForm() {
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (values: PengaduanFormValues): FormErrors => {
    const errs: FormErrors = {};

    if (!values.judul.trim()) {
      errs.judul = 'Judul laporan wajib diisi';
    } else if (values.judul.trim().length < 5) {
      errs.judul = 'Judul minimal 5 karakter';
    }

    if (!values.kategori) {
      errs.kategori = 'Pilih kategori pengaduan';
    }

    if (!values.deskripsi.trim()) {
      errs.deskripsi = 'Deskripsi wajib diisi';
    } else if (values.deskripsi.trim().length < 10) {
      errs.deskripsi = 'Deskripsi minimal 10 karakter';
    }

    return errs;
  };

  // fotoUri opsional — dukungan upload ditambahkan di commit terpisah
  const submit = async (values: PengaduanFormValues, fotoUri?: string) => {
    const errs = validate(values);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      await createPengaduan(
        {
          judul: values.judul.trim(),
          kategori: values.kategori as KategoriPengaduan,
          deskripsi: values.deskripsi.trim(),
        },
        fotoUri,
      );

      // Kembali ke daftar; list akan refetch saat fokus
      router.back();
    } catch (err) {
      const axiosErr = err as AxiosError<{ message?: string }>;
      setErrors({
        [GENERAL_ERROR_KEY]:
          axiosErr.response?.data?.message ??
          'Gagal mengirim pengaduan. Coba lagi.',
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