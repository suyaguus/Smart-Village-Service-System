import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors, FontSize, FontWeight, Spacing, Radius, Shadow } from '@/constants/theme';
import { useFetch } from '@/hooks/use-fetch';
import { getPengaduanById } from '@/services/pengaduan.service';
import { StatusBadge } from '@/components/common/status-badge';
import { LoadingState, ErrorState } from '@/components/common/screen-state';
import { getKategoriMeta } from '@/constants/pengaduan';
import { formatTanggalLengkap, formatTanggalJam } from '@/utils/date';
import type { Pengaduan } from '@/types';

/**
 * app/pengaduan/[id].tsx
 * Detail pengaduan dari GET /pengaduan/:id.
 * Menampilkan isi laporan, foto (jika ada), dan respon dari admin.
 */
export default function DetailPengaduanScreen() {
  const scheme = (useColorScheme() ?? 'light') as 'light' | 'dark';
  const c = Colors[scheme];

  const { id } = useLocalSearchParams<{ id: string }>();

  const { data: pengaduan, isLoading, error, refetch } = useFetch<Pengaduan>(
    () => getPengaduanById(id),
    [id],
  );

  if (isLoading) {
    return (
      <View style={[styles.fill, { backgroundColor: c.background }]}>
        <LoadingState message="Memuat detail..." />
      </View>
    );
  }

  if (error || !pengaduan) {
    return (
      <View style={[styles.fill, { backgroundColor: c.background }]}>
        <ErrorState message="Gagal memuat detail pengaduan." onRetry={refetch} />
      </View>
    );
  }

  const kategori = getKategoriMeta(pengaduan.kategori);
  const responList = pengaduan.respon ?? [];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: c.background }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* ── Isi Laporan ── */}
      <View style={[styles.card, { backgroundColor: c.surface }, Shadow.sm]}>
        <View style={styles.headerRow}>
          <View style={[styles.kategoriPill, { backgroundColor: c.primaryBg }]}>
            <Text style={styles.kategoriIcon}>{kategori.icon}</Text>
            <Text style={[styles.kategoriLabel, { color: c.diprosesText }]}>
              {kategori.label}
            </Text>
          </View>
          <StatusBadge status={pengaduan.status} />
        </View>

        <Text style={[styles.judul, { color: c.text }]}>{pengaduan.judul}</Text>
        <Text style={[styles.tanggal, { color: c.textTertiary }]}>
          {formatTanggalLengkap(pengaduan.created_at)}
        </Text>

        <Text style={[styles.deskripsi, { color: c.textSecondary }]}>
          {pengaduan.deskripsi}
        </Text>

        {/* Foto bukti, jika ada */}
        {pengaduan.foto_url ? (
          <Image
            source={{ uri: pengaduan.foto_url }}
            style={styles.foto}
            resizeMode="cover"
          />
        ) : null}
      </View>

      {/* ── Tanggapan Admin ── */}
      <Text style={[styles.sectionTitle, { color: c.text }]}>
        Tanggapan Admin
      </Text>

      {responList.length === 0 ? (
        <View style={[styles.card, styles.emptyRespon, { backgroundColor: c.surface }, Shadow.sm]}>
          <Text style={styles.emptyIcon}>💬</Text>
          <Text style={[styles.emptyText, { color: c.textSecondary }]}>
            Belum ada tanggapan dari admin desa.
          </Text>
        </View>
      ) : (
        responList.map((respon) => (
          <View
            key={respon.id}
            style={[styles.card, styles.responCard, { backgroundColor: c.surface, borderLeftColor: c.primary }, Shadow.sm]}
          >
            <View style={styles.responHeader}>
              <Text style={[styles.responAuthor, { color: c.primary }]}>
                🏛️ Admin Desa
              </Text>
              <Text style={[styles.responTime, { color: c.textTertiary }]}>
                {formatTanggalJam(respon.created_at)}
              </Text>
            </View>
            <Text style={[styles.responPesan, { color: c.text }]}>
              {respon.pesan}
            </Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  content: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  card: {
    borderRadius: Radius.lg,
    padding: Spacing.base,
    marginBottom: Spacing.lg,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  kategoriPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md - 2,
    paddingVertical: Spacing.xs + 1,
    borderRadius: Radius.full,
    gap: 5,
  },
  kategoriIcon: {
    fontSize: 13,
  },
  kategoriLabel: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semiBold,
  },
  judul: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    lineHeight: 22,
    marginBottom: 4,
  },
  tanggal: {
    fontSize: FontSize.xs,
    marginBottom: Spacing.md,
  },
  deskripsi: {
    fontSize: FontSize.base,
    lineHeight: 21,
  },
  foto: {
    width: '100%',
    height: 200,
    borderRadius: Radius.md,
    marginTop: Spacing.base,
  },
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    marginBottom: Spacing.md,
  },
  emptyRespon: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
    gap: Spacing.sm,
  },
  emptyIcon: {
    fontSize: 28,
  },
  emptyText: {
    fontSize: FontSize.sm,
    textAlign: 'center',
  },
  responCard: {
    borderLeftWidth: 3,
  },
  responHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  responAuthor: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
  },
  responTime: {
    fontSize: FontSize.xs,
  },
  responPesan: {
    fontSize: FontSize.base,
    lineHeight: 21,
  },
});