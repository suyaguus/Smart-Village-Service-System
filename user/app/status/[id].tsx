import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors, FontSize, FontWeight, Spacing, Radius, Shadow } from '@/constants/theme';
import { useFetch } from '@/hooks/use-fetch';
import { getPengajuanById } from '@/services/pengajuan.service';
import { StatusBadge } from '@/components/common/status-badge';
import { StatusTimeline } from '@/components/status/status-timeline';
import { LoadingState, ErrorState } from '@/components/common/screen-state';
import { formatTanggalLengkap } from '@/utils/date';
import type { PengajuanSurat } from '@/types';

// Ubah key snake_case jadi label rapi: "nama_lengkap" → "Nama Lengkap"
function prettifyKey(key: string): string {
  return key
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (ch) => ch.toUpperCase());
}

export default function DetailPengajuanScreen() {
  const scheme = (useColorScheme() ?? 'light') as 'light' | 'dark';
  const c = Colors[scheme];

  const { id } = useLocalSearchParams<{ id: string }>();

  const { data: pengajuan, isLoading, error, refetch } = useFetch<PengajuanSurat>(
    () => getPengajuanById(id),
    [id],
  );

  if (isLoading) {
    return (
      <View style={[styles.fill, { backgroundColor: c.background }]}>
        <LoadingState message="Memuat detail..." />
      </View>
    );
  }

  if (error || !pengajuan) {
    return (
      <View style={[styles.fill, { backgroundColor: c.background }]}>
        <ErrorState message="Gagal memuat detail pengajuan." onRetry={refetch} />
      </View>
    );
  }

  const namaSurat = pengajuan.jenis_surat?.nama ?? 'Pengajuan Surat';
  const dataEntries = Object.entries(pengajuan.data_isian ?? {});

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: c.background }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* ── Ringkasan Card ── */}
      <View style={[styles.card, { backgroundColor: c.surface }, Shadow.sm]}>
        <View style={styles.summaryHeader}>
          <View style={[styles.iconBox, { backgroundColor: c.primaryBg }]}>
            <Text style={styles.icon}>📋</Text>
          </View>
          <StatusBadge status={pengajuan.status} />
        </View>

        <Text style={[styles.namaSurat, { color: c.text }]}>{namaSurat}</Text>

        <View style={[styles.metaRow, { borderTopColor: c.border }]}>
          <View style={styles.metaItem}>
            <Text style={[styles.metaLabel, { color: c.textTertiary }]}>
              Nomor Pengajuan
            </Text>
            <Text style={[styles.metaValue, { color: c.text }]}>
              {pengajuan.nomor_surat ?? pengajuan.id}
            </Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={[styles.metaLabel, { color: c.textTertiary }]}>
              Tanggal Diajukan
            </Text>
            <Text style={[styles.metaValue, { color: c.text }]}>
              {formatTanggalLengkap(pengajuan.created_at)}
            </Text>
          </View>
        </View>
      </View>

      {/* ── Timeline Status ── */}
      <Text style={[styles.sectionTitle, { color: c.text }]}>Riwayat Status</Text>
      <View style={[styles.card, { backgroundColor: c.surface }, Shadow.sm]}>
        <StatusTimeline
          status={pengajuan.status}
          createdAt={pengajuan.created_at}
          updatedAt={pengajuan.updated_at}
        />
      </View>

      {/* ── Keterangan (jika ada, mis. alasan ditolak) ── */}
      {pengajuan.keterangan ? (
        <>
          <Text style={[styles.sectionTitle, { color: c.text }]}>Keterangan</Text>
          <View style={[styles.card, { backgroundColor: c.surface }, Shadow.sm]}>
            <Text style={[styles.keterangan, { color: c.textSecondary }]}>
              {pengajuan.keterangan}
            </Text>
          </View>
        </>
      ) : null}

      {/* ── Data Isian Form ── */}
      {dataEntries.length > 0 && (
        <>
          <Text style={[styles.sectionTitle, { color: c.text }]}>Data Pengajuan</Text>
          <View style={[styles.card, { backgroundColor: c.surface }, Shadow.sm]}>
            {dataEntries.map(([key, value], i) => (
              <View
                key={key}
                style={[
                  styles.dataRow,
                  i < dataEntries.length - 1 && {
                    borderBottomWidth: 1,
                    borderBottomColor: c.border,
                  },
                ]}
              >
                <Text style={[styles.dataKey, { color: c.textSecondary }]}>
                  {prettifyKey(key)}
                </Text>
                <Text style={[styles.dataValue, { color: c.text }]}>
                  {value || '-'}
                </Text>
              </View>
            ))}
          </View>
        </>
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
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 22,
  },
  namaSurat: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    lineHeight: 22,
    marginBottom: Spacing.base,
  },
  metaRow: {
    borderTopWidth: 1,
    paddingTop: Spacing.md,
    gap: Spacing.md,
  },
  metaItem: {
    gap: 3,
  },
  metaLabel: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.medium,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  metaValue: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.semiBold,
  },
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    marginBottom: Spacing.md,
  },
  keterangan: {
    fontSize: FontSize.base,
    lineHeight: 21,
  },
  dataRow: {
    paddingVertical: Spacing.md,
    gap: 3,
  },
  dataKey: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
  },
  dataValue: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.medium,
    lineHeight: 20,
  },
});