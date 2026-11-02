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
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from '@expo-google-fonts/inter';
import {
  Lato_400Regular,
  Lato_700Bold,
  Lato_900Black,
} from '@expo-google-fonts/lato';

// Import Data Lokal Format JSON (Local JSON Data Architecture)
import profileData from './data/profile.json';
import initialAcademicScoreData from './data/academicScore.json';

// Import Services & Persistence Layer (Production Architecture)
import StorageService from './services/storageService';
import AcademicService from './services/academicService';

// Import Theme System (Retro Olive & Beige)
import { getTheme, SPACING, FONTS } from './theme';

// Import Komponen UI Modular (.tsx)
import Header from './components/Header';
import ProfileHeader from './components/ProfileHeader';
import NavigationTabBar, { TabKey } from './components/NavigationTabBar';
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

// Import Komponen Ketahanan & Feedback (.tsx)
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSkeleton from './components/LoadingSkeleton';
import ErrorBanner from './components/ErrorBanner';
import EmptyState from './components/EmptyState';
import FeedbackToast from './components/FeedbackToast';

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
    Lato_400Regular,
    Lato_700Bold,
    Lato_900Black,
  });

  const scrollViewRef = useRef<any>(null);

  // 1. State Tab Navigasi Multi-Screen (Home, About, Skills, Portfolio, My Score, Contact)
  const [activeTab, setActiveTab] = useState<TabKey>('home');

  // 2. State Tema Gelap / Terang (Retro Olive & Beige)
  const [isDarkMode, setIsDarkMode] = useState(false);
  const theme = getTheme(isDarkMode);

  // 3. State Capaian Akademik & Simulasi API LMS
  const [academicData, setAcademicData] = useState(initialAcademicScoreData);
  const [currentState, setCurrentState] = useState<'normal' | 'error' | 'empty'>('normal');
  const [isLoadingAcademic, setIsLoadingAcademic] = useState(false);
  const [academicError, setAcademicError] = useState<any>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // 4. State Interaksi & Toast Notifikasi
  const [toast, setToast] = useState<{ message: string; type: string } | null>(null);
  const [messagesReceivedCount, setMessagesReceivedCount] = useState(0);

  // 5. Inisialisasi Preferensi Tersimpan (AsyncStorage)
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

  // 6. Handler Ganti Tema dengan Penyimpanan Otomatis
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

  // 7. Pengambilan Data Skor & Simulasi Kehandalan
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

  // Kontrol Simulasi Resiliensi State
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

  // Handler Navigasi Tab
  const handleTabChange = (tab: TabKey) => {
    setActiveTab(tab);
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
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

          {/* Header Institusi & Theme Switcher Button */}
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
                  colors={[theme.primary, theme.secondary]}
                  tintColor={theme.primary}
                />
              }
            >
              {/* Responsive Container Wrapper: Maksimal 1200px di Layar Lebar */}
              <View style={styles.responsiveContentWrapper}>
                {/* 6-MENU MULTI-SCREEN TAB NAVIGATION (Home, About, Skills, Portfolio, My Score, Contact) */}
                <NavigationTabBar
                  activeTab={activeTab}
                  onTabChange={handleTabChange}
                  theme={theme}
                />

                {/* ========================================================
                    SCREEN 1: HOME (Profil Lengkap, Foto, NIM, Role, Metrik)
                    ======================================================== */}
                {activeTab === 'home' && (
                  <View style={styles.tabContentBlock}>
                    {/* Header Profil Mahasiswa (Foto 1:1 Zoomable, Nama, NIM, Role, CTA) */}
                    <ProfileHeader
                      data={profileData}
                      theme={theme}
                      onExploreScore={() => handleTabChange('score')}
                      onContactClick={() => handleTabChange('contact')}
                    />

                    {/* Ringkasan Metrik Akademik */}
                    <MetricBar metrics={profileData.academicMetrics} theme={theme} />

                    {/* Rekomendasi Profil Interaktif */}
                    <InteractiveEndorseBar
                      studentName={profileData.namaPanggilan}
                      initialCount={profileData.initialEndorseCount}
                      theme={theme}
                    />

                    {/* Kartu Cuplikan Eksplorasi Menu Home */}
                    <View style={styles.homeCardsGrid}>
                      <TouchableOpacity
                        style={[
                          styles.homeFeatureCard,
                          { backgroundColor: theme.surface, borderColor: theme.border },
                        ]}
                        onPress={() => handleTabChange('about')}
                        activeOpacity={0.7}
                      >
                        <View style={[styles.homeFeatureIconBox, { backgroundColor: theme.surfaceMuted }]}>
                          <Ionicons name="person-outline" size={20} color={theme.primary} />
                        </View>
                        <View style={styles.homeFeatureContent}>
                          <Text style={[styles.homeFeatureTitle, { color: theme.textPrimary }]}>
                            Tentang Saya & Riwayat Pendidikan
                          </Text>
                          <Text style={[styles.homeFeatureDesc, { color: theme.textSecondary }]}>
                            Profil lengkap, visi karier, spesialisasi, dan riwayat jenjang pendidikan Masoem University.
                          </Text>
                        </View>
                        <Ionicons name="chevron-forward" size={18} color={theme.textMuted} />
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          styles.homeFeatureCard,
                          { backgroundColor: theme.surface, borderColor: theme.border },
                        ]}
                        onPress={() => handleTabChange('skills')}
                        activeOpacity={0.7}
                      >
                        <View style={[styles.homeFeatureIconBox, { backgroundColor: theme.surfaceMuted }]}>
                          <Ionicons name="code-slash-outline" size={20} color={theme.primary} />
                        </View>
                        <View style={styles.homeFeatureContent}>
                          <Text style={[styles.homeFeatureTitle, { color: theme.textPrimary }]}>
                            Keahlian Teknis & Hobi
                          </Text>
                          <Text style={[styles.homeFeatureDesc, { color: theme.textSecondary }]}>
                            Kompetensi React Native, UI/UX, arsitektur database, dan hobi bermusik (gitar, keyboard, drum).
                          </Text>
                        </View>
                        <Ionicons name="chevron-forward" size={18} color={theme.textMuted} />
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          styles.homeFeatureCard,
                          { backgroundColor: theme.surface, borderColor: theme.border },
                        ]}
                        onPress={() => handleTabChange('portfolio')}
                        activeOpacity={0.7}
                      >
                        <View style={[styles.homeFeatureIconBox, { backgroundColor: theme.surfaceMuted }]}>
                          <Ionicons name="briefcase-outline" size={20} color={theme.primary} />
                        </View>
                        <View style={styles.homeFeatureContent}>
                          <Text style={[styles.homeFeatureTitle, { color: theme.textPrimary }]}>
                            Galeri Portofolio Proyek
                          </Text>
                          <Text style={[styles.homeFeatureDesc, { color: theme.textSecondary }]}>
                            Eksplorasi karya rekayasa sistem informasi: SIMAK Mobile, inventaris lab, dan UI/UX modern.
                          </Text>
                        </View>
                        <Ionicons name="chevron-forward" size={18} color={theme.textMuted} />
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          styles.homeFeatureCard,
                          { backgroundColor: theme.surface, borderColor: theme.border },
                        ]}
                        onPress={() => handleTabChange('score')}
                        activeOpacity={0.7}
                      >
                        <View style={[styles.homeFeatureIconBox, { backgroundColor: theme.surfaceMuted }]}>
                          <Ionicons name="school-outline" size={20} color={theme.primary} />
                        </View>
                        <View style={styles.homeFeatureContent}>
                          <Text style={[styles.homeFeatureTitle, { color: theme.textPrimary }]}>
                            Dashboard Evaluasi My Score (90 / Grade A)
                          </Text>
                          <Text style={[styles.homeFeatureDesc, { color: theme.textSecondary }]}>
                            Evaluasi capaian akademik UTS Pemrograman Mobile 2, 19.000 LP, dan progress belajar.
                          </Text>
                        </View>
                        <Ionicons name="chevron-forward" size={18} color={theme.textMuted} />
                      </TouchableOpacity>
                    </View>
                  </View>
                )}

                {/* ========================================================
                    SCREEN 2: ABOUT (Riwayat Pendidikan, Visi, & Minat)
                    ======================================================== */}
                {activeTab === 'about' && (
                  <View style={styles.tabContentBlock}>
                    {isDesktop ? (
                      <View style={styles.desktopGrid2Col}>
                        <View style={styles.desktopColHalf}>
                          <IdentityDetailCard data={profileData} theme={theme} />
                        </View>
                        <View style={styles.desktopColHalf}>
                          <AboutSection data={profileData} theme={theme} />
                        </View>
                      </View>
                    ) : (
                      <View style={styles.mobileColumn}>
                        <IdentityDetailCard data={profileData} theme={theme} />
                        <AboutSection data={profileData} theme={theme} />
                      </View>
                    )}
                  </View>
                )}

                {/* ========================================================
                    SCREEN 3: SKILLS (Keahlian Teknis, Minat & Hobi Musik)
                    ======================================================== */}
                {activeTab === 'skills' && (
                  <View style={styles.tabContentBlock}>
                    {isDesktop ? (
                      <View style={styles.desktopGrid2Col}>
                        <View style={styles.desktopColHalf}>
                          <SkillMatrixCard skills={profileData.technicalSkills} theme={theme} />
                        </View>
                        <View style={styles.desktopColHalf}>
                          <HobbySection hobbies={profileData.hobbies} theme={theme} />
                          <ExperienceTimeline experiences={profileData.experience} theme={theme} />
                        </View>
                      </View>
                    ) : (
                      <View style={styles.mobileColumn}>
                        <SkillMatrixCard skills={profileData.technicalSkills} theme={theme} />
                        <HobbySection hobbies={profileData.hobbies} theme={theme} />
                        <ExperienceTimeline experiences={profileData.experience} theme={theme} />
                      </View>
                    )}
                  </View>
                )}

                {/* ========================================================
                    SCREEN 4: PORTFOLIO (Galeri Karya Proyek & Live Filter)
                    ======================================================== */}
                {activeTab === 'portfolio' && (
                  <View style={styles.tabContentBlock}>
                    <PortfolioGallery portfolios={profileData.portfolios} theme={theme} />
                  </View>
                )}

                {/* ========================================================
                    SCREEN 5: MY SCORE (Dashboard Akademik + Mini State Bar)
                    ======================================================== */}
                {activeTab === 'score' && (
                  <View style={styles.tabContentBlock}>
                    {/* Toolbar Simulasi Resiliensi State Data */}
                    <View
                      style={[
                        styles.simulatorBar,
                        {
                          backgroundColor: theme.surface,
                          borderColor: theme.border,
                        },
                      ]}
                    >
                      <View style={styles.simulatorLeft}>
                        <Ionicons name="pulse-outline" size={16} color={theme.primary} />
                        <Text style={[styles.simulatorTitle, { color: theme.textPrimary }]}>
                          Simulasi Resiliensi Data:
                        </Text>
                      </View>
                      <View style={styles.simulatorActions}>
                        <TouchableOpacity
                          style={[
                            styles.miniSimBtn,
                            currentState === 'normal' && !isLoadingAcademic && {
                              backgroundColor: theme.primary,
                              borderColor: theme.primary,
                            },
                            (currentState !== 'normal' || isLoadingAcademic) && {
                              backgroundColor: theme.surfaceMuted,
                              borderColor: theme.borderLight,
                            },
                          ]}
                          onPress={handleTriggerNormal}
                          activeOpacity={0.7}
                          accessibilityRole="button"
                          accessibilityLabel="Simulasi Data Normal"
                        >
                          <Text
                            style={[
                              styles.miniSimBtnText,
                              {
                                color:
                                  currentState === 'normal' && !isLoadingAcademic
                                    ? theme.textInverted
                                    : theme.textPrimary,
                              },
                            ]}
                          >
                            Normal
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={[
                            styles.miniSimBtn,
                            isLoadingAcademic && {
                              backgroundColor: theme.primary,
                              borderColor: theme.primary,
                            },
                            !isLoadingAcademic && {
                              backgroundColor: theme.surfaceMuted,
                              borderColor: theme.borderLight,
                            },
                          ]}
                          onPress={() => fetchScores({ isPullRefresh: false })}
                          activeOpacity={0.7}
                          accessibilityRole="button"
                          accessibilityLabel="Simulasi Loading State"
                        >
                          <Text
                            style={[
                              styles.miniSimBtnText,
                              {
                                color: isLoadingAcademic ? theme.textInverted : theme.textPrimary,
                              },
                            ]}
                          >
                            Loading
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={[
                            styles.miniSimBtn,
                            currentState === 'empty' && {
                              backgroundColor: '#9C6F32',
                              borderColor: '#9C6F32',
                            },
                            currentState !== 'empty' && {
                              backgroundColor: theme.surfaceMuted,
                              borderColor: theme.borderLight,
                            },
                          ]}
                          onPress={handleTriggerEmpty}
                          activeOpacity={0.7}
                          accessibilityRole="button"
                          accessibilityLabel="Simulasi Empty State"
                        >
                          <Text
                            style={[
                              styles.miniSimBtnText,
                              {
                                color: currentState === 'empty' ? '#FFFFFF' : theme.textPrimary,
                              },
                            ]}
                          >
                            Empty
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={[
                            styles.miniSimBtn,
                            currentState === 'error' && {
                              backgroundColor: '#A83B3B',
                              borderColor: '#A83B3B',
                            },
                            currentState !== 'error' && {
                              backgroundColor: theme.surfaceMuted,
                              borderColor: theme.borderLight,
                            },
                          ]}
                          onPress={handleTriggerError}
                          activeOpacity={0.7}
                          accessibilityRole="button"
                          accessibilityLabel="Simulasi Error 503"
                        >
                          <Text
                            style={[
                              styles.miniSimBtnText,
                              {
                                color: currentState === 'error' ? '#FFFFFF' : theme.textPrimary,
                              },
                            ]}
                          >
                            Error (503)
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>

                    {/* Konten Capaian Akademik My Score */}
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
                )}

                {/* ========================================================
                    SCREEN 6: CONTACT (Kanal Komunikasi & Form Pesan)
                    ======================================================== */}
                {activeTab === 'contact' && (
                  <View style={styles.tabContentBlock}>
                    {isDesktop ? (
                      <View style={styles.desktopGrid2Col}>
                        <View style={styles.desktopColHalf}>
                          <ContactGridCard contactItems={profileData.contactItems} theme={theme} />
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
                        <ContactGridCard contactItems={profileData.contactItems} theme={theme} />
                        <ContactForm
                          data={profileData}
                          onMessageSent={handleMessageSent}
                          theme={theme}
                        />
                      </View>
                    )}
                  </View>
                )}

                {/* Footer Institusi & Navigasi Cepat */}
                <View
                  style={[
                    styles.footer,
                    {
                      borderTopColor: theme.borderLight,
                    },
                  ]}
                >
                  <Text style={[styles.mottoText, { color: theme.textPrimary }]}>
                    TEKUN • DISIPLIN • BERKELAS
                  </Text>
                  <Text style={[styles.mottoSubtext, { color: theme.textMuted }]}>
                    Fakultas Ilmu Komputer • Masoem University
                  </Text>

                  {/* Navigasi Footer Cepat */}
                  <View style={styles.footerNavRow}>
                    <TouchableOpacity onPress={() => handleTabChange('home')} style={styles.footerNavBtn}>
                      <Text style={[styles.footerNavText, { color: activeTab === 'home' ? theme.primary : theme.textMuted }]}>Home</Text>
                    </TouchableOpacity>
                    <Text style={{ color: theme.textMuted }}>•</Text>
                    <TouchableOpacity onPress={() => handleTabChange('about')} style={styles.footerNavBtn}>
                      <Text style={[styles.footerNavText, { color: activeTab === 'about' ? theme.primary : theme.textMuted }]}>About</Text>
                    </TouchableOpacity>
                    <Text style={{ color: theme.textMuted }}>•</Text>
                    <TouchableOpacity onPress={() => handleTabChange('skills')} style={styles.footerNavBtn}>
                      <Text style={[styles.footerNavText, { color: activeTab === 'skills' ? theme.primary : theme.textMuted }]}>Skills</Text>
                    </TouchableOpacity>
                    <Text style={{ color: theme.textMuted }}>•</Text>
                    <TouchableOpacity onPress={() => handleTabChange('portfolio')} style={styles.footerNavBtn}>
                      <Text style={[styles.footerNavText, { color: activeTab === 'portfolio' ? theme.primary : theme.textMuted }]}>Portfolio</Text>
                    </TouchableOpacity>
                    <Text style={{ color: theme.textMuted }}>•</Text>
                    <TouchableOpacity onPress={() => handleTabChange('score')} style={styles.footerNavBtn}>
                      <Text style={[styles.footerNavText, { color: activeTab === 'score' ? theme.primary : theme.textMuted }]}>My Score</Text>
                    </TouchableOpacity>
                    <Text style={{ color: theme.textMuted }}>•</Text>
                    <TouchableOpacity onPress={() => handleTabChange('contact')} style={styles.footerNavBtn}>
                      <Text style={[styles.footerNavText, { color: activeTab === 'contact' ? theme.primary : theme.textMuted }]}>Contact</Text>
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
    paddingVertical: SPACING.xl,    // 32px
    paddingBottom: SPACING.huge,    // 72px
  },
  responsiveContentWrapper: {
    width: '100%',
    maxWidth: 1100,                 // Tighter max-width for better readability
    marginHorizontal: 'auto',
    alignSelf: 'center',
    gap: SPACING.gap,               // 24px standard gap
  },
  tabContentBlock: {
    width: '100%',
    gap: SPACING.gap,
  },
  // Desktop Widescreen 2-Column Grid
  desktopGrid2Col: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: SPACING.gap,
    width: '100%',
  },
  desktopColHalf: {
    flex: 1,
    gap: SPACING.gap,
    display: 'flex',
  },
  // Mobile / Tablet Single-Column
  mobileColumn: {
    width: '100%',
    maxWidth: 720,
    alignSelf: 'center',
    gap: SPACING.gap,
  },
  // Home Cards Grid — 2-col on desktop, 1-col on mobile
  homeCardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.gap,
    marginTop: 8,
  },
  homeFeatureCard: {
    flex: 1,
    minWidth: 280,
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.cardPadding,   // 28px generous padding
    borderRadius: SPACING.cardRadius,
    borderWidth: 1,
    gap: 16,
    ...Platform.select({
      web: {
        cursor: 'pointer' as any,
        transition: 'all 0.2s ease' as any,
      },
    }),
  },
  homeFeatureIconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeFeatureContent: {
    flex: 1,
    gap: 5,
  },
  homeFeatureTitle: {
    fontFamily: FONTS.bold,
    fontSize: 14.5,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  homeFeatureDesc: {
    fontFamily: FONTS.body,
    fontSize: 12.5,
    lineHeight: 19,
  },
  // Mini Simulator Bar in My Score
  simulatorBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 14,
    borderWidth: 1,
    flexWrap: 'wrap',
    gap: 12,
  },
  simulatorLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  simulatorTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 12.5,
    fontWeight: '600',
    letterSpacing: -0.1,
  },
  simulatorActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  miniSimBtn: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1,
  },
  miniSimBtnText: {
    fontFamily: 'Lato_700Bold',
    fontSize: 12,
    fontWeight: '700',
  },
  footer: {
    marginTop: SPACING.xl,
    alignItems: 'center',
    paddingVertical: SPACING.xl,
    borderTopWidth: 1,
    gap: 10,
    width: '100%',
  },
  mottoText: {
    fontFamily: 'Inter_700Bold',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 2.5,
    textTransform: 'uppercase',
  },
  mottoSubtext: {
    fontFamily: FONTS.body,
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 4,
  },
  footerNavRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    marginVertical: 6,
  },
  footerNavBtn: {
    paddingVertical: 5,
    paddingHorizontal: 8,
  },
  footerNavText: {
    fontFamily: FONTS.semiBold,
    fontSize: 12.5,
    fontWeight: '600',
  },
  footerText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 12,
    fontWeight: '600',
  },
  footerSubtext: {
    fontFamily: FONTS.body,
    fontSize: 11,
  },
  copyrightText: {
    fontFamily: FONTS.body,
    fontSize: 10,
  },
});
