import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SectionHeading from './SectionHeading';
import { COLORS, SHADOWS, SPACING, FONTS } from '../theme';

interface IdentityDetailCardProps {
  data?: any;
  profile?: any;
  theme?: any;
}

/**
 * IdentityDetailCard Component (Level 6: Local JSON Data Showcase)
 * Styled with Emerald – Cream – White – Mint luxury palette & Lato fonts.
 */
export default function IdentityDetailCard({ data, profile, theme }: IdentityDetailCardProps) {
  const student = data || profile;
  const currentTheme = theme || COLORS;

  if (!student) return null;

  const educationList = student.educationHistory || student.education || [];

  return (
    <View style={styles.container}>
      {/* SECTION: Riwayat Jenjang Pendidikan (Vertical Timeline Layout) */}
      <View
        style={[
          styles.card,
          {
            backgroundColor: currentTheme.surface,
            borderColor: currentTheme.border,
          },
        ]}
      >
        <SectionHeading
          title="Riwayat Pendidikan"
          subtitle="Education Timeline (2011 — Sekarang)"
          icon="school-outline"
          badgeText="Akademik"
          theme={currentTheme}
        />

        <View style={styles.timelineContainer}>
          {educationList.map((edu: any, index: number) => {
            const isLatest = index === 0;
            return (
              <View key={index} style={styles.timelineItem}>
                <View style={styles.timelineLeftCol}>
                  <View
                    style={[
                      styles.timelineDot,
                      {
                        backgroundColor: isLatest ? currentTheme.primary : currentTheme.surfaceMuted,
                        borderColor: isLatest ? '#A7F3D0' : currentTheme.border,
                      },
                    ]}
                  />
                  {index < educationList.length - 1 && (
                    <View style={[styles.timelineLine, { backgroundColor: currentTheme.border }]} />
                  )}
                </View>
                <View style={styles.timelineContent}>
                  <View style={styles.timelineHeader}>
                    <Text
                      style={[
                        styles.educationSchool,
                        { color: isLatest ? currentTheme.primary : currentTheme.textPrimary },
                      ]}
                    >
                      {edu.school || edu.institution}
                    </Text>
                    <Text style={[styles.educationPeriod, { color: currentTheme.textMuted }]}>
                      {edu.period}
                    </Text>
                  </View>
                  <Text style={[styles.educationLevel, { color: currentTheme.textSecondary }]}>
                    {edu.level} {edu.major ? `• ${edu.major}` : ''}
                  </Text>
                  <Text style={[styles.educationDesc, { color: currentTheme.textMuted }]}>
                    {edu.description}
                  </Text>
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
    marginBottom: SPACING.md,
    width: '100%',
  },
  card: {
    borderRadius: 14,
    padding: SPACING.lg,
    borderWidth: 1,
    ...SHADOWS.sm,
  },
  timelineContainer: {
    paddingLeft: 4,
    marginTop: SPACING.sm,
  },
  timelineItem: {
    flexDirection: 'row',
    position: 'relative',
    marginBottom: SPACING.md,
  },
  timelineLeftCol: {
    width: 22,
    alignItems: 'center',
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    marginTop: 3,
    zIndex: 2,
  },
  timelineLine: {
    position: 'absolute',
    top: 15,
    bottom: -16,
    width: 2,
    zIndex: 1,
  },
  timelineContent: {
    flex: 1,
    paddingLeft: 10,
  },
  timelineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  educationSchool: {
    fontFamily: FONTS.heading,
    fontSize: 13,
    fontWeight: '700',
  },
  educationPeriod: {
    fontFamily: FONTS.body,
    fontSize: 11,
    fontWeight: '500',
  },
  educationLevel: {
    fontFamily: FONTS.heading,
    fontSize: 11.5,
    fontWeight: '700',
    marginBottom: 2,
  },
  educationDesc: {
    fontFamily: FONTS.body,
    fontSize: 11,
    lineHeight: 16,
    marginTop: 2,
  },
});
