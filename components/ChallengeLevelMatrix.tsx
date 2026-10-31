import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SPACING } from '../theme';
import { ThemeColors } from '../types';

interface ChallengeLevelMatrixProps {
  theme: ThemeColors | any;
  onOpenConceptModal?: () => void;
}

const CHALLENGE_LEVELS = [
  {
    level: 1,
    title: 'LEVEL 1 — NOVICE',
    subtitle: 'Identitas Mahasiswa',
    badge: '100% Lolos',
    color: '#0284C7',
    reqs: [
      'Menampilkan NIM (242505024)',
      'Menampilkan Nama Lengkap (Febrian Iradatul Rahman)',
      'Menampilkan Foto Profil (assets/profile.png)',
      'Aplikasi dapat dijalankan di Web & Android',
    ],
    components: 'ProfileHeader.tsx, ProfileCard.tsx',
    concept: 'JSX, Basic Components (<Image>, <Text>, <View>)',
  },
  {
    level: 2,
    title: 'LEVEL 2 — BEGINNER',
    subtitle: 'Personal Introduction & Heading',
    badge: '100% Lolos',
    color: '#059669',
    reqs: [
      'Seluruh persyaratan Level 1',
      'Menampilkan profesi / bidang minat',
      'Deskripsi singkat tentang diri sendiri',
      'Menampilkan judul / heading yang sesuai',
    ],
    components: 'SectionHeading.js, PersonalIntroCard.js',
    concept: 'Materi P2 — JavaScript, JSX, dan Component',
  },
  {
    level: 3,
    title: 'LEVEL 3 — ELEMENTARY',
    subtitle: 'Layout & Styling Flexbox',
    badge: '100% Lolos',
    color: '#7C3AED',
    reqs: [
      'Seluruh persyaratan Level 2',
      'Layout terstruktur dengan Flexbox',
      'Design tokens warna, jarak, & tipografi terpusat',
      'Tidak ada teks yang terpotong pada layar ponsel',
    ],
    components: 'theme/index.js, MetricBar.js, SkillMatrixCard.js',
    concept: 'Materi P4 — Layout dan Styling React Native',
  },
  {
    level: 4,
    title: 'LEVEL 4 — INTERMEDIATE',
    subtitle: 'Interactive CV, Props, & State',
    badge: '100% Lolos',
    color: '#D97706',
    reqs: [
      'Seluruh persyaratan Level 3',
      'Props untuk kirim data ke komponen anak',
      'State useState untuk form input & endorsement',
      'Formulir kontak (nama, email, pesan) dengan validasi',
    ],
    components: 'ContactFormCard.js, InteractiveEndorseBar.js',
    concept: 'Materi P3 & P5 — Props, State, Form Input, & Event Handling',
  },
  {
    level: 5,
    title: 'LEVEL 5 — COMPETENT',
    subtitle: 'Separation of UI and Data',
    badge: '100% Lolos',
    color: '#DB2777',
    reqs: [
      'Seluruh persyaratan Level 4',
      'Data profil tidak ditulis langsung pada UI (zero hardcode)',
      'Data disimpan dalam berkas terpisah',
      'Komponen UI menerima data melalui Props pipeline',
    ],
    components: 'App.tsx -> Props Pipeline ke semua komponen anak',
    concept: 'Separation of Concerns & Unidirectional Data Flow',
  },
  {
    level: 6,
    title: 'LEVEL 6 — PROFICIENT',
    subtitle: 'Local JSON Data Architecture',
    badge: '100% Lolos',
    color: '#2563EB',
    reqs: [
      'Seluruh persyaratan Level 5',
      'Data profil disimpan murni dalam profile.json',
      'Impor JSON lokal secara native oleh aplikasi',
      'Struktur JSON 100% valid dan lolos parsing schema',
    ],
    components: 'data/profile.json, App.tsx',
    concept: 'Data Modeling, JSON Parsing, & List Mapping',
  },
  {
    level: 7,
    title: 'LEVEL 7 — ADVANCED',
    subtitle: 'Dynamic Content & React Native Exploration',
    badge: '100% Lolos',
    color: '#4F46E5',
    reqs: [
      'Seluruh persyaratan Level 6',
      'Galeri portofolio dengan live search & category filter',
      'Komponen native <Modal /> untuk detail proyek',
      'Dual-theme switcher (Dark Mode & Light Mode)',
      'Timeline pengalaman organisasi & seksi hobi',
    ],
    components: 'PortfolioGallery.js, ExperienceTimeline.js, HobbySection.js',
    concept: 'Advanced React Native Components, Modal, State Filter',
  },
  {
    level: 8,
    title: 'LEVEL 8 — EXPERT',
    subtitle: 'My Score & Academic Dashboard',
    badge: '100% Lolos',
    color: '#0D9488',
    reqs: [
      'Seluruh persyaratan Level 7',
      'Data nilai terpisah di data/academicScore.json',
      'Identitas akademik (Febrian, NIM 242505024, MK, Dosen)',
      'Current Score: Nilai 90, Grade A (Tampil Jelas & Menonjol)',
      'Learning Points: 19.000 LP',
      'Learning Progress: Attendance 100%, Practice 95%, Quest 100%, Challenge 100%',
    ],
    components: 'data/academicScore.json, MyScoreSection.tsx',
    concept: 'Academic Metrics Dashboard, Dynamic Flexbox Progress Bars',
  },
  {
    level: 10,
    title: 'LEVEL 10 — INDUSTRY',
    subtitle: 'Production-Oriented Mobile Application',
    badge: '100% Lolos',
    color: '#059669',
    reqs: [
      'Seluruh persyaratan Level 8',
      'Service layer (academicService.js & storageService.js)',
      'Penanganan kondisi Error 503, Empty State, & Loading Skeleton',
      'ErrorBoundary class component untuk proteksi app crash',
      'Persistensi AsyncStorage untuk preferensi tema & draft',
      'Aksesibilitas (a11y) & gesture Pull-to-Refresh',
      'Automated testing suite (npm test: 10/10 PASS)',
    ],
    components: 'services/*, tests/*, components/ErrorBoundary.tsx',
    concept: 'Production Resilience, Async Storage, Automated Testing, a11y',
  },
];

