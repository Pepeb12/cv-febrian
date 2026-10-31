import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// Import Data Lokal Format JSON (Level 6 & Level 8: Local JSON Data Architecture)
import profileData from './data/profile.json';
import academicScoreData from './data/academicScore.json';

// Import Theme System (Dual-Theme Switcher: Dark/Light Mode)
import { getTheme, SPACING } from './theme';

// Import Komponen UI Modular
import Header from './components/Header';
import ProfileHeader from './components/ProfileHeader';
import MetricBar from './components/MetricBar';
import MyScoreSection from './components/MyScoreSection';
import InteractiveEndorseBar from './components/InteractiveEndorseBar';
import PortfolioGallery from './components/PortfolioGallery';
import ExperienceTimeline from './components/ExperienceTimeline';
import HobbySection from './components/HobbySection';
import AboutSection from './components/AboutSection';
import SkillMatrixCard from './components/SkillMatrixCard';
import IdentityDetailCard from './components/IdentityDetailCard';
import ContactGridCard from './components/ContactGridCard';
import ContactForm from './components/ContactForm';
import Level8CriteriaCard from './components/Level8CriteriaCard';

export default function App() {
  // 1. State Tema Gelap / Terang (Theme Switcher)
  const [isDarkMode, setIsDarkMode] = useState(false);
  const theme = getTheme(isDarkMode);

  // 2. State untuk interaksi formulir kontak
  const [messagesReceivedCount, setMessagesReceivedCount] = useState(0);

  const handleMessageSent = () => {
    setMessagesReceivedCount((prev) => prev + 1);
  };

  const handleToggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const handleShowValidation = () => {
    const { studentIdentity, currentScore, learningPoints, learningProgress } = academicScoreData;
    const progressSummary = learningProgress.map((p) => `• ${p.name}: ${p.percentage}%`).join('\n');

    const info = `LEVEL 8 — EXPERT EVALUATION:\n\n• Mahasiswa: ${studentIdentity.name} (${studentIdentity.nim})\n• Mata Kuliah: ${studentIdentity.course}\n• Dosen Pengampu: ${studentIdentity.lecturer}\n• Current Score: ${currentScore.score} (Grade ${currentScore.grade})\n• Learning Points: ${learningPoints.total.toLocaleString('id-ID')} LP\n• Capaian Belajar:\n${progressSummary}\n• Status: Data akademik terpisah di data/academicScore.json & terintegrasi penuh`;

    if (Platform.OS === 'web') {
      window.alert(info);
    } else {
      Alert.alert('Verifikasi Capaian Level 8 (Expert)', info, [{ text: 'OK', style: 'default' }]);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={[
          styles.safeArea,
          {
            backgroundColor: Platform.select({
              web: isDarkMode ? '#050811' : '#F1F5F9',
              default: theme.background,
            }),
          },
        ]}
        edges={['top', 'left', 'right', 'bottom']}
      >
        <StatusBar style={isDarkMode ? 'light' : 'dark'} backgroundColor={theme.surface} />

        {/* Outer Container (Simulator Frame di Web & Full Screen di Android) */}
        <View
          style={[
            styles.appContainer,
            {
              backgroundColor: theme.background,
              borderColor: theme.border,
            },
          ]}
        >
          {/* Header Institusi, Badge Level 8, & Theme Switcher Button */}
          <Header
            isDarkMode={isDarkMode}
            onToggleTheme={handleToggleTheme}
            theme={theme}
          />

          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* 1. KARTU IDENTITAS MAHASISWA (Digital Student Card) */}
            <ProfileHeader data={profileData} theme={theme} />

            {/* 2. TOMBOL REKOMENDASI INTERAKTIF (Endorse Mahasiswa) */}
            <InteractiveEndorseBar
              studentName={profileData.namaPanggilan}
              initialCount={profileData.initialEndorseCount}
              theme={theme}
            />

            {/* 3. BAR STATISTIK METRIK AKADEMIK UMUM */}
            <MetricBar metrics={profileData.academicMetrics} theme={theme} />

            {/* 4. DASHBOARD CAPAIAN AKADEMIK (MY SCORE SECTION - Materi Level 8 Expert) */}
            <MyScoreSection data={academicScoreData} theme={theme} />

            {/* 5. CHECKLIST EVALUASI LEVEL 8 (Academic Dashboard Verification) */}
            <Level8CriteriaCard
              onShowDetail={handleShowValidation}
              theme={theme}
            />

            {/* 6. GALERI PORTOFOLIO PROYEK DENGAN SEARCH & MODAL DETAIL */}
            <PortfolioGallery
              portfolios={profileData.portfolios}
              theme={theme}
            />

            {/* 7. PENGALAMAN ORGANISASI & RISET TIMELINE */}
            <ExperienceTimeline
              experiences={profileData.experience}
              theme={theme}
            />

            {/* 8. MINAT & HOBI PRIBADI */}
            <HobbySection
              hobbies={profileData.hobbies}
              theme={theme}
            />

            {/* 9. SEKSI TENTANG SAYA & SPESIALISASI MINAT */}
            <AboutSection data={profileData} theme={theme} />

            {/* 10. KEAHLIAN TEKNIS DENGAN FILTER TABS & PROGRESS BAR */}
            <SkillMatrixCard skills={profileData.technicalSkills} theme={theme} />

            {/* 11. RIWAYAT PENDIDIKAN & DOMISILI ALAMAT */}
            <IdentityDetailCard data={profileData} theme={theme} />

            {/* 12. GRID KONTAK & KOMUNIKASI */}
            <ContactGridCard contactItems={profileData.contactItems} theme={theme} />

            {/* 13. FORMULIR KONTAK INTERAKTIF DENGAN VALIDASI & RESPONS */}
            <ContactForm
              data={profileData}
              onMessageSent={handleMessageSent}
              theme={theme}
            />

            {/* 14. FOOTER INFORMASI UTS */}
            <View style={[styles.footer, { borderTopColor: theme.border }]}>
              <Text style={[styles.footerText, { color: theme.textSecondary }]}>
                UTS Pemrograman Mobile 2 • Masoem University
              </Text>
              <Text style={[styles.footerSubtext, { color: theme.textMuted }]}>
                Personal CV & Academic Score App — LEVEL 8 (Expert)
              </Text>
              <Text style={[styles.copyrightText, { color: theme.textLight }]}>
                © 2026 {profileData.nama} ({profileData.nim})
              </Text>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    alignItems: 'center',
  },
  appContainer: {
    flex: 1,
    width: '100%',
    maxWidth: 500, // Menjaga rasio tampilan mobile di layar Web desktop
    ...Platform.select({
      web: {
        boxShadow: '0 4px 32px rgba(0, 0, 0, 0.15)',
        borderLeftWidth: 1,
        borderRightWidth: 1,
      },
    }),
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: SPACING.lg,
    paddingBottom: 40,
  },
  footer: {
    marginTop: SPACING.md,
    alignItems: 'center',
    paddingVertical: SPACING.lg,
    borderTopWidth: 1,
  },
  footerText: {
    fontSize: 12,
    fontWeight: '700',
  },
  footerSubtext: {
    fontSize: 11,
    marginTop: 2,
  },
  copyrightText: {
    fontSize: 10,
    marginTop: 4,
  },
});
