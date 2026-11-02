import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FONTS, SPACING, Theme } from '../theme';

interface StageSectionDividerProps {
  stageNumber: number;
  levelsText: string;
  stageTitle: string;
  stageDesc: string;
  icon: any;
  theme: Theme;
}

/**
 * StageSectionDivider Component (Minimalist Tech: Flat, Scale 8px, Inter)
 */
export default function StageSectionDivider({
  stageNumber,
  levelsText,
  stageTitle,
  stageDesc,
  icon,
  theme,
}: StageSectionDividerProps) {
  const isDark = theme.isDark;

  return (
    <View
      style={[
        styles.dividerCard,
        {
          backgroundColor: theme.surfaceMuted,
          borderColor: theme.borderLight,
        },
      ]}
    >
      <View style={styles.contentRow}>
        <View
          style={[
            styles.stageBadge,
            {
              backgroundColor: theme.primary,
            },
          ]}
        >
          <Text style={[styles.stageBadgeText, { color: theme.textInverted }]}>TAHAP {stageNumber}</Text>
        </View>

        <View style={styles.titleCol}>
          <View style={styles.topTitleRow}>
            <Ionicons name={icon} size={15} color={theme.textPrimary} />
            <Text style={[styles.levelsText, { color: theme.textPrimary }]}>
              {levelsText}
            </Text>
            <Text style={[styles.dotSep, { color: theme.textMuted }]}>•</Text>
            <Text style={[styles.mainTitle, { color: theme.textPrimary }]}>
              {stageTitle}
            </Text>
          </View>
          <Text style={[styles.descText, { color: theme.textSecondary }]}>
            {stageDesc}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dividerCard: {
    borderRadius: 10,
    borderWidth: 1,
    paddingVertical: SPACING.md, // 16px
    paddingHorizontal: SPACING.lg, // 24px
    marginVertical: SPACING.gap, // 20px standardized gap
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md, // 16px
  },
  stageBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stageBadgeText: {
    fontFamily: FONTS.bold,
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.8,
  },
  titleCol: {
    flex: 1,
  },
  topTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: SPACING.xs,
  },
  levelsText: {
    fontFamily: FONTS.bold,
    fontSize: 12,
    fontWeight: '700',
  },
  dotSep: {
    fontSize: 11,
  },
  mainTitle: {
    fontFamily: FONTS.semiBold,
    fontSize: 13,
    fontWeight: '600',
  },
  descText: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 2,
  },
});
