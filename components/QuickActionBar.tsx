import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FONTS, SPACING } from '../theme';
import { ThemeColors } from '../types';

interface QuickActionBarProps {
  onScrollToScore: () => void;
  onOpenTestRunner: () => void;
  onOpenConcepts: () => void;
  onScrollToContact: () => void;
  theme: ThemeColors | any;
}

/**
 * QuickActionBar Component (Minimalist Tech: Flat Chips, Scale 8px, Inter)
 */
export default function QuickActionBar({
  onScrollToScore,
  onOpenTestRunner,
  onOpenConcepts,
  onScrollToContact,
  theme,
}: QuickActionBarProps) {
  const actions = [
    {
      id: 'score',
      label: 'Nilai UTS (L8)',
      icon: 'school-outline' as const,
      onPress: onScrollToScore,
    },
    {
      id: 'test',
      label: 'Test Suite (L10)',
      icon: 'speedometer' as const,
      onPress: onOpenTestRunner,
    },
    {
      id: 'concepts',
      label: 'Konsep P1-P10',
      icon: 'book-open-page-variant-outline' as const,
      onPress: onOpenConcepts,
    },
    {
      id: 'contact',
      label: 'Kontak (L4)',
      icon: 'email-edit-outline' as const,
      onPress: onScrollToContact,
    },
  ];

  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {actions.map((act) => (
          <TouchableOpacity
            key={act.id}
            style={[
              styles.actionChip,
              {
                backgroundColor: theme?.surface || '#FFFFFF',
                borderColor: theme?.border || '#E2E8F0',
              },
            ]}
            onPress={act.onPress}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel={act.label}
          >
            <View
              style={[
                styles.iconBox,
                {
                  backgroundColor: theme?.surfaceMuted || '#E5DFCE',
                  borderColor: theme?.borderLight || '#939675',
                },
              ]}
            >
              <MaterialCommunityIcons name={act.icon} size={15} color={theme?.textPrimary || '#363C2E'} />
            </View>
            <Text style={[styles.chipText, { color: theme?.textPrimary || '#363C2E' }]}>
              {act.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: SPACING.gap, // 20px standardized gap
    width: '100%',
  },
  container: {
    flexDirection: 'row',
    gap: SPACING.sm, // 8px
    paddingVertical: SPACING.xs,
  },
  actionChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm, // 8px
    paddingHorizontal: SPACING.md, // 16px
    borderRadius: 8,
    borderWidth: 1,
    gap: SPACING.sm,
  },
  iconBox: {
    width: 26,
    height: 26,
    borderRadius: 6,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipText: {
    fontFamily: FONTS.semiBold,
    fontSize: 12,
    fontWeight: '600',
  },
});
