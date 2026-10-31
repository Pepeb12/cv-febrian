import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Alert,
  Platform,
  RefreshControl,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Import Data Lokal Format JSON (Level 6 & Level 8: Local JSON Data Architecture)
import profileData from './data/profile.json';
import initialAcademicScoreData from './data/academicScore.json';

// Import Services & Persistence Layer (Level 10: Industry Architecture)
import StorageService from './services/storageService';
import AcademicService from './services/academicService';

// Import Theme System (Dual-Theme Switcher: Dark/Light Mode)
import { getTheme, SPACING } from './theme';

// Import Komponen UI Modular (.tsx)
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

// Import Komponen Ketahanan & Diagnostik Level 10 (.tsx)
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSkeleton from './components/LoadingSkeleton';
import ErrorBanner from './components/ErrorBanner';
import EmptyState from './components/EmptyState';
import FeedbackToast from './components/FeedbackToast';
import DiagnosticModal from './components/DiagnosticModal';
import Level10CriteriaCard from './components/Level10CriteriaCard';

// Import Komponen Evaluasi & Pembelaan Konsep (.tsx)
import ChallengeLevelMatrix from './components/ChallengeLevelMatrix';
import ConceptMasteryModal from './components/ConceptMasteryModal';
import QuickActionBar from './components/QuickActionBar';

