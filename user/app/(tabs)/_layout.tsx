import { Tabs } from 'expo-router';
import { Platform, View, Text, StyleSheet } from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors, Radius, Shadow } from '@/constants/theme';

// Tab Icon Component ────────────────────────────────────────────

interface TabIconProps {
  icon: string;
  label: string;
  focused: boolean;
  color: string;
}

function TabIcon({ icon, label, focused, color }: TabIconProps) {
  return (
    <View style={[styles.tabItem, focused && styles.tabItemFocused]}>
      <Text style={[styles.icon, focused && { opacity: 1 }]}>{icon}</Text>
      <Text style={[styles.label, { color }]}>{label}</Text>
    </View>
  );
}

// Tab Bar Background

function TabBarBackground({ scheme }: { scheme: 'light' | 'dark' }) {
  const c = Colors[scheme];
  return (
    <View
      style={[
        StyleSheet.absoluteFill,
        { backgroundColor: c.tabBar, borderTopWidth: 1, borderTopColor: c.tabBarBorder },
      ]}
    />
  );
}

// Layout

export default function TabsLayout() {
  const colorScheme = (useColorScheme() ?? 'light') as 'light' | 'dark';
  const c = Colors[colorScheme];

  const tabScreenOptions = (icon: string, label: string) => ({
    tabBarLabel: () => null, // label dirender manual di tabBarIcon
    tabBarIcon: ({ focused, color }: { focused: boolean; color: string }) => (
      <TabIcon icon={icon} label={label} focused={focused} color={color} />
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
          borderTopWidth: 0,        // handled by TabBarBackground
          height: Platform.OS === 'ios' ? 80 : 64,
          paddingBottom: Platform.OS === 'ios' ? 20 : 8,
          paddingTop: 8,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={tabScreenOptions('🏠', 'Beranda')}
      />
      <Tabs.Screen
        name="layanan"
        options={tabScreenOptions('📋', 'Layanan')}
      />
      <Tabs.Screen
        name="status"
        options={tabScreenOptions('🕐', 'Status')}
      />
      <Tabs.Screen
        name="profil"
        options={tabScreenOptions('👤', 'Profil')}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabItem: {
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Radius.md,
    gap: 2,
    opacity: 1,
  },
  tabItemFocused: {
    // subtle highlight — bisa ditambahkan background jika perlu
  },
  icon: {
    fontSize: 20,
    opacity: 0.45,
  },
  label: {
    fontSize: 10,
    fontWeight: '500',
    marginTop: 1,
  },
});