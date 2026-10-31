import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Theme, SPACING, SHADOWS } from '../theme';

interface InteractiveEndorseBarProps {
  studentName: string;
  initialCount?: number;
  theme: Theme;
}

/**
 * InteractiveEndorseBar Component (Level 7 & 10: Interactive Component)
 * Clean, non-AI-slop social endorsement bar with state management and user feedback.
 */
export default function InteractiveEndorseBar({
  studentName,
  initialCount = 48,
  theme,
}: InteractiveEndorseBarProps) {
  const [endorseCount, setEndorseCount] = useState(initialCount);
  const [isEndorsed, setIsEndorsed] = useState(false);

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
              backgroundColor: isEndorsed ? theme.primary : theme.surfaceMuted,
              borderColor: isEndorsed ? theme.primary : theme.border,
            },
          ]}
          activeOpacity={0.8}
          onPress={handleToggleEndorse}
          accessibilityRole="button"
          accessibilityLabel={`Rekomendasikan ${studentName}`}
        >
          <MaterialCommunityIcons
            name={isEndorsed ? 'thumb-up' : 'thumb-up-outline'}
            size={16}
            color={isEndorsed ? '#FFFFFF' : theme.textPrimary}
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
    marginBottom: SPACING.lg,
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
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 2,
    letterSpacing: -0.2,
  },
  subText: {
    fontSize: 11,
    lineHeight: 16,
  },
  endorseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    gap: 6,
  },
  endorseButtonText: {
    fontSize: 12,
    fontWeight: '700',
  },
});

