import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SHADOWS, SPACING } from '../theme';

export default function Level8CriteriaCard({ onShowDetail, theme }) {
  const criteria = [
    {
      title: 'Seluruh Persyaratan Level 7 Terpenuhi',
      desc: 'Portofolio, Search, Modal, Dual-Theme, & JSON Architecture',
    },
    {
      title: 'Section My Score Terintegrasi Penuh ke Aplikasi',
      desc: 'Dashboard nilai akademik Pemrograman Mobile 2 Masoem University',
    },
    {
      title: 'Identitas Akademik Lengkap dari File JSON',
      desc: 'Nama: Febrian, NIM: 242505024, MK: Pemrograman Mobile 2, Dosen: Iin, M.Kom',
    },
    {
      title: 'Current Score Menonjol & Jelas (Nilai 90, Grade A)',
      desc: 'Nilai angka besar 90/100, Grade A, dan status Sangat Memuaskan',
    },
    {
      title: 'Learning Points Tampil Jelas (19,000 LP)',
      desc: 'Total 19,000 LP lengkap dengan predikat Top Tier Scholar',
    },
    {
      title: 'Indikator Capaian Belajar Dinamis (4 Komponen)',
      desc: 'Attendance 100%, Practice 95%, Quest 100%, & Challenge 100%',
    },
    {
      title: 'Persentase Progres & Reusable Props Component',
      desc: 'Dirender dinamis dari list JSON menggunakan Flexbox progress bar',
    },
  ];

  return (
    <View
      style={[
        styles.criteriaCard,
        {
          backgroundColor: theme.isDark ? '#052E16' : '#F0FDF4',
          borderColor: theme.isDark ? '#166534' : '#86EFAC',
        },
      ]}
    >
      <View style={[styles.criteriaHeader, { borderBottomColor: theme.isDark ? '#14532D' : '#DCFCE7' }]}>
        <View style={[styles.badgeIcon, { backgroundColor: theme.isDark ? '#14532D' : '#DCFCE7' }]}>
          <Ionicons name="ribbon" size={18} color="#15803D" />
        </View>
        <View style={styles.headerTextCol}>
          <Text style={[styles.criteriaTitle, { color: theme.isDark ? '#86EFAC' : '#15803D' }]}>
            Checklist Evaluasi LEVEL 8 — EXPERT
          </Text>
          <Text style={[styles.criteriaSubtitle, { color: theme.isDark ? '#BBF7D0' : '#166534' }]}>
            Fokus: My Score & Academic Dashboard (Capaian Akademik)
          </Text>
        </View>
      </View>

      <View style={styles.criteriaList}>
        {criteria.map((item, index) => (
          <View key={index} style={styles.criteriaItem}>
            <Ionicons name="checkmark-circle" size={18} color={theme.success} />
            <View style={styles.itemTextCol}>
              <Text style={[styles.itemTitle, { color: theme.isDark ? '#F0FDF4' : '#14532D' }]}>
                {item.title}
              </Text>
              <Text style={[styles.itemDesc, { color: theme.isDark ? '#86EFAC' : '#166534' }]}>
                {item.desc}
              </Text>
            </View>
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={[
          styles.verifyButton,
          {
            backgroundColor: theme.surface,
            borderColor: theme.primaryBorder,
          },
        ]}
        activeOpacity={0.8}
        onPress={onShowDetail}
      >
        <Ionicons name="school-outline" size={16} color={theme.primary} />
        <Text style={[styles.verifyButtonText, { color: theme.primary }]}>
          Verifikasi Nilai & Capaian Akademik (Level 8)
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
    width: 34,
    height: 34,
    borderRadius: 17,
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
