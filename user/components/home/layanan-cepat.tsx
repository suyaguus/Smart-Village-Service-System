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
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Icons } from "@/constants/icons";

interface LayananItem {
  id: string;
  label: string;
  icon: string | any;
  bgColor: keyof typeof Colors.light;
  iconColor: keyof typeof Colors.light;
  route: string;
}

const LAYANAN_ITEMS: LayananItem[] = [
  {
    id: "buat-surat",
    label: "Buat\nSurat",
    icon: Icons.note,
    bgColor: "iconBuatSurat",
    iconColor: "primaryDark",
    route: "/layanan/buat-surat",
  },
  {
    id: "pengaduan",
    label: "Pengaduan",
    icon: Icons.flag,
    bgColor: "iconPengaduan",
    iconColor: "menungguText",
    route: "/pengaduan/buat",
  },
  {
    id: "status",
    label: "Status",
    icon: Icons.magnifyingGlass,
    bgColor: "iconStatus",
    iconColor: "selesaiText",
    route: "/(tabs)/status",
  },
  {
    id: "informasi",
    label: "Informasi",
    icon: Icons.info,
    bgColor: "iconInformasi",
    iconColor: "textSecondary",
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
  const isEmojiIcon = typeof item.icon === "string";

  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => router.push(item.route as never)}
      activeOpacity={0.75}
    >
      <View style={[styles.iconBox, { backgroundColor: bgColor }]}>
        {isEmojiIcon ? (
          <Text style={styles.icon}>{item.icon}</Text>
        ) : (
          <FontAwesomeIcon icon={item.icon} size={26} color={c[item.iconColor]} />
        )}
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
