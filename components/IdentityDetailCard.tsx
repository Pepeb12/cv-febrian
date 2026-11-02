import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SectionHeading from './SectionHeading';
import { COLORS, SPACING, FONTS } from '../theme';

interface IdentityDetailCardProps {
  data?: any;
  profile?: any;
  theme?: any;
}

/**
 * IdentityDetailCard Component (Riwayat Pendidikan - Education Timeline)
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
                        backgroundColor: isLatest ? currentTheme.textPrimary : currentTheme.surfaceMuted,
                        borderColor: isLatest ? currentTheme.textPrimary : currentTheme.borderLight,
                      },
                    ]}
                  />
                  {index < educationList.length - 1 && (
                    <View style={[styles.timelineLine, { backgroundColor: currentTheme.borderLight }]} />
                  )}
                </View>
                <View style={styles.timelineContent}>
                  <View style={styles.timelineHeader}>
                    {/* H3 HEADING */}
                    <Text
                      style={[
                        styles.educationSchool,
                        { color: currentTheme.textPrimary },
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
    marginBottom: 0,
    width: '100%',
    flex: 1,
  },
  card: {
    borderRadius: SPACING.cardRadius,
    padding: SPACING.cardPadding,
    borderWidth: 1,
    flex: 1,
    justifyContent: 'flex-start',
  },
  timelineContainer: {
    paddingLeft: 4,
    marginTop: SPACING.sm,
    flex: 1,
  },
  timelineItem: {
    flexDirection: 'row',
    position: 'relative',
    marginBottom: SPACING.lg,
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
    bottom: -24,
    width: 1.5,
    zIndex: 1,
  },
  timelineContent: {
    flex: 1,
    paddingLeft: SPACING.md,
  },
  timelineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  educationSchool: {
    fontFamily: FONTS.bold,
    fontSize: 14.5,
    fontWeight: '700',
  },
  educationPeriod: {
    fontFamily: FONTS.semiBold,
    fontSize: 11.5,
    fontWeight: '600',
  },
  educationLevel: {
    fontFamily: FONTS.medium,
    fontSize: 12.5,
    fontWeight: '500',
    marginBottom: 2,
  },
  educationDesc: {
    fontFamily: FONTS.regular,
    fontSize: 11.5,
    lineHeight: 17,
  },
});
