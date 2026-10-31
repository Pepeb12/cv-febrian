import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SPACING, SHADOWS } from '../theme';

/**
 * Header Component (Level 8: Expert Academic Dashboard & Theme Switcher)
 * Menampilkan nama kampus, judul aplikasi, badge Level 8, dan tombol pengubah tema.
 */
export default function Header({ isDarkMode, onToggleTheme, theme }) {
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
            CV & Academic Score
          </Text>
        </View>
      </View>

      <View style={styles.headerRight}>
        {/* TOMBOL PENGUBAH TEMA (Dark/Light Switcher) */}
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
        >
          <Ionicons
            name={isDarkMode ? 'sunny' : 'moon'}
            size={18}
            color={isDarkMode ? '#FBBF24' : '#1E40AF'}
          />
        </TouchableOpacity>

        {/* Badge Level 8 (Expert) */}
        <View
          style={[
            styles.badgeLevel,
            {
              backgroundColor: isDarkMode ? '#064E3B' : '#DCFCE7',
              borderColor: isDarkMode ? '#059669' : '#86EFAC',
            },
          ]}
        >
          <Text
            style={[
              styles.badgeText,
              { color: isDarkMode ? '#4ADE80' : '#15803D' },
            ]}
          >
            LEVEL 8
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
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
    letterSpacing: 1,
  },
  appTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  themeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeLevel: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 1,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
});
