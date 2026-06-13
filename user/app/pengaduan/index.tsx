import { useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors, FontSize, FontWeight, Spacing, Radius, Shadow } from '@/constants/theme';
import { useAuth } from '@/hooks/use-auth';
import { useFetch } from '@/hooks/use-fetch';
import { getPengaduanByUser } from '@/services/pengaduan.service';
import { PengaduanCard } from '@/components/pengaduan/pengaduan-card';
import { LoadingState, ErrorState, EmptyState } from '@/components/common/screen-state';
import type { Pengaduan } from '@/types';

/**
 * app/pengaduan/index.tsx
 * Daftar pengaduan milik user dari GET /pengaduan/user/:id.
 * FAB "+" untuk buat pengaduan baru. Refetch saat layar kembali fokus.
 */
export default function DaftarPengaduanScreen() {
  const scheme = (useColorScheme() ?? 'light') as 'light' | 'dark';
  const c = Colors[scheme];

  const { user } = useAuth();

  const { data: pengaduanList, isLoading, error, refetch } = useFetch<Pengaduan[]>(
    () => getPengaduanByUser(user?.id ?? ''),
    [user?.id],
  );

  // Refetch tiap kali layar kembali fokus (mis. setelah buat pengaduan).
  // Dependency sengaja kosong supaya callback stabil & tidak memicu loop.
  useFocusEffect(
    useCallback(() => {
      refetch();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  const renderContent = () => {
    if (isLoading && !pengaduanList) {
      return <LoadingState message="Memuat pengaduan..." />;
    }
    if (error) {
      return <ErrorState onRetry={refetch} />;
    }
    if (!pengaduanList || pengaduanList.length === 0) {
      return (
        <EmptyState
          emoji="📢"
          title="Belum Ada Pengaduan"
          message="Laporan yang Anda buat akan muncul di sini."
        />
      );
    }

    return (
      <View style={styles.list}>
        {pengaduanList.map((item) => (
          <PengaduanCard
            key={item.id}
            item={item}
            onPress={() => router.push(`/pengaduan/${item.id}`)}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={!!pengaduanList && isLoading}
            onRefresh={refetch}
            tintColor={c.primary}
            colors={[c.primary]}
          />
        }
      >
        {renderContent()}
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: c.primary }, Shadow.lg]}
        onPress={() => router.push('/pengaduan/buat')}
        activeOpacity={0.85}
      >
        <Text style={styles.fabIcon}>+</Text>
        <Text style={styles.fabLabel}>Buat</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    padding: Spacing.lg,
    paddingBottom: 96, // ruang untuk FAB
  },
  list: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    right: Spacing.lg,
    bottom: Spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: Radius.full,
    gap: 6,
  },
  fabIcon: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '600',
    lineHeight: 24,
  },
  fabLabel: {
    color: '#FFFFFF',
    fontSize: FontSize.base,
    fontWeight: FontWeight.bold,
  },
});