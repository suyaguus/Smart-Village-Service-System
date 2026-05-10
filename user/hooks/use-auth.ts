import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AUTH_KEY = 'smart_village_auth';

interface AuthState {
  isLoggedIn: boolean;
  isLoading: boolean;
  user: { nik: string; nama: string } | null;
}

/**
 * useAuth — hook untuk cek status login dari AsyncStorage.
 */
export function useAuth(): AuthState {
  const [state, setState] = useState<AuthState>({
    isLoggedIn: false,
    isLoading: true,
    user: null,
  });

  useEffect(() => {
    AsyncStorage.getItem(AUTH_KEY)
      .then((raw) => {
        if (raw) {
          const user = JSON.parse(raw);
          setState({ isLoggedIn: true, isLoading: false, user });
        } else {
          setState({ isLoggedIn: false, isLoading: false, user: null });
        }
      })
      .catch(() => {
        setState({ isLoggedIn: false, isLoading: false, user: null });
      });
  }, []);

  return state;
}