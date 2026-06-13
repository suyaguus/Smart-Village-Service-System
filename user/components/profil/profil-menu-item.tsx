import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors, FontSize, FontWeight, Spacing, Radius } from '@/constants/theme';

/**
 * components/profil/profil-menu-item.tsx
 * Baris menu pada halaman profil (ikon + label + chevron).
 * Mendukung varian "destructive" untuk aksi seperti logout.
 */

interface ProfilMenuItemProps {
  icon: string;
  label: string;
  onPress: () => void;
  destructive?: boolean;
  showChevron?: boolean;
}

export function ProfilMenuItem({
  icon,
  label,
  onPress,
  destructive = false,
  showChevron = true,
}: ProfilMenuItemProps) {
  const scheme = (useColorScheme() ?? 'light') as 'light' | 'dark';
  const c = Colors[scheme];

  const textColor = destructive ? c.ditolak : c.text;
  const iconBg = destructive ? c.ditolakLight : c.primaryBg;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.iconBox, { backgroundColor: iconBg }]}>
        <Text style={styles.icon}>{icon}</Text>
      </View>

      <Text style={[styles.label, { color: textColor }]}>{label}</Text>

      {showChevron && (
        <Text style={[styles.chevron, { color: c.textTertiary }]}>›</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.base,
    gap: Spacing.md,
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: Radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 18,
  },
  label: {
    flex: 1,
    fontSize: FontSize.base,
    fontWeight: FontWeight.medium,
  },
  chevron: {
    fontSize: 24,
    fontWeight: '300',
  },
});