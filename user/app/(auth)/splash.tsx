import { useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { router } from 'expo-router';
import { Colors, FontSize, FontWeight } from '@/constants/theme';
import { useAuth } from '@/hooks/use-auth';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Icons } from '@/constants/icons';

export default function SplashScreen() {
  const { isLoggedIn, isLoading } = useAuth();

  // Animasi fade-in logo
  const opacity = new Animated.Value(0);
  const translateY = new Animated.Value(20);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const timer = setTimeout(() => {
      if (isLoggedIn) {
        router.replace('/(tabs)');
      } else {
        router.replace('/(auth)/login');
      }
    }, 2200);

    return () => clearTimeout(timer);
  }, [isLoggedIn, isLoading]);

  const c = Colors.light; // Splash selalu light

  return (
    <View style={[styles.container, { backgroundColor: c.primary }]}>
      {/* Logo Card */}
      <Animated.View
        style={[
          styles.logoWrapper,
          { opacity, transform: [{ translateY }] },
        ]}
      >
        <View style={styles.logoCard}>
          <FontAwesomeIcon icon={Icons.home} size={48} color="#FFFFFF" />
        </View>

        <Text style={styles.appName}>Smart Village</Text>
        <Text style={styles.tagline}>Layanan Desa Digital</Text>
      </Animated.View>

      {/* Footer */}
      <Text style={styles.footer}>© 2025 Pemerintah Desa</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoWrapper: {
    alignItems: 'center',
    gap: 12,
  },
  logoCard: {
    width: 96,
    height: 96,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.20)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  appName: {
    fontSize: FontSize.xxxl,
    fontWeight: FontWeight.bold,
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  tagline: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.regular,
    color: 'rgba(255,255,255,0.75)',
    letterSpacing: 0.3,
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    fontSize: FontSize.xs,
    color: 'rgba(255,255,255,0.50)',
  },
});
