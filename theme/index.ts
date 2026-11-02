import { Platform } from 'react-native';

/**
 * MODERN PROFESSIONAL DESIGN SYSTEM — "Clean Slate & Indigo"
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ LIGHT MODE — "White & Indigo Professional"                      │
 * │  Background : #F8FAFC (Near-White Slate)                        │
 * │  Surface    : #FFFFFF (Pure White Card)                         │
 * │  Primary    : #4F46E5 (Indigo 600)                              │
 * │  Text       : #0F172A (Slate 900)                               │
 * │  Secondary  : #64748B (Slate 500)                               │
 * │  Border     : #E2E8F0 (Slate 200)                               │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ DARK MODE — "Deep Midnight Navy"                                 │
 * │  Background : #0B0F1A (Near-Black Navy)                         │
 * │  Surface    : #141928 (Deep Navy Card)                          │
 * │  Primary    : #818CF8 (Indigo 400 — glows on dark)              │
 * │  Text       : #F1F5F9 (Slate 100)                               │
 * │  Secondary  : #94A3B8 (Slate 400)                               │
 * │  Border     : #1E293B (Slate 800)                               │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * Font Pairing:
 *  - Headings  : Inter Black / ExtraBold (crisp, modern)
 *  - Body      : Lato Regular / Lato Bold (warm, readable)
 */

export const FONTS = {
  // Body — Lato (warm & readable)
  regular: 'Lato_400Regular',
  medium: 'Lato_400Regular',   // Lato has no 500; use 400 for medium feel
  semiBold: 'Lato_700Bold',
  bold: 'Lato_700Bold',
  extraBold: 'Lato_900Black',
  black: 'Lato_900Black',

  // Headings — Inter (crisp geometric)
  heading: 'Inter_900Black',
  subheading: 'Inter_700Bold',
  title: 'Inter_600SemiBold',
  body: 'Lato_400Regular',
  caption: 'Lato_400Regular',
};

// ──────────────────────────────────────────────
// LIGHT MODE: Clean White & Indigo Professional
// ──────────────────────────────────────────────
export const LIGHT_THEME = {
  isDark: false,

  // Primary accent — Indigo 600
  primary: '#4F46E5',
  primaryLight: 'rgba(79, 70, 229, 0.08)',
  primaryHover: '#4338CA',
  primaryBorder: '#A5B4FC',

  // Backgrounds
  background: '#F1F5F9',      // Slate 100 — very light blue-grey
  surface: '#FFFFFF',          // Pure white cards
  surfaceMuted: '#F8FAFC',     // Slate 50
  surfaceSubtle: '#EEF2FF',    // Indigo 50 — light accent tint

  // Borders
  border: '#E2E8F0',           // Slate 200
  borderLight: 'rgba(226, 232, 240, 0.7)',

  // Text
  textPrimary: '#0F172A',      // Slate 900 — near-black, not pure black
  textSecondary: '#475569',    // Slate 600
  textMuted: '#64748B',        // Slate 500
  textLight: '#94A3B8',        // Slate 400
  textInverted: '#FFFFFF',

  // Accents
  secondary: '#64748B',
  accentOlive: '#4F46E5',
  accentSage: '#6366F1',
  accentBeige: '#EEF2FF',
  accentAmber: '#D97706',      // Amber for scores/grades

  // Feedback
  success: '#059669',          // Emerald 600
  successLight: '#ECFDF5',
  successBorder: '#6EE7B7',
  successText: '#065F46',
  error: '#DC2626',            // Red 600
  errorLight: '#FEF2F2',

  cardHeaderBanner: '#FFFFFF',
  inputBackground: '#F8FAFC',
};

