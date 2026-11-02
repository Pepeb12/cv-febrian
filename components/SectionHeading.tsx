import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING } from '../theme';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  icon?: any;
  badgeText?: string;
  theme?: any;
}

/**
 * SectionHeading Component (Minimalist Tech Design: H2 Contrast Hierarchy with Inter)
 */
export default function SectionHeading({
  title,
  subtitle,
  icon,
  badgeText,
  theme,
}: SectionHeadingProps) {
  const currentTheme = theme || COLORS;

  return (
    <View style={styles.headingContainer}>
      <View style={styles.topRow}>
        <View style={styles.titleWithIcon}>
          {icon && (
            <View
              style={[
                styles.iconWrapper,
                {
                  backgroundColor: currentTheme.surfaceMuted,
                  borderColor: currentTheme.borderLight,
                },
              ]}
            >
              <Ionicons name={icon} size={16} color={currentTheme.textPrimary} />
            </View>
          )}
          {/* H2 HEADING: High Contrast 22px / 800 ExtraBold */}
          <Text style={[styles.mainTitle, { color: currentTheme.textPrimary }]}>
            {title}
          </Text>
        </View>
        {badgeText && (
          <View
            style={[
              styles.badge,
              {
                backgroundColor: currentTheme.surfaceMuted,
                borderColor: currentTheme.borderLight,
              },
            ]}
          >
            <Text style={[styles.badgeText, { color: currentTheme.textSecondary }]}>
              {badgeText}
            </Text>
          </View>
        )}
      </View>
      {subtitle ? (
        <Text style={[styles.subTitle, { color: currentTheme.textMuted }]}>
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  headingContainer: {
    marginBottom: SPACING.lg, // 24px (scale 8px)
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.xs,
  },
  titleWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    flex: 1,
  },
  iconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainTitle: {
    fontFamily: FONTS.extraBold,
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.5,
    lineHeight: 28,
  },
  badge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
  },
  badgeText: {
    fontFamily: FONTS.semiBold,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  subTitle: {
    fontFamily: FONTS.regular,
    fontSize: 13.5,
    lineHeight: 20,
    marginTop: 2,
  },
});
