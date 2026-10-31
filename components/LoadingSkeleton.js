/**
 * Loading Skeleton & Spinner Component (Level 10 Industry)
 * Ditampilkan saat data sedang dimuat secara asinkron dari API LMS
 */

import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { SPACING } from '../theme';

export default function LoadingSkeleton({ message = 'Memuat data dari Academic War LMS...', theme }) {
  const isDark = theme?.isDark || false;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme?.surface || '#FFFFFF',
          borderColor: theme?.border || '#E2E8F0',
        },
      ]}
      accessibilityRole="progressbar"
      accessibilityLabel={message}
    >
      <ActivityIndicator size="large" color="#0284C7" />
      <Text style={[styles.message, { color: theme?.text || '#1E293B' }]}>{message}</Text>
      <Text style={[styles.submessage, { color: theme?.textMuted || '#94A3B8' }]}>
        Simulasi network latency REST API (600ms)
      </Text>

      {/* Shimmer Placeholder bars */}
      <View style={styles.placeholderGroup}>
        <View
          style={[
            styles.shimmerBar,
            { backgroundColor: isDark ? '#334155' : '#E2E8F0', width: '85%' },
          ]}
        />
        <View
          style={[
            styles.shimmerBar,
            { backgroundColor: isDark ? '#334155' : '#E2E8F0', width: '60%' },
          ]}
        />
        <View
          style={[
            styles.shimmerBar,
            { backgroundColor: isDark ? '#334155' : '#E2E8F0', width: '75%' },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: SPACING.xl,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    marginVertical: SPACING.md,
  },
  message: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: 12,
    textAlign: 'center',
  },
  submessage: {
    fontSize: 11,
    marginTop: 4,
    textAlign: 'center',
  },
  placeholderGroup: {
    width: '100%',
    marginTop: 16,
    gap: 8,
    alignItems: 'center',
  },
  shimmerBar: {
    height: 12,
    borderRadius: 6,
  },
});
