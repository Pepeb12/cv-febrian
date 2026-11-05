import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, Linking, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Theme, FONTS } from '../theme';
import { TabKey } from './NavigationTabBar';

interface CosmicFooterProps {
  theme: Theme;
  onNavigate?: (tab: TabKey) => void;
  onScrollToTop?: () => void;
  studentName?: string;
  studentNim?: string;
}

/**
 * CosmicFooter — Footer Pengembang & Institusi Terpadu
 * Menggabungkan identitas akademik Masoem University dan branding pengembang `>_ Febrian.dev`
 * secara rapi, simetris, dan elegan.
 */
export default function CosmicFooter({
  theme,
  onNavigate = () => {},
  onScrollToTop = () => {},
  studentName = 'Febrian Iradatul Rahman',
  studentNim = '242505024',
}: CosmicFooterProps) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const isDark = theme.isDark;

  const handleOpenLink = (url: string) => {
    if (Platform.OS === 'web') {
      window.open(url, '_blank');
    } else {
      Linking.openURL(url);
    }
  };

  return (
    <View
      style={[
        styles.footerContainer,
        {
          backgroundColor: theme.surface,
          borderTopColor: theme.border,
        },
      ]}
    >
      {/* 1. INSTITUTIONAL ACCREDITATION STRIP (MASOEM UNIVERSITY) */}
      <View
        style={[
          styles.institutionStrip,
          {
            backgroundColor: theme.surface2,
            borderColor: theme.border,
          },
        ]}
      >
        <View style={styles.institutionLeft}>
          <View style={[styles.mottoPill, { backgroundColor: theme.primaryLight, borderColor: theme.borderLight }]}>
            <Ionicons name="school" size={14} color={theme.accent} />
            <Text style={[styles.mottoText, { color: theme.accent }]}>
              TEKUN • DISIPLIN • BERKELAS
            </Text>
          </View>
          <Text style={[styles.institutionText, { color: theme.textSecondary }]}>
            Fakultas Komputer • Masoem University
          </Text>
        </View>

        <View style={styles.institutionRight}>
          <Text style={[styles.courseMetaText, { color: theme.textMuted }]}>
            UTS Pemrograman Mobile 2
          </Text>
        </View>
      </View>

      {/* 2. MAIN FOOTER CONTENT WRAPPER */}
      <View style={styles.innerWrapper}>
        {/* KOLOM KIRI: BRAND DEVELOPER & BIO */}
        <View style={[styles.brandCol, isMobile && { minWidth: '100%' }]}>
          <View style={styles.brandRow}>
            <Text style={[styles.terminalPrompt, { color: theme.primary }]}>{'>_'}</Text>
            <Text style={[styles.brandTitle, { color: theme.heading }]}>
              pepeb's<Text style={{ color: theme.primary }}>developer</Text>
            </Text>
          </View>
          <Text style={[styles.tagline, { color: theme.textSecondary }]}>
            Membangun pengalaman mobile dan web modern dengan presisi kode, tipografi tajam, dan interaksi dimensi yang responsif.
          </Text>
          <Text style={[styles.copyright, { color: theme.textMuted }]}>
            © 2026 {studentName} ({studentNim}). Hak cipta dilindungi undang-undang.
          </Text>
        </View>

        {/* KOLOM TENGAH: NAVIGASI CEPAT */}
        <View style={[styles.navCol, isMobile && { minWidth: '45%' }]}>
          <Text style={[styles.sectionTitle, { color: theme.accent }]}>
            NAVIGASI
          </Text>
          <TouchableOpacity
            onPress={() => onNavigate('home')}
            style={styles.navLink}
            {...(Platform.OS === 'web' ? { className: 'footer-hover-link' } : {})}
          >
            <Text style={[styles.navLinkText, { color: theme.textSecondary }]}>Beranda</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onNavigate('about')}
            style={styles.navLink}
            {...(Platform.OS === 'web' ? { className: 'footer-hover-link' } : {})}
          >
            <Text style={[styles.navLinkText, { color: theme.textSecondary }]}>Tentang Saya</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onNavigate('skills')}
            style={styles.navLink}
            {...(Platform.OS === 'web' ? { className: 'footer-hover-link' } : {})}
          >
            <Text style={[styles.navLinkText, { color: theme.textSecondary }]}>Keahlian Teknis</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onNavigate('portfolio')}
            style={styles.navLink}
            {...(Platform.OS === 'web' ? { className: 'footer-hover-link' } : {})}
          >
            <Text style={[styles.navLinkText, { color: theme.textSecondary }]}>Portofolio</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onNavigate('score')}
            style={styles.navLink}
            {...(Platform.OS === 'web' ? { className: 'footer-hover-link' } : {})}
          >
            <Text style={[styles.navLinkText, { color: theme.textSecondary }]}>Nilai Akademik (My Score)</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onNavigate('contact')}
            style={styles.navLink}
            {...(Platform.OS === 'web' ? { className: 'footer-hover-link' } : {})}
          >
            <Text style={[styles.navLinkText, { color: theme.textSecondary }]}>Kontak</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (Platform.OS === 'web') {
                const el = document.getElementById('section-level10');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            style={styles.navLink}
            {...(Platform.OS === 'web' ? { className: 'footer-hover-link' } : {})}
          >
            <Text style={[styles.navLinkText, { color: theme.primary, fontWeight: '700' }]}>
              ★ Level 10 Showcase
            </Text>
          </TouchableOpacity>
        </View>

        {/* KOLOM KANAN: TERHUBUNG & KEMBALI KE ATAS */}
        <View style={[styles.connectCol, isMobile && { minWidth: '45%' }]}>
          <Text style={[styles.sectionTitle, { color: theme.accent }]}>
            TERHUBUNG
          </Text>
          <View style={styles.socialRow}>
            <TouchableOpacity
              style={[
                styles.socialBtn,
                { backgroundColor: theme.surface2, borderColor: theme.border },
              ]}
              {...(Platform.OS === 'web' ? { className: 'social-icon-btn' } : {})}
              onPress={() => handleOpenLink('https://github.com/pepeb12')}
              accessibilityRole="link"
              accessibilityLabel="GitHub"
            >
              <Ionicons name="logo-github" size={17} color={theme.textPrimary} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.socialBtn,
                { backgroundColor: theme.surface2, borderColor: theme.border },
              ]}
              {...(Platform.OS === 'web' ? { className: 'social-icon-btn' } : {})}
              onPress={() => handleOpenLink('mailto:febrianrahman902@gmail.com')}
              accessibilityRole="link"
              accessibilityLabel="Email"
            >
              <Ionicons name="mail" size={17} color={theme.textPrimary} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.socialBtn,
                { backgroundColor: theme.surface2, borderColor: theme.border },
              ]}
              {...(Platform.OS === 'web' ? { className: 'social-icon-btn' } : {})}
              onPress={() => handleOpenLink('https://wa.me/6289512336537')}
              accessibilityRole="link"
              accessibilityLabel="WhatsApp"
            >
              <Ionicons name="logo-whatsapp" size={17} color={theme.textPrimary} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.socialBtn,
                { backgroundColor: theme.surface2, borderColor: theme.border },
              ]}
              {...(Platform.OS === 'web' ? { className: 'social-icon-btn' } : {})}
              onPress={() => handleOpenLink('https://instagram.com/febrianrhmn_2')}
              accessibilityRole="link"
              accessibilityLabel="Instagram"
            >
              <Ionicons name="logo-instagram" size={17} color={theme.textPrimary} />
            </TouchableOpacity>
          </View>

          {/* Tombol Kembali ke Atas */}
          <TouchableOpacity
            style={[styles.backToTopBtn, { backgroundColor: theme.surface2, borderColor: theme.border }]}
            onPress={onScrollToTop}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel="Kembali ke atas halaman"
            {...(Platform.OS === 'web' ? { className: 'interactive-btn' } : {})}
          >
            <Ionicons name="arrow-up" size={13} color={theme.accent} />
            <Text style={[styles.backToTopText, { color: theme.textPrimary }]}>
              Kembali ke Atas
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footerContainer: {
    width: '100%',
    borderTopWidth: 1,
    paddingTop: 32,
    paddingBottom: 40,
    paddingHorizontal: 20,
    marginTop: 32,
    borderRadius: 20,
  },
  institutionStrip: {
    width: '100%',
    maxWidth: 1200,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 32,
    flexWrap: 'wrap',
    gap: 12,
  },
  institutionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flexWrap: 'wrap',
  },
  mottoPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 999,
    borderWidth: 1,
  },
  mottoText: {
    fontFamily: FONTS.mono,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  institutionText: {
    fontFamily: FONTS.bodyMedium,
    fontSize: 12.5,
  },
  institutionRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  courseMetaText: {
    fontFamily: FONTS.mono,
    fontSize: 11,
  },
  innerWrapper: {
    width: '100%',
    maxWidth: 1200,
    alignSelf: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 28,
  },
  brandCol: {
    flex: 1.4,
    minWidth: 260,
    gap: 10,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  terminalPrompt: {
    color: '#38BDF8',
    fontFamily: FONTS.mono,
    fontSize: 18,
    fontWeight: '700',
  },
  brandTitle: {
    fontFamily: FONTS.display,
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  tagline: {
    fontFamily: FONTS.body,
    fontSize: 13,
    lineHeight: 20,
    maxWidth: 420,
  },
  copyright: {
    fontFamily: FONTS.mono,
    fontSize: 11,
    marginTop: 6,
  },
  navCol: {
    minWidth: 130,
    gap: 8,
  },
  sectionTitle: {
    fontFamily: FONTS.mono,
    fontSize: 11.5,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginBottom: 6,
  },
  navLink: {
    paddingVertical: 3,
  },
  navLinkText: {
    fontFamily: FONTS.bodyMedium,
    fontSize: 13,
  },
  connectCol: {
    minWidth: 160,
    gap: 12,
  },
  socialRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  socialBtn: {
    width: 38,
    height: 38,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      web: { cursor: 'pointer' as any },
    }),
  },
  backToTopBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 999,
    borderWidth: 1,
    alignSelf: 'flex-start',
    marginTop: 6,
    ...Platform.select({
      web: { cursor: 'pointer' as any },
    }),
  },
  backToTopText: {
    fontFamily: FONTS.mono,
    fontSize: 11.5,
    fontWeight: '600',
  },
});
