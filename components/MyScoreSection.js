import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SectionHeading from './SectionHeading';
import { SHADOWS, SPACING } from '../theme';

/**
 * MyScoreSection Component (Materi LEVEL 8 — EXPERT: My Score & Academic Dashboard)
 * Menampilkan:
 * 1. Identitas Akademik (Nama, NIM, MK Pemrograman Mobile 2, Dosen Iin, M.Kom)
 * 2. Current Score (Nilai 90, Grade A - Tampil Jelas & Menonjol)
 * 3. Learning Points (19,000 LP)
 * 4. Learning Progress Cards (Attendance 100%, Practice 95%, Quest 100%, Challenge 100%)
 * Menerima data melalui Props: <MyScoreSection data={academicScoreData} theme={theme} />
 */
export default function MyScoreSection({ data, theme }) {
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
              {studentIdentity.course || 'Pemrograman Mobile 2'}
            </Text>
            <Text style={[styles.courseMeta, { color: currentTheme.textMuted }]}>
              Dosen: {studentIdentity.lecturer || 'Iin, M.Kom'}
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
              {studentIdentity.name || 'Febrian'}
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
            <Text style={[styles.infoValue, { color: currentTheme.textPrimary }]}>Masoem Univ</Text>
          </View>
        </View>
      </View>

      {/* 2. HERO SCORE & LEARNING POINTS (2 Kolom Menonjol & Mudah Dilihat) */}
      <View style={styles.scoreRow}>
        {/* CURRENT SCORE CARD (NILAI 90, GRADE A) */}
        <View style={styles.currentScoreCard}>
          <View style={styles.scoreTopRow}>
            <View style={styles.scoreLabelBadge}>
              <Text style={styles.scoreLabelText}>CURRENT SCORE</Text>
            </View>
            <View style={styles.gradeBadge}>
              <Text style={styles.gradeBadgeText}>GRADE {currentScore.grade || 'A'}</Text>
            </View>
          </View>

          <View style={styles.scoreNumberRow}>
            <Text style={styles.bigScoreNumber}>{currentScore.score || 90}</Text>
            <Text style={styles.scoreOutOf}>/ 100</Text>
          </View>

          <View style={styles.statusPill}>
            <Ionicons name="sparkles" size={12} color="#15803D" />
            <Text style={styles.statusPillText}>{currentScore.status || 'Sangat Memuaskan'}</Text>
          </View>
        </View>

        {/* LEARNING POINTS CARD (19,000 LP) */}
        <View style={styles.lpCard}>
          <View style={styles.lpTopRow}>
            <View style={styles.lpLabelBadge}>
              <Text style={styles.lpLabelText}>LEARNING POINTS</Text>
            </View>
            <Ionicons name="trophy" size={16} color="#D97706" />
          </View>

          <View style={styles.lpNumberRow}>
            <Text style={styles.bigLpNumber}>
              {Number(learningPoints.total || 19000).toLocaleString('id-ID')}
            </Text>
            <Text style={styles.lpUnit}>{learningPoints.unit || 'LP'}</Text>
          </View>

          <View style={styles.rankPill}>
            <Ionicons name="ribbon" size={12} color="#B45309" />
            <Text style={styles.rankPillText}>{learningPoints.rank || 'Top Tier Scholar'}</Text>
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
            4 Komponen Penilaian
          </Text>
        </View>

        <View style={styles.progressList}>
          {learningProgress.map((item) => (
            <View
              key={item.id || item.name}
              style={[
                styles.progressCard,
                {
                  backgroundColor: currentTheme.surfaceMuted,
                  borderColor: currentTheme.border,
                },
              ]}
            >
              {/* Header Baris: Icon, Nama Komponen, dan Persentase */}
              <View style={styles.progressCardHeader}>
                <View style={styles.progressLeft}>
                  <View style={[styles.progressIconBox, { backgroundColor: item.color + '1A' }]}>
                    <Ionicons name={item.icon || 'checkmark-circle'} size={18} color={item.color} />
                  </View>
                  <View>
                    <Text style={[styles.progressName, { color: currentTheme.textPrimary }]}>
                      {item.name}
                    </Text>
                    <Text style={[styles.progressLabel, { color: currentTheme.textMuted }]}>
                      {item.label}
                    </Text>
                  </View>
                </View>

                {/* Nilai Persentase Besar & Menonjol */}
                <View style={[styles.percentageBadge, { backgroundColor: item.color + '18' }]}>
                  <Text style={[styles.percentageText, { color: item.color }]}>
                    {item.percentage}%
                  </Text>
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
                      width: `${item.percentage}%`,
                      backgroundColor: item.color,
                    },
                  ]}
                />
              </View>

              {/* Rincian Keterangan Progres */}
              <Text style={[styles.progressDetails, { color: currentTheme.textSecondary }]}>
                {item.details}
              </Text>
            </View>
          ))}
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
  // 1. Identitas Akademik Card
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

  // 2. Score & LP Row (2 Kolom)
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
    fontSize: 40,
    fontWeight: '900',
    color: '#15803D',
    letterSpacing: -1,
  },
  scoreOutOf: {
    fontSize: 13,
    fontWeight: '600',
    color: '#166534',
    marginLeft: 4,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    gap: 4,
  },
  statusPillText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#15803D',
  },

  // Learning Points Card
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
    fontSize: 30,
    fontWeight: '900',
    color: '#B45309',
    letterSpacing: -0.5,
  },
  lpUnit: {
    fontSize: 12,
    fontWeight: '800',
    color: '#92400E',
    marginLeft: 3,
  },
  rankPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    gap: 4,
  },
  rankPillText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#92400E',
  },

  // 3. Learning Progress
  progressSection: {
    gap: SPACING.sm,
  },
  progressHeaderRow: {
    marginBottom: 2,
  },
  progressSectionTitle: {
    fontSize: 13,
    fontWeight: '800',
  },
  progressSectionSubtitle: {
    fontSize: 11,
    marginTop: 1,
  },
  progressList: {
    gap: 10,
  },
  progressCard: {
    borderRadius: 12,
    padding: SPACING.md,
    borderWidth: 1,
    gap: 8,
  },
  progressCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  progressIconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressName: {
    fontSize: 13,
    fontWeight: '700',
  },
  progressLabel: {
    fontSize: 11,
    marginTop: 1,
  },
  percentageBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  percentageText: {
    fontSize: 14,
    fontWeight: '800',
  },
  progressTrack: {
    height: 7,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressDetails: {
    fontSize: 11,
    fontStyle: 'italic',
  },
});