export default function App() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 992;
  const isTablet = width >= 720 && width < 992;

  const scrollViewRef = useRef<any>(null);
  const [scoreLayoutY, setScoreLayoutY] = useState(0);
  const [contactLayoutY, setContactLayoutY] = useState(0);

  // 1. State Tema Gelap / Terang dengan Persistensi Lokal (StorageService)
  const [isDarkMode, setIsDarkMode] = useState(false);
  const theme = getTheme(isDarkMode);

  // 2. State Capaian Akademik & Simulasi API LMS (Level 10)
  const [academicData, setAcademicData] = useState(initialAcademicScoreData);
  const [currentState, setCurrentState] = useState<'normal' | 'error' | 'empty'>('normal');
  const [isLoadingAcademic, setIsLoadingAcademic] = useState(false);
  const [academicError, setAcademicError] = useState<any>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // 3. State Interaksi & Diagnostik
  const [toast, setToast] = useState<{ message: string; type: string } | null>(null);
  const [showDiagnosticModal, setShowDiagnosticModal] = useState(false);
  const [showConceptModal, setShowConceptModal] = useState(false);
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
    async (options: { forceError?: boolean; forceEmpty?: boolean; isPullRefresh?: boolean } = {}) => {
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
      } catch (err: any) {
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

  // Scroll Shortcuts
  const scrollToScoreSection = () => {
    if (scrollViewRef.current && scoreLayoutY > 0) {
      scrollViewRef.current.scrollTo({ y: scoreLayoutY - 20, animated: true });
    }
  };

  const scrollToContactSection = () => {
    if (scrollViewRef.current && contactLayoutY > 0) {
      scrollViewRef.current.scrollTo({ y: contactLayoutY - 20, animated: true });
    }
  };

  const handleShowValidation = () => {
    const { studentIdentity, currentScore, learningPoints, learningProgress } = academicData;
    const progressSummary = (learningProgress || [])
      .map((p: any) => `• ${p.name || p.label}: ${p.percentage}%`)
      .join('\n');

    const info = `EVALUASI KELENGKAPAN UTS MAHASISWA:\n\n• Mahasiswa: ${studentIdentity?.name || 'Febrian'} (${studentIdentity?.nim || '242505024'})\n• Mata Kuliah: ${studentIdentity?.course || 'Pemrograman Mobile 2'}\n• Dosen: ${studentIdentity?.lecturer || 'Iin, M.Kom'}\n• Current Score: ${currentScore?.score} (Grade ${currentScore?.grade})\n• Learning Points: ${learningPoints?.total?.toLocaleString('id-ID')} LP\n• Capaian Belajar:\n${progressSummary || 'Data kosong'}\n• Status: Semua Level 1 s.d. Level 10 Lolos Evaluasi 100%`;

    if (Platform.OS === 'web') {
      window.alert(info);
    } else {
      Alert.alert('Evaluasi Capaian UTS (Level 1 s.d. Level 10)', info, [{ text: 'OK', style: 'default' }]);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={[
          styles.safeArea,
          {
            backgroundColor: theme.background,
          },
        ]}
        edges={['top', 'left', 'right', 'bottom']}
      >
        <StatusBar style={isDarkMode ? 'light' : 'dark'} />

        {/* Outer Container (Full Width & Responsive di Web & Mobile) */}
        <View
          style={[
            styles.appContainer,
            {
              backgroundColor: theme.background,
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
              ref={scrollViewRef}
              style={styles.scrollView}
              contentContainerStyle={[
                styles.scrollContent,
                {
                  paddingHorizontal: isDesktop ? SPACING.xxl : isTablet ? SPACING.xl : SPACING.md,
                },
              ]}
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
              {/* Responsive Container Wrapper: Maksimal 1280px di Layar Lebar, Full-width di Ponsel */}
              <View style={styles.responsiveContentWrapper}>
                {isDesktop ? (
                  /* ========================================================
                     DESKTOP WIDESCREEN RESPONSIVE 2-COLUMN DASHBOARD LAYOUT
                     ======================================================== */
                  <View style={styles.desktopLayoutRow}>
                    {/* Left Column (Sidebar: Profile, Quick Actions, Education & Contact Info) */}
                    <View style={styles.desktopSidebarCol}>
                      <ProfileHeader data={profileData} theme={theme} />

                      <InteractiveEndorseBar
                        studentName={profileData.namaPanggilan}
                        initialCount={profileData.initialEndorseCount}
                        theme={theme}
                      />

                      <QuickActionBar
                        onScrollToScore={scrollToScoreSection}
                        onOpenTestRunner={() => setShowDiagnosticModal(true)}
                        onOpenConcepts={() => setShowConceptModal(true)}
                        onScrollToContact={scrollToContactSection}
                        theme={theme}
                      />

                      <IdentityDetailCard data={profileData} theme={theme} />

                      <ContactGridCard contactItems={profileData.contactItems} theme={theme} />
                    </View>

                    {/* Right Column (Main Content Area: Scores, Matrix, Portfolios, Skills, & Forms) */}
                    <View style={styles.desktopMainCol}>
                      <MetricBar metrics={profileData.academicMetrics} theme={theme} />

                      {/* My Score Academic Dashboard with State Resilience */}
                      <View
                        onLayout={(e) => {
                          setScoreLayoutY(e.nativeEvent.layout.y);
                        }}
                      >
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
                      </View>

                      {/* Evaluasi Matriks Level 1 s.d. Level 10 */}
                      <ChallengeLevelMatrix
                        theme={theme}
                        onOpenConceptModal={() => setShowConceptModal(true)}
                      />

                      {/* Kontrol Demonstrasi Pengujian Dosen */}
                      <Level10CriteriaCard
                        currentState={currentState}
                        onTriggerNormal={handleTriggerNormal}
                        onTriggerError={handleTriggerError}
                        onTriggerEmpty={handleTriggerEmpty}
                        onOpenTestRunner={() => setShowDiagnosticModal(true)}
                        theme={theme}
                      />

                      <Level8CriteriaCard
                        onShowDetail={handleShowValidation}
                        theme={theme}
                      />

                      <PortfolioGallery
                        portfolios={profileData.portfolios}
                        theme={theme}
                      />

                      <SkillMatrixCard skills={profileData.technicalSkills} theme={theme} />

                      <ExperienceTimeline
                        experiences={profileData.experience}
                        theme={theme}
                      />

                      <HobbySection
                        hobbies={profileData.hobbies}
                        theme={theme}
                      />

                      <AboutSection data={profileData} theme={theme} />

                      <View
                        onLayout={(e) => {
                          setContactLayoutY(e.nativeEvent.layout.y);
                        }}
                      >
                        <ContactForm
                          data={profileData}
                          onMessageSent={handleMessageSent}
                          theme={theme}
                        />
                      </View>
                    </View>
                  </View>
                ) : (
                  /* ========================================================
                     MOBILE & TABLET RESPONSIVE SINGLE-COLUMN LAYOUT
                     ======================================================== */
                  <View style={styles.mobileLayoutCol}>
                    {/* 1. KARTU IDENTITAS MAHASISWA */}
                    <ProfileHeader data={profileData} theme={theme} />

                    {/* 2. TOMBOL REKOMENDASI INTERAKTIF */}
                    <InteractiveEndorseBar
                      studentName={profileData.namaPanggilan}
                      initialCount={profileData.initialEndorseCount}
                      theme={theme}
                    />

                    {/* 3. QUICK ACTION BAR */}
                    <QuickActionBar
                      onScrollToScore={scrollToScoreSection}
                      onOpenTestRunner={() => setShowDiagnosticModal(true)}
                      onOpenConcepts={() => setShowConceptModal(true)}
                      onScrollToContact={scrollToContactSection}
                      theme={theme}
                    />

                    {/* 4. BAR STATISTIK METRIK AKADEMIK */}
                    <MetricBar metrics={profileData.academicMetrics} theme={theme} />

                    {/* 5. DASHBOARD CAPAIAN AKADEMIK (MY SCORE SECTION) */}
                    <View
                      onLayout={(e) => {
                        setScoreLayoutY(e.nativeEvent.layout.y);
                      }}
                    >
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
                    </View>

                    {/* 6. MATRIKS PENILAIAN CHALLENGE LEVEL (Level 1 s.d. Level 10) */}
                    <ChallengeLevelMatrix
                      theme={theme}
                      onOpenConceptModal={() => setShowConceptModal(true)}
                    />

                    {/* 7. KONTROL INTERAKTIF LEVEL 10 (INDUSTRY) */}
                    <Level10CriteriaCard
                      currentState={currentState}
                      onTriggerNormal={handleTriggerNormal}
                      onTriggerError={handleTriggerError}
                      onTriggerEmpty={handleTriggerEmpty}
                      onOpenTestRunner={() => setShowDiagnosticModal(true)}
                      theme={theme}
                    />

                    {/* 8. CHECKLIST VERIFIKASI LEVEL 8 */}
                    <Level8CriteriaCard
                      onShowDetail={handleShowValidation}
                      theme={theme}
                    />

                    {/* 9. GALERI PORTOFOLIO PROYEK DENGAN SEARCH & MODAL */}
                    <PortfolioGallery
                      portfolios={profileData.portfolios}
                      theme={theme}
                    />

                    {/* 10. TIMELINE PENGALAMAN ORGANISASI & RISET */}
                    <ExperienceTimeline
                      experiences={profileData.experience}
                      theme={theme}
                    />

                    {/* 11. MINAT & HOBI PRIBADI */}
                    <HobbySection
                      hobbies={profileData.hobbies}
                      theme={theme}
                    />

                    {/* 12. SEKSI TENTANG SAYA */}
                    <AboutSection data={profileData} theme={theme} />

                    {/* 13. KEAHLIAN TEKNIS */}
                    <SkillMatrixCard skills={profileData.technicalSkills} theme={theme} />

                    {/* 14. RIWAYAT PENDIDIKAN & DOMISILI ALAMAT */}
                    <IdentityDetailCard data={profileData} theme={theme} />

                    {/* 15. GRID KONTAK & KOMUNIKASI */}
                    <ContactGridCard contactItems={profileData.contactItems} theme={theme} />

                    {/* 16. FORMULIR KONTAK INTERAKTIF */}
                    <View
                      onLayout={(e) => {
                        setContactLayoutY(e.nativeEvent.layout.y);
                      }}
                    >
                      <ContactForm
                        data={profileData}
                        onMessageSent={handleMessageSent}
                        theme={theme}
                      />
                    </View>
                  </View>
                )}

                {/* FOOTER INFORMASI UTS & PANDUAN SIDANG */}
                <View style={[styles.footer, { borderTopColor: theme.border }]}>
                  <TouchableOpacity
                    style={[styles.conceptDefenseBtn, { backgroundColor: isDarkMode ? '#1E293B' : '#EFF6FF', borderColor: theme.primary }]}
                    onPress={() => setShowConceptModal(true)}
                    activeOpacity={0.8}
                    accessibilityRole="button"
                    accessibilityLabel="Buka Panduan Pembelaan Konsep React Native"
                  >
                    <MaterialCommunityIcons name="school" size={18} color={theme.primary} />
                    <Text style={[styles.conceptDefenseBtnText, { color: theme.primary }]}>
                      Panduan Konsep React Native (Materi P1 - P10)
                    </Text>
                  </TouchableOpacity>

                  <Text style={[styles.footerText, { color: theme.textSecondary }]}>
                    UTS Pemrograman Mobile 2 • Masoem University
                  </Text>
                  <Text style={[styles.footerSubtext, { color: theme.textMuted }]}>
                    Personal CV & Academic Score App — LEVEL 10 (Full Screen Responsive TSX)
                  </Text>
                  <Text style={[styles.copyrightText, { color: theme.textLight }]}>
                    © 2026 {profileData.nama} ({profileData.nim})
                  </Text>
                </View>
              </View>
            </ScrollView>
          </ErrorBoundary>

          {/* Modal Test Runner Otomatis Live (Level 10) */}
          <DiagnosticModal
            visible={showDiagnosticModal}
            onClose={() => setShowDiagnosticModal(false)}
            theme={theme}
          />

          {/* Modal Panduan Penguasaan Konsep Sidang UTS (P1 s.d. P10) */}
          <ConceptMasteryModal
            visible={showConceptModal}
            onClose={() => setShowConceptModal(false)}
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
    width: '100%',
  },
  appContainer: {
    flex: 1,
    width: '100%',
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  scrollContent: {
    paddingVertical: SPACING.lg,
    paddingBottom: 40,
  },
  responsiveContentWrapper: {
    width: '100%',
    maxWidth: 1320,
    alignSelf: 'center',
  },
  // Desktop Widescreen 2-Column Grid
  desktopLayoutRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: SPACING.xl,
  },
  desktopSidebarCol: {
    width: 380,
    maxWidth: 420,
  },
  desktopMainCol: {
    flex: 1,
  },
  // Mobile / Tablet Single-Column
  mobileLayoutCol: {
    width: '100%',
    maxWidth: 680,
    alignSelf: 'center',
  },
  footer: {
    marginTop: SPACING.xl,
    alignItems: 'center',
    paddingVertical: SPACING.lg,
    borderTopWidth: 1,
    gap: 8,
    width: '100%',
  },
  conceptDefenseBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
    marginBottom: 8,
  },
  conceptDefenseBtnText: {
    fontSize: 12,
    fontWeight: '800',
  },
  footerText: {
    fontSize: 12,
    fontWeight: '700',
  },
  footerSubtext: {
    fontSize: 11,
  },
  copyrightText: {
    fontSize: 10,
  },
});
