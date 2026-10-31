import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SHADOWS, SPACING } from '../theme';

/**
 * ProfileCard Component (Level 5: Separation of UI and Data)
 * Menerima seluruh data melalui Props `data` (atau `profile`) tanpa data hardcoded.
 */
export default function ProfileCard({ data, profile }) {
  // Dukungan fleksibel untuk prop `data` (sesuai spesifikasi Level 5) maupun `profile`
  const student = data || profile;

  if (!student) return null;

  return (
    <View style={styles.card}>
      {/* Background Banner Header */}
      <View style={styles.cardHeaderBanner} />

      <View style={styles.cardContent}>
        {/* Foto Profil Mahasiswa (Persyaratan Level 1) */}
        <View style={styles.avatarWrapper}>
          <Image
            source={require('../assets/profile.png')}
            style={styles.avatar}
            resizeMode="cover"
          />
          {/* Active Status Indicator */}
          <View style={styles.activeDot} />
        </View>

        {/* Nama Lengkap Mahasiswa (Level 1) */}
        <Text style={styles.fullName}>{student.nama || student.fullName}</Text>

        {/* Profesi / Minat Utama (Level 2) */}
        <View style={styles.professionContainer}>
          <Ionicons name="briefcase" size={14} color={COLORS.primary} />
          <Text style={styles.professionText}>{student.profesi || student.professionTitle}</Text>
        </View>

        {/* Personal Tagline */}
        {student.tagline && (
          <Text style={styles.taglineText}>"{student.tagline}"</Text>
        )}

        {/* Badge NIM Mahasiswa (Level 1) */}
        <View style={styles.nimContainer}>
          <Ionicons name="card-outline" size={15} color={COLORS.accentCyan} />
          <Text style={styles.nimLabel}>NIM:</Text>
          <Text style={styles.nimValue}>{student.nim}</Text>
        </View>

        {/* Program Studi & Semester */}
        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Ionicons name="book-outline" size={14} color={COLORS.textMuted} />
            <Text style={styles.metaText}>{student.prodi || student.studyProgram}</Text>
          </View>
          <Text style={styles.metaSeparator}>•</Text>
          <View style={styles.metaItem}>
            <Ionicons name="calendar-outline" size={14} color={COLORS.textMuted} />
            <Text style={styles.metaText}>Semester {student.semester}</Text>
          </View>
        </View>

        {/* Nama Kampus */}
        <View style={styles.universityRow}>
          <Ionicons name="business" size={14} color={COLORS.textSecondary} />
          <Text style={styles.universityText}>{student.kampus || student.university}</Text>
        </View>

        {/* Status Mahasiswa Aktif Pill */}
        <View style={styles.statusPill}>
          <View style={styles.greenCircle} />
          <Text style={styles.statusText}>{student.status}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    ...SHADOWS.md,
  },
  cardHeaderBanner: {
    height: 90,
    backgroundColor: COLORS.primary,
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
    borderColor: COLORS.surface,
    backgroundColor: COLORS.border,
  },
  activeDot: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: COLORS.success,
    borderWidth: 3,
    borderColor: COLORS.surface,
  },
  fullName: {
    fontSize: 21,
    fontWeight: '800',
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: SPACING.xs,
  },
  professionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primaryLight,
    paddingVertical: 5,
    paddingHorizontal: SPACING.md,
    borderRadius: 20,
    gap: 6,
    marginBottom: SPACING.xs,
    borderWidth: 1,
    borderColor: COLORS.primaryBorder,
  },
  professionText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.primary,
  },
  taglineText: {
    fontSize: 12,
    fontStyle: 'italic',
    color: COLORS.textMuted,
    textAlign: 'center',
    marginBottom: SPACING.sm,
    paddingHorizontal: SPACING.sm,
  },
  nimContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F9FF',
    paddingVertical: 5,
    paddingHorizontal: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#BAE6FD',
    marginBottom: SPACING.md,
    gap: 6,
  },
  nimLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.accentCyan,
  },
  nimValue: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.accentCyan,
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
    color: COLORS.textLight,
    fontSize: 14,
  },
  metaText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  universityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: SPACING.md,
  },
  universityText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.successLight,
    paddingHorizontal: SPACING.md,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DCFCE7',
    gap: 6,
  },
  greenCircle: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: COLORS.success,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.success,
  },
});
