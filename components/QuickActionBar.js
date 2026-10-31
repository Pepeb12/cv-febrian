/**
 * Quick Action Bar
 * Tombol pintas navigasi interaktif untuk mempermudah dosen menguji fitur-fitur utama
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SPACING } from '../theme';

export default function QuickActionBar({
  onScrollToScore,
  onOpenTestRunner,
  onOpenConcepts,
  onScrollToContact,
  theme,
}) {
  const isDark = theme?.isDark || false;

  const actions = [
    {
      id: 'score',
      label: 'Nilai UTS (L8)',
      icon: 'school',
      color: '#0284C7',
      onPress: onScrollToScore,
    },
    {
      id: 'test',
      label: 'Test Suite (L10)',
      icon: 'speedometer',
      color: '#0D9488',
      onPress: onOpenTestRunner,
    },
    {
      id: 'concepts',
      label: 'Konsep RN (P1-P10)',
      icon: 'book-open-page-variant',
      color: '#8B5CF6',
      onPress: onOpenConcepts,
    },
    {
      id: 'contact',
      label: 'Form Kontak (L4)',
      icon: 'email-edit-outline',
      color: '#D97706',
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
                borderColor: isDark ? '#334155' : '#E2E8F0',
              },
            ]}
            onPress={act.onPress}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel={act.label}
          >
            <View style={[styles.iconBox, { backgroundColor: `${act.color}15` }]}>
              <MaterialCommunityIcons name={act.icon} size={15} color={act.color} />
            </View>
            <Text style={[styles.chipText, { color: theme?.text || '#1E293B' }]}>
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
  },
  container: {
    flexDirection: 'row',
    gap: 8,
    paddingVertical: 4,
  },
  actionChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  iconBox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipText: {
    fontSize: 11,
    fontWeight: '700',
  },
});
