import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors, FontSize, FontWeight, Spacing, Radius } from '@/constants/theme';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Icons } from '@/constants/icons';

// Loading

export function LoadingState({ message = 'Memuat...' }: { message?: string }) {
  const scheme = (useColorScheme() ?? 'light') as 'light' | 'dark';
  const c = Colors[scheme];

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={c.primary} />
      <Text style={[styles.message, { color: c.textSecondary }]}>{message}</Text>
    </View>
  );
}

// Error

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  message = 'Terjadi kesalahan saat memuat data.',
  onRetry,
}: ErrorStateProps) {
  const scheme = (useColorScheme() ?? 'light') as 'light' | 'dark';
  const c = Colors[scheme];

  return (
    <View style={styles.container}>
      <FontAwesomeIcon icon={Icons.triangleExclamation} size={40} color={c.ditolak} />
      <Text style={[styles.title, { color: c.text }]}>Gagal Memuat</Text>
      <Text style={[styles.message, { color: c.textSecondary }]}>{message}</Text>

      {onRetry && (
        <TouchableOpacity
          style={[styles.retryButton, { backgroundColor: c.primary }]}
          onPress={onRetry}
          activeOpacity={0.85}
        >
          <Text style={styles.retryText}>Coba Lagi</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

// Empty

interface EmptyStateProps {
  icon?: keyof typeof Icons;
  title?: string;
  message?: string;
}

export function EmptyState({
  icon = 'inbox',
  title = 'Belum Ada Data',
  message = 'Data akan muncul di sini.',
}: EmptyStateProps) {
  const scheme = (useColorScheme() ?? 'light') as 'light' | 'dark';
  const c = Colors[scheme];

  return (
    <View style={styles.container}>
      <FontAwesomeIcon icon={Icons[icon]} size={40} color={c.primary} />
      <Text style={[styles.title, { color: c.text }]}>{title}</Text>
      <Text style={[styles.message, { color: c.textSecondary }]}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
    gap: Spacing.sm,
    minHeight: 240,
  },
  icon: {
    marginBottom: 4,
  },
  title: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
  },
  message: {
    fontSize: FontSize.base,
    textAlign: 'center',
    lineHeight: 20,
  },
  retryButton: {
    marginTop: Spacing.md,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.sm + 2,
    borderRadius: Radius.md,
  },
  retryText: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.semiBold,
    color: '#FFFFFF',
  },
});