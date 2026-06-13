import { useState } from 'react';
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
import { usePengaduanForm } from '@/hooks/use-pengaduan-form';
import { FormInput } from '@/components/layanan/form-input';
import { KategoriSelector } from '@/components/pengaduan/kategori-selector';
import { FotoPicker } from '@/components/pengaduan/foto-picker';
import type { KategoriPengaduan } from '@/types';

/**
 * app/pengaduan/buat.tsx
 * Form pengaduan baru → POST /pengaduan.
 * Field: judul, kategori, deskripsi. (Upload foto ditambahkan terpisah.)
 */
export default function PengaduanFormScreen() {
  const scheme = (useColorScheme() ?? 'light') as 'light' | 'dark';
  const c = Colors[scheme];

  const [judul, setJudul] = useState('');
  const [kategori, setKategori] = useState<KategoriPengaduan | ''>('');
  const [deskripsi, setDeskripsi] = useState('');
  const [fotoUri, setFotoUri] = useState<string | null>(null);

  const { errors, generalError, isSubmitting, submit, clearError } =
    usePengaduanForm();

  const onSubmit = () => {
    submit({ judul, kategori, deskripsi }, fotoUri ?? undefined);
  };

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
          {/* Info banner */}
          <View style={[styles.infoBanner, { backgroundColor: c.menungguLight }]}>
            <Text style={styles.infoIcon}>📢</Text>
            <Text style={[styles.infoText, { color: c.menungguText }]}>
              Sampaikan keluhan atau laporan Anda. Admin desa akan menindaklanjuti.
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

          {/* Judul */}
          <FormInput
            label="Judul Laporan"
            value={judul}
            onChangeText={(t) => {
              setJudul(t);
              clearError('judul');
            }}
            required
            placeholder="Contoh: Jalan rusak di RT 03"
            error={errors.judul}
          />

          {/* Kategori */}
          <KategoriSelector
            value={kategori}
            onChange={(v) => {
              setKategori(v);
              clearError('kategori');
            }}
            required
            error={errors.kategori}
          />

          {/* Deskripsi */}
          <FormInput
            label="Deskripsi"
            value={deskripsi}
            onChangeText={(t) => {
              setDeskripsi(t);
              clearError('deskripsi');
            }}
            type="textarea"
            required
            placeholder="Jelaskan detail laporan Anda..."
            error={errors.deskripsi}
          />

          {/* Foto bukti (opsional) */}
          <FotoPicker fotoUri={fotoUri} onChange={setFotoUri} />

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
              <Text style={styles.submitText}>Kirim Pengaduan</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
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