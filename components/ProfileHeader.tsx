import React, { useState, useEffect } from 'react';
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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, Theme } from '../theme';
import { StudentProfile } from '../types';

interface ProfileHeaderProps {
  data?: StudentProfile | any;
  profile?: StudentProfile | any;
  theme?: Theme | any;
  onContactClick?: () => void;
  hidePhoto?: boolean;
}

/**
 * ProfileHeader Component — Profil Singkat Mahasiswa (LEVEL 1 & LEVEL 2)
 * Desain Burgundy Classic Minimalist & Elegan
 * - Foto profil resmi almamater Masoem University dengan border glow
 * - Dynamic typewriter role (Mobile Developer dan Web Development & Musik Enthusiast)
 * - Identitas akademik lengkap (NIM, Program Studi, Fakultas, Kampus, Lokasi)
 * - Tombol aksi kontak langsung & kanal sosial media terintegrasi
 */
export default function ProfileHeader({
  data,
  profile,
  theme,
  onContactClick,
  hidePhoto = false,
}: ProfileHeaderProps) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const student = data || profile || {};
  const currentTheme: Theme = theme || COLORS;

  // Role Profesi Dinamis (Mesin Tik)
  const ROLES = [
    'Pengembang Aplikasi Mobile & Web',
    'Peminat Musik & Penggiat Seni',
  ];
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedRole, setDisplayedRole] = useState(ROLES[0]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);

  useEffect(() => {
    const current = ROLES[roleIndex];
    const speed = isDeleting ? 30 : 60;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayedRole.length < current.length) {
          setDisplayedRole(current.slice(0, displayedRole.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2400);
        }
      } else {
        if (displayedRole.length > 0) {
          setDisplayedRole(current.slice(0, displayedRole.length - 1));
        } else {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % ROLES.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [displayedRole, isDeleting, roleIndex]);

  // Keyboard escape listener untuk Avatar Modal
  useEffect(() => {
    if (Platform.OS !== 'web' || !isAvatarModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsAvatarModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAvatarModalOpen]);

  const handleOpenGitHub = () => {
    const url = 'https://github.com/pepeb12';
    if (Platform.OS === 'web') {
      window.open(url, '_blank');
    } else {
      Linking.openURL(url).catch(() => Alert.alert('GitHub', `pepeb12: ${url}`));
    }
  };

  const handleOpenEmail = () => {
    const email = student.contact?.email || 'febrianrahman902@gmail.com';
    if (Platform.OS === 'web') {
      window.open(`mailto:${email}`, '_blank');
    } else {
      Linking.openURL(`mailto:${email}`).catch(() => Alert.alert('Email', email));
    }
  };

  const handleOpenWhatsApp = () => {
    const phone = '6289512336537';
    const text = encodeURIComponent('Halo Febrian, saya melihat CV/Portfolio Anda.');
    const url = `https://wa.me/${phone}?text=${text}`;
    if (Platform.OS === 'web') {
      window.open(url, '_blank');
    } else {
      Linking.openURL(url).catch(() => Alert.alert('WhatsApp', '0895-1233-6537'));
    }
  };

  const handleOpenInstagram = () => {
    const url = 'https://instagram.com/febrianrhmn_2';
    if (Platform.OS === 'web') {
      window.open(url, '_blank');
    } else {
      Linking.openURL(url).catch(() => Alert.alert('Instagram', '@febrianrhmn_2'));
    }
  };

  const profileImgSource = require('../assets/profile.jpg');

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
      accessibilityLabel="Header Profil Mahasiswa"
      {...(Platform.OS === 'web' ? { className: 'scroll-reveal fade-in-up' } : {})}
    >
      <View
        style={[
          styles.heroContentWrapper,
          isMobile && styles.heroContentWrapperMobile,
        ]}
      >
        {/* FOTO PROFIL MAHASISWA & STATUS AKTIF */}
        {!hidePhoto && (
          <View
            style={[styles.photoColumn, isMobile && styles.photoColumnMobile]}
            {...(Platform.OS === 'web' ? { className: 'fade-in-left' } : {})}
          >
            <TouchableOpacity
              activeOpacity={0.88}
              onPress={() => setIsAvatarModalOpen(true)}
              style={styles.avatarTouchable}
              accessibilityRole="button"
              accessibilityLabel="Perbesar foto profil Febrian Iradatul Rahman"
            >
              <View
                style={[
                  styles.avatarWrapper,
                  {
                    borderColor: currentTheme.primary,
                    shadowColor: currentTheme.primary,
                  },
                ]}
                {...(Platform.OS === 'web' ? { className: 'scale-fade avatar-glow' } : {})}
              >
                <Image
                  source={profileImgSource}
                  style={styles.avatarImage}
                  resizeMode="cover"
                  accessible
                  accessibilityLabel="Foto Resmi Febrian Iradatul Rahman - Jas Masoem University"
                />
                <View style={styles.zoomHintBadge}>
                  <Ionicons name="expand-outline" size={13} color="#FFFFFF" />
                </View>
              </View>
            </TouchableOpacity>

            {/* Status Aktif Mahasiswa */}
            <View
              style={[
                styles.statusPill,
                {
                  backgroundColor: currentTheme.surface2,
                  borderColor: currentTheme.border,
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

        {/* INFORMASI: NAMA, NIM, ROLE, METADATA, & AKSI */}
        <View
          style={[styles.infoColumn, isMobile && styles.infoColumnMobile]}
          {...(Platform.OS === 'web' ? { className: 'fade-in-right' } : {})}
        >
          {/* H1 NAMA MAHASISWA & BADGE NIM */}
          <View
            style={[styles.nameNimRow, isMobile && styles.nameNimRowMobile]}
            {...(Platform.OS === 'web' ? { className: 'slide-up' } : {})}
          >
            <Text
              style={[
                styles.nameHeading,
                {
                  color: currentTheme.heading,
                  textAlign: isMobile ? 'center' : 'left',
                },
              ]}
            >
              {student.nama || student.fullName || 'Febrian Iradatul Rahman'}
            </Text>
            <View
              style={[
                styles.nimBadge,
                {
                  backgroundColor: currentTheme.surface2,
                  borderColor: currentTheme.border,
                },
              ]}
            >
              <Ionicons name="id-card-outline" size={13} color={currentTheme.primary} />
              <Text style={[styles.nimBadgeText, { color: currentTheme.textPrimary }]}>
                NIM: {student.nim || '242505024'}
              </Text>
            </View>
          </View>

          {/* DYNAMIC ROLE DENGAN KURSOR MENGETIK */}
          <View style={[styles.roleRow, isMobile && { justifyContent: 'center' }]}>
            <View style={[styles.roleDot, { backgroundColor: currentTheme.primary }]} />
            <Text
              style={[
                styles.roleText,
                {
                  color: currentTheme.textSecondary,
                  textAlign: isMobile ? 'center' : 'left',
                },
              ]}
            >
              {displayedRole}
              <Text style={{ color: currentTheme.primary, fontWeight: '700' }}>|</Text>
            </Text>
          </View>

          {/* BADGES IDENTITAS AKADEMIK */}
          <View style={[styles.metaBadgesRow, isMobile && { justifyContent: 'center' }]}>
            <View
              style={[
                styles.metaBadge,
                { backgroundColor: currentTheme.surface2, borderColor: currentTheme.border },
              ]}
            >
              <Ionicons name="school-outline" size={13} color={currentTheme.primary} />
              <Text style={[styles.metaBadgeText, { color: currentTheme.textSecondary }]}>
                Masoem University
              </Text>
            </View>
            <View
              style={[
                styles.metaBadge,
                { backgroundColor: currentTheme.surface2, borderColor: currentTheme.border },
              ]}
            >
              <Ionicons name="desktop-outline" size={13} color={currentTheme.primary} />
              <Text style={[styles.metaBadgeText, { color: currentTheme.textSecondary }]}>
                S1 Sistem Informasi
              </Text>
            </View>
            <View
              style={[
                styles.metaBadge,
                { backgroundColor: currentTheme.surface2, borderColor: currentTheme.border },
              ]}
            >
              <Ionicons name="location-outline" size={13} color={currentTheme.primary} />
              <Text style={[styles.metaBadgeText, { color: currentTheme.textSecondary }]}>
                Cicalengka, Kab. Bandung
              </Text>
            </View>
          </View>

          {/* TOMBOL AKSI CEPAT & KANAL SOSIAL */}
          <View style={[styles.actionRow, isMobile && styles.actionRowMobile]}>
            <TouchableOpacity
              style={[styles.primaryActionBtn, { backgroundColor: currentTheme.primary }]}
              onPress={onContactClick || handleOpenWhatsApp}
              activeOpacity={0.82}
              accessibilityRole="button"
              accessibilityLabel="Kirim pesan langsung ke Febrian"
              {...(Platform.OS === 'web' ? { className: 'interactive-btn' } : {})}
            >
              <Ionicons
                name="chatbubbles"
                size={16}
                color={currentTheme.isDark ? '#25191D' : '#FFFFFF'}
              />
              <Text
                style={[
                  styles.primaryActionBtnText,
                  { color: currentTheme.isDark ? '#25191D' : '#FFFFFF' },
                ]}
              >
                Hubungi Saya
              </Text>
            </TouchableOpacity>

            <View style={styles.socialButtonsGroup}>
              <TouchableOpacity
                style={[
                  styles.iconBtn,
                  { backgroundColor: currentTheme.surface2, borderColor: currentTheme.border },
                ]}
                onPress={handleOpenGitHub}
                activeOpacity={0.7}
                accessibilityRole="button"
                accessibilityLabel="Kunjungi GitHub Febrian"
                {...(Platform.OS === 'web' ? { className: 'social-icon-btn' } : {})}
              >
                <Ionicons name="logo-github" size={17} color={currentTheme.textPrimary} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.iconBtn,
                  { backgroundColor: currentTheme.surface2, borderColor: currentTheme.border },
                ]}
                onPress={handleOpenInstagram}
                activeOpacity={0.7}
                accessibilityRole="button"
                accessibilityLabel="Kunjungi Instagram Febrian"
                {...(Platform.OS === 'web' ? { className: 'social-icon-btn' } : {})}
              >
                <Ionicons name="logo-instagram" size={17} color={currentTheme.primary} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.iconBtn,
                  { backgroundColor: currentTheme.surface2, borderColor: currentTheme.border },
                ]}
                onPress={handleOpenEmail}
                activeOpacity={0.7}
                accessibilityRole="button"
                accessibilityLabel="Kirim email ke Febrian"
                {...(Platform.OS === 'web' ? { className: 'social-icon-btn' } : {})}
              >
                <Ionicons name="mail-outline" size={17} color={currentTheme.textPrimary} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      {/* MODAL LIGHTBOX FOTO PROFIL MAHASISWA */}
      <Modal
        visible={isAvatarModalOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsAvatarModalOpen(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setIsAvatarModalOpen(false)}
          style={styles.modalBackdrop}
        >
          <View
            style={[
              styles.avatarModalCard,
              {
                backgroundColor: currentTheme.surface,
                borderColor: currentTheme.border,
              },
            ]}
          >
            <View style={styles.modalTopBar}>
              <Text style={[styles.modalTitle, { color: currentTheme.heading }]}>
                Foto Resmi Mahasiswa
              </Text>
              <TouchableOpacity
                onPress={() => setIsAvatarModalOpen(false)}
                style={[styles.modalCloseBtn, { borderColor: currentTheme.border }]}
                accessibilityLabel="Tutup preview foto"
              >
                <Ionicons name="close" size={18} color={currentTheme.textPrimary} />
              </TouchableOpacity>
            </View>
            <Image
              source={profileImgSource}
              style={styles.avatarModalImage}
              resizeMode="cover"
            />
            <Text style={[styles.avatarModalCaption, { color: currentTheme.textSecondary }]}>
              Febrian Iradatul Rahman — Universitas Ma'soem (NIM: 242505024)
            </Text>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  heroContainer: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 24,
    width: '100%',
    ...Platform.select({
      web: {
        backdropFilter: 'blur(20px)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.35), 0 0 1px rgba(132, 63, 75, 0.25)',
      } as any,
      default: {
        elevation: 4,
      },
    }),
  },
  heroContentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 28,
    width: '100%',
  },
  heroContentWrapperMobile: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 18,
  },
  photoColumn: {
    alignItems: 'center',
    gap: 10,
  },
  photoColumnMobile: {
    width: '100%',
    alignItems: 'center',
  },
  avatarTouchable: {
    cursor: 'pointer' as any,
  },
  avatarWrapper: {
    width: 130,
    height: 130,
    borderRadius: 22,
    borderWidth: 2,
    overflow: 'hidden',
    position: 'relative',
    ...Platform.select({
      web: {
        boxShadow: '0 8px 24px rgba(132, 63, 75, 0.28)',
      } as any,
    }),
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  zoomHintBadge: {
    position: 'absolute',
    bottom: 6,
    right: 6,
    backgroundColor: 'rgba(3, 7, 18, 0.75)',
    borderRadius: 6,
    padding: 3,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1,
    gap: 5,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  statusText: {
    fontFamily: FONTS.mono,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  infoColumn: {
    flex: 1,
    gap: 12,
  },
  infoColumnMobile: {
    width: '100%',
    alignItems: 'center',
  },
  nameNimRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 12,
  },
  nameNimRowMobile: {
    justifyContent: 'center',
  },
  nameHeading: {
    fontFamily: FONTS.display,
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  nimBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1,
    gap: 6,
  },
  nimBadgeText: {
    fontFamily: FONTS.mono,
    fontSize: 11.5,
    fontWeight: '700',
  },
  roleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  roleDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  roleText: {
    fontFamily: FONTS.mono,
    fontSize: 13.5,
    fontWeight: '600',
  },
  metaBadgesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  metaBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    gap: 6,
  },
  metaBadgeText: {
    fontSize: 12,
    fontWeight: '500',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 4,
  },
  actionRowMobile: {
    justifyContent: 'center',
    width: '100%',
  },
  primaryActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: 10,
    gap: 7,
    ...Platform.select({
      web: {
        cursor: 'pointer' as any,
        transition: 'transform 0.15s ease' as any,
      },
    }),
  },
  primaryActionBtnText: {
    fontFamily: FONTS.bold,
    fontSize: 13,
    fontWeight: '700',
  },
  socialButtonsGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      web: {
        cursor: 'pointer' as any,
      },
    }),
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.82)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    ...Platform.select({
      web: {
        backdropFilter: 'blur(10px)',
      } as any,
    }),
  },
  avatarModalCard: {
    maxWidth: 420,
    width: '100%',
    borderRadius: 18,
    borderWidth: 1.5,
    padding: 18,
    alignItems: 'center',
    gap: 14,
  },
  modalTopBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalTitle: {
    fontFamily: FONTS.display,
    fontSize: 16,
    fontWeight: '700',
  },
  modalCloseBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarModalImage: {
    width: '100%',
    height: 340,
    borderRadius: 12,
  },
  avatarModalCaption: {
    fontFamily: FONTS.body,
    fontSize: 12,
    textAlign: 'center',
  },
});
