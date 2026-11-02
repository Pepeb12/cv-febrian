import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SectionHeading from './SectionHeading';
import { Theme, SPACING, FONTS } from '../theme';

interface HobbyItem {
  id: string | number;
  name: string;
  desc: string;
  icon: any;
  color?: string;
}

interface HobbySectionProps {
  hobbies?: HobbyItem[];
  theme: Theme;
}

/**
 * HobbySection Component (Minimalist Tech: Flat, Scale 8px, Inter)
 */
export default function HobbySection({ hobbies = [], theme }: HobbySectionProps) {
  if (!hobbies || hobbies.length === 0) return null;

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.surface,
          borderColor: theme.border,
        },
      ]}
    >
      <SectionHeading
        title="Minat & Hobi"
        subtitle="Aktivitas Penunjang Kreativitas & Keseimbangan Hidup"
        icon="heart-outline"
        badgeText="Personal"
        theme={theme}
      />

      <View style={styles.gridContainer}>
        {hobbies.map((item) => (
          <View
            key={item.id}
            style={[
              styles.hobbyCard,
              {
                backgroundColor: theme.surfaceMuted,
                borderColor: theme.borderLight,
              },
            ]}
          >
            <View
              style={[
                styles.iconBox,
                {
                  backgroundColor: theme.surface,
                  borderColor: theme.borderLight,
                },
              ]}
            >
              <Ionicons
                name={item.icon || 'star-outline'}
                size={16}
                color={theme.textPrimary}
              />
            </View>
            <View style={styles.hobbyContent}>
              <Text style={[styles.hobbyName, { color: theme.textPrimary }]}>
                {item.name}
              </Text>
              <Text style={[styles.hobbyDesc, { color: theme.textSecondary }]}>
                {item.desc}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 14,
    padding: SPACING.xl, // 32px (Scale 8px: mb-8, py-8)
    borderWidth: 1,
    marginBottom: SPACING.xl, // 32px (mb-8)
  },
  gridContainer: {
    gap: SPACING.md, // 16px (scale 8px)
    marginTop: 2,
  },
  hobbyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md, // 16px
    borderRadius: 10,
    borderWidth: 1,
    gap: SPACING.md,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hobbyContent: {
    flex: 1,
  },
  hobbyName: {
    fontFamily: FONTS.bold,
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 2,
  },
  hobbyDesc: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    lineHeight: 18,
  },
});
