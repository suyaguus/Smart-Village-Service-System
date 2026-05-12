import { View, ScrollView, StyleSheet, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors, Spacing } from "@/constants/theme";

// Components
import { HomeHeader } from "@/components/home/home-header";
import { SearchBar } from "@/components/home/search-bar";
import { StatsSummaryCard } from "@/components/home/stats-summary-card";
import { LayananCepat } from "@/components/home/layanan-cepat";
import { PengajuanTerbaru } from "@/components/home/pengajuan-terbaru";

export default function HomeScreen() {
  const scheme = (useColorScheme() ?? "light") as "light" | "dark";
  const c = Colors[scheme];

  return (
    <SafeAreaView
      style={[styles.safe, { backgroundColor: c.primary }]}
      edges={["top"]}
    >
      <StatusBar barStyle="light-content" backgroundColor={c.primary} />

      <ScrollView
        style={[styles.scroll, { backgroundColor: c.background }]}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Blue Header Zone ── */}
        <View style={[styles.headerZone, { backgroundColor: c.primary }]}>
          <HomeHeader hasUnreadNotif />
          <SearchBar />

          {/* Extra padding bawah supaya card bisa overlap */}
          <View style={{ height: Spacing.xl }} />
        </View>

        {/* ── Body Zone ── */}
        <View style={styles.body}>
          {/* Stats card overlap ke header biru */}
          <StatsSummaryCard diproses={2} menunggu={1} selesai={5} />

          <LayananCepat />

          <PengajuanTerbaru />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingBottom: 32,
  },
  headerZone: {
    // Background biru
  },
  body: {
    flex: 1,
    paddingTop: 0,
  },
});
