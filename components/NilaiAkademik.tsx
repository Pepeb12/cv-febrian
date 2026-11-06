import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Theme, FONTS } from '../theme';

export interface AcademicIdentity {
  name?: string;
  fullName?: string;
  nim?: string;
  course?: string;
  courseCode?: string;
  lecturer?: string;
  semester?: number | string;
  academicYear?: string;
  university?: string;
}

export interface CurrentScore {
  score?: number;
  grade?: string;
  status?: string;
  description?: string;
}

export interface LearningPoints {
  total?: number;
  unit?: string;
  rank?: string;
  badgeTitle?: string;
}

export interface LearningProgressItem {
  id?: string;
  name: string;
  label?: string;
  percentage: number;
  icon?: string;
  color?: string;
  bgColor?: string;
  details?: string;
}

export interface AcademicScoreData {
  studentIdentity?: AcademicIdentity;
  currentScore?: CurrentScore;
  learningPoints?: LearningPoints;
  learningProgress?: LearningProgressItem[];
}

interface MyScoreSectionProps {
  data?: AcademicScoreData | any;
  theme: Theme;
}

/**
 * MyScoreSection Component — LEVEL 8 (Academic Dashboard & Capaian Belajar)
 * - Menerima data capaian akademik murni dari data/academicScore.json melalui Props
 * - Menampilkan Identitas Akademik lengkap (Nama, NIM, MK, Dosen Pengampu)
 * - Count-up smooth animation untuk Score (90) dan Learning Points (19.000 LP)
 * - Animated progress fill untuk Attendance, Practice, Quest, Challenge
 */