// ──────────────────────────────────────────────
// DARK MODE: Deep Midnight Navy & Indigo Glow
// ──────────────────────────────────────────────
export const DARK_THEME = {
  isDark: true,

  // Primary accent — Indigo 400 (glows on dark bg)
  primary: '#818CF8',
  primaryLight: 'rgba(129, 140, 248, 0.15)',
  primaryHover: '#A5B4FC',
  primaryBorder: '#4F46E5',

  // Backgrounds — deep navy layers
  background: '#0B0F1A',       // Near-black navy
  surface: '#141928',          // Deep navy card
  surfaceMuted: '#1E2336',     // Slightly lighter navy
  surfaceSubtle: '#0F1629',    // Darkest tint

  // Borders — subtle navy-blue
  border: '#1E293B',           // Slate 800
  borderLight: 'rgba(30, 41, 59, 0.8)',

  // Text — cool blue-white tones
  textPrimary: '#F1F5F9',      // Slate 100
  textSecondary: '#94A3B8',    // Slate 400
  textMuted: '#64748B',        // Slate 500
  textLight: '#475569',        // Slate 600
  textInverted: '#0B0F1A',

  // Accents
  secondary: '#334155',
  accentOlive: '#818CF8',
  accentSage: '#6366F1',
  accentBeige: '#1E2336',
  accentAmber: '#FBBF24',      // Amber glow for scores

  // Feedback
  success: '#34D399',          // Emerald 400
  successLight: '#064E3B',
  successBorder: '#059669',
  successText: '#A7F3D0',
  error: '#F87171',            // Red 400
  errorLight: '#450A0A',

  cardHeaderBanner: '#141928',
  inputBackground: '#0B0F1A',
};

export type Theme = typeof LIGHT_THEME;

export const getTheme = (isDark = false): Theme => (isDark ? DARK_THEME : LIGHT_THEME);

export const COLORS = LIGHT_THEME;

// ──────────────────────────────────────────────
// SPACING — 8px Scale System
// ──────────────────────────────────────────────
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  gap: 24,        // 24px standard inter-element gap (↑ from 20px for more breathing room)
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 56,
  huge: 72,
  cardPadding: 28,   // Slightly more generous padding on cards
  cardRadius: 16,
};

// ──────────────────────────────────────────────
// TYPOGRAPHY — Inter (headings) + Lato (body)
// ──────────────────────────────────────────────
export const TYPOGRAPHY = {
  h1: {
    fontFamily: 'Inter_900Black',
    fontSize: 36,
    fontWeight: '900' as const,
    letterSpacing: -1.2,
    lineHeight: 44,
  },
  h2: {
    fontFamily: 'Inter_800ExtraBold',
    fontSize: 24,
    fontWeight: '800' as const,
    letterSpacing: -0.6,
    lineHeight: 32,
  },
  h3: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 17,
    fontWeight: '600' as const,
    letterSpacing: -0.3,
    lineHeight: 24,
  },
  body: {
    fontFamily: 'Lato_400Regular',
    fontSize: 15,
    fontWeight: '400' as const,
    lineHeight: 24,
  },
  bodyBold: {
    fontFamily: 'Lato_700Bold',
    fontSize: 15,
    fontWeight: '700' as const,
    lineHeight: 24,
  },
  caption: {
    fontFamily: 'Lato_400Regular',
    fontSize: 13,
    fontWeight: '400' as const,
    lineHeight: 20,
  },
  badge: {
    fontFamily: 'Lato_700Bold',
    fontSize: 11,
    fontWeight: '700' as const,
    letterSpacing: 0.6,
  },
};

// ──────────────────────────────────────────────
// SHADOWS — Subtle depth cues
// ──────────────────────────────────────────────
export const SHADOWS = {
  sm: Platform.select({
    web: { boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)' },
    default: { elevation: 1 },
  }),
  md: Platform.select({
    web: { boxShadow: '0 4px 6px rgba(0,0,0,0.05), 0 2px 4px rgba(0,0,0,0.04)' },
    default: { elevation: 3 },
  }),
  lg: Platform.select({
    web: { boxShadow: '0 10px 15px rgba(0,0,0,0.07), 0 4px 6px rgba(0,0,0,0.05)' },
    default: { elevation: 6 },
  }),
};
