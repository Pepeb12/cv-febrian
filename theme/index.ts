import { Platform } from 'react-native';

/**
 * PALET WARNA ELEGAN: Emerald – Cream – White
 * Kesan: Elegan, tenang, dan berkelas
 * - Emerald: #065F46
 * - Cream:   #F5F5DC
 * - White:   #FFFFFF
 * - Mint:    #A7F3D0
 */

export const PALETTE = {
  emerald: '#065F46',
  emeraldDark: '#044E39',
  emeraldDeep: '#022C22',
  cream: '#F5F5DC',
  creamLight: '#FAF9F3',
  creamDark: '#E8E8CE',
  white: '#FFFFFF',
  mint: '#A7F3D0',
  mintLight: '#ECFDF5',
  mintDark: '#047857',
};

export const FONTS = {
  heading: 'Lato_700Bold',
  body: 'Lato_400Regular',
  bold: 'Lato_700Bold',
  regular: 'Lato_400Regular',
};

export const LIGHT_THEME = {
  isDark: false,
  // Brand Signatures
  primary: '#065F46',         // Emerald #065F46
  primaryLight: '#ECFDF5',    // Soft Mint-tinted cream
  primaryHover: '#044E39',
  primaryBorder: '#A7F3D0',   // Mint #A7F3D0

  cream: '#F5F5DC',           // Cream #F5F5DC
  white: '#FFFFFF',           // White #FFFFFF
  mint: '#A7F3D0',            // Mint #A7F3D0
  emerald: '#065F46',

  // Structural Surfaces
  background: '#FAF9F3',      // Warm Cream-tinted luxury background
  surface: '#FFFFFF',         // Pure crisp white cards
  surfaceMuted: '#F5F5DC',    // Warm cream accent surfaces
  surfaceSubtle: '#F2F0E6',
  border: '#E3DFC8',          // Soft warm border
  borderLight: '#ECE9D8',

  // Typography (Dark emerald charcoal for maximum contrast & class)
  textPrimary: '#06281E',     // Deepest Forest Slate
  textSecondary: '#204639',   // Refined Emerald Charcoal
  textMuted: '#517466',       // Muted Sage Slate
  textLight: '#85A698',       // Light Sage Slate

  // Accents & Badges
  secondary: '#065F46',
  accentEmerald: '#065F46',
  accentCream: '#F5F5DC',
  accentMint: '#A7F3D0',
  accentMintLight: '#ECFDF5',
  accentEmeraldBorder: '#A7F3D0',
  accentCyan: '#059669',
  accentAmber: '#B45309',

  // Feedback Colors
  success: '#065F46',
  successLight: '#ECFDF5',
  successBorder: '#A7F3D0',
  successText: '#065F46',
  error: '#DC2626',
  errorLight: '#FEF2F2',

  cardHeaderBanner: '#065F46',
  inputBackground: '#FFFFFF',
};

export const DARK_THEME = {
  isDark: true,
  // Brand Signatures in Dark Mode
  primary: '#A7F3D0',         // Mint #A7F3D0 (Glow on deep emerald)
  primaryLight: '#0A3F31',
  primaryHover: '#6EE7B7',
  primaryBorder: '#065F46',

  cream: '#F5F5DC',
  white: '#FFFFFF',
  mint: '#A7F3D0',
  emerald: '#065F46',

  // Structural Surfaces
  background: '#041812',      // Deep Royal Emerald Night
  surface: '#0A2920',         // Deep Emerald Surface
  surfaceMuted: '#10392D',    // Muted Emerald Slate
  surfaceSubtle: '#061F17',
  border: '#19493B',          // Subtle Emerald Border
  borderLight: '#11352A',

  // Typography (Classy Warm Cream text)
  textPrimary: '#F5F5DC',     // Warm Cream #F5F5DC text
  textSecondary: '#D7EDE2',   // Soft Sage Cream
  textMuted: '#96BCAE',       // Muted Mint Slate
  textLight: '#658C7E',

  // Accents & Badges
  secondary: '#A7F3D0',
  accentEmerald: '#065F46',
  accentCream: '#F5F5DC',
  accentMint: '#A7F3D0',
  accentMintLight: '#073327',
  accentEmeraldBorder: '#065F46',
  accentCyan: '#34D399',
  accentAmber: '#FBBF24',

  // Feedback Colors
  success: '#A7F3D0',
  successLight: '#064E3B',
  successBorder: '#065F46',
  successText: '#A7F3D0',
  error: '#F87171',
  errorLight: '#450A0A',

  cardHeaderBanner: '#065F46',
  inputBackground: '#09251C',
};

export type Theme = typeof LIGHT_THEME;

export const getTheme = (isDark = false): Theme => (isDark ? DARK_THEME : LIGHT_THEME);

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
    fontFamily: FONTS.heading,
    fontSize: 22,
    fontWeight: '700' as const,
    letterSpacing: -0.3,
  },
  h2: {
    fontFamily: FONTS.heading,
    fontSize: 18,
    fontWeight: '700' as const,
    letterSpacing: -0.2,
  },
  h3: {
    fontFamily: FONTS.heading,
    fontSize: 15,
    fontWeight: '700' as const,
  },
  body: {
    fontFamily: FONTS.body,
    fontSize: 13,
    fontWeight: '400' as const,
    lineHeight: 20,
  },
  bodyBold: {
    fontFamily: FONTS.heading,
    fontSize: 13,
    fontWeight: '700' as const,
    lineHeight: 20,
  },
  caption: {
    fontFamily: FONTS.body,
    fontSize: 11,
    fontWeight: '400' as const,
    lineHeight: 16,
  },
  badge: {
    fontFamily: FONTS.heading,
    fontSize: 11,
    fontWeight: '700' as const,
    letterSpacing: 0.5,
  },
};

export const SHADOWS = {
  sm: Platform.select({
    ios: {
      shadowColor: '#06281E',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 3,
    },
    android: {
      elevation: 2,
    },
    web: {
      boxShadow: '0 1px 3px rgba(6, 40, 30, 0.06)',
    },
    default: {
      elevation: 2,
    },
  }),
  md: Platform.select({
    ios: {
      shadowColor: '#06281E',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.07,
      shadowRadius: 10,
    },
    android: {
      elevation: 3,
    },
    web: {
      boxShadow: '0 4px 14px rgba(6, 40, 30, 0.08)',
    },
    default: {
      elevation: 3,
    },
  }),
  lg: Platform.select({
    ios: {
      shadowColor: '#06281E',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.1,
      shadowRadius: 20,
    },
    android: {
      elevation: 5,
    },
    web: {
      boxShadow: '0 8px 24px rgba(6, 40, 30, 0.12)',
    },
    default: {
      elevation: 5,
    },
  }),
};
