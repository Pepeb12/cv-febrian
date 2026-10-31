import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SPACING, SHADOWS, FONTS } from '../theme';
import { ThemeColors } from '../types';

interface HeaderProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
  theme: ThemeColors | any;
}

/**
 * Header Component (Level 10: Industry Production Header with Accessibility & Dark Mode)
 * Styled with the Emerald – Cream – White – Mint luxury palette & Lato fonts.
 */
export default function Header({ isDarkMode, onToggleTheme, theme }: HeaderProps) {
  const currentTheme = theme || {};

  return (
    <View
      style={[
        styles.headerContainer,
        {
          backgroundColor: currentTheme.surface || '#FFFFFF',
          borderBottomColor: currentTheme.border || '#E3DFC8',
        },
      ]}
      accessibilityRole="header"
    >
      <View style={styles.headerLeft}>
        <View
          style={[
            styles.iconCircle,
            {
              backgroundColor: currentTheme.primaryLight || '#ECFDF5',
              borderColor: currentTheme.primaryBorder || '#A7F3D0',
            },
          ]}
        >
          <Ionicons name="school" size={20} color={currentTheme.primary || '#065F46'} />
        </View>
        <View>
          <Text style={[styles.universityName, { color: currentTheme.primary || '#065F46' }]}>
            MASOEM UNIVERSITY
          </Text>
          <Text style={[styles.appTitle, { color: currentTheme.textPrimary || '#06281E' }]}>
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
              backgroundColor: currentTheme.surfaceMuted || '#F5F5DC',
              borderColor: currentTheme.border || '#E3DFC8',
            },
          ]}
          activeOpacity={0.7}
          onPress={onToggleTheme}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={isDarkMode ? 'Beralih ke mode terang' : 'Beralih ke mode gelap'}
        >
          <Ionicons
            name={isDarkMode ? 'sunny' : 'moon'}
            size={17}
            color={isDarkMode ? '#F5F5DC' : '#065F46'}
          />
        </TouchableOpacity>

        {/* Level 10 Badge */}
        <View
          style={[
            styles.badgeLevel,
            {
              backgroundColor: isDarkMode ? '#064E3B' : '#ECFDF5',
              borderColor: isDarkMode ? '#065F46' : '#A7F3D0',
            },
          ]}
        >
          <Text
            style={[
              styles.badgeText,
              { color: isDarkMode ? '#A7F3D0' : '#065F46' },
            ]}
          >
            LEVEL 10
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    ...SHADOWS.sm,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  universityName: {
    fontFamily: FONTS.heading,
    fontSize: 10.5,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  appTitle: {
    fontFamily: FONTS.heading,
    fontSize: 14.5,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  themeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  badgeLevel: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
  },
  badgeText: {
    fontFamily: FONTS.heading,
    fontSize: 10.5,
    fontWeight: '700',
    letterSpacing: 0.6,
  },
});
