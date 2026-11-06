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
  { key: 'home',      label: 'Home',      icon: 'home-outline',       activeIcon: 'home' },
  { key: 'about',     label: 'About',     icon: 'person-outline',     activeIcon: 'person' },
  { key: 'skills',    label: 'Skills',    icon: 'code-slash-outline',  activeIcon: 'code-slash' },
  { key: 'portfolio', label: 'Portfolio', icon: 'briefcase-outline',  activeIcon: 'briefcase' },
  { key: 'score',     label: 'My Score',  icon: 'school-outline',     activeIcon: 'school' },
  { key: 'contact',   label: 'Contact',   icon: 'mail-outline',       activeIcon: 'mail' },
];

interface NavigationTabBarProps {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
  theme: Theme;
  isDarkMode?: boolean;
  onToggleTheme?: () => void;
  scrollProgress?: number;
}

/**
 * NavigationTabBar — Glassmorphism Floating Pill Header Bar
 * Desain bersih, elegan, dan minimalis Burgundy Classic.
 * Navigasi satu baris pill yang mulus dan instan tanpa jeda.
 */
export default function NavigationTabBar({
  activeTab,
  onTabChange,
  theme,
  isDarkMode = true,
  onToggleTheme,
  scrollProgress = 0,
}: NavigationTabBarProps) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const isDesktop = width >= 1024;

  const activeTextColor = theme.isDark ? '#25191D' : '#FFFFFF';

  return (
    <View
      style={[
        styles.floatingOuterContainer,
        isMobile && styles.floatingOuterContainerMobile,
      ]}
      accessibilityRole="navigation"
      accessibilityLabel="Navigasi Menu Utama"
      {...(Platform.OS === 'web' ? ({ className: 'navbar-entrance' } as any) : {})}
    >
      {/* Scroll Progress Bar di Tepi Paling Atas */}
      <View style={styles.progressBarTrack} pointerEvents="none">
        <View
          style={[
            styles.progressBarFill,
            {
              width: `${Math.min(Math.max(scrollProgress * 100, 0), 100)}%`,
              backgroundColor: theme.accent,
            },
          ]}
        />
      </View>

      {isMobile ? (
        /* ================= TAMPILAN MOBILE (HP) ================= */
        <View
          style={[
            styles.pillCapsuleMobile,
            {
              backgroundColor: theme.isDark
                ? 'rgba(52, 37, 42, 0.95)'
                : 'rgba(251, 246, 239, 0.96)',
              borderColor: theme.border,
            },
          ]}
        >
          {/* BARIS 1: BRAND IDENTITY & THEME TOGGLE */}
          <View style={styles.mobileTopRow}>
            <TouchableOpacity
              style={styles.mobileBrandGroup}
              onPress={() => onTabChange('home')}
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityLabel="pepeb'sdeveloper Personal CV Febrian"
            >
              <View style={styles.brandTitleRow}>
                <View style={[styles.brandDot, { backgroundColor: theme.primary }]} />
                <Text style={[styles.brandTitleMobile, { color: theme.heading }]} numberOfLines={1}>
                  pepeb's<Text style={{ color: theme.primary }}>developer</Text>
                </Text>
              </View>
              <Text style={[styles.brandSubtitleMobile, { color: theme.textSecondary }]} numberOfLines={1}>
                Personal CV • Febrian
              </Text>
            </TouchableOpacity>

            {onToggleTheme && (
              <TouchableOpacity
                style={[
                  styles.themeBtnMobile,
                  {
                    backgroundColor: theme.surface2,
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
                  size={14}
                  color={isDarkMode ? theme.heading : theme.primary}
                />
              </TouchableOpacity>
            )}
          </View>

          {/* BARIS 2: 6 TABS HORIZONTAL SCROLL PILLS */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.mobileTabsScrollContent}
          >
            {TABS.map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <TouchableOpacity
                  key={tab.key}
                  style={[
                    styles.mobileTabItem,
                    isActive
                      ? {
                          backgroundColor: theme.primary,
                          borderColor: theme.primaryHover,
                        }
                      : {
                          backgroundColor: theme.isDark
                            ? 'rgba(37, 25, 29, 0.45)'
                            : 'rgba(255, 255, 255, 0.65)',
                          borderColor: theme.border,
                        },
                  ]}
                  onPress={() => onTabChange(tab.key)}
                  {...(Platform.OS === 'web' ? ({
                    className: 'nav-tab-item',
                  } as any) : {})}
                  activeOpacity={0.8}
                  accessibilityRole="tab"
                  accessibilityState={{ selected: isActive }}
                  accessibilityLabel={`Menu ${tab.label}`}
                >
                  <Ionicons
                    name={isActive ? tab.activeIcon : tab.icon}
                    size={12}
                    color={isActive ? activeTextColor : theme.primary}
                  />
                  <Text
                    style={[
                      styles.mobileTabLabel,
                      {
                        color: isActive ? activeTextColor : theme.heading,
                        fontFamily: isActive ? FONTS.bold : FONTS.medium,
                        fontWeight: isActive ? '700' : '600',
                      },
                    ]}
                    numberOfLines={1}
                  >
                    {tab.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      ) : (
        /* ================= TAMPILAN DESKTOP & TABLET ================= */
        <View
          style={[
            styles.pillCapsule,
            {
              backgroundColor: theme.isDark
                ? 'rgba(52, 37, 42, 0.94)'
                : 'rgba(251, 246, 239, 0.95)',
              borderColor: theme.border,
              paddingHorizontal: isDesktop ? 18 : 12,
            },
          ]}
        >
          {/* BRAND [pepeb'sdeveloper + Personal CV Febrian] */}
          <TouchableOpacity
            style={styles.brandGroup}
            onPress={() => onTabChange('home')}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityLabel="pepeb'sdeveloper Personal CV Febrian"
          >
            <Text style={[styles.brandTitle, { color: theme.heading }]} numberOfLines={1}>
              pepeb's<Text style={{ color: theme.primary }}>developer</Text>
            </Text>
            <Text style={[styles.brandSubtitle, { color: theme.textSecondary }]} numberOfLines={1}>
              Personal CV • Febrian
            </Text>
          </TouchableOpacity>

          {/* 6 MENU TABS SATU BARIS PILL */}
          <View style={styles.desktopTabsRow}>
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
                          borderColor: theme.primaryHover,
                        }
                      : {
                          backgroundColor: 'transparent',
                          borderColor: 'transparent',
                        },
                  ]}
                  onPress={() => onTabChange(tab.key)}
                  {...(Platform.OS === 'web' ? ({
                    className: 'nav-tab-item',
                  } as any) : {})}
                  activeOpacity={0.8}
                  accessibilityRole="tab"
                  accessibilityState={{ selected: isActive }}
                  accessibilityLabel={`Menu ${tab.label}`}
                >
                  <Ionicons
                    name={isActive ? tab.activeIcon : tab.icon}
                    size={14}
                    color={isActive ? activeTextColor : theme.textSecondary}
                  />
                  <Text
                    style={[
                      styles.tabLabel,
                      {
                        color: isActive ? activeTextColor : theme.textSecondary,
                        fontFamily: isActive ? FONTS.bold : FONTS.medium,
                        fontWeight: isActive ? '700' : '600',
                      },
                    ]}
                    numberOfLines={1}
                  >
                    {tab.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* RIGHT ACTION: TEMA GELAP/TERANG */}
          {onToggleTheme && (
            <View style={styles.rightGroup}>
              <View style={[styles.divider, { backgroundColor: theme.border }]} />
              <TouchableOpacity
                style={[
                  styles.themeBtn,
                  {
                    backgroundColor: theme.surface2,
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
                  size={15}
                  color={isDarkMode ? theme.heading : theme.primary}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  floatingOuterContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    position: 'relative',
    ...Platform.select({
      web: {
        position: 'sticky' as any,
        top: 0,
        zIndex: 1000,
      },
      default: {
        elevation: 6,
      },
    }),
  },
  floatingOuterContainerMobile: {
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  progressBarTrack: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2.5,
    zIndex: 1001,
  },
  progressBarFill: {
    height: '100%',
  },

  /* ===== MOBILE STYLES ===== */
  pillCapsuleMobile: {
    width: '100%',
    borderRadius: 16,
    borderWidth: 1.2,
    paddingHorizontal: 10,
    paddingVertical: 8,
    gap: 8,
    ...Platform.select({
      web: {
        backdropFilter: 'blur(24px)',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)',
      } as any,
      default: {
        elevation: 6,
      },
    }),
  },
  mobileTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  mobileBrandGroup: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 2,
    gap: 1,
  },
  brandTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  brandDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  brandTitleMobile: {
    fontFamily: FONTS.display,
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  brandSubtitleMobile: {
    fontFamily: FONTS.mono,
    fontSize: 9,
    fontWeight: '600',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  themeBtnMobile: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      web: {
        cursor: 'pointer' as any,
      },
    }),
  },
  mobileTabsScrollContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 2,
  },
  mobileTabItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 999,
    borderWidth: 1,
    gap: 5,
    ...Platform.select({
      web: {
        cursor: 'pointer' as any,
        transition: 'all 0.15s ease' as any,
      },
    }),
  },
  mobileTabLabel: {
    fontSize: 11.5,
    letterSpacing: -0.2,
  },

  /* ===== DESKTOP STYLES ===== */
  pillCapsule: {
    width: '100%',
    maxWidth: 1080,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 999,
    borderWidth: 1.2,
    paddingVertical: 7,
    gap: 10,
    ...Platform.select({
      web: {
        backdropFilter: 'blur(24px)',
        boxShadow:
          '0 12px 36px rgba(0, 0, 0, 0.45), 0 0 20px rgba(132, 63, 75, 0.15)',
      } as any,
      default: {
        elevation: 6,
      },
    }),
  },
  brandGroup: {
    justifyContent: 'center',
    paddingLeft: 6,
    marginRight: 6,
    gap: 1,
  },
  brandTitle: {
    fontFamily: FONTS.display,
    fontSize: 13.5,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  brandSubtitle: {
    fontFamily: FONTS.mono,
    fontSize: 9,
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  desktopTabsRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  tabItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 999,
    borderWidth: 1,
    gap: 6,
    ...Platform.select({
      web: {
        cursor: 'pointer' as any,
        transition: 'all 0.15s ease' as any,
      },
    }),
  },
  tabLabel: {
    fontSize: 13,
    letterSpacing: -0.2,
  },
  rightGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingRight: 4,
  },
  divider: {
    width: 1,
    height: 18,
    opacity: 0.5,
  },
  themeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      web: {
        cursor: 'pointer' as any,
      },
    }),
  },
});
