import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SHADOWS, SPACING } from '../theme';

export default function Level7CriteriaCard({ onShowDetail, theme }) {
  const criteria = [
    {
      title: 'Seluruh Persyaratan Level 6 Terpenuhi',
      desc: 'Local JSON data, props pipeline, and structured layout',
    },
    {
      title: 'Galeri Portofolio Proyek Interaktif (Portfolio Gallery)',
      desc: 'Daftar proyek dinamis dari JSON dengan role, tech stack, dan fitur',
    },
    {
      title: 'Pencarian & Penyaringan Real-Time (Search & Filter)',
      desc: 'Pencarian kata kunci instan dan filter kategori multi-proyek',
    },
    {
      title: 'Eksplorasi Komponen Modal React Native',
      desc: 'Dialog pop-up modal interaktif untuk rincian mendalam setiap proyek',
    },
    {
      title: 'Theme Switcher (Mode Gelap & Terang Dinamis)',
      desc: 'Pengubah tema visual instan via toggle switch pada header',
    },
    {
      title: 'Experience Timeline & Hobby Section',
      desc: 'Timeline organisasi kampus dan seksi hobi personal dari JSON',
    },
  ];

  return (
    <View style={[styles.criteriaCard, { backgroundColor: theme.isDark ? '#052E16' : '#F0FDF4', borderColor: theme.isDark ? '#166534' : '#BBF7D0' }]}>
      <View style={[styles.criteriaHeader, { borderBottomColor: theme.isDark ? '#14532D' : '#DCFCE7' }]}>
        <View style={[styles.badgeIcon, { backgroundColor: theme.isDark ? '#1E3A8A' : '#EFF6FF' }]}>
          <Ionicons name="rocket" size={16} color={theme.primary} />
        </View>
        <View style={styles.headerTextCol}>
          <Text style={[styles.criteriaTitle, { color: theme.isDark ? '#86EFAC' : '#15803D' }]}>
            Checklist Evaluasi LEVEL 7 — ADVANCED
          </Text>
          <Text style={[styles.criteriaSubtitle, { color: theme.isDark ? '#BBF7D0' : '#166534' }]}>
            Fokus: Dynamic Content & React Native Exploration
          </Text>
        </View>
      </View>

      <View style={styles.criteriaList}>
        {criteria.map((item, index) => (
          <View key={index} style={styles.criteriaItem}>
            <Ionicons name="checkmark-circle" size={18} color={theme.success} />
            <View style={styles.itemTextCol}>
              <Text style={[styles.itemTitle, { color: theme.isDark ? '#F0FDF4' : '#14532D' }]}>{item.title}</Text>
              <Text style={[styles.itemDesc, { color: theme.isDark ? '#86EFAC' : '#166534' }]}>{item.desc}</Text>
            </View>
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.verifyButton, { backgroundColor: theme.surface, borderColor: theme.primaryBorder }]}
        activeOpacity={0.8}
        onPress={onShowDetail}
      >
        <Ionicons name="sparkles" size={16} color={theme.primary} />
        <Text style={[styles.verifyButtonText, { color: theme.primary }]}>
          Verifikasi Eksplorasi Fitur Level 7 (Advanced)
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  criteriaCard: {
    borderRadius: 16,
    padding: SPACING.lg,
    borderWidth: 1,
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
  },
  badgeIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTextCol: {
    flex: 1,
  },
  criteriaTitle: {
    fontSize: 14,
    fontWeight: '800',
  },
  criteriaSubtitle: {
    fontSize: 11,
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
  },
  itemDesc: {
    fontSize: 11,
    marginTop: 1,
  },
  verifyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 14,
    borderWidth: 1,
    gap: 6,
  },
  verifyButtonText: {
    fontSize: 12,
    fontWeight: '700',
  },
});

