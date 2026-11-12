import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  Modal,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  Platform,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONTS, Theme } from '../theme';
import { StudentProfile } from '../types';

interface AboutSectionProps {
  data?: StudentProfile | any;
  profile?: StudentProfile | any;
  theme?: Theme | any;
  onLayoutSkills?: (y: number) => void;
  filterSection?: 'all' | 'about' | 'skills';
}

/**
 * Default skills matrix for Level 3
 */
const DEFAULT_SKILLS = [
  { name: 'React Native & Expo', level: 'Intermediate', percentage: 85, category: 'Mobile', color: '#38BDF8' },
  { name: 'Laravel & PHP', level: 'Intermediate', percentage: 88, category: 'Web', color: '#F43F5E' },
  { name: 'JavaScript (ES6+)', level: 'Advanced', percentage: 90, category: 'Language', color: '#F59E0B' },
  { name: 'MySQL & PostgreSQL', level: 'Intermediate', percentage: 84, category: 'Database', color: '#06B6D4' },
  { name: 'Figma & UI/UX', level: 'Intermediate', percentage: 82, category: 'Design', color: '#A855F7' },
  { name: 'Use Case & UML', level: 'Advanced', percentage: 88, category: 'Analysis', color: '#10B981' },
  { name: 'Git & GitHub', level: 'Intermediate', percentage: 85, category: 'Tools', color: '#6366F1' },
  { name: 'VS Code & Environment', level: 'Advanced', percentage: 92, category: 'Tools', color: '#3B82F6' },
];

const eskulMusikPhoto = require('../assets/eskul_musik.jpg');
const marchingBandPhoto = require('../assets/marching_band.jpg');
const ukmTemaholicPhoto = require('../assets/ukm_temaholic.jpg');

const DEFAULT_EXP_PHOTOS = [
  eskulMusikPhoto,
  marchingBandPhoto,
  ukmTemaholicPhoto,
];

function getExpPhotoSource(exp: any, idx: number): any {
  const role = (exp.role || exp.position || '').toLowerCase();
  const org = (exp.organization || '').toLowerCase();
  if (role.includes('sound system') || org.includes('eskul musik') || idx === 0) {
    return eskulMusikPhoto;
  }
  if (role.includes('marching band') || org.includes('marching band') || idx === 1) {
    return marchingBandPhoto;
  }
  if (role.includes('temaholic') || org.includes('temaholic') || idx === 2) {
    return ukmTemaholicPhoto;
  }
  if (exp.imageUrl) {
    if (typeof exp.imageUrl === 'string') {
      if (exp.imageUrl.includes('eskul_musik')) return eskulMusikPhoto;
      if (exp.imageUrl.includes('marching_band')) return marchingBandPhoto;
      if (exp.imageUrl.includes('ukm_temaholic') || exp.imageUrl.includes('temaholic')) return ukmTemaholicPhoto;
      return { uri: exp.imageUrl };
    }
    return exp.imageUrl;
  }
  const fallback = DEFAULT_EXP_PHOTOS[idx % DEFAULT_EXP_PHOTOS.length];
  return typeof fallback === 'string' ? { uri: fallback } : fallback;
}

