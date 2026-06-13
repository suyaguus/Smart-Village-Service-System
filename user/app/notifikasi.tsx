import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import { router } from 'expo-router';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors, FontSize, FontWeight, Spacing, Radius, Shadow } from '@/constants/theme';
import { useNotifikasi, type NotifItem } from '@/hooks/use-notifikasi';
import { LoadingState, ErrorState, EmptyState } from '@/components/common/screen-state';
import { formatTanggalJam } from '@/utils/date';
import type { StatusPengajuan } from '@/types';

/**
 * app/notifikasi.tsx
 * Daftar notifikasi yang disintesis dari status pengajuan & pengaduan.
 * Tap → buka detail terkait.
 */

// Ikon per status
const STATUS_ICON: Record<StatusPengajuan, string> = {
  menunggu: '⏳',
  diproses: '🔄',
  selesai: '✅',
  ditolak: '❌',
};

function NotifRow({ item, onPress }: { item: NotifItem; onPress: () => void }) {
  const scheme = (useColorScheme() ?? 'light') as 'light' | 'dark';
  const c = Colors[scheme];

  // Warna aksen ikon berdasarkan status
  const accentMap: Record<StatusPengajuan, string> = {
    menunggu: c.menungguLight,
    diproses: c.diprosesLight,
    selesai: c.selesaiLight,
    ditolak: c.ditolakLight,
  };

  return (
    <TouchableOpacity
      style={[styles.row, { backgroundColor: c.surface }, Shadow.sm]}
      onPress={onPress}
      activeOpacity={0.75}
    >
      <View style={[styles.iconCircle, { backgroundColor: accentMap[item.status] }]}>
        <Text style={styles.icon}>{STATUS_ICON[item.status]}</Text>
      </View>

      <View style={styles.body}>
        <View style={styles.titleRow}>
          <Text style={[styles.judul, { color: c.text }]} numberOfLines={1}>
            {item.judul}
          </Text>
          <Text style={[styles.waktu, { color: c.textTertiary }]}>
            {formatTanggalJam(item.waktu)}
          </Text>
        </View>
        <Text style={[styles.pesan, { color: c.textSecondary }]} numberOfLines={2}>
          {item.pesan}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default function NotifikasiScreen() {
  const scheme = (useColorScheme() ?? 'light') as 'light' | 'dark';
  const c = Colors[scheme];

  const { notifikasi, isLoading, error, refetch } = useNotifikasi();

  const renderContent = () => {
    if (isLoading && !notifikasi) {
      return <LoadingState message="Memuat notifikasi..." />;
    }
    if (error) {
      return <ErrorState onRetry={refetch} />;
    }
    if (!notifikasi || notifikasi.length === 0) {
      return (
        <EmptyState
          emoji="🔔"
          title="Belum Ada Notifikasi"
          message="Pembaruan status surat dan pengaduan Anda akan muncul di sini."
        />
      );
    }

    return (
      <View style={styles.list}>
        {notifikasi.map((item) => (
          <NotifRow
            key={item.id}
            item={item}
            onPress={() => router.push(item.route as never)}
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
            refreshing={!!notifikasi && isLoading}
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
    gap: Spacing.md,
  },
  row: {
    flexDirection: 'row',
    borderRadius: Radius.lg,
    padding: Spacing.base,
    gap: Spacing.md,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 20,
  },
  body: {
    flex: 1,
    gap: 3,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.sm,
  },
  judul: {
    flex: 1,
    fontSize: FontSize.base,
    fontWeight: FontWeight.semiBold,
  },
  waktu: {
    fontSize: FontSize.xs,
  },
  pesan: {
    fontSize: FontSize.sm,
    lineHeight: 18,
  },
});