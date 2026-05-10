import { Redirect } from 'expo-router';
import { useAuth } from '@/hooks/use-auth';

/**
 * Entry point — redirect berdasarkan status login.
 * - Sudah login → masuk ke tab utama
 * - Belum login → ke halaman login
 */
export default function Index() {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <Redirect href="/(tabs)" />;
  }

  return <Redirect href="/(auth)/login" />;
}