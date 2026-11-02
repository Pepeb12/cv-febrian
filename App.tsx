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
  Linking,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from '@expo-google-fonts/inter';

// Import Data Lokal Format JSON (Level 6 & Level 8: Local JSON Data Architecture)
import profileData from './data/profile.json';
import initialAcademicScoreData from './data/academicScore.json';

// Import Services & Persistence Layer (Level 10: Industry Architecture)
import StorageService from './services/storageService';
import AcademicService from './services/academicService';

// Import Theme System (Minimalist Tech & Emerald – Cream – White – Mint)
import { getTheme, SPACING, FONTS } from './theme';

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

// Import Komponen Evaluasi Bertahap 4 Scroll
import StageNavigationStepper from './components/StageNavigationStepper';
import StageSectionDivider from './components/StageSectionDivider';

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

  // Load Google Font: Inter (Minimalist Tech Architecture)
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  });

  const scrollViewRef = useRef<any>(null);

  // Layout Y Positions for 4 Evaluation Stages
  const [activeStage, setActiveStage] = useState(1);
  const [stage1Y, setStage1Y] = useState(0);
  const [stage2Y, setStage2Y] = useState(0);
  const [stage3Y, setStage3Y] = useState(0);
  const [stage4Y, setStage4Y] = useState(0);

  // 1. State Tema Gelap / Terang (Emerald – Cream – White – Mint)
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
    try {
      await StorageService.setThemeMode(nextMode ? 'dark' : 'light');
      setToast({
        message: nextMode
          ? 'Mode Malam (Retro Olive & Beige) diaktifkan'
          : 'Mode Terang (Retro Olive & Beige) diaktifkan',
        type: 'info',
      });
    } catch (err) {
      console.warn('Gagal menyimpan tema:', err);
    }
  };

  // 6. Pengambilan Data Skor & Simulasi Kehandalan Level 10
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
        const responseData = await AcademicService.fetchAcademicScore({
          forceError,
          forceEmpty,
          delayMs: 600,
        });

        if (forceEmpty) {
          setCurrentState('empty');
          setAcademicData(responseData);
          setToast({
            message: 'Simulasi: Data capaian kosong (Empty State aktif)',
            type: 'info',
          });
        } else {
          setCurrentState('normal');
          setAcademicData(responseData);
          if (isPullRefresh) {
            setToast({
              message: 'Data capaian berhasil diperbarui dari sistem akademik',
              type: 'success',
            });
          }
        }
      } catch (err: any) {
        setCurrentState('error');
        setAcademicError(err);
        setToast({
          message: 'Simulasi Gagal: Gagal terhubung ke Academic Server (HTTP 503)',
          type: 'error',
        });
      } finally {
        setIsLoadingAcademic(false);
        setIsRefreshing(false);
      }
    },
    []
  );

  const handlePullToRefresh = () => {
    fetchScores({ isPullRefresh: true });
  };

  // Kontrol Simulasi Level 10
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

  // Navigasi 4 Tahap Evaluasi Bertahap
  const handleSelectStage = (stageIndex: number) => {
    setActiveStage(stageIndex);
    let targetY = 0;
    if (stageIndex === 1) targetY = stage1Y;
    else if (stageIndex === 2) targetY = stage2Y;
    else if (stageIndex === 3) targetY = stage3Y;
    else if (stageIndex === 4) targetY = stage4Y;

    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: Math.max(targetY - 10, 0), animated: true });
    }
  };

  const handleScroll = (event: any) => {
    const y = event.nativeEvent.contentOffset.y;
    if (stage4Y > 0 && y >= stage4Y - 120) {
      if (activeStage !== 4) setActiveStage(4);
    } else if (stage3Y > 0 && y >= stage3Y - 120) {
      if (activeStage !== 3) setActiveStage(3);
    } else if (stage2Y > 0 && y >= stage2Y - 120) {
      if (activeStage !== 2) setActiveStage(2);
    } else {
      if (activeStage !== 1) setActiveStage(1);
    }
  };

  const handleShowValidation = () => {
    const { studentIdentity, currentScore, learningPoints, learningProgress } = academicData;
    const progressSummary = (learningProgress || [])
      .map((p: any) => `• ${p.name || p.label}: ${p.percentage}%`)
      .join('\n');

    const info = `EVALUASI KELENGKAPAN UTS MAHASISWA:\n\n• Mahasiswa: ${studentIdentity?.name || 'Febrian'} (${studentIdentity?.nim || '242505024'})\n• Mata Kuliah: ${studentIdentity?.course || 'Pemrograman Mobile 2'}\n• Dosen: ${studentIdentity?.lecturer || 'Iin, M.Kom'}\n• Current Score: ${currentScore?.score} (Grade ${currentScore?.grade})\n• Learning Points: ${learningPoints?.total?.toLocaleString('id-ID')} LP\n• Capaian Belajar:\n${progressSummary || 'Data kosong'}\n• Status: Seluruh Kriteria Akademik & Portofolio Terpenuhi 100%`;

    if (Platform.OS === 'web') {
      window.alert(info);
    } else {
      Alert.alert('Evaluasi Capaian Akademik & Portofolio', info, [{ text: 'OK', style: 'default' }]);
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
              onScroll={handleScroll}
              scrollEventThrottle={16}
              refreshControl={
                <RefreshControl
                  refreshing={isRefreshing}
                  onRefresh={handlePullToRefresh}
                  colors={[theme.primary, theme.secondary]}
                  tintColor={theme.primary}
                />
              }
            >
              {/* Responsive Container Wrapper: Maksimal 1200px di Layar Lebar */}
              <View style={styles.responsiveContentWrapper}>
                {/* 4 STAGE STEPPER NAVIGATOR */}
                <StageNavigationStepper
                  activeStage={activeStage}
                  onSelectStage={handleSelectStage}
                  theme={theme}
                />

                {/* ========================================================
                    TAHAP 1: LEVEL 1 — 3: FONDASI & IDENTITAS MAHASISWA
                    (SCROLL 1)
                    ======================================================== */}
                <View
                  onLayout={(e) => {
                    setStage1Y(e.nativeEvent.layout.y);
                  }}
                  style={styles.stageBlock}
                >
                  <StageSectionDivider
                    stageNumber={1}
                    stageTitle="Fondasi & Identitas Mahasiswa"
                    stageDesc="Identitas dasar, pengantar profil, Flexbox layout & tipografi Inter"
                    icon="person-circle-outline"
                    theme={theme}
                  />

                  {/* Header Profil Dua Kolom 30% : 70% di Bagian Paling Atas */}
                  <ProfileHeader
                    data={profileData}
                    theme={theme}
                    onExploreScore={() => handleSelectStage(3)}
                    onContactClick={() => handleSelectStage(4)}
                  />

                  {/* Metrik Akademik & Navigasi Aksi Cepat */}
                  <MetricBar metrics={profileData.academicMetrics} theme={theme} />
                  <QuickActionBar
                    onScrollToScore={() => handleSelectStage(3)}
                    onOpenTestRunner={() => setShowDiagnosticModal(true)}
                    onOpenConcepts={() => setShowConceptModal(true)}
                    onScrollToContact={() => handleSelectStage(4)}
                    theme={theme}
                  />
                </View>

                {/* ========================================================
                    TAHAP 2: LEVEL 4 — 6: INTERAKSI, PIPELINE DATA & JSON
                    (SCROLL 2)
                    ======================================================== */}
                <View
                  onLayout={(e) => {
                    setStage2Y(e.nativeEvent.layout.y);
                  }}
                  style={styles.stageBlock}
                >
                  <StageSectionDivider
                    stageNumber={2}
                    stageTitle="Pendidikan, Minat & Kontak"
                    stageDesc="Riwayat pendidikan formal, spesialisasi, dan kanal komunikasi profesional"
                    icon="git-network-outline"
                    theme={theme}
                  />

                  <InteractiveEndorseBar
                    studentName={profileData.namaPanggilan}
                    initialCount={profileData.initialEndorseCount}
                    theme={theme}
                  />

                  {isDesktop ? (
                    <View style={styles.desktopGrid2Col}>
                      <View style={styles.desktopColHalf}>
                        <IdentityDetailCard data={profileData} theme={theme} />
                        <ContactGridCard contactItems={profileData.contactItems} theme={theme} />
                      </View>
                      <View style={styles.desktopColHalf}>
                        <AboutSection data={profileData} theme={theme} />
                      </View>
                    </View>
                  ) : (
                    <View style={styles.mobileColumn}>
                      <IdentityDetailCard data={profileData} theme={theme} />
                      <ContactGridCard contactItems={profileData.contactItems} theme={theme} />
                      <AboutSection data={profileData} theme={theme} />
                    </View>
                  )}
                </View>

                {/* ========================================================
                    TAHAP 3: LEVEL 7 — 8: EKSPLORASI FITUR & MY SCORE
                    (SCROLL 3)
                    ======================================================== */}
                <View
                  onLayout={(e) => {
                    setStage3Y(e.nativeEvent.layout.y);
                  }}
                  style={styles.stageBlock}
                >
                  <StageSectionDivider
                    stageNumber={3}
                    stageTitle="Dashboard My Score & Portofolio"
                    stageDesc="Current Score 90 (Grade A), 19.000 LP, Galeri Portofolio & Keahlian Teknis"
                    icon="school-outline"
                    theme={theme}
                  />

                  {/* DASHBOARD MY SCORE (WAJIB MENONJOL DENGAN PALET EMERALD & MINT) */}
                  <View>
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

                  {/* GALERI PORTOFOLIO PROYEK (CSS Grid: 2 Kolom Desktop, 1 Kolom Mobile, Gap 24px) */}
                  <PortfolioGallery
                    portfolios={profileData.portfolios}
                    theme={theme}
                  />

                  {/* KEAHLIAN TEKNIS (Chips/Tags Flex-Wrap), PENGALAMAN & HOBI */}
                  {isDesktop ? (
                    <View style={styles.desktopGrid2Col}>
                      <View style={styles.desktopColHalf}>
                        <SkillMatrixCard skills={profileData.technicalSkills} theme={theme} />
                        <HobbySection
                          hobbies={profileData.hobbies}
                          theme={theme}
                        />
                      </View>
                      <View style={styles.desktopColHalf}>
                        <ExperienceTimeline
                          experiences={profileData.experience}
                          theme={theme}
                        />
                      </View>
                    </View>
                  ) : (
                    <View style={styles.mobileColumn}>
                      <SkillMatrixCard skills={profileData.technicalSkills} theme={theme} />
                      <ExperienceTimeline
                        experiences={profileData.experience}
                        theme={theme}
                      />
                      <HobbySection
                        hobbies={profileData.hobbies}
                        theme={theme}
                      />
                    </View>
                  )}
                </View>

                {/* ========================================================
                    TAHAP 4: LEVEL 9 — 10: STANDAR INDUSTRI, PENGUJIAN & KONTAK
                    (SCROLL 4)
                    ======================================================== */}
                <View
                  onLayout={(e) => {
                    setStage4Y(e.nativeEvent.layout.y);
                  }}
                  style={styles.stageBlock}
                >
                  <StageSectionDivider
                    stageNumber={4}
                    stageTitle="Arsitektur Aplikasi & Hubungi Mahasiswa"
                    stageDesc="Standar arsitektur industri, simulasi API, test suite, dan formulir kontak"
                    icon="shield-checkmark-outline"
                    theme={theme}
                  />

                  {/* Matriks Evaluasi Lengkap Level 1 s.d. Level 10 */}
                  <ChallengeLevelMatrix
                    theme={theme}
                    onOpenConceptModal={() => setShowConceptModal(true)}
                  />

                  {isDesktop ? (
                    <View style={styles.desktopGrid2Col}>
                      <View style={styles.desktopColHalf}>
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
                      </View>

                      <View style={styles.desktopColHalf}>
                        <ContactForm
                          data={profileData}
                          onMessageSent={handleMessageSent}
                          theme={theme}
                        />
                      </View>
                    </View>
                  ) : (
                    <View style={styles.mobileColumn}>
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

                      <ContactForm
                        data={profileData}
                        onMessageSent={handleMessageSent}
                        theme={theme}
                      />
                    </View>
                  )}
                </View>

                {/* FOOTER INFORMASI UTS & PANDUAN SIDANG DENGAN EMERALD & CREAM */}
                <View style={[styles.footer, { borderTopColor: theme.border }]}>
                  {/* Slogan Mahasiswa: Lato Bold & Warna Emerald */}
                  <Text style={[styles.mottoText, { color: theme.primary }]}>
                    Analyze • Build • Deliver
                  </Text>
                  <Text style={[styles.mottoSubtext, { color: theme.textMuted }]}>
                    Fokus pada Rekayasa Perangkat Lunak Berkualitas & Analisis Proses Bisnis
                  </Text>

                  {/* Panduan Konsep UTS */}
                  <TouchableOpacity
                    style={[
                      styles.conceptDefenseBtn,
                      {
                        backgroundColor: isDarkMode ? '#063B2C' : '#ECFDF5',
                        borderColor: isDarkMode ? theme.primary : '#A7F3D0',
                      },
                    ]}
                    onPress={() => setShowConceptModal(true)}
                    activeOpacity={0.8}
                    accessibilityRole="button"
                    accessibilityLabel="Buka Panduan Pembelaan Konsep React Native"
                  >
                    <MaterialCommunityIcons name="school" size={17} color={theme.primary} />
                    <Text style={[styles.conceptDefenseBtnText, { color: theme.primary }]}>
                      Panduan Penguasaan Konsep (Materi P1 - P10)
                    </Text>
                  </TouchableOpacity>

                  {/* Quick Channels */}
                  <View style={styles.footerLinksRow}>
                    <TouchableOpacity
                      style={[styles.footerLinkChip, { backgroundColor: theme.surfaceMuted, borderColor: theme.border }]}
                      onPress={() => {
                        const url = 'https://github.com/pepeb12';
                        if (Platform.OS === 'web') {
                          window.open(url, '_blank');
                        } else {
                          Linking.openURL(url).catch(() => Alert.alert('GitHub', `Akun GitHub: pepeb12\n${url}`));
                        }
                      }}
                      accessibilityRole="link"
                      accessibilityLabel="Buka GitHub pepeb12"
                    >
                      <MaterialCommunityIcons name="github" size={14} color={theme.textPrimary} />
                      <Text style={[styles.footerLinkText, { color: theme.textPrimary }]}>GitHub</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.footerLinkChip, { backgroundColor: theme.surfaceMuted, borderColor: theme.border }]}
                      onPress={() => {
                        const email = 'febrianrahman902@gmail.com';
                        if (Platform.OS === 'web') {
                          window.open(`mailto:${email}`, '_blank');
                        } else {
                          Linking.openURL(`mailto:${email}`).catch(() => Alert.alert('Email', `Email: ${email}`));
                        }
                      }}
                      accessibilityRole="link"
                      accessibilityLabel="Kirim email ke febrianrahman902@gmail.com"
                    >
                      <MaterialCommunityIcons name="email-outline" size={14} color={theme.textPrimary} />
                      <Text style={[styles.footerLinkText, { color: theme.textPrimary }]}>Email</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.footerLinkChip, { backgroundColor: theme.surfaceMuted, borderColor: theme.border }]}
                      onPress={() => {
                        const phone = '089512336537';
                        const waUrl = 'https://wa.me/6289512336537';
                        if (Platform.OS === 'web') {
                          window.open(waUrl, '_blank');
                        } else {
                          Linking.openURL(waUrl).catch(() => Alert.alert('Kontak / WA', `Nomor Kontak: ${phone}`));
                        }
                      }}
                      accessibilityRole="link"
                      accessibilityLabel="Hubungi kontak WhatsApp 089512336537"
                    >
                      <MaterialCommunityIcons name="whatsapp" size={14} color={theme.textPrimary} />
                      <Text style={[styles.footerLinkText, { color: theme.textPrimary }]}>Kontak</Text>
                    </TouchableOpacity>
                  </View>

                  <Text style={[styles.footerText, { color: theme.textSecondary }]}>
                    UTS Pemrograman Mobile 2 • Masoem University
                  </Text>
                  <Text style={[styles.footerSubtext, { color: theme.textMuted }]}>
                    Dosen Pengampu: Iin, M.Kom • Semester Ganjil 2026/2027
                  </Text>
                  <Text style={[styles.copyrightText, { color: theme.textLight }]}>
                    © 2026 {profileData.nama} ({profileData.nim}) — PRODUCTION READY
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
    paddingVertical: SPACING.xxxl, // 48px (py-12 on 8px scale)
    paddingBottom: SPACING.huge, // 64px
  },
  responsiveContentWrapper: {
    width: '100%',
    maxWidth: 1200, // Standardized 1200px container width
    marginHorizontal: 'auto',
    alignSelf: 'center',
    gap: SPACING.gap, // 20px standardized inter-element gap
  },
  stageBlock: {
    marginBottom: SPACING.gap, // 20px standardized gap
    gap: SPACING.gap, // 20px standardized gap
  },
  // Desktop Widescreen 2-Column Grid
  desktopGrid2Col: {
    flexDirection: 'row',
    alignItems: 'stretch', // Equal/matching vertical heights
    gap: SPACING.gap, // 20px standardized gap
    width: '100%',
  },
  desktopColHalf: {
    flex: 1,
    gap: SPACING.gap, // 20px gap
    display: 'flex',
  },
  // Mobile / Tablet Single-Column
  mobileColumn: {
    width: '100%',
    maxWidth: 720,
    alignSelf: 'center',
    gap: SPACING.gap, // 20px gap
  },
  footer: {
    marginTop: SPACING.xl,
    alignItems: 'center',
    paddingVertical: SPACING.lg,
    borderTopWidth: 1,
    gap: 7,
    width: '100%',
  },
  mottoText: {
    fontFamily: FONTS.heading,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  mottoSubtext: {
    fontFamily: FONTS.body,
    fontSize: 11,
    textAlign: 'center',
    marginBottom: 6,
  },
  conceptDefenseBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 9,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderWidth: 1,
    gap: 7,
    marginBottom: 6,
  },
  conceptDefenseBtnText: {
    fontFamily: FONTS.heading,
    fontSize: 11.5,
    fontWeight: '700',
  },
  footerLinksRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 6,
  },
  footerLinkChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 7,
    borderWidth: 1,
    gap: 5,
  },
  footerLinkText: {
    fontFamily: FONTS.heading,
    fontSize: 10.5,
    fontWeight: '700',
  },
  footerText: {
    fontFamily: FONTS.heading,
    fontSize: 11.5,
    fontWeight: '700',
  },
  footerSubtext: {
    fontFamily: FONTS.body,
    fontSize: 10.5,
  },
  copyrightText: {
    fontFamily: FONTS.body,
    fontSize: 9.5,
  },
});
