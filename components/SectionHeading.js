import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING } from '../theme';

/**
 * SectionHeading Component (Materi P4: Reusable Component & Typography Hierarchy)
 * Menampilkan judul section hierarkis dengan ikon dan subjudul deskriptif.
 */
export default function SectionHeading({ title, subtitle, icon, badgeText }) {
  return (
    <View style={styles.headingContainer}>
      <View style={styles.topRow}>
        <View style={styles.titleWithIcon}>
          {icon && (
            <View style={styles.iconWrapper}>
              <Ionicons name={icon} size={18} color={COLORS.primary} />
            </View>
          )}
          <Text style={styles.mainTitle}>{title}</Text>
        </View>
        {badgeText && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badgeText}</Text>
          </View>
        )}
      </View>
      {subtitle ? <Text style={styles.subTitle}>{subtitle}</Text> : null}
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
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textPrimary,
    letterSpacing: 0.3,
  },
  subTitle: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 2,
    paddingLeft: 36,
  },
  badge: {
    backgroundColor: COLORS.surfaceMuted,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
  },
});
