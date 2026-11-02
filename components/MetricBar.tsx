import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONTS } from '../theme';
import { AcademicMetric, ThemeColors } from '../types';

interface MetricBarProps {
  metrics?: AcademicMetric[];
  theme?: ThemeColors | any;
}

/**
 * MetricBar Component (Minimalist Tech: Flat Cards, Scale 8px, Inter Typography)
 */
export default function MetricBar({ metrics, theme }: MetricBarProps) {
  const currentTheme = theme || COLORS;

  return (
    <View style={styles.container}>
      <View style={styles.gridRow}>
        {(metrics || []).map((item, index) => (
          <View
            key={index}
            style={[
              styles.metricCard,
              {
                backgroundColor: currentTheme.surface,
                borderColor: currentTheme.border,
              },
            ]}
          >
            <View
              style={[
                styles.iconCircle,
                {
                  backgroundColor: currentTheme.surfaceMuted,
                  borderColor: currentTheme.borderLight,
                },
              ]}
            >
              <Ionicons name={item.icon as any} size={15} color={currentTheme.textPrimary} />
            </View>
            <Text style={[styles.metricValue, { color: currentTheme.textPrimary }]}>
              {item.value}
            </Text>
            <Text style={[styles.metricLabel, { color: currentTheme.textSecondary }]}>
              {item.label}
            </Text>
            <Text style={[styles.metricUnit, { color: currentTheme.textMuted }]}>
              {item.unit}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.xl, // 32px (mb-8)
    width: '100%',
  },
  gridRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md, // 16px (scale 8px)
  },
  metricCard: {
    flex: 1,
    minWidth: 110,
    borderRadius: 12,
    paddingVertical: SPACING.md, // 16px
    paddingHorizontal: SPACING.sm, // 8px
    alignItems: 'center',
    borderWidth: 1,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.xs,
  },
  metricValue: {
    fontFamily: FONTS.bold,
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 2,
    letterSpacing: -0.5,
  },
  metricLabel: {
    fontFamily: FONTS.medium,
    fontSize: 11,
    fontWeight: '500',
    textAlign: 'center',
  },
  metricUnit: {
    fontFamily: FONTS.regular,
    fontSize: 10,
    marginTop: 2,
    textAlign: 'center',
  },
});
