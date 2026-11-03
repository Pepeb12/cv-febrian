import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import SectionHeading from './SectionHeading';
import { Theme, FONTS } from '../theme';

interface ExperienceItem {
  id?: string | number;
  role: string;
  organization: string;
  period: string;
  description: string;
  icon?: string;
  color?: string;
}

interface ExperienceTimelineProps {
  experiences?: ExperienceItem[];
  theme: Theme;
}

/**
 * ExperienceTimeline Component — Pengalaman & Organisasi (Vertical Glowing Timeline)
 */
export default function ExperienceTimeline({ experiences = [], theme }: ExperienceTimelineProps) {
  if (!experiences || experiences.length === 0) return null;
  const isDark = theme.isDark;

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.surface,
          borderColor: theme.border,
        },
      ]}
      accessibilityRole="region"
      accessibilityLabel="Pengalaman & Organisasi Mahasiswa"
    >
      <SectionHeading
        title="Pengalaman & Organisasi"
        subtitle="Aktivitas Kepemimpinan, Riset, & Proyek Akademik"
        icon="briefcase-outline"
        badgeText="Pengalaman"
        theme={theme}
      />

      <View style={styles.timelineContainer}>
        {experiences.map((exp, index) => {
          const isLatest = index === 0;
          const isLast = index === experiences.length - 1;

          return (
            <View key={exp.id || index} style={styles.timelineRow}>
              {/* Sisi Kiri: Garis Timeline Vertikal Bercahaya & Node Bulat Menyala */}
              <View style={styles.leftCol}>
                <View
                  style={[
                    styles.glowingNode,
                    {
                      backgroundColor: isLatest ? theme.primary : theme.surfaceSecondary,
                      borderColor: theme.primary,
                      ...Platform.select({
                        web: {
                          boxShadow: isLatest
                            ? '0 0 12px rgba(99, 102, 241, 0.6)'
                            : '0 0 6px rgba(99, 102, 241, 0.3)',
                        } as any,
                      }),
                    },
                  ]}
                >
                  <View style={[styles.innerNodeDot, { backgroundColor: '#FFFFFF' }]} />
                </View>
                {!isLast && (
                  <View
                    style={[
                      styles.glowingLine,
                      {
                        backgroundColor: theme.primary,
                        opacity: isDark ? 0.35 : 0.25,
                      },
                    ]}
                  />
                )}
              </View>

              {/* Sisi Kanan: Kartu Glassmorphism dengan Badge Tahun, Judul, Deskripsi */}
              <View
                style={[
                  styles.timelineItemCard,
                  {
                    backgroundColor: isDark ? 'rgba(22, 27, 51, 0.6)' : 'rgba(248, 250, 252, 0.85)',
                    borderColor: theme.border,
                  },
                ]}
              >
                {/* Badge Tahun di Bagian Atas */}
                <View style={styles.badgeRow}>
                  <View
                    style={[
                      styles.yearBadge,
                      {
                        backgroundColor: isDark ? 'rgba(99, 102, 241, 0.18)' : 'rgba(79, 70, 229, 0.1)',
                        borderColor: theme.primary,
                      },
                    ]}
                  >
                    <Text style={[styles.yearBadgeText, { color: theme.primary }]}>
                      {exp.period}
                    </Text>
                  </View>
                  <Text style={[styles.orgBadgeText, { color: theme.secondary }]}>
                    {exp.organization}
                  </Text>
                </View>

                {/* Judul Posisi / Role */}
                <Text style={[styles.roleTitle, { color: theme.textPrimary }]}>
                  {exp.role}
                </Text>

                {/* Deskripsi Asli */}
                <Text style={[styles.descText, { color: theme.textSecondary }]}>
                  {exp.description}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 22,
    padding: 24,
    borderWidth: 1,
    flex: 1,
    width: '100%',
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
  timelineContainer: {
    paddingLeft: 4,
    marginTop: 8,
  },
  timelineRow: {
    flexDirection: 'row',
    position: 'relative',
    marginBottom: 20,
  },
  leftCol: {
    width: 26,
    alignItems: 'center',
    position: 'relative',
  },
  glowingNode: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    marginTop: 8,
  },
  innerNodeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  glowingLine: {
    position: 'absolute',
    top: 24,
    bottom: -22,
    width: 2,
    zIndex: 1,
  },
  timelineItemCard: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginLeft: 12,
    gap: 6,
    ...Platform.select({
      web: {
        backdropFilter: 'blur(10px)',
      } as any,
    }),
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  yearBadge: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 999,
    borderWidth: 1,
  },
  yearBadgeText: {
    fontFamily: FONTS.bold,
    fontSize: 11,
    fontWeight: '700',
  },
  orgBadgeText: {
    fontFamily: FONTS.semiBold,
    fontSize: 11,
    fontWeight: '600',
  },
  roleTitle: {
    fontFamily: FONTS.bold,
    fontSize: 14.5,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  descText: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 2,
  },
});
