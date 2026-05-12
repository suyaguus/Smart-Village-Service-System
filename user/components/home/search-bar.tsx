import { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors, FontSize, Spacing, Radius, Shadow } from "@/constants/theme";

interface SearchBarProps {
  onSearch?: (query: string) => void;
  onFilterPress?: () => void;
  placeholder?: string;
}

export function SearchBar({
  onSearch,
  onFilterPress,
  placeholder = "Cari layanan atau surat...",
}: SearchBarProps) {
  const scheme = (useColorScheme() ?? "light") as "light" | "dark";
  const c = Colors[scheme];

  const [query, setQuery] = useState("");

  const handleChange = (text: string) => {
    setQuery(text);
    onSearch?.(text);
  };

  return (
    <View style={[styles.container, { backgroundColor: c.surface }, Shadow.md]}>
      {/* Search Icon */}
      <ThemedText style={styles.searchIcon}>🔍</ThemedText>

      {/* Input */}
      <TextInput
        style={[styles.input, { color: c.text }]}
        placeholder={placeholder}
        placeholderTextColor={c.textTertiary}
        value={query}
        onChangeText={handleChange}
        returnKeyType="search"
      />

      {/* Divider */}
      <View style={[styles.divider, { backgroundColor: c.borderMedium }]} />

      {/* Filter Icon */}
      <TouchableOpacity
        style={styles.filterButton}
        onPress={onFilterPress}
        activeOpacity={0.7}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <ThemedText style={[styles.filterIcon, { color: c.primary }]}>
          ≡
        </ThemedText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: Radius.lg,
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.sm,
    marginBottom: Spacing.base,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm + 2,
    gap: Spacing.sm,
  },
  searchIcon: {
    fontSize: FontSize.base,
  },
  input: {
    flex: 1,
    fontSize: FontSize.base,
    paddingVertical: 0,
  },
  divider: {
    width: 1,
    height: 18,
    marginHorizontal: Spacing.xs,
  },
  filterButton: {
    paddingHorizontal: 4,
  },
  filterIcon: {
    fontSize: 22,
    fontWeight: "300",
    lineHeight: 24,
  },
});
