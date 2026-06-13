import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors, FontSize, FontWeight, Spacing, Radius } from '@/constants/theme';
import { KATEGORI_PENGADUAN } from '@/constants/pengaduan';
import type { KategoriPengaduan } from '@/types';

/**
 * components/pengaduan/kategori-selector.tsx
 * Pemilih kategori pengaduan berupa chip dengan ikon.
 * Menyimpan `value` (mis. 'infrastruktur'), bukan label.
 */

interface KategoriSelectorProps {
  value: KategoriPengaduan | '';
  onChange: (value: KategoriPengaduan) => void;
  error?: string;
  required?: boolean;
}

export function KategoriSelector({
  value,
  onChange,
  error,
  required = false,
}: KategoriSelectorProps) {
  const scheme = (useColorScheme() ?? 'light') as 'light' | 'dark';
  const c = Colors[scheme];

  return (
    <View style={styles.group}>
      <Text style={[styles.label, { color: c.textSecondary }]}>
        Kategori
        {required && <Text style={{ color: c.ditolak }}> *</Text>}
      </Text>

      <View style={styles.grid}>
        {KATEGORI_PENGADUAN.map((kat) => {
          const selected = value === kat.value;
          return (
            <TouchableOpacity
              key={kat.value}
              style={[
                styles.chip,
                {
                  backgroundColor: selected ? c.primary : c.background,
                  borderColor: selected ? c.primary : c.borderMedium,
                },
              ]}
              onPress={() => onChange(kat.value)}
              activeOpacity={0.75}
            >
              <Text style={styles.chipIcon}>{kat.icon}</Text>
              <Text
                style={[
                  styles.chipLabel,
                  { color: selected ? '#FFFFFF' : c.textSecondary },
                ]}
              >
                {kat.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {error && <Text style={[styles.errorText, { color: c.ditolak }]}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  group: {
    marginBottom: Spacing.base,
  },
  label: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
    marginBottom: Spacing.sm,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.full,
    borderWidth: 1.5,
    gap: 6,
  },
  chipIcon: {
    fontSize: 15,
  },
  chipLabel: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.medium,
  },
  errorText: {
    fontSize: FontSize.xs,
    marginTop: Spacing.xs,
    marginLeft: 2,
  },
});