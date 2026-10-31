import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SHADOWS, SPACING } from '../theme';

/**
 * InteractiveEndorseBar Component (Materi P3 & P5: Props, State & Event Handling)
 * Tombol interaksi untuk memberikan dukungan / rekomendasi keahlian mahasiswa.
 */
export default function InteractiveEndorseBar({ studentName, initialCount = 48 }) {
  // State untuk mengelola jumlah dukungan dan status apakah user sudah endorse (Materi P3 & P5)
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
    <View style={styles.card}>
      <View style={styles.contentRow}>
        <View style={styles.textCol}>
          <Text style={styles.titleText}>Rekomendasikan Profil Mahasiswa</Text>
          <Text style={styles.subText}>
            Dukung keahlian Sistem Informasi & Mobile Development {studentName}
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.endorseButton,
            isEndorsed ? styles.endorsedActiveButton : null,
          ]}
          activeOpacity={0.8}
          onPress={handleToggleEndorse}
        >
          <Ionicons
            name={isEndorsed ? 'thumbs-up' : 'thumbs-up-outline'}
            size={18}
            color={isEndorsed ? '#FFFFFF' : COLORS.primary}
          />
          <Text
            style={[
              styles.endorseButtonText,
              isEndorsed ? styles.endorsedActiveText : null,
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
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.primaryBorder,
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
    color: COLORS.textPrimary,
  },
  subText: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 2,
    lineHeight: 15,
  },
  endorseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primaryLight,
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.primaryBorder,
    gap: 6,
  },
  endorsedActiveButton: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  endorseButtonText: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.primary,
  },
  endorsedActiveText: {
    color: '#FFFFFF',
  },
});

