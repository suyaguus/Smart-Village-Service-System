import { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors, FontSize, FontWeight, Spacing } from '@/constants/theme';
import { useAuth } from '@/hooks/use-auth';
import { useFetch } from '@/hooks/use-fetch';
import { getPengajuanByUser } from '@/services/pengajuan.service';
import { FilterTabs, type FilterOption } from '@/components/common/filter-tabs';
import { PengajuanCard } from '@/components/status/pengajuan-card';
import { LoadingState, ErrorState, EmptyState } from '@/components/common/screen-state';
import type { PengajuanSurat } from '@/types';

const FILTER_OPTIONS: FilterOption[] = [
  { label: 'Semua', value: 'semua' },
  { label: 'Menunggu', value: 'menunggu' },
  { label: 'Diproses', value: 'diproses' },
  { label: 'Selesai', value: 'selesai' },
  { label: 'Ditolak', value: 'ditolak' },
];

export default function StatusScreen() {
  const scheme = (useColorScheme() ?? 'light') as 'light' | 'dark';
  const c = Colors[scheme];

  const { user } = useAuth();
  const params = useLocalSearchParams<{ filter?: string }>();

  // Filter aktif — bisa di-set dari StatsSummaryCard di home
  const [activeFilter, setActiveFilter] = useState<string>(params.filter ?? 'semua');

  useEffect(() => {
    if (params.filter) setActiveFilter(params.filter);
  }, [params.filter]);

  const { data: pengajuanList, isLoading, error, refetch } = useFetch<PengajuanSurat[]>(
    () => getPengajuanByUser(user?.id ?? ''),
    [user?.id],
  );

  // Filter client-side
  const filtered =
    activeFilter === 'semua'
      ? pengajuanList ?? []
      : (pengajuanList ?? []).filter((p) => p.status === activeFilter);

  const handleOpenDetail = (item: PengajuanSurat) => {
    router.push(`/status/${item.id}`);
  };

  // Body
  const renderContent = () => {
    if (isLoading && !pengajuanList) {
      return <LoadingState message="Memuat pengajuan..." />;
    }
    if (error) {
      return <ErrorState onRetry={refetch} />;
    }
    if (filtered.length === 0) {
      return (
        <EmptyState
          emoji="📭"
          title="Belum Ada Pengajuan"
          message={
            activeFilter === 'semua'
              ? 'Pengajuan surat Anda akan muncul di sini.'
              : `Tidak ada pengajuan berstatus "${activeFilter}".`
          }
        />
      );
    }

    return (
      <View style={styles.list}>
        {filtered.map((item) => (
          <PengajuanCard
            key={item.id}
            item={item}
            onPress={() => handleOpenDetail(item)}
          />
        ))}
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
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Status Pengajuan</Text>
        <Text style={styles.headerSub}>Pantau perkembangan surat Anda</Text>
      </View>

      {/* Body */}
      <View style={[styles.body, { backgroundColor: c.background }]}>
        {/* Filter tabs */}
        <View style={styles.filterWrapper}>
          <FilterTabs
            options={FILTER_OPTIONS}
            active={activeFilter}
            onChange={setActiveFilter}
          />
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={!!pengajuanList && isLoading}
              onRefresh={refetch}
              tintColor={c.primary}
              colors={[c.primary]}
            />
          }
        >
          {renderContent()}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.base,
    paddingBottom: Spacing.lg,
    gap: 4,
  },
  headerTitle: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.bold,
    color: '#FFFFFF',
  },
  headerSub: {
    fontSize: FontSize.sm,
    color: 'rgba(255,255,255,0.75)',
  },
  body: {
    flex: 1,
    borderTopLeftRadius: Spacing.lg,
    borderTopRightRadius: Spacing.lg,
    paddingTop: Spacing.base,
  },
  filterWrapper: {
    marginBottom: Spacing.base,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  list: {
    flex: 1,
  },
});