import { Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors, FontSize, FontWeight } from "@/constants/theme";

export default function InformasiDetailScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const scheme = (useColorScheme() ?? "light") as "light" | "dark";
  const c = Colors[scheme];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: c.background }]}>
      <Text style={[styles.title, { color: c.text }]}>Informasi</Text>
      <Text style={[styles.sub, { color: c.textSecondary }]}>ID: {id ?? "-"}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    gap: 8,
  },
  title: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
  },
  sub: {
    fontSize: FontSize.sm,
    textAlign: "center",
  },
});
