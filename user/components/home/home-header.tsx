import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";
import { useAuth } from "@/hooks/use-auth";
import { Colors, FontSize, FontWeight, Spacing } from "@/constants/theme";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Icons } from "@/constants/icons";

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Selamat pagi,";
  if (hour < 15) return "Selamat siang,";
  if (hour < 18) return "Selamat sore,";
  return "Selamat malam,";
}

interface HomeHeaderProps {
  hasUnreadNotif?: boolean;
}

export function HomeHeader({ hasUnreadNotif = true }: HomeHeaderProps) {
  const { user } = useAuth();
  const c = Colors.light; // Header selalu di atas background biru

  return (
    <View style={styles.container}>
      {/* Greeting + Name */}
      <View style={styles.greetingBlock}>
        <Text style={styles.greeting}>{getGreeting()}</Text>
        <View style={styles.nameRow}>
          <Text style={styles.name} numberOfLines={1}>
            {user?.nama ?? "Warga"}
          </Text>
          <FontAwesomeIcon
            icon={Icons.smile}
            size={24}
            color={c.textInverse}
            style={styles.nameIcon}
          />
        </View>
      </View>

      {/* Notification Bell */}
      <TouchableOpacity
        style={styles.notifButton}
        onPress={() => router.push("/notifikasi")}
        activeOpacity={0.75}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <FontAwesomeIcon icon={Icons.bell} size={18} color="#F4C542" />
        {hasUnreadNotif && <View style={styles.badge} />}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.base,
    paddingBottom: Spacing.md,
  },
  greetingBlock: {
    flex: 1,
    marginRight: Spacing.md,
  },
  greeting: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.regular,
    color: "rgba(255,255,255,0.75)",
    marginBottom: 2,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  nameIcon: {
    marginLeft: Spacing.sm,
  },
  name: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.bold,
    color: "#FFFFFF",
    letterSpacing: 0.2,
    flexShrink: 1,
  },
  wave: {
    fontSize: FontSize.xxl,
  },
  notifButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
  },
  bellIcon: {
    fontSize: 18,
  },
  badge: {
    position: "absolute",
    top: 9,
    right: 9,
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: "#E84040",
    borderWidth: 1.5,
    borderColor: Colors.light.primary,
  },
});
