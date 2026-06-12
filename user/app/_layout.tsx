import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { AuthProvider } from '@/hooks/use-auth';
import { Colors } from '@/constants/theme';

const SmartVillageLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.light.primary,
    background: Colors.light.background,
    card: Colors.light.surface,
    text: Colors.light.text,
    border: Colors.light.border,
  },
};

const SmartVillageDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: Colors.dark.primary,
    background: Colors.dark.background,
    card: Colors.dark.surface,
    text: Colors.dark.text,
    border: Colors.dark.border,
  },
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({});

  if (!loaded) return null;

  return (
    // AuthProvider membungkus seluruh app agar useAuth() bisa diakses di mana saja
    <AuthProvider>
      <ThemeProvider
        value={colorScheme === 'dark' ? SmartVillageDarkTheme : SmartVillageLightTheme}
      >
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="layanan/[jenisSuratId]" options={{ headerShown: true, title: 'Buat Surat', headerBackTitle: 'Kembali' }} />
          <Stack.Screen name="layanan/submit-success" options={{ headerShown: false, gestureEnabled: false }} />
          <Stack.Screen name="status/[id]" options={{ headerShown: true, title: 'Detail Pengajuan', headerBackTitle: 'Kembali' }} />
          <Stack.Screen name="pengaduan/buat" options={{ headerShown: true, title: 'Buat Pengaduan', headerBackTitle: 'Kembali' }} />
          <Stack.Screen name="informasi/[id]" options={{ headerShown: true, title: 'Informasi', headerBackTitle: 'Kembali' }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </AuthProvider>
  );
}