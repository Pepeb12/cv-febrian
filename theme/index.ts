import { Platform } from 'react-native';

/**
 * RETRO MUSTARD & BROWN DESIGN SYSTEM & DESIGN TOKENS
 * ("Klasik, unik, dan penuh karakter")
 *
 * Palet Inti (4 Swatch Utama):
 * 1. Retro Mustard Gold  : #B5893D (Aksen Utama, Tombol Primer, Tab Aktif, Progress Bar, Highlight)
 * 2. Warm Bronze Brown   : #9A7243 (Aksen Sekunder, Border Aktif, Ikon, Badge Highlight)
 * 3. Deep Espresso Brown : #3E3227 (Teks Utama Mode Terang / Permukaan Gelap Mode Malam)
 * 4. Rich Cocoa Mocha    : #634B35 (Teks Sekunder, Border Elemen, Sub-elemen Kontras)
 *
 * Palet Warna Terang (Light Mode — Retro Mustard & Warm Cream):
 * - Background Utama: #F2EAD7 (Warm Vintage Cream)
 * - Background Card & Navbar: #FAF5E8 (Soft Ivory Surface)
 * - Sub-Card, Kotak Ikon & Badge: #EAE0C8 (Warm Sand Beige)
 * - Border Card & Divider: #D5C7AA (Soft Tan Border)
 * - Border Aktif / Sekunder: #9A7243 (Warm Bronze Brown)
 * - Aksen Utama & Tombol Primer: #B5893D (Retro Mustard Gold)
 * - Teks Utama & Heading: #3E3227 (Deep Espresso Brown)
 * - Teks Sekunder: #634B35 (Rich Cocoa Mocha)
 * - Teks Muted: #856A4F (Muted Mocha)
 * - Teks Inverted: #FFFDF7 (Warm White)
 * - Input Background: #F4EDE0 (Border #C9B99B)
 *
 * Palet Warna Malam (Dark Mode — Deep Espresso, Mocha & Mustard Gold):
 * - Background Utama: #221B14 (Deep Roast Espresso)
 * - Background Card & Navbar: #30261C (Dark Umber Coffee)
 * - Sub-Card, Kotak Ikon & Badge: #3D3024 (Warm Dark Mocha)
 * - Border Card & Divider: #574432 (Muted Cocoa Border)
 * - Border Aktif / Sekunder: #8C673A (Warm Bronze)
 * - Aksen Utama & Tombol Primer: #B5893D (Retro Mustard Gold, #C49746 untuk glow & progress fill)
 * - Teks Utama & Heading: #F2EAD7 (Warm Vintage Cream)
 * - Teks Sekunder: #C7B89E (Warm Sand Tan)
 * - Teks Muted: #9E8C72 (Muted Bronze Tan)
 * - Teks Inverted: #1E1710 (Deep Espresso Gelap)
 * - Input Background: #282017 (Border #574432)
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
  // Aksen Utama, Tombol Primer, Tab Aktif: #B5893D (Retro Mustard Gold)
  primary: '#B5893D',
  primaryLight: 'rgba(181, 137, 61, 0.14)',
  primaryHover: '#A67C34',
  primaryBorder: '#9A7243',
  onPrimary: '#FFFDF7',

  // Background Utama Halaman: #F2EAD7 (Warm Vintage Cream)
  background: '#F2EAD7',
  // Background Card & Navbar: #FAF5E8 (Soft Ivory Surface)
  surface: '#FAF5E8',
  surfaceSecondary: '#EAE0C8',
  surfaceMuted: '#EAE0C8',
  surfaceSubtle: '#F4EDE0',

  // Border Card & Garis Pemisah: #D5C7AA (Soft Tan Border)
  border: '#D5C7AA',
  borderLight: '#E2D6BC',
  borderStrong: '#9A7243',

  // Teks Judul & Heading: #3E3227 (Deep Espresso Brown)
  textPrimary: '#3E3227',
  // Teks Deskripsi & Paragraf: #634B35 (Rich Cocoa Mocha)
  textSecondary: '#634B35',
  // Teks Keterangan & Placeholder: #856A4F (Muted Mocha)
  textMuted: '#856A4F',
  textLight: '#9E8C72',
  textInverted: '#FFFDF7',

  // Secondary & Accents
  secondary: '#9A7243',
  accentMustard: '#B5893D',
  accentBronze: '#9A7243',
  accentCream: '#F2EAD7',
  accentMocha: '#634B35',

  // Progress Bar & Indikator
  progressTrack: '#E2D6BC',
  progressFill: '#B5893D',

  // Feedback Colors harmonized with Warm Palette
  success: '#4E7D42',
  successLight: '#EDF4EB',
  successBorder: '#97BC8E',
  successText: '#2F5027',
  error: '#B33A3A',
  errorLight: '#FBECEC',

  cardHeaderBanner: '#FAF5E8',
  inputBackground: '#F4EDE0',
  inputBorder: '#C9B99B',
};

export const DARK_THEME = {
  isDark: true,
  // Aksen Utama, Tombol Primer, Tab Aktif: #B5893D (Retro Mustard Gold)
  primary: '#B5893D',
  primaryLight: 'rgba(181, 137, 61, 0.22)',
  primaryHover: '#C49746',
  primaryBorder: '#8C673A',
  onPrimary: '#1E1710',

  // Background Utama Halaman: #221B14 (Deep Roast Espresso)
  background: '#221B14',
  // Background Card & Navbar: #30261C (Dark Umber Coffee)
  surface: '#30261C',
  surfaceSecondary: '#3D3024',
  surfaceMuted: '#3D3024',
  surfaceSubtle: '#282017',

  // Border Card & Garis Pemisah: #574432 (Muted Cocoa Border)
  border: '#574432',
  borderLight: 'rgba(87, 68, 50, 0.6)',
  borderStrong: '#8C673A',

  // Teks Judul & Heading: #F2EAD7 (Warm Vintage Cream)
  textPrimary: '#F2EAD7',
  // Teks Deskripsi & Paragraf: #C7B89E (Warm Sand Tan)
  textSecondary: '#C7B89E',
  // Teks Keterangan & Placeholder: #9E8C72 (Muted Bronze Tan)
  textMuted: '#9E8C72',
  textLight: '#856A4F',
  textInverted: '#1E1710',

  // Secondary & Accents
  secondary: '#8C673A',
  accentMustard: '#B5893D',
  accentBronze: '#8C673A',
  accentCream: '#F2EAD7',
  accentMocha: '#C7B89E',

  // Progress Bar & Indikator
  progressTrack: '#3D3024',
  progressFill: '#C49746',

  // Feedback Colors harmonized
  success: '#6B9B5C',
  successLight: '#22321D',
  successBorder: '#48693E',
  successText: '#C4E8B7',
  error: '#D95858',
  errorLight: '#381B1B',

  cardHeaderBanner: '#30261C',
  inputBackground: '#282017',
  inputBorder: '#574432',
};

export type Theme = typeof LIGHT_THEME;

export const getTheme = (isDark = false): Theme => (isDark ? DARK_THEME : LIGHT_THEME);

export const COLORS = LIGHT_THEME;

// Spacing & Layout Standard (Container maxWidth 1360px, gap 20px, card padding 24px, card radius 16px)
export const SPACING = {
  xs: 4,       // 4px
  sm: 8,       // 8px
  md: 16,      // 16px
  gap: 20,     // 20px (Standard inter-element gap)
  lg: 24,      // 24px (Standard card padding)
  xl: 32,      // 32px
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
  sm: Platform.select({
    web: { boxShadow: '0 1px 3px rgba(0,0,0,0.06)' },
    default: { elevation: 1 },
  }),
  md: Platform.select({
    web: { boxShadow: '0 4px 6px rgba(0,0,0,0.05)' },
    default: { elevation: 2 },
  }),
  lg: Platform.select({
    web: { boxShadow: '0 10px 15px rgba(0,0,0,0.06)' },
    default: { elevation: 4 },
  }),
};
