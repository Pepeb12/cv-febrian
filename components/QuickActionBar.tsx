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
 * QuickActionBar Component
 * Styled with Emerald – Cream – White – Mint luxury palette & Lato fonts.
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
      icon: 'school' as const,
      color: theme.primary,
      onPress: onScrollToScore,
    },
    {
      id: 'test',
      label: 'Test Suite (L10)',
      icon: 'speedometer' as const,
      color: theme.primary,
      onPress: onOpenTestRunner,
    },
    {
      id: 'concepts',
      label: 'Konsep P1-P10',
      icon: 'book-open-page-variant' as const,
      color: theme.primary,
      onPress: onOpenConcepts,
    },
    {
      id: 'contact',
      label: 'Kontak (L4)',
      icon: 'email-edit-outline' as const,
      color: theme.primary,
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
                borderColor: theme?.border || '#E3DFC8',
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
                  backgroundColor: theme.surfaceMuted,
                  borderColor: theme.borderLight,
                },
              ]}
            >
              <MaterialCommunityIcons name={act.icon} size={14} color={act.color} />
            </View>
            <Text style={[styles.chipText, { color: theme?.textPrimary || '#06281E' }]}>
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
    marginVertical: SPACING.xs,
    width: '100%',
  },
  container: {
    flexDirection: 'row',
    gap: 8,
    paddingVertical: 2,
  },
  actionChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    gap: 6,
  },
  iconBox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipText: {
    fontFamily: FONTS.heading,
    fontSize: 11,
    fontWeight: '700',
  },
});
