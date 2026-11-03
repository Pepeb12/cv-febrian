import { Platform } from 'react-native';

/**
 * COSMIC INDIGO & GOLDEN AMBER GLASSMORPHISM DESIGN SYSTEM
 *
 * Palet Inti (Cosmic Indigo & Golden Amber):
 * 1. Vibrant Indigo     : #6366F1 (Aksen Utama Dark Mode, Glow, Border Highlight)
 * 2. Royal Indigo       : #4F46E5 (Tombol Utama, Aksen Utama Light Mode)
 * 3. Golden Amber       : #F59E0B / #FBBF24 (Aksen Sekunder, Teks Typing, Bintang Marquee, Garis Aksen)
 * 4. Deep Cosmic Navy   : #0B0D1E (Latar Belakang Global Dark Mode)
 * 5. Soft Cool White    : #F8FAFC -> #EEF2FF (Latar Belakang Global Light Mode)
 *
 * Mode Terang (Soft Lavender White & Royal Indigo):
 * - Background Utama: #F8FAFC ke #EEF2FF
 * - Permukaan Card (surface): rgba(255, 255, 255, 0.88) dengan border #E2E8F0
 * - Aksen Utama (primary): #4F46E5 (Royal Indigo)
 * - Aksen Sekunder (secondary): #D97706 (Warm Amber) / #F59E0B
 * - Teks Utama: #0F172A, Teks Highlight: #4F46E5, Teks Sekunder: #475569
 *
 * Mode Gelap (Cosmic Navy & Indigo Glass):
 * - Background Utama: #0B0D1E (Deep Cosmic Navy)
 * - Permukaan Card (surface): rgba(22, 27, 51, 0.78) dengan border rgba(99, 102, 241, 0.22)
 * - Aksen Utama (primary): #6366F1 (Vibrant Indigo) & tombol utama #4F46E5
 * - Aksen Sekunder (secondary): #FBBF24 / #F59E0B (Golden Amber)
 * - Teks Utama: #F8FAFC, Teks Highlight: #818CF8, Teks Sekunder: #94A3B8
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
  badge: 'Inter_600SemiBold',
};

export const LIGHT_THEME = {
  isDark: false,
  // Aksen Utama & Tombol: Royal Indigo (#4F46E5)
  primary: '#4F46E5',
  primaryButton: '#4F46E5',
  primaryLight: 'rgba(79, 70, 229, 0.12)',
  primaryHover: '#4338CA',
  primaryBorder: 'rgba(79, 70, 229, 0.3)',
  onPrimary: '#FFFFFF',

  // Background Utama Halaman: #F8FAFC ke #EEF2FF
  background: '#F8FAFC',
  backgroundSecondary: '#EEF2FF',
  // Background Card & Navbar: rgba(255, 255, 255, 0.88)
  surface: 'rgba(255, 255, 255, 0.88)',
  surfaceSecondary: '#EEF2FF',
  surfaceMuted: '#F1F5F9',
  surfaceSubtle: '#F8FAFC',

  // Border Card & Garis Pemisah: #E2E8F0
  border: '#E2E8F0',
  borderLight: '#EEF2FF',
  borderStrong: '#4F46E5',

  // Teks
  textPrimary: '#0F172A',
  textHighlight: '#4F46E5',
  textSecondary: '#475569',
  textMuted: '#64748B',
  textLight: '#94A3B8',
  textInverted: '#FFFFFF',

  // Secondary & Accents: Warm Amber (#D97706 / #F59E0B)
  secondary: '#D97706',
  accentAmber: '#F59E0B',
  accentIndigo: '#4F46E5',
  accentMustard: '#D97706',
  accentBronze: '#B45309',
  accentCream: '#EEF2FF',
  accentMocha: '#475569',

  // Progress Bar & Indikator
  progressTrack: '#E2E8F0',
  progressFill: '#4F46E5',

  // Feedback Colors
  success: '#16A34A',
  successLight: '#DCFCE7',
  successBorder: '#86EFAC',
  successText: '#15803D',
  error: '#DC2626',
  errorLight: '#FEE2E2',

  cardHeaderBanner: 'rgba(255, 255, 255, 0.95)',
  inputBackground: '#F8FAFC',
  inputBorder: '#CBD5E1',
};

export const DARK_THEME = {
  isDark: true,
  // Aksen Utama: Vibrant Indigo (#6366F1), Tombol #4F46E5
  primary: '#6366F1',
  primaryButton: '#4F46E5',
  primaryLight: 'rgba(99, 102, 241, 0.22)',
  primaryHover: '#818CF8',
  primaryBorder: 'rgba(99, 102, 241, 0.4)',
  onPrimary: '#FFFFFF',

  // Background Utama Halaman: #0B0D1E (Deep Cosmic Navy)
  background: '#0B0D1E',
  backgroundSecondary: '#121633',
  // Background Card & Navbar: rgba(22, 27, 51, 0.78) (Cosmic Glass)
  surface: 'rgba(22, 27, 51, 0.78)',
  surfaceSecondary: 'rgba(30, 37, 70, 0.85)',
  surfaceMuted: 'rgba(30, 37, 70, 0.65)',
  surfaceSubtle: 'rgba(18, 22, 45, 0.9)',

  // Border Card & Garis Pemisah: rgba(99, 102, 241, 0.22)
  border: 'rgba(99, 102, 241, 0.22)',
  borderLight: 'rgba(99, 102, 241, 0.14)',
  borderStrong: '#6366F1',

  // Teks
  textPrimary: '#F8FAFC',
  textHighlight: '#818CF8',
  textSecondary: '#94A3B8',
  textMuted: '#64748B',
  textLight: '#94A3B8',
  textInverted: '#0B0D1E',

  // Secondary & Accents: Golden Amber (#FBBF24 / #F59E0B)
  secondary: '#F59E0B',
  accentAmber: '#FBBF24',
  accentIndigo: '#6366F1',
  accentMustard: '#F59E0B',
  accentBronze: '#D97706',
  accentCream: '#1E2546',
  accentMocha: '#94A3B8',

  // Progress Bar & Indikator
  progressTrack: 'rgba(99, 102, 241, 0.18)',
  progressFill: '#6366F1',

  // Feedback Colors
  success: '#22C55E',
  successLight: 'rgba(34, 197, 94, 0.15)',
  successBorder: 'rgba(34, 197, 94, 0.35)',
  successText: '#4ADE80',
  error: '#EF4444',
  errorLight: 'rgba(239, 68, 68, 0.15)',

  cardHeaderBanner: 'rgba(22, 27, 51, 0.92)',
  inputBackground: 'rgba(15, 19, 40, 0.85)',
  inputBorder: 'rgba(99, 102, 241, 0.28)',
};

export type Theme = typeof LIGHT_THEME;

export const getTheme = (isDark = false): Theme => (isDark ? DARK_THEME : LIGHT_THEME);

export const COLORS = LIGHT_THEME;

// Spacing & Layout Standard (Container maxWidth 1360px, gap 20px, card padding 24px, card radius 16px)
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  gap: 20,
  lg: 24,
  xl: 32,
  xxl: 40,
  xxxl: 48,
  huge: 64,
  cardPadding: 24,
  cardRadius: 16,
};

// Hierarki Heading Kontras
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

// Minimalist Flat & Glass Shadow System
export const SHADOWS = {
  sm: Platform.select({
    web: { boxShadow: '0 1px 3px rgba(0,0,0,0.06)' },
    default: { elevation: 1 },
  }),
  md: Platform.select({
    web: { boxShadow: '0 4px 6px rgba(0,0,0,0.08)' },
    default: { elevation: 2 },
  }),
  lg: Platform.select({
    web: { boxShadow: '0 10px 25px -3px rgba(79, 70, 229, 0.12), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' },
    default: { elevation: 4 },
  }),
  glass: Platform.select({
    web: {
      backdropFilter: 'blur(14px)',
      boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.25)',
    },
    default: { elevation: 3 },
  }),
};
