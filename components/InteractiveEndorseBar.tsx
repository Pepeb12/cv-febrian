import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Theme, SPACING, SHADOWS, FONTS } from '../theme';

interface InteractiveEndorseBarProps {
  studentName: string;
  initialCount?: number;
  theme: Theme;
}

/**
 * InteractiveEndorseBar Component (Level 4, 7, 10: Interactive Component)
 * Styled with Emerald – Cream – White – Mint luxury palette & Lato fonts.
 */
export default function InteractiveEndorseBar({
  studentName,
  initialCount = 48,
  theme,
}: InteractiveEndorseBarProps) {
  const [endorseCount, setEndorseCount] = useState(initialCount);
  const [isEndorsed, setIsEndorsed] = useState(false);
  const isDark = theme.isDark;

  const handleToggleEndorse = () => {
    if (isEndorsed) {
      setEndorseCount((prev) => prev - 1);
      setIsEndorsed(false);
    } else {
      setEndorseCount((prev) => prev + 1);
      setIsEndorsed(true);

      const msg = `Terima kasih! Anda telah merekomendasikan kompetensi ${studentName}. Total rekomendasi saat ini: ${endorseCount + 1}.`;
      if (Platform.OS === 'web') {
        window.alert(msg);
      } else {
        Alert.alert('Rekomendasi Terkirim', msg, [{ text: 'OK', style: 'default' }]);
      }
    }
  };

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
      <View style={styles.contentRow}>
        <View style={styles.textCol}>
          <Text style={[styles.titleText, { color: theme.textPrimary }]}>
            Rekomendasikan Profil
          </Text>
          <Text style={[styles.subText, { color: theme.textSecondary }]}>
            Dukung kompetensi Sistem Informasi & Mobile Development {studentName}
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.endorseButton,
            {
              backgroundColor: isEndorsed
                ? isDark
                  ? '#0A4A3A'
                  : '#065F46'
                : theme.surfaceMuted,
              borderColor: isEndorsed ? '#A7F3D0' : theme.border,
            },
          ]}
          activeOpacity={0.8}
          onPress={handleToggleEndorse}
          accessibilityRole="button"
          accessibilityLabel={`Rekomendasikan ${studentName}`}
        >
          <MaterialCommunityIcons
            name={isEndorsed ? 'thumb-up' : 'thumb-up-outline'}
            size={15}
            color={isEndorsed ? '#A7F3D0' : theme.primary}
          />
          <Text
            style={[
              styles.endorseButtonText,
              { color: isEndorsed ? '#FFFFFF' : theme.textPrimary },
            ]}
          >
            {isEndorsed ? 'Didukung' : 'Dukung'} ({endorseCount})
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 14,
    padding: SPACING.md,
    borderWidth: 1,
    marginBottom: SPACING.md,
    ...SHADOWS.sm,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: SPACING.md,
  },
  textCol: {
    flex: 1,
  },
  titleText: {
    fontFamily: FONTS.heading,
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 2,
    letterSpacing: -0.2,
  },
  subText: {
    fontFamily: FONTS.body,
    fontSize: 11,
    lineHeight: 16,
  },
  endorseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 9,
    borderWidth: 1,
    gap: 6,
  },
  endorseButtonText: {
    fontFamily: FONTS.heading,
    fontSize: 11.5,
    fontWeight: '700',
  },
});
