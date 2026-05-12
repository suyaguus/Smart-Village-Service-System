import { Tabs } from "expo-router";
import { Platform, View, StyleSheet, useWindowDimensions } from "react-native";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors, Radius, Shadow } from "@/constants/theme";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Icons } from "@/constants/icons";

interface TabIconProps {
  icon: any;
  color: string;
}

function TabIcon({ icon, color }: TabIconProps) {
  const { width } = useWindowDimensions();

  // Responsive settings based on screen width
  const isSmallScreen = width < 360;
  const isMediumScreen = width < 400;

  let iconSize = 22;

  if (isSmallScreen) {
    iconSize = 20;
  } else if (isMediumScreen) {
    iconSize = 21;
  }

  return (
    <View style={styles.tabItem}>
      <FontAwesomeIcon icon={icon} size={iconSize} color={color} />
    </View>
  );
}

// Tab Bar Background

function TabBarBackground({ scheme }: { scheme: "light" | "dark" }) {
  const c = Colors[scheme];
  return (
    <View
      style={[
        StyleSheet.absoluteFill,
        {
          backgroundColor: c.tabBar,
          borderTopWidth: 1,
          borderTopColor: c.tabBarBorder,
        },
      ]}
    />
  );
}

// Layout

export default function TabsLayout() {
  const colorScheme = (useColorScheme() ?? "light") as "light" | "dark";
  const c = Colors[colorScheme];

  const tabScreenOptions = (icon: any, label: string) => ({
    tabBarLabel: label,
    tabBarIcon: ({ focused, color }: { focused: boolean; color: string }) => (
      <TabIcon icon={icon} color={color} />
    ),
  });

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: c.primary,
        tabBarInactiveTintColor: c.textTertiary,
        tabBarBackground: () => <TabBarBackground scheme={colorScheme} />,
        tabBarStyle: {
          ...Shadow.sm,
          borderTopWidth: 0, // handled by TabBarBackground
          height: Platform.OS === "ios" ? 90 : 75,
          paddingBottom: Platform.OS === "ios" ? 20 : 10,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 9,
          fontWeight: "500",
          textAlign: "center",
        },
        tabBarItemStyle: {
          minWidth: 0,
          paddingHorizontal: 2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={tabScreenOptions(Icons.home, "Beranda")}
      />
      <Tabs.Screen
        name="layanan"
        options={tabScreenOptions(Icons.service, "Layanan")}
      />
      <Tabs.Screen
        name="status"
        options={tabScreenOptions(Icons.status, "Status")}
      />
      <Tabs.Screen
        name="profil"
        options={tabScreenOptions(Icons.user, "Profil")}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 2,
    paddingVertical: 2,
    borderRadius: Radius.md,
    gap: 0,
    flex: 1,
    minWidth: 0,
  },
  tabItemFocused: {
    // subtle highlight
  },
  icon: {
    fontSize: 20,
    opacity: 0.45,
  },
});
