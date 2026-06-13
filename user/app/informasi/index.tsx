import {
  View,
  ScrollView,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import { router } from 'expo-router';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors, Spacing } from '@/constants/theme';
import { useFetch } from '@/hooks/use-fetch';
import { getAllInformasi } from '@/services/informasi.service';
import { InformasiCard } from '@/components/informasi/informasi-card';
import { LoadingState, ErrorState, EmptyState } from '@/components/common/screen-state';
import type { Informasi } from '@/types';

/**
 * app/informasi/index.tsx
 * Daftar berita & pengumuman desa dari GET /informasi.
 */
export default function InformasiScreen() {
  const scheme = (useColorScheme() ?? 'light') as 'light' | 'dark';
  const c = Colors[scheme];

  const { data: informasiList, isLoading, error, refetch } = useFetch<Informasi[]>(
    getAllInformasi,
  );

  const renderContent = () => {
    if (isLoading && !informasiList) {
      return <LoadingState message="Memuat informasi..." />;
    }
    if (error) {
      return <ErrorState onRetry={refetch} />;
    }
    if (!informasiList || informasiList.length === 0) {
      return (
        <EmptyState
          emoji="📰"
          title="Belum Ada Informasi"
          message="Berita dan pengumuman desa akan tampil di sini."
        />
      );
    }

    return (
      <View style={styles.list}>
        {informasiList.map((item) => (
          <InformasiCard
            key={item.id}
            item={item}
            onPress={() => router.push(`/informasi/${item.id}`)}
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
            refreshing={!!informasiList && isLoading}
            onRefresh={refetch}
            tintColor={c.primary}
            colors={[c.primary]}
          />
        }
      >
        {renderContent()}
      </ScrollView>
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
  },
  list: {
    flex: 1,
  },
});