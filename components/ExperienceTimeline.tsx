import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SectionHeading from './SectionHeading';
import { Theme, SPACING, SHADOWS, FONTS } from '../theme';

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
 * ExperienceTimeline Component (Level 7: Organizational & Academic Experience)
 * Styled with Emerald – Cream – White – Mint luxury palette & Lato fonts.
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
          const nodeColor = theme.primary;

          return (
            <View key={exp.id || index} style={styles.timelineItem}>
              {/* Sisi Kiri: Node Titik & Garis Penghubung */}
              <View style={styles.leftCol}>
                <View
                  style={[
                    styles.nodeCircle,
                    {
                      backgroundColor: theme.surfaceMuted,
                      borderColor: nodeColor,
                    },
                  ]}
                >
                  <View style={[styles.nodeDot, { backgroundColor: nodeColor }]} />
                </View>
                {!isLast && (
                  <View style={[styles.connectingLine, { backgroundColor: theme.border }]} />
                )}
              </View>

              {/* Sisi Kanan: Konten Pengalaman */}
              <View style={styles.contentCol}>
                <View style={styles.headerRow}>
                  <Text style={[styles.roleText, { color: theme.textPrimary }]}>
                    {exp.role}
                  </Text>
                  <Text style={[styles.periodText, { color: theme.textMuted }]}>
                    {exp.period}
                  </Text>
                </View>
                <Text style={[styles.orgText, { color: nodeColor }]}>
                  {exp.organization}
                </Text>
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
    borderRadius: 14,
    padding: SPACING.lg,
    borderWidth: 1,
    marginBottom: SPACING.md,
    ...SHADOWS.sm,
  },
  timelineContainer: {
    paddingLeft: 2,
    marginTop: SPACING.sm,
  },
  timelineItem: {
    flexDirection: 'row',
    position: 'relative',
    marginBottom: SPACING.md,
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
    bottom: -16,
    width: 1.5,
    zIndex: 1,
  },
  contentCol: {
    flex: 1,
    paddingLeft: 10,
    paddingBottom: 4,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
    flexWrap: 'wrap',
  },
  roleText: {
    fontFamily: FONTS.heading,
    fontSize: 12.5,
    fontWeight: '700',
    marginRight: 6,
  },
  periodText: {
    fontFamily: FONTS.body,
    fontSize: 10.5,
    fontWeight: '500',
  },
  orgText: {
    fontFamily: FONTS.heading,
    fontSize: 11.5,
    fontWeight: '700',
    marginBottom: 2,
  },
  descText: {
    fontFamily: FONTS.body,
    fontSize: 11,
    lineHeight: 16,
  },
});
