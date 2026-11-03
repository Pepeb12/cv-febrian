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

// Import Data Lokal Format JSON (100% Data Asli Terjaga)
import profileData from './data/profile.json';
import initialAcademicScoreData from './data/academicScore.json';

// Import Services & Persistence Layer
import StorageService from './services/storageService';
import AcademicService from './services/academicService';

// Import Theme System (Cosmic Indigo & Golden Amber Glassmorphism)
import { getTheme, SPACING, FONTS } from './theme';

// Import Komponen UI Modular
import CosmicCanvasBackground from './components/CosmicCanvasBackground';
import NavigationTabBar, { TabKey } from './components/NavigationTabBar';
import KineticScriptBanner from './components/KineticScriptBanner';
import ProfileHeader from './components/ProfileHeader';
import InfiniteMarqueeRibbon from './components/InfiniteMarqueeRibbon';
import InteractiveEndorseBar from './components/InteractiveEndorseBar';
import { AboutIntroCard, SpecializationCard } from './components/AboutSection';
import SkillMatrixCard from './components/SkillMatrixCard';
import IdentityDetailCard from './components/IdentityDetailCard';
import ExperienceTimeline from './components/ExperienceTimeline';
import HobbySection from './components/HobbySection';
import PortfolioGallery from './components/PortfolioGallery';
import ScoreAchievementImageCard from './components/ScoreAchievementImageCard';
import MyScoreSection from './components/MyScoreSection';
import ContactGridCard from './components/ContactGridCard';
import ContactForm from './components/ContactForm';
import CosmicFooter from './components/CosmicFooter';

// Import Komponen Ketahanan & Feedback
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSkeleton from './components/LoadingSkeleton';
import ErrorBanner from './components/ErrorBanner';
import EmptyState from './components/EmptyState';
import FeedbackToast from './components/FeedbackToast';

