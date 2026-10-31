import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SectionHeading from './SectionHeading';
import { SHADOWS, SPACING } from '../theme';

/**
 * HobbySection Component (Level 7: Hobby & Personal Interests Exploration)
 * Menampilkan hobi personal dengan ikon representatif dan deskripsi singkat.
 */
export default function HobbySection({ hobbies, theme }) {
  if (!hobbies || hobbies.length === 0) return null;

  return (
    <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.borderLight }]}>
      <SectionHeading
        title="Minat & Hobi Pribadi"
        subtitle="Aktivitas Penunjang Kreativitas & Keseimbangan Hidup"
        icon="heart"
        badgeText="Hobi"
        theme={theme}
      />

      <View style={styles.gridContainer}>
        {hobbies.map((item) => (
          <View
            key={item.id}
            style={[styles.hobbyCard, { backgroundColor: theme.surfaceMuted, borderColor: theme.border }]}
          >
            <View style={[styles.iconBox, { backgroundColor: item.color + '18' }]}>
              <Ionicons name={item.icon} size={20} color={item.color} />
            </View>
            <View style={styles.hobbyContent}>
              <Text style={[styles.hobbyName, { color: theme.textPrimary }]}>{item.name}</Text>
              <Text style={[styles.hobbyDesc, { color: theme.textMuted }]}>{item.desc}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: SPACING.lg,
    borderWidth: 1,
    marginBottom: SPACING.lg,
    ...SHADOWS.md,
  },
  gridContainer: {
    gap: SPACING.sm,
    marginTop: SPACING.xs,
  },
  hobbyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderRadius: 12,
    borderWidth: 1,
    gap: SPACING.md,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hobbyContent: {
    flex: 1,
  },
  hobbyName: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 2,
  },
  hobbyDesc: {
    fontSize: 11,
    lineHeight: 16,
  },
});

