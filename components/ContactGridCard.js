import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SectionHeading from './SectionHeading';
import { COLORS, SHADOWS, SPACING } from '../theme';

/**
 * ContactGridCard Component (Materi P4: 2-Column Responsive Flexbox Grid)
 * Menampilkan kontak dan kanal komunikasi mahasiswa secara terorganisir.
 */
export default function ContactGridCard({ contactItems }) {
  const handleContactPress = (item) => {
    const message = `${item.label}:\n${item.value}`;
    if (Platform.OS === 'web') {
      window.alert(message);
    } else {
      Alert.alert(item.label, item.value, [{ text: 'Tutup', style: 'default' }]);
    }
  };

  return (
    <View style={styles.card}>
      <SectionHeading
        title="Informasi Kontak & Jaringan"
        subtitle="Kanal Komunikasi & Lokasi Mahasiswa"
        icon="share-social-outline"
        badgeText="Kontak"
      />

      <View style={styles.gridContainer}>
        {contactItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.gridItem}
            activeOpacity={0.7}
            onPress={() => handleContactPress(item)}
          >
            <View style={[styles.iconCircle, { backgroundColor: item.bgColor }]}>
              <Ionicons name={item.icon} size={18} color={item.color} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.itemLabel}>{item.label}</Text>
              <Text style={styles.itemValue} numberOfLines={1} ellipsizeMode="tail">
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
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
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
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
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
    color: COLORS.textMuted,
    textTransform: 'uppercase',
  },
  itemValue: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginTop: 2,
  },
});

