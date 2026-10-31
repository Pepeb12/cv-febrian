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
 * StageSectionDivider Component
 * Marks each of the 4 sequential evaluation stages as the user scrolls.
 * Styled with Emerald – Cream – White – Mint luxury palette & Lato fonts.
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
          backgroundColor: isDark ? '#063025' : '#ECFDF5',
          borderColor: isDark ? '#065F46' : '#A7F3D0',
        },
      ]}
    >
      <View style={styles.contentRow}>
        <View
          style={[
            styles.stageBadge,
            {
              backgroundColor: isDark ? '#0A4A3A' : '#065F46',
            },
          ]}
        >
          <Text style={styles.stageBadgeText}>TAHAP {stageNumber}</Text>
        </View>

        <View style={styles.titleCol}>
          <View style={styles.topTitleRow}>
            <Ionicons name={icon} size={15} color={isDark ? '#A7F3D0' : '#065F46'} />
            <Text style={[styles.levelsText, { color: isDark ? '#A7F3D0' : '#065F46' }]}>
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
    borderRadius: 12,
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginVertical: SPACING.md,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  stageBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stageBadgeText: {
    fontFamily: FONTS.heading,
    fontSize: 9.5,
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
    gap: 5,
  },
  levelsText: {
    fontFamily: FONTS.heading,
    fontSize: 11,
    fontWeight: '700',
  },
  dotSep: {
    fontSize: 10,
  },
  mainTitle: {
    fontFamily: FONTS.heading,
    fontSize: 12,
    fontWeight: '700',
  },
  descText: {
    fontFamily: FONTS.body,
    fontSize: 10.5,
    marginTop: 1,
  },
});

