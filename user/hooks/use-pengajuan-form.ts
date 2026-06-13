import { useState } from 'react';
import { router } from 'expo-router';
import { AxiosError } from 'axios';
import { createPengajuan } from '@/services/pengajuan.service';
import type { FieldSurat } from '@/types';

// Key khusus untuk error umum (bukan per-field)
const GENERAL_ERROR_KEY = '_general';

type FormErrors = Record<string, string>;

export function usePengajuanForm() {
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validasi field wajib
  const validate = (
    fields: FieldSurat[],
    values: Record<string, string>,
  ): FormErrors => {
    const errs: FormErrors = {};
    fields.forEach((field) => {
      if (field.wajib && !values[field.key]?.trim()) {
        errs[field.key] = `${field.nama_field} wajib diisi`;
      }
    });
    return errs;
  };

  // Submit
  const submit = async (
    jenisSuratId: string,
    fields: FieldSurat[],
    values: Record<string, string>,
    namaSurat?: string,
  ) => {
    const errs = validate(fields, values);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const result = await createPengajuan({
        jenis_surat_id: jenisSuratId,
        data_isian: values,
      });

      // Redirect ke halaman sukses, bawa nomor surat
      router.replace({
        pathname: '/layanan/submit-success',
        params: {
          nomorSurat: result.nomor_surat ?? result.id,
          namaSurat: namaSurat ?? '',
        },
      });
    } catch (err) {
      const axiosErr = err as AxiosError<{ message?: string }>;
      setErrors({
        [GENERAL_ERROR_KEY]:
          axiosErr.response?.data?.message ??
          'Gagal mengajukan surat. Coba lagi.',
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