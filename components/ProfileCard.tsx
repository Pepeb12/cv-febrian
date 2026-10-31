import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SHADOWS, SPACING } from '../theme';
import { StudentProfile, ThemeColors } from '../types';

interface ProfileCardProps {
  data?: StudentProfile | any;
  profile?: StudentProfile | any;
  theme?: ThemeColors | any;
}

/**
 * ProfileCard Component (TSX: Theme Adaptable Student ID Card)
 */
export default function ProfileCard({ data, profile, theme }: ProfileCardProps) {
  const student = data || profile;
  const currentTheme = theme || COLORS;

  if (!student) return null;

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: currentTheme.surface,
          borderColor: currentTheme.borderLight,
        },
      ]}
      accessibilityRole="region"
      accessibilityLabel="Kartu Profil Mahasiswa"
    >
      {/* Background Banner Header */}
      <View
        style={[
          styles.cardHeaderBanner,
          { backgroundColor: currentTheme.cardHeaderBanner || currentTheme.primary },
        ]}
      />

      <View style={styles.cardContent}>
        {/* Foto Profil Mahasiswa (Persyaratan Level 1) */}
        <View style={styles.avatarWrapper}>
          <Image
            source={require('../assets/profile.png')}
            style={[styles.avatar, { borderColor: currentTheme.surface }]}
            resizeMode="cover"
            accessibilityLabel={`Foto profil ${student.nama || student.fullName}`}
          />
          {/* Active Status Indicator */}
          <View
            style={[
              styles.activeDot,
              { backgroundColor: currentTheme.success, borderColor: currentTheme.surface },
            ]}
          />
        </View>

        {/* Nama Lengkap Mahasiswa (Level 1) */}
        <Text style={[styles.fullName, { color: currentTheme.textPrimary }]}>
          {student.nama || student.fullName}
        </Text>

        {/* Profesi / Minat Utama (Level 2) */}
        <View
          style={[
            styles.professionContainer,
            {
              backgroundColor: currentTheme.primaryLight,
              borderColor: currentTheme.primaryBorder,
            },
          ]}
        >
          <Ionicons name="briefcase" size={14} color={currentTheme.primary} />
          <Text style={[styles.professionText, { color: currentTheme.primary }]}>
            {student.profesi || student.professionTitle}
          </Text>
        </View>

        {/* Personal Tagline */}
        {student.tagline && (
          <Text style={[styles.taglineText, { color: currentTheme.textMuted }]}>
            "{student.tagline}"
          </Text>
        )}

        {/* Badge NIM Mahasiswa (Level 1) */}
        <View
          style={[
            styles.nimContainer,
            {
              backgroundColor: currentTheme.isDark ? '#082F49' : '#F0F9FF',
              borderColor: currentTheme.isDark ? '#0284C7' : '#BAE6FD',
            },
          ]}
        >
          <Ionicons name="card-outline" size={15} color={currentTheme.accentCyan} />
          <Text style={[styles.nimLabel, { color: currentTheme.accentCyan }]}>NIM:</Text>
          <Text style={[styles.nimValue, { color: currentTheme.accentCyan }]}>{student.nim}</Text>
        </View>

        {/* Program Studi & Semester */}
        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Ionicons name="book-outline" size={14} color={currentTheme.textMuted} />
            <Text style={[styles.metaText, { color: currentTheme.textSecondary }]}>
              {student.prodi || student.studyProgram}
            </Text>
          </View>
          <View style={[styles.metaDivider, { backgroundColor: currentTheme.borderLight }]} />
          <View style={styles.metaItem}>
            <Ionicons name="school-outline" size={14} color={currentTheme.textMuted} />
            <Text style={[styles.metaText, { color: currentTheme.textSecondary }]}>
              Semester {student.semester}
            </Text>
          </View>
          <View style={[styles.metaDivider, { backgroundColor: currentTheme.borderLight }]} />
          <View style={styles.metaItem}>
            <Ionicons name="business-outline" size={14} color={currentTheme.textMuted} />
            <Text style={[styles.metaText, { color: currentTheme.textSecondary }]}>
              {student.kampus || student.university}
            </Text>
          </View>
        </View>

        {/* Alamat Domisili Lengkap */}
        {student.address && (
          <View
            style={[
              styles.addressBox,
              {
                backgroundColor: currentTheme.surfaceMuted,
                borderColor: currentTheme.borderLight,
              },
            ]}
          >
            <Ionicons name="location-outline" size={16} color={currentTheme.primary} />
            <Text style={[styles.addressText, { color: currentTheme.textSecondary }]}>
              {student.address.fullAddress}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    borderWidth: 1,
    overflow: 'hidden',
    ...SHADOWS.md,
    marginBottom: SPACING.lg,
  },
  cardHeaderBanner: {
    height: 70,
    width: '100%',
  },
  cardContent: {
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
    paddingBottom: SPACING.xl,
    marginTop: -45,
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: SPACING.md,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 4,
    backgroundColor: '#E2E8F0',
  },
  activeDot: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 3,
  },
  fullName: {
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: SPACING.xs,
    letterSpacing: -0.4,
  },
  professionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: 20,
    borderWidth: 1,
    gap: 6,
    marginBottom: SPACING.xs,
  },
  professionText: {
    fontSize: 12,
    fontWeight: '700',
  },
  taglineText: {
    fontSize: 12,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: SPACING.md,
    paddingHorizontal: SPACING.md,
  },
  nimContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: 12,
    borderWidth: 1,
    gap: 6,
    marginBottom: SPACING.md,
  },
  nimLabel: {
    fontSize: 11,
    fontWeight: '700',
  },
  nimValue: {
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 1.2,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaDivider: {
    width: 1,
    height: 14,
  },
  metaText: {
    fontSize: 11,
    fontWeight: '600',
  },
  addressBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 10,
    borderWidth: 1,
    gap: 8,
    width: '100%',
  },
  addressText: {
    fontSize: 11,
    lineHeight: 16,
    flex: 1,
    fontWeight: '500',
  },
});
