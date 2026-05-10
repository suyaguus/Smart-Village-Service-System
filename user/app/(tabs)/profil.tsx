import { Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

/**
 * app/(tabs)/profil.tsx — Tab: Profil
 */
export default function ProfilScreen() {
  const scheme = (useColorScheme() ?? 'light') as 'light' | 'dark';
  const c = Colors[scheme];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: c.background }]}>
      <FontAwesomeIcon icon={faUser} size={24} color={c.text} />
      <Text style={[styles.title, { color: c.text }]}>Profil</Text>
      <Text style={[styles.sub, { color: c.textSecondary }]}>Dalam pengerjaan — Fase 8</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8 },
  emoji: { fontSize: 40 },
  title: { fontSize: 18, fontWeight: '700' },
  sub: { fontSize: 13 },
});