export default function App() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1024;
  const isTablet = width >= 768 && width < 1024;

  // Load Google Font: Inter
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  });

  const scrollViewRef = useRef<any>(null);

  // 1. State Single-Page Scroll, Section Positions & ScrollSpy
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState<TabKey>('home');
  const sectionPositions = useRef<Record<string, number>>({});

  // 2. State Tema Gelap (Cosmic Navy) / Terang (Soft Lavender White)
  const [isDarkMode, setIsDarkMode] = useState(true);
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

  // Inisialisasi Preferensi Tersimpan (AsyncStorage)
  useEffect(() => {
    async function loadSavedPreferences() {
      try {
        const savedTheme = await StorageService.getThemeMode();
        if (savedTheme === 'light') {
          setIsDarkMode(false);
        } else if (savedTheme === 'dark') {
          setIsDarkMode(true);
        }
      } catch (err) {
        console.warn('Gagal memuat preferensi tema:', err);
      }
    }
    loadSavedPreferences();
  }, []);

  // Handler Ganti Tema dengan Penyimpanan Otomatis
  const handleToggleTheme = async () => {
    const nextMode = !isDarkMode;
    setIsDarkMode(nextMode);
    try {
      await StorageService.setThemeMode(nextMode ? 'dark' : 'light');
      setToast({
        message: nextMode
          ? 'Mode Gelap (Cosmic Navy & Indigo Glass) diaktifkan'
          : 'Mode Terang (Soft Lavender White & Royal Indigo) diaktifkan',
        type: 'info',
      });
    } catch (err) {
      console.warn('Gagal menyimpan tema:', err);
    }
  };

  // Pengambilan Data Skor & Simulasi Kehandalan
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
              message: 'Data akademik berhasil diperbarui dari LMS',
              type: 'success',
            });
          }
        }
      } catch (err: any) {
        setCurrentState('error');
        setAcademicError(err);
        setToast({
          message: 'Simulasi: Gagal memuat data LMS (Error 503)',
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

  // Handler Navigasi Smooth Scroll ke Section
  const handleNavigateToSection = (tabKey: TabKey) => {
    setActiveSection(tabKey);
    const targetY = sectionPositions.current[tabKey] ?? 0;
    scrollViewRef.current?.scrollTo({
      y: Math.max(0, targetY - 70),
      animated: true,
    });
  };

  const handleScrollToTop = () => {
    scrollViewRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };

  // Handler ScrollSpy & Tracking scrollY
  const handleScroll = (event: any) => {
    const y = event.nativeEvent.contentOffset.y;
    setScrollY(y);

    const keys: TabKey[] = ['home', 'about', 'skills', 'portfolio', 'score', 'contact'];
    let currentKey: TabKey = 'home';

    for (let i = keys.length - 1; i >= 0; i--) {
      const key = keys[i];
      const pos = sectionPositions.current[key];
      if (pos !== undefined && y >= pos - 200) {
        currentKey = key;
        break;
      }
    }

    if (currentKey !== activeSection) {
      setActiveSection(currentKey);
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

        {/* Outer Container */}
        <View
          style={[
            styles.appContainer,
            {
              backgroundColor: theme.background,
            },
          ]}
        >
          {/* 0. COSMIC CANVAS BACKGROUND (Stars, Wireframe Torus & Radial Halo Layer) */}
          <CosmicCanvasBackground theme={theme} />

          {/* Feedback Toast */}
          {toast ? (
            <FeedbackToast
              message={toast.message}
              type={toast.type}
              onDismiss={() => setToast(null)}
            />
          ) : null}

          {/* 1. FLOATING PILL NAVBAR (FIXED CENTER TOP, BORDER-RADIUS: 999px, GLASSMORPHISM) */}
          <View style={styles.floatingTopNavFixed} pointerEvents="box-none">
            <NavigationTabBar
              activeTab={activeSection}
              onTabChange={handleNavigateToSection}
              theme={theme}
              isDarkMode={isDarkMode}
              onToggleTheme={handleToggleTheme}
            />
          </View>

          {/* Error Boundary: Melindungi Seluruh Konten Aplikasi */}
          <ErrorBoundary theme={theme} onReset={handleTriggerNormal}>
            <ScrollView
              ref={scrollViewRef}
              style={styles.scrollView}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
              scrollEventThrottle={16}
              onScroll={handleScroll}
              refreshControl={
                <RefreshControl
                  refreshing={isRefreshing}
                  onRefresh={handlePullToRefresh}
                  colors={[theme.primary, theme.secondary]}
                  tintColor={theme.primary}
                />
              }
            >
              {/* Responsive Container Wrapper: Maksimal 1240px di Layar Lebar */}
              <View
                style={[
                  styles.responsiveContentWrapper,
                  { paddingHorizontal: isDesktop ? 24 : 16 },
                ]}
              >
                {/* ========================================================
                    SECTION 1: HERO SECTION (55% Teks Kiri : 45% Visual Orbit Kanan)
                    ======================================================== */}
                <View
                  onLayout={(e) => {
                    sectionPositions.current['home'] = e.nativeEvent.layout.y;
                  }}
                  style={styles.sectionContainer}
                >
                  <KineticScriptBanner
                    scriptText="Crafting Digital Solutions — Systems Analysis & Mobile Engineering"
                    sectionTag="01 • HERO PROFILE"
                    scrollY={scrollY}
                    sectionTop={sectionPositions.current['home'] || 0}
                    direction="left"
                    theme={theme}
                  />

                  {/* Hero Profile Card (Asymmetric 55% : 45% Orbit) */}
                  <ProfileHeader
                    data={profileData}
                    theme={theme}
                    onExploreScore={() => handleNavigateToSection('score')}
                    onContactClick={() => handleNavigateToSection('contact')}
                  />

                  {/* INFINITE MARQUEE RIBBON — BERJALAN OTOMATIS HORIZONTAL */}
                  <InfiniteMarqueeRibbon
                    items={[
                      'React Native & Expo',
                      'Systems Analysis (UML/DFD)',
                      'TypeScript & ES6+',
                      'UI/UX Design Systems (Figma)',
                      'Database Architecture (MySQL)',
                      'Masoem University',
                      'Mobile App Engineering',
                      'IPK 3.84 • SKS 92',
                    ]}
                    theme={theme}
                  />

                  {/* Row Tambahan: KPI Grid 2x2 & Dukungan Mahasiswa */}
                  <View style={[styles.bentoRow, isDesktop ? styles.bentoRowDesktop : styles.bentoRowMobile]}>
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

                    <InteractiveEndorseBar
                      studentName={profileData.namaPanggilan}
                      initialCount={profileData.initialEndorseCount}
                      theme={theme}
                    />
                  </View>

                  {/* 4 Card Navigasi Pintas */}
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
                        desc: 'Kompetensi 3D Flip Card React Native, UI/UX, arsitektur database, dan hobi bermusik.',
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
                        onPress={() => handleNavigateToSection(card.tab)}
                        activeOpacity={0.7}
                        accessibilityRole="button"
                        accessibilityLabel={`Buka menu ${card.title}`}
                      >
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

                {/* ========================================================
                    SECTION 2: ABOUT & BIDANG MINAT (Foto Ber-Badge & Grid 4 Kolom)
                    ======================================================== */}
                <View
                  onLayout={(e) => {
                    sectionPositions.current['about'] = e.nativeEvent.layout.y;
                  }}
                  style={styles.sectionContainer}
                >
                  <KineticScriptBanner
                    scriptText="Tentang Saya — Mengubah Tantangan Proses Bisnis Menjadi Aplikasi Nyata"
                    sectionTag="02 • ABOUT & VISION"
                    scrollY={scrollY}
                    sectionTop={sectionPositions.current['about'] || 0}
                    direction="right"
                    theme={theme}
                  />

                  {/* Card Tentang Saya: Foto Ber-Badge (40%) + Intro & 3 KPI (60%) */}
                  <AboutIntroCard data={profileData} theme={theme} />

                  {/* Bidang Minat & Spesialisasi: Grid 4 Kolom Sejajar dengan Kotak Ikon Glow */}
                  <SpecializationCard data={profileData} theme={theme} />
                </View>

                {/* ========================================================
                    SECTION 3: KEAHLIAN TEKNIS (Interactive 3D Flip Cards & Timeline)
                    ======================================================== */}
                <View
                  onLayout={(e) => {
                    sectionPositions.current['skills'] = e.nativeEvent.layout.y;
                  }}
                  style={styles.sectionContainer}
                >
                  <KineticScriptBanner
                    scriptText="Keahlian & Harmoni — Clean Architecture, Interactive UI & Musical Rhythm"
                    sectionTag="03 • TECHNICAL MASTERY"
                    scrollY={scrollY}
                    sectionTop={sectionPositions.current['skills'] || 0}
                    direction="left"
                    theme={theme}
                  />

                  {/* 3D Flip Cards Keahlian Teknis (6 Kolom Desktop / Filter / Putar Ulang) */}
                  <SkillMatrixCard skills={profileData.technicalSkills} theme={theme} />

                  {/* DUAL VERTICAL GLOWING TIMELINE (50% Riwayat Pendidikan : 50% Pengalaman) */}
                  <View style={isDesktop ? styles.desktopGrid2Col : styles.mobileColumn}>
                    <View style={isDesktop ? styles.desktopColHalf : styles.mobileFullWidth}>
                      <IdentityDetailCard data={profileData} theme={theme} />
                    </View>
                    <View style={isDesktop ? styles.desktopColHalf : styles.mobileFullWidth}>
                      <ExperienceTimeline experiences={profileData.experience} theme={theme} />
                    </View>
                  </View>

                  {/* Minat & Hobi */}
                  <HobbySection hobbies={profileData.hobbies} theme={theme} columns={4} />
                </View>

                {/* ========================================================
                    SECTION 4: PORTFOLIO (Grid 3 Kolom + Lightbox Modal Prev/Next)
                    ======================================================== */}
                <View
                  onLayout={(e) => {
                    sectionPositions.current['portfolio'] = e.nativeEvent.layout.y;
                  }}
                  style={styles.sectionContainer}
                >
                  <KineticScriptBanner
                    scriptText="Galeri Karya — Engineered with Precision, Logic & Aesthetic"
                    sectionTag="04 • FEATURED PORTFOLIO"
                    scrollY={scrollY}
                    sectionTop={sectionPositions.current['portfolio'] || 0}
                    direction="right"
                    theme={theme}
                  />

                  <PortfolioGallery portfolios={profileData.portfolios} theme={theme} />
                </View>

                {/* ========================================================
                    SECTION 5: MY SCORE (Indigo Glassmorphism & Gradien Progress)
                    ======================================================== */}
                <View
                  onLayout={(e) => {
                    sectionPositions.current['score'] = e.nativeEvent.layout.y;
                  }}
                  style={styles.sectionContainer}
                >
                  <KineticScriptBanner
                    scriptText="Capaian Akademik — Dedication, Discipline & Excellence"
                    sectionTag="05 • ACADEMIC EXCELLENCE"
                    scrollY={scrollY}
                    sectionTop={sectionPositions.current['score'] || 0}
                    direction="left"
                    theme={theme}
                  />

                  <View style={isDesktop ? styles.desktopGridScoreRow : styles.mobileColumn}>
                    {/* Kolom Kiri 30%: Score Achievement Showcase Card */}
                    <View style={isDesktop ? styles.desktopColScoreImg : styles.mobileFullWidth}>
                      <ScoreAchievementImageCard theme={theme} />
                    </View>

                    {/* Kolom Kanan 70%: Simulator Bar + Capaian Akademik My Score */}
                    <View style={isDesktop ? styles.desktopColScoreMain : styles.mobileFullWidth}>
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
                  </View>
                </View>

                {/* ========================================================
                    SECTION 6: CONTACT (2 Kolom: Kiri 35% Info : Kanan 65% Form Pesan)
                    ======================================================== */}
                <View
                  onLayout={(e) => {
                    sectionPositions.current['contact'] = e.nativeEvent.layout.y;
                  }}
                  style={styles.sectionContainer}
                >
                  <KineticScriptBanner
                    scriptText="Mari Berkolaborasi — Let's Build Impactful Technology Together"
                    sectionTag="06 • GET IN TOUCH"
                    scrollY={scrollY}
                    sectionTop={sectionPositions.current['contact'] || 0}
                    direction="right"
                    theme={theme}
                  />

                  <View style={[styles.contactTwoCols, isDesktop ? styles.rowDesktop : styles.columnMobile]}>
                    {/* KIRI 35%: 4 KARTU INFO KONTAK */}
                    <View style={[styles.contactLeftCol, isDesktop && styles.contactLeftColDesktop]}>
                      <ContactGridCard contactItems={profileData.contactItems} theme={theme} />
                    </View>

                    {/* KANAN 65%: KARTU FORMULIR KIRIM PESAN */}
                    <View style={[styles.contactRightCol, isDesktop && styles.contactRightColDesktop]}>
                      <ContactForm
                        data={profileData}
                        onMessageSent={handleMessageSent}
                        theme={theme}
                      />
                    </View>
                  </View>
                </View>

                {/* ========================================================
                    FOOTER 3 KOLOM + TOMBOL KEMBALI KE ATAS ↑
                    ======================================================== */}
                <CosmicFooter
                  student={profileData}
                  theme={theme}
                  onNavigateSection={handleNavigateToSection}
                  onScrollToTop={handleScrollToTop}
                />
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
    position: 'relative',
  },
  floatingTopNavFixed: {
    position: (Platform.OS === 'web' ? 'fixed' : 'absolute') as any,
    top: 10,
    left: 0,
    right: 0,
    zIndex: 1000,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionContainer: {
    width: '100%',
    gap: 16,
    paddingTop: 8,
    paddingBottom: 24,
  },
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
  desktopGridScoreRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: 20,
    width: '100%',
  },
  desktopColScoreImg: {
    flex: 3,
  },
  desktopColScoreMain: {
    flex: 7,
    gap: 16,
  },
  contactTwoCols: {
    width: '100%',
    gap: 20,
  },
  contactLeftCol: {
    width: '100%',
  },
  contactLeftColDesktop: {
    flex: 3.5,
  },
  contactRightCol: {
    width: '100%',
  },
  contactRightColDesktop: {
    flex: 6.5,
  },
  rowDesktop: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  columnMobile: {
    flexDirection: 'column',
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  scrollContent: {
    paddingTop: 72,
    paddingBottom: SPACING.huge,
  },
  responsiveContentWrapper: {
    width: '100%',
    maxWidth: 1260,
    marginHorizontal: 'auto',
    alignSelf: 'center',
    gap: 24,
  },
  // BENTO ROW
  bentoRow: {
    width: '100%',
    gap: 18,
  },
  bentoRowDesktop: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  bentoRowMobile: {
    flexDirection: 'column',
  },
  // KPI GRID 2x2
  kpiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
    flex: 1,
  },
  kpiCard: {
    width: '48%',
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    justifyContent: 'space-between',
    minHeight: 110,
    gap: 4,
    ...Platform.select({
      web: {
        backdropFilter: 'blur(10px)',
      } as any,
    }),
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
  // 4 CARD NAVIGASI CEPAT HOME
  homeCardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    width: '100%',
    justifyContent: 'space-between',
  },
  homeFeatureCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    gap: 12,
    justifyContent: 'space-between',
    minHeight: 130,
    ...Platform.select({
      web: {
        cursor: 'pointer' as any,
        transition: 'transform 0.15s ease, border-color 0.15s ease' as any,
        backdropFilter: 'blur(10px)',
      } as any,
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
    borderRadius: 10,
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
  // SIMULATOR BAR (MY SCORE)
  simulatorBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 14,
    borderWidth: 1,
    flexWrap: 'wrap',
    gap: 10,
    ...Platform.select({
      web: {
        backdropFilter: 'blur(10px)',
      } as any,
    }),
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
    ...Platform.select({
      web: { cursor: 'pointer' as any },
    }),
  },
  miniSimBtnText: {
    fontFamily: FONTS.semiBold,
    fontSize: 11.5,
    fontWeight: '600',
  },
});
