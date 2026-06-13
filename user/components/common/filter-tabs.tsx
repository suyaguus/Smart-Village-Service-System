import { Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors, FontSize, FontWeight, Spacing, Radius } from '@/constants/theme';

export interface FilterOption {
  label: string;
  value: string;
}

interface FilterTabsProps {
  options: FilterOption[];
  active: string;
  onChange: (value: string) => void;
}

export function FilterTabs({ options, active, onChange }: FilterTabsProps) {
  const scheme = (useColorScheme() ?? 'light') as 'light' | 'dark';
  const c = Colors[scheme];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {options.map((opt) => {
        const selected = active === opt.value;
        return (
          <TouchableOpacity
            key={opt.value}
            style={[
              styles.tab,
              {
                backgroundColor: selected ? c.primary : c.surface,
                borderColor: selected ? c.primary : c.borderMedium,
              },
            ]}
            onPress={() => onChange(opt.value)}
            activeOpacity={0.75}
          >
            <Text
              style={[
                styles.tabText,
                { color: selected ? '#FFFFFF' : c.textSecondary },
              ]}
            >
              {opt.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.sm,
    paddingVertical: 2,
  },
  tab: {
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.full,
    borderWidth: 1.5,
  },
  tabText: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.medium,
  },
});