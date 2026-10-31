import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SHADOWS, SPACING } from '../theme';

/**
 * InteractiveEndorseBar Component (Level 7: Theme Adaptable Endorse Button)
 */
export default function InteractiveEndorseBar({ studentName, initialCount = 48, theme }) {
  const currentTheme = theme || COLORS;
  const [endorseCount, setEndorseCount] = useState(initialCount);
  const [isEndorsed, setIsEndorsed] = useState(false);

  const handleToggleEndorse = () => {
    if (isEndorsed) {
      setEndorseCount((prev) => prev - 1);
      setIsEndorsed(false);
    } else {
      setEndorseCount((prev) => prev + 1);
      setIsEndorsed(true);

      const msg = `Terima kasih! Anda telah merekomendasikan profil ${studentName}. Jumlah rekomendasi sekarang: ${endorseCount + 1}.`;
      if (Platform.OS === 'web') {
        window.alert(msg);
      } else {
        Alert.alert('Rekomendasi Terkirim! 👍', msg, [{ text: 'Mantap', style: 'default' }]);
      }
    }
  };

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: currentTheme.surface,
          borderColor: currentTheme.primaryBorder,
        },
      ]}
    >
      <View style={styles.contentRow}>
        <View style={styles.textCol}>
          <Text style={[styles.titleText, { color: currentTheme.textPrimary }]}>
            Rekomendasikan Profil Mahasiswa
          </Text>
          <Text style={[styles.subText, { color: currentTheme.textMuted }]}>
            Dukung keahlian Sistem Informasi & Mobile Development {studentName}
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.endorseButton,
            {
              backgroundColor: currentTheme.primaryLight,
              borderColor: currentTheme.primaryBorder,
            },
            isEndorsed
              ? { backgroundColor: currentTheme.primary, borderColor: currentTheme.primary }
              : null,
          ]}
          activeOpacity={0.8}
          onPress={handleToggleEndorse}
        >
          <Ionicons
            name={isEndorsed ? 'thumbs-up' : 'thumbs-up-outline'}
            size={18}
            color={isEndorsed ? '#FFFFFF' : currentTheme.primary}
          />
          <Text
            style={[
              styles.endorseButtonText,
              { color: isEndorsed ? '#FFFFFF' : currentTheme.primary },
            ]}
          >
            {isEndorsed ? 'Didukung' : 'Endorse'} ({endorseCount})
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: SPACING.md,
    borderWidth: 1,
    marginBottom: SPACING.lg,
    ...SHADOWS.sm,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: SPACING.sm,
  },
  textCol: {
    flex: 1,
  },
  titleText: {
    fontSize: 13,
    fontWeight: '800',
  },
  subText: {
    fontSize: 11,
    marginTop: 2,
    lineHeight: 15,
  },
  endorseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    gap: 6,
  },
  endorseButtonText: {
    fontSize: 12,
    fontWeight: '800',
  },
});
