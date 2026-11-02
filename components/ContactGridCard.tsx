import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SectionHeading from './SectionHeading';
import { COLORS, SHADOWS, SPACING, FONTS } from '../theme';
import { ContactItem, ThemeColors } from '../types';

interface ContactGridCardProps {
  contactItems?: ContactItem[];
  theme?: ThemeColors | any;
}

/**
 * ContactGridCard Component (Direct Communication Grid in TSX)
 * Styled with Emerald – Cream – White – Mint luxury palette & Lato fonts.
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
            <View
              style={[
                styles.iconCircle,
                {
                  backgroundColor: currentTheme.surface,
                  borderColor: currentTheme.border,
                },
              ]}
            >
              <Ionicons name={item.icon as any} size={16} color={currentTheme.primary} />
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
    padding: SPACING.xl, // 32px (Generous 8px scale)
    borderWidth: 1, // Soft hairline, no harsh border
    marginBottom: SPACING.xl, // 32px (mb-8)
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 2,
  },
  gridItem: {
    flex: 1,
    minWidth: 130,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 9,
    borderWidth: 1,
    gap: 8,
  },
  iconCircle: {
    width: 30,
    height: 30,
    borderRadius: 7,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
  },
  itemLabel: {
    fontFamily: FONTS.heading,
    fontSize: 9.5,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  itemValue: {
    fontFamily: FONTS.body,
    fontSize: 11,
    marginTop: 1,
  },
});
