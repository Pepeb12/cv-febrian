import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SHADOWS, SPACING } from '../theme';
import { StudentProfile, ThemeColors } from '../types';

interface ProfileCardProps {
  data?: StudentProfile | any;
  profile?: StudentProfile | any;
  theme?: ThemeColors | any;
  onExploreScore?: () => void;
  onContactClick?: () => void;
}

/**
 * ProfileCard Component (Inspired by Clean Portfolio Aesthetics, Not AI Slop)
 * Menampilkan foto profil melingkar, tipografi tegas, peran dengan separator titik,
 * dan bio dengan penekanan kata kunci profesional.
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
      {/* 1. FOTO PROFIL MAHASISWA (Clean Portrait with Status Ring) */}
      <View style={styles.avatarSection}>
        <View
          style={[
            styles.avatarFrame,
            {
              borderColor: isDark ? 'rgba(255, 255, 255, 0.15)' : '#E2E8F0',
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
              backgroundColor: isDark ? '#064E3B' : '#ECFDF5',
              borderColor: isDark ? '#059669' : '#A7F3D0',
            },
          ]}
        >
          <View style={styles.statusDot} />
          <Text
            style={[
              styles.statusText,
              { color: isDark ? '#34D399' : '#059669' },
            ]}
          >
            MAHASISWA AKTIF • SMT 5
          </Text>
        </View>
      </View>

      {/* 2. NAMA LENGKAP MAHASISWA (Large, Confident, Clean Typography) */}
      <Text style={[styles.nameText, { color: currentTheme.textPrimary }]}>
        {student.nama || student.fullName}
      </Text>

      {/* 3. ROLES DENGAN TITIK SEPARATOR (Inspirasi Elegan Portofolio Profesional) */}
      <View style={styles.rolesRow}>
        <Text style={[styles.roleItem, { color: currentTheme.primary }]}>Systems Analyst</Text>
        <Text style={[styles.roleDot, { color: currentTheme.textMuted }]}>•</Text>
        <Text style={[styles.roleItem, { color: currentTheme.primary }]}>Mobile Developer</Text>
        <Text style={[styles.roleDot, { color: currentTheme.textMuted }]}>•</Text>
        <Text style={[styles.roleItem, { color: currentTheme.primary }]}>Masoem University</Text>
      </View>

      {/* 4. NARASI PERSONAL BIO (Human, Focused, & Sincere) */}
      <Text style={[styles.bioText, { color: currentTheme.textSecondary }]}>
        Menjembatani <Text style={[styles.boldText, { color: currentTheme.textPrimary }]}>analisis proses bisnis</Text> dengan solusi <Text style={[styles.boldText, { color: currentTheme.textPrimary }]}>aplikasi mobile modern</Text>. Mahasiswa semester 5 Program Studi Sistem Informasi di Masoem University yang berfokus pada pengembangan React Native, UI/UX, dan arsitektur database relasional.
      </Text>

      {/* 5. METADATA IDENTITAS KAMPUS & DOMISILI (Clean Grid) */}
      <View
        style={[
          styles.metaGrid,
          {
            backgroundColor: currentTheme.isDark ? '#0F172A' : '#F8FAFC',
            borderColor: currentTheme.border,
          },
        ]}
      >
        <View style={styles.metaCell}>
          <Text style={[styles.metaLabel, { color: currentTheme.textMuted }]}>NIM MAHASISWA</Text>
          <Text style={[styles.metaValue, { color: currentTheme.textPrimary }]}>
            {student.nim}
          </Text>
        </View>
        <View style={[styles.metaDividerV, { backgroundColor: currentTheme.border }]} />
        <View style={styles.metaCell}>
          <Text style={[styles.metaLabel, { color: currentTheme.textMuted }]}>PROGRAM STUDI</Text>
          <Text style={[styles.metaValue, { color: currentTheme.textPrimary }]}>
            {student.prodi || 'Sistem Informasi'}
          </Text>
        </View>
        <View style={[styles.metaDividerV, { backgroundColor: currentTheme.border }]} />
        <View style={styles.metaCell}>
          <Text style={[styles.metaLabel, { color: currentTheme.textMuted }]}>DOMISILI ASAL</Text>
          <Text style={[styles.metaValue, { color: currentTheme.textPrimary }]}>
            Cicalengka, Bandung
          </Text>
        </View>
      </View>

      {/* 6. CALL TO ACTION BUTTONS (Sleek, Clean, Authentic) */}
      <View style={styles.ctaRow}>
        <TouchableOpacity
          style={[styles.primaryCtaBtn, { backgroundColor: currentTheme.primary }]}
          onPress={onExploreScore}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel="Lihat Capaian Nilai UTS"
        >
          <Ionicons name="school" size={16} color="#FFFFFF" />
          <Text style={styles.primaryCtaText}>Capaian Nilai UTS (90/A)</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.secondaryCtaBtn,
            {
              backgroundColor: currentTheme.isDark ? '#1E293B' : '#F1F5F9',
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
  );
}

const styles = StyleSheet.create({
  heroContainer: {
    borderRadius: 20,
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
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    padding: 3,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 56,
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
    backgroundColor: '#10B981',
  },
  statusText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  nameText: {
    fontSize: 24,
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: -0.5,
    marginBottom: 6,
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
    fontSize: 13,
    fontWeight: '700',
  },
  roleDot: {
    fontSize: 12,
    fontWeight: '700',
  },
  bioText: {
    fontSize: 13,
    lineHeight: 22,
    textAlign: 'center',
    maxWidth: 620,
    marginBottom: SPACING.lg,
  },
  boldText: {
    fontWeight: '700',
  },
  metaGrid: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.sm,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: SPACING.lg,
  },
  metaCell: {
    flex: 1,
    alignItems: 'center',
  },
  metaLabel: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.6,
    marginBottom: 2,
    textTransform: 'uppercase',
  },
  metaValue: {
    fontSize: 12,
    fontWeight: '800',
  },
  metaDividerV: {
    width: 1,
    height: 24,
  },
  ctaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 10,
    width: '100%',
  },
  primaryCtaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
    gap: 8,
  },
  primaryCtaText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
  secondaryCtaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    gap: 8,
  },
  secondaryCtaText: {
    fontWeight: '700',
    fontSize: 13,
  },
});
