import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking, Platform, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONTS } from '../theme';
import { StudentProfile, ThemeColors } from '../types';

interface ProfileCardProps {
  data?: StudentProfile | any;
  profile?: StudentProfile | any;
  theme?: ThemeColors | any;
  onExploreScore?: () => void;
  onContactClick?: () => void;
}

/**
 * ProfileCard Component (Minimalist Tech: H1 Contrast, Inter Fonts, Dark Slate Typography)
 * - Border keras dihapus, mengutamakan padding lega (scale 8px).
 * - Tanpa drop shadow atau gradient berlebihan.
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

  const handleOpenGitHub = () => {
    const url = 'https://github.com/pepeb12';
    if (Platform.OS === 'web') {
      window.open(url, '_blank');
    } else {
      Linking.openURL(url).catch(() => Alert.alert('GitHub', `Akun GitHub: pepeb12\n${url}`));
    }
  };

  const handleOpenEmail = () => {
    const email = 'febrianrahman902@gmail.com';
    if (Platform.OS === 'web') {
      window.open(`mailto:${email}`, '_blank');
    } else {
      Linking.openURL(`mailto:${email}`).catch(() => Alert.alert('Email', `Email: ${email}`));
    }
  };

  const handleOpenContact = () => {
    const phone = '089512336537';
    const waUrl = 'https://wa.me/6289512336537';
    if (Platform.OS === 'web') {
      window.open(waUrl, '_blank');
    } else {
      Linking.openURL(waUrl).catch(() => Alert.alert('Kontak / WA', `Nomor Kontak: ${phone}`));
    }
  };

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
      {/* 1. FOTO PROFIL MAHASISWA (Clean Minimalist Avatar) */}
      <View style={styles.avatarSection}>
        <View
          style={[
            styles.avatarFrame,
            {
              backgroundColor: currentTheme.surfaceMuted,
              borderColor: currentTheme.borderLight,
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

        {/* Status Pill: Minimalist Badge */}
        <View
          style={[
            styles.statusPill,
            {
              backgroundColor: currentTheme.surfaceMuted,
              borderColor: currentTheme.borderLight,
            },
          ]}
        >
          <View style={[styles.statusDot, { backgroundColor: isDark ? '#34D399' : '#059669' }]} />
          <Text
            style={[
              styles.statusText,
              { color: currentTheme.textSecondary },
            ]}
          >
            MAHASISWA AKTIF • SMT 5
          </Text>
        </View>
      </View>

      {/* 2. H1 HEADING: NAMA MAHASISWA (High Contrast 34px / 900 Black Inter) */}
      <Text style={[styles.nameText, { color: currentTheme.textPrimary }]}>
        {student.nama || student.fullName}
      </Text>

      {/* 3. ROLES (Minimalist Dot Separated) */}
      <View style={styles.rolesRow}>
        <Text style={[styles.roleItem, { color: currentTheme.textSecondary }]}>Systems Analyst</Text>
        <Text style={[styles.roleDot, { color: currentTheme.textMuted }]}>•</Text>
        <Text style={[styles.roleItem, { color: currentTheme.textSecondary }]}>Mobile Developer</Text>
        <Text style={[styles.roleDot, { color: currentTheme.textMuted }]}>•</Text>
        <Text style={[styles.roleItem, { color: currentTheme.textSecondary }]}>Masoem University</Text>
      </View>

      {/* 3.1. SOCIAL CONTACT PILLS (GitHub, Email, Kontak - Identik dengan Referensi Foto User) */}
      <View style={styles.socialPillsRow}>
        <TouchableOpacity
          style={[
            styles.socialPill,
            {
              backgroundColor: isDark ? '#142721' : '#F5F5DC', // Elegan Cream
              borderColor: isDark ? '#065F46' : '#E6E4CB',
            },
          ]}
          onPress={handleOpenGitHub}
          activeOpacity={0.7}
          accessibilityRole="link"
          accessibilityLabel="Buka GitHub pepeb12"
        >
          <Ionicons name="logo-github" size={15} color={isDark ? '#A7F3D0' : '#064E3B'} />
          <Text style={[styles.socialPillText, { color: isDark ? '#A7F3D0' : '#064E3B' }]}>
            GitHub
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.socialPill,
            {
              backgroundColor: isDark ? '#142721' : '#F5F5DC', // Elegan Cream
              borderColor: isDark ? '#065F46' : '#E6E4CB',
            },
          ]}
          onPress={handleOpenEmail}
          activeOpacity={0.7}
          accessibilityRole="link"
          accessibilityLabel="Kirim email ke febrianrahman902@gmail.com"
        >
          <Ionicons name="mail-outline" size={15} color={isDark ? '#A7F3D0' : '#064E3B'} />
          <Text style={[styles.socialPillText, { color: isDark ? '#A7F3D0' : '#064E3B' }]}>
            Email
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.socialPill,
            {
              backgroundColor: isDark ? '#142721' : '#F5F5DC', // Elegan Cream
              borderColor: isDark ? '#065F46' : '#E6E4CB',
            },
          ]}
          onPress={handleOpenContact}
          activeOpacity={0.7}
          accessibilityRole="link"
          accessibilityLabel="Hubungi kontak WhatsApp 089512336537"
        >
          <Ionicons name="send-outline" size={14} color={isDark ? '#A7F3D0' : '#064E3B'} />
          <Text style={[styles.socialPillText, { color: isDark ? '#A7F3D0' : '#064E3B' }]}>
            Kontak
          </Text>
        </TouchableOpacity>
      </View>

      {/* 4. NARASI PERSONAL BIO (14px Inter Regular, Dark Slate & Gray) */}
      <Text style={[styles.bioText, { color: currentTheme.textSecondary }]}>
        Menjembatani <Text style={[styles.boldText, { color: currentTheme.textPrimary }]}>analisis proses bisnis</Text> dengan solusi <Text style={[styles.boldText, { color: currentTheme.textPrimary }]}>aplikasi mobile modern</Text>. Mahasiswa semester 5 Program Studi Sistem Informasi di Masoem University yang berfokus pada pengembangan React Native, UI/UX, dan arsitektur database relasional.
      </Text>

      {/* 5. METADATA IDENTITAS KAMPUS & DOMISILI (Flat Surface, No Harsh Border) */}
      <View
        style={[
          styles.metaGrid,
          {
            backgroundColor: currentTheme.surfaceMuted,
            borderColor: currentTheme.borderLight,
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

      {/* 6. CALL TO ACTION BUTTONS (Flat Tech Minimalist) */}
      <View style={styles.ctaRow}>
        <TouchableOpacity
          style={[styles.primaryCtaBtn, { backgroundColor: currentTheme.textPrimary }]}
          onPress={onExploreScore}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel="Lihat Capaian Nilai UTS"
        >
          <Ionicons name="school-outline" size={16} color={isDark ? '#090D16' : '#FFFFFF'} />
          <Text style={[styles.primaryCtaText, { color: isDark ? '#090D16' : '#FFFFFF' }]}>
            Capaian Nilai UTS (90/A)
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.secondaryCtaBtn,
            {
              backgroundColor: currentTheme.surfaceMuted,
              borderColor: currentTheme.borderLight,
            },
          ]}
          onPress={onContactClick}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel="Kirim Pesan"
        >
          <Ionicons name="mail-outline" size={16} color={currentTheme.textPrimary} />
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
    borderRadius: 16,
    borderWidth: 1, // Soft hairline 1px
    padding: SPACING.xl, // 32px (Scale 8px: mb-8, py-8/py-12)
    alignItems: 'center',
    marginBottom: SPACING.xl, // 32px (mb-8)
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  avatarFrame: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 1,
    padding: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 58,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    gap: 6,
    marginTop: -12,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontFamily: FONTS.semiBold,
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  // H1 HEADING KONTRAST
  nameText: {
    fontFamily: FONTS.black,
    fontSize: 34,
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: -1,
    lineHeight: 40,
    marginBottom: SPACING.sm,
  },
  rolesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: SPACING.md,
  },
  socialPillsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: SPACING.sm, // 8px (Scale 8px)
    marginBottom: SPACING.lg, // 24px
  },
  socialPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 8,
    borderWidth: 1,
  },
  socialPillText: {
    fontFamily: FONTS.semiBold,
    fontSize: 13,
    fontWeight: '600',
  },
  roleItem: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    fontWeight: '500',
  },
  roleDot: {
    fontSize: 12,
  },
  bioText: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: SPACING.xl,
    paddingHorizontal: SPACING.sm,
  },
  boldText: {
    fontFamily: FONTS.bold,
    fontWeight: '700',
  },
  metaGrid: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    borderRadius: 12,
    borderWidth: 1,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.xl,
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
    fontFamily: FONTS.semiBold,
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.6,
    marginBottom: 2,
  },
  metaValue: {
    fontFamily: FONTS.bold,
    fontSize: 13,
    fontWeight: '700',
  },
  ctaRow: {
    flexDirection: 'row',
    gap: SPACING.md,
    width: '100%',
  },
  primaryCtaBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    gap: 8,
  },
  primaryCtaText: {
    fontFamily: FONTS.bold,
    fontSize: 13,
    fontWeight: '700',
  },
  secondaryCtaBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    gap: 8,
  },
  secondaryCtaText: {
    fontFamily: FONTS.semiBold,
    fontSize: 13,
    fontWeight: '600',
  },
});
