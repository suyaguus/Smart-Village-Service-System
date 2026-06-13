import { View, Text, StyleSheet } from 'react-native';
import { FontSize, FontWeight, Spacing } from '@/constants/theme';

/**
 * components/profil/profil-header.tsx
 * Header profil: avatar inisial + nama + NIK.
 * Didesain untuk ditempatkan di area header biru.
 */

function getInitials(nama: string): string {
  const parts = nama.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
}

interface ProfilHeaderProps {
  nama: string;
  nik: string;
}

export function ProfilHeader({ nama, nik }: ProfilHeaderProps) {
  return (
    <View style={styles.container}>
      {/* Avatar inisial */}
      <View style={styles.avatar}>
        <Text style={styles.initials}>{getInitials(nama)}</Text>
      </View>

      <Text style={styles.nama} numberOfLines={1}>
        {nama}
      </Text>
      <Text style={styles.nik}>NIK: {nik}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.xl,
    gap: Spacing.xs,
  },
  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  initials: {
    fontSize: 32,
    fontWeight: FontWeight.bold,
    color: '#4A7FBB',
  },
  nama: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    color: '#FFFFFF',
  },
  nik: {
    fontSize: FontSize.sm,
    color: 'rgba(255,255,255,0.75)',
  },
});