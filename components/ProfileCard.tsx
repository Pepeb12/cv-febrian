import React, { useState, useEffect, useRef } from 'react';
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
  Animated,
  Easing,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Theme, FONTS } from '../theme';
import { StudentProfile } from '../types';
import { SECTION_IMAGES } from '../data/sectionImages';

interface ProfileCardProps {
  data?: StudentProfile | any;
  profile?: StudentProfile | any;
  theme: Theme;
  onExploreScore?: () => void;
  onContactClick?: () => void;
}

export default function ProfileCard({
  data,
  profile,
  theme,
  onExploreScore,
  onContactClick,
}: ProfileCardProps) {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1024;
  const isMobile = width < 768;

  const student = data || profile;
  const isDark = theme.isDark;

  const [isPhotoZoomed, setIsPhotoZoomed] = useState(false);

  // Typewriter animation state for role
  const fullRoleText = student?.profesi || 'Junior Systems Analyst & Mobile App Developer';
  const [typedRole, setTypedRole] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);

  // Floating orbit badges animation
  const floatAnim1 = useRef(new Animated.Value(0)).current;
  const floatAnim2 = useRef(new Animated.Value(0)).current;
  const meshRotateAnim = useRef(new Animated.Value(0)).current;

  // Typewriter effect
  useEffect(() => {
    let currentIdx = 0;
    let isDeleting = false;
    let timer: any = null;

    const tick = () => {
      if (!isDeleting) {
        setTypedRole(fullRoleText.slice(0, currentIdx + 1));
        currentIdx++;
        if (currentIdx === fullRoleText.length) {
          timer = setTimeout(() => {
            isDeleting = true;
            tick();
          }, 3500);
          return;
        }
      } else {
        setTypedRole(fullRoleText.slice(0, currentIdx - 1));
        currentIdx--;
        if (currentIdx === 0) {
          isDeleting = false;
        }
      }
      const speed = isDeleting ? 30 : 70;
      timer = setTimeout(tick, speed);
    };

    timer = setTimeout(tick, 200);

    // Blinking cursor
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 530);

    return () => {
      clearTimeout(timer);
      clearInterval(cursorInterval);
    };
  }, [fullRoleText]);

  // Floating animations
  useEffect(() => {
    const loop1 = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim1, {
          toValue: -10,
          duration: 2800,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: Platform.OS !== 'web',
        }),
        Animated.timing(floatAnim1, {
          toValue: 0,
          duration: 2800,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: Platform.OS !== 'web',
        }),
      ])
    );

    const loop2 = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim2, {
          toValue: 8,
          duration: 3200,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: Platform.OS !== 'web',
        }),
        Animated.timing(floatAnim2, {
          toValue: 0,
          duration: 3200,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: Platform.OS !== 'web',
        }),
      ])
    );

    const loopRotate = Animated.loop(
      Animated.timing(meshRotateAnim, {
        toValue: 1,
        duration: 30000,
        easing: Easing.linear,
        useNativeDriver: Platform.OS !== 'web',
      })
    );

    loop1.start();
    loop2.start();
    loopRotate.start();

    return () => {
      loop1.stop();
      loop2.stop();
      loopRotate.stop();
    };
  }, [floatAnim1, floatAnim2, meshRotateAnim]);

  const spin = meshRotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const handleOpenGitHub = () => {
    const url = student?.githubUrl || 'https://github.com/pepeb12';
    if (Platform.OS === 'web') {
      window.open(url, '_blank');
    } else {
      Linking.openURL(url).catch(() => Alert.alert('GitHub', `Akun GitHub: pepeb12\n${url}`));
    }
  };

  if (!student) return null;

  return (
    <View
      style={[
        styles.heroContainer,
        {
          backgroundColor: theme.surface,
          borderColor: theme.border,
          padding: isMobile ? 18 : 28,
        },
      ]}
      accessibilityRole="region"
      accessibilityLabel="Header Profil Mahasiswa"
    >
      <View style={[styles.asymmetricLayout, isDesktop ? styles.rowDesktop : styles.columnMobile]}>
        {/* ========================================================
            KOLOM KIRI (55%): BADGE STATUS, NAMA BESAR, TYPEWRITER, PARAGRAF, TOMBOL
            ======================================================== */}
        <View style={[styles.leftContentCol, isDesktop && styles.leftContentColDesktop]}>
          {/* 1. Badge Status dengan Titik Hijau Menyala */}
          <View
            style={[
              styles.statusBadge,
              {
                backgroundColor: isDark ? 'rgba(34, 197, 94, 0.12)' : 'rgba(22, 163, 74, 0.08)',
                borderColor: isDark ? 'rgba(34, 197, 94, 0.35)' : 'rgba(22, 163, 74, 0.25)',
              },
            ]}
          >
            <View style={styles.greenPulseDot} />
            <Text
              style={[
                styles.statusText,
                { color: isDark ? '#4ADE80' : '#15803D' },
              ]}
            >
              {student.status || 'Mahasiswa Aktif'} • Semester {student.semester || 5}
            </Text>
          </View>

          {/* 2. Nama Lengkap Besar (fontSize 48 di Desktop) dengan Aksen Indigo */}
          <Text style={[styles.heroName, { color: theme.textPrimary }]}>
            Febrian Iradatul{' '}
            <Text style={{ color: theme.textHighlight }}>
              Rahman
            </Text>
          </Text>

          {/* 3. Role dengan Efek Ketik (Typewriter) Emas Amber & Kursor Berkedip */}
          <View style={styles.typewriterRow}>
            <Text style={[styles.typewriterText, { color: theme.secondary }]}>
              {typedRole}
            </Text>
            <Text
              style={[
                styles.blinkingCursor,
                {
                  color: theme.secondary,
                  opacity: cursorVisible ? 1 : 0,
                },
              ]}
            >
              |
            </Text>
          </View>

          {/* 4. Paragraf Deskripsi Profil Asli */}
          <Text style={[styles.heroDescription, { color: theme.textSecondary }]}>
            {student.deskripsi}
          </Text>

          {/* 5. Baris Tombol Aksi: Kapsul Solid Indigo & Frosted Outline */}
          <View style={styles.actionButtonsRow}>
            {onExploreScore && (
              <TouchableOpacity
                style={[
                  styles.primaryCapsuleBtn,
                  { backgroundColor: theme.primaryButton },
                ]}
                onPress={onExploreScore}
                activeOpacity={0.8}
                accessibilityRole="button"
                accessibilityLabel="Lihat Capaian Akademik My Score"
              >
                <Ionicons name="school-outline" size={17} color="#FFFFFF" />
                <Text style={styles.primaryBtnText}>Lihat My Score</Text>
              </TouchableOpacity>
            )}

            {onContactClick && (
              <TouchableOpacity
                style={[
                  styles.outlineCapsuleBtn,
                  {
                    borderColor: theme.borderStrong,
                    backgroundColor: isDark ? 'rgba(30, 37, 70, 0.5)' : 'rgba(238, 242, 255, 0.7)',
                  },
                ]}
                onPress={onContactClick}
                activeOpacity={0.8}
                accessibilityRole="button"
                accessibilityLabel="Hubungi Saya"
              >
                <Ionicons name="mail-outline" size={16} color={theme.textPrimary} />
                <Text style={[styles.outlineBtnText, { color: theme.textPrimary }]}>
                  Hubungi Saya
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={[
                styles.outlineCapsuleBtn,
                {
                  borderColor: theme.border,
                  backgroundColor: isDark ? 'rgba(22, 27, 51, 0.6)' : 'rgba(241, 245, 249, 0.8)',
                },
              ]}
              onPress={handleOpenGitHub}
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityLabel="Buka Profil GitHub"
            >
              <Ionicons name="logo-github" size={16} color={theme.textPrimary} />
              <Text style={[styles.outlineBtnText, { color: theme.textPrimary }]}>
                GitHub
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ========================================================
            KOLOM KANAN (45%): FOTO PROFIL, WIREFRAME MESH ORBIT & 4 FLOATING BADGES
            ======================================================== */}
        <View style={[styles.rightVisualCol, isDesktop && styles.rightVisualColDesktop]}>
          {/* Wireframe Mesh Spirograph Orbit di belakang foto */}
          <Animated.View
            style={[
              styles.meshOrbitRing,
              {
                borderColor: isDark ? 'rgba(99, 102, 241, 0.3)' : 'rgba(79, 70, 229, 0.16)',
                transform: [{ rotate: spin }],
              },
            ]}
          >
            <View
              style={[
                styles.meshOrbitInner,
                {
                  borderColor: isDark ? 'rgba(245, 158, 11, 0.25)' : 'rgba(217, 119, 6, 0.14)',
                },
              ]}
            />
          </Animated.View>

          {/* Avatar Profile Frame */}
          <TouchableOpacity
            style={[
              styles.avatarContainer,
              {
                borderColor: theme.primary,
                backgroundColor: theme.surfaceMuted,
              },
            ]}
            onPress={() => setIsPhotoZoomed(true)}
            activeOpacity={0.9}
            accessibilityRole="button"
            accessibilityLabel={`Foto profil ${student.nama}. Ketuk untuk memperbesar.`}
          >
            <Image
              source={SECTION_IMAGES.GAMBAR_1_HOME.source}
              style={styles.avatarImage}
              resizeMode="cover"
            />
            {/* Overlay hint */}
            <View style={styles.zoomHintBadge}>
              <Ionicons name="scan-outline" size={14} color="#FFFFFF" />
            </View>
          </TouchableOpacity>

          {/* BADGE 1: Kiri Atas (NIM) */}
          <Animated.View
            style={[
              styles.floatingBadge,
              styles.badgeTopLeft,
              {
                backgroundColor: theme.surface,
                borderColor: theme.border,
                transform: [{ translateY: floatAnim1 }],
              },
            ]}
          >
            <View style={[styles.dotPill, { backgroundColor: '#6366F1' }]} />
            <Text style={[styles.floatingBadgeText, { color: theme.textPrimary }]}>
              NIM: {student.nim}
            </Text>
          </Animated.View>

          {/* BADGE 2: Kanan Atas (IPK & SKS) */}
          <Animated.View
            style={[
              styles.floatingBadge,
              styles.badgeTopRight,
              {
                backgroundColor: theme.surface,
                borderColor: theme.border,
                transform: [{ translateY: floatAnim2 }],
              },
            ]}
          >
            <View style={[styles.dotPill, { backgroundColor: '#F59E0B' }]} />
            <Text style={[styles.floatingBadgeText, { color: theme.textPrimary }]}>
              IPK 3.84 • SKS 92
            </Text>
          </Animated.View>

          {/* BADGE 3: Kiri Bawah (React Native) */}
          <Animated.View
            style={[
              styles.floatingBadge,
              styles.badgeBottomLeft,
              {
                backgroundColor: theme.surface,
                borderColor: theme.border,
                transform: [{ translateY: floatAnim2 }],
              },
            ]}
          >
            <View style={[styles.dotPill, { backgroundColor: '#38BDF8' }]} />
            <Text style={[styles.floatingBadgeText, { color: theme.textPrimary }]}>
              React Native & Expo
            </Text>
          </Animated.View>

          {/* BADGE 4: Kanan Bawah (Masoem University) */}
          <Animated.View
            style={[
              styles.floatingBadge,
              styles.badgeBottomRight,
              {
                backgroundColor: theme.surface,
                borderColor: theme.border,
                transform: [{ translateY: floatAnim1 }],
              },
            ]}
          >
            <View style={[styles.dotPill, { backgroundColor: '#22C55E' }]} />
            <Text style={[styles.floatingBadgeText, { color: theme.textPrimary }]}>
              Masoem University
            </Text>
          </Animated.View>
        </View>
      </View>

      {/* ========================================================
          MODAL INTERAKTIF: ZOOM FOTO DI TENGAH LAYAR
          ======================================================== */}
      <Modal
        visible={isPhotoZoomed}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsPhotoZoomed(false)}
      >
        <Pressable
          style={styles.modalBackdrop}
          onPress={() => setIsPhotoZoomed(false)}
          accessibilityRole="button"
          accessibilityLabel="Tutup tampilan foto"
        >
          <View
            style={[
              styles.zoomModalContent,
              {
                backgroundColor: theme.surface,
                borderColor: theme.borderStrong,
              },
            ]}
          >
            {/* Header Modal */}
            <View style={styles.modalHeader}>
              <View style={styles.modalTitleBlock}>
                <Text style={[styles.modalTitle, { color: theme.textPrimary }]}>
                  {student.nama}
                </Text>
                <Text style={[styles.modalSubtitle, { color: theme.textSecondary }]}>
                  NIM: {student.nim} • {student.prodi}
                </Text>
              </View>
              <TouchableOpacity
                style={[styles.closeModalBtn, { backgroundColor: theme.surfaceMuted }]}
                onPress={() => setIsPhotoZoomed(false)}
                accessibilityRole="button"
                accessibilityLabel="Tutup modal"
              >
                <Ionicons name="close" size={20} color={theme.textPrimary} />
              </TouchableOpacity>
            </View>

            {/* Foto Resolusi Penuh */}
            <Image
              source={SECTION_IMAGES.GAMBAR_1_HOME.source}
              style={styles.zoomedImage}
              resizeMode="contain"
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  heroContainer: {
    width: '100%',
    borderRadius: 22,
    borderWidth: 1,
    overflow: 'hidden',
    ...Platform.select({
      web: {
        backdropFilter: 'blur(16px)',
        boxShadow: '0 12px 36px rgba(0, 0, 0, 0.15)',
      } as any,
      default: {
        elevation: 6,
      },
    }),
  },
  asymmetricLayout: {
    width: '100%',
    alignItems: 'center',
    gap: 28,
  },
  rowDesktop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  columnMobile: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  // Kiri 55%
  leftContentCol: {
    width: '100%',
    gap: 14,
  },
  leftContentColDesktop: {
    flex: 5.5,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 999,
    borderWidth: 1,
    gap: 8,
  },
  greenPulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#22C55E',
  },
  statusText: {
    fontFamily: FONTS.semiBold,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  heroName: {
    fontFamily: FONTS.extraBold,
    fontSize: Platform.OS === 'web' ? 46 : 38,
    fontWeight: '800',
    letterSpacing: -1,
    lineHeight: Platform.OS === 'web' ? 52 : 46,
  },
  typewriterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 28,
  },
  typewriterText: {
    fontFamily: FONTS.bold,
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  blinkingCursor: {
    fontSize: 18,
    fontWeight: '800',
    marginLeft: 2,
  },
  heroDescription: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    lineHeight: 23,
    letterSpacing: 0.1,
  },
  actionButtonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 6,
  },
  primaryCapsuleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 999,
    gap: 8,
    ...Platform.select({
      web: {
        cursor: 'pointer' as any,
        transition: 'transform 0.15s ease' as any,
      },
    }),
  },
  primaryBtnText: {
    fontFamily: FONTS.bold,
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  outlineCapsuleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 999,
    borderWidth: 1,
    gap: 8,
    ...Platform.select({
      web: {
        cursor: 'pointer' as any,
        transition: 'all 0.15s ease' as any,
      },
    }),
  },
  outlineBtnText: {
    fontFamily: FONTS.semiBold,
    fontSize: 12.5,
    fontWeight: '600',
  },
  // Kanan 45%
  rightVisualCol: {
    position: 'relative',
    width: '100%',
    minHeight: 330,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightVisualColDesktop: {
    flex: 4.5,
    minHeight: 380,
  },
  meshOrbitRing: {
    position: 'absolute',
    width: 290,
    height: 290,
    borderRadius: 145,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  meshOrbitInner: {
    width: 240,
    height: 240,
    borderRadius: 120,
    borderWidth: 1,
    borderStyle: 'dotted',
  },
  avatarContainer: {
    width: 210,
    height: 210,
    borderRadius: 105,
    borderWidth: 3,
    overflow: 'hidden',
    position: 'relative',
    ...Platform.select({
      web: {
        cursor: 'pointer' as any,
        boxShadow: '0 12px 32px rgba(99, 102, 241, 0.3)',
      } as any,
      default: {
        elevation: 8,
      },
    }),
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  zoomHintBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    padding: 6,
    borderRadius: 12,
  },
  // 4 Floating Badges surrounding photo
  floatingBadge: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
    borderWidth: 1,
    gap: 7,
    zIndex: 10,
    ...Platform.select({
      web: {
        backdropFilter: 'blur(12px)',
        boxShadow: '0 6px 18px rgba(0, 0, 0, 0.15)',
      } as any,
      default: {
        elevation: 4,
      },
    }),
  },
  dotPill: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
  },
  floatingBadgeText: {
    fontFamily: FONTS.semiBold,
    fontSize: 11.5,
    fontWeight: '600',
  },
  badgeTopLeft: {
    top: 10,
    left: '4%',
  },
  badgeTopRight: {
    top: 20,
    right: '2%',
  },
  badgeBottomLeft: {
    bottom: 20,
    left: '2%',
  },
  badgeBottomRight: {
    bottom: 10,
    right: '4%',
  },
  // Modal Zoom
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  zoomModalContent: {
    width: '100%',
    maxWidth: 520,
    borderRadius: 20,
    borderWidth: 1,
    padding: 20,
    gap: 16,
    ...Platform.select({
      web: {
        boxShadow: '0 24px 60px rgba(0, 0, 0, 0.5)',
      } as any,
    }),
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalTitleBlock: {
    gap: 2,
  },
  modalTitle: {
    fontFamily: FONTS.bold,
    fontSize: 18,
    fontWeight: '700',
  },
  modalSubtitle: {
    fontFamily: FONTS.medium,
    fontSize: 12,
  },
  closeModalBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  zoomedImage: {
    width: '100%',
    height: 380,
    borderRadius: 14,
  },
});
