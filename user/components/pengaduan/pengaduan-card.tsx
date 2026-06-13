import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors, FontSize, FontWeight, Spacing, Radius, Shadow } from '@/constants/theme';
import { StatusBadge } from '@/components/common/status-badge';
import { getKategoriMeta } from '@/constants/pengaduan';
import { formatTanggalJam } from '@/utils/date';
import type { Pengaduan } from '@/types';

/**
 * components/pengaduan/pengaduan-card.tsx
 * Card pengaduan untuk daftar riwayat.
 */

interface PengaduanCardProps {
  item: Pengaduan;
  onPress: () => void;
}

export function PengaduanCard({ item, onPress }: PengaduanCardProps) {
  const scheme = (useColorScheme() ?? 'light') as 'light' | 'dark';
  const c = Colors[scheme];

  const kategori = getKategoriMeta(item.kategori);
  const jumlahRespon = item.respon?.length ?? 0;

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: c.surface }, Shadow.sm]}
      onPress={onPress}
      activeOpacity={0.75}
    >
      {/* Top row: kategori + status */}
      <View style={styles.topRow}>
        <View style={[styles.kategoriPill, { backgroundColor: c.primaryBg }]}>
          <Text style={styles.kategoriIcon}>{kategori.icon}</Text>
          <Text style={[styles.kategoriLabel, { color: c.diprosesText }]}>
            {kategori.label}
          </Text>
        </View>
        <StatusBadge status={item.status} />
      </View>

      {/* Judul */}
      <Text style={[styles.judul, { color: c.text }]} numberOfLines={1}>
        {item.judul}
      </Text>

      {/* Deskripsi preview */}
      <Text style={[styles.deskripsi, { color: c.textSecondary }]} numberOfLines={2}>
        {item.deskripsi}
      </Text>

      {/* Footer: tanggal + jumlah respon */}
      <View style={[styles.footer, { borderTopColor: c.border }]}>
        <Text style={[styles.tanggal, { color: c.textTertiary }]}>
          {formatTanggalJam(item.created_at)}
        </Text>
        {jumlahRespon > 0 && (
          <Text style={[styles.respon, { color: c.primary }]}>
            💬 {jumlahRespon} tanggapan
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Radius.lg,
    padding: Spacing.base,
    marginBottom: Spacing.md,
  },
  topRow: {
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
    fontSize: FontSize.base,
    fontWeight: FontWeight.semiBold,
    marginBottom: 4,
  },
  deskripsi: {
    fontSize: FontSize.sm,
    lineHeight: 18,
    marginBottom: Spacing.md,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    paddingTop: Spacing.sm + 2,
  },
  tanggal: {
    fontSize: FontSize.xs,
  },
  respon: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semiBold,
  },
});