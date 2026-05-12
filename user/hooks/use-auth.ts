import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  createElement,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AUTH_KEY = "smart_village_auth";

// Types

export interface AuthUser {
  nik: string;
  nama: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (user: AuthUser) => Promise<void>;
  logout: () => Promise<void>;
}

// Context

const AuthContext = createContext<AuthContextValue | null>(null);

// Provider

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore sesi dari AsyncStorage saat app dibuka
  useEffect(() => {
    AsyncStorage.getItem(AUTH_KEY)
      .then((raw) => {
        if (raw) setUser(JSON.parse(raw));
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  const login = async (userData: AuthUser) => {
    await AsyncStorage.setItem(AUTH_KEY, JSON.stringify(userData));
    setUser(userData);
  };

  const logout = async () => {
    await AsyncStorage.removeItem(AUTH_KEY);
    setUser(null);
  };

  return createElement(
    AuthContext.Provider,
    { value: { user, isLoggedIn: !!user, isLoading, login, logout } },
    children,
  );
}

// Hook

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth harus digunakan di dalam <AuthProvider>");
  return ctx;
}
