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
 * SectionHeading Component (Clean Editorial Typography with Lato Bold & Lato Regular)
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
              <Ionicons name={icon} size={15} color={currentTheme.primary} />
            </View>
          )}
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
                borderColor: currentTheme.border,
              },
            ]}
          >
            <Text style={[styles.badgeText, { color: currentTheme.primary }]}>
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
    marginBottom: SPACING.md,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  titleWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  iconWrapper: {
    width: 28,
    height: 28,
    borderRadius: 7,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainTitle: {
    fontFamily: FONTS.heading,
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
  },
  badgeText: {
    fontFamily: FONTS.heading,
    fontSize: 10.5,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  subTitle: {
    fontFamily: FONTS.body,
    fontSize: 11.5,
    lineHeight: 16,
    marginTop: 2,
  },
});
