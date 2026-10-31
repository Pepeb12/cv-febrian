import { Platform } from 'react-native';

/**
 * Design Tokens & Theme System (Materi P4: Layout & Styling React Native)
 * Standarisasi warna, tipografi, jarak (spacing), dan bayangan (shadow)
 * untuk menjamin konsistensi visual di seluruh aplikasi.
 */

export const COLORS = {
  // Brand & Primary
  primary: '#1E40AF',       // Deep Royal Blue (Masoem University Brand)
  primaryLight: '#EFF6FF',  // Soft Blue Tint
  primaryHover: '#1D4ED8',
  primaryBorder: '#BFDBFE',

  // Secondary & Accents
  accentCyan: '#0284C7',
  accentEmerald: '#059669',
  accentEmeraldLight: '#ECFDF5',
  accentEmeraldBorder: '#A7F3D0',
  accentViolet: '#7C3AED',
  accentVioletLight: '#F5F3FF',
  accentAmber: '#D97706',
  accentAmberLight: '#FFFBEB',

  // Neutral Colors (Slate Scale)
  textPrimary: '#0F172A',   // Slate 900 (High contrast readability)
  textSecondary: '#334155', // Slate 700 (Body text)
  textMuted: '#64748B',     // Slate 500 (Subtitles & captions)
  textLight: '#94A3B8',     // Slate 400 (Dividers & placeholders)
  
  // Surfaces & Backgrounds
  background: '#F8FAFC',    // Slate 50 (Screen background)
  surface: '#FFFFFF',       // Pure white card surface
  surfaceMuted: '#F1F5F9',  // Slate 100 (Secondary card background)
  border: '#E2E8F0',        // Slate 200 (Clean divider lines)
  borderLight: '#F1F5F9',

  // Status
  success: '#16A34A',
  successLight: '#F0FDF4',
  successBorder: '#BBF7D0',
  successText: '#15803D',
};

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
    fontWeight: '800',
    color: COLORS.textPrimary,
    letterSpacing: -0.5,
  },
  h2: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
    letterSpacing: -0.3,
  },
  h3: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  body: {
    fontSize: 13,
    fontWeight: '400',
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  bodyBold: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textPrimary,
    lineHeight: 20,
  },
  caption: {
    fontSize: 11,
    fontWeight: '500',
    color: COLORS.textMuted,
    lineHeight: 16,
  },
  badge: {
    fontSize: 11,
    fontWeight: '700',
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
  }),
};

