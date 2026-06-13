import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors, FontSize, FontWeight, Spacing, Radius, Shadow } from '@/constants/theme';
import { StatusBadge } from '@/components/common/status-badge';
import { formatTanggalJam } from '@/utils/date';
import type { PengajuanSurat } from '@/types';

interface PengajuanCardProps {
  item: PengajuanSurat;
  onPress: () => void;
}

export function PengajuanCard({ item, onPress }: PengajuanCardProps) {
  const scheme = (useColorScheme() ?? 'light') as 'light' | 'dark';
  const c = Colors[scheme];

  const namaSurat = item.jenis_surat?.nama ?? 'Pengajuan Surat';
  const nomor = item.nomor_surat ?? item.id;

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: c.surface }, Shadow.sm]}
      onPress={onPress}
      activeOpacity={0.75}
    >
      {/* Top row: icon + status badge */}
      <View style={styles.topRow}>
        <View style={[styles.iconBox, { backgroundColor: c.primaryBg }]}>
          <Text style={styles.icon}>📋</Text>
        </View>
        <StatusBadge status={item.status} />
      </View>

      {/* Nama surat */}
      <Text style={[styles.nama, { color: c.text }]} numberOfLines={2}>
        {namaSurat}
      </Text>

      {/* Footer: nomor + tanggal */}
      <View style={[styles.footer, { borderTopColor: c.border }]}>
        <View style={styles.footerItem}>
          <Text style={[styles.footerLabel, { color: c.textTertiary }]}>Nomor</Text>
          <Text style={[styles.footerValue, { color: c.textSecondary }]} numberOfLines={1}>
            {nomor}
          </Text>
        </View>
        <View style={styles.footerItem}>
          <Text style={[styles.footerLabel, { color: c.textTertiary }]}>Diajukan</Text>
          <Text style={[styles.footerValue, { color: c.textSecondary }]}>
            {formatTanggalJam(item.created_at)}
          </Text>
        </View>
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
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 20,
  },
  nama: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.semiBold,
    lineHeight: 20,
    marginBottom: Spacing.md,
  },
  footer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    paddingTop: Spacing.md,
    gap: Spacing.base,
  },
  footerItem: {
    flex: 1,
    gap: 2,
  },
  footerLabel: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.medium,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  footerValue: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
  },
});