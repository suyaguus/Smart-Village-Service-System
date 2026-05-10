/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

export const Colors = {
  light: {
    // Brand
    primary: '#4A7FBB',
    primaryDark: '#3A6A9E',
    primaryLight: '#6A9FDB',
    primaryBg: '#EAF1FB',
 
    // Text
    text: '#1A2B4A',
    textSecondary: '#6B7A99',
    textTertiary: '#9BAABF',
    textInverse: '#FFFFFF',
 
    // Surface
    background: '#F5F7FA',
    surface: '#FFFFFF',
    border: '#EEF2F8',
    borderMedium: '#D8E3F0',
 
    // Status — Diproses
    diproses: '#4A7FBB',
    diprosesLight: '#EAF1FB',
    diprosesText: '#3A6A9E',
 
    // Status — Menunggu
    menunggu: '#E8A020',
    menungguLight: '#FEF3E2',
    menungguText: '#B87D10',
 
    // Status — Selesai
    selesai: '#28A96B',
    selesaiLight: '#E8F7F0',
    selesaiText: '#1D8754',
 
    // Status — Ditolak
    ditolak: '#E84040',
    ditolakLight: '#FDEAEA',
    ditolakText: '#C02B2B',
 
    // Icon bg — Layanan Cepat
    iconBuatSurat: '#EAF1FB',
    iconPengaduan: '#FEF3E2',
    iconStatus: '#E8F7F0',
    iconInformasi: '#EEF1F8',
 
    // Misc
    shadow: '#2A4A7F',
    overlay: 'rgba(0,0,0,0.4)',
    tabBar: '#FFFFFF',
    tabBarBorder: '#EEF2F8',
  },
 
  dark: {
    // Brand
    primary: '#6A9FDB',
    primaryDark: '#4A7FBB',
    primaryLight: '#8AB9EC',
    primaryBg: '#1A2B3E',
 
    // Text
    text: '#EDF2FA',
    textSecondary: '#8FA3C0',
    textTertiary: '#5C7088',
    textInverse: '#1A2B4A',
 
    // Surface
    background: '#0F1923',
    surface: '#1A2535',
    border: '#243044',
    borderMedium: '#2E3D55',
 
    // Status — Diproses
    diproses: '#6A9FDB',
    diprosesLight: '#1A2B3E',
    diprosesText: '#8AB9EC',
 
    // Status — Menunggu
    menunggu: '#F0B030',
    menungguLight: '#2A1F0A',
    menungguText: '#F5C855',
 
    // Status — Selesai
    selesai: '#34C87E',
    selesaiLight: '#0A2018',
    selesaiText: '#5CDDA0',
 
    // Status — Ditolak
    ditolak: '#F05555',
    ditolakLight: '#2A0A0A',
    ditolakText: '#F57878',
 
    // Icon bg — Layanan Cepat
    iconBuatSurat: '#1A2B3E',
    iconPengaduan: '#2A1F0A',
    iconStatus: '#0A2018',
    iconInformasi: '#1A1F2E',
 
    // Misc
    shadow: '#000000',
    overlay: 'rgba(0,0,0,0.6)',
    tabBar: '#1A2535',
    tabBarBorder: '#243044',
  },
} as const;
 
// Typography
 
export const FontSize = {
  xs: 11,
  sm: 12,
  md: 13,
  base: 14,
  lg: 16,
  xl: 18,
  xxl: 20,
  display: 28,
} as const;
 
export const FontWeight = {
  regular: '400' as const,
  medium: '500' as const,
  semiBold: '600' as const,
  bold: '700' as const,
};
 
// Spacing
 
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
} as const;
 
export const Radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 999,
} as const;
 
// Shadow Presets
 
export const Shadow = {
  sm: {
    shadowColor: '#2A4A7F',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  md: {
    shadowColor: '#2A4A7F',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  lg: {
    shadowColor: '#2A4A7F',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 8,
  },
} as const;
 
// Type Helpers
 
export type ColorScheme = 'light' | 'dark';
export type ThemeColors = typeof Colors.light;