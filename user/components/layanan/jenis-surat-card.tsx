import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors, FontSize, FontWeight, Spacing, Radius, Shadow } from '@/constants/theme';
import type { JenisSurat } from '@/types';

interface JenisSuratCardProps {
  item: JenisSurat;
  onPress: () => void;
}

export function JenisSuratCard({ item, onPress }: JenisSuratCardProps) {
  const scheme = (useColorScheme() ?? 'light') as 'light' | 'dark';
  const c = Colors[scheme];

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: c.surface }, Shadow.sm]}
      onPress={onPress}
      activeOpacity={0.75}
    >
      {/* Icon */}
      <View style={[styles.iconBox, { backgroundColor: c.primaryBg }]}>
        <Text style={styles.icon}>📄</Text>
      </View>

      {/* Info */}
      <View style={styles.info}>
        <Text style={[styles.nama, { color: c.text }]} numberOfLines={2}>
          {item.nama}
        </Text>
        {item.deskripsi ? (
          <Text style={[styles.deskripsi, { color: c.textSecondary }]} numberOfLines={2}>
            {item.deskripsi}
          </Text>
        ) : null}
      </View>

      {/* Chevron */}
      <Text style={[styles.chevron, { color: c.textTertiary }]}>›</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Radius.lg,
    padding: Spacing.base,
    marginBottom: Spacing.md,
    gap: Spacing.md,
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
  info: {
    flex: 1,
    gap: 3,
  },
  nama: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.semiBold,
    lineHeight: 19,
  },
  deskripsi: {
    fontSize: FontSize.sm,
    lineHeight: 17,
  },
  chevron: {
    fontSize: 28,
    fontWeight: '300',
    marginLeft: 4,
  },
});