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
import { Stack, useLocalSearchParams } from 'expo-router';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors, FontSize, FontWeight, Spacing, Radius } from '@/constants/theme';
import { useFetch } from '@/hooks/use-fetch';
import { usePengajuanForm } from '@/hooks/use-pengajuan-form';
import { getFieldsByJenisSurat } from '@/services/field-surat.service';
import { FormInput } from '@/components/layanan/form-input';
import { LoadingState, ErrorState } from '@/components/common/screen-state';
import type { FieldSurat } from '@/types';

export default function DynamicFormScreen() {
  const scheme = (useColorScheme() ?? 'light') as 'light' | 'dark';
  const c = Colors[scheme];

  const { jenisSuratId, nama } = useLocalSearchParams<{
    jenisSuratId: string;
    nama: string;
  }>();

  // Fetch fields untuk jenis surat ini
  const { data: fields, isLoading, error, refetch } = useFetch<FieldSurat[]>(
    () => getFieldsByJenisSurat(jenisSuratId),
    [jenisSuratId],
  );

  // Form values keyed by field.key
  const [values, setValues] = useState<Record<string, string>>({});

  const { errors, generalError, isSubmitting, submit, clearError } =
    usePengajuanForm();

  // Inisialisasi values kosong saat fields termuat
  useEffect(() => {
    if (fields) {
      const initial: Record<string, string> = {};
      fields.forEach((f) => {
        initial[f.key] = '';
      });
      setValues(initial);
    }
  }, [fields]);

  const setValue = (key: string) => (val: string) => {
    setValues((prev) => ({ ...prev, [key]: val }));
    clearError(key);
  };

  const onSubmit = () => {
    if (!fields) return;
    submit(jenisSuratId, fields, values, nama);
  };

  // Render
  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      {/* Set judul header native secara dinamis */}
      <Stack.Screen options={{ title: nama || 'Buat Surat' }} />

      {isLoading ? (
        <LoadingState message="Memuat formulir..." />
      ) : error ? (
        <ErrorState
          message="Gagal memuat field formulir."
          onRetry={refetch}
        />
      ) : (
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView
            contentContainerStyle={styles.scroll}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* Info banner */}
            <View style={[styles.infoBanner, { backgroundColor: c.primaryBg }]}>
              <Text style={styles.infoIcon}>📝</Text>
              <Text style={[styles.infoText, { color: c.diprosesText }]}>
                Lengkapi data berikut untuk mengajukan {nama || 'surat'}.
              </Text>
            </View>

            {/* General error */}
            {generalError && (
              <View style={[styles.errorBanner, { backgroundColor: c.ditolakLight }]}>
                <Text style={[styles.errorBannerText, { color: c.ditolakText }]}>
                  ⚠️ {generalError}
                </Text>
              </View>
            )}

            {/* Dynamic fields */}
            {fields?.map((field) => (
              <FormInput
                key={field.id}
                label={field.nama_field}
                value={values[field.key] ?? ''}
                onChangeText={setValue(field.key)}
                type={field.tipe}
                required={field.wajib}
                options={field.opsi}
                error={errors[field.key]}
              />
            ))}

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
                <Text style={styles.submitText}>Ajukan Surat</Text>
              )}
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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
  infoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
    gap: Spacing.sm,
  },
  infoIcon: {
    fontSize: 18,
  },
  infoText: {
    flex: 1,
    fontSize: FontSize.sm,
    lineHeight: 18,
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