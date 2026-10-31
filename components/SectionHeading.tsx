import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING } from '../theme';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  icon?: any;
  badgeText?: string;
  theme?: any;
}

/**
 * SectionHeading Component (Clean Editorial & Authentic Typography)
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
                { backgroundColor: currentTheme.isDark ? '#1E293B' : '#F1F5F9' },
              ]}
            >
              <Ionicons name={icon} size={16} color={currentTheme.primary} />
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
                backgroundColor: currentTheme.isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
                borderColor: currentTheme.border,
              },
            ]}
          >
            <Text style={[styles.badgeText, { color: currentTheme.textMuted }]}>
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
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainTitle: {
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  subTitle: {
    fontSize: 12,
    lineHeight: 18,
    marginTop: 2,
  },
});

