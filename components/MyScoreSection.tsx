import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SectionHeading from './SectionHeading';
import { SHADOWS, SPACING, FONTS } from '../theme';
import { AcademicScoreData, ThemeColors } from '../types';

interface MyScoreSectionProps {
  data: AcademicScoreData | any;
  theme: ThemeColors | any;
}

/**
 * MyScoreSection Component (Materi LEVEL 8 — EXPERT: My Score & Academic Dashboard in TSX)
 * Styled with Emerald – Cream – White – Mint luxury palette & Lato fonts.
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
  const isDark = currentTheme.isDark;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: currentTheme.surface,
          borderColor: currentTheme.border,
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

      {/* 1. KARTU IDENTITAS AKADEMIK */}
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
          <View style={[styles.courseIconBox, { backgroundColor: currentTheme.primary }]}>
            <Ionicons name="book-outline" size={17} color={isDark ? '#041812' : '#FFFFFF'} />
          </View>
          <View style={styles.courseTitleCol}>
            <Text style={[styles.courseName, { color: currentTheme.textPrimary }]}>
              {studentIdentity.course || studentIdentity.mataKuliah || 'Pemrograman Mobile 2'}
            </Text>
            <Text style={[styles.courseMeta, { color: currentTheme.textMuted }]}>
              Dosen: {studentIdentity.lecturer || studentIdentity.dosen || 'Iin, M.Kom'}
            </Text>
          </View>
          <View
            style={[
              styles.semesterBadge,
              {
                backgroundColor: currentTheme.surface,
                borderColor: currentTheme.border,
              },
            ]}
          >
            <Text style={[styles.semesterText, { color: currentTheme.primary }]}>
              Semester {studentIdentity.semester || 5}
            </Text>
          </View>
        </View>

        {/* Baris Identitas Mahasiswa */}
        <View style={[styles.studentInfoRow, { borderTopColor: currentTheme.borderLight }]}>
          <View style={styles.infoCol}>
            <Text style={[styles.infoLabel, { color: currentTheme.textMuted }]}>MAHASISWA</Text>
            <Text style={[styles.infoValue, { color: currentTheme.textPrimary }]}>
              {studentIdentity.name || studentIdentity.nama || 'Febrian'}
            </Text>
          </View>
          <View style={[styles.dividerV, { backgroundColor: currentTheme.border }]} />
          <View style={styles.infoCol}>
            <Text style={[styles.infoLabel, { color: currentTheme.textMuted }]}>NIM</Text>
            <Text style={[styles.infoValue, { color: currentTheme.primary }]}>
              {studentIdentity.nim || '242505024'}
            </Text>
          </View>
          <View style={[styles.dividerV, { backgroundColor: currentTheme.border }]} />
          <View style={styles.infoCol}>
            <Text style={[styles.infoLabel, { color: currentTheme.textMuted }]}>KAMPUS</Text>
            <Text style={[styles.infoValue, { color: currentTheme.textPrimary }]}>
              {studentIdentity.kampus || 'Masoem Univ'}
            </Text>
          </View>
        </View>
      </View>

      {/* 2. HERO SCORE & LEARNING POINTS (Emerald & Cream Elegan) */}
      <View style={styles.scoreRow}>
        {/* CURRENT SCORE CARD (NILAI 90, GRADE A) */}
        <View
          style={[
            styles.currentScoreCard,
            {
              backgroundColor: isDark ? '#063B2C' : '#065F46',
              borderColor: '#A7F3D0',
            },
          ]}
        >
          <View style={styles.scoreTopRow}>
            <View style={styles.scoreLabelBadge}>
              <Text style={styles.scoreLabelText}>CURRENT SCORE</Text>
            </View>
            <View style={styles.gradeBadge}>
              <Text style={styles.gradeBadgeText}>GRADE {currentScore.grade || 'A'}</Text>
            </View>
          </View>

          <View style={styles.scoreNumberRow}>
            <Text style={styles.bigScoreNumber}>
              {currentScore.score ?? 90}
            </Text>
            <Text style={styles.scoreOutOf}>/ 100</Text>
          </View>

          <View style={styles.statusPill}>
            <Ionicons name="sparkles" size={11} color="#A7F3D0" />
            <Text style={styles.statusPillText}>
              {currentScore.status || 'Sangat Memuaskan'}
            </Text>
          </View>
        </View>

        {/* LEARNING POINTS CARD (19.000 LP) */}
        <View
          style={[
            styles.lpCard,
            {
              backgroundColor: isDark ? '#10392D' : '#F5F5DC',
              borderColor: currentTheme.border,
            },
          ]}
        >
          <View style={styles.lpTopRow}>
            <View
              style={[
                styles.lpLabelBadge,
                {
                  backgroundColor: isDark ? '#062F24' : '#FFFFFF',
                  borderColor: currentTheme.border,
                },
              ]}
            >
              <Text style={[styles.lpLabelText, { color: currentTheme.primary }]}>
                LEARNING POINTS
              </Text>
            </View>
            <Ionicons name="trophy-outline" size={15} color={currentTheme.primary} />
          </View>

          <View style={styles.lpNumberRow}>
            <Text style={[styles.bigLpNumber, { color: currentTheme.textPrimary }]}>
              {Number(learningPoints.total ?? 19000).toLocaleString('id-ID')}
            </Text>
            <Text style={[styles.lpUnit, { color: currentTheme.primary }]}>
              {learningPoints.unit || 'LP'}
            </Text>
          </View>

          <View
            style={[
              styles.rankPill,
              {
                backgroundColor: isDark ? '#062F24' : '#FFFFFF',
                borderColor: currentTheme.border,
              },
            ]}
          >
            <Ionicons name="ribbon-outline" size={12} color={currentTheme.primary} />
            <Text style={[styles.rankPillText, { color: currentTheme.textPrimary }]}>
              {learningPoints.rank || 'Top Tier Scholar'}
            </Text>
          </View>
        </View>
      </View>

      {/* 3. LEARNING PROGRESS SECTION (Attendance, Practice, Quest, Challenge) */}
      <View style={styles.progressSection}>
        <View style={styles.progressHeaderRow}>
          <Text style={[styles.progressSectionTitle, { color: currentTheme.textPrimary }]}>
            Indikator Capaian Belajar
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
            const barColor = currentTheme.primary;

            return (
              <View
                key={item.id || label}
                style={[
                  styles.progressCard,
                  {
                    backgroundColor: currentTheme.surfaceMuted,
                    borderColor: currentTheme.borderLight,
                  },
                ]}
              >
                {/* Header Baris */}
                <View style={styles.progressCardHeader}>
                  <View style={styles.progressLeft}>
                    <View
                      style={[
                        styles.progressIconBox,
                        {
                          backgroundColor: currentTheme.surface,
                          borderColor: currentTheme.border,
                        },
                      ]}
                    >
                      <Ionicons name="checkmark-circle" size={16} color={currentTheme.primary} />
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

                  <View
                    style={[
                      styles.percentageBadge,
                      {
                        backgroundColor: currentTheme.surface,
                        borderColor: currentTheme.border,
                      },
                    ]}
                  >
                    <Text style={[styles.percentageText, { color: currentTheme.primary }]}>
                      {pct}%
                    </Text>
                  </View>
                </View>

                {/* Visual Progress Bar Flexbox */}
                <View
                  style={[
                    styles.progressBarTrack,
                    {
                      backgroundColor: currentTheme.surface,
                      borderColor: currentTheme.borderLight,
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.progressBarFill,
                      {
                        width: `${Math.min(Math.max(pct, 0), 100)}%`,
                        backgroundColor: barColor,
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
    ...SHADOWS.sm,
  },
  identityCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  courseHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
    gap: 10,
  },
  courseIconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  courseTitleCol: {
    flex: 1,
  },
  courseName: {
    fontFamily: FONTS.heading,
    fontSize: 13.5,
    fontWeight: '700',
  },
  courseMeta: {
    fontFamily: FONTS.body,
    fontSize: 11,
    marginTop: 1,
  },
  semesterBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
  },
  semesterText: {
    fontFamily: FONTS.heading,
    fontSize: 10,
    fontWeight: '700',
  },
  studentInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
    borderTopWidth: 1,
  },
  infoCol: {
    flex: 1,
    alignItems: 'center',
  },
  dividerV: {
    width: 1,
    height: 22,
  },
  infoLabel: {
    fontFamily: FONTS.heading,
    fontSize: 8.5,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  infoValue: {
    fontFamily: FONTS.heading,
    fontSize: 11.5,
    fontWeight: '700',
  },
  scoreRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: SPACING.md,
  },
  currentScoreCard: {
    flex: 1,
    borderRadius: 14,
    borderWidth: 1.5,
    padding: 12,
    ...SHADOWS.sm,
  },
  scoreTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  scoreLabelBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  scoreLabelText: {
    fontFamily: FONTS.heading,
    color: '#A7F3D0',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  gradeBadge: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  gradeBadgeText: {
    fontFamily: FONTS.heading,
    color: '#065F46',
    fontSize: 9.5,
    fontWeight: '700',
  },
  scoreNumberRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
    marginVertical: 4,
  },
  bigScoreNumber: {
    fontFamily: FONTS.heading,
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -1,
  },
  scoreOutOf: {
    fontFamily: FONTS.body,
    fontSize: 13,
    color: '#A7F3D0',
    fontWeight: '400',
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  statusPillText: {
    fontFamily: FONTS.heading,
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  lpCard: {
    flex: 1,
    borderRadius: 14,
    borderWidth: 1,
    padding: 12,
    ...SHADOWS.sm,
  },
  lpTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  lpLabelBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
  },
  lpLabelText: {
    fontFamily: FONTS.heading,
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  lpNumberRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
    marginVertical: 4,
  },
  bigLpNumber: {
    fontFamily: FONTS.heading,
    fontSize: 26,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  lpUnit: {
    fontFamily: FONTS.heading,
    fontSize: 12,
    fontWeight: '700',
  },
  rankPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  rankPillText: {
    fontFamily: FONTS.heading,
    fontSize: 10,
    fontWeight: '700',
  },
  progressSection: {
    marginTop: 4,
  },
  progressHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressSectionTitle: {
    fontFamily: FONTS.heading,
    fontSize: 12.5,
    fontWeight: '700',
  },
  progressSectionSubtitle: {
    fontFamily: FONTS.body,
    fontSize: 10.5,
  },
  progressList: {
    gap: 8,
  },
  progressCard: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
  },
  progressCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
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
    borderRadius: 7,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressName: {
    fontFamily: FONTS.heading,
    fontSize: 12,
    fontWeight: '700',
  },
  progressLabel: {
    fontFamily: FONTS.body,
    fontSize: 10,
    marginTop: 1,
  },
  percentageBadge: {
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
  },
  percentageText: {
    fontFamily: FONTS.heading,
    fontSize: 11,
    fontWeight: '700',
  },
  progressBarTrack: {
    height: 6,
    borderRadius: 3,
    borderWidth: 0.5,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
});
