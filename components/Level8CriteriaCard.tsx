import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SPACING, FONTS } from '../theme';
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
      accessibilityLabel="Evaluasi Capaian Akademik"
    >
      <View style={styles.cardHeader}>
        <View style={styles.badgeExpert}>
          <Ionicons name="ribbon" size={14} color="#B45309" />
          <Text style={styles.badgeExpertText}>CAPAIAN AKADEMIK UTS</Text>
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
        style={[styles.actionButton, { backgroundColor: currentTheme.primary || '#62684D' }]}
        activeOpacity={0.8}
        onPress={onShowDetail}
        accessibilityRole="button"
        accessibilityLabel="Verifikasi Status Capaian Akademik"
      >
        <Ionicons name="checkmark-done" size={16} color={currentTheme.textInverted || '#FFFFFF'} />
        <Text style={[styles.actionButtonText, { color: currentTheme.textInverted || '#FFFFFF' }]}>Verifikasi Status Capaian Akademik</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: SPACING.cardRadius, // 16px
    padding: SPACING.cardPadding, // 24px standardized card padding
    borderWidth: 1, // Soft hairline, no harsh border, no shadow
    marginBottom: 0,
    width: '100%',
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
    fontFamily: FONTS.bold,
    fontSize: 10,
    fontWeight: '700',
    color: '#92400E',
    letterSpacing: 0.5,
  },
  statusText: {
    fontFamily: FONTS.bold,
    fontSize: 11,
    fontWeight: '700',
  },
  title: {
    fontFamily: FONTS.extraBold,
    fontSize: 16,
    fontWeight: '800',
    marginTop: 6,
    marginBottom: 4,
  },
  description: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    lineHeight: 18,
    marginBottom: SPACING.md,
  },
  checklist: {
    gap: 8,
    marginBottom: SPACING.md,
  },
  checkItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  checkText: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    lineHeight: 18,
    flex: 1,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0F172A',
    paddingVertical: 10,
    borderRadius: 10,
    gap: 6,
  },
  actionButtonText: {
    fontFamily: FONTS.bold,
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
});

