import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SectionHeading from './SectionHeading';
import { SPACING, FONTS } from '../theme';
import { AcademicScoreData, ThemeColors } from '../types';

interface MyScoreSectionProps {
  data: AcademicScoreData | any;
  theme: ThemeColors | any;
}

/**
 * MyScoreSection Component (Minimalist Tech: Flat Cards, Scale 8px, Inter Typography, Dark Slate)
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
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 250);
    return () => clearTimeout(timer);
  }, []);

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
        icon="school-outline"
        badgeText="Grade A"
        theme={currentTheme}
      />

      {/* 1. KARTU IDENTITAS AKADEMIK */}
      <View
        style={[
          styles.identityCard,
          {
            backgroundColor: currentTheme.surfaceMuted,
            borderColor: currentTheme.borderLight,
          },
        ]}
      >
        <View style={styles.courseHeaderRow}>
          <View style={[styles.courseIconBox, { backgroundColor: currentTheme.surface, borderColor: currentTheme.borderLight }]}>
            <Ionicons name="book-outline" size={16} color={currentTheme.primary} />
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
                borderColor: currentTheme.borderLight,
              },
            ]}
          >
            <Text style={[styles.semesterText, { color: currentTheme.textSecondary }]}>
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
          <View style={[styles.dividerV, { backgroundColor: currentTheme.borderLight }]} />
          <View style={styles.infoCol}>
            <Text style={[styles.infoLabel, { color: currentTheme.textMuted }]}>NIM</Text>
            <Text style={[styles.infoValue, { color: currentTheme.textPrimary }]}>
              {studentIdentity.nim || '242505024'}
            </Text>
          </View>
          <View style={[styles.dividerV, { backgroundColor: currentTheme.borderLight }]} />
          <View style={styles.infoCol}>
            <Text style={[styles.infoLabel, { color: currentTheme.textMuted }]}>KAMPUS</Text>
            <Text style={[styles.infoValue, { color: currentTheme.textPrimary }]}>
              {studentIdentity.kampus || 'Masoem Univ'}
            </Text>
          </View>
        </View>
      </View>

      {/* 2. HERO SCORE & LEARNING POINTS (Minimalist Tech Flat Cards) */}
      <View style={styles.scoreRow}>
        {/* CURRENT SCORE CARD (NILAI 90, GRADE A) */}
        <View
          style={[
            styles.currentScoreCard,
            {
              backgroundColor: currentTheme.surfaceMuted,
              borderColor: currentTheme.borderLight,
            },
          ]}
        >
          <View style={styles.scoreTopRow}>
            <View
              style={[
                styles.scoreLabelBadge,
                { backgroundColor: currentTheme.surface, borderColor: currentTheme.borderLight },
              ]}
            >
              <Text style={[styles.scoreLabelText, { color: currentTheme.textSecondary }]}>
                CURRENT SCORE
              </Text>
            </View>
            <View
              style={[
                styles.gradeBadge,
                { backgroundColor: currentTheme.primary },
              ]}
            >
              <Text style={[styles.gradeBadgeText, { color: currentTheme.textInverted || '#FFFDF7' }]}>
                GRADE {currentScore.grade || 'A'}
              </Text>
            </View>
          </View>

          <View style={styles.scoreNumberRow}>
            <Text style={[styles.bigScoreNumber, { color: currentTheme.primary }]}>
              {currentScore.score ?? 90}
            </Text>
            <Text style={[styles.scoreOutOf, { color: currentTheme.textMuted }]}>/ 100</Text>
          </View>

          <View
            style={[
              styles.statusPill,
              { backgroundColor: currentTheme.surface, borderColor: currentTheme.borderLight },
            ]}
          >
            <Ionicons name="sparkles-outline" size={12} color={currentTheme.primary} />
            <Text style={[styles.statusPillText, { color: currentTheme.textSecondary }]}>
              {currentScore.status || 'Sangat Memuaskan'}
            </Text>
          </View>
        </View>

        {/* LEARNING POINTS CARD (19.000 LP) */}
        <View
          style={[
            styles.lpCard,
            {
              backgroundColor: currentTheme.surfaceMuted,
              borderColor: currentTheme.borderLight,
            },
          ]}
        >
          <View style={styles.lpTopRow}>
            <View
              style={[
                styles.lpLabelBadge,
                { backgroundColor: currentTheme.surface, borderColor: currentTheme.borderLight },
              ]}
            >
              <Text style={[styles.lpLabelText, { color: currentTheme.textSecondary }]}>
                LEARNING POINTS
              </Text>
            </View>
            <Ionicons name="trophy-outline" size={16} color={currentTheme.primary} />
          </View>

          <View style={styles.lpNumberRow}>
            <Text style={[styles.bigLpNumber, { color: currentTheme.primary }]}>
              {Number(learningPoints.total ?? 19000).toLocaleString('id-ID')}
            </Text>
            <Text style={[styles.lpUnit, { color: currentTheme.textMuted }]}>
              {learningPoints.unit || 'LP'}
            </Text>
          </View>

          <View
            style={[
              styles.rankPill,
              { backgroundColor: currentTheme.surface, borderColor: currentTheme.borderLight },
            ]}
          >
            <Ionicons name="ribbon-outline" size={12} color={currentTheme.primary} />
            <Text style={[styles.rankPillText, { color: currentTheme.textSecondary }]}>
              {learningPoints.rank || 'Top Tier Scholar'}
            </Text>
          </View>
        </View>
      </View>

      {/* 3. LEARNING PROGRESS SECTION */}
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
                          borderColor: currentTheme.borderLight,
                        },
                      ]}
                    >
                      <Ionicons name="checkmark-circle-outline" size={15} color={currentTheme.primary} />
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
                        borderColor: currentTheme.borderLight,
                      },
                    ]}
                  >
                    <Text style={[styles.percentageText, { color: currentTheme.primary }]}>
                      {pct}%
                    </Text>
                  </View>
                </View>

                {/* Progress Bar Minimalist */}
                <View
                  style={[
                    styles.progressBarTrack,
                    {
                      backgroundColor: currentTheme.progressTrack || (isDark ? '#3D3024' : '#E2D6BC'),
                      borderColor: currentTheme.borderLight,
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.progressBarFill,
                      {
                        width: isAnimated ? `${Math.min(Math.max(pct, 0), 100)}%` : '0%',
                        backgroundColor: currentTheme.progressFill || currentTheme.primary,
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
    borderRadius: SPACING.cardRadius, // 16px
    padding: SPACING.cardPadding, // 24px standardized card padding
    borderWidth: 1,
    marginBottom: SPACING.gap, // 20px standardized gap
    width: '100%',
  },
  identityCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: SPACING.md, // 16px
    marginBottom: SPACING.lg, // 24px
  },
  courseHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
    gap: SPACING.sm,
  },
  courseIconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  courseTitleCol: {
    flex: 1,
  },
  courseName: {
    fontFamily: FONTS.bold,
    fontSize: 14,
    fontWeight: '700',
  },
  courseMeta: {
    fontFamily: FONTS.regular,
    fontSize: 11.5,
    marginTop: 2,
  },
  semesterBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
  },
  semesterText: {
    fontFamily: FONTS.semiBold,
    fontSize: 10.5,
    fontWeight: '600',
  },
  studentInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: SPACING.md,
    borderTopWidth: 1,
  },
  infoCol: {
    flex: 1,
    alignItems: 'center',
  },
  dividerV: {
    width: 1,
    height: 24,
  },
  infoLabel: {
    fontFamily: FONTS.semiBold,
    fontSize: 9,
    fontWeight: '600',
    letterSpacing: 0.6,
    marginBottom: 2,
  },
  infoValue: {
    fontFamily: FONTS.bold,
    fontSize: 12,
    fontWeight: '700',
  },
  scoreRow: {
    flexDirection: 'row',
    gap: SPACING.md, // 16px
    marginBottom: SPACING.xl, // 32px (mb-8)
  },
  currentScoreCard: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    padding: SPACING.lg, // 24px
  },
  scoreTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  scoreLabelBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    borderWidth: 1,
  },
  scoreLabelText: {
    fontFamily: FONTS.semiBold,
    fontSize: 9.5,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  gradeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  gradeBadgeText: {
    fontFamily: FONTS.bold,
    fontSize: 10,
    fontWeight: '700',
  },
  scoreNumberRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
    marginVertical: SPACING.xs,
  },
  bigScoreNumber: {
    fontFamily: FONTS.black,
    fontSize: 36,
    fontWeight: '900',
    letterSpacing: -1,
  },
  scoreOutOf: {
    fontFamily: FONTS.regular,
    fontSize: 14,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    alignSelf: 'flex-start',
    marginTop: SPACING.xs,
  },
  statusPillText: {
    fontFamily: FONTS.medium,
    fontSize: 10.5,
    fontWeight: '500',
  },
  lpCard: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    padding: SPACING.lg, // 24px
  },
  lpTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  lpLabelBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    borderWidth: 1,
  },
  lpLabelText: {
    fontFamily: FONTS.semiBold,
    fontSize: 9.5,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  lpNumberRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
    marginVertical: SPACING.xs,
  },
  bigLpNumber: {
    fontFamily: FONTS.black,
    fontSize: 30,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  lpUnit: {
    fontFamily: FONTS.bold,
    fontSize: 12,
    fontWeight: '700',
  },
  rankPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    alignSelf: 'flex-start',
    marginTop: SPACING.xs,
  },
  rankPillText: {
    fontFamily: FONTS.medium,
    fontSize: 10.5,
    fontWeight: '500',
  },
  progressSection: {
    marginTop: SPACING.xs,
  },
  progressHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  progressSectionTitle: {
    fontFamily: FONTS.bold,
    fontSize: 13.5,
    fontWeight: '700',
  },
  progressSectionSubtitle: {
    fontFamily: FONTS.regular,
    fontSize: 11,
  },
  progressList: {
    gap: SPACING.md, // 16px (scale 8px)
  },
  progressCard: {
    padding: SPACING.md, // 16px
    borderRadius: 10,
    borderWidth: 1,
  },
  progressCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  progressLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    flex: 1,
  },
  progressIconBox: {
    width: 28,
    height: 28,
    borderRadius: 6,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressName: {
    fontFamily: FONTS.bold,
    fontSize: 13,
    fontWeight: '700',
  },
  progressLabel: {
    fontFamily: FONTS.regular,
    fontSize: 11,
    marginTop: 1,
  },
  percentageBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
  },
  percentageText: {
    fontFamily: FONTS.bold,
    fontSize: 11.5,
    fontWeight: '700',
  },
  progressBarTrack: {
    height: 6,
    borderRadius: 3,
    borderWidth: 1,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
    ...Platform.select({
      web: {
        transition: 'width 1.2s cubic-bezier(0.22, 1, 0.36, 1)' as any,
      },
    }),
  },
});
