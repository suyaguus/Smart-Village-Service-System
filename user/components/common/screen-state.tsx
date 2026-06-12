import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors, FontSize, FontWeight, Spacing, Radius } from '@/constants/theme';

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
      <Text style={styles.emoji}>⚠️</Text>
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
  emoji?: string;
  title?: string;
  message?: string;
}

export function EmptyState({
  emoji = '📭',
  title = 'Belum Ada Data',
  message = 'Data akan muncul di sini.',
}: EmptyStateProps) {
  const scheme = (useColorScheme() ?? 'light') as 'light' | 'dark';
  const c = Colors[scheme];

  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>{emoji}</Text>
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
  emoji: {
    fontSize: 40,
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