import { useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useFocusEffect } from 'expo-router';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors, FontSize, FontWeight, Spacing, Radius, Shadow } from '@/constants/theme';
import { useAuth } from '@/hooks/use-auth';
import { useFetch } from '@/hooks/use-fetch';
import { getUserById } from '@/services/user.service';
import { ProfilHeader } from '@/components/profil/profil-header';
import { ProfilMenuItem } from '@/components/profil/profil-menu-item';
import { LoadingState, ErrorState } from '@/components/common/screen-state';
import type { User } from '@/types';

/**
 * app/(tabs)/profil.tsx — Tab: Profil
 * Data warga dari GET /user/:id. Refetch saat layar kembali fokus
 * (agar perubahan dari Edit Profil langsung tampil).
 */

// Baris label–nilai untuk info pribadi
function InfoRow({ label, value, isLast }: { label: string; value?: string; isLast?: boolean }) {
  const scheme = (useColorScheme() ?? 'light') as 'light' | 'dark';
  const c = Colors[scheme];

  return (
    <View
      style={[
        styles.infoRow,
        !isLast && { borderBottomWidth: 1, borderBottomColor: c.border },
      ]}
    >
      <Text style={[styles.infoLabel, { color: c.textSecondary }]}>{label}</Text>
      <Text
        style={[
          styles.infoValue,
          { color: value ? c.text : c.textTertiary },
        ]}
      >
        {value || 'Belum diisi'}
      </Text>
    </View>
  );
}

export default function ProfilScreen() {
  const scheme = (useColorScheme() ?? 'light') as 'light' | 'dark';
  const c = Colors[scheme];

  const { user: authUser, signOut } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Keluar Akun',
      'Apakah Anda yakin ingin keluar?',
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Keluar',
          style: 'destructive',
          onPress: async () => {
            await signOut();
            router.replace('/(auth)/login');
          },
        },
      ],
    );
  };

  const { data: user, isLoading, error, refetch } = useFetch<User>(
    () => getUserById(authUser?.id ?? ''),
    [authUser?.id],
  );

  // Refresh saat kembali fokus (mis. setelah edit profil)
  useFocusEffect(
    useCallback(() => {
      refetch();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  // Header pakai data ter-fetch, fallback ke authUser supaya tampil instan
  const displayNama = user?.nama ?? authUser?.nama ?? 'Warga';
  const displayNik = user?.nik ?? authUser?.nik ?? '-';

  const renderInfo = () => {
    if (isLoading && !user) {
      return <LoadingState message="Memuat data..." />;
    }
    if (error) {
      return <ErrorState message="Gagal memuat data profil." onRetry={refetch} />;
    }

    const alamatRtRw =
      user?.rt || user?.rw
        ? `RT ${user?.rt || '-'} / RW ${user?.rw || '-'}`
        : '';

    return (
      <View style={[styles.infoCard, { backgroundColor: c.surface }, Shadow.sm]}>
        <InfoRow label="NIK" value={user?.nik} />
        <InfoRow label="Nama Lengkap" value={user?.nama} />
        <InfoRow label="No. Telepon" value={user?.no_telepon} />
        <InfoRow label="Alamat" value={user?.alamat} />
        <InfoRow label="RT / RW" value={alamatRtRw} />
        <InfoRow label="Kelurahan" value={user?.kelurahan} />
        <InfoRow label="Kecamatan" value={user?.kecamatan} isLast />
      </View>
    );
  };

  return (
    <SafeAreaView
      style={[styles.safe, { backgroundColor: c.primary }]}
      edges={['top']}
    >
      <StatusBar barStyle="light-content" backgroundColor={c.primary} />

      {/* Header biru */}
      <ProfilHeader nama={displayNama} nik={displayNik} />

      {/* Body */}
      <ScrollView
        style={[styles.body, { backgroundColor: c.background }]}
        contentContainerStyle={styles.bodyContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Informasi pribadi */}
        <Text style={[styles.sectionTitle, { color: c.text }]}>
          Informasi Pribadi
        </Text>
        {renderInfo()}

        {/* Pengaturan */}
        <Text style={[styles.sectionTitle, { color: c.text }]}>Pengaturan</Text>
        <View style={[styles.menuCard, { backgroundColor: c.surface }, Shadow.sm]}>
          <ProfilMenuItem
            icon="✏️"
            label="Edit Profil"
            onPress={() => router.push('/profil/edit')}
          />
        </View>

        {/* Logout */}
        <View style={[styles.menuCard, { backgroundColor: c.surface }, Shadow.sm]}>
          <ProfilMenuItem
            icon="🚪"
            label="Keluar"
            onPress={handleLogout}
            destructive
            showChevron={false}
          />
        </View>

        {/* Versi aplikasi */}
        <Text style={[styles.version, { color: c.textTertiary }]}>
          Smart Village v1.0.0
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  body: {
    flex: 1,
    borderTopLeftRadius: Spacing.lg,
    borderTopRightRadius: Spacing.lg,
  },
  bodyContent: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    marginBottom: Spacing.md,
    marginTop: Spacing.sm,
  },
  infoCard: {
    borderRadius: Radius.lg,
    paddingHorizontal: Spacing.base,
    marginBottom: Spacing.lg,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    gap: Spacing.base,
  },
  infoLabel: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
  },
  infoValue: {
    flex: 1,
    fontSize: FontSize.base,
    fontWeight: FontWeight.medium,
    textAlign: 'right',
  },
  menuCard: {
    borderRadius: Radius.lg,
    overflow: 'hidden',
    marginBottom: Spacing.lg,
  },
  version: {
    fontSize: FontSize.xs,
    textAlign: 'center',
    marginTop: Spacing.sm,
  },
});