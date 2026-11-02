import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SPACING } from '../theme';
import { ThemeColors } from '../types';

interface EmptyStateProps {
  icon?: any;
  title?: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
  theme?: ThemeColors | any;
}

export default function EmptyState({
  icon = 'clipboard-text-outline',
  title = 'Tidak Ada Data',
  message = 'Belum ada data yang tersedia untuk ditampilkan.',
  actionLabel,
  onAction,
  theme,
}: EmptyStateProps) {
  const isDark = theme?.isDark || false;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme?.surface || '#FAF5E8',
          borderColor: theme?.border || '#D5C7AA',
        },
      ]}
      accessibilityRole="region"
      accessibilityLabel={title}
    >
      <View style={[styles.iconContainer, { backgroundColor: theme?.surfaceMuted || '#EAE0C8' }]}>
        <MaterialCommunityIcons name={icon} size={36} color={theme?.primary || '#B5893D'} />
      </View>
      <Text style={[styles.title, { color: theme?.textPrimary || '#3E3227' }]}>{title}</Text>
      <Text style={[styles.message, { color: theme?.textSecondary || '#634B35' }]}>{message}</Text>

      {actionLabel && onAction ? (
        <TouchableOpacity
          style={[styles.actionBtn, { backgroundColor: theme?.primary || '#B5893D' }]}
          onPress={onAction}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel={actionLabel}
        >
          <Text style={[styles.actionBtnText, { color: theme?.textInverted || '#FFFDF7' }]}>{actionLabel}</Text>
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

