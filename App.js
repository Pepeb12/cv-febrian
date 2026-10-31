import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Alert,
  Platform,
  RefreshControl,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// Import Data Lokal Format JSON (Level 6 & Level 8: Local JSON Data Architecture)
import profileData from './data/profile.json';
import initialAcademicScoreData from './data/academicScore.json';

// Import Services & Persistence Layer (Level 10: Industry Architecture)
import StorageService from './services/storageService';
import AcademicService from './services/academicService';

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

// Import Komponen Ketahanan & Diagnostik Level 10 (Industry)
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSkeleton from './components/LoadingSkeleton';
import ErrorBanner from './components/ErrorBanner';
import EmptyState from './components/EmptyState';
import FeedbackToast from './components/FeedbackToast';
import DiagnosticModal from './components/DiagnosticModal';
import Level10CriteriaCard from './components/Level10CriteriaCard';

export default function App() {
  // 1. State Tema Gelap / Terang dengan Persistensi Lokal (StorageService)
  const [isDarkMode, setIsDarkMode] = useState(false);
  const theme = getTheme(isDarkMode);

  // 2. State Capaian Akademik & Simulasi API LMS (Level 10)
  const [academicData, setAcademicData] = useState(initialAcademicScoreData);
  const [currentState, setCurrentState] = useState('normal'); // 'normal' | 'error' | 'empty'
  const [isLoadingAcademic, setIsLoadingAcademic] = useState(false);
  const [academicError, setAcademicError] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // 3. State Interaksi & Diagnostik
  const [toast, setToast] = useState(null); // { message, type }
  const [showDiagnosticModal, setShowDiagnosticModal] = useState(false);
  const [messagesReceivedCount, setMessagesReceivedCount] = useState(0);

  // 4. Inisialisasi Preferensi Tersimpan (AsyncStorage)
  useEffect(() => {
    async function loadSavedPreferences() {
      try {
        const savedTheme = await StorageService.getThemeMode();
        if (savedTheme === 'dark') {
          setIsDarkMode(true);
        }
      } catch (err) {
        console.warn('Gagal memuat preferensi tema:', err);
      }
    }
    loadSavedPreferences();
  }, []);

  // 5. Handler Ganti Tema dengan Penyimpanan Otomatis
  const handleToggleTheme = async () => {
    const nextMode = !isDarkMode;
    setIsDarkMode(nextMode);
    await StorageService.setThemeMode(nextMode ? 'dark' : 'light');
    setToast({
      message: `Beralih ke mode ${nextMode ? 'Gelap (Dark)' : 'Terang (Light)'}`,
      type: 'info',
    });
  };

  // 6. Pengambilan Data Akademik dari AcademicService (API Mock / LMS Simulation)
  const fetchScores = useCallback(
    async (options = {}) => {
      const { forceError = false, forceEmpty = false, isPullRefresh = false } = options;
      if (isPullRefresh) {
        setIsRefreshing(true);
      } else {
        setIsLoadingAcademic(true);
      }
      setAcademicError(null);

      try {
        const result = await AcademicService.fetchAcademicScore({
          forceError,
          forceEmpty,
          delayMs: isPullRefresh ? 700 : 500,
        });
        setAcademicData(result);

        if (forceEmpty) {
          setCurrentState('empty');
          setToast({
            message: 'Simulasi Empty State aktif: Belum ada data nilai semester ini.',
            type: 'warning',
          });
        } else {
          setCurrentState('normal');
          if (isPullRefresh) {
            setToast({
              message: 'Sinkronisasi LMS berhasil • Data nilai terupdate',
              type: 'success',
            });
          }
        }
      } catch (err) {
        setCurrentState('error');
        setAcademicError(err);
        setToast({
          message: `Gagal Sinkronisasi: ${err.message}`,
          type: 'error',
        });
      } finally {
        setIsLoadingAcademic(false);
        setIsRefreshing(false);
      }
    },
    []
  );

  // 7. Pull-to-Refresh Handler
  const handlePullToRefresh = () => {
    fetchScores({ isPullRefresh: true });
  };

  // 8. Kontrol Simulasi Level 10
  const handleTriggerNormal = () => {
    fetchScores({ forceError: false, forceEmpty: false });
  };

  const handleTriggerError = () => {
    fetchScores({ forceError: true });
  };

  const handleTriggerEmpty = () => {
    fetchScores({ forceEmpty: true });
  };

  const handleMessageSent = () => {
    setMessagesReceivedCount((prev) => prev + 1);
    setToast({
      message: 'Pesan Anda berhasil diterima dan disimpan.',
      type: 'success',
    });
  };

  const handleShowValidation = () => {
    const { studentIdentity, currentScore, learningPoints, learningProgress } = academicData;
    const progressSummary = (learningProgress || [])
      .map((p) => `• ${p.name}: ${p.percentage}%`)
      .join('\n');

    const info = `LEVEL 10 — INDUSTRY READY EVALUATION:\n\n• Mahasiswa: ${studentIdentity?.name || 'Febrian'} (${studentIdentity?.nim || '242505024'})\n• Mata Kuliah: ${studentIdentity?.course || 'Pemrograman Mobile 2'}\n• Dosen: ${studentIdentity?.lecturer || 'Iin, M.Kom'}\n• Current Score: ${currentScore?.score} (Grade ${currentScore?.grade})\n• Learning Points: ${learningPoints?.total?.toLocaleString('id-ID')} LP\n• Capaian Belajar:\n${progressSummary || 'Data kosong'}\n• Status: Service Layer, AsyncStorage, a11y, Error Boundary, & Automated Tests Aktif`;

    if (Platform.OS === 'web') {
      window.alert(info);
    } else {
      Alert.alert('Evaluasi Capaian Level 10 (Industry)', info, [{ text: 'OK', style: 'default' }]);
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
          {/* Production Feedback Toast */}
          {toast ? (
            <FeedbackToast
              message={toast.message}
              type={toast.type}
              onDismiss={() => setToast(null)}
            />
          ) : null}

          {/* Header Institusi, Badge Level 10, & Theme Switcher Button */}
          <Header
            isDarkMode={isDarkMode}
            onToggleTheme={handleToggleTheme}
            theme={theme}
          />

          {/* Error Boundary: Melindungi Seluruh Konten Aplikasi dari Crash */}
          <ErrorBoundary theme={theme} onReset={handleTriggerNormal}>
            <ScrollView
              style={styles.scrollView}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={isRefreshing}
                  onRefresh={handlePullToRefresh}
                  colors={['#0284C7', '#10B981']}
                  tintColor={theme.primary}
                />
              }
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

              {/* 4. DASHBOARD CAPAIAN AKADEMIK (MY SCORE SECTION) DENGAN STATE HANDLING */}
              {isLoadingAcademic ? (
                <LoadingSkeleton theme={theme} />
              ) : currentState === 'error' ? (
                <ErrorBanner
                  error={academicError}
                  onRetry={handleTriggerNormal}
                  theme={theme}
                />
              ) : currentState === 'empty' ? (
                <EmptyState
                  icon="chart-line"
                  title="Belum Ada Capaian Akademik"
                  message="Data nilai semester ini belum diinput atau sedang dalam proses rekapitulasi dosen."
                  actionLabel="Sinkronkan Ulang Data LMS"
                  onAction={handleTriggerNormal}
                  theme={theme}
                />
              ) : (
                <MyScoreSection data={academicData} theme={theme} />
              )}

              {/* 5. SHOWCASE DIAGNOSTIK & KONTROL INTERAKTIF LEVEL 10 (INDUSTRY) */}
              <Level10CriteriaCard
                currentState={currentState}
                onTriggerNormal={handleTriggerNormal}
                onTriggerError={handleTriggerError}
                onTriggerEmpty={handleTriggerEmpty}
                onOpenTestRunner={() => setShowDiagnosticModal(true)}
                theme={theme}
              />

              {/* 6. CHECKLIST EVALUASI LEVEL 8 (Academic Dashboard Verification) */}
              <Level8CriteriaCard
                onShowDetail={handleShowValidation}
                theme={theme}
              />

              {/* 7. GALERI PORTOFOLIO PROYEK DENGAN SEARCH & MODAL DETAIL */}
              <PortfolioGallery
                portfolios={profileData.portfolios}
                theme={theme}
              />

              {/* 8. PENGALAMAN ORGANISASI & RISET TIMELINE */}
              <ExperienceTimeline
                experiences={profileData.experience}
                theme={theme}
              />

              {/* 9. MINAT & HOBI PRIBADI */}
              <HobbySection
                hobbies={profileData.hobbies}
                theme={theme}
              />

              {/* 10. SEKSI TENTANG SAYA & SPESIALISASI MINAT */}
              <AboutSection data={profileData} theme={theme} />

              {/* 11. KEAHLIAN TEKNIS DENGAN FILTER TABS & PROGRESS BAR */}
              <SkillMatrixCard skills={profileData.technicalSkills} theme={theme} />

              {/* 12. RIWAYAT PENDIDIKAN & DOMISILI ALAMAT */}
              <IdentityDetailCard data={profileData} theme={theme} />

              {/* 13. GRID KONTAK & KOMUNIKASI */}
              <ContactGridCard contactItems={profileData.contactItems} theme={theme} />

              {/* 14. FORMULIR KONTAK INTERAKTIF DENGAN VALIDASI & RESPONS */}
              <ContactForm
                data={profileData}
                onMessageSent={handleMessageSent}
                theme={theme}
              />

              {/* 15. FOOTER INFORMASI UTS */}
              <View style={[styles.footer, { borderTopColor: theme.border }]}>
                <Text style={[styles.footerText, { color: theme.textSecondary }]}>
                  UTS Pemrograman Mobile 2 • Masoem University
                </Text>
                <Text style={[styles.footerSubtext, { color: theme.textMuted }]}>
                  Personal CV & Academic Score App — LEVEL 10 (Industry Ready)
                </Text>
                <Text style={[styles.copyrightText, { color: theme.textLight }]}>
                  © 2026 {profileData.nama} ({profileData.nim})
                </Text>
              </View>
            </ScrollView>
          </ErrorBoundary>

          {/* Modal Test Runner Otomatis Live (Level 10) */}
          <DiagnosticModal
            visible={showDiagnosticModal}
            onClose={() => setShowDiagnosticModal(false)}
            theme={theme}
          />
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
