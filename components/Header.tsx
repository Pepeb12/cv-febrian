import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SPACING } from '../theme';
import { ThemeColors } from '../types';

interface HeaderProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
  theme: ThemeColors | any;
}

/**
 * Header — Modern Professional (Clean Slate & Indigo)
 * White/Navy surface | Inter heading | Lato subtitle
 */
export default function Header({ isDarkMode, onToggleTheme, theme }: HeaderProps) {
  const t = theme || {};

  return (
    <View
      style={[
        styles.headerContainer,
        {
          backgroundColor: t.surface || '#FFFFFF',
          borderBottomColor: t.border || '#E2E8F0',
        },
      ]}
      accessibilityRole="header"
    >
      <View style={styles.innerWrapper}>
        {/* LEFT: Logo + Title */}
        <View style={styles.headerLeft}>
          <View
            style={[
              styles.logoBox,
              {
                backgroundColor: t.primary,
              },
            ]}
          >
            <Ionicons name="code-slash" size={18} color="#FFFFFF" />
          </View>
          <View style={styles.titleGroup}>
            <Text style={[styles.universityName, { color: t.textMuted }]}>
              MASOEM UNIVERSITY
            </Text>
            <Text style={[styles.appTitle, { color: t.textPrimary }]}>
              Personal CV &amp; Academic Score
            </Text>
          </View>
        </View>

        {/* RIGHT: Theme Toggle */}
        <TouchableOpacity
          style={[
            styles.themeButton,
            {
              backgroundColor: isDarkMode ? t.surfaceMuted : t.surfaceSubtle,
              borderColor: t.border,
            },
          ]}
          activeOpacity={0.7}
          onPress={onToggleTheme}
          accessible
          accessibilityRole="button"
          accessibilityLabel={isDarkMode ? 'Beralih ke mode terang' : 'Beralih ke mode gelap'}
        >
          <Ionicons
            name={isDarkMode ? 'sunny' : 'moon'}
            size={16}
            color={isDarkMode ? '#FBBF24' : t.primary}
          />
          <Text style={[styles.themeLabel, { color: t.textSecondary }]}>
            {isDarkMode ? 'Light' : 'Dark'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    borderBottomWidth: 1,
    paddingHorizontal: SPACING.lg,
    paddingVertical: 14,
    ...Platform.select({
      web: {
        position: 'sticky' as any,
        top: 0,
        zIndex: 100,
        backdropFilter: 'blur(12px)' as any,
      },
    }),
  },
  innerWrapper: {
    width: '100%',
    maxWidth: 1100,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    flex: 1,
  },
  logoBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleGroup: {
    gap: 1,
  },
  universityName: {
    fontFamily: 'Lato_700Bold',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.8,
    textTransform: 'uppercase',
  },
  appTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 15.5,
    fontWeight: '700',
    letterSpacing: -0.4,
  },
  themeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 10,
    borderWidth: 1,
    ...Platform.select({
      web: { cursor: 'pointer' as any },
    }),
  },
  themeLabel: {
    fontFamily: 'Lato_700Bold',
    fontSize: 12.5,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
