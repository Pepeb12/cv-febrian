import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SHADOWS, SPACING } from '../theme';

/**
 * MetricBar Component (Level 7: Theme Adaptable Stat Cards)
 */
export default function MetricBar({ metrics, theme }) {
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
                borderColor: currentTheme.borderLight,
              },
            ]}
          >
            <View
              style={[
                styles.iconCircle,
                { backgroundColor: currentTheme.primaryLight },
              ]}
            >
              <Ionicons name={item.icon} size={16} color={currentTheme.primary} />
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
    marginBottom: SPACING.lg,
  },
  gridRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
    justifyContent: 'space-between',
  },
  metricCard: {
    flex: 1,
    borderRadius: 14,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xs,
    alignItems: 'center',
    borderWidth: 1,
    ...SHADOWS.sm,
  },
  iconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.xs,
  },
  metricValue: {
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  metricLabel: {
    fontSize: 11,
    fontWeight: '700',
    marginTop: 2,
    textAlign: 'center',
  },
  metricUnit: {
    fontSize: 9,
    marginTop: 1,
    textAlign: 'center',
  },
});
