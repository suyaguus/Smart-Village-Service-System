import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";
import { useColorScheme } from "@/hooks/use-color-scheme";
import {
  Colors,
  FontSize,
  FontWeight,
  Spacing,
  Radius,
  Shadow,
} from "@/constants/theme";
import type { StatusPengajuan } from "@/types";



interface StatItemProps {
  count: number;
  label: string;
  color: string;
  showDivider: boolean;
  onPress: () => void;
}

function StatItem({
  count,
  label,
  color,
  showDivider,
  onPress,
}: StatItemProps) {
  const scheme = (useColorScheme() ?? "light") as "light" | "dark";
  const c = Colors[scheme];

  return (
    <View style={styles.statRow}>
      <TouchableOpacity
        style={styles.statItem}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <Text style={[styles.count, { color }]}>{count}</Text>
        <Text style={[styles.label, { color: c.textSecondary }]}>{label}</Text>
      </TouchableOpacity>

      {showDivider && (
        <View style={[styles.verticalDivider, { backgroundColor: c.border }]} />
      )}
    </View>
  );
}

interface StatsSummaryCardProps {
  diproses?: number;
  menunggu?: number;
  selesai?: number;
}

export function StatsSummaryCard({
  diproses = 0,
  menunggu = 0,
  selesai = 0,
}: StatsSummaryCardProps) {
  const scheme = (useColorScheme() ?? "light") as "light" | "dark";
  const c = Colors[scheme];

  const handlePress = (status: StatusPengajuan) => {
    router.push({ pathname: "/(tabs)/status", params: { filter: status } });
  };

  return (
    <View style={[styles.card, { backgroundColor: c.surface }, Shadow.md]}>
      <StatItem
        count={diproses}
        label="Diproses"
        color={c.diproses}
        showDivider
        onPress={() => handlePress("diproses")}
      />
      <StatItem
        count={menunggu}
        label="Menunggu"
        color={c.menunggu}
        showDivider
        onPress={() => handlePress("menunggu")}
      />
      <StatItem
        count={selesai}
        label="Selesai"
        color={c.selesai}
        showDivider={false}
        onPress={() => handlePress("selesai")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    marginHorizontal: Spacing.lg,
    borderRadius: Radius.lg,
    paddingVertical: Spacing.lg,
    marginTop: -Spacing.lg, // overlap keluar dari header biru
    marginBottom: Spacing.xl,
  },
  statRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  statItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 4,
    gap: 4,
  },
  count: {
    fontSize: FontSize.display,
    fontWeight: FontWeight.bold,
    letterSpacing: -0.5,
  },
  label: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.regular,
  },
  verticalDivider: {
    width: 1,
    height: 36,
  },
});
