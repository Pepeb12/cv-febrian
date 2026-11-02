import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SectionHeading from './SectionHeading';
import { Theme, SPACING, FONTS } from '../theme';

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
 * ExperienceTimeline Component (Minimalist Tech: Flat, Scale 8px, Inter)
 */
export default function ExperienceTimeline({ experiences = [], theme }: ExperienceTimelineProps) {
  if (!experiences || experiences.length === 0) return null;

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.surface,
          borderColor: theme.border,
        },
      ]}
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
          const isLast = index === experiences.length - 1;

          return (
            <View key={exp.id || index} style={styles.timelineItem}>
              {/* Sisi Kiri: Node Titik & Garis Penghubung */}
              <View style={styles.leftCol}>
                <View
                  style={[
                    styles.nodeCircle,
                    {
                      backgroundColor: theme.surfaceMuted,
                      borderColor: theme.textPrimary,
                    },
                  ]}
                >
                  <View style={[styles.nodeDot, { backgroundColor: theme.textPrimary }]} />
                </View>
                {!isLast && (
                  <View style={[styles.connectingLine, { backgroundColor: theme.border }]} />
                )}
              </View>

              {/* Sisi Kanan: Konten Pengalaman */}
              <View style={styles.contentCol}>
                <View style={styles.headerRow}>
                  {/* H3 HEADING */}
                  <Text style={[styles.roleText, { color: theme.textPrimary }]}>
                    {exp.role}
                  </Text>
                  <Text style={[styles.periodText, { color: theme.textMuted }]}>
                    {exp.period}
                  </Text>
                </View>
                <Text style={[styles.orgText, { color: theme.textSecondary }]}>
                  {exp.organization}
                </Text>
                <Text style={[styles.descText, { color: theme.textMuted }]}>
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
    borderRadius: 14,
    padding: SPACING.xl, // 32px (Scale 8px: mb-8, py-8)
    borderWidth: 1,
    marginBottom: SPACING.xl, // 32px (mb-8)
  },
  timelineContainer: {
    paddingLeft: 2,
    marginTop: SPACING.sm,
  },
  timelineItem: {
    flexDirection: 'row',
    position: 'relative',
    marginBottom: SPACING.lg, // 24px
  },
  leftCol: {
    width: 22,
    alignItems: 'center',
  },
  nodeCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  nodeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  connectingLine: {
    position: 'absolute',
    top: 16,
    bottom: -24,
    width: 1.5,
    zIndex: 1,
  },
  contentCol: {
    flex: 1,
    paddingLeft: SPACING.md, // 16px
    paddingBottom: SPACING.xs,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
    flexWrap: 'wrap',
  },
  roleText: {
    fontFamily: FONTS.bold,
    fontSize: 13.5,
    fontWeight: '700',
    marginRight: 6,
  },
  periodText: {
    fontFamily: FONTS.regular,
    fontSize: 11.5,
  },
  orgText: {
    fontFamily: FONTS.semiBold,
    fontSize: 12.5,
    fontWeight: '600',
    marginBottom: 4,
  },
  descText: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    lineHeight: 18,
  },
});
