import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SHADOWS, SPACING } from '../theme';

export default function Level5CriteriaCard({ onShowDetail }) {
  const criteria = [
    {
      title: 'Pemisahan Mutlak Data & UI (Separation of Concerns)',
      desc: 'Tidak ada data hardcoded di UI; semua data tersimpan di data/profileData.js',
    },
    {
      title: 'Aliran Data Melalui Props (<Component data={profileData} />)',
      desc: 'Komponen murni bersifat presentasional dan menerima data via Props',
    },
    {
      title: 'Struktur Kode Bersih & Modular (Contoh Level 5)',
      desc: 'Tersedia ProfileHeader, AboutSection, ContactForm, & profileData.js',
    },
    {
      title: 'Reusabilitas & Kemudahan Pemeliharaan Tinggi',
      desc: 'Perubahan data tidak memerlukan perubahan kode komponen visual',
    },
    {
      title: 'Aliran Data Jelas & Dapat Dijelaskan ke Penguji',
      desc: 'Import data -> Parent State/Props -> Child Component Presentation',
    },
  ];

  return (
    <View style={styles.criteriaCard}>
      <View style={styles.criteriaHeader}>
        <View style={styles.badgeIcon}>
          <Ionicons name="git-merge" size={16} color="#7C3AED" />
        </View>
        <View style={styles.headerTextCol}>
          <Text style={styles.criteriaTitle}>Checklist Evaluasi LEVEL 5 — COMPETENT</Text>
          <Text style={styles.criteriaSubtitle}>Fokus: Separation of UI and Data (Data-Driven Architecture)</Text>
        </View>
      </View>

      <View style={styles.criteriaList}>
        {criteria.map((item, index) => (
          <View key={index} style={styles.criteriaItem}>
            <Ionicons name="checkmark-circle" size={18} color={COLORS.success} />
            <View style={styles.itemTextCol}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemDesc}>{item.desc}</Text>
            </View>
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={styles.verifyButton}
        activeOpacity={0.8}
        onPress={onShowDetail}
      >
        <Ionicons name="code-working-outline" size={16} color={COLORS.primary} />
        <Text style={styles.verifyButtonText}>Verifikasi Aliran Data & Pemisahan UI (Level 5)</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  criteriaCard: {
    backgroundColor: COLORS.successLight,
    borderRadius: 16,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.successBorder,
    marginBottom: SPACING.lg,
    ...SHADOWS.sm,
  },
  criteriaHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 14,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#DCFCE7',
  },
  badgeIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3E8FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTextCol: {
    flex: 1,
  },
  criteriaTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.successText,
  },
  criteriaSubtitle: {
    fontSize: 11,
    color: '#166534',
    fontWeight: '500',
  },
  criteriaList: {
    gap: 10,
  },
  criteriaItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  itemTextCol: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#14532D',
  },
  itemDesc: {
    fontSize: 11,
    color: '#166534',
    marginTop: 1,
  },
  verifyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.surface,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 14,
    borderWidth: 1,
    borderColor: COLORS.primaryBorder,
    gap: 6,
  },
  verifyButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.primary,
  },
});

