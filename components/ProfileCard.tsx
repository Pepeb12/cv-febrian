import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SHADOWS, SPACING, FONTS } from '../theme';
import { StudentProfile, ThemeColors } from '../types';

interface ProfileCardProps {
  data?: StudentProfile | any;
  profile?: StudentProfile | any;
  theme?: ThemeColors | any;
  onExploreScore?: () => void;
  onContactClick?: () => void;
}

/**
 * ProfileCard Component (Level 1 & Level 2: Student Identity & Authentic Introduction)
 * Styled with Emerald – Cream – White – Mint luxury palette & Lato fonts.
 */
export default function ProfileCard({
  data,
  profile,
  theme,
  onExploreScore,
  onContactClick,
}: ProfileCardProps) {
  const student = data || profile;
  const currentTheme = theme || COLORS;
  const isDark = currentTheme.isDark;

  if (!student) return null;

  return (
    <View
      style={[
        styles.heroContainer,
        {
          backgroundColor: currentTheme.surface,
          borderColor: currentTheme.border,
        },
      ]}
      accessibilityRole="region"
      accessibilityLabel="Hero Profil Mahasiswa"
    >
      {/* 1. FOTO PROFIL MAHASISWA (Circular Portrait with Emerald/Mint Ring) */}
      <View style={styles.avatarSection}>
        <View
          style={[
            styles.avatarFrame,
            {
              borderColor: isDark ? currentTheme.primary : currentTheme.primary,
              backgroundColor: currentTheme.surfaceMuted,
            },
          ]}
        >
          <Image
            source={require('../assets/profile.png')}
            style={styles.avatarImage}
            resizeMode="cover"
            accessibilityLabel={`Foto profil ${student.nama || student.fullName}`}
          />
        </View>

        {/* Status Pill: Mahasiswa Aktif */}
        <View
          style={[
            styles.statusPill,
            {
              backgroundColor: isDark ? '#0A3F31' : '#ECFDF5',
              borderColor: isDark ? currentTheme.primary : '#A7F3D0',
            },
          ]}
        >
          <View style={[styles.statusDot, { backgroundColor: isDark ? '#A7F3D0' : '#065F46' }]} />
          <Text
            style={[
              styles.statusText,
              { color: isDark ? '#A7F3D0' : '#065F46' },
            ]}
          >
            MAHASISWA AKTIF • SMT 5
          </Text>
        </View>
      </View>

      {/* 2. NAMA LENGKAP MAHASISWA (Lato Bold Typography) */}
      <Text style={[styles.nameText, { color: currentTheme.textPrimary }]}>
        {student.nama || student.fullName}
      </Text>

      {/* 3. ROLES DENGAN TITIK SEPARATOR (Professional Editorial Style) */}
      <View style={styles.rolesRow}>
        <Text style={[styles.roleItem, { color: currentTheme.primary }]}>Systems Analyst</Text>
        <Text style={[styles.roleDot, { color: currentTheme.textMuted }]}>•</Text>
        <Text style={[styles.roleItem, { color: currentTheme.primary }]}>Mobile Developer</Text>
        <Text style={[styles.roleDot, { color: currentTheme.textMuted }]}>•</Text>
        <Text style={[styles.roleItem, { color: currentTheme.primary }]}>Masoem University</Text>
      </View>

      {/* 4. NARASI PERSONAL BIO (Lato Regular with Lato Bold Keywords) */}
      <Text style={[styles.bioText, { color: currentTheme.textSecondary }]}>
        Menjembatani <Text style={[styles.boldText, { color: currentTheme.textPrimary }]}>analisis proses bisnis</Text> dengan solusi <Text style={[styles.boldText, { color: currentTheme.textPrimary }]}>aplikasi mobile modern</Text>. Mahasiswa semester 5 Program Studi Sistem Informasi di Masoem University yang berfokus pada pengembangan React Native, UI/UX, dan arsitektur database relasional.
      </Text>

      {/* 5. METADATA IDENTITAS KAMPUS & DOMISILI (Cream Surface Grid) */}
      <View
        style={[
          styles.metaGrid,
          {
            backgroundColor: currentTheme.surfaceMuted,
            borderColor: currentTheme.border,
          },
        ]}
      >
        <View style={styles.metaCell}>
          <Text style={[styles.metaLabel, { color: currentTheme.textMuted }]}>NIM</Text>
          <Text style={[styles.metaValue, { color: currentTheme.textPrimary }]}>
            {student.nim}
          </Text>
        </View>
        <View style={[styles.metaDividerV, { backgroundColor: currentTheme.border }]} />
        <View style={styles.metaCell}>
          <Text style={[styles.metaLabel, { color: currentTheme.textMuted }]}>PRODI</Text>
          <Text style={[styles.metaValue, { color: currentTheme.textPrimary }]}>
            {student.prodi || 'Sistem Informasi'}
          </Text>
        </View>
        <View style={[styles.metaDividerV, { backgroundColor: currentTheme.border }]} />
        <View style={styles.metaCell}>
          <Text style={[styles.metaLabel, { color: currentTheme.textMuted }]}>DOMISILI</Text>
          <Text style={[styles.metaValue, { color: currentTheme.textPrimary }]}>
            Cicalengka, Bandung
          </Text>
        </View>
      </View>

      {/* 6. CALL TO ACTION BUTTONS */}
      <View style={styles.ctaRow}>
        <TouchableOpacity
          style={[styles.primaryCtaBtn, { backgroundColor: isDark ? currentTheme.primary : currentTheme.primary }]}
          onPress={onExploreScore}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel="Lihat Capaian Nilai UTS"
        >
          <Ionicons name="school" size={15} color={isDark ? '#041812' : '#FFFFFF'} />
          <Text style={[styles.primaryCtaText, { color: isDark ? '#041812' : '#FFFFFF' }]}>
            Capaian Nilai UTS (90/A)
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.secondaryCtaBtn,
            {
              backgroundColor: currentTheme.surfaceMuted,
              borderColor: currentTheme.border,
            },
          ]}
          onPress={onContactClick}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel="Kirim Pesan"
        >
          <Ionicons name="mail-outline" size={15} color={currentTheme.textPrimary} />
          <Text style={[styles.secondaryCtaText, { color: currentTheme.textPrimary }]}>
            Kirim Pesan
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  heroContainer: {
    borderRadius: 18,
    borderWidth: 1,
    padding: SPACING.xl,
    alignItems: 'center',
    marginBottom: SPACING.lg,
    ...SHADOWS.sm,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  avatarFrame: {
    width: 114,
    height: 114,
    borderRadius: 57,
    borderWidth: 3,
    padding: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 53,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    gap: 6,
    marginTop: -10,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontFamily: FONTS.heading,
    fontSize: 9.5,
    fontWeight: '700',
    letterSpacing: 0.6,
  },
  nameText: {
    fontFamily: FONTS.heading,
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: -0.4,
    marginBottom: 4,
  },
  rolesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: SPACING.md,
  },
  roleItem: {
    fontFamily: FONTS.heading,
    fontSize: 12.5,
    fontWeight: '700',
  },
  roleDot: {
    fontSize: 12,
  },
  bioText: {
    fontFamily: FONTS.body,
    fontSize: 12.5,
    lineHeight: 19,
    textAlign: 'center',
    marginBottom: SPACING.lg,
    paddingHorizontal: 6,
  },
  boldText: {
    fontFamily: FONTS.heading,
    fontWeight: '700',
  },
  metaGrid: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    borderRadius: 12,
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 6,
    marginBottom: SPACING.lg,
  },
  metaCell: {
    flex: 1,
    alignItems: 'center',
  },
  metaDividerV: {
    width: 1,
    height: 28,
  },
  metaLabel: {
    fontFamily: FONTS.heading,
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  metaValue: {
    fontFamily: FONTS.heading,
    fontSize: 12,
    fontWeight: '700',
  },
  ctaRow: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
  },
  primaryCtaBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    gap: 6,
  },
  primaryCtaText: {
    fontFamily: FONTS.heading,
    fontSize: 11.5,
    fontWeight: '700',
  },
  secondaryCtaBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    gap: 6,
  },
  secondaryCtaText: {
    fontFamily: FONTS.heading,
    fontSize: 11.5,
    fontWeight: '700',
  },
});
