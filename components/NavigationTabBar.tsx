import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Theme, SPACING, FONTS } from '../theme';

export type TabKey = 'home' | 'about' | 'skills' | 'portfolio' | 'score' | 'contact';

export interface TabItem {
  key: TabKey;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  activeIcon: keyof typeof Ionicons.glyphMap;
}

export const TABS: TabItem[] = [
  { key: 'home',      label: 'Home',      icon: 'home-outline',      activeIcon: 'home' },
  { key: 'about',     label: 'About',     icon: 'person-outline',    activeIcon: 'person' },
  { key: 'skills',    label: 'Skills',    icon: 'code-slash-outline', activeIcon: 'code-slash' },
  { key: 'portfolio', label: 'Portfolio', icon: 'briefcase-outline', activeIcon: 'briefcase' },
  { key: 'score',     label: 'My Score',  icon: 'school-outline',    activeIcon: 'school' },
  { key: 'contact',   label: 'Contact',   icon: 'mail-outline',      activeIcon: 'mail' },
];

interface NavigationTabBarProps {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
  theme: Theme;
  isDarkMode?: boolean;
  onToggleTheme?: () => void;
}

/**
 * NavigationTabBar — Satu Baris Penuh (Single Sticky Top Header Bar)
 * Menyatukan Brand, 6 Menu Navigasi, dan Toggle Mode Malam/Siang.
 */
export default function NavigationTabBar({
  activeTab,
  onTabChange,
  theme,
  isDarkMode = false,
  onToggleTheme,
}: NavigationTabBarProps) {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1024;
  const isMobile = width < 768;

  return (
    <View
      style={[
        styles.navContainer,
        {
          backgroundColor: theme.surface,
          borderBottomColor: theme.border,
          paddingHorizontal: isDesktop ? 24 : 16,
        },
      ]}
      accessibilityRole="navigation"
      accessibilityLabel="Navigasi Menu Utama"
    >
      <View style={styles.innerWrapper}>
        {/* BRAND [Personal CV + Febrian Iradatul Rahman] - Tanpa Logo Koding */}
        {!isMobile && (
          <TouchableOpacity
            style={styles.brandGroup}
            onPress={() => onTabChange('home')}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityLabel="Personal CV Febrian Iradatul Rahman"
          >
            <Text style={[styles.brandTitle, { color: theme.textPrimary }]}>
              Personal CV
            </Text>
            <Text style={[styles.brandSubtitle, { color: theme.textSecondary }]}>
              Febrian Iradatul Rahman
            </Text>
          </TouchableOpacity>
        )}

        {/* 6 MENU NAVIGASI TAB */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[
            styles.scrollContainer,
            !isMobile && styles.scrollContainerDesktop,
          ]}
        >
          {TABS.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <TouchableOpacity
                key={tab.key}
                style={[
                  styles.tabItem,
                  isActive
                    ? {
                        backgroundColor: theme.primary,
                        borderColor: theme.primary,
                      }
                    : {
                        backgroundColor: 'transparent',
                        borderColor: 'transparent',
                      },
                ]}
                onPress={() => onTabChange(tab.key)}
                activeOpacity={0.75}
                accessibilityRole="tab"
                accessibilityState={{ selected: isActive }}
                accessibilityLabel={`Menu ${tab.label}`}
              >
                <Ionicons
                  name={isActive ? tab.activeIcon : tab.icon}
                  size={15}
                  color={isActive ? theme.textInverted : theme.textSecondary}
                />
                <Text
                  style={[
                    styles.tabLabel,
                    {
                      color: isActive ? theme.textInverted : theme.textPrimary,
                      fontFamily: isActive ? FONTS.bold : FONTS.medium,
                      fontWeight: isActive ? '700' : '500',
                    },
                  ]}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* DIVIDER & TOMBOL TOGGLE TEMA [🌙 / ☀️] */}
        {onToggleTheme && (
          <View style={styles.rightGroup}>
            <View style={[styles.divider, { backgroundColor: theme.border }]} />
            <TouchableOpacity
              style={[
                styles.themeBtn,
                {
                  backgroundColor: theme.surfaceMuted,
                  borderColor: theme.border,
                },
              ]}
              onPress={onToggleTheme}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel={isDarkMode ? 'Beralih ke mode terang' : 'Beralih ke mode gelap'}
            >
              <Ionicons
                name={isDarkMode ? 'sunny' : 'moon'}
                size={16}
                color={isDarkMode ? '#F59E0B' : theme.primary}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navContainer: {
    width: '100%',
    borderBottomWidth: 1,
    paddingVertical: 10,
    ...Platform.select({
      web: {
        position: 'sticky' as any,
        top: 0,
        zIndex: 100,
        backdropFilter: 'blur(16px)' as any,
      },
      default: {
        elevation: 4,
      },
    }),
  },
  innerWrapper: {
    width: '100%',
    maxWidth: 1360,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  brandGroup: {
    justifyContent: 'center',
    marginRight: 10,
    gap: 1,
  },
  brandTitle: {
    fontFamily: FONTS.bold,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: -0.3,
    lineHeight: 18,
  },
  brandSubtitle: {
    fontFamily: FONTS.medium,
    fontSize: 11,
    fontWeight: '500',
    letterSpacing: 0.1,
    lineHeight: 14,
  },
  scrollContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  scrollContainerDesktop: {
    flex: 1,
    justifyContent: 'center',
  },
  tabItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 7,
    paddingHorizontal: 13,
    borderRadius: 10,
    borderWidth: 1,
    gap: 6,
    minHeight: 36,
    ...Platform.select({
      web: {
        cursor: 'pointer' as any,
        transition: 'all 0.15s ease' as any,
      },
    }),
  },
  tabLabel: {
    fontSize: 13,
    letterSpacing: -0.1,
  },
  rightGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  divider: {
    width: 1,
    height: 20,
    opacity: 0.6,
  },
  themeBtn: {
    width: 36,
    height: 36,
    borderRadius: 9,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      web: { cursor: 'pointer' as any },
    }),
  },
});
