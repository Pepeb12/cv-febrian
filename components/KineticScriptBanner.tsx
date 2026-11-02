import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Platform, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '../theme';

interface KineticScriptBannerProps {
  scriptText: string;
  sectionTag: string;
  scrollY?: number;
  sectionTop?: number;
  direction?: 'left' | 'right';
  theme: Theme;
}

/**
 * Injeksi Web Font untuk Huruf Sambung Kaligrafi Elegan (Dancing Script & Playfair Display Italic)
 */
const injectWebScriptFont = () => {
  if (Platform.OS === 'web' && typeof document !== 'undefined') {
    if (!document.getElementById('antigravity-script-fonts')) {
      const link = document.createElement('link');
      link.id = 'antigravity-script-fonts';
      link.rel = 'stylesheet';
      link.href =
        'https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600;700&family=Playfair+Display:ital,wght@1,500;1,700&display=swap';
      document.head.appendChild(link);
    }
  }
};

export default function KineticScriptBanner({
  scriptText,
  sectionTag,
  scrollY = 0,
  sectionTop = 0,
  direction = 'left',
  theme,
}: KineticScriptBannerProps) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  useEffect(() => {
    injectWebScriptFont();
  }, []);

  // Hitung offset translasi berdasarkan scrollY & posisi section
  const delta = scrollY - sectionTop;
  const factor = direction === 'left' ? -0.12 : 0.12;
  // Batasi agar tidak melompat terlalu jauh
  const translateX = Math.max(Math.min(delta * factor, 120), -120);

  const scriptFontFamily = Platform.select({
    web: "'Dancing Script', 'Playfair Display', cursive, serif",
    default: undefined,
  });

  return (
    <View style={styles.container} pointerEvents="none">
      {/* 1. WATERMARK LATAR BELAKANG TIPIS (Opacity ~0.10) */}
      <View
        style={[
          styles.watermarkWrapper,
          {
            transform: [{ translateX }],
          },
        ]}
      >
        <Text
          numberOfLines={1}
          style={[
            styles.watermarkText,
            {
              color: theme.primary,
              fontFamily: scriptFontFamily,
              fontSize: isMobile ? 38 : 64,
            },
          ]}
        >
          {scriptText}
        </Text>
      </View>

      {/* 2. FOREGROUND ACCENT HEADER DENGAN TAG SECTION & HURUF SAMBUNG EMAS MUSTARD */}
      <View
        style={[
          styles.foregroundRow,
          {
            transform: [{ translateX: translateX * 0.4 }],
          },
        ]}
      >
        <View
          style={[
            styles.sectionBadge,
            {
              backgroundColor: theme.surfaceMuted,
              borderColor: theme.borderLight,
            },
          ]}
        >
          <Ionicons name="sparkles" size={11} color={theme.primary} />
          <Text style={[styles.sectionBadgeText, { color: theme.primary }]}>
            {sectionTag}
          </Text>
        </View>

        <Text
          numberOfLines={1}
          style={[
            styles.scriptAccentText,
            {
              color: theme.primary,
              fontFamily: scriptFontFamily,
              fontSize: isMobile ? 18 : 24,
            },
          ]}
        >
          "{scriptText}"
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    overflow: 'hidden',
    paddingVertical: 10,
    marginBottom: 4,
    position: 'relative',
    minHeight: 48,
    justifyContent: 'center',
  },
  watermarkWrapper: {
    position: 'absolute',
    top: -8,
    left: -40,
    right: -40,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.12,
  },
  watermarkText: {
    fontWeight: '700',
    fontStyle: 'italic',
    letterSpacing: 1.5,
    userSelect: 'none' as any,
  },
  foregroundRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 8,
    opacity: 0.92,
  },
  sectionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
  },
  sectionBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  scriptAccentText: {
    fontWeight: '700',
    fontStyle: 'italic',
    letterSpacing: 0.5,
    flexShrink: 1,
  },
});
