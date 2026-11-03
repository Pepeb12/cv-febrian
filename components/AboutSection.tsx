import React from 'react';
import { View, Text, StyleSheet, Image, useWindowDimensions, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SectionHeading from './SectionHeading';
import { Theme, FONTS } from '../theme';
import { SECTION_IMAGES } from '../data/sectionImages';

interface AboutComponentProps {
  data?: any;
  profile?: any;
  theme: Theme;
}

/**
 * AboutIntroCard — Layout Foto Ber-Badge (40% Kiri) + Konten Teks & KPI (60% Kanan)
 */
export function AboutIntroCard({ data, profile, theme }: AboutComponentProps) {
  const student = data || profile;
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1024;
  const isMobile = width < 768;

  if (!student) return null;
  const { deskripsi, introduction } = student;
  const isDark = theme.isDark;

  return (
    <View
      style={[
        styles.aboutCard,
        {
          backgroundColor: theme.surface,
          borderColor: theme.border,
          padding: isMobile ? 18 : 28,
        },
      ]}
    >
      <SectionHeading
        title="Tentang Saya"
        subtitle="Personal Introduction & Career Vision"
        icon="person-circle-outline"
        badgeText="Profil"
        theme={theme}
      />

      <View style={[styles.aboutLayoutRow, isDesktop ? styles.rowDesktop : styles.columnMobile]}>
        {/* ========================================================
            KIRI (40%): FOTO DENGAN HALO INDIGO & 3 FLOATING PILL BADGE
            ======================================================== */}
        <View style={[styles.visualLeftCol, isDesktop && styles.visualLeftColDesktop]}>
          {/* Indigo Halo Glow */}
          <View
            style={[
              styles.indigoHalo,
              {
                backgroundColor: isDark ? 'rgba(99, 102, 241, 0.25)' : 'rgba(79, 70, 229, 0.14)',
              },
            ]}
          />

          {/* Frame Foto Utama About */}
          <View
            style={[
              styles.photoFrame,
              {
                borderColor: theme.primary,
                backgroundColor: theme.surfaceMuted,
              },
            ]}
          >
            <Image
              source={SECTION_IMAGES.GAMBAR_2_ABOUT.source}
              style={styles.photoImg}
              resizeMode="cover"
            />
          </View>

          {/* 3 FLOATING PILL BADGES */}
          <View
            style={[
              styles.pillBadge,
              styles.pillTopLeft,
              {
                backgroundColor: theme.surface,
                borderColor: theme.border,
              },
            ]}
          >
            <View style={[styles.badgeDot, { backgroundColor: '#6366F1' }]} />
            <Text style={[styles.pillBadgeText, { color: theme.textPrimary }]}>
              {student.prodi || 'Sistem Informasi'}
            </Text>
          </View>

          <View
            style={[
              styles.pillBadge,
              styles.pillMiddleRight,
              {
                backgroundColor: theme.surface,
                borderColor: theme.border,
              },
            ]}
          >
            <View style={[styles.badgeDot, { backgroundColor: '#F59E0B' }]} />
            <Text style={[styles.pillBadgeText, { color: theme.textPrimary }]}>
              {student.kampus || 'Masoem University'}
            </Text>
          </View>

          <View
            style={[
              styles.pillBadge,
              styles.pillBottomLeft,
              {
                backgroundColor: theme.surface,
                borderColor: theme.border,
              },
            ]}
          >
            <View style={[styles.badgeDot, { backgroundColor: '#22C55E' }]} />
            <Text style={[styles.pillBadgeText, { color: theme.textPrimary }]}>
              Semester {student.semester || 5} • Reguler
            </Text>
          </View>
        </View>

        {/* ========================================================
            KANAN (60%): SUBJUDUL EMAS, HEADING, PARAGRAF, KUTIPAN & 3 KPI
            ======================================================== */}
        <View style={[styles.contentRightCol, isDesktop && styles.contentRightColDesktop]}>
          {/* Subjudul Emas */}
          <Text style={[styles.introSubheading, { color: theme.secondary }]}>
            PERKENALAN DIRI & VISI PROFESIONAL
          </Text>

          {/* Heading Perkenalan */}
          <Text style={[styles.introHeadline, { color: theme.textPrimary }]}>
            {introduction?.headline || `Halo! Saya ${student.nama}`}
          </Text>

          {/* Paragraf Utama */}
          <Text style={[styles.introBody, { color: theme.textSecondary }]}>
            {deskripsi || introduction?.summary}
          </Text>

          {introduction?.detailedBio && (
            <Text style={[styles.introBody, { color: theme.textSecondary }]}>
              {introduction.detailedBio}
            </Text>
          )}

          {/* Kutipan / Motto */}
          {introduction?.motto && (
            <View
              style={[
                styles.quoteContainer,
                {
                  backgroundColor: isDark ? 'rgba(30, 37, 70, 0.45)' : 'rgba(238, 242, 255, 0.65)',
                  borderLeftColor: theme.secondary,
                },
              ]}
            >
              <Ionicons name="chatbox-ellipses-outline" size={18} color={theme.secondary} />
              <Text style={[styles.quoteText, { color: theme.textPrimary }]}>
                {introduction.motto}
              </Text>
            </View>
          )}

          {/* 3 KPI / Info Cards Ringkas */}
          <View style={styles.kpiRow}>
            <View
              style={[
                styles.miniKpiCard,
                {
                  backgroundColor: isDark ? 'rgba(22, 27, 51, 0.8)' : 'rgba(241, 245, 249, 0.9)',
                  borderColor: theme.border,
                },
              ]}
            >
              <Text style={[styles.kpiNumber, { color: theme.primary }]}>3.84</Text>
              <Text style={[styles.kpiTitle, { color: theme.textSecondary }]}>IPK Kumulatif</Text>
            </View>

            <View
              style={[
                styles.miniKpiCard,
                {
                  backgroundColor: isDark ? 'rgba(22, 27, 51, 0.8)' : 'rgba(241, 245, 249, 0.9)',
                  borderColor: theme.border,
                },
              ]}
            >
              <Text style={[styles.kpiNumber, { color: theme.secondary }]}>92 SKS</Text>
              <Text style={[styles.kpiTitle, { color: theme.textSecondary }]}>SKS Tempuh</Text>
            </View>

            <View
              style={[
                styles.miniKpiCard,
                {
                  backgroundColor: isDark ? 'rgba(22, 27, 51, 0.8)' : 'rgba(241, 245, 249, 0.9)',
                  borderColor: theme.border,
                },
              ]}
            >
              <Text style={[styles.kpiNumber, { color: '#22C55E' }]}>Aktif</Text>
              <Text style={[styles.kpiTitle, { color: theme.textSecondary }]}>Status Kuliah</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

/**
 * SpecializationCard — Grid 4 Kolom Sejajar: Bidang Minat & Spesialisasi
 */
export function SpecializationCard({ data, profile, theme }: AboutComponentProps) {
  const student = data || profile;
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1024;
  const isTablet = width >= 768 && width < 1024;

  if (!student) return null;
  const fieldsOfInterest = student.fieldsOfInterest || [];
  const isDark = theme.isDark;

  return (
    <View
      style={[
        styles.aboutCard,
        {
          backgroundColor: theme.surface,
          borderColor: theme.border,
          width: '100%',
          padding: isDesktop ? 28 : 18,
        },
      ]}
    >
      <SectionHeading
        title="Bidang Minat & Spesialisasi"
        subtitle="Areas of Interest & Core Engineering Competencies"
        icon="sparkles-outline"
        badgeText="Spesialisasi"
        theme={theme}
      />

      {/* GRID 4 KOLOM SEJAJAR DI DESKTOP */}
      <View style={styles.grid4ColWrapper}>
        {fieldsOfInterest.map((item: any, index: number) => {
          const accentColor = item.accentColor || (index % 2 === 0 ? theme.primary : theme.secondary);
          return (
            <View
              key={item.id || index}
              style={[
                styles.specializationGlassCard,
                {
                  backgroundColor: isDark ? 'rgba(22, 27, 51, 0.75)' : 'rgba(248, 250, 252, 0.85)',
                  borderColor: theme.border,
                  width: isDesktop ? '23.5%' : isTablet ? '48.5%' : '100%',
                },
              ]}
            >
              {/* Kotak Ikon Glow di Pojok Kiri Atas */}
              <View
                style={[
                  styles.glowIconBox,
                  {
                    backgroundColor: isDark ? 'rgba(99, 102, 241, 0.15)' : 'rgba(79, 70, 229, 0.1)',
                    borderColor: accentColor,
                  },
                ]}
              >
                <Ionicons name={item.icon || 'code-slash-outline'} size={18} color={accentColor} />
              </View>

              <Text style={[styles.interestTitle, { color: theme.textPrimary }]}>
                {item.title}
              </Text>

              {item.category && (
                <Text style={[styles.interestCategory, { color: theme.secondary }]}>
                  {item.category}
                </Text>
              )}

              <Text style={[styles.interestDesc, { color: theme.textSecondary }]}>
                {item.description}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

/**
 * AboutEditorialImageCard — Backward-compatibility placeholder for older references
 */
export function AboutEditorialImageCard({ theme }: { theme: Theme }) {
  return null;
}

const styles = StyleSheet.create({
  aboutCard: {
    width: '100%',
    borderRadius: 22,
    borderWidth: 1,
    overflow: 'hidden',
    ...Platform.select({
      web: {
        backdropFilter: 'blur(16px)',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.12)',
      } as any,
      default: {
        elevation: 4,
      },
    }),
  },
  aboutLayoutRow: {
    width: '100%',
    gap: 28,
  },
  rowDesktop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  columnMobile: {
    flexDirection: 'column',
  },
  // Kiri 40%
  visualLeftCol: {
    position: 'relative',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 320,
  },
  visualLeftColDesktop: {
    flex: 4,
  },
  indigoHalo: {
    position: 'absolute',
    width: 250,
    height: 250,
    borderRadius: 125,
    ...Platform.select({
      web: { filter: 'blur(45px)' } as any,
    }),
  },
  photoFrame: {
    width: 220,
    height: 250,
    borderRadius: 20,
    borderWidth: 2,
    overflow: 'hidden',
    ...Platform.select({
      web: {
        boxShadow: '0 14px 34px rgba(0, 0, 0, 0.25)',
      } as any,
      default: {
        elevation: 6,
      },
    }),
  },
  photoImg: {
    width: '100%',
    height: '100%',
  },
  pillBadge: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
    borderWidth: 1,
    gap: 7,
    ...Platform.select({
      web: {
        backdropFilter: 'blur(12px)',
        boxShadow: '0 4px 14px rgba(0, 0, 0, 0.12)',
      } as any,
      default: {
        elevation: 4,
      },
    }),
  },
  badgeDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
  },
  pillBadgeText: {
    fontFamily: FONTS.semiBold,
    fontSize: 11.5,
    fontWeight: '600',
  },
  pillTopLeft: {
    top: 15,
    left: '2%',
  },
  pillMiddleRight: {
    top: '48%',
    right: '2%',
  },
  pillBottomLeft: {
    bottom: 15,
    left: '4%',
  },
  // Kanan 60%
  contentRightCol: {
    width: '100%',
    gap: 12,
  },
  contentRightColDesktop: {
    flex: 6,
  },
  introSubheading: {
    fontFamily: FONTS.bold,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  introHeadline: {
    fontFamily: FONTS.bold,
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: -0.3,
    lineHeight: 28,
  },
  introBody: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    lineHeight: 23,
  },
  quoteContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 14,
    borderRadius: 12,
    borderLeftWidth: 3,
    gap: 10,
    marginVertical: 4,
  },
  quoteText: {
    fontFamily: FONTS.medium,
    fontSize: 13,
    fontStyle: 'italic',
    lineHeight: 20,
    flex: 1,
  },
  kpiRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 8,
    flexWrap: 'wrap',
  },
  miniKpiCard: {
    flex: 1,
    minWidth: 100,
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },
  kpiNumber: {
    fontFamily: FONTS.extraBold,
    fontSize: 18,
    fontWeight: '800',
  },
  kpiTitle: {
    fontFamily: FONTS.medium,
    fontSize: 11,
    fontWeight: '500',
  },
  // GRID 4 KOLOM SPESIALISASI
  grid4ColWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    width: '100%',
    justifyContent: 'space-between',
  },
  specializationGlassCard: {
    padding: 18,
    borderRadius: 16,
    borderWidth: 1,
    gap: 10,
    minHeight: 180,
    ...Platform.select({
      web: {
        backdropFilter: 'blur(12px)',
        transition: 'transform 0.18s ease, border-color 0.18s ease' as any,
        cursor: 'default' as any,
      },
    }),
  },
  glowIconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      web: {
        boxShadow: '0 0 12px rgba(99, 102, 241, 0.2)',
      } as any,
    }),
  },
  interestTitle: {
    fontFamily: FONTS.bold,
    fontSize: 14.5,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  interestCategory: {
    fontFamily: FONTS.semiBold,
    fontSize: 11.5,
    fontWeight: '600',
    marginTop: -4,
  },
  interestDesc: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    lineHeight: 18,
  },
});
