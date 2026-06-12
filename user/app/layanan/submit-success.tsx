import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors, FontSize, FontWeight, Spacing, Radius } from '@/constants/theme';

export default function SubmitSuccessScreen() {
  const scheme = (useColorScheme() ?? 'light') as 'light' | 'dark';
  const c = Colors[scheme];

  const { nomorSurat, namaSurat } = useLocalSearchParams<{
    nomorSurat: string;
    namaSurat: string;
  }>();

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: c.background }]}>
      <View style={styles.content}>
        {/* Success Icon */}
        <View style={[styles.iconCircle, { backgroundColor: c.selesaiLight }]}>
          <Text style={styles.checkmark}>✓</Text>
        </View>

        <Text style={[styles.title, { color: c.text }]}>
          Pengajuan Berhasil!
        </Text>
        <Text style={[styles.subtitle, { color: c.textSecondary }]}>
          {namaSurat ? `${namaSurat} ` : 'Surat '}
          Anda telah diajukan dan akan segera diproses oleh admin desa.
        </Text>

        {/* Nomor Surat Card */}
        {nomorSurat ? (
          <View style={[styles.nomorCard, { backgroundColor: c.surface, borderColor: c.border }]}>
            <Text style={[styles.nomorLabel, { color: c.textTertiary }]}>
              Nomor Pengajuan
            </Text>
            <Text style={[styles.nomorValue, { color: c.primary }]}>
              {nomorSurat}
            </Text>
          </View>
        ) : null}
      </View>

      {/* Action Buttons */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.primaryButton, { backgroundColor: c.primary }]}
          onPress={() => router.replace('/(tabs)/status')}
          activeOpacity={0.85}
        >
          <Text style={styles.primaryButtonText}>Lihat Status Pengajuan</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.secondaryButton, { borderColor: c.borderMedium }]}
          onPress={() => router.replace('/(tabs)')}
          activeOpacity={0.7}
        >
          <Text style={[styles.secondaryButtonText, { color: c.textSecondary }]}>
            Kembali ke Beranda
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
    gap: Spacing.md,
  },
  iconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  checkmark: {
    fontSize: 48,
    color: '#28A96B',
    fontWeight: '700',
  },
  title: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.bold,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: FontSize.base,
    textAlign: 'center',
    lineHeight: 21,
    paddingHorizontal: Spacing.sm,
  },
  nomorCard: {
    marginTop: Spacing.lg,
    paddingVertical: Spacing.base,
    paddingHorizontal: Spacing.xl,
    borderRadius: Radius.lg,
    borderWidth: 1,
    alignItems: 'center',
    gap: 4,
  },
  nomorLabel: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.medium,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  nomorValue: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    letterSpacing: 0.5,
  },
  actions: {
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  primaryButton: {
    borderRadius: Radius.md,
    paddingVertical: 15,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.bold,
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  secondaryButton: {
    borderRadius: Radius.md,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1.5,
  },
  secondaryButtonText: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.semiBold,
  },
});