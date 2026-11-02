import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Theme, FONTS } from '../theme';
import { TabKey, TABS } from './NavigationTabBar';

interface FloatingRightDockProps {
  activeSection: TabKey;
  onNavigate: (section: TabKey) => void;
  isVisible: boolean;
  theme: Theme;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export default function FloatingRightDock({
  activeSection,
  onNavigate,
  isVisible,
  theme,
  isDarkMode,
  onToggleTheme,
}: FloatingRightDockProps) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  if (!isVisible) return null;

  return (
    <View
      style={[
        styles.dockWrapper,
        isMobile ? styles.dockWrapperMobile : styles.dockWrapperDesktop,
        {
          backgroundColor: isDarkMode
            ? 'rgba(48, 38, 28, 0.90)'
            : 'rgba(250, 245, 232, 0.92)',
          borderColor: theme.primary,
          borderWidth: 1.5,
        },
      ]}
      accessibilityRole="navigation"
      accessibilityLabel="Menu Navigasi Pintasan Mengambang"
    >
      {/* 6 SECTION SHORTCUT BUTTONS */}
      <View style={styles.buttonsColumn}>
        {TABS.map((tab) => {
          const isActive = activeSection === tab.key;
          return (
            <TouchableOpacity
              key={tab.key}
              style={[
                styles.navBtn,
                isMobile ? styles.navBtnMobile : styles.navBtnDesktop,
                isActive && {
                  backgroundColor: theme.primary,
                  borderColor: theme.primary,
                },
                !isActive && {
                  backgroundColor: 'transparent',
                  borderColor: 'transparent',
                },
              ]}
              onPress={() => onNavigate(tab.key)}
              activeOpacity={0.75}
              accessibilityRole="tab"
              accessibilityState={{ selected: isActive }}
              accessibilityLabel={`Pindah ke section ${tab.label}`}
            >
              <Ionicons
                name={isActive ? tab.activeIcon : tab.icon}
                size={isMobile ? 18 : 16}
                color={isActive ? theme.textInverted : theme.textPrimary}
              />
              {!isMobile && (
                <Text
                  style={[
                    styles.navLabel,
                    {
                      color: isActive ? theme.textInverted : theme.textPrimary,
                      fontFamily: isActive ? FONTS.bold : FONTS.medium,
                      fontWeight: isActive ? '700' : '500',
                    },
                  ]}
                  numberOfLines={1}
                >
                  {tab.label}
                </Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* DIVIDER LINE */}
      <View style={[styles.divider, { backgroundColor: theme.border }]} />

      {/* THEME TOGGLE BUTTON AT THE BOTTOM */}
      <TouchableOpacity
        style={[
          styles.themeBtn,
          isMobile ? styles.themeBtnMobile : styles.themeBtnDesktop,
          {
            backgroundColor: theme.surfaceMuted,
            borderColor: theme.borderLight,
          },
        ]}
        onPress={onToggleTheme}
        activeOpacity={0.75}
        accessibilityRole="button"
        accessibilityLabel={isDarkMode ? 'Beralih ke mode terang' : 'Beralih ke mode gelap'}
      >
        <Ionicons
          name={isDarkMode ? 'sunny' : 'moon'}
          size={16}
          color={isDarkMode ? '#F59E0B' : theme.primary}
        />
        {!isMobile && (
          <Text
            style={[
              styles.themeText,
              { color: theme.textSecondary },
            ]}
          >
            {isDarkMode ? 'Light' : 'Dark'}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  dockWrapper: {
    borderRadius: 24,
    paddingVertical: 8,
    paddingHorizontal: 6,
    alignItems: 'center',
    ...Platform.select({
      web: {
        position: 'fixed' as any,
        top: '50%',
        zIndex: 999,
        transform: [{ translateY: -170 }],
        backdropFilter: 'blur(16px)' as any,
        WebkitBackdropFilter: 'blur(16px)' as any,
        boxShadow: '0 12px 36px rgba(62, 50, 39, 0.22)' as any,
        transition: 'opacity 0.25s cubic-bezier(0.22, 1, 0.36, 1), transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)' as any,
      },
      default: {
        position: 'absolute',
        top: '40%',
        zIndex: 999,
        elevation: 8,
      },
    }),
  },
  dockWrapperDesktop: {
    right: 24,
    minWidth: 120,
    paddingHorizontal: 8,
  },
  dockWrapperMobile: {
    right: 12,
    minWidth: 44,
    paddingHorizontal: 4,
  },
  buttonsColumn: {
    gap: 6,
    width: '100%',
    alignItems: 'center',
  },
  navBtn: {
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    ...Platform.select({
      web: {
        cursor: 'pointer' as any,
        transition: 'all 0.18s ease' as any,
      },
    }),
  },
  navBtnDesktop: {
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 7,
    paddingHorizontal: 12,
    gap: 8,
  },
  navBtnMobile: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  navLabel: {
    fontSize: 12,
    letterSpacing: -0.2,
  },
  divider: {
    width: '80%',
    height: 1,
    marginVertical: 6,
  },
  themeBtn: {
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
  themeBtnDesktop: {
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 6,
    paddingHorizontal: 10,
    gap: 6,
  },
  themeBtnMobile: {
    width: 34,
    height: 34,
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  themeText: {
    fontSize: 11,
    fontWeight: '600',
  },
});
