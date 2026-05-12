import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { router } from "expo-router";
import { useColorScheme } from "@/hooks/use-color-scheme";
import {
  Colors,
  FontSize,
  FontWeight,
  Spacing,
  Radius,
} from "@/constants/theme";

/**
 * components/home/layanan-cepat.tsx
 * 4 ikon layanan cepat horizontal scrollable.
 * Tap → navigasi ke route yang sesuai.
 */

interface LayananItem {
  id: string;
  label: string;
  icon: string;
  bgColor: keyof typeof Colors.light;
  route: string;
}

const LAYANAN_ITEMS: LayananItem[] = [
  {
    id: "buat-surat",
    label: "Buat\nSurat",
    icon: "📄",
    bgColor: "iconBuatSurat",
    route: "/layanan/buat-surat",
  },
  {
    id: "pengaduan",
    label: "Pengaduan",
    icon: "🚩",
    bgColor: "iconPengaduan",
    route: "/pengaduan/buat",
  },
  {
    id: "status",
    label: "Status",
    icon: "🕐",
    bgColor: "iconStatus",
    route: "/(tabs)/status",
  },
  {
    id: "informasi",
    label: "Informasi",
    icon: "ℹ️",
    bgColor: "iconInformasi",
    route: "/(tabs)/informasi",
  },
];

interface LayananItemCardProps {
  item: LayananItem;
}

function LayananItemCard({ item }: LayananItemCardProps) {
  const scheme = (useColorScheme() ?? "light") as "light" | "dark";
  const c = Colors[scheme];
  const bgColor = c[item.bgColor] as string;

  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => router.push(item.route as never)}
      activeOpacity={0.75}
    >
      <View style={[styles.iconBox, { backgroundColor: bgColor }]}>
        <Text style={styles.icon}>{item.icon}</Text>
      </View>
      <Text style={[styles.itemLabel, { color: c.text }]} numberOfLines={2}>
        {item.label}
      </Text>
    </TouchableOpacity>
  );
}

export function LayananCepat() {
  const scheme = (useColorScheme() ?? "light") as "light" | "dark";
  const c = Colors[scheme];

  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: c.text }]}>
        Layanan Cepat
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
      >
        {LAYANAN_ITEMS.map((item) => (
          <LayananItemCard key={item.id} item={item} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
    letterSpacing: 0.1,
  },
  list: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.md,
  },
  item: {
    alignItems: "center",
    width: 76,
  },
  iconBox: {
    width: 60,
    height: 60,
    borderRadius: Radius.lg,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.sm,
  },
  icon: {
    fontSize: 26,
  },
  itemLabel: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.medium,
    textAlign: "center",
    lineHeight: 15,
  },
});
