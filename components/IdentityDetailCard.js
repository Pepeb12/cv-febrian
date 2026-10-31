import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SectionHeading from './SectionHeading';
import { COLORS, SHADOWS, SPACING } from '../theme';

/**
 * IdentityDetailCard Component (Level 7: Theme Adaptable Education & Address)
 */
export default function IdentityDetailCard({ data, profile, theme }) {
  const student = data || profile;
  const currentTheme = theme || COLORS;

  if (!student) return null;

  return (
    <View style={styles.container}>
      {/* SECTION: Riwayat Jenjang Pendidikan (Vertical Timeline Layout) */}
      <View
        style={[
          styles.card,
          {
            backgroundColor: currentTheme.surface,
            borderColor: currentTheme.borderLight,
          },
        ]}
      >
        <SectionHeading
          title="Riwayat Pendidikan"
          subtitle="Education Timeline (2011 — Sekarang)"
          icon="school"
          badgeText="Akademik"
          theme={currentTheme}
        />

        <View style={styles.timelineContainer}>
          {student.educationHistory.map((edu, index) => {
            const isLatest = index === 0;
            return (
              <View key={index} style={styles.timelineItem}>
                <View style={styles.timelineLeftCol}>
                  <View
                    style={[
                      styles.timelineDot,
                      { backgroundColor: currentTheme.border, borderColor: currentTheme.surface },
                      isLatest ? { backgroundColor: currentTheme.primary } : null,
                    ]}
                  />
                  {index < student.educationHistory.length - 1 && (
                    <View style={[styles.timelineLine, { backgroundColor: currentTheme.border }]} />
                  )}
                </View>
                <View style={styles.timelineContent}>
                  <View style={styles.timelineHeader}>
                    <Text
                      style={[
                        styles.educationSchool,
                        { color: currentTheme.textPrimary },
                        isLatest ? { color: currentTheme.primary } : null,
                      ]}
                    >
                      {edu.school}
                    </Text>
                    <Text style={[styles.educationPeriod, { color: currentTheme.textMuted }]}>
                      {edu.period}
                    </Text>
                  </View>
                  <Text style={[styles.educationLevel, { color: currentTheme.textSecondary }]}>
                    {edu.level} {edu.major ? `• ${edu.major}` : ''}
                  </Text>
                  <Text style={[styles.educationStatus, { color: currentTheme.textMuted }]}>
                    Status: {edu.status}
                  </Text>
                  {edu.description && (
                    <Text style={[styles.educationDesc, { color: currentTheme.textMuted }]}>
                      {edu.description}
                    </Text>
                  )}
                </View>
              </View>
            );
          })}
        </View>
      </View>

      {/* SECTION: Alamat & Domisili */}
      <View
        style={[
          styles.card,
          {
            backgroundColor: currentTheme.surface,
            borderColor: currentTheme.borderLight,
          },
        ]}
      >
        <SectionHeading
          title="Alamat & Domisili"
          subtitle="Informasi Tempat Tinggal & Wilayah"
          icon="location"
          badgeText="Domisili"
          theme={currentTheme}
        />

        <View style={styles.cardBody}>
          <Text style={[styles.addressText, { color: currentTheme.textSecondary }]}>
            {student.address.fullAddress}
          </Text>

          <View style={styles.addressTags}>
            <View
              style={[
                styles.tag,
                {
                  backgroundColor: currentTheme.surfaceMuted,
                  borderColor: currentTheme.border,
                },
              ]}
            >
              <Ionicons name="home-outline" size={13} color={currentTheme.textSecondary} />
              <Text style={[styles.tagText, { color: currentTheme.textSecondary }]}>
                {student.address.village}
              </Text>
            </View>
            <View
              style={[
                styles.tag,
                {
                  backgroundColor: currentTheme.surfaceMuted,
                  borderColor: currentTheme.border,
                },
              ]}
            >
              <Ionicons name="map-outline" size={13} color={currentTheme.textSecondary} />
              <Text style={[styles.tagText, { color: currentTheme.textSecondary }]}>
                {student.address.subDistrict}
              </Text>
            </View>
            <View
              style={[
                styles.tag,
                {
                  backgroundColor: currentTheme.surfaceMuted,
                  borderColor: currentTheme.border,
                },
              ]}
            >
              <Ionicons name="navigate-outline" size={13} color={currentTheme.textSecondary} />
              <Text style={[styles.tagText, { color: currentTheme.textSecondary }]}>
                {student.address.district}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  card: {
    borderRadius: 16,
    padding: SPACING.lg,
    borderWidth: 1,
    ...SHADOWS.md,
  },
  cardBody: {
    gap: SPACING.sm,
    marginTop: SPACING.xs,
  },
  addressText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
  },
  addressTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
    marginTop: SPACING.xs,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
  },
  timelineContainer: {
    paddingLeft: 4,
    marginTop: SPACING.sm,
  },
  timelineItem: {
    flexDirection: 'row',
    position: 'relative',
    marginBottom: SPACING.lg,
  },
  timelineLeftCol: {
    width: 24,
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
    bottom: -20,
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
    fontSize: 14,
    fontWeight: '700',
  },
  educationPeriod: {
    fontSize: 12,
    fontWeight: '600',
  },
  educationLevel: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 2,
  },
  educationStatus: {
    fontSize: 11,
    fontStyle: 'italic',
  },
  educationDesc: {
    fontSize: 11,
    lineHeight: 16,
    marginTop: 4,
  },
});
