import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Theme, SPACING, FONTS } from '../theme';

interface InteractiveEndorseBarProps {
  studentName: string;
  initialCount?: number;
  theme: Theme;
}

/**
 * InteractiveEndorseBar Component (Minimalist Tech: Flat, Scale 8px, Inter)
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
          {/* H3 HEADING */}
          <Text style={[styles.titleText, { color: theme.textPrimary }]}>
            Rekomendasikan Profil Mahasiswa
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
                  ? '#1E293B'
                  : '#0F172A'
                : theme.surfaceMuted,
              borderColor: isEndorsed
                ? isDark
                  ? '#334155'
                  : '#0F172A'
                : theme.borderLight,
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
    borderRadius: 12,
    padding: SPACING.lg, // 24px (scale 8px)
    borderWidth: 1,
    marginBottom: SPACING.xl, // 32px (mb-8)
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: SPACING.lg,
  },
  textCol: {
    flex: 1,
  },
  titleText: {
    fontFamily: FONTS.bold,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 2,
    letterSpacing: -0.2,
  },
  subText: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    lineHeight: 18,
  },
  endorseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm, // 8px
    paddingHorizontal: SPACING.md, // 16px
    borderRadius: 8,
    borderWidth: 1,
    gap: SPACING.xs,
  },
  endorseButtonText: {
    fontFamily: FONTS.bold,
    fontSize: 12,
    fontWeight: '700',
  },
});
