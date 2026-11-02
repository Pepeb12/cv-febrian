import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SPACING, FONTS } from '../theme';
import { ThemeColors } from '../types';

interface HeaderProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
  theme: ThemeColors | any;
}

/**
 * Header Component (Minimalist Tech: Container Max-Width 1024px, Inter Font, Dark Slate)
 */
export default function Header({ isDarkMode, onToggleTheme, theme }: HeaderProps) {
  const currentTheme = theme || {};

  return (
    <View
      style={[
        styles.headerContainer,
        {
          backgroundColor: currentTheme.surface || '#FFFFFF',
          borderBottomColor: currentTheme.border || '#E2E8F0',
        },
      ]}
      accessibilityRole="header"
    >
      <View style={styles.innerWrapper}>
        <View style={styles.headerLeft}>
          <View
            style={[
              styles.iconCircle,
              {
                backgroundColor: currentTheme.surfaceMuted,
                borderColor: currentTheme.borderLight,
              },
            ]}
          >
            <Ionicons name="terminal-outline" size={18} color={currentTheme.textPrimary} />
          </View>
          <View>
            <Text style={[styles.universityName, { color: currentTheme.textMuted }]}>
              MASOEM UNIVERSITY
            </Text>
            <Text style={[styles.appTitle, { color: currentTheme.textPrimary }]}>
              Personal CV & Academic Score
            </Text>
          </View>
        </View>

        <View style={styles.headerRight}>
          {/* Theme Switcher Button */}
          <TouchableOpacity
            style={[
              styles.themeButton,
              {
                backgroundColor: currentTheme.surfaceMuted,
                borderColor: currentTheme.borderLight,
              },
            ]}
            activeOpacity={0.7}
            onPress={onToggleTheme}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={isDarkMode ? 'Beralih ke mode terang' : 'Beralih ke mode gelap'}
          >
            <Ionicons
              name={isDarkMode ? 'sunny-outline' : 'moon-outline'}
              size={16}
              color={currentTheme.textPrimary}
            />
          </TouchableOpacity>

          {/* Level 10 Badge (Minimalist Pill) */}
          <View
            style={[
              styles.badgeLevel,
              {
                backgroundColor: currentTheme.surfaceMuted,
                borderColor: currentTheme.borderLight,
              },
            ]}
          >
            <Text
              style={[
                styles.badgeText,
                { color: currentTheme.textSecondary },
              ]}
            >
              CV & MY SCORE
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    borderBottomWidth: 1, // Hairline separator
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md, // 16px (scale 8px)
  },
  innerWrapper: {
    width: '100%',
    maxWidth: 1200, // Standardized 1200px container
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  universityName: {
    fontFamily: FONTS.semiBold,
    fontSize: 10.5,
    fontWeight: '600',
    letterSpacing: 1.2,
  },
  appTitle: {
    fontFamily: FONTS.bold,
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  themeButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  badgeLevel: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
  },
  badgeText: {
    fontFamily: FONTS.bold,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.6,
  },
});
