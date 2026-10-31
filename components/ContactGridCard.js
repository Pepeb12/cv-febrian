import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SectionHeading from './SectionHeading';
import { COLORS, SHADOWS, SPACING } from '../theme';

/**
 * ContactGridCard Component (Level 7: Theme Adaptable Contact Grid)
 */
export default function ContactGridCard({ contactItems, theme }) {
  const currentTheme = theme || COLORS;

  const handleContactPress = (item) => {
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
          borderColor: currentTheme.borderLight,
        },
      ]}
    >
      <SectionHeading
        title="Informasi Kontak & Jaringan"
        subtitle="Kanal Komunikasi & Lokasi Mahasiswa"
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
          >
            <View style={[styles.iconCircle, { backgroundColor: item.color + '18' }]}>
              <Ionicons name={item.icon} size={18} color={item.color} />
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
    ...SHADOWS.md,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
    marginTop: SPACING.xs,
  },
  gridItem: {
    width: '48%',
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
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  itemValue: {
    fontSize: 12,
    fontWeight: '700',
    marginTop: 2,
  },
});
