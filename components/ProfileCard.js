import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SHADOWS, SPACING } from '../theme';

/**
 * ProfileCard Component (Level 7: Theme Adaptable Student ID Card)
 */
export default function ProfileCard({ data, profile, theme }) {
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
          <Text style={[styles.metaSeparator, { color: currentTheme.textLight }]}>•</Text>
          <View style={styles.metaItem}>
            <Ionicons name="calendar-outline" size={14} color={currentTheme.textMuted} />
            <Text style={[styles.metaText, { color: currentTheme.textSecondary }]}>
              Semester {student.semester}
            </Text>
          </View>
        </View>

        {/* Nama Kampus */}
        <View style={styles.universityRow}>
          <Ionicons name="business" size={14} color={currentTheme.textSecondary} />
          <Text style={[styles.universityText, { color: currentTheme.textSecondary }]}>
            {student.kampus || student.university}
          </Text>
        </View>

        {/* Status Mahasiswa Aktif Pill */}
        <View
          style={[
            styles.statusPill,
            {
              backgroundColor: currentTheme.successLight,
              borderColor: currentTheme.successBorder,
            },
          ]}
        >
          <View style={[styles.greenCircle, { backgroundColor: currentTheme.success }]} />
          <Text style={[styles.statusText, { color: currentTheme.success }]}>
            {student.status}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: SPACING.lg,
    borderWidth: 1,
    ...SHADOWS.md,
  },
  cardHeaderBanner: {
    height: 90,
  },
  cardContent: {
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
    paddingBottom: SPACING.xl,
    marginTop: -50,
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: SPACING.sm,
  },
  avatar: {
    width: 104,
    height: 104,
    borderRadius: 52,
    borderWidth: 4,
    backgroundColor: '#E2E8F0',
  },
  activeDot: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 3,
  },
  fullName: {
    fontSize: 21,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: SPACING.xs,
  },
  professionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: SPACING.md,
    borderRadius: 20,
    gap: 6,
    marginBottom: SPACING.xs,
    borderWidth: 1,
  },
  professionText: {
    fontSize: 12,
    fontWeight: '700',
  },
  taglineText: {
    fontSize: 12,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: SPACING.sm,
    paddingHorizontal: SPACING.sm,
  },
  nimContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 14,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: SPACING.md,
    gap: 6,
  },
  nimLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  nimValue: {
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.xs,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaSeparator: {
    fontSize: 14,
  },
  metaText: {
    fontSize: 13,
    fontWeight: '600',
  },
  universityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: SPACING.md,
  },
  universityText: {
    fontSize: 13,
    fontWeight: '600',
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    gap: 6,
  },
  greenCircle: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
  },
});
