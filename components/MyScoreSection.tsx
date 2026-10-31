import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SectionHeading from './SectionHeading';
import { SHADOWS, SPACING } from '../theme';
import { AcademicScoreData, ThemeColors } from '../types';

interface MyScoreSectionProps {
  data: AcademicScoreData | any;
  theme: ThemeColors | any;
}

/**
 * MyScoreSection Component (Materi LEVEL 8 — EXPERT: My Score & Academic Dashboard in TSX)
 * Menampilkan:
 * 1. Identitas Akademik (Nama, NIM, MK Pemrograman Mobile 2, Dosen Iin, M.Kom)
 * 2. Current Score (Nilai 90, Grade A - Tampil Jelas & Menonjol)
 * 3. Learning Points (19,000 LP)
 * 4. Learning Progress Cards (Attendance 100%, Practice 95%, Quest 100%, Challenge 100%)
 */
export default function MyScoreSection({ data, theme }: MyScoreSectionProps) {
  if (!data) return null;

  const {
    studentIdentity = {},
    currentScore = {},
    learningPoints = {},
    learningProgress = [],
  } = data;

  const currentTheme = theme || {};

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: currentTheme.surface,
          borderColor: currentTheme.borderLight,
        },
      ]}
      accessibilityRole="region"
      accessibilityLabel="Dashboard Capaian Akademik My Score"
    >
      <SectionHeading
        title="My Score & Capaian Akademik"
        subtitle="Dashboard Evaluasi Capaian Pemrograman Mobile 2"
        icon="school"
        badgeText="Grade A"
        theme={currentTheme}
      />

      {/* 1. KARTU IDENTITAS AKADEMIK (MK, Dosen, Mahasiswa, NIM) */}
      <View
        style={[
          styles.identityCard,
          {
            backgroundColor: currentTheme.surfaceMuted,
            borderColor: currentTheme.border,
          },
        ]}
      >
        <View style={styles.courseHeaderRow}>
          <View style={styles.courseIconBox}>
            <Ionicons name="book" size={18} color="#FFFFFF" />
          </View>
          <View style={styles.courseTitleCol}>
            <Text style={[styles.courseName, { color: currentTheme.textPrimary }]}>
              {studentIdentity.course || studentIdentity.mataKuliah || 'Pemrograman Mobile 2'}
            </Text>
            <Text style={[styles.courseMeta, { color: currentTheme.textMuted }]}>
              Dosen: {studentIdentity.lecturer || studentIdentity.dosen || 'Iin, M.Kom'}
            </Text>
          </View>
          <View style={styles.semesterBadge}>
            <Text style={styles.semesterText}>Semester {studentIdentity.semester || 5}</Text>
          </View>
        </View>

        {/* Baris Identitas Mahasiswa */}
        <View style={[styles.studentInfoRow, { borderTopColor: currentTheme.borderLight }]}>
          <View style={styles.infoCol}>
            <Text style={[styles.infoLabel, { color: currentTheme.textMuted }]}>NAMA MAHASISWA</Text>
            <Text style={[styles.infoValue, { color: currentTheme.textPrimary }]}>
              {studentIdentity.name || studentIdentity.nama || 'Febrian'}
            </Text>
          </View>
          <View style={styles.dividerV} />
          <View style={styles.infoCol}>
            <Text style={[styles.infoLabel, { color: currentTheme.textMuted }]}>NIM</Text>
            <Text style={[styles.infoValue, { color: currentTheme.primary }]}>
              {studentIdentity.nim || '242505024'}
            </Text>
          </View>
          <View style={styles.dividerV} />
          <View style={styles.infoCol}>
            <Text style={[styles.infoLabel, { color: currentTheme.textMuted }]}>KAMPUS</Text>
            <Text style={[styles.infoValue, { color: currentTheme.textPrimary }]}>
              {studentIdentity.kampus || 'Masoem Univ'}
            </Text>
          </View>
        </View>
      </View>

      {/* 2. HERO SCORE & LEARNING POINTS (2 Kolom Menonjol & Mudah Dilihat) */}
      <View style={styles.scoreRow}>
        {/* CURRENT SCORE CARD (NILAI 90, GRADE A) */}
        <View
          style={[
            styles.currentScoreCard,
            {
              backgroundColor: currentTheme.isDark ? '#062817' : '#F0FDF4',
              borderColor: currentTheme.isDark ? '#059669' : '#86EFAC',
            },
          ]}
        >
          <View style={styles.scoreTopRow}>
            <View
              style={[
                styles.scoreLabelBadge,
                { backgroundColor: currentTheme.isDark ? 'rgba(34, 197, 94, 0.2)' : '#DCFCE7' },
              ]}
            >
              <Text style={[styles.scoreLabelText, { color: currentTheme.isDark ? '#4ADE80' : '#166534' }]}>
                CURRENT SCORE
              </Text>
            </View>
            <View style={styles.gradeBadge}>
              <Text style={styles.gradeBadgeText}>GRADE {currentScore.grade || 'A'}</Text>
            </View>
          </View>

          <View style={styles.scoreNumberRow}>
            <Text style={[styles.bigScoreNumber, { color: currentTheme.isDark ? '#4ADE80' : '#15803D' }]}>
              {currentScore.score ?? 90}
            </Text>
            <Text style={[styles.scoreOutOf, { color: currentTheme.isDark ? '#86EFAC' : '#16A34A' }]}>
              / 100
            </Text>
          </View>

          <View
            style={[
              styles.statusPill,
              { backgroundColor: currentTheme.isDark ? 'rgba(34, 197, 94, 0.2)' : '#DCFCE7' },
            ]}
          >
            <Ionicons name="sparkles" size={12} color={currentTheme.isDark ? '#4ADE80' : '#15803D'} />
            <Text style={[styles.statusPillText, { color: currentTheme.isDark ? '#4ADE80' : '#15803D' }]}>
              {currentScore.status || 'Sangat Memuaskan'}
            </Text>
          </View>
        </View>

        {/* LEARNING POINTS CARD (19,000 LP) */}
        <View
          style={[
            styles.lpCard,
            {
              backgroundColor: currentTheme.isDark ? '#2D1B05' : '#FFFBEB',
              borderColor: currentTheme.isDark ? '#D97706' : '#FDE68A',
            },
          ]}
        >
          <View style={styles.lpTopRow}>
            <View
              style={[
                styles.lpLabelBadge,
                { backgroundColor: currentTheme.isDark ? 'rgba(245, 158, 11, 0.2)' : '#FEF3C7' },
              ]}
            >
              <Text style={[styles.lpLabelText, { color: currentTheme.isDark ? '#FBBF24' : '#92400E' }]}>
                LEARNING POINTS
              </Text>
            </View>
            <Ionicons name="trophy" size={16} color="#D97706" />
          </View>

          <View style={styles.lpNumberRow}>
            <Text style={[styles.bigLpNumber, { color: currentTheme.isDark ? '#FBBF24' : '#B45309' }]}>
              {Number(learningPoints.total ?? 19000).toLocaleString('id-ID')}
            </Text>
            <Text style={[styles.lpUnit, { color: currentTheme.isDark ? '#F59E0B' : '#D97706' }]}>
              {learningPoints.unit || 'LP'}
            </Text>
          </View>

          <View
            style={[
              styles.rankPill,
              { backgroundColor: currentTheme.isDark ? 'rgba(245, 158, 11, 0.2)' : '#FEF3C7' },
            ]}
          >
            <Ionicons name="ribbon" size={12} color={currentTheme.isDark ? '#FBBF24' : '#B45309'} />
            <Text style={[styles.rankPillText, { color: currentTheme.isDark ? '#FBBF24' : '#B45309' }]}>
              {learningPoints.rank || 'Top Tier Scholar'}
            </Text>
          </View>
        </View>
      </View>

      {/* 3. LEARNING PROGRESS SECTION (Attendance, Practice, Quest, Challenge) */}
      <View style={styles.progressSection}>
        <View style={styles.progressHeaderRow}>
          <Text style={[styles.progressSectionTitle, { color: currentTheme.textPrimary }]}>
            Indikator Capaian Belajar (Learning Progress)
          </Text>
          <Text style={[styles.progressSectionSubtitle, { color: currentTheme.textMuted }]}>
            {learningProgress.length} Komponen Penilaian
          </Text>
        </View>

        <View style={styles.progressList}>
          {learningProgress.map((item: any) => {
            const label = item.name || item.label || 'Progress';
            const pct = item.percentage ?? 0;
            const desc = item.details || item.description || `${pct}% tercapai`;
            const color =
              pct >= 100
                ? '#10B981'
                : pct >= 90
                ? '#0284C7'
                : pct >= 75
                ? '#F59E0B'
                : '#EF4444';

            return (
              <View
                key={item.id || label}
                style={[
                  styles.progressCard,
                  {
                    backgroundColor: currentTheme.surfaceMuted,
                    borderColor: currentTheme.border,
                  },
                ]}
              >
                {/* Header Baris */}
                <View style={styles.progressCardHeader}>
                  <View style={styles.progressLeft}>
                    <View style={[styles.progressIconBox, { backgroundColor: color + '1A' }]}>
                      <Ionicons name="checkmark-circle" size={18} color={color} />
                    </View>
                    <View>
                      <Text style={[styles.progressName, { color: currentTheme.textPrimary }]}>
                        {label}
                      </Text>
                      <Text style={[styles.progressLabel, { color: currentTheme.textMuted }]}>
                        {desc}
                      </Text>
                    </View>
                  </View>

                  <View style={[styles.percentageBadge, { backgroundColor: color + '18' }]}>
                    <Text style={[styles.percentageText, { color }]}>{pct}%</Text>
                  </View>
                </View>

                {/* Visual Progress Bar Flexbox */}
                <View
                  style={[
                    styles.progressTrack,
                    { backgroundColor: currentTheme.isDark ? '#283548' : '#E2E8F0' },
                  ]}
                >
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${Math.min(100, Math.max(0, pct))}%`,
                        backgroundColor: color,
                      },
                    ]}
                  />
                </View>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: SPACING.lg,
    borderWidth: 1,
    marginBottom: SPACING.lg,
    ...SHADOWS.md,
  },
  identityCard: {
    borderRadius: 12,
    padding: SPACING.md,
    borderWidth: 1,
    marginBottom: SPACING.md,
  },
  courseHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  courseIconBox: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#1E40AF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  courseTitleCol: {
    flex: 1,
  },
  courseName: {
    fontSize: 14,
    fontWeight: '800',
  },
  courseMeta: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 1,
  },
  semesterBadge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  semesterText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#1E40AF',
  },
  studentInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
  },
  infoCol: {
    flex: 1,
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 12,
    fontWeight: '800',
  },
  dividerV: {
    width: 1,
    height: 22,
    backgroundColor: '#CBD5E1',
  },
  scoreRow: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginBottom: SPACING.lg,
  },
  currentScoreCard: {
    flex: 1,
    backgroundColor: '#F0FDF4',
    borderRadius: 14,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: '#86EFAC',
    alignItems: 'center',
    ...SHADOWS.sm,
  },
  scoreTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 6,
  },
  scoreLabelBadge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  scoreLabelText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#166534',
  },
  gradeBadge: {
    backgroundColor: '#15803D',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  gradeBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  scoreNumberRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginVertical: 4,
  },
  bigScoreNumber: {
    fontSize: 42,
    fontWeight: '900',
    color: '#15803D',
    letterSpacing: -1,
  },
  scoreOutOf: {
    fontSize: 13,
    fontWeight: '700',
    color: '#16A34A',
    marginLeft: 4,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    gap: 4,
  },
  statusPillText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#15803D',
  },
  lpCard: {
    flex: 1,
    backgroundColor: '#FFFBEB',
    borderRadius: 14,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: '#FDE68A',
    alignItems: 'center',
    ...SHADOWS.sm,
  },
  lpTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 6,
  },
  lpLabelBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  lpLabelText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#92400E',
  },
  lpNumberRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginVertical: 4,
  },
  bigLpNumber: {
    fontSize: 26,
    fontWeight: '900',
    color: '#B45309',
    letterSpacing: -0.5,
  },
  lpUnit: {
    fontSize: 12,
    fontWeight: '800',
    color: '#D97706',
    marginLeft: 4,
  },
  rankPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    gap: 4,
  },
  rankPillText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#B45309',
  },
  progressSection: {
    gap: 8,
  },
  progressHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  progressSectionTitle: {
    fontSize: 13,
    fontWeight: '800',
  },
  progressSectionSubtitle: {
    fontSize: 11,
    fontWeight: '600',
  },
  progressList: {
    gap: 8,
  },
  progressCard: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    gap: 6,
  },
  progressCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progressLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  progressIconBox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressName: {
    fontSize: 12,
    fontWeight: '800',
  },
  progressLabel: {
    fontSize: 10,
  },
  percentageBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  percentageText: {
    fontSize: 12,
    fontWeight: '900',
  },
  progressTrack: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    width: '100%',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
});