export default function AboutSection({
  data,
  profile,
  theme,
  onLayoutSkills,
  filterSection = 'all',
}: AboutSectionProps) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;

  const student = data || profile || {};
  const currentTheme: Theme = theme || COLORS;

  const [activeSkillCategory, setActiveSkillCategory] = useState<string>('Semua');
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [expandedExpDocs, setExpandedExpDocs] = useState<{ [key: number]: boolean }>({
    0: true,
    1: true,
    2: true,
  });
  const [selectedExpPhoto, setSelectedExpPhoto] = useState<{
    imageSource: any;
    title: string;
    org: string;
    period: string;
    caption: string;
  } | null>(null);

  const toggleExpDoc = (idx: number) => {
    setExpandedExpDocs((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const categories = ['Semua', 'Mobile', 'Web', 'Database', 'Design', 'Tools'];

  const filteredSkills = DEFAULT_SKILLS.filter((s) => {
    if (activeSkillCategory === 'Semua') return true;
    return s.category.toLowerCase() === activeSkillCategory.toLowerCase();
  });

  const educationList = student.educationHistory || student.education || [
    { level: 'SD', school: 'SDN Cicalengka 04', year: '2011 - 2018', icon: 'school-outline' },
    { level: 'SMP', school: 'SMP PGRI Cicalengka', year: '2018 - 2021', icon: 'book-outline' },
    { level: 'SMA', school: 'SMA PGRI Cicalengka - IPA', year: '2021 - 2024', icon: 'ribbon-outline' },
    { level: 'Perguruan Tinggi', school: 'Masoem University - S1 Sistem Informasi', year: '2024 - Sekarang', icon: 'trophy-outline' },
  ];

  const handleOpenSpotify = () => {
    const url = 'https://open.spotify.com/track/6Uq519Z1v9CqgT7TqK9hXn';
    if (Platform.OS === 'web') {
      window.open(url, '_blank');
    } else {
      Linking.openURL(url).catch(() => {});
    }
  };

  return (
    <View style={styles.container}>
      {/* SECTION 1: TENTANG SAYA & KARAKTER UTAMA (LEVEL 2) */}
      {(filterSection === 'all' || filterSection === 'about') && (
      <View
        style={[
          styles.card,
          {
            backgroundColor: currentTheme.surface,
            borderColor: currentTheme.border,
            ...Platform.select({
              web: {
                scrollMarginTop: 85,
              } as any,
            }),
          },
        ]}
      >
        <View style={styles.cardHeader}>
          <View style={[styles.headerIconBox, { backgroundColor: currentTheme.surface2 }]}>
            <Ionicons name="person-circle-outline" size={20} color={currentTheme.accent} />
          </View>
          <View style={styles.headerTextGroup}>
            <Text style={[styles.cardTitle, { color: currentTheme.textPrimary }]}>
              Tentang Saya
            </Text>
            <Text style={[styles.cardSubtitle, { color: currentTheme.textSecondary }]}>
              Biodata Pribadi, Karakter & Visi Karir
            </Text>
          </View>
        </View>

        {/* Bio Paragraph */}
        <Text style={[styles.bodyText, { color: currentTheme.textSecondary }]}>
          {student.deskripsi ||
            'Saya merupakan mahasiswa Program Studi Sistem Informasi yang memiliki ketertarikan pada bidang teknologi informasi, khususnya pengembangan aplikasi dan sistem informasi berbasis web. Memiliki pengetahuan dalam pemrograman, pengelolaan basis data, serta analisis kebutuhan sistem. Terbiasa mengerjakan proyek pengembangan aplikasi menggunakan teknologi seperti Laravel, PHP, MySQL, dan JavaScript. Saya memiliki semangat belajar yang tinggi, mampu bekerja secara mandiri maupun dalam tim, serta memiliki komitmen untuk terus mengembangkan kemampuan dan memberikan kontribusi positif dalam lingkungan kerja. Di luar bidang akademik dan teknologi, saya juga memiliki hobi bermain alat musik, khususnya gitar dan drum, sebagai sarana menyalurkan kreativitas dan mengembangkan kemampuan bermusik.'}
        </Text>

        {/* 3 Karakter Utama Diri */}
        <View
          style={styles.attributesGrid}
          {...(Platform.OS === 'web' ? { className: 'stagger-group' } : {})}
        >
          {(student.coreAttributes || [
            { label: 'Pemecahan Masalah (Problem Solving)', desc: 'Kemampuan memecahkan masalah dengan berpikir melalui celah solusi yang efektif.' },
            { label: 'Kerja Sama Tim (Teamwork)', desc: 'Senang berkolaborasi aktif dan komunikatif dalam tim pengembang.' },
            { label: 'Pembelajar Berkelanjutan', desc: 'Cepat mempelajari teknologi baru dan siap beradaptasi dengan tren industri.' },
          ]).map((attr: any, idx: number) => (
            <View
              key={idx}
              style={[
                styles.attributeCard,
                {
                  backgroundColor: currentTheme.surface2,
                  borderColor: currentTheme.border,
                },
              ]}
              {...(Platform.OS === 'web' ? { className: `interactive-card stagger-${idx + 1}` } : {})}
            >
              <View style={[styles.attrDot, { backgroundColor: currentTheme.accent }]} />
              <View style={{ flex: 1 }}>
                <Text style={[styles.attrLabel, { color: currentTheme.textPrimary }]}>
                  {attr.label}
                </Text>
                <Text style={[styles.attrDesc, { color: currentTheme.textSecondary }]}>
                  {attr.desc}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
      )}

      {/* SECTION 2: KEAHLIAN TEKNIS & SPESIALISASI (LEVEL 3) */}
      {(filterSection === 'all' || filterSection === 'skills') && (
      <View
        nativeID="section-skills"
        testID="section-skills"
        {...(Platform.OS === 'web' ? { id: 'section-skills', 'data-section': 'skills', className: 'scroll-reveal fade-in-up' } : {})}
        onLayout={(e) => {
          if (onLayoutSkills) {
            onLayoutSkills(e.nativeEvent.layout.y);
          }
        }}
        style={[
          styles.card,
          {
            backgroundColor: currentTheme.surface,
            borderColor: currentTheme.border,
            ...Platform.select({
              web: {
                scrollMarginTop: 85,
              } as any,
            }),
          },
        ]}
      >
        <View style={styles.cardHeader}>
          <View style={[styles.headerIconBox, { backgroundColor: currentTheme.surface2 }]}>
            <Ionicons name="code-slash-outline" size={20} color={currentTheme.accent} />
          </View>
          <View style={styles.headerTextGroup}>
            <Text style={[styles.cardTitle, { color: currentTheme.textPrimary }]}>
              Keahlian Teknis & Tools
            </Text>
            <Text style={[styles.cardSubtitle, { color: currentTheme.textSecondary }]}>
              Matriks Keahlian & Kemahiran Pemrograman
            </Text>
          </View>
        </View>

        {/* Filter Categories */}
        <View style={styles.filterPillsRow}>
          {categories.map((cat) => {
            const isActive = activeSkillCategory === cat;
            return (
              <TouchableOpacity
                key={cat}
                onPress={() => setActiveSkillCategory(cat)}
                style={[
                  styles.filterPill,
                  {
                    backgroundColor: isActive ? currentTheme.primary : currentTheme.surface2,
                    borderColor: isActive ? currentTheme.primaryHover : currentTheme.border,
                  },
                ]}
                {...(Platform.OS === 'web' ? { className: 'interactive-btn' } : {})}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.filterPillText,
                    { color: isActive ? (currentTheme.isDark ? '#25191D' : '#FFFFFF') : currentTheme.textSecondary },
                  ]}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Skill Bars Grid */}
        <View style={[styles.skillsGrid, isMobile && styles.skillsGridMobile]}>
          {filteredSkills.map((skill, index) => (
            <View
              key={index}
              style={[
                styles.skillItemCard,
                {
                  backgroundColor: currentTheme.surface2,
                  borderColor: currentTheme.border,
                },
              ]}
              {...(Platform.OS === 'web' ? { className: 'interactive-card' } : {})}
            >
              <View style={styles.skillTopRow}>
                <Text style={[styles.skillName, { color: currentTheme.heading }]}>
                  {skill.name}
                </Text>
                <Text style={[styles.skillPercent, { color: currentTheme.primary }]}>
                  {skill.percentage}%
                </Text>
              </View>
              {/* Progress Bar Track */}
              <View style={[styles.skillTrack, { backgroundColor: currentTheme.surface }]}>
                <View
                  style={[
                    styles.skillFill,
                    {
                      width: `${skill.percentage}%`,
                      backgroundColor: currentTheme.primary,
                    },
                  ]}
                />
              </View>
              <Text style={[styles.skillLevel, { color: currentTheme.textSecondary }]}>
                {skill.level === 'Advanced' ? 'Tingkat Mahir' : skill.level === 'Intermediate' ? 'Tingkat Menengah' : skill.level} • {skill.category}
              </Text>
            </View>
          ))}
        </View>
      </View>
      )}

      {/* SECTION 3: RIWAYAT PENDIDIKAN & HOBI MUSIK (LEVEL 5 & 6) */}
      {filterSection === 'all' ? (
      <View style={[styles.twoColRow, isMobile && styles.twoColRowMobile]}>
        {/* Kolom Kiri: Riwayat Pendidikan */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: currentTheme.surface,
              borderColor: currentTheme.border,
              flex: isMobile ? undefined : 1,
              width: isMobile ? '100%' : undefined,
            },
          ]}
          {...(Platform.OS === 'web' ? { className: 'fade-in-left' } : {})}
        >
          <View style={styles.cardHeader}>
            <View style={[styles.headerIconBox, { backgroundColor: currentTheme.surface2 }]}>
              <Ionicons name="school-outline" size={20} color={currentTheme.accent} />
            </View>
            <View style={styles.headerTextGroup}>
              <Text style={[styles.cardTitle, { color: currentTheme.textPrimary }]}>
                Riwayat Pendidikan
              </Text>
              <Text style={[styles.cardSubtitle, { color: currentTheme.textSecondary }]}>
                Jejak Pendidikan Formal
              </Text>
            </View>
          </View>

          <View style={styles.timelineList}>
            {educationList.map((item: any, i: number) => (
              <View
                key={i}
                style={styles.timelineItem}
                {...(Platform.OS === 'web' ? { className: `interactive-card stagger-${i + 1}` } : {})}
              >
                <View style={styles.timelineIconCol}>
                  <View style={[styles.timelineNode, { borderColor: currentTheme.accent, backgroundColor: currentTheme.surface2 }]}>
                    <Ionicons name="checkmark-sharp" size={11} color={currentTheme.accent} />
                  </View>
                  {i < educationList.length - 1 && (
                    <View style={[styles.timelineLine, { backgroundColor: currentTheme.border }]} />
                  )}
                </View>
                <View style={styles.timelineContent}>
                  <View style={styles.timelineLevelRow}>
                    <Text style={[styles.timelineLevelText, { color: currentTheme.accent }]}>
                      {item.level}
                    </Text>
                    <Text style={[styles.timelineYearText, { color: currentTheme.textSecondary }]}>
                      {item.year || item.period}
                    </Text>
                  </View>
                  <Text style={[styles.timelineSchoolText, { color: currentTheme.textPrimary }]}>
                    {item.school || item.institution}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Kolom Kanan: Hobi & Spotify Player */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: currentTheme.surface,
              borderColor: currentTheme.border,
              flex: isMobile ? undefined : 1,
              width: isMobile ? '100%' : undefined,
            },
          ]}
          {...(Platform.OS === 'web' ? { className: 'fade-in-right' } : {})}
        >
          <View style={styles.cardHeader}>
            <View style={[styles.headerIconBox, { backgroundColor: currentTheme.surface2 }]}>
              <Ionicons name="musical-notes-outline" size={20} color={currentTheme.accent} />
            </View>
            <View style={styles.headerTextGroup}>
              <Text style={[styles.cardTitle, { color: currentTheme.textPrimary }]}>
                Minat & Hobi Musik
              </Text>
              <Text style={[styles.cardSubtitle, { color: currentTheme.textSecondary }]}>
                Kreativitas di Luar Koding
              </Text>
            </View>
          </View>

          {/* List Hobi */}
          <View style={styles.hobbyList}>
            <View
              style={[styles.hobbyRow, { backgroundColor: currentTheme.surface2, borderColor: currentTheme.border }]}
              {...(Platform.OS === 'web' ? { className: 'interactive-card hobby-icon-bounce' } : {})}
            >
              <Ionicons name="musical-note" size={18} color={currentTheme.accent} />
              <View style={{ flex: 1 }}>
                <Text style={[styles.hobbyTitle, { color: currentTheme.textPrimary }]}>Bermain Gitar</Text>
                <Text style={[styles.hobbyDesc, { color: currentTheme.textSecondary }]}>Gitaris tingkat menengah • fingerstyle & harmoni akord.</Text>
              </View>
            </View>
            <View
              style={[styles.hobbyRow, { backgroundColor: currentTheme.surface2, borderColor: currentTheme.border }]}
              {...(Platform.OS === 'web' ? { className: 'interactive-card hobby-icon-bounce' } : {})}
            >
              <Ionicons name="disc-outline" size={18} color={currentTheme.accent} />
              <View style={{ flex: 1 }}>
                <Text style={[styles.hobbyTitle, { color: currentTheme.textPrimary }]}>Bermain Drum</Text>
                <Text style={[styles.hobbyDesc, { color: currentTheme.textSecondary }]}>Melatih ketepatan tempo, sinkronisasi ketukan & ritme.</Text>
              </View>
            </View>
          </View>

          {/* Spotify Bento Widget */}
          <View style={[styles.spotifyCard, { backgroundColor: currentTheme.surface2, borderColor: currentTheme.border }]}>
            <View style={styles.spotifyHeaderRow}>
              <View style={{ flex: 1 }}>
                <View style={styles.nowPlayingRow}>
                  {isPlayingMusic && (
                    <View
                      style={[styles.pulseDot, { backgroundColor: currentTheme.success }]}
                      {...(Platform.OS === 'web' ? { className: 'pulse-indicator' } : {})}
                    />
                  )}
                  <Text style={[styles.spotifyNowPlaying, { color: isPlayingMusic ? currentTheme.success : currentTheme.accent }]}>
                    {isPlayingMusic ? 'SEDANG MEMUTAR PREVIEW' : 'PUTARAN SPOTIFY FAVORIT'}
                  </Text>
                </View>
                <Text style={[styles.spotifySongTitle, { color: currentTheme.textPrimary }]}>
                  Anything You Want
                </Text>
                <Text style={[styles.spotifyArtist, { color: currentTheme.textSecondary }]}>
                  Reality Club • 03:02
                </Text>
              </View>

              <View style={styles.playerControlsRow}>
                {isPlayingMusic && (
                  <View style={styles.equalizerRow}>
                    <View
                      style={[styles.eqBar, { backgroundColor: currentTheme.success }]}
                      {...(Platform.OS === 'web' ? { className: 'eq-bar-1' } : {})}
                    />
                    <View
                      style={[styles.eqBar, { backgroundColor: currentTheme.success }]}
                      {...(Platform.OS === 'web' ? { className: 'eq-bar-2' } : {})}
                    />
                    <View
                      style={[styles.eqBar, { backgroundColor: currentTheme.success }]}
                      {...(Platform.OS === 'web' ? { className: 'eq-bar-3' } : {})}
                    />
                    <View
                      style={[styles.eqBar, { backgroundColor: currentTheme.success }]}
                      {...(Platform.OS === 'web' ? { className: 'eq-bar-4' } : {})}
                    />
                  </View>
                )}

                <TouchableOpacity
                  style={[styles.playPauseBtn, { backgroundColor: currentTheme.primary }]}
                  onPress={() => setIsPlayingMusic(!isPlayingMusic)}
                  activeOpacity={0.8}
                  {...(Platform.OS === 'web' ? { className: 'interactive-btn' } : {})}
                >
                  <Ionicons
                    name={isPlayingMusic ? 'pause' : 'play'}
                    size={16}
                    color={currentTheme.isDark ? '#25191D' : '#FFFFFF'}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Fake progress bar */}
            <View style={[styles.spotifyBarTrack, { backgroundColor: currentTheme.surface }]}>
              <View style={[styles.spotifyBarFill, { backgroundColor: currentTheme.success, width: isPlayingMusic ? '75%' : '52%' }]} />
            </View>

            <TouchableOpacity
              style={styles.spotifyExternalBtn}
              onPress={handleOpenSpotify}
              activeOpacity={0.7}
              {...(Platform.OS === 'web' ? { className: 'interactive-btn' } : {})}
            >
              <Ionicons name="musical-notes" size={14} color={currentTheme.success} />
              <Text style={[styles.spotifyExternalText, { color: currentTheme.success }]}>Buka Lagu di Spotify ↗</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      ) : filterSection === 'about' ? (
        /* Tampilan Khusus Halaman About: Riwayat Pendidikan */
        <View
          style={[
            styles.card,
            {
              backgroundColor: currentTheme.surface,
              borderColor: currentTheme.border,
            },
          ]}
        >
          <View style={styles.cardHeader}>
            <View style={[styles.headerIconBox, { backgroundColor: currentTheme.surface2 }]}>
              <Ionicons name="school-outline" size={20} color={currentTheme.accent} />
            </View>
            <View style={styles.headerTextGroup}>
              <Text style={[styles.cardTitle, { color: currentTheme.textPrimary }]}>
                Riwayat Pendidikan
              </Text>
              <Text style={[styles.cardSubtitle, { color: currentTheme.textSecondary }]}>
                Jejak Pendidikan Formal
              </Text>
            </View>
          </View>

          <View style={styles.timelineList}>
            {educationList.map((item: any, i: number) => (
              <View
                key={i}
                style={styles.timelineItem}
              >
                <View style={styles.timelineIconCol}>
                  <View style={[styles.timelineNode, { borderColor: currentTheme.accent, backgroundColor: currentTheme.surface2 }]}>
                    <Ionicons name="checkmark-sharp" size={11} color={currentTheme.accent} />
                  </View>
                  {i < educationList.length - 1 && (
                    <View style={[styles.timelineLine, { backgroundColor: currentTheme.border }]} />
                  )}
                </View>
                <View style={styles.timelineContent}>
                  <View style={styles.timelineLevelRow}>
                    <Text style={[styles.timelineLevelText, { color: currentTheme.accent }]}>
                      {item.level}
                    </Text>
                    <Text style={[styles.timelineYearText, { color: currentTheme.textSecondary }]}>
                      {item.year || item.period}
                    </Text>
                  </View>
                  <Text style={[styles.timelineSchoolText, { color: currentTheme.textPrimary }]}>
                    {item.school || item.institution}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      ) : (
        /* Tampilan Khusus Halaman Skills: Hobi Musik & Spotify */
        <View
          style={[
            styles.card,
            {
              backgroundColor: currentTheme.surface,
              borderColor: currentTheme.border,
            },
          ]}
        >
          <View style={styles.cardHeader}>
            <View style={[styles.headerIconBox, { backgroundColor: currentTheme.surface2 }]}>
              <Ionicons name="musical-notes-outline" size={20} color={currentTheme.accent} />
            </View>
            <View style={styles.headerTextGroup}>
              <Text style={[styles.cardTitle, { color: currentTheme.textPrimary }]}>
                Minat & Hobi Musik
              </Text>
              <Text style={[styles.cardSubtitle, { color: currentTheme.textSecondary }]}>
                Kreativitas di Luar Koding
              </Text>
            </View>
          </View>

          <View style={styles.hobbyList}>
            <View style={[styles.hobbyRow, { backgroundColor: currentTheme.surface2, borderColor: currentTheme.border }]}>
              <Ionicons name="musical-note" size={18} color={currentTheme.accent} />
              <View style={{ flex: 1 }}>
                <Text style={[styles.hobbyTitle, { color: currentTheme.textPrimary }]}>Bermain Gitar</Text>
                <Text style={[styles.hobbyDesc, { color: currentTheme.textSecondary }]}>Gitaris tingkat menengah • fingerstyle & harmoni akord.</Text>
              </View>
            </View>
            <View style={[styles.hobbyRow, { backgroundColor: currentTheme.surface2, borderColor: currentTheme.border }]}>
              <Ionicons name="disc-outline" size={18} color={currentTheme.accent} />
              <View style={{ flex: 1 }}>
                <Text style={[styles.hobbyTitle, { color: currentTheme.textPrimary }]}>Bermain Drum</Text>
                <Text style={[styles.hobbyDesc, { color: currentTheme.textSecondary }]}>Melatih ketepatan tempo, sinkronisasi ketukan & ritme.</Text>
              </View>
            </View>
          </View>

          <View style={[styles.spotifyCard, { backgroundColor: currentTheme.surface2, borderColor: currentTheme.border, marginTop: 12 }]}>
            <View style={styles.spotifyHeaderRow}>
              <View style={{ flex: 1 }}>
                <View style={styles.nowPlayingRow}>
                  {isPlayingMusic && (
                    <View
                      style={[styles.pulseDot, { backgroundColor: currentTheme.success }]}
                    />
                  )}
                  <Text style={[styles.spotifyNowPlaying, { color: isPlayingMusic ? currentTheme.success : currentTheme.accent }]}>
                    {isPlayingMusic ? 'SEDANG MEMUTAR PREVIEW' : 'PUTARAN SPOTIFY FAVORIT'}
                  </Text>
                </View>
                <Text style={[styles.spotifySongTitle, { color: currentTheme.textPrimary }]}>
                  Anything You Want
                </Text>
                <Text style={[styles.spotifyArtist, { color: currentTheme.textSecondary }]}>
                  Reality Club • 03:02
                </Text>
              </View>

              <TouchableOpacity
                style={[styles.playPauseBtn, { backgroundColor: currentTheme.primary }]}
                onPress={() => setIsPlayingMusic(!isPlayingMusic)}
                activeOpacity={0.8}
              >
                <Ionicons
                  name={isPlayingMusic ? 'pause' : 'play'}
                  size={16}
                  color={currentTheme.isDark ? '#25191D' : '#FFFFFF'}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {/* SECTION 4: PENGALAMAN & ORGANISASI (LEVEL 7 - BAGIAN B) */}
      {(filterSection === 'all' || filterSection === 'about') && (
      <View
        style={[
          styles.card,
          {
            backgroundColor: currentTheme.surface,
            borderColor: currentTheme.border,
          },
        ]}
      >
        <View style={styles.cardHeader}>
          <View style={[styles.headerIconBox, { backgroundColor: currentTheme.surface2 }]}>
            <Ionicons name="people-outline" size={20} color={currentTheme.accent} />
          </View>
          <View style={styles.headerTextGroup}>
            <Text style={[styles.cardTitle, { color: currentTheme.textPrimary }]}>
              Pengalaman & Organisasi
            </Text>
            <Text style={[styles.cardSubtitle, { color: currentTheme.textSecondary }]}>
              Aktivitas Kepengurusan, Eskul Musik, & Marching Band
            </Text>
          </View>
        </View>

        <View
          style={styles.experienceList}
          {...(Platform.OS === 'web' ? { className: 'stagger-group' } : {})}
        >
          {(student.experience || [
            {
              role: 'Managemen sound system Eskul Musik SMA PGRI CICALENGKA',
              organization: 'Eskul Musik SMA PGRI CICALENGKA',
              period: '2022 - 2024',
              description: 'Mengatur sound system agar suara lebih detail dan jernih untuk pertunjukan.',
            },
            {
              role: 'Anggota Eskul Marching Band SMA PGRI CICALENGKA',
              organization: 'Eskul Marching Band SMA PGRI CICALENGKA',
              period: '2023 - 2025',
              description: 'Melakukan monitoring agar nada selaras pada anggota eskul.',
            },
            {
              role: 'Anggota UKM TEMAHOLIC MA\'SOEM UNIVERSITY',
              organization: 'MA\'SOEM UNIVERSITY',
              period: '2026 - Sekarang',
              description: 'Mempelajari irama antara musik dan gerakan teater.',
            },
          ]).map((exp: any, idx: number) => (
            <View
              key={idx}
              style={[
                styles.experienceCard,
                {
                  backgroundColor: currentTheme.surface2,
                  borderColor: currentTheme.border,
                },
              ]}
              {...(Platform.OS === 'web' ? { className: `interactive-card stagger-${idx + 1}` } : {})}
            >
              <View style={[styles.experienceCardTop, isMobile && styles.experienceCardTopMobile]}>
                <View style={styles.experienceCardTitleRow}>
                  <View style={[styles.experienceIconBox, { backgroundColor: currentTheme.surface, borderColor: currentTheme.border }]}>
                    <Ionicons
                      name={idx === 0 ? 'musical-notes' : idx === 1 ? 'volume-medium' : 'people'}
                      size={16}
                      color={currentTheme.accent}
                    />
                  </View>
                  <View style={{ flex: 1, minWidth: 0 }}>
                    <Text style={[styles.experienceRole, isMobile && styles.experienceRoleMobile, { color: currentTheme.heading }]}>
                      {exp.role || exp.position}
                    </Text>
                    <Text style={[styles.experienceOrg, isMobile && styles.experienceOrgMobile, { color: currentTheme.accent }]}>
                      {exp.organization}
                    </Text>
                  </View>
                </View>
                <View
                  style={[
                    styles.experiencePeriodBadge,
                    isMobile && styles.experiencePeriodBadgeMobile,
                    { backgroundColor: currentTheme.surface, borderColor: currentTheme.border },
                  ]}
                >
                  <Text style={[styles.experiencePeriodText, { color: currentTheme.textSecondary }]}>
                    {exp.period || exp.year}
                  </Text>
                </View>
              </View>
              <Text style={[styles.experienceDesc, { color: currentTheme.textSecondary }]}>
                {exp.description}
              </Text>

              {/* Tombol Lihat/Tutup Dokumentasi (Mengecil dulu lalu muncul saat diklik) */}
              <TouchableOpacity
                onPress={() => toggleExpDoc(idx)}
                style={[
                  styles.docToggleButton,
                  {
                    backgroundColor: expandedExpDocs[idx] ? currentTheme.primary : currentTheme.surface,
                    borderColor: expandedExpDocs[idx] ? currentTheme.primaryHover : currentTheme.border,
                  },
                ]}
                activeOpacity={0.8}
                {...(Platform.OS === 'web' ? { className: 'interactive-btn' } : {})}
                accessibilityRole="button"
                accessibilityLabel={`${expandedExpDocs[idx] ? 'Tutup' : 'Lihat'} foto dokumentasi: ${exp.role}`}
              >
                <Ionicons
                  name={expandedExpDocs[idx] ? 'chevron-up-circle-outline' : 'camera-outline'}
                  size={15}
                  color={expandedExpDocs[idx] ? (currentTheme.isDark ? '#25191D' : '#FFFFFF') : currentTheme.primary}
                />
                <Text
                  style={[
                    styles.docToggleText,
                    {
                      color: expandedExpDocs[idx]
                        ? currentTheme.isDark
                          ? '#25191D'
                          : '#FFFFFF'
                        : currentTheme.heading,
                    },
                  ]}
                >
                  {expandedExpDocs[idx] ? 'Tutup Foto Dokumentasi' : 'Lihat Dokumentasi'}
                </Text>
                <Ionicons
                  name={expandedExpDocs[idx] ? 'chevron-up' : 'chevron-down'}
                  size={14}
                  color={expandedExpDocs[idx] ? (currentTheme.isDark ? '#25191D' : '#FFFFFF') : currentTheme.primary}
                />
              </TouchableOpacity>

              {/* Foto Dokumentasi Pengalaman Organisasi (Sejajar Border, muncul saat tombol ditekan) */}
              {expandedExpDocs[idx] && (
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() =>
                    setSelectedExpPhoto({
                      imageSource: getExpPhotoSource(exp, idx),
                      title: exp.role || exp.position,
                      org: exp.organization,
                      period: exp.period || exp.year,
                      caption: exp.imageCaption || `Dokumentasi ${exp.organization}`,
                    })
                  }
                  style={[
                    styles.expPhotoWrapper,
                    (idx === 1 || idx === 2) && styles.expPhotoWrapperPortrait,
                    {
                      backgroundColor: currentTheme.surface,
                      borderColor: currentTheme.border,
                    },
                  ]}
                  {...(Platform.OS === 'web' ? { className: 'doc-gallery-card' } : {})}
                  accessibilityRole="button"
                  accessibilityLabel={`Perbesar foto dokumentasi: ${exp.role}`}
                >
                  <Image
                    source={getExpPhotoSource(exp, idx)}
                    style={[
                      styles.expPhotoImage,
                      idx === 1 ? ({ objectPosition: 'center 25%' } as any) : undefined,
                      idx === 2 ? ({ objectPosition: 'center 20%' } as any) : undefined,
                    ]}
                    resizeMode="cover"
                    {...(Platform.OS === 'web' ? ({ className: 'doc-gallery-img', loading: 'lazy' } as any) : {})}
                  />

                  {/* Caption Bar Sejajar Border */}
                  <View style={[styles.expPhotoOverlayTag, { backgroundColor: 'rgba(37, 25, 29, 0.85)' }]}>
                    <View style={styles.expPhotoBadgeLeft}>
                      <Ionicons name="camera-outline" size={13} color="#C17B88" />
                      <Text style={styles.expPhotoOverlayTagText} numberOfLines={1}>
                        {exp.imageCaption || `Dokumentasi ${exp.organization}`}
                      </Text>
                    </View>
                    <View style={styles.expPhotoZoomHint}>
                      <Ionicons name="expand-outline" size={12} color="#FFFFFF" />
                      <Text style={styles.expPhotoZoomHintText}>Perbesar</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>
      </View>
      )}

      {/* Lightbox Modal Foto Dokumentasi Pengalaman Organisasi */}
      <Modal
        visible={selectedExpPhoto !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedExpPhoto(null)}
      >
        <View style={styles.modalBackdrop}>
          <TouchableOpacity
            style={styles.modalBackdropDismiss}
            activeOpacity={1}
            onPress={() => setSelectedExpPhoto(null)}
          />
          {selectedExpPhoto && (
            <View
              style={[
                styles.modalContentCard,
                isMobile && styles.modalContentCardMobile,
                {
                  backgroundColor: currentTheme.surface,
                  borderColor: currentTheme.border,
                },
              ]}
            >
              <View style={[styles.modalHeaderRow, { borderBottomColor: currentTheme.border }]}>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.modalRoleTitle, { color: currentTheme.heading }]}>
                    {selectedExpPhoto.title}
                  </Text>
                  <Text style={[styles.modalOrgSubtitle, { color: currentTheme.accent }]}>
                    {selectedExpPhoto.org} • {selectedExpPhoto.period}
                  </Text>
                </View>
                <TouchableOpacity
                  style={[styles.modalCloseIconBtn, { backgroundColor: currentTheme.surface2, borderColor: currentTheme.border }]}
                  onPress={() => setSelectedExpPhoto(null)}
                  activeOpacity={0.7}
                >
                  <Ionicons name="close" size={18} color={currentTheme.heading} />
                </TouchableOpacity>
              </View>

              <View style={styles.modalImageContainer}>
                <Image
                  source={selectedExpPhoto.imageSource}
                  style={styles.modalFullImage}
                  resizeMode="contain"
                />
              </View>

              <View style={[styles.modalFooterRow, { borderTopColor: currentTheme.border }]}>
                <Text style={[styles.modalFooterCaption, { color: currentTheme.textSecondary }]}>
                  {selectedExpPhoto.caption}
                </Text>
                <TouchableOpacity
                  style={[styles.modalCloseTextBtn, { backgroundColor: currentTheme.primary }]}
                  onPress={() => setSelectedExpPhoto(null)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.modalCloseTextBtnLabel, { color: currentTheme.isDark ? '#25191D' : '#FFFFFF' }]}>
                    Tutup
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
}

// Re-export sub-components if needed for backward compatibility
export const AboutIntroCard = AboutSection;
export const SpecializationCard = AboutSection;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 20,
  },
  card: {
    borderRadius: SPACING.cardRadius,
    borderWidth: 1,
    padding: SPACING.cardPadding,
    gap: 16,
    ...Platform.select({
      web: {
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
      } as any,
      default: {
        elevation: 3,
      },
    }),
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerIconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTextGroup: {
    flex: 1,
  },
  cardTitle: {
    fontFamily: FONTS.display,
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  cardSubtitle: {
    fontFamily: FONTS.mono,
    fontSize: 11,
    fontWeight: '500',
    marginTop: 1,
  },
  bodyText: {
    fontFamily: FONTS.body,
    fontSize: 13.5,
    lineHeight: 22,
  },
  attributesGrid: {
    gap: 10,
  },
  attributeCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    gap: 10,
  },
  attrDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 5,
  },
  attrLabel: {
    fontFamily: FONTS.bold,
    fontSize: 13,
    fontWeight: '700',
  },
  attrDesc: {
    fontFamily: FONTS.body,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 2,
  },
  filterPillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterPill: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 999,
    borderWidth: 1,
  },
  filterPillText: {
    fontSize: 11.5,
    fontWeight: '600',
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  skillsGridMobile: {
    flexDirection: 'column',
  },
  skillItemCard: {
    flex: 1,
    minWidth: 220,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    gap: 6,
  },
  skillTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skillName: {
    fontFamily: FONTS.bold,
    fontSize: 12.5,
    fontWeight: '700',
  },
  skillPercent: {
    fontFamily: FONTS.mono,
    fontSize: 12,
    fontWeight: '700',
  },
  skillTrack: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  skillFill: {
    height: '100%',
    borderRadius: 3,
  },
  skillLevel: {
    fontFamily: FONTS.mono,
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  twoColRow: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'flex-start',
    width: '100%',
  },
  twoColRowMobile: {
    flexDirection: 'column',
    gap: 20,
    alignItems: 'stretch',
    width: '100%',
  },
  timelineList: {
    gap: 16,
    paddingLeft: 4,
  },
  timelineItem: {
    flexDirection: 'row',
    gap: 12,
  },
  timelineIconCol: {
    alignItems: 'center',
    width: 20,
  },
  timelineNode: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timelineLine: {
    width: 2,
    flex: 1,
    marginTop: 4,
  },
  timelineContent: {
    flex: 1,
    paddingBottom: 4,
  },
  timelineLevelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timelineLevelText: {
    fontFamily: FONTS.bold,
    fontSize: 12,
    fontWeight: '700',
  },
  timelineYearText: {
    fontFamily: FONTS.mono,
    fontSize: 11,
  },
  timelineSchoolText: {
    fontFamily: FONTS.body,
    fontSize: 13,
    fontWeight: '500',
    marginTop: 2,
  },
  hobbyList: {
    gap: 8,
  },
  hobbyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    gap: 10,
  },
  hobbyTitle: {
    fontFamily: FONTS.bold,
    fontSize: 12.5,
    fontWeight: '700',
  },
  hobbyDesc: {
    fontFamily: FONTS.body,
    fontSize: 11,
    marginTop: 1,
  },
  spotifyCard: {
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    gap: 10,
    marginTop: 4,
  },
  spotifyHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  spotifyNowPlaying: {
    fontFamily: FONTS.mono,
    fontSize: 9.5,
    fontWeight: '700',
    letterSpacing: 0.6,
  },
  spotifySongTitle: {
    fontFamily: FONTS.bold,
    fontSize: 14,
    fontWeight: '700',
    marginTop: 2,
  },
  spotifyArtist: {
    fontFamily: FONTS.mono,
    fontSize: 11,
    marginTop: 1,
  },
  nowPlayingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  playerControlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  equalizerRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 3,
    height: 18,
    marginRight: 4,
  },
  eqBar: {
    width: 3,
    minHeight: 4,
    borderRadius: 2,
  },
  playPauseBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spotifyBarTrack: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  spotifyBarFill: {
    height: '100%',
    borderRadius: 2,
  },
  spotifyExternalBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
  },
  spotifyExternalText: {
    color: '#1DB954',
    fontFamily: FONTS.mono,
    fontSize: 11,
    fontWeight: '600',
  },
  experienceList: {
    gap: 12,
  },
  experienceCard: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    gap: 8,
  },
  experienceCardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    width: '100%',
  },
  experienceCardTopMobile: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 8,
  },
  experienceCardTitleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    flex: 1,
    minWidth: 0,
    width: '100%',
  },
  experienceIconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  experienceRole: {
    fontFamily: FONTS.display,
    fontSize: 13.5,
    fontWeight: '700',
  },
  experienceRoleMobile: {
    fontSize: 13,
    lineHeight: 18,
  },
  experienceOrg: {
    fontFamily: FONTS.mono,
    fontSize: 11.5,
    fontWeight: '600',
  },
  experienceOrgMobile: {
    fontSize: 11,
    marginTop: 2,
  },
  experiencePeriodBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
  },
  experiencePeriodBadgeMobile: {
    alignSelf: 'flex-start',
    marginLeft: 42,
    marginTop: 0,
  },
  experiencePeriodText: {
    fontFamily: FONTS.mono,
    fontSize: 10.5,
    fontWeight: '700',
  },
  experienceDesc: {
    fontFamily: FONTS.body,
    fontSize: 12.5,
    lineHeight: 18,
  },
  titleBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  badgePill: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 999,
    borderWidth: 1,
  },
  badgePillText: {
    fontFamily: FONTS.mono,
    fontSize: 9.5,
    fontWeight: '700',
  },
  docToggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 8,
    paddingHorizontal: 13,
    paddingVertical: 7,
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 8,
    marginBottom: 4,
    ...Platform.select({
      web: {
        cursor: 'pointer' as any,
        transition: 'all 0.2s ease' as any,
      },
    }),
  },
  docToggleText: {
    fontFamily: FONTS.medium,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.1,
  },
  expPhotoWrapper: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
    position: 'relative',
    marginTop: 4,
  },
  expPhotoWrapperPortrait: {
    aspectRatio: 4 / 3,
  },
  expPhotoImage: {
    width: '100%',
    height: '100%',
  },
  expPhotoOverlayTag: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
  },
  expPhotoBadgeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  expPhotoOverlayTagText: {
    color: '#F4ECE1',
    fontFamily: FONTS.mono,
    fontSize: 10.5,
    fontWeight: '600',
    flex: 1,
  },
  expPhotoZoomHint: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  expPhotoZoomHintText: {
    color: '#FFFFFF',
    fontFamily: FONTS.body,
    fontSize: 10.5,
    fontWeight: '600',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 10, 12, 0.88)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  modalBackdropDismiss: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalContentCard: {
    width: '100%',
    maxWidth: 780,
    maxHeight: '92%',
    borderRadius: 18,
    borderWidth: 1,
    overflow: 'hidden',
    zIndex: 10,
  },
  modalContentCardMobile: {
    maxHeight: '95%',
  },
  modalHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderBottomWidth: 1,
    gap: 12,
  },
  modalRoleTitle: {
    fontFamily: FONTS.display,
    fontSize: 15,
    fontWeight: '700',
  },
  modalOrgSubtitle: {
    fontFamily: FONTS.mono,
    fontSize: 11.5,
    marginTop: 2,
  },
  modalCloseIconBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalImageContainer: {
    width: '100%',
    height: 380,
    backgroundColor: '#130C0E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalFullImage: {
    width: '100%',
    height: '100%',
  },
  modalFooterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderTopWidth: 1,
    gap: 12,
  },
  modalFooterCaption: {
    fontFamily: FONTS.body,
    fontSize: 12,
    flex: 1,
  },
  modalCloseTextBtn: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 8,
  },
  modalCloseTextBtnLabel: {
    fontFamily: FONTS.body,
    fontSize: 12,
    fontWeight: '700',
  },
});
