import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors, FontSize, FontWeight, Spacing, Radius, Shadow } from '@/constants/theme';
import { formatTanggal } from '@/utils/date';
import type { Informasi } from '@/types';

/**
 * components/informasi/informasi-card.tsx
 * Card berita/pengumuman dengan thumbnail di kiri.
 */

interface InformasiCardProps {
  item: Informasi;
  onPress: () => void;
}

export function InformasiCard({ item, onPress }: InformasiCardProps) {
  const scheme = (useColorScheme() ?? 'light') as 'light' | 'dark';
  const c = Colors[scheme];

  const thumbnail = item.foto?.[0]?.url;

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: c.surface }, Shadow.sm]}
      onPress={onPress}
      activeOpacity={0.75}
    >
      {/* Thumbnail */}
      {thumbnail ? (
        <Image source={{ uri: thumbnail }} style={styles.thumbnail} resizeMode="cover" />
      ) : (
        <View style={[styles.thumbnailPlaceholder, { backgroundColor: c.primaryBg }]}>
          <Text style={styles.placeholderIcon}>📰</Text>
        </View>
      )}

      {/* Content */}
      <View style={styles.content}>
        {item.kategori ? (
          <Text style={[styles.kategori, { color: c.primary }]} numberOfLines={1}>
            {item.kategori.toUpperCase()}
          </Text>
        ) : null}

        <Text style={[styles.judul, { color: c.text }]} numberOfLines={2}>
          {item.judul}
        </Text>

        <Text style={[styles.tanggal, { color: c.textTertiary }]}>
          {formatTanggal(item.created_at)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    borderRadius: Radius.lg,
    marginBottom: Spacing.md,
    overflow: 'hidden',
  },
  thumbnail: {
    width: 96,
    height: 96,
  },
  thumbnailPlaceholder: {
    width: 96,
    height: 96,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderIcon: {
    fontSize: 28,
  },
  content: {
    flex: 1,
    padding: Spacing.md,
    justifyContent: 'center',
    gap: 4,
  },
  kategori: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    letterSpacing: 0.5,
  },
  judul: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.semiBold,
    lineHeight: 19,
  },
  tanggal: {
    fontSize: FontSize.xs,
    marginTop: 2,
  },
});