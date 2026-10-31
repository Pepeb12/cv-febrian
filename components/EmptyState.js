/**
 * Empty State Component (Level 10 Industry)
 * Ditampilkan saat data kosong / belum ada penilaian / hasil pencarian nihil
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SPACING } from '../theme';

export default function EmptyState({
  icon = 'clipboard-text-outline',
  title = 'Tidak Ada Data',
  message = 'Belum ada data yang tersedia untuk ditampilkan.',
  actionLabel,
  onAction,
  theme,
}) {
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
      accessibilityRole="region"
      accessibilityLabel={title}
    >
      <View style={[styles.iconContainer, { backgroundColor: isDark ? '#1E293B' : '#F1F5F9' }]}>
        <MaterialCommunityIcons name={icon} size={36} color={theme?.primary || '#0284C7'} />
      </View>
      <Text style={[styles.title, { color: theme?.text || '#1E293B' }]}>{title}</Text>
      <Text style={[styles.message, { color: theme?.textSecondary || '#64748B' }]}>{message}</Text>

      {actionLabel && onAction ? (
        <TouchableOpacity
          style={[styles.actionBtn, { backgroundColor: theme?.primary || '#0284C7' }]}
          onPress={onAction}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel={actionLabel}
        >
          <Text style={styles.actionBtnText}>{actionLabel}</Text>
        </TouchableOpacity>
      ) : null}
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
  iconContainer: {
    width: 68,
    height: 68,
    borderRadius: 34,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 6,
    textAlign: 'center',
  },
  message: {
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
    marginBottom: 14,
    paddingHorizontal: 12,
  },
  actionBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  actionBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 12,
  },
});

