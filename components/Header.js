import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, SHADOWS } from '../theme';

export default function Header() {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerLeft}>
        <View style={styles.iconCircle}>
          <Ionicons name="school" size={22} color={COLORS.primary} />
        </View>
        <View>
          <Text style={styles.universityName}>MASOEM UNIVERSITY</Text>
          <Text style={styles.appTitle}>Personal CV & Identity</Text>
        </View>
      </View>
      <View style={styles.badgeLevel}>
        <Text style={styles.badgeText}>LEVEL 3</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    ...SHADOWS.sm,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  universityName: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.primary,
    letterSpacing: 1,
  },
  appTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  badgeLevel: {
    backgroundColor: '#EDE9FE',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#C4B5FD',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#6D28D9',
  },
});