export default function MyScoreSection({ data = {}, theme }: MyScoreSectionProps) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const identity: AcademicIdentity = data.studentIdentity || {
    fullName: 'Febrian Iradatul Rahman',
    nim: '242505024',
    course: 'Pemrograman Mobile 2',
    lecturer: 'Iin, M.Kom',
    semester: 5,
    university: 'Masoem University',
  };

  const currentScore: CurrentScore = data.currentScore || {
    score: 90,
    grade: 'A',
    status: 'Sangat Memuaskan',
    description: 'Capaian akademik istimewa pada mata kuliah Pemrograman Mobile 2.',
  };

  const points: LearningPoints = data.learningPoints || {
    total: 19000,
    unit: 'LP',
    rank: 'Top Tier Scholar',
    badgeTitle: 'Elite Mobile Developer',
  };

  const progressList: LearningProgressItem[] = data.learningProgress || [
    { name: 'Attendance', label: 'Kehadiran Kuliah', percentage: 100, icon: 'calendar-outline', details: '8 dari 8 sesi hadir (100%)' },
    { name: 'Practice', label: 'Praktikum Coding', percentage: 95, icon: 'code-slash-outline', details: '19 dari 20 modul hands-on selesai' },
    { name: 'Quest', label: 'Tugas Mandiri & Kuis', percentage: 100, icon: 'trophy-outline', details: 'Seluruh evaluasi nilai maksimal' },
    { name: 'Challenge', label: 'Challenge Projek UTS', percentage: 100, icon: 'flame-outline', details: 'Penyelesaian projek UTS secara komprehensif' },
  ];

  const targetScore = currentScore.score ?? 90;
  const targetPoints = points.total ?? 19000;

  const [displayedScore, setDisplayedScore] = useState(0);
  const [displayedPoints, setDisplayedPoints] = useState(0);
  const [animatedProgress, setAnimatedProgress] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 1100;

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      setDisplayedScore(Math.round(ease * targetScore));
      setDisplayedPoints(Math.round(ease * targetPoints));

      if (progress >= 1) {
        clearInterval(timer);
        setDisplayedScore(targetScore);
        setDisplayedPoints(targetPoints);
      }
    }, 20);

    const progTimer = setTimeout(() => {
      setAnimatedProgress(true);
    }, 200);

    return () => {
      clearInterval(timer);
      clearTimeout(progTimer);
    };
  }, [targetScore, targetPoints]);

  return (
    <View
      {...(Platform.OS === 'web' ? { className: 'interactive-card scroll-reveal' } : {})}
      style={[
        styles.container,
        {
          backgroundColor: theme.surface,
          borderColor: theme.border,
          ...Platform.select({
            web: {
              scrollMarginTop: isMobile ? 95 : 85,
            } as any,
          }),
        },
      ]}
      accessibilityRole="region"
      accessibilityLabel="Dashboard Capaian Akademik My Score"
    >
      {/* HEADER SECTION */}
      <View
        style={styles.headerRow}
        {...(Platform.OS === 'web' ? { className: 'slide-up' } : {})}
      >
        <View style={[styles.headerIconBox, { backgroundColor: theme.surface2 }]}>
          <Ionicons name="school-outline" size={20} color={theme.primary} />
        </View>
        <View style={styles.headerTextGroup}>
          <Text style={[styles.sectionTitle, { color: theme.heading }]}>
            My Score & Capaian Akademik
          </Text>
          <Text style={[styles.sectionSubtitle, { color: theme.textSecondary }]}>
            Dashboard Evaluasi Capaian Pemrograman Mobile 2 & Learning Points
          </Text>
        </View>
      </View>

      {/* KARTU 1: IDENTITAS AKADEMIK RESMI */}
      <View
        {...(Platform.OS === 'web' ? { className: 'interactive-card fade-in-up' } : {})}
        style={[styles.identityCard, { backgroundColor: theme.surface2, borderColor: theme.border }]}
      >
        <View style={styles.identityTopRow}>
          <View style={[styles.courseIconBox, { backgroundColor: theme.surface, borderColor: theme.border }]}>
            <Ionicons name="book-outline" size={16} color={theme.primary} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.courseName, { color: theme.heading }]}>
              {identity.course || 'Pemrograman Mobile 2'}
            </Text>
            <Text style={[styles.courseLecturer, { color: theme.textSecondary }]}>
              Dosen Pengampu: {identity.lecturer || 'Iin, M.Kom'}
            </Text>
          </View>
          <View style={[styles.semesterBadge, { backgroundColor: theme.surface, borderColor: theme.border }]}>
            <Text style={[styles.semesterText, { color: theme.primary }]}>
              SMT {identity.semester || 5}
            </Text>
          </View>
        </View>

        <View style={[styles.identityGrid, { borderTopColor: theme.border }]}>
          <View style={styles.identityItem}>
            <Text style={[styles.identityItemLabel, { color: theme.textMuted }]}>NAMA MAHASISWA</Text>
            <Text style={[styles.identityItemValue, { color: theme.heading }]} numberOfLines={1}>
              {identity.fullName || identity.name || 'Febrian Iradatul Rahman'}
            </Text>
          </View>
          <View style={styles.identityItem}>
            <Text style={[styles.identityItemLabel, { color: theme.textMuted }]}>NIM RESMI</Text>
            <Text style={[styles.identityItemValue, { color: theme.primary }]} numberOfLines={1}>
              {identity.nim || '242505024'}
            </Text>
          </View>
          <View style={styles.identityItem}>
            <Text style={[styles.identityItemLabel, { color: theme.textMuted }]}>PERGURUAN TINGGI</Text>
            <Text style={[styles.identityItemValue, { color: theme.heading }]} numberOfLines={1}>
              {identity.university || 'Masoem University'}
            </Text>
          </View>
        </View>
      </View>

      {/* KARTU 2: CURRENT SCORE & LEARNING POINTS BANNER */}
      <View style={[styles.scoreBannerRow, isMobile && styles.scoreBannerRowMobile]}>
        {/* SCORE CARD */}
        <View
          {...(Platform.OS === 'web' ? { className: 'interactive-card fade-in-left' } : {})}
          style={[styles.scoreCard, { backgroundColor: theme.surface2, borderColor: theme.border }]}>
          <View style={styles.scoreCardHeader}>
            <Ionicons name="ribbon-outline" size={18} color={theme.primary} />
            <Text style={[styles.scoreCardLabel, { color: theme.textSecondary }]}>
              NILAI AKADEMIK
            </Text>
          </View>
          <View style={styles.scoreValuesRow}>
            <Text style={[styles.scoreNumber, { color: theme.heading }]}>
              {displayedScore}
            </Text>
            <View style={[styles.gradeBadge, { backgroundColor: theme.primary }]}>
              <Text style={[styles.gradeText, { color: theme.isDark ? '#25191D' : '#FFFFFF' }]}>
                Predikat {currentScore.grade || 'A'}
              </Text>
            </View>
          </View>
          <Text style={[styles.scoreStatus, { color: theme.success }]}>
            ● {currentScore.status || 'Sangat Memuaskan'}
          </Text>
        </View>

        {/* LEARNING POINTS CARD */}
        <View
          {...(Platform.OS === 'web' ? { className: 'interactive-card fade-in-right' } : {})}
          style={[styles.pointsCard, { backgroundColor: theme.surface2, borderColor: theme.border }]}>
          <View style={styles.scoreCardHeader}>
            <Ionicons name="sparkles-outline" size={18} color={theme.primary} />
            <Text style={[styles.scoreCardLabel, { color: theme.textSecondary }]}>
              POIN PEMBELAJARAN (LP)
            </Text>
          </View>
          <View style={styles.pointsValuesRow}>
            <Text style={[styles.pointsNumber, { color: theme.primary }]}>
              {Number(displayedPoints).toLocaleString('id-ID')}
            </Text>
            <Text style={[styles.pointsUnit, { color: theme.textSecondary }]}>
              {points.unit || 'LP'}
            </Text>
          </View>
          <View style={styles.pointsRankRow}>
            <Ionicons name="shield-checkmark" size={14} color={theme.primary} />
            <Text style={[styles.pointsRank, { color: theme.heading }]}>
              {points.rank || 'Mahasiswa Unggul'} • {points.badgeTitle || 'Pengembang Elit'}
            </Text>
          </View>
        </View>
      </View>

      {/* KARTU 3: LEARNING PROGRESS (ATTENDANCE, PRACTICE, QUEST, CHALLENGE) */}
      <View style={styles.progressSection}>
        <View style={styles.progressHeaderRow}>
          <Text style={[styles.progressSectionTitle, { color: theme.heading }]}>
            Indikator Capaian Belajar (Learning Progress)
          </Text>
          <Text style={[styles.progressSubtitle, { color: theme.textSecondary }]}>
            Evaluasi Berkelanjutan Semester Gasal
          </Text>
        </View>

        <View
          style={styles.progressGrid}
          {...(Platform.OS === 'web' ? { className: 'stagger-group' } : {})}
        >
          {progressList.map((item, idx) => {
            const pct = Math.min(Math.max(item.percentage ?? 0, 0), 100);
            const fillWidth = animatedProgress ? pct : 0;
            return (
              <View
                key={item.id || idx}
                {...(Platform.OS === 'web' ? { className: 'interactive-card' } : {})}
                style={[
                  styles.progressCard,
                  isMobile && styles.progressCardMobile,
                  {
                    backgroundColor: theme.surface2,
                    borderColor: theme.border,
                  },
                ]}
              >
                <View style={styles.progressCardTop}>
                  <View style={styles.progressTitleGroup}>
                    <Text style={[styles.progressName, { color: theme.heading }]}>
                      {item.name}
                    </Text>
                    {item.label && (
                      <Text style={[styles.progressLabel, { color: theme.textSecondary }]}>
                        {item.label}
                      </Text>
                    )}
                  </View>
                  <View style={[styles.pctBadge, { backgroundColor: theme.surface, borderColor: theme.border }]}>
                    <Text style={[styles.pctText, { color: theme.primary }]}>
                      {pct}%
                    </Text>
                  </View>
                </View>

                {/* Progress Bar Track & Animated Fill */}
                <View style={[styles.progressBarTrack, { backgroundColor: theme.surface, borderColor: theme.border }]}>
                  <View
                    style={[
                      styles.progressBarFill,
                      {
                        width: `${fillWidth}%`,
                        backgroundColor: theme.primary,
                      },
                    ]}
                  />
                </View>

                {item.details && (
                  <Text style={[styles.progressDetails, { color: theme.textMuted }]}>
                    {item.details}
                  </Text>
                )}
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
    borderRadius: 18,
    borderWidth: 1.2,
    padding: 20,
    width: '100%',
    gap: 16,
    ...Platform.select({
      web: {
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.25)',
      } as any,
      default: {
        elevation: 3,
      },
    }),
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTextGroup: {
    flex: 1,
    gap: 2,
  },
  sectionTitle: {
    fontFamily: FONTS.display,
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  sectionSubtitle: {
    fontFamily: FONTS.body,
    fontSize: 12.5,
  },
  identityCard: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 16,
    gap: 12,
  },
  identityTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  courseIconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  courseName: {
    fontFamily: FONTS.display,
    fontSize: 14.5,
    fontWeight: '700',
  },
  courseLecturer: {
    fontFamily: FONTS.body,
    fontSize: 12,
  },
  semesterBadge: {
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
  },
  semesterText: {
    fontFamily: FONTS.mono,
    fontSize: 11,
    fontWeight: '700',
  },
  identityGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    borderTopWidth: 1,
    paddingTop: 10,
  },
  identityItem: {
    flex: 1,
    minWidth: 120,
    gap: 2,
  },
  identityItemLabel: {
    fontFamily: FONTS.mono,
    fontSize: 9.5,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  identityItemValue: {
    fontFamily: FONTS.bodyMedium,
    fontSize: 13,
    fontWeight: '600',
  },
  scoreBannerRow: {
    flexDirection: 'row',
    gap: 14,
  },
  scoreBannerRowMobile: {
    flexDirection: 'column',
  },
  scoreCard: {
    flex: 1,
    borderRadius: 14,
    borderWidth: 1,
    padding: 16,
    gap: 8,
  },
  pointsCard: {
    flex: 1,
    borderRadius: 14,
    borderWidth: 1,
    padding: 16,
    gap: 8,
  },
  scoreCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  scoreCardLabel: {
    fontFamily: FONTS.mono,
    fontSize: 10.5,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  scoreValuesRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 10,
  },
  scoreNumber: {
    fontFamily: FONTS.display,
    fontSize: 34,
    fontWeight: '900',
    lineHeight: 38,
  },
  gradeBadge: {
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderRadius: 6,
  },
  gradeText: {
    fontFamily: FONTS.bold,
    fontSize: 12,
    fontWeight: '800',
  },
  scoreStatus: {
    fontFamily: FONTS.mono,
    fontSize: 11.5,
    fontWeight: '600',
  },
  pointsValuesRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
  },
  pointsNumber: {
    fontFamily: FONTS.display,
    fontSize: 30,
    fontWeight: '900',
    lineHeight: 36,
  },
  pointsUnit: {
    fontFamily: FONTS.mono,
    fontSize: 14,
    fontWeight: '700',
  },
  pointsRankRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  pointsRank: {
    fontFamily: FONTS.bodyMedium,
    fontSize: 11.5,
    fontWeight: '600',
  },
  progressSection: {
    gap: 10,
  },
  progressHeaderRow: {
    gap: 2,
    marginTop: 4,
  },
  progressSectionTitle: {
    fontFamily: FONTS.display,
    fontSize: 14,
    fontWeight: '700',
  },
  progressSubtitle: {
    fontFamily: FONTS.body,
    fontSize: 11.5,
  },
  progressGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  progressCard: {
    width: '48.8%',
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
    gap: 8,
  },
  progressCardMobile: {
    width: '100%',
  },
  progressCardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progressTitleGroup: {
    flex: 1,
    gap: 1,
  },
  progressName: {
    fontFamily: FONTS.bold,
    fontSize: 13,
    fontWeight: '700',
  },
  progressLabel: {
    fontFamily: FONTS.body,
    fontSize: 11,
  },
  pctBadge: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
  },
  pctText: {
    fontFamily: FONTS.mono,
    fontSize: 11,
    fontWeight: '700',
  },
  progressBarTrack: {
    width: '100%',
    height: 7,
    borderRadius: 999,
    borderWidth: 1,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 999,
    ...Platform.select({
      web: {
        transition: 'width 0.9s cubic-bezier(0.16, 1, 0.3, 1)' as any,
      },
    }),
  },
  progressDetails: {
    fontFamily: FONTS.mono,
    fontSize: 10.5,
  },
});
