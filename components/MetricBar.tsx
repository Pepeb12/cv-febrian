import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SHADOWS, SPACING, FONTS } from '../theme';
import { AcademicMetric, ThemeColors } from '../types';

interface MetricBarProps {
  metrics?: AcademicMetric[];
  theme?: ThemeColors | any;
}

/**
 * MetricBar Component (Level 3: Layout & Styling Flexbox Statistics)
 * Styled with Emerald – Cream – White – Mint luxury palette & Lato fonts.
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
                  borderColor: currentTheme.primaryBorder,
                },
              ]}
            >
              <Ionicons name={item.icon as any} size={15} color={currentTheme.primary} />
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
    marginBottom: SPACING.md,
    width: '100%',
  },
  gridRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  metricCard: {
    flex: 1,
    minWidth: 100,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 8,
    alignItems: 'center',
    borderWidth: 1,
    ...SHADOWS.sm,
  },
  iconCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  metricValue: {
    fontFamily: FONTS.heading,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 1,
    letterSpacing: -0.3,
  },
  metricLabel: {
    fontFamily: FONTS.heading,
    fontSize: 10.5,
    fontWeight: '700',
    textAlign: 'center',
  },
  metricUnit: {
    fontFamily: FONTS.body,
    fontSize: 9.5,
    marginTop: 1,
    textAlign: 'center',
  },
});
