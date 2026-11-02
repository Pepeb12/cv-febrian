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
  { key: 'home', label: 'Home', icon: 'home-outline', activeIcon: 'home' },
  { key: 'about', label: 'About', icon: 'person-outline', activeIcon: 'person' },
  { key: 'skills', label: 'Skills', icon: 'code-slash-outline', activeIcon: 'code-slash' },
  { key: 'portfolio', label: 'Portfolio', icon: 'briefcase-outline', activeIcon: 'briefcase' },
  { key: 'score', label: 'My Score', icon: 'school-outline', activeIcon: 'school' },
  { key: 'contact', label: 'Contact', icon: 'mail-outline', activeIcon: 'mail' },
];

interface NavigationTabBarProps {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
  theme: Theme;
}

/**
 * NavigationTabBar Component
 * Clean multi-screen tab navigation for Personal CV & Academic Score App.
 * Styled with Retro Olive & Beige design tokens.
 */
export default function NavigationTabBar({
  activeTab,
  onTabChange,
  theme,
}: NavigationTabBarProps) {
  const { width } = useWindowDimensions();
  const isMobile = width < 720;

  return (
    <View
      style={[
        styles.navContainer,
        {
          backgroundColor: theme.surface,
          borderColor: theme.border,
        },
      ]}
      accessibilityRole="tablist"
      accessibilityLabel="Navigasi Menu Utama"
    >
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
                  backgroundColor: theme.primary,
                  borderColor: theme.primaryBorder,
                },
                !isActive && {
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
                size={16}
                color={isActive ? theme.textInverted : theme.textSecondary}
              />
              <Text
                style={[
                  styles.tabLabel,
                  {
                    color: isActive ? theme.textInverted : theme.textPrimary,
                    fontFamily: isActive ? FONTS.bold : FONTS.medium,
                  },
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  navContainer: {
    borderRadius: SPACING.cardRadius, // 16px
    borderWidth: 1,
    padding: 6,
    marginBottom: SPACING.gap, // 20px standardized gap
    width: '100%',
    ...Platform.select({
      web: {
        position: 'sticky' as any,
        top: 10,
        zIndex: 50,
        backdropFilter: 'blur(10px)' as any,
      },
      default: {
        elevation: 3,
      },
    }),
  },
  scrollContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 2,
  },
  scrollContainerDesktop: {
    flex: 1,
    justifyContent: 'space-between',
  },
  tabItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 9,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderWidth: 1,
    gap: 7,
    minHeight: 40,
    ...Platform.select({
      web: {
        cursor: 'pointer' as any,
        transition: 'all 0.2s ease-in-out' as any,
      },
    }),
  },
  tabLabel: {
    fontSize: 13,
    letterSpacing: 0.1,
  },
});
