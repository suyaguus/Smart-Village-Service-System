import { createContext, createElement, useContext, useEffect, useState, ReactNode } from 'react';
import { login, logout, register, getStoredUser } from '@/services/auth.service';
import type {
  User,
  LoginRequest,
  CreateUserRequest,
  LoginResponse,
} from '@/types';

// Context Type

interface AuthContextValue {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  signIn: (credentials: LoginRequest) => Promise<LoginResponse>;
  signOut: () => Promise<void>;
  signUp: (payload: CreateUserRequest) => Promise<User>;
}

// Context

const AuthContext = createContext<AuthContextValue | null>(null);

// Provider

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore sesi dari AsyncStorage saat app dibuka
  useEffect(() => {
    getStoredUser()
      .then((u) => setUser(u))
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  const signIn = async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await login(credentials);
    setUser(response.user);
    return response;
  };

  const signOut = async () => {
    await logout();
    setUser(null);
  };

  const signUp = async (payload: CreateUserRequest): Promise<User> => {
    return register(payload);
    // Tidak auto-login setelah register, user harus login manual
  };

  return createElement(
    AuthContext.Provider,
    {
      value: {
        user,
        isLoggedIn: !!user,
        isLoading,
        signIn,
        signOut,
        signUp,
      },
    },
    children,
  );
}

// Hook

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth harus digunakan di dalam <AuthProvider>');
  return ctx;
}