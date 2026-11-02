import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
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
 * HobbySection Component (Minat & Hobi)
 * Menyusun 4 item hobi menjadi Grid 4 Kolom di Desktop, 2x2 di Tablet, 1 kolom di HP.
 */
export default function HobbySection({ hobbies = [], theme }: HobbySectionProps) {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1024;
  const isTablet = width >= 768 && width < 1024;

  if (!hobbies || hobbies.length === 0) return null;

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.surface,
          borderColor: theme.border,
          width: '100%',
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
                width: isDesktop ? '23.5%' : isTablet ? '48.5%' : '100%',
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
                size={20}
                color={theme.primary}
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
    borderRadius: SPACING.cardRadius,
    padding: SPACING.cardPadding,
    borderWidth: 1,
    marginBottom: 0,
    width: '100%',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 8,
    justifyContent: 'space-between',
  },
  hobbyCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    gap: 12,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hobbyContent: {
    gap: 4,
    width: '100%',
  },
  hobbyName: {
    fontFamily: FONTS.bold,
    fontSize: 13.5,
    fontWeight: '700',
  },
  hobbyDesc: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    lineHeight: 18,
  },
});
