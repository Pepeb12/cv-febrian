import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SHADOWS, SPACING } from '../theme';

export default function Level3CriteriaCard({ onShowDetail }) {
  const criteria = [
    {
      title: 'Seluruh Persyaratan Level 1 & Level 2',
      desc: 'NIM, Nama, Foto, Profesi, Minat, dan Intro terintegrasi penuh',
    },
    {
      title: 'Layout Terstruktur & Visual Hierarchy',
      desc: 'Hierarki visual terstandarisasi dengan Design Tokens',
    },
    {
      title: 'Penerapan Flexbox & StyleSheet Murni',
      desc: 'Flex direction, alignment, wrap, grid 2-kolom, & progress bars',
    },
    {
      title: 'Organisasi Bagian Profil Komprehensif',
      desc: 'Hero Profile, Metric Stats, Intro, Skills Matrix, Timeline, & Kontak',
    },
    {
      title: 'Responsif & Nyaman Dibaca di Layar HP',
      desc: 'Tidak ada teks/elemen terpotong, proporsi mobile-first terjaga',
    },
  ];

  return (
    <View style={styles.criteriaCard}>
      <View style={styles.criteriaHeader}>
        <View style={styles.badgeIcon}>
          <Ionicons name="layers" size={16} color="#1E40AF" />
        </View>
        <View style={styles.headerTextCol}>
          <Text style={styles.criteriaTitle}>Checklist Evaluasi LEVEL 3 — ELEMENTARY</Text>
          <Text style={styles.criteriaSubtitle}>Fokus: Layout & Styling React Native (P4)</Text>
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
        <Ionicons name="shield-checkmark" size={16} color={COLORS.primary} />
        <Text style={styles.verifyButtonText}>Verifikasi Validasi Layout & Styling (P4)</Text>
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
    backgroundColor: '#DBEAFE',
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

