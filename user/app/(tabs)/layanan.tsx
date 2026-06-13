import { View, Text, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors, FontSize, FontWeight, Spacing } from '@/constants/theme';
import { useFetch } from '@/hooks/use-fetch';
import { getAllJenisSurat } from '@/services/jenis-surat.service';
import { JenisSuratCard } from '@/components/layanan/jenis-surat-card';
import { LoadingState, ErrorState, EmptyState } from '@/components/common/screen-state';
import type { JenisSurat } from '@/types';

export default function LayananScreen() {
  const scheme = (useColorScheme() ?? 'light') as 'light' | 'dark';
  const c = Colors[scheme];

  const { data: jenisSuratList, isLoading, error, refetch } = useFetch<JenisSurat[]>(
    getAllJenisSurat,
  );

  const handleSelect = (item: JenisSurat) => {
    router.push(`/layanan/${item.id}?nama=${encodeURIComponent(item.nama)}` as never);
  };

  // Body content berdasarkan state
  const renderContent = () => {
    if (isLoading) return <LoadingState message="Memuat jenis surat..." />;
    if (error) return <ErrorState onRetry={refetch} />;
    if (!jenisSuratList || jenisSuratList.length === 0) {
      return (
        <EmptyState
          icon="fileLines"
          title="Belum Ada Jenis Surat"
          message="Jenis surat akan muncul setelah ditambahkan admin desa."
        />
      );
    }

    return (
      <View style={styles.list}>
        {jenisSuratList.map((item) => (
          <JenisSuratCard
            key={item.id}
            item={item}
            onPress={() => handleSelect(item)}
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
        <Text style={styles.headerTitle}>Buat Surat</Text>
        <Text style={styles.headerSub}>Pilih jenis surat yang ingin diajukan</Text>
      </View>

      {/* Body */}
      <ScrollView
        style={[styles.body, { backgroundColor: c.background }]}
        contentContainerStyle={styles.bodyContent}
        showsVerticalScrollIndicator={false}
      >
        {renderContent()}
      </ScrollView>
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
  },
  bodyContent: {
    flexGrow: 1,
    padding: Spacing.lg,
  },
  list: {
    flex: 1,
  },
});