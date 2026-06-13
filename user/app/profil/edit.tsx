import { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors, FontSize, FontWeight, Spacing, Radius } from '@/constants/theme';
import { useAuth } from '@/hooks/use-auth';
import { useFetch } from '@/hooks/use-fetch';
import { useEditProfilForm } from '@/hooks/use-edit-profil-form';
import { getUserById } from '@/services/user.service';
import { FormInput } from '@/components/layanan/form-input';
import { LoadingState, ErrorState } from '@/components/common/screen-state';
import type { User, UpdateUserRequest } from '@/types';

/**
 * app/profil/edit.tsx
 * Form edit profil — data awal dari GET /user/:id, simpan via PATCH /user/:id.
 * NIK ditampilkan read-only (tidak bisa diubah).
 */
export default function EditProfilScreen() {
  const scheme = (useColorScheme() ?? 'light') as 'light' | 'dark';
  const c = Colors[scheme];

  const { user: authUser } = useAuth();
  const userId = authUser?.id ?? '';

  const { data: user, isLoading, error, refetch } = useFetch<User>(
    () => getUserById(userId),
    [userId],
  );

  const { errors, generalError, isSubmitting, submit, clearError } =
    useEditProfilForm();

  // Form state
  const [form, setForm] = useState<UpdateUserRequest>({});

  // Isi form saat data termuat
  useEffect(() => {
    if (user) {
      setForm({
        nama: user.nama ?? '',
        no_telepon: user.no_telepon ?? '',
        alamat: user.alamat ?? '',
        rt: user.rt ?? '',
        rw: user.rw ?? '',
        kelurahan: user.kelurahan ?? '',
        kecamatan: user.kecamatan ?? '',
      });
    }
  }, [user]);

  const setField = (field: keyof UpdateUserRequest) => (value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    clearError(field);
  };

  const onSubmit = () => submit(userId, form);

  // ── Loading / Error ──────────────────────────────────────────────
  if (isLoading && !user) {
    return (
      <View style={[styles.fill, { backgroundColor: c.background }]}>
        <LoadingState message="Memuat data profil..." />
      </View>
    );
  }

  if (error || !user) {
    return (
      <View style={[styles.fill, { backgroundColor: c.background }]}>
        <ErrorState message="Gagal memuat data profil." onRetry={refetch} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* General error */}
          {generalError && (
            <View style={[styles.errorBanner, { backgroundColor: c.ditolakLight }]}>
              <Text style={[styles.errorBannerText, { color: c.ditolakText }]}>
                ⚠️ {generalError}
              </Text>
            </View>
          )}

          {/* NIK read-only */}
          <View style={styles.fieldGroup}>
            <Text style={[styles.label, { color: c.textSecondary }]}>
              NIK (tidak dapat diubah)
            </Text>
            <View style={[styles.readonlyBox, { backgroundColor: c.border, borderColor: c.borderMedium }]}>
              <Text style={[styles.readonlyText, { color: c.textSecondary }]}>
                {user.nik}
              </Text>
              <Text style={styles.lockIcon}>🔒</Text>
            </View>
          </View>

          {/* Editable fields */}
          <FormInput
            label="Nama Lengkap"
            value={form.nama ?? ''}
            onChangeText={setField('nama')}
            required
            placeholder="Sesuai KTP"
            error={errors.nama}
          />

          <FormInput
            label="No. Telepon"
            value={form.no_telepon ?? ''}
            onChangeText={setField('no_telepon')}
            type="number"
            placeholder="08xxxxxxxxxx"
            error={errors.no_telepon}
          />

          <FormInput
            label="Alamat"
            value={form.alamat ?? ''}
            onChangeText={setField('alamat')}
            type="textarea"
            placeholder="Nama jalan, nomor rumah, dusun"
            error={errors.alamat}
          />

          {/* RT & RW sejajar */}
          <View style={styles.row}>
            <View style={styles.half}>
              <FormInput
                label="RT"
                value={form.rt ?? ''}
                onChangeText={setField('rt')}
                type="number"
                placeholder="001"
              />
            </View>
            <View style={styles.half}>
              <FormInput
                label="RW"
                value={form.rw ?? ''}
                onChangeText={setField('rw')}
                type="number"
                placeholder="002"
              />
            </View>
          </View>

          <FormInput
            label="Kelurahan / Desa"
            value={form.kelurahan ?? ''}
            onChangeText={setField('kelurahan')}
            placeholder="Nama kelurahan/desa"
          />

          <FormInput
            label="Kecamatan"
            value={form.kecamatan ?? ''}
            onChangeText={setField('kecamatan')}
            placeholder="Nama kecamatan"
          />

          {/* Submit */}
          <TouchableOpacity
            style={[
              styles.submitButton,
              { backgroundColor: isSubmitting ? c.primaryLight : c.primary },
            ]}
            onPress={onSubmit}
            activeOpacity={0.85}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <Text style={styles.submitText}>Simpan Perubahan</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  scroll: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  errorBanner: {
    borderRadius: Radius.sm,
    padding: Spacing.md,
    marginBottom: Spacing.base,
  },
  errorBannerText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
  },
  fieldGroup: {
    marginBottom: Spacing.base,
  },
  label: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
    marginBottom: Spacing.xs,
  },
  readonlyBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1.5,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Platform.OS === 'ios' ? 14 : 12,
  },
  readonlyText: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.medium,
  },
  lockIcon: {
    fontSize: 14,
  },
  row: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  half: {
    flex: 1,
  },
  submitButton: {
    borderRadius: Radius.md,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: Spacing.md,
  },
  submitText: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.bold,
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
});