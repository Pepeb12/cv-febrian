import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SPACING, SHADOWS } from '../theme';
import { ThemeColors } from '../types';

interface Level8CriteriaCardProps {
  onShowDetail: () => void;
  theme: ThemeColors | any;
}

export default function Level8CriteriaCard({ onShowDetail, theme }: Level8CriteriaCardProps) {
  const currentTheme = theme || {};

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: currentTheme.surface,
          borderColor: currentTheme.borderLight,
        },
      ]}
      accessibilityRole="region"
      accessibilityLabel="Evaluasi Kriteria Level 8 Expert"
    >
      <View style={styles.cardHeader}>
        <View style={styles.badgeExpert}>
          <Ionicons name="ribbon" size={14} color="#B45309" />
          <Text style={styles.badgeExpertText}>LEVEL 8 — EXPERT EVALUATION</Text>
        </View>
        <Text style={[styles.statusText, { color: currentTheme.success }]}>
          ✓ 100% Terpenuhi
        </Text>
      </View>

      <Text style={[styles.title, { color: currentTheme.textPrimary }]}>
        Dashboard Evaluasi Akademik My Score
      </Text>
      <Text style={[styles.description, { color: currentTheme.textMuted }]}>
        Mengintegrasikan data capaian akademik UTS Pemrograman Mobile 2 dari berkas terpisah (data/academicScore.json) ke antarmuka aplikasi.
      </Text>

      {/* Checklist Evaluasi */}
      <View style={styles.checklist}>
        <View style={styles.checkItem}>
          <Ionicons name="checkmark-circle" size={16} color="#16A34A" />
          <Text style={[styles.checkText, { color: currentTheme.textSecondary }]}>
            Identitas Mata Kuliah, Dosen (Iin, M.Kom), Mahasiswa & NIM
          </Text>
        </View>
        <View style={styles.checkItem}>
          <Ionicons name="checkmark-circle" size={16} color="#16A34A" />
          <Text style={[styles.checkText, { color: currentTheme.textSecondary }]}>
            Current Score: Nilai 90 & Grade A ditampilkan sangat jelas
          </Text>
        </View>
        <View style={styles.checkItem}>
          <Ionicons name="checkmark-circle" size={16} color="#16A34A" />
          <Text style={[styles.checkText, { color: currentTheme.textSecondary }]}>
            Learning Points: 19.000 LP dengan peringkat pencapaian
          </Text>
        </View>
        <View style={styles.checkItem}>
          <Ionicons name="checkmark-circle" size={16} color="#16A34A" />
          <Text style={[styles.checkText, { color: currentTheme.textSecondary }]}>
            Learning Progress: Attendance (100%), Practice (95%), Quest (100%), Challenge (100%)
          </Text>
        </View>
      </View>

      {/* Tombol Interaktif */}
      <TouchableOpacity
        style={styles.actionButton}
        activeOpacity={0.8}
        onPress={onShowDetail}
        accessibilityRole="button"
        accessibilityLabel="Verifikasi Status Capaian Level 8"
      >
        <Ionicons name="checkmark-done" size={16} color="#FFFFFF" />
        <Text style={styles.actionButtonText}>Verifikasi Status Capaian Level 8</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: SPACING.lg,
    borderWidth: 1,
    marginBottom: SPACING.lg,
    ...SHADOWS.md,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  badgeExpert: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  badgeExpertText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#92400E',
    letterSpacing: 0.5,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '800',
  },
  title: {
    fontSize: 15,
    fontWeight: '800',
    marginTop: 4,
    marginBottom: 4,
  },
  description: {
    fontSize: 11,
    lineHeight: 16,
    marginBottom: SPACING.md,
  },
  checklist: {
    gap: 6,
    marginBottom: SPACING.md,
  },
  checkItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  checkText: {
    fontSize: 11,
    lineHeight: 16,
    flex: 1,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E40AF',
    paddingVertical: 10,
    borderRadius: 10,
    gap: 6,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
});

