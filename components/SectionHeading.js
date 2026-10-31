import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING } from '../theme';

/**
 * SectionHeading Component (Reusable Typography Component)
 * Mendukung warna dinamis melalui prop `theme`.
 */
export default function SectionHeading({ title, subtitle, icon, badgeText, theme }) {
  const currentTheme = theme || COLORS;

  return (
    <View style={styles.headingContainer}>
      <View style={styles.topRow}>
        <View style={styles.titleWithIcon}>
          {icon && (
            <View
              style={[
                styles.iconWrapper,
                { backgroundColor: currentTheme.primaryLight },
              ]}
            >
              <Ionicons name={icon} size={18} color={currentTheme.primary} />
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
              { backgroundColor: currentTheme.surfaceMuted },
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
    marginBottom: SPACING.md,
    marginTop: 2,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  iconWrapper: {
    width: 28,
    height: 28,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainTitle: {
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  subTitle: {
    fontSize: 12,
    marginTop: 2,
    paddingLeft: 36,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
});
