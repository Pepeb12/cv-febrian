import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SectionHeading from './SectionHeading';
import { COLORS, SHADOWS, SPACING } from '../theme';
import { ContactItem, ThemeColors } from '../types';

interface ContactGridCardProps {
  contactItems?: ContactItem[];
  theme?: ThemeColors | any;
}

/**
 * ContactGridCard Component (Clean Direct Communication Grid in TSX)
 */
export default function ContactGridCard({ contactItems, theme }: ContactGridCardProps) {
  const currentTheme = theme || COLORS;

  const handleContactPress = (item: ContactItem) => {
    const message = `${item.label}:\n${item.value}`;
    if (Platform.OS === 'web') {
      window.alert(message);
    } else {
      Alert.alert(item.label, item.value, [{ text: 'Tutup', style: 'default' }]);
    }
  };

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: currentTheme.surface,
          borderColor: currentTheme.border,
        },
      ]}
      accessibilityRole="region"
      accessibilityLabel="Informasi Kontak & Jaringan"
    >
      <SectionHeading
        title="Kanal Kontak & Jaringan"
        subtitle="Komunikasi & Kolaborasi Profesional"
        icon="share-social-outline"
        badgeText="Kontak"
        theme={currentTheme}
      />

      <View style={styles.gridContainer}>
        {(contactItems || []).map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.gridItem,
              {
                backgroundColor: currentTheme.surfaceMuted,
                borderColor: currentTheme.border,
              },
            ]}
            activeOpacity={0.7}
            onPress={() => handleContactPress(item)}
            accessibilityRole="button"
            accessibilityLabel={`${item.label}: ${item.displayValue}`}
          >
            <View style={[styles.iconCircle, { backgroundColor: item.color + '18' }]}>
              <Ionicons name={item.icon as any} size={18} color={item.color} />
            </View>
            <View style={styles.textContainer}>
              <Text style={[styles.itemLabel, { color: currentTheme.textMuted }]}>
                {item.label}
              </Text>
              <Text
                style={[styles.itemValue, { color: currentTheme.textPrimary }]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {item.displayValue}
              </Text>
            </View>
          </TouchableOpacity>
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
    ...SHADOWS.sm,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
    marginTop: SPACING.xs,
  },
  gridItem: {
    flex: 1,
    minWidth: 140,
    borderRadius: 12,
    padding: SPACING.md,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
  },
  itemLabel: {
    fontSize: 9,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  itemValue: {
    fontSize: 11,
    fontWeight: '700',
    marginTop: 2,
  },
});

