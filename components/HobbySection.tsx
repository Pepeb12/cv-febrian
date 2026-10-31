import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SectionHeading from './SectionHeading';
import { Theme, SPACING, SHADOWS } from '../theme';

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
 * HobbySection Component (Level 7: Hobby & Personal Interests Exploration)
 * Clean cards representing student's personal interests and creative outlets.
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
                  borderColor: theme.border,
                },
              ]}
            >
              <Ionicons
                name={item.icon || 'star-outline'}
                size={18}
                color={item.color || theme.primary}
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
    padding: SPACING.lg,
    borderWidth: 1,
    marginBottom: SPACING.lg,
    ...SHADOWS.sm,
  },
  gridContainer: {
    gap: 10,
    marginTop: 4,
  },
  hobbyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    gap: 12,
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
    fontSize: 12.5,
    fontWeight: '700',
    marginBottom: 2,
  },
  hobbyDesc: {
    fontSize: 11,
    lineHeight: 16,
  },
});

