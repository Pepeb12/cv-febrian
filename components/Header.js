import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SPACING, SHADOWS } from '../theme';

/**
 * Header Component (Level 7: Theme Switcher & Institutional Identity)
 * Menampilkan nama kampus, judul aplikasi, badge level 7, dan tombol pengubah tema.
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
            Personal CV & Portfolio
          </Text>
        </View>
      </View>

      <View style={styles.headerRight}>
        {/* TOMBOL PENGUBAH TEMA (THEME SWITCHER - Materi Level 7) */}
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

        {/* Badge Level 7 */}
        <View
          style={[
            styles.badgeLevel,
            {
              backgroundColor: isDarkMode ? '#1E293B' : '#FEF3C7',
              borderColor: isDarkMode ? '#475569' : '#FDE68A',
            },
          ]}
        >
          <Text
            style={[
              styles.badgeText,
              { color: isDarkMode ? '#38BDF8' : '#B45309' },
            ]}
          >
            LEVEL 7
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
    fontWeight: '800',
  },
});
