import { Platform } from 'react-native';

/**
 * PALET WARNA RESMI MODUL UTS PEMROGRAMAN MOBILE
 * Disesuaikan 100% dengan tabel Token Design System:
 * - Light Mode: Background #F2E9DF, Surface #FBF6EF, Primary #843F4B
 * - Dark Mode:  Background #25191D, Surface #34252A, Primary #C17B88
 */

export const FONTS = {
  regular: 'Inter_400Regular',
  medium: 'Inter_500Medium',
  semiBold: 'Inter_600SemiBold',
  bold: 'Inter_700Bold',
  extraBold: 'Inter_800ExtraBold',
  black: 'Inter_900Black',

  display: Platform.select({
    web: '"Lora", "DM Sans", "Plus Jakarta Sans", "Inter", serif',
    default: 'sans-serif',
  }),
  body: 'Inter_400Regular',
  bodyMedium: 'Inter_500Medium',
  bodyBold: 'Inter_700Bold',
  mono: Platform.select({
    web: '"IBM Plex Mono", "JetBrains Mono", "Fira Code", monospace',
    default: 'monospace',
  }),
  heading: Platform.select({
    web: '"Lora", "DM Sans", "Inter", serif',
    default: 'sans-serif',
  }),
  subheading: 'Inter_700Bold',
  title: 'Inter_600SemiBold',
  caption: 'Inter_400Regular',
  badge: 'Inter_600SemiBold',
};

export const LIGHT_THEME = {
  isDark: false,

  // Token Tabel Resmi Modul
  background: '#F2E9DF',
  bg: '#F2E9DF',
  surface: '#FBF6EF',
  surface2: '#E5D8CD',
  surfaceSecondary: '#E5D8CD',
  surfaceHover: '#EADDD2',
  surfaceMuted: '#E5D8CD',
  surfaceSubtle: '#FBF6EF',

  // Warna Teks Mode Terang Rekomendasi Resmi
  heading: '#39252B',       // Primary Text: Untuk judul, nama, heading, dan teks penting
  textPrimary: '#39252B',   // Primary Text
  bodyText: '#59434A',      // Secondary Text: Untuk paragraf, deskripsi, dan isi informasi
  text: '#59434A',          // Secondary Text
  textSecondary: '#59434A', // Secondary Text
  secondary: '#59434A',     // Secondary Text
  textMuted: '#765F63',     // Muted Text: Untuk label kecil, tanggal, subtitle, dan keterangan
  textLight: '#765F63',     // Muted Text
  textInverted: '#F4E9DD',

  // Accent Text: Untuk tautan, ikon penting, angka, dan teks aksen (#843F4B)
  primary: '#843F4B',
  accent: '#843F4B',
  accentText: '#843F4B',
  primaryHover: '#6E303E',
  accentSoft: 'rgba(132, 63, 75, 0.12)',
  primaryLight: 'rgba(132, 63, 75, 0.12)',
  primaryBorder: '#843F4B',
  onPrimary: '#FFFFFF',

  border: '#D9C6B9',
  borderLight: '#E5D8CD',
  borderStrong: '#843F4B',
  highlightTop: 'rgba(255, 255, 255, 0.65)',

  input: '#F8F1E9',
  inputBackground: '#F8F1E9',
  inputBorder: '#D9C6B9',

  // Success Text: Untuk status aktif, berhasil, dan informasi positif (#35634F)
  success: '#35634F',
  successText: '#35634F',
  successLight: 'rgba(53, 99, 79, 0.14)',
  successBorder: '#35634F',

  danger: '#A83F46',
  error: '#A83F46',
  errorLight: 'rgba(168, 63, 70, 0.14)',

  progressTrack: '#E5D8CD',
  progressFill: '#843F4B',

  accentMustard: '#843F4B',
  accentBronze: '#6E303E',
  cardHeaderBanner: '#FBF6EF',
};

export const DARK_THEME = {
  isDark: true,

  // Token Tabel Resmi Modul
  background: '#25191D',
  bg: '#25191D',
  surface: '#34252A',
  surface2: '#423037',
  surfaceSecondary: '#423037',
  surfaceHover: '#4B353D',
  surfaceMuted: '#423037',
  surfaceSubtle: '#25191D',

  heading: '#F4E9DD',
  bodyText: '#E0CFC6',
  text: '#E0CFC6',
  textPrimary: '#F4E9DD',
  textSecondary: '#D1BDB5',
  textMuted: '#BCA8A6',
  textLight: '#BCA8A6',
  textInverted: '#25191D',

  primary: '#C17B88',
  accent: '#C17B88',
  accentText: '#C17B88',
  primaryHover: '#D18C98',
  accentSoft: 'rgba(193, 123, 136, 0.16)',
  primaryLight: 'rgba(193, 123, 136, 0.16)',
  primaryBorder: '#C17B88',
  onPrimary: '#25191D',

  border: '#594047',
  borderLight: '#423037',
  borderStrong: '#C17B88',
  highlightTop: 'rgba(255, 255, 255, 0.08)',

  input: '#2D2025',
  inputBackground: '#2D2025',
  inputBorder: '#594047',

  success: '#80C69B',
  successLight: 'rgba(128, 198, 155, 0.16)',
  successBorder: '#80C69B',
  successText: '#80C69B',

  danger: '#F08B91',
  error: '#F08B91',
  errorLight: 'rgba(240, 139, 145, 0.16)',

  progressTrack: '#423037',
  progressFill: '#C17B88',

  secondary: '#D1BDB5',
  accentMustard: '#C17B88',
  accentBronze: '#D18C98',
  cardHeaderBanner: '#34252A',
};

export type Theme = typeof LIGHT_THEME;

export const getTheme = (isDark = true): Theme => (isDark ? DARK_THEME : LIGHT_THEME);

export const COLORS = DARK_THEME;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  gap: 20,
  lg: 24,
  xl: 32,
  xxl: 40,
  xxxl: 48,
  sectionGap: 80,
  huge: 64,
  cardPadding: 20,
  cardRadius: 18,
};

export const SHADOWS = {
  card: Platform.select({
    web: {
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
    },
    default: {
      elevation: 3,
    },
  }),
};
