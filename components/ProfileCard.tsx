import React, { useState } from 'react';
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
  Modal,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONTS } from '../theme';
import { StudentProfile, ThemeColors } from '../types';
import { SECTION_IMAGES } from '../data/sectionImages';

interface ProfileCardProps {
  data?: StudentProfile | any;
  profile?: StudentProfile | any;
  theme?: ThemeColors | any;
  onExploreScore?: () => void;
  onContactClick?: () => void;
  hidePhoto?: boolean;
}

/**
 * ProfileCard Component (Hero Profile Card - 65% Bento Column)
 * - Kolom Kiri: Foto Profil rasio 1:1 (rounded-xl) dengan zoom modal
 * - Kolom Kanan: Nama (H1), Badge NIM (242505024), Role, Tombol Kontak, Deskripsi, Badges & CTA
 */
export default function ProfileCard({
  data,
  profile,
  theme,
  onExploreScore,
  onContactClick,
  hidePhoto = false,
}: ProfileCardProps) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const [isPhotoZoomed, setIsPhotoZoomed] = useState(false);

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
          FLEXBOX DUA KOLOM: FOTO DI KIRI & INFORMASI DI KANAN
          ======================================================== */}
      <View style={[styles.twoColumnWrapper, isMobile && styles.twoColumnWrapperMobile]}>
        {/* KOLOM KIRI (30%): FOTO PROFIL ROUNDED-XL DENGAN RASIO 1:1 */}
        {!hidePhoto && (
          <View style={[styles.leftColumn, isMobile && styles.leftColumnMobile]}>
            <TouchableOpacity
              style={[
                styles.avatarFrame,
                {
                  backgroundColor: currentTheme.surfaceMuted,
                  borderColor: currentTheme.border,
                },
              ]}
              activeOpacity={0.85}
              onPress={() => setIsPhotoZoomed(true)}
              accessibilityRole="button"
              accessibilityLabel={`Foto profil ${student.nama || student.fullName}. Ketuk untuk memperbesar`}
              accessibilityHint="Membuka foto profil ukuran penuh di tengah layar"
            >
              <Image
                source={SECTION_IMAGES.GAMBAR_1_HOME.source}
                style={styles.avatarImage}
                resizeMode="cover"
                accessibilityLabel={`Foto profil ${student.nama || student.fullName}`}
              />
              {/* Floating NIM Badge Overlay */}
              <View
                style={[
                  styles.floatingNimBadge,
                  {
                    backgroundColor: currentTheme.primary,
                  },
                ]}
              >
                <Text style={[styles.floatingNimText, { color: currentTheme.textInverted || '#FFFDF7' }]}>
                  NIM: {student.nim || '242505024'}
                </Text>
              </View>
              {/* Indikator Tombol Zoom di Sudut Foto */}
              <View style={styles.zoomHintBadge}>
                <Ionicons name="expand-outline" size={13} color="#FFFFFF" />
              </View>
            </TouchableOpacity>

            {/* Status Badge Mahasiswa Aktif */}
            <View
              style={[
                styles.statusPill,
                {
                  backgroundColor: currentTheme.surfaceMuted,
                  borderColor: currentTheme.borderLight,
                },
              ]}
            >
              <View style={[styles.statusDot, { backgroundColor: currentTheme.success }]} />
              <Text style={[styles.statusText, { color: currentTheme.textSecondary }]}>
                AKTIF • SMT 5
              </Text>
            </View>
          </View>
        )}

        {/* KOLOM KANAN: NAMA, NIM, ROLE, TOMBOL KONTAK, DESKRIPSI & BADGES */}
        <View
          style={[
            styles.rightColumn,
            hidePhoto && { flex: 1, width: '100%' },
            isMobile && styles.rightColumnMobile,
          ]}
        >
          {/* 1. H1 NAMA MAHASISWA & BADGE NIM WAJIB UTS */}
          <View style={[styles.nameNimContainer, isMobile && styles.nameNimContainerMobile]}>
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
            <View
              style={[
                styles.nimBadge,
                {
                  backgroundColor: currentTheme.surfaceMuted,
                  borderColor: currentTheme.borderLight,
                },
              ]}
            >
              <Ionicons name="id-card-outline" size={13} color={currentTheme.primary} />
              <Text style={[styles.nimBadgeText, { color: currentTheme.textPrimary }]}>
                NIM: {student.nim || '242505024'}
              </Text>
            </View>
          </View>

          {/* 2. ROLE & BIDANG KEAHLIAN */}
          <Text
            style={[
              styles.roleText,
              {
                color: currentTheme.textSecondary,
                textAlign: isMobile ? 'center' : 'left',
              },
            ]}
          >
            Systems Analysis &amp; Mobile Developer
          </Text>

          {/* 3. TOMBOL KONTAK (GitHub, Email, Kontak) */}
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

          {/* 4. DESKRIPSI SINGKAT 'TENTANG SAYA' (Leading Relaxed) */}
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

          {/* 5. DERETAN BADGE CAPAIAN AKADEMIK & STATUS */}
          <View style={[styles.badgeFlexRow, isMobile && styles.badgeFlexRowMobile]}>
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

          {/* 6. CALL TO ACTION BUTTONS */}
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
                  backgroundColor: currentTheme.surfaceSecondary || currentTheme.surfaceMuted,
                  borderColor: currentTheme.borderStrong || currentTheme.primaryBorder,
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

      {/* ========================================================
          MODAL LIGHTBOX: ZOOM FOTO PROFIL DI TENGAH LAYAR
          ======================================================== */}
      <Modal
        visible={isPhotoZoomed}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsPhotoZoomed(false)}
      >
        <Pressable
          style={styles.zoomBackdrop}
          onPress={() => setIsPhotoZoomed(false)}
          accessibilityRole="button"
          accessibilityLabel="Tutup tampilan foto besar"
        >
          <Pressable
            style={[
              styles.zoomCard,
              {
                backgroundColor: currentTheme.surface,
                borderColor: currentTheme.border,
              },
            ]}
            onPress={(e) => e.stopPropagation()}
          >
            {/* Tombol Tutup X di Sudut Kanan Atas */}
            <TouchableOpacity
              style={[
                styles.zoomCloseBtn,
                {
                  backgroundColor: currentTheme.surfaceMuted,
                  borderColor: currentTheme.borderLight,
                },
              ]}
              onPress={() => setIsPhotoZoomed(false)}
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityLabel="Tutup tampilan foto"
            >
              <Ionicons name="close" size={20} color={currentTheme.textPrimary} />
            </TouchableOpacity>

            {/* Frame Foto Besar Terpusat */}
            <View
              style={[
                styles.zoomImageFrame,
                {
                  backgroundColor: currentTheme.surfaceMuted,
                  borderColor: currentTheme.borderLight,
                },
              ]}
            >
              <Image
                source={require('../assets/profile.png')}
                style={styles.zoomImage}
                resizeMode="cover"
                accessibilityLabel={`Foto profil ${student.nama || student.fullName} ukuran besar`}
              />
            </View>

            {/* Keterangan & Identitas di Bawah Foto */}
            <View style={styles.zoomCaption}>
              <Text style={[styles.zoomName, { color: currentTheme.textPrimary }]}>
                {student.nama || student.fullName}
              </Text>
              <Text style={[styles.zoomSubtitle, { color: currentTheme.textSecondary }]}>
                {student.nim ? `NIM: ${student.nim} • ` : ''}Sistem Informasi Masoem University
              </Text>
              <View
                style={[
                  styles.zoomBadge,
                  {
                    backgroundColor: currentTheme.surfaceMuted,
                    borderColor: currentTheme.borderLight,
                  },
                ]}
              >
                <Ionicons name="shield-checkmark" size={13} color={currentTheme.primary} />
                <Text style={[styles.zoomBadgeText, { color: currentTheme.textSecondary }]}>
                  Foto Profil Resmi Mahasiswa
                </Text>
              </View>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  heroContainer: {
    borderRadius: 16,
    borderWidth: 1,
    width: '100%',
    flex: 1,
  },
  twoColumnWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: SPACING.gap,
    width: '100%',
    flex: 1,
  },
  twoColumnWrapperMobile: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: SPACING.md,
  },
  // KOLOM KIRI: FOTO PROFIL
  leftColumn: {
    width: '30%',
    maxWidth: 220,
    alignItems: 'center',
  },
  leftColumnMobile: {
    width: '100%',
    maxWidth: 180,
    alignItems: 'center',
  },
  avatarFrame: {
    width: '100%',
    aspectRatio: 1,
    borderTopLeftRadius: 48,
    borderTopRightRadius: 48,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    borderWidth: 2,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    ...Platform.select({
      web: {
        cursor: 'pointer' as any,
        transition: 'transform 0.25s ease, box-shadow 0.25s ease' as any,
        boxShadow: '0 8px 24px rgba(181, 137, 61, 0.2)' as any,
      },
    }),
  },
  floatingNimBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  floatingNimText: {
    fontFamily: FONTS.bold,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  zoomHintBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
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
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 1,
    gap: 6,
    marginTop: 10,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
  },
  statusText: {
    fontFamily: FONTS.semiBold,
    fontSize: 10.5,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  // KOLOM KANAN: INFORMASI PROFIL
  rightColumn: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  rightColumnMobile: {
    width: '100%',
    alignItems: 'center',
  },
  nameNimContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 4,
  },
  nameNimContainerMobile: {
    justifyContent: 'center',
  },
  nameText: {
    fontFamily: FONTS.black,
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: -0.6,
    lineHeight: 34,
  },
  nimBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
  },
  nimBadgeText: {
    fontFamily: FONTS.bold,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  roleText: {
    fontFamily: FONTS.semiBold,
    fontSize: 14.5,
    fontWeight: '600',
    letterSpacing: 0.1,
    marginBottom: 12,
  },
  socialPillsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  socialPillsRowMobile: {
    justifyContent: 'center',
  },
  socialPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
  },
  socialPillText: {
    fontFamily: FONTS.semiBold,
    fontSize: 12,
    fontWeight: '600',
  },
  bioText: {
    fontFamily: FONTS.regular,
    fontSize: 13.5,
    lineHeight: 22,
    marginBottom: 14,
  },
  boldText: {
    fontFamily: FONTS.bold,
    fontWeight: '700',
  },
  badgeFlexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  badgeFlexRowMobile: {
    justifyContent: 'center',
  },
  subtleBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 0,
  },
  subtleBadgeText: {
    fontFamily: FONTS.semiBold,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  ctaRow: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
    marginTop: 'auto',
  },
  ctaRowMobile: {
    flexDirection: 'column',
    width: '100%',
    gap: 8,
  },
  primaryCtaBtn: {
    flex: 1,
    minHeight: 42,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    gap: 8,
  },
  primaryCtaText: {
    fontFamily: FONTS.bold,
    fontSize: 12.5,
    fontWeight: '700',
  },
  secondaryCtaBtn: {
    flex: 1,
    minHeight: 42,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    gap: 8,
  },
  secondaryCtaText: {
    fontFamily: FONTS.semiBold,
    fontSize: 12.5,
    fontWeight: '600',
  },
  // ZOOM LIGHTBOX MODAL STYLES
  zoomBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    ...Platform.select({
      web: {
        backdropFilter: 'blur(8px)' as any,
        cursor: 'default' as any,
      },
    }),
  },
  zoomCard: {
    width: '100%',
    maxWidth: 380,
    borderRadius: 20,
    borderWidth: 1,
    padding: 20,
    alignItems: 'center',
    position: 'relative',
    ...Platform.select({
      web: {
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.2)' as any,
      },
      default: {
        elevation: 8,
      },
    }),
  },
  zoomCloseBtn: {
    position: 'absolute',
    top: 14,
    right: 14,
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    ...Platform.select({
      web: {
        cursor: 'pointer' as any,
      },
    }),
  },
  zoomImageFrame: {
    width: '100%',
    maxWidth: 300,
    aspectRatio: 1,
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
    marginTop: 18,
  },
  zoomImage: {
    width: '100%',
    height: '100%',
  },
  zoomCaption: {
    alignItems: 'center',
    marginTop: 16,
    width: '100%',
    gap: 4,
  },
  zoomName: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  zoomSubtitle: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    textAlign: 'center',
  },
  zoomBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 6,
  },
  zoomBadgeText: {
    fontFamily: FONTS.medium,
    fontSize: 11,
    fontWeight: '500',
  },
});
