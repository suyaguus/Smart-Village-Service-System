import { Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors, FontSize, FontWeight } from "@/constants/theme";

export default function SubmitSuccessScreen() {
  const scheme = (useColorScheme() ?? "light") as "light" | "dark";
  const c = Colors[scheme];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: c.background }]}>
      <Text style={[styles.title, { color: c.text }]}>Pengajuan Berhasil</Text>
      <Text style={[styles.sub, { color: c.textSecondary }]}>Status pengajuan Anda akan ditampilkan di halaman status.</Text>
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
