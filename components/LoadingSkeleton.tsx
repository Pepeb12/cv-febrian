import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { SPACING } from '../theme';
import { ThemeColors } from '../types';

interface LoadingSkeletonProps {
  message?: string;
  theme?: ThemeColors | any;
}

export default function LoadingSkeleton({
  message = 'Memuat data dari Academic War LMS...',
  theme,
}: LoadingSkeletonProps) {
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
      <ActivityIndicator size="large" color={theme?.primary || '#62684D'} />
      <Text style={[styles.message, { color: theme?.textPrimary || '#363C2E' }]}>{message}</Text>
      <Text style={[styles.submessage, { color: theme?.textMuted || '#707762' }]}>
        Simulasi network latency REST API (600ms)
      </Text>

      {/* Shimmer Placeholder bars */}
      <View style={styles.placeholderGroup}>
        <View
          style={[
            styles.shimmerBar,
            { backgroundColor: theme?.surfaceMuted || '#E5DFCE', width: '85%' },
          ]}
        />
        <View
          style={[
            styles.shimmerBar,
            { backgroundColor: theme?.surfaceMuted || '#E5DFCE', width: '60%' },
          ]}
        />
        <View
          style={[
            styles.shimmerBar,
            { backgroundColor: theme?.surfaceMuted || '#E5DFCE', width: '75%' },
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

