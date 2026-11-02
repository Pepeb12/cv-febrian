import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Platform,
  Alert,
  useWindowDimensions,
} from 'react-native';
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
 * ProfileCard Component (Minimalist Tech Two-Column Header)
 * - Kolom Kiri (30%): Foto Profil rasio 1:1 (rounded-xl)
 * - Kolom Kanan (70%): Nama (H1), Role (Systems Analysis - Mobile Developer), Tombol Kontak
 * - Teks Deskripsi 'Tentang Saya' dengan line-height minimal 1.6 (leading-relaxed)
 * - Deretan badge 'Level' dan 'IPK' flex-row kecil elegan (bg-gray-100, teks kecil, tanpa border)
 */
export default function ProfileCard({
  data,
  profile,
  theme,
  onExploreScore,
  onContactClick,
}: ProfileCardProps) {
  const { width } = useWindowDimensions();
  const isMobile = width < 680;

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
          padding: isMobile ? SPACING.md : SPACING.cardPadding,
        },
      ]}
      accessibilityRole="region"
      accessibilityLabel="Header Profil Mahasiswa"
    >
      {/* ========================================================
          FLEXBOX DUA KOLOM: 30% KIRI (FOTO) & 70% KANAN (INFO)
          ======================================================== */}
      <View style={[styles.twoColumnWrapper, isMobile && styles.twoColumnWrapperMobile]}>
        {/* KOLOM KIRI (30%): FOTO PROFIL ROUNDED-XL DENGAN RASIO 1:1 */}
        <View style={[styles.leftColumn, isMobile && styles.leftColumnMobile]}>
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

          {/* Status Badge Ringkas */}
          <View
            style={[
              styles.statusPill,
              {
                backgroundColor: currentTheme.surfaceMuted,
              },
            ]}
          >
            <View style={[styles.statusDot, { backgroundColor: currentTheme.success }]} />
            <Text style={[styles.statusText, { color: currentTheme.textSecondary }]}>
              AKTIF • SMT 5
            </Text>
          </View>
        </View>

        {/* KOLOM KANAN (70%): NAMA, ROLE, TOMBOL KONTAK, DESKRIPSI & BADGES */}
        <View style={[styles.rightColumn, isMobile && styles.rightColumnMobile]}>
          {/* 1. H1 NAMA MAHASISWA (High Contrast Inter 900 Black) */}
          <Text
            style={[
              styles.nameText,
              {
                color: currentTheme.textPrimary,
                textAlign: isMobile ? 'center' : 'left',
              },
            ]}
          >
            {student.nama || student.fullName}
          </Text>

          {/* 2. ROLE: Systems Analysis - Mobile Developer */}
          <Text
            style={[
              styles.roleText,
              {
                color: currentTheme.textSecondary,
                textAlign: isMobile ? 'center' : 'left',
              },
            ]}
          >
            Systems Analysis - Mobile Developer
          </Text>

          {/* 3. TOMBOL KONTAK (GitHub, Email, Kontak - Retro Olive & Beige Theme) */}
          <View style={[styles.socialPillsRow, isMobile && styles.socialPillsRowMobile]}>
            <TouchableOpacity
              style={[
                styles.socialPill,
                {
                  backgroundColor: isDark ? currentTheme.surfaceMuted : currentTheme.surfaceSubtle,
                  borderColor: currentTheme.border,
                },
              ]}
              onPress={handleOpenGitHub}
              activeOpacity={0.7}
              accessibilityRole="link"
              accessibilityLabel="Buka GitHub pepeb12"
            >
              <Ionicons name="logo-github" size={15} color={currentTheme.primary} />
              <Text style={[styles.socialPillText, { color: currentTheme.textPrimary }]}>
                GitHub
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.socialPill,
                {
                  backgroundColor: isDark ? currentTheme.surfaceMuted : currentTheme.surfaceSubtle,
                  borderColor: currentTheme.border,
                },
              ]}
              onPress={handleOpenEmail}
              activeOpacity={0.7}
              accessibilityRole="link"
              accessibilityLabel="Kirim email ke febrianrahman902@gmail.com"
            >
              <Ionicons name="mail-outline" size={15} color={currentTheme.primary} />
              <Text style={[styles.socialPillText, { color: currentTheme.textPrimary }]}>
                Email
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.socialPill,
                {
                  backgroundColor: isDark ? currentTheme.surfaceMuted : currentTheme.surfaceSubtle,
                  borderColor: currentTheme.border,
                },
              ]}
              onPress={handleOpenContact}
              activeOpacity={0.7}
              accessibilityRole="link"
              accessibilityLabel="Hubungi kontak WhatsApp 089512336537"
            >
              <Ionicons name="send-outline" size={14} color={currentTheme.primary} />
              <Text style={[styles.socialPillText, { color: currentTheme.textPrimary }]}>
                Kontak
              </Text>
            </TouchableOpacity>
          </View>

          {/* 4. DESKRIPSI SINGKAT 'TENTANG SAYA' (Line-Height Nyaman: 24px / 1.71x - Leading Relaxed) */}
          <Text
            style={[
              styles.bioText,
              {
                color: currentTheme.textSecondary,
                textAlign: isMobile ? 'center' : 'left',
              },
            ]}
          >
            Menjembatani <Text style={[styles.boldText, { color: currentTheme.textPrimary }]}>analisis proses bisnis</Text> dengan solusi <Text style={[styles.boldText, { color: currentTheme.textPrimary }]}>aplikasi mobile modern</Text>. Mahasiswa semester 5 Program Studi Sistem Informasi di Masoem University yang berfokus pada pengembangan React Native, UI/UX, dan arsitektur database relasional.
          </Text>

          {/* 5. DERETAN BADGE 'LEVEL' & 'IPK' KECIL ELEGAN (Subtle Surface, teks kecil, TANPA BORDER) */}
          <View style={[styles.badgeFlexRow, isMobile && styles.badgeFlexRowMobile]}>
            <View
              style={[
                styles.subtleBadge,
                { backgroundColor: isDark ? currentTheme.surfaceMuted : currentTheme.surfaceSubtle },
              ]}
            >
              <Text style={[styles.subtleBadgeText, { color: currentTheme.textSecondary }]}>
                Level 10 (Industry Ready)
              </Text>
            </View>

            <View
              style={[
                styles.subtleBadge,
                { backgroundColor: isDark ? currentTheme.surfaceMuted : currentTheme.surfaceSubtle },
              ]}
            >
              <Text style={[styles.subtleBadgeText, { color: currentTheme.textSecondary }]}>
                IPK: 3.84
              </Text>
            </View>

            <View
              style={[
                styles.subtleBadge,
                { backgroundColor: isDark ? currentTheme.surfaceMuted : currentTheme.surfaceSubtle },
              ]}
            >
              <Text style={[styles.subtleBadgeText, { color: currentTheme.textSecondary }]}>
                Nilai: 90 (Grade A)
              </Text>
            </View>

            <View
              style={[
                styles.subtleBadge,
                { backgroundColor: isDark ? currentTheme.surfaceMuted : currentTheme.surfaceSubtle },
              ]}
            >
              <Text style={[styles.subtleBadgeText, { color: currentTheme.textSecondary }]}>
                19.000 LP
              </Text>
            </View>

            <View
              style={[
                styles.subtleBadge,
                { backgroundColor: isDark ? currentTheme.surfaceMuted : currentTheme.surfaceSubtle },
              ]}
            >
              <Text style={[styles.subtleBadgeText, { color: currentTheme.textSecondary }]}>
                Masoem Univ • SMT 5
              </Text>
            </View>
          </View>

          {/* 6. CALL TO ACTION BUTTONS (Proporsional & Seragam) */}
          <View style={[styles.ctaRow, isMobile && styles.ctaRowMobile]}>
            <TouchableOpacity
              style={[styles.primaryCtaBtn, { backgroundColor: currentTheme.primary }]}
              onPress={onExploreScore}
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityLabel="Lihat Capaian Nilai UTS"
            >
              <Ionicons name="school-outline" size={16} color={currentTheme.textInverted} />
              <Text style={[styles.primaryCtaText, { color: currentTheme.textInverted }]}>
                Capaian Nilai UTS (90/A)
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.secondaryCtaBtn,
                {
                  backgroundColor: isDark ? currentTheme.surfaceMuted : currentTheme.surfaceSubtle,
                  borderColor: currentTheme.border,
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  heroContainer: {
    borderRadius: 16,
    borderWidth: 1, // Soft hairline 1px
    padding: SPACING.cardPadding, // 24px standardized card padding
    marginBottom: SPACING.gap, // 20px gap
    width: '100%',
  },
  twoColumnWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: SPACING.gap, // 20px standardized gap
    width: '100%',
  },
  twoColumnWrapperMobile: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: SPACING.lg,
  },
  // KOLOM KIRI: 30%
  leftColumn: {
    width: '30%',
    maxWidth: 240,
    alignItems: 'center',
  },
  leftColumnMobile: {
    width: '100%',
    maxWidth: 180,
    alignItems: 'center',
  },
  avatarFrame: {
    width: '100%',
    aspectRatio: 1, // Rasio 1:1 sempurna
    borderRadius: 20, // Rounded-xl
    borderWidth: 1,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 0, // Tanpa border
    gap: 6,
    marginTop: 10,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontFamily: FONTS.semiBold,
    fontSize: 10.5,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  // KOLOM KANAN: 70%
  rightColumn: {
    flex: 1, // Mengisi 70% sisa lebar container
    alignItems: 'flex-start',
  },
  rightColumnMobile: {
    width: '100%',
    alignItems: 'center',
  },
  // H1 HEADING KONTRAST
  nameText: {
    fontFamily: FONTS.black,
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: -0.8,
    lineHeight: 38,
    marginBottom: 4,
  },
  roleText: {
    fontFamily: FONTS.semiBold,
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.2,
    marginBottom: SPACING.md, // 16px
  },
  socialPillsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: SPACING.sm, // 8px (Scale 8px)
    marginBottom: SPACING.md, // 16px
  },
  socialPillsRowMobile: {
    justifyContent: 'center',
  },
  socialPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    paddingHorizontal: 13,
    paddingVertical: 7,
    borderRadius: 8,
    borderWidth: 1,
  },
  socialPillText: {
    fontFamily: FONTS.semiBold,
    fontSize: 12.5,
    fontWeight: '600',
  },
  // DESKRIPSI SINGKAT DENGAN LINE-HEIGHT NYAMAN (1.71x - LEADING RELAXED)
  bioText: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    lineHeight: 24, // Minimal 1.6x (24 / 14 = 1.71x -> leading-relaxed)
    marginBottom: SPACING.md, // 16px
  },
  boldText: {
    fontFamily: FONTS.bold,
    fontWeight: '700',
  },
  // DERETAN BADGE KECIL ELEGAN (bg-gray-100, teks kecil, TANPA BORDER)
  badgeFlexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: SPACING.sm, // 8px
    marginBottom: SPACING.lg, // 24px
  },
  badgeFlexRowMobile: {
    justifyContent: 'center',
  },
  subtleBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4.5,
    borderRadius: 6,
    borderWidth: 0, // Tanpa border
  },
  subtleBadgeText: {
    fontFamily: FONTS.semiBold,
    fontSize: 11.5,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  ctaRow: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
    marginTop: 4,
  },
  ctaRowMobile: {
    flexDirection: 'column',
    width: '100%',
    gap: 10,
  },
  primaryCtaBtn: {
    flex: 1,
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    gap: 8,
  },
  primaryCtaText: {
    fontFamily: FONTS.bold,
    fontSize: 13,
    fontWeight: '700',
  },
  secondaryCtaBtn: {
    flex: 1,
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
  },
  secondaryCtaText: {
    fontFamily: FONTS.semiBold,
    fontSize: 13,
    fontWeight: '600',
  },
});
