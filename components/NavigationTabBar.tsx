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
import { Theme, FONTS } from '../theme';

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
 * Floating Pill Navbar di Tengah Atas (Fixed Center Top, border-radius: 999px, Glassmorphism)
 * Menampilkan identitas, menu dengan garis bawah aktif #6366F1, dan toggle tema lingkaran.
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
    <View style={styles.floatingContainer}>
      <View
        style={[
          styles.pillWrapper,
          {
            backgroundColor: theme.surface,
            borderColor: theme.border,
            paddingHorizontal: isDesktop ? 22 : 14,
          },
        ]}
        accessibilityRole="navigation"
        accessibilityLabel="Navigasi Menu Utama"
      >
        {/* BRAND [Personal CV + Febrian Iradatul Rahman] */}
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
          <Text
            style={[
              styles.brandSubtitle,
              { color: theme.textSecondary, fontSize: isMobile ? 10 : 11 },
            ]}
          >
            Febrian Iradatul Rahman
          </Text>
        </TouchableOpacity>

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
                  isActive && {
                    backgroundColor: theme.isDark ? 'rgba(99, 102, 241, 0.14)' : 'rgba(79, 70, 229, 0.08)',
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
                  color={isActive ? theme.primary : theme.textSecondary}
                />
                <Text
                  style={[
                    styles.tabLabel,
                    {
                      color: isActive ? theme.primary : theme.textSecondary,
                      fontFamily: isActive ? FONTS.bold : FONTS.medium,
                      fontWeight: isActive ? '700' : '500',
                    },
                  ]}
                >
                  {tab.label}
                </Text>

                {/* Garis bawah aktif Indigo bergeser mengikuti posisi scroll */}
                {isActive && (
                  <View
                    style={[
                      styles.activeIndicator,
                      { backgroundColor: theme.primary },
                    ]}
                  />
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* DIVIDER & TOMBOL TOGGLE TEMA [🌙 / ☀️] BERBENTUK LINGKARAN */}
        {onToggleTheme && (
          <View style={styles.rightGroup}>
            <View style={[styles.divider, { backgroundColor: theme.border }]} />
            <TouchableOpacity
              style={[
                styles.themeBtn,
                {
                  backgroundColor: theme.isDark ? 'rgba(30, 37, 70, 0.8)' : 'rgba(238, 242, 255, 0.9)',
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
  floatingContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
  pillWrapper: {
    width: '100%',
    maxWidth: 1140,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 999,
    borderWidth: 1,
    paddingVertical: 8,
    gap: 8,
    ...Platform.select({
      web: {
        backdropFilter: 'blur(16px)',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12), 0 0 1px rgba(99, 102, 241, 0.2)',
      } as any,
      default: {
        elevation: 6,
      },
    }),
  },
  brandGroup: {
    justifyContent: 'center',
    paddingLeft: 4,
    marginRight: 6,
    gap: 1,
  },
  brandTitle: {
    fontFamily: FONTS.bold,
    fontSize: 13.5,
    fontWeight: '700',
    letterSpacing: -0.3,
    lineHeight: 17,
  },
  brandSubtitle: {
    fontFamily: FONTS.medium,
    fontSize: 10.5,
    fontWeight: '500',
    letterSpacing: 0.1,
    lineHeight: 13,
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
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 999,
    gap: 6,
    minHeight: 34,
    ...Platform.select({
      web: {
        cursor: 'pointer' as any,
        transition: 'all 0.18s ease' as any,
      },
    }),
  },
  tabLabel: {
    fontSize: 12.5,
    letterSpacing: -0.1,
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 2,
    left: 14,
    right: 14,
    height: 2.2,
    borderRadius: 2,
  },
  rightGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingRight: 2,
  },
  divider: {
    width: 1,
    height: 18,
    opacity: 0.5,
  },
  themeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      web: {
        cursor: 'pointer' as any,
        transition: 'transform 0.15s ease' as any,
      },
    }),
  },
});
