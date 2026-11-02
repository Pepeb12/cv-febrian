import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Platform,
  RefreshControl,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from '@expo-google-fonts/inter';

// Import Data Lokal Format JSON (Local JSON Data Architecture)
import profileData from './data/profile.json';
import initialAcademicScoreData from './data/academicScore.json';

// Import Services & Persistence Layer (Production Architecture)
import StorageService from './services/storageService';
import AcademicService from './services/academicService';

// Import Theme System (Retro Mustard & Brown)
import { getTheme, SPACING, FONTS } from './theme';

// Import Komponen UI Modular (.tsx)
import ProfileHeader from './components/ProfileHeader';
import NavigationTabBar, { TabKey } from './components/NavigationTabBar';
import MetricBar from './components/MetricBar';
import MyScoreSection from './components/MyScoreSection';
import InteractiveEndorseBar from './components/InteractiveEndorseBar';
import PortfolioGallery from './components/PortfolioGallery';
import ExperienceTimeline from './components/ExperienceTimeline';
import HobbySection from './components/HobbySection';
import { AboutIntroCard, SpecializationCard } from './components/AboutSection';
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
  const isDesktop = width >= 1024;
  const isTablet = width >= 768 && width < 1024;
  const isMobile = width < 768;

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

  // 1. State Tab Navigasi Multi-Screen (Home, About, Skills, Portfolio, My Score, Contact)
  const [activeTab, setActiveTab] = useState<TabKey>('home');

  // 2. State Tema Gelap / Terang (Retro Mustard & Brown)
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
  const [, setMessagesReceivedCount] = useState(0);

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
          ? 'Mode Malam (Retro Mustard & Brown) diaktifkan'
          : 'Mode Terang (Retro Mustard & Warm Cream) diaktifkan',
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

          {/* NAVBAR UTAMA (SATU BARIS PENUH SEBAGAI SATU-SATUNYA HEADER TOP BAR) */}
          <NavigationTabBar
            activeTab={activeTab}
            onTabChange={handleTabChange}
            theme={theme}
            isDarkMode={isDarkMode}
            onToggleTheme={handleToggleTheme}
          />

          {/* Error Boundary: Melindungi Seluruh Konten Aplikasi dari Crash */}
          <ErrorBoundary theme={theme} onReset={handleTriggerNormal}>
            <ScrollView
              ref={scrollViewRef}
              style={styles.scrollView}
              contentContainerStyle={styles.scrollContent}
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
              {/* Responsive Container Wrapper: Maksimal 1360px di Layar Lebar */}
              <View
                style={[
                  styles.responsiveContentWrapper,
                  { paddingHorizontal: isDesktop ? 24 : 16 },
                ]}
              >
                {/* ========================================================
                    SCREEN 1: HOME (Bento: Hero 65% + KPI Grid 2x2 & Dukung 35%)
                    ======================================================== */}
                {activeTab === 'home' && (
                  <View style={styles.tabContentBlock}>
                    {/* BARIS 1: HERO PROFILE (65% KIRI) + GRID 2x2 KPI & DUKUNGAN (35% KANAN) */}
                    <View style={[styles.bentoRow, isDesktop ? styles.bentoRowDesktop : styles.bentoRowMobile]}>
                      {/* Kolom Kiri 65%: Hero Profile */}
                      <View style={[styles.bentoLeft, isDesktop && styles.bentoLeftDesktop]}>
                        <ProfileHeader
                          data={profileData}
                          theme={theme}
                          onExploreScore={() => handleTabChange('score')}
                          onContactClick={() => handleTabChange('contact')}
                        />
                      </View>

                      {/* Kolom Kanan 35%: Grid 2x2 KPI & Dukungan (Tinggi Sejajar) */}
                      <View style={[styles.bentoRight, isDesktop && styles.bentoRightDesktop]}>
                        {/* KPI Grid 2x2 Berborder */}
                        <View style={styles.kpiGrid}>
                          {(profileData.academicMetrics || []).map((item: any, index: number) => (
                            <View
                              key={index}
                              style={[
                                styles.kpiCard,
                                {
                                  backgroundColor: theme.surface,
                                  borderColor: theme.border,
                                },
                              ]}
                            >
                              <View
                                style={[
                                  styles.kpiIconBox,
                                  {
                                    backgroundColor: theme.surfaceMuted,
                                    borderColor: theme.borderLight,
                                  },
                                ]}
                              >
                                <Ionicons name={item.icon as any} size={16} color={theme.primary} />
                              </View>
                              <Text style={[styles.kpiValue, { color: theme.textPrimary }]}>
                                {item.value}
                              </Text>
                              <Text style={[styles.kpiLabel, { color: theme.textSecondary }]}>
                                {item.label}
                              </Text>
                              {item.unit ? (
                                <Text style={[styles.kpiUnit, { color: theme.textMuted }]}>
                                  {item.unit}
                                </Text>
                              ) : null}
                            </View>
                          ))}
                        </View>

                        {/* Card Rekomendasi Profil Mahasiswa (Dukung) tepat di bawah Grid 2x2 */}
                        <InteractiveEndorseBar
                          studentName={profileData.namaPanggilan}
                          initialCount={profileData.initialEndorseCount}
                          theme={theme}
                        />
                      </View>
                    </View>

                    {/* BARIS 2: 4 CARD NAVIGASI CEPAT (GRID 4 KOLOM - FIX TEXT OVERFLOW) */}
                    <View style={styles.homeCardsGrid}>
                      {[
                        {
                          tab: 'about' as TabKey,
                          icon: 'person-outline',
                          title: 'Tentang Saya & Riwayat Pendidikan',
                          desc: 'Profil lengkap, visi karier, spesialisasi, dan riwayat jenjang pendidikan Masoem University.',
                        },
                        {
                          tab: 'skills' as TabKey,
                          icon: 'code-slash-outline',
                          title: 'Keahlian Teknis & Hobi',
                          desc: 'Kompetensi React Native, UI/UX, arsitektur database, dan hobi bermusik (gitar, keyboard, drum).',
                        },
                        {
                          tab: 'portfolio' as TabKey,
                          icon: 'briefcase-outline',
                          title: 'Galeri Portofolio Proyek',
                          desc: 'Eksplorasi karya rekayasa sistem informasi: SIMAK Mobile, inventaris lab, dan UI/UX modern.',
                        },
                        {
                          tab: 'score' as TabKey,
                          icon: 'school-outline',
                          title: 'Dashboard Evaluasi My Score (90/A)',
                          desc: 'Evaluasi capaian akademik UTS Pemrograman Mobile 2, 19.000 LP, dan progress belajar.',
                        },
                      ].map((card) => (
                        <TouchableOpacity
                          key={card.tab}
                          style={[
                            styles.homeFeatureCard,
                            {
                              backgroundColor: theme.surface,
                              borderColor: theme.border,
                              width: isDesktop ? '23.8%' : isTablet ? '48.5%' : '100%',
                            },
                          ]}
                          onPress={() => handleTabChange(card.tab)}
                          activeOpacity={0.7}
                          accessibilityRole="button"
                          accessibilityLabel={`Buka menu ${card.title}`}
                        >
                          {/* Baris Atas: Ikon kiri atas & Panah kanan atas */}
                          <View style={styles.homeFeatureTop}>
                            <View
                              style={[
                                styles.homeFeatureIconBox,
                                {
                                  backgroundColor: theme.surfaceMuted,
                                  borderColor: theme.borderLight,
                                },
                              ]}
                            >
                              <Ionicons name={card.icon as any} size={18} color={theme.primary} />
                            </View>
                            <Ionicons name="chevron-forward" size={16} color={theme.textMuted} />
                          </View>
                          {/* Baris Bawah: Judul & Deskripsi 100% width tanpa overflow */}
                          <View style={styles.homeFeatureBottom}>
                            <Text
                              style={[styles.homeFeatureTitle, { color: theme.textPrimary }]}
                              numberOfLines={2}
                            >
                              {card.title}
                            </Text>
                            <Text
                              style={[styles.homeFeatureDesc, { color: theme.textSecondary }]}
                            >
                              {card.desc}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                )}

                {/* ========================================================
                    SCREEN 2: ABOUT (Tentang Saya & Riwayat Pendidikan Sejajar)
                    ======================================================== */}
                {activeTab === 'about' && (
                  <View style={styles.tabContentBlock}>
                    {/* Baris 1: Tentang Saya (50% Kiri) & Riwayat Pendidikan (50% Kanan) - Tinggi Sama Rata */}
                    <View style={isDesktop ? styles.desktopGrid2Col : styles.mobileColumn}>
                      <View style={isDesktop ? styles.desktopColHalf : styles.mobileFullWidth}>
                        <AboutIntroCard data={profileData} theme={theme} />
                      </View>
                      <View style={isDesktop ? styles.desktopColHalf : styles.mobileFullWidth}>
                        <IdentityDetailCard data={profileData} theme={theme} />
                      </View>
                    </View>

                    {/* Baris 2: Bidang Minat & Spesialisasi (100% Lebar Penuh - Grid 2x2 di dalam) */}
                    <SpecializationCard data={profileData} theme={theme} />
                  </View>
                )}

                {/* ========================================================
                    SCREEN 3: SKILLS (Keahlian & Pengalaman Sejajar, Hobi Penuh)
                    ======================================================== */}
                {activeTab === 'skills' && (
                  <View style={styles.tabContentBlock}>
                    {/* Baris 1: Keahlian Teknis (50% Kiri) & Pengalaman Organisasi (50% Kanan) */}
                    <View style={isDesktop ? styles.desktopGrid2Col : styles.mobileColumn}>
                      <View style={isDesktop ? styles.desktopColHalf : styles.mobileFullWidth}>
                        <SkillMatrixCard skills={profileData.technicalSkills} theme={theme} />
                      </View>
                      <View style={isDesktop ? styles.desktopColHalf : styles.mobileFullWidth}>
                        <ExperienceTimeline experiences={profileData.experience} theme={theme} />
                      </View>
                    </View>

                    {/* Baris 2: Minat & Hobi (100% Lebar Penuh - Grid 4 Kolom di Desktop / 2x2 di Tablet) */}
                    <HobbySection hobbies={profileData.hobbies} theme={theme} />
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
                              backgroundColor: theme.primary,
                              borderColor: theme.primary,
                            },
                            currentState !== 'empty' && {
                              backgroundColor: theme.surfaceMuted,
                              borderColor: theme.borderLight,
                            },
                          ]}
                          onPress={handleTriggerEmpty}
                          activeOpacity={0.7}
                          accessibilityRole="button"
                          accessibilityLabel="Simulasi Data Kosong (Empty State)"
                        >
                          <Text
                            style={[
                              styles.miniSimBtnText,
                              {
                                color: currentState === 'empty' ? theme.textInverted : theme.textPrimary,
                              },
                            ]}
                          >
                            Empty State
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={[
                            styles.miniSimBtn,
                            currentState === 'error' && {
                              backgroundColor: theme.error,
                              borderColor: theme.error,
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
                    <View style={isDesktop ? styles.desktopGrid2Col : styles.mobileColumn}>
                      <View style={isDesktop ? styles.desktopColHalf : styles.mobileFullWidth}>
                        <ContactGridCard contactItems={profileData.contactItems} theme={theme} />
                      </View>
                      <View style={isDesktop ? styles.desktopColHalf : styles.mobileFullWidth}>
                        <ContactForm
                          data={profileData}
                          onMessageSent={handleMessageSent}
                          theme={theme}
                        />
                      </View>
                    </View>
                  </View>
                )}

                {/* FOOTER INSTITUSI (RINGKAS & RAPI TANPA DUPLIKASI MENU) */}
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
                  <Text style={[styles.footerText, { color: theme.textSecondary }]}>
                    UTS Pemrograman Mobile 2 • Dosen Pengampu: Iin, M.Kom • © 2026 {profileData.nama} ({profileData.nim})
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
    paddingVertical: SPACING.md,
    paddingBottom: SPACING.huge,
  },
  responsiveContentWrapper: {
    width: '100%',
    maxWidth: 1360,
    marginHorizontal: 'auto',
    alignSelf: 'center',
    gap: 20,
  },
  tabContentBlock: {
    width: '100%',
    gap: 20,
  },
  // BENTO ROW (HOME SCREEN BARIS 1)
  bentoRow: {
    width: '100%',
    gap: 20,
  },
  bentoRowDesktop: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  bentoRowMobile: {
    flexDirection: 'column',
  },
  bentoLeft: {
    width: '100%',
    display: 'flex',
  },
  bentoLeftDesktop: {
    flex: 6.5,
  },
  bentoRight: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    gap: 12,
  },
  bentoRightDesktop: {
    flex: 3.5,
  },
  // KPI GRID 2x2 BERBORDER
  kpiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
    width: '100%',
  },
  kpiCard: {
    width: '48%',
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    justifyContent: 'space-between',
    minHeight: 110,
    gap: 4,
  },
  kpiIconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  kpiValue: {
    fontFamily: FONTS.bold,
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  kpiLabel: {
    fontFamily: FONTS.semiBold,
    fontSize: 11,
    fontWeight: '600',
  },
  kpiUnit: {
    fontFamily: FONTS.regular,
    fontSize: 10,
  },
  // BARIS 2: 4 CARD NAVIGASI CEPAT HOME
  homeCardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    width: '100%',
    justifyContent: 'space-between',
  },
  homeFeatureCard: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 16,
    gap: 12,
    justifyContent: 'space-between',
    minHeight: 130,
    ...Platform.select({
      web: {
        cursor: 'pointer' as any,
        transition: 'transform 0.15s ease' as any,
      },
    }),
  },
  homeFeatureTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  homeFeatureIconBox: {
    width: 36,
    height: 36,
    borderRadius: 9,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeFeatureBottom: {
    width: '100%',
    flexShrink: 1,
    gap: 4,
  },
  homeFeatureTitle: {
    fontFamily: FONTS.bold,
    fontSize: 13.5,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  homeFeatureDesc: {
    fontFamily: FONTS.regular,
    fontSize: 11.5,
    lineHeight: 16,
    flexShrink: 1,
  },
  // DESKTOP & MOBILE MULTI-COLUMN GRIDS
  desktopGrid2Col: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: 20,
    width: '100%',
  },
  desktopColHalf: {
    flex: 1,
    display: 'flex',
  },
  mobileColumn: {
    width: '100%',
    gap: 20,
  },
  mobileFullWidth: {
    width: '100%',
  },
  // SIMULATOR BAR (MY SCORE)
  simulatorBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: SPACING.cardRadius,
    borderWidth: 1,
    flexWrap: 'wrap',
    gap: 10,
  },
  simulatorLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  simulatorTitle: {
    fontFamily: FONTS.bold,
    fontSize: 12.5,
    fontWeight: '700',
  },
  simulatorActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  miniSimBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  miniSimBtnText: {
    fontFamily: FONTS.semiBold,
    fontSize: 11.5,
    fontWeight: '600',
  },
  // FOOTER
  footer: {
    marginTop: 10,
    alignItems: 'center',
    paddingVertical: 16,
    borderTopWidth: 1,
    gap: 6,
    width: '100%',
  },
  mottoText: {
    fontFamily: FONTS.heading,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  mottoSubtext: {
    fontFamily: FONTS.body,
    fontSize: 11,
    textAlign: 'center',
  },
  footerText: {
    fontFamily: FONTS.body,
    fontSize: 11,
    textAlign: 'center',
  },
});
