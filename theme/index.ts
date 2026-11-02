import { Platform } from 'react-native';

/**
 * RETRO OLIVE & BEIGE DESIGN SYSTEM & DESIGN TOKENS
 *
 * Palet Warna Terang (Light Mode - Retro Olive & Beige):
 * - Background Utama: #EAE4D3 (Warm Beige)
 * - Background Card & Navbar: #F4F1E8 (Light Cream Surface)
 * - Border, Chip & Elemen Sekunder: #939675 (Sage Olive)
 * - Aksen Utama, Tombol & Progress Bar: #62684D (Medium Olive)
 * - Teks Utama & Heading: #363C2E (Deep Dark Olive)
 * - Teks Sekunder: #5A604E
 *
 * Palet Warna Malam (Dark Mode):
 * - Background Utama: #20251D (Dark Forest)
 * - Background Card & Navbar: #30372A (Deep Olive)
 * - Border, Badge & Elemen Sekunder: #62694F (Muted Olive)
 * - Teks Utama, Heading & Aksen Aktif: #D8D2B8 (Soft Beige)
 * - Teks Sekunder: #A8A48E
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
  // Aksen Utama, Tombol & Progress Bar: #62684D (Medium Olive)
  primary: '#62684D',
  primaryLight: 'rgba(98, 104, 77, 0.12)',
  primaryHover: '#52573F',
  primaryBorder: '#939675',

  // Background Utama: #EAE4D3 (Warm Beige)
  background: '#EAE4D3',
  // Background Card & Navbar: #F4F1E8 (Light Cream Surface)
  surface: '#F4F1E8',
  surfaceMuted: '#E5DFCE',
  surfaceSubtle: '#ECE7D8',

  // Border, Chip & Elemen Sekunder: #939675 (Sage Olive)
  border: '#939675',
  borderLight: 'rgba(147, 150, 117, 0.45)',

  // Teks Utama & Heading: #363C2E (Deep Dark Olive)
  textPrimary: '#363C2E',
  // Teks Sekunder: #5A604E
  textSecondary: '#5A604E',
  textMuted: '#707762',
  textLight: '#8C927E',
  textInverted: '#F4F1E8',

  // Secondary & Accents
  secondary: '#939675',
  accentOlive: '#62684D',
  accentSage: '#939675',
  accentBeige: '#EAE4D3',
  accentAmber: '#9C6F32',

  // Feedback Colors harmonized with Retro Olive
  success: '#4A6B41',
  successLight: '#E8F0E4',
  successBorder: '#8CAE82',
  successText: '#2D4825',
  error: '#A83B3B',
  errorLight: '#FBEBEB',

  cardHeaderBanner: '#F4F1E8',
  inputBackground: '#EAE4D3',
};

export const DARK_THEME = {
  isDark: true,
  // Teks Utama, Heading & Aksen Aktif: #D8D2B8 (Soft Beige)
  primary: '#D8D2B8',
  primaryLight: 'rgba(216, 210, 184, 0.15)',
  primaryHover: '#ECE7D3',
  primaryBorder: '#62694F',

  // Background Utama: #20251D (Dark Forest)
  background: '#20251D',
  // Background Card & Navbar: #30372A (Deep Olive)
  surface: '#30372A',
  surfaceMuted: '#272D22',
  surfaceSubtle: '#1C2119',

  // Border, Badge & Elemen Sekunder: #62694F (Muted Olive)
  border: '#62694F',
  borderLight: 'rgba(98, 105, 79, 0.45)',

  // Teks Utama, Heading & Aksen Aktif: #D8D2B8 (Soft Beige)
  textPrimary: '#D8D2B8',
  // Teks Sekunder: #A8A48E
  textSecondary: '#A8A48E',
  textMuted: '#8D8973',
  textLight: '#736F5C',
  textInverted: '#20251D',

  // Secondary & Accents
  secondary: '#62694F',
  accentOlive: '#8C9472',
  accentSage: '#62694F',
  accentBeige: '#D8D2B8',
  accentAmber: '#C99A52',

  // Feedback Colors harmonized
  success: '#6B945A',
  successLight: '#1E2C1A',
  successBorder: '#4E733F',
  successText: '#BDE3AE',
  error: '#D95858',
  errorLight: '#381B1B',

  cardHeaderBanner: '#30372A',
  inputBackground: '#20251D',
};

export type Theme = typeof LIGHT_THEME;

export const getTheme = (isDark = false): Theme => (isDark ? DARK_THEME : LIGHT_THEME);

export const COLORS = LIGHT_THEME;

// Spacing & Layout Standard (Container maxWidth 1200px, gap 20px, card padding 24px, card radius 16px)
export const SPACING = {
  xs: 4,       // 4px
  sm: 8,       // 8px
  md: 16,      // 16px
  gap: 20,     // 20px (Standard inter-element gap)
  lg: 24,      // 24px (Standard card padding)
  xl: 32,      // 32px (mb-8)
  xxl: 40,     // 40px
  xxxl: 48,    // 48px
  huge: 64,    // 64px
  cardPadding: 24,
  cardRadius: 16,
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

// Minimalist Flat Shadow System
export const SHADOWS = {
  sm: {},
  md: {},
  lg: {},
};
