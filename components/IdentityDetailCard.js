import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SectionHeading from './SectionHeading';
import { COLORS, SHADOWS, SPACING } from '../theme';

/**
 * IdentityDetailCard Component (Level 3 Layout & Timeline Styling)
 * Menampilkan:
 * 1. Riwayat Jenjang Pendidikan Vertikal Timeline (SD, SMP, SMA, Masoem Univ)
 * 2. Alamat & Domisili Lengkap
 */
export default function IdentityDetailCard({ profile }) {
  return (
    <View style={styles.container}>
      {/* SECTION: Riwayat Jenjang Pendidikan (Vertical Timeline Layout) */}
      <View style={styles.card}>
        <SectionHeading
          title="Riwayat Pendidikan"
          subtitle="Education Timeline (2011 — Sekarang)"
          icon="school"
          badgeText="Akademik"
        />

        <View style={styles.timelineContainer}>
          {profile.educationHistory.map((edu, index) => {
            const isLatest = index === 0;
            return (
              <View key={index} style={styles.timelineItem}>
                <View style={styles.timelineLeftCol}>
                  <View
                    style={[
                      styles.timelineDot,
                      isLatest ? styles.timelineDotActive : null,
                    ]}
                  />
                  {index < profile.educationHistory.length - 1 && (
                    <View style={styles.timelineLine} />
                  )}
                </View>
                <View style={styles.timelineContent}>
                  <View style={styles.timelineHeader}>
                    <Text
                      style={[
                        styles.educationSchool,
                        isLatest ? styles.activeSchoolText : null,
                      ]}
                    >
                      {edu.school}
                    </Text>
                    <Text style={styles.educationPeriod}>{edu.period}</Text>
                  </View>
                  <Text style={styles.educationLevel}>
                    {edu.level} {edu.major ? `• ${edu.major}` : ''}
                  </Text>
                  <Text style={styles.educationStatus}>Status: {edu.status}</Text>
                  {edu.description && (
                    <Text style={styles.educationDesc}>{edu.description}</Text>
                  )}
                </View>
              </View>
            );
          })}
        </View>
      </View>

      {/* SECTION: Alamat & Domisili */}
      <View style={styles.card}>
        <SectionHeading
          title="Alamat & Domisili"
          subtitle="Informasi Tempat Tinggal & Wilayah"
          icon="location"
          badgeText="Domisili"
        />

        <View style={styles.cardBody}>
          <Text style={styles.addressText}>{profile.address.fullAddress}</Text>

          <View style={styles.addressTags}>
            <View style={styles.tag}>
              <Ionicons name="home-outline" size={13} color={COLORS.textSecondary} />
              <Text style={styles.tagText}>{profile.address.village}</Text>
            </View>
            <View style={styles.tag}>
              <Ionicons name="map-outline" size={13} color={COLORS.textSecondary} />
              <Text style={styles.tagText}>{profile.address.subDistrict}</Text>
            </View>
            <View style={styles.tag}>
              <Ionicons name="navigate-outline" size={13} color={COLORS.textSecondary} />
              <Text style={styles.tagText}>{profile.address.district}</Text>
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
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    ...SHADOWS.md,
  },
  cardBody: {
    gap: SPACING.sm,
    marginTop: SPACING.xs,
  },
  addressText: {
    fontSize: 14,
    color: COLORS.textSecondary,
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
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  tagText: {
    fontSize: 12,
    color: COLORS.textSecondary,
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
    backgroundColor: '#CBD5E1',
    borderWidth: 2,
    borderColor: COLORS.surface,
    marginTop: 3,
    zIndex: 2,
  },
  timelineDotActive: {
    backgroundColor: COLORS.primary,
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  timelineLine: {
    position: 'absolute',
    top: 15,
    bottom: -20,
    width: 2,
    backgroundColor: COLORS.border,
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
    color: COLORS.textPrimary,
  },
  activeSchoolText: {
    color: COLORS.primary,
  },
  educationPeriod: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textMuted,
  },
  educationLevel: {
    fontSize: 13,
    color: COLORS.textSecondary,
    fontWeight: '500',
    marginBottom: 2,
  },
  educationStatus: {
    fontSize: 11,
    color: COLORS.textMuted,
    fontStyle: 'italic',
  },
  educationDesc: {
    fontSize: 11,
    color: COLORS.textMuted,
    lineHeight: 16,
    marginTop: 4,
  },
});
