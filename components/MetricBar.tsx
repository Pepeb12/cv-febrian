import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SHADOWS, SPACING } from '../theme';
import { AcademicMetric, ThemeColors } from '../types';

interface MetricBarProps {
  metrics?: AcademicMetric[];
  theme?: ThemeColors | any;
}

/**
 * MetricBar Component (Clean Developer Statistics in TSX)
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
                { backgroundColor: currentTheme.isDark ? '#1E293B' : '#F1F5F9' },
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
    gap: 10,
  },
  metricCard: {
    flex: 1,
    minWidth: 120,
    borderRadius: 14,
    padding: SPACING.md,
    alignItems: 'center',
    borderWidth: 1,
    ...SHADOWS.sm,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 2,
    letterSpacing: -0.5,
  },
  metricLabel: {
    fontSize: 11,
    fontWeight: '700',
    textAlign: 'center',
  },
  metricUnit: {
    fontSize: 10,
    marginTop: 2,
    textAlign: 'center',
  },
});

