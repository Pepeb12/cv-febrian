import { Platform } from 'react-native';

/**
 * MINIMALIST TECH DESIGN SYSTEM & DESIGN TOKENS
 * - Font Utama: 'Inter' (Inter_400Regular s.d. Inter_900Black)
 * - Teks Utama: Dark Slate (#0F172A)
 * - Teks Sekunder: Slate Gray (#475569 / #64748B)
 * - Spacing Scale: 8px (sm: 8, md: 16, lg: 24, xl: 32 [mb-8], xxxl: 48 [py-12])
 * - Card Styling: Flat, tanpa border keras, zero drop shadow
 * - Kontras Hierarki: H1 (34px/900), H2 (22px/800), H3 (16px/600), Body (14px/400)
 */

export const FONTS = {
  regular: 'Inter_400Regular',
  medium: 'Inter_500Medium',
  semiBold: 'Inter_600SemiBold',
  bold: 'Inter_700Bold',
  extraBold: 'Inter_800ExtraBold',
  black: 'Inter_900Black',

  // Semantics
  heading: 'Inter_900Black',
  subheading: 'Inter_700Bold',
  title: 'Inter_600SemiBold',
  body: 'Inter_400Regular',
  caption: 'Inter_400Regular',
};

export const LIGHT_THEME = {
  isDark: false,
  // Tech Minimalist Primary Accent (Deep Tech Slate / Emerald)
  primary: '#0F172A',         // Slate 900
  primaryLight: '#F1F5F9',    // Slate 100
  primaryHover: '#1E293B',
  primaryBorder: '#E2E8F0',   // Subtle soft divider

  // Structural Surfaces (Minimalist Tech)
  background: '#F8FAFC',      // Slate 50 clean backdrop
  surface: '#FFFFFF',         // Pure flat white card
  surfaceMuted: '#F1F5F9',    // Slate 100
  surfaceSubtle: '#F8FAFC',
  border: '#E2E8F0',          // Soft 1px hairline separator (no harsh borders)
  borderLight: '#F1F5F9',

  // Typography (Dark Slate & Muted Gray/Slate)
  textPrimary: '#0F172A',     // Dark Slate (bukan pure black)
  textSecondary: '#475569',   // Slate 600 (gray/slate lebih muda)
  textMuted: '#64748B',       // Slate 500
  textLight: '#94A3B8',       // Slate 400

  // Secondary & Badges
  secondary: '#0F172A',
  accentEmerald: '#059669',
  accentMint: '#10B981',
  accentCyan: '#0284C7',
  accentAmber: '#D97706',

  // Feedback Colors
  success: '#059669',
  successLight: '#F0FDF4',
  successBorder: '#BBF7D0',
  successText: '#065F46',
  error: '#DC2626',
  errorLight: '#FEF2F2',

  cardHeaderBanner: '#0F172A',
  inputBackground: '#F8FAFC',
};

export const DARK_THEME = {
  isDark: true,
  // Tech Minimalist Dark Accent
  primary: '#F8FAFC',         // Slate 50
  primaryLight: '#1E293B',    // Slate 800
  primaryHover: '#E2E8F0',
  primaryBorder: '#334155',

  // Structural Surfaces (Deep Minimalist Tech Dark)
  background: '#090D16',      // Deepest Tech Slate
  surface: '#0F172A',         // Slate 900
  surfaceMuted: '#1E293B',    // Slate 800
  surfaceSubtle: '#090D16',
  border: '#1E293B',          // Slate 800 subtle hairline
  borderLight: '#141E33',

  // Typography (Light Slate & Muted Gray)
  textPrimary: '#F8FAFC',     // Slate 50
  textSecondary: '#CBD5E1',   // Slate 300
  textMuted: '#94A3B8',       // Slate 400
  textLight: '#64748B',       // Slate 500

  // Secondary & Badges
  secondary: '#38BDF8',
  accentEmerald: '#10B981',
  accentMint: '#34D399',
  accentCyan: '#38BDF8',
  accentAmber: '#FBBF24',

  // Feedback Colors
  success: '#10B981',
  successLight: '#064E3B',
  successBorder: '#065F46',
  successText: '#34D399',
  error: '#EF4444',
  errorLight: '#450A0A',

  cardHeaderBanner: '#0F172A',
  inputBackground: '#111827',
};

export type Theme = typeof LIGHT_THEME;

export const getTheme = (isDark = false): Theme => (isDark ? DARK_THEME : LIGHT_THEME);

export const COLORS = LIGHT_THEME;

// Scale 8px Spacing (misal mb-8 = 32px, py-12 = 48px)
export const SPACING = {
  xs: 4,      // 0.5x
  sm: 8,      // 1x (8px)
  md: 16,     // 2x (16px)
  lg: 24,     // 3x (24px)
  xl: 32,     // 4x (32px = mb-8)
  xxl: 40,    // 5x (40px)
  xxxl: 48,   // 6x (48px = py-12)
  huge: 64,   // 8x (64px)
};

// Hierarki Heading Kontras (H1, H2, H3, Body)
export const TYPOGRAPHY = {
  h1: {
    fontFamily: FONTS.black,
    fontSize: 34,
    fontWeight: '900' as const,
    letterSpacing: -1,
    lineHeight: 40,
  },
  h2: {
    fontFamily: FONTS.extraBold,
    fontSize: 22,
    fontWeight: '800' as const,
    letterSpacing: -0.5,
    lineHeight: 28,
  },
  h3: {
    fontFamily: FONTS.semiBold,
    fontSize: 16,
    fontWeight: '600' as const,
    letterSpacing: -0.2,
    lineHeight: 22,
  },
  body: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 22,
  },
  bodyBold: {
    fontFamily: FONTS.bold,
    fontSize: 14,
    fontWeight: '700' as const,
    lineHeight: 22,
  },
  caption: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 18,
  },
  badge: {
    fontFamily: FONTS.semiBold,
    fontSize: 11,
    fontWeight: '600' as const,
    letterSpacing: 0.5,
  },
};

// Zero/minimal shadow: Dilarang menambahkan gradient warna atau efek bayangan (drop shadow) berlebihan
export const SHADOWS = {
  sm: {},
  md: {},
  lg: {},
};