export default function ChallengeLevelMatrix({ theme, onOpenConceptModal }: ChallengeLevelMatrixProps) {
  const [expandedLevel, setExpandedLevel] = useState(10);
  const isDark = theme?.isDark || false;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme?.surface || '#FFFFFF',
          borderColor: theme?.border || '#E2E8F0',
        },
      ]}
      accessibilityRole="region"
      accessibilityLabel="Matriks Pencapaian Challenge Level"
    >
      {/* Header Matriks */}
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <View style={styles.iconCircle}>
            <MaterialCommunityIcons name="trophy-variant-outline" size={20} color="#0284C7" />
          </View>
          <View>
            <Text style={[styles.mainTitle, { color: theme?.text || '#1E293B' }]}>
              Matriks Penilaian Challenge Level
            </Text>
            <Text style={[styles.mainSubtitle, { color: theme?.textMuted || '#94A3B8' }]}>
              Seluruh Tantangan Level 1 s.d. Level 10 Terpenuhi 100%
            </Text>
          </View>
        </View>

        {onOpenConceptModal ? (
          <TouchableOpacity
            style={styles.defenseBtn}
            onPress={onOpenConceptModal}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityLabel="Buka Panduan Konsep React Native"
          >
            <MaterialCommunityIcons name="school" size={14} color="#FFFFFF" />
            <Text style={styles.defenseBtnText}>Panduan Konsep</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      {/* Grid Level Selector Pills */}
      <View style={styles.pillsRow}>
        {CHALLENGE_LEVELS.map((item) => {
          const isActive = expandedLevel === item.level;
          return (
            <TouchableOpacity
              key={item.level}
              style={[
                styles.levelPill,
                isActive && {
                  backgroundColor: item.color,
                  borderColor: item.color,
                },
                !isActive && {
                  backgroundColor: isDark ? '#1E293B' : '#F1F5F9',
                  borderColor: isDark ? '#334155' : '#CBD5E1',
                },
              ]}
              onPress={() => setExpandedLevel(item.level)}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel={`Pilih Level ${item.level}`}
            >
              <Text
                style={[
                  styles.levelPillText,
                  { color: isActive ? '#FFFFFF' : theme?.textSecondary || '#64748B' },
                ]}
              >
                L{item.level}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Detail Kartu Level Terpilih */}
      {(() => {
        const active = CHALLENGE_LEVELS.find((l) => l.level === expandedLevel) || CHALLENGE_LEVELS[0];
        return (
          <View
            style={[
              styles.detailCard,
              {
                backgroundColor: isDark ? '#0F172A' : '#F8FAFC',
                borderColor: isDark ? '#334155' : '#E2E8F0',
                borderLeftColor: active.color,
              },
            ]}
          >
            <View style={styles.detailHeader}>
              <View style={{ flex: 1 }}>
                <Text style={[styles.detailTitle, { color: active.color }]}>{active.title}</Text>
                <Text style={[styles.detailSubtitle, { color: theme?.text || '#1E293B' }]}>
                  {active.subtitle}
                </Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: `${active.color}20` }]}>
                <MaterialCommunityIcons name="check-decagram" size={14} color={active.color} />
                <Text style={[styles.statusText, { color: active.color }]}>{active.badge}</Text>
              </View>
            </View>

            {/* Checklist Persyaratan */}
            <View style={styles.checklist}>
              <Text style={[styles.sectionLabel, { color: theme?.textMuted || '#64748B' }]}>
                CHECKLIST KELENGKAPAN:
              </Text>
              {active.reqs.map((req, rIdx) => (
                <View key={rIdx} style={styles.reqRow}>
                  <MaterialCommunityIcons name="checkbox-marked-circle" size={15} color={active.color} />
                  <Text style={[styles.reqText, { color: theme?.textSecondary || '#334155' }]}>
                    {req}
                  </Text>
                </View>
              ))}
            </View>

            {/* Footer Metadata */}
            <View style={[styles.metaFooter, { borderTopColor: isDark ? '#1E293B' : '#E2E8F0' }]}>
              <View style={styles.metaCol}>
                <Text style={[styles.metaLabel, { color: theme?.textMuted || '#64748B' }]}>
                  KOMPONEN / FILE:
                </Text>
                <Text style={[styles.metaVal, { color: theme?.text || '#1E293B' }]}>
                  {active.components}
                </Text>
              </View>
              <View style={styles.metaCol}>
                <Text style={[styles.metaLabel, { color: theme?.textMuted || '#64748B' }]}>
                  KONSEP UTAMA:
                </Text>
                <Text style={[styles.metaVal, { color: active.color }]}>{active.concept}</Text>
              </View>
            </View>
          </View>
        );
      })()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: SPACING.lg,
    borderRadius: 18,
    borderWidth: 1.5,
    marginVertical: SPACING.md,
    ...Platform.select({
      web: {
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
      },
    }),
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
    flexWrap: 'wrap',
    gap: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(2, 132, 199, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainTitle: {
    fontSize: 15,
    fontWeight: '800',
  },
  mainSubtitle: {
    fontSize: 11,
    marginTop: 2,
  },
  defenseBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0284C7',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 10,
    gap: 6,
  },
  defenseBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 11,
  },
  pillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 14,
  },
  levelPill: {
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    minWidth: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelPillText: {
    fontSize: 12,
    fontWeight: '800',
  },
  detailCard: {
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderLeftWidth: 4,
    gap: 10,
  },
  detailHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 10,
  },
  detailTitle: {
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  detailSubtitle: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: 2,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '800',
  },
  checklist: {
    gap: 6,
    marginTop: 4,
  },
  sectionLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  reqRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  reqText: {
    fontSize: 11,
    lineHeight: 16,
    flex: 1,
  },
  metaFooter: {
    borderTopWidth: 1,
    paddingTop: 10,
    gap: 6,
    marginTop: 4,
  },
  metaCol: {
    gap: 2,
  },
  metaLabel: {
    fontSize: 9,
    fontWeight: '700',
  },
  metaVal: {
    fontSize: 11,
    fontWeight: '600',
  },
});
