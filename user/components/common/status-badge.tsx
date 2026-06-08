import { View, Text, StyleSheet } from "react-native";
import { useColorScheme } from "@/hooks/use-color-scheme";
import {
  Colors,
  FontSize,
  FontWeight,
  Radius,
  Spacing,
} from "@/constants/theme";
import type { StatusPengajuan } from "@/types";

const STATUS_LABEL: Record<StatusPengajuan, string> = {
  diproses: "Diproses",
  menunggu: "Menunggu",
  selesai: "Selesai",
  ditolak: "Ditolak",
};

interface StatusBadgeProps {
  status: StatusPengajuan;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const scheme = (useColorScheme() ?? "light") as "light" | "dark";
  const c = Colors[scheme];

  // Resolve warna per status dari theme
  const colorMap: Record<
    StatusPengajuan,
    { bg: string; dot: string; text: string }
  > = {
    diproses: { bg: c.diprosesLight, dot: c.diproses, text: c.diprosesText },
    menunggu: { bg: c.menungguLight, dot: c.menunggu, text: c.menungguText },
    selesai: { bg: c.selesaiLight, dot: c.selesai, text: c.selesaiText },
    ditolak: { bg: c.ditolakLight, dot: c.ditolak, text: c.ditolakText },
  };

  const { bg, dot, text } = colorMap[status] ?? colorMap.menunggu;

  return (
    <View style={[styles.badge, { backgroundColor: bg }]}>
      <View style={[styles.dot, { backgroundColor: dot }]} />
      <Text style={[styles.label, { color: text }]}>
        {STATUS_LABEL[status]}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingHorizontal: Spacing.md - 2,
    paddingVertical: Spacing.xs + 1,
    borderRadius: Radius.full,
    gap: Spacing.xs,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  label: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semiBold,
  },
});
