import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SPACING, SHADOWS } from '../theme';
import { ThemeColors } from '../types';

interface HeaderProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
  theme: ThemeColors | any;
}

/**
 * Header Component (Level 10: Industry Production Header with Accessibility & Dark Mode)
 * Menampilkan nama kampus, judul aplikasi, badge Level 10 Industry, dan tombol pengubah tema.
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
      <View style={styles.headerLeft}>
        <View
          style={[
            styles.iconCircle,
            { backgroundColor: currentTheme.primaryLight || '#EFF6FF' },
          ]}
        >
          <Ionicons name="school" size={22} color={currentTheme.primary || '#1E40AF'} />
        </View>
        <View>
          <Text style={[styles.universityName, { color: currentTheme.primary || '#1E40AF' }]}>
            MASOEM UNIVERSITY
          </Text>
          <Text style={[styles.appTitle, { color: currentTheme.textPrimary || '#0F172A' }]}>
            Personal CV & Academic Score
          </Text>
        </View>
      </View>

      <View style={styles.headerRight}>
        {/* TOMBOL PENGUBAH TEMA (Dark/Light Switcher) dengan Accessibility */}
        <TouchableOpacity
          style={[
            styles.themeButton,
            {
              backgroundColor: currentTheme.surfaceMuted || '#F1F5F9',
              borderColor: currentTheme.border || '#CBD5E1',
            },
          ]}
          activeOpacity={0.7}
          onPress={onToggleTheme}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={isDarkMode ? 'Beralih ke mode terang' : 'Beralih ke mode gelap'}
          accessibilityHint="Mengubah tema warna aplikasi secara instan"
        >
          <Ionicons
            name={isDarkMode ? 'sunny' : 'moon'}
            size={18}
            color={isDarkMode ? '#FBBF24' : '#1E40AF'}
          />
        </TouchableOpacity>

        {/* Badge Level 10 (Industry) */}
        <View
          style={[
            styles.badgeLevel,
            {
              backgroundColor: isDarkMode ? '#134E4A' : '#CCFBF1',
              borderColor: isDarkMode ? '#0D9488' : '#5EEAD4',
            },
          ]}
          accessible={true}
          accessibilityRole="text"
          accessibilityLabel="Tingkat aplikasi: Level 10 Industry"
        >
          <Text
            style={[
              styles.badgeText,
              { color: isDarkMode ? '#5EEAD4' : '#0F766E' },
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
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  universityName: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  appTitle: {
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  themeButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  badgeLevel: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
});
