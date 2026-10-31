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

// Import Data Lokal Format JSON (Materi Level 6 & Level 7)
import profileData from './data/profile.json';

// Import Theme System (Materi Level 7: Dark / Light Mode Switcher)
import { getTheme, SPACING } from './theme';

// Import Komponen UI Bersih & Modular
import Header from './components/Header';
import ProfileHeader from './components/ProfileHeader';
import MetricBar from './components/MetricBar';
import InteractiveEndorseBar from './components/InteractiveEndorseBar';
import PortfolioGallery from './components/PortfolioGallery';
import ExperienceTimeline from './components/ExperienceTimeline';
import HobbySection from './components/HobbySection';
import AboutSection from './components/AboutSection';
import SkillMatrixCard from './components/SkillMatrixCard';
import IdentityDetailCard from './components/IdentityDetailCard';
import ContactGridCard from './components/ContactGridCard';
import ContactForm from './components/ContactForm';
import Level7CriteriaCard from './components/Level7CriteriaCard';

export default function App() {
  // 1. State Tema Gelap / Terang (Theme Switcher - Level 7)
  const [isDarkMode, setIsDarkMode] = useState(false);
  const theme = getTheme(isDarkMode);

  // 2. State untuk interaksi pesan kontak
  const [messagesReceivedCount, setMessagesReceivedCount] = useState(0);

  const handleMessageSent = () => {
    setMessagesReceivedCount((prev) => prev + 1);
  };

  const handleToggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const handleShowValidation = () => {
    const info = `LEVEL 7 — ADVANCED EVALUATION:\n\n• Mahasiswa: ${profileData.nama}\n• NIM: ${profileData.nim}\n• Mode Tema: ${isDarkMode ? 'Dark Mode (Mode Gelap)' : 'Light Mode (Mode Terang)'}\n• Fitur Eksplorasi 1: Portfolio Gallery dengan Real-Time Search & Category Filter\n• Fitur Eksplorasi 2: Interactive Modal Popup Rincian Proyek\n• Fitur Eksplorasi 3: Experience Timeline Organisasi & Riset\n• Fitur Eksplorasi 4: Hobby & Personal Interests Section dari JSON\n• Fitur Eksplorasi 5: Dual-Theme Switcher (Dark/Light)\n• Total Pesan Terkirim: ${messagesReceivedCount}`;

    if (Platform.OS === 'web') {
      window.alert(info);
    } else {
      Alert.alert('Verifikasi Capaian Level 7', info, [{ text: 'OK', style: 'default' }]);
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
          {/* Header Institusi, Badge Level 7, & Theme Switcher Button */}
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
            {/* 1. KARTU IDENTITAS UTAMA (Digital Student Card) */}
            <ProfileHeader data={profileData} theme={theme} />

            {/* 2. TOMBOL REKOMENDASI INTERAKTIF (Endorse Mahasiswa) */}
            <InteractiveEndorseBar
              studentName={profileData.namaPanggilan}
              initialCount={profileData.initialEndorseCount}
              theme={theme}
            />

            {/* 3. BAR STATISTIK METRIK AKADEMIK */}
            <MetricBar metrics={profileData.academicMetrics} theme={theme} />

            {/* 4. CHECKLIST EVALUASI LEVEL 7 (Advanced Features Verification) */}
            <Level7CriteriaCard
              onShowDetail={handleShowValidation}
              theme={theme}
            />

            {/* 5. GALERI PORTOFOLIO PROYEK DENGAN SEARCH & MODAL DETAIL (Eksplorasi Level 7) */}
            <PortfolioGallery
              portfolios={profileData.portfolios}
              theme={theme}
            />

            {/* 6. PENGALAMAN ORGANISASI & RISET TIMELINE (Eksplorasi Level 7) */}
            <ExperienceTimeline
              experiences={profileData.experience}
              theme={theme}
            />

            {/* 7. MINAT & HOBI PRIBADI (Eksplorasi Level 7) */}
            <HobbySection
              hobbies={profileData.hobbies}
              theme={theme}
            />

            {/* 8. SEKSI TENTANG SAYA & SPESIALISASI MINAT */}
            <AboutSection data={profileData} theme={theme} />

            {/* 9. KEAHLIAN TEKNIS DENGAN FILTER TABS & PROGRESS BAR */}
            <SkillMatrixCard skills={profileData.technicalSkills} theme={theme} />

            {/* 10. RIWAYAT PENDIDIKAN & DOMISILI ALAMAT */}
            <IdentityDetailCard data={profileData} theme={theme} />

            {/* 11. GRID KONTAK & KOMUNIKASI */}
            <ContactGridCard contactItems={profileData.contactItems} theme={theme} />

            {/* 12. FORMULIR KONTAK INTERAKTIF DENGAN VALIDASI & RESPONS */}
            <ContactForm
              data={profileData}
              onMessageSent={handleMessageSent}
              theme={theme}
            />

            {/* 13. FOOTER INFORMASI UTS */}
            <View style={[styles.footer, { borderTopColor: theme.border }]}>
              <Text style={[styles.footerText, { color: theme.textSecondary }]}>
                UTS Pemrograman Mobile • Masoem University
              </Text>
              <Text style={[styles.footerSubtext, { color: theme.textMuted }]}>
                Personal CV & Academic Score App — LEVEL 7 (Advanced)
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
