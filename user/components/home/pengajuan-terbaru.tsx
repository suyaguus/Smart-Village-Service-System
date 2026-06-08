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
import { StatusBadge } from "@/components/common/status-badge";
import { Icons } from "@/constants/icons";
import type { Pengajuan } from "@/types";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const DUMMY_PENGAJUAN: Pengajuan[] = [
  {
    id: "SKD-2025-0142",
    jenisSurat: "Surat Keterangan Domisili",
    nomorSurat: "SKD-2025-0142",
    tanggal: "12 Mei",
    jam: "09:24",
    status: "diproses",
  },
  {
    id: "SKTM-2025-0098",
    jenisSurat: "Surat Keterangan Tidak Mampu",
    nomorSurat: "SKTM-2025-0098",
    tanggal: "10 Mei",
    jam: "14:02",
    status: "menunggu",
  },
  {
    id: "SPK-2025-0451",
    jenisSurat: "Surat Pengantar KTP",
    nomorSurat: "SPK-2025-0451",
    tanggal: "06 Mei",
    jam: "11:18",
    status: "selesai",
  },
];

// Item Row

interface PengajuanItemProps {
  item: Pengajuan;
  isLast: boolean;
}

function PengajuanItem({ item, isLast }: PengajuanItemProps) {
  const scheme = (useColorScheme() ?? "light") as "light" | "dark";
  const c = Colors[scheme];
  const noteColor = scheme === "dark" ? c.primaryLight : c.primaryDark;

  return (
    <>
      <TouchableOpacity
        style={styles.item}
        onPress={() => router.push(`/status/${item.id}` as never)}
        activeOpacity={0.75}
      >
        {/* File Icon */}
        <View style={[styles.fileIcon, { backgroundColor: c.primaryBg }]}>
          <FontAwesomeIcon icon={Icons.note} size={20} color={noteColor} />
        </View>

        {/* Info */}
        <View style={styles.info}>
          <Text
            style={[styles.jenisSurat, { color: c.text }]}
            numberOfLines={2}
          >
            {item.jenisSurat}
          </Text>
          <View style={styles.meta}>
            <Text style={[styles.metaText, { color: c.textSecondary }]}>
              {item.nomorSurat}
            </Text>
            <Text style={[styles.dot, { color: c.textTertiary }]}> · </Text>
            <Text style={[styles.metaText, { color: c.textSecondary }]}>
              {item.tanggal} · {item.jam}
            </Text>
          </View>
        </View>

        {/* Status Badge */}
        <StatusBadge status={item.status} />
      </TouchableOpacity>

      {!isLast && (
        <View
          style={[
            styles.divider,
            { backgroundColor: c.border, marginLeft: 72 },
          ]}
        />
      )}
    </>
  );
}

// Main Component

interface PengajuanTerbaruProps {
  data?: Pengajuan[];
}

export function PengajuanTerbaru({
  data = DUMMY_PENGAJUAN,
}: PengajuanTerbaruProps) {
  const scheme = (useColorScheme() ?? "light") as "light" | "dark";
  const c = Colors[scheme];

  return (
    <View style={styles.section}>
      {/* Section Header */}
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: c.text }]}>
          Pengajuan Terbaru
        </Text>
        <TouchableOpacity
          onPress={() => router.push("/(tabs)/status" as never)}
          activeOpacity={0.7}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Text style={[styles.lihatSemua, { color: c.primary }]}>
            Lihat semua
          </Text>
        </TouchableOpacity>
      </View>

      {/* List Card */}
      <View style={[styles.card, { backgroundColor: c.surface }, Shadow.md]}>
        {data.map((item, index) => (
          <PengajuanItem
            key={item.id}
            item={item}
            isLast={index === data.length - 1}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: Spacing.xl,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    letterSpacing: 0.1,
  },
  lihatSemua: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.medium,
  },
  card: {
    marginHorizontal: Spacing.lg,
    borderRadius: Radius.lg,
    overflow: "hidden",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md,
    gap: Spacing.md,
  },
  fileIcon: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  fileEmoji: {
    fontSize: 20,
  },
  info: {
    flex: 1,
    gap: 4,
  },
  jenisSurat: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semiBold,
    lineHeight: 18,
  },
  meta: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  metaText: {
    fontSize: FontSize.xs,
  },
  dot: {
    fontSize: FontSize.xs,
  },
  divider: {
    height: 1,
  },
});
