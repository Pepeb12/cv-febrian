import { Platform } from 'react-native';

/**
 * Design Tokens & Dual-Theme System (Materi Level 7: Theme Switcher Exploration)
 * Mendukung mode Terang (Light Mode) dan mode Gelap (Dark Mode) secara dinamis.
 */

export const LIGHT_THEME = {
  isDark: false,
  primary: '#1E40AF',       // Deep Royal Blue
  primaryLight: '#EFF6FF',
  primaryHover: '#1D4ED8',
  primaryBorder: '#BFDBFE',

  accentCyan: '#0284C7',
  accentEmerald: '#059669',
  accentEmeraldLight: '#ECFDF5',
  accentEmeraldBorder: '#A7F3D0',
  accentViolet: '#7C3AED',
  accentVioletLight: '#F5F3FF',
  accentAmber: '#D97706',
  accentAmberLight: '#FFFBEB',

  textPrimary: '#0F172A',   // Slate 900
  textSecondary: '#334155', // Slate 700
  textMuted: '#64748B',     // Slate 500
  textLight: '#94A3B8',     // Slate 400

  background: '#F8FAFC',    // Slate 50
  surface: '#FFFFFF',       // Pure white
  surfaceMuted: '#F1F5F9',  // Slate 100
  border: '#E2E8F0',        // Slate 200
  borderLight: '#F1F5F9',

  secondary: '#059669',
  error: '#DC2626',

  success: '#16A34A',
  successLight: '#F0FDF4',
  successBorder: '#BBF7D0',
  successText: '#15803D',

  cardHeaderBanner: '#1E40AF',
  inputBackground: '#F8FAFC',
};

export const DARK_THEME = {
  isDark: true,
  primary: '#3B82F6',       // Brighter Blue for Dark Mode readability
  primaryLight: '#1E293B',
  primaryHover: '#60A5FA',
  primaryBorder: '#334155',

  accentCyan: '#38BDF8',
  accentEmerald: '#34D399',
  accentEmeraldLight: '#064E3B',
  accentEmeraldBorder: '#059669',
  accentViolet: '#A78BFA',
  accentVioletLight: '#2E1065',
  accentAmber: '#FBBF24',
  accentAmberLight: '#451A03',

  textPrimary: '#F8FAFC',   // Slate 50
  textSecondary: '#E2E8F0', // Slate 200
  textMuted: '#94A3B8',     // Slate 400
  textLight: '#64748B',     // Slate 500

  background: '#0B0F19',    // Deep Dark Navy
  surface: '#151C2C',       // Elevated Card Dark Surface
  surfaceMuted: '#1E293B',  // Slate 800
  border: '#283548',        // Dark subtle borders
  borderLight: '#1F293D',

  secondary: '#10B981',
  error: '#EF4444',

  success: '#4ADE80',
  successLight: '#052E16',
  successBorder: '#166534',
  successText: '#86EFAC',

  cardHeaderBanner: '#1E3A8A',
  inputBackground: '#1A2333',
};

export type Theme = typeof LIGHT_THEME;

export const getTheme = (isDark = false): Theme => (isDark ? DARK_THEME : LIGHT_THEME);

// Default export untuk backward-compatibility
export const COLORS = LIGHT_THEME;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const TYPOGRAPHY = {
  h1: {
    fontSize: 22,
    fontWeight: '800' as const,
    letterSpacing: -0.5,
  },
  h2: {
    fontSize: 18,
    fontWeight: '700' as const,
    letterSpacing: -0.3,
  },
  h3: {
    fontSize: 15,
    fontWeight: '700' as const,
  },
  body: {
    fontSize: 13,
    fontWeight: '400' as const,
    lineHeight: 20,
  },
  bodyBold: {
    fontSize: 13,
    fontWeight: '700' as const,
    lineHeight: 20,
  },
  caption: {
    fontSize: 11,
    fontWeight: '500' as const,
    lineHeight: 16,
  },
  badge: {
    fontSize: 11,
    fontWeight: '700' as const,
    letterSpacing: 0.5,
  },
};

export const SHADOWS = {
  sm: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 3,
    },
    android: {
      elevation: 2,
    },
    web: {
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
    },
    default: {
      elevation: 2,
    },
  }),
  md: Platform.select({
    ios: {
      shadowColor: '#0F172A',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.08,
      shadowRadius: 10,
    },
    android: {
      elevation: 4,
    },
    web: {
      boxShadow: '0 4px 14px rgba(15, 23, 42, 0.08)',
    },
    default: {
      elevation: 4,
    },
  }),
  lg: Platform.select({
    ios: {
      shadowColor: '#0F172A',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.12,
      shadowRadius: 20,
    },
    android: {
      elevation: 6,
    },
    web: {
      boxShadow: '0 8px 24px rgba(15, 23, 42, 0.12)',
    },
    default: {
      elevation: 6,
    },
  }),
};

