import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SHADOWS, TYPOGRAPHY, SPACING } from '../theme';

/**
 * MetricBar Component (Materi P4: Flexbox Grid & Card Styling)
 * Menampilkan ringkasan metrik akademik mahasiswa secara proporsional.
 */
export default function MetricBar({ metrics }) {
  return (
    <View style={styles.container}>
      <View style={styles.gridRow}>
        {metrics.map((item, index) => (
          <View key={index} style={styles.metricCard}>
            <View style={styles.iconCircle}>
              <Ionicons name={item.icon} size={16} color={COLORS.primary} />
            </View>
            <Text style={styles.metricValue}>{item.value}</Text>
            <Text style={styles.metricLabel}>{item.label}</Text>
            <Text style={styles.metricUnit}>{item.unit}</Text>
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
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xs,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    ...SHADOWS.sm,
  },
  iconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.xs,
  },
  metricValue: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textPrimary,
    letterSpacing: -0.3,
  },
  metricLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textSecondary,
    marginTop: 2,
    textAlign: 'center',
  },
  metricUnit: {
    fontSize: 9,
    color: COLORS.textMuted,
    marginTop: 1,
    textAlign: 'center',
  },
});

