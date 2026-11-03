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
import { SIX_NAV_PHOTOS } from './data/sixNavPhotos';

// Import Services & Persistence Layer
import StorageService from './services/storageService';
import AcademicService from './services/academicService';

// Import Theme System (Retro Mustard & Brown)
import { getTheme, SPACING, FONTS } from './theme';

// Import Komponen UI Modular
import NavigationTabBar, { TabKey } from './components/NavigationTabBar';
import ShowcasePhotoCard from './components/ShowcasePhotoCard';
import ProfileCard from './components/ProfileCard';
import InteractiveEndorseBar from './components/InteractiveEndorseBar';
import { AboutIntroCard, SpecializationCard } from './components/AboutSection';
import SkillMatrixCard from './components/SkillMatrixCard';
import IdentityDetailCard from './components/IdentityDetailCard';
import ExperienceTimeline from './components/ExperienceTimeline';
import HobbySection from './components/HobbySection';
import PortfolioGallery from './components/PortfolioGallery';
import MyScoreSection from './components/MyScoreSection';
import ContactGridCard from './components/ContactGridCard';
import ContactForm from './components/ContactForm';

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
  const isMobile = width < 768;

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
  const [activeTab, setActiveTab] = useState<TabKey>('home');
  const sectionPositions = useRef<Record<string, number>>({});

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

  // Inisialisasi Preferensi Tersimpan (AsyncStorage)
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

  // Handler Ganti Tema dengan Penyimpanan Otomatis
  const handleToggleTheme = async () => {
    const nextMode = !isDarkMode;
    setIsDarkMode(nextMode);
    try {
      await StorageService.setThemeMode(nextMode ? 'dark' : 'light');
      setToast({
        message: nextMode
          ? 'Mode Malam (Deep Espresso & Retro Mustard) diaktifkan'
          : 'Mode Terang (Warm Cream & Retro Mustard) diaktifkan',
        type: 'info',
      });
    } catch (err) {
      console.warn('Gagal menyimpan preferensi tema:', err);
    }
  };

  // Fetch Capaian Akademik
  const fetchScores = useCallback(async ({ isPullRefresh = false } = {}) => {
    if (isPullRefresh) setIsRefreshing(true);
    else setIsLoadingAcademic(true);
    setAcademicError(null);

    try {
      const data = await AcademicService.fetchAcademicScore();
      setAcademicData(data);
      setCurrentState('normal');
      if (isPullRefresh) {
        setToast({ message: 'Nilai akademik berhasil diperbarui dari LMS', type: 'success' });
      }
    } catch (err: any) {
      setAcademicError(err);
      setCurrentState('error');
      setToast({ message: 'Gagal memuat data nilai: Layanan LMS tidak merespons (503)', type: 'error' });
    } finally {
      if (isPullRefresh) setIsRefreshing(false);
      else setIsLoadingAcademic(false);
    }
  }, []);

  const handlePullRefresh = () => fetchScores({ isPullRefresh: true });

  const handleTriggerNormal = () => {
    setCurrentState('normal');
    setAcademicError(null);
    setAcademicData(initialAcademicScoreData);
    setToast({ message: 'Simulasi: Menampilkan data capaian normal', type: 'info' });
  };

  const handleTriggerEmpty = () => {
    setCurrentState('empty');
    setAcademicError(null);
    setToast({ message: 'Simulasi: Menampilkan kondisi data kosong (Empty State)', type: 'info' });
  };

  const handleTriggerError = () => {
    setCurrentState('error');
    setAcademicError({
      status: 503,
      code: 'SERVICE_UNAVAILABLE',
      message: 'Server LMS Masoem University sedang dalam pemeliharaan berkala.',
    });
    setToast({ message: 'Simulasi: Menampilkan pesan error 503', type: 'error' });
  };

  // Navigasi Smooth Scroll ke Section
  const scrollToSection = (tabKey: TabKey) => {
    setActiveTab(tabKey);
    const targetY = sectionPositions.current[tabKey];
    if (targetY !== undefined && scrollViewRef.current) {
      // Offset 72px for sticky navbar
      const offsetTarget = Math.max(0, targetY - 72);
      scrollViewRef.current.scrollTo({ y: offsetTarget, animated: true });
    }
  };

  // ScrollSpy Tracker
  const handleScroll = (event: any) => {
    const currentY = event.nativeEvent.contentOffset.y;
    setScrollY(currentY);

    const orderedTabs: TabKey[] = ['home', 'about', 'skills', 'portfolio', 'score', 'contact'];
    let currentActive: TabKey = 'home';

    for (let i = orderedTabs.length - 1; i >= 0; i--) {
      const tab = orderedTabs[i];
      const pos = sectionPositions.current[tab];
      if (pos !== undefined && currentY >= pos - 160) {
        currentActive = tab;
        break;
      }
    }

    if (currentActive !== activeTab) {
      setActiveTab(currentActive);
    }
  };

  const scrollToTop = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={[styles.safeArea, { backgroundColor: theme.background }]}
        edges={['top', 'left', 'right']}
      >
        <StatusBar style={isDarkMode ? 'light' : 'dark'} />

        <View style={[styles.appContainer, { backgroundColor: theme.background }]}>
          {/* ========================================================
              STICKY TOP NAVBAR (TETAP DI ATAS SAAT DI-SCROLL, ZERO OVERLAP)
              ======================================================== */}
          <View style={styles.topNavStickyWrapper}>
            <NavigationTabBar
              activeTab={activeTab}
              onTabChange={scrollToSection}
              theme={theme}
              isDarkMode={isDarkMode}
              onToggleTheme={handleToggleTheme}
            />
          </View>

          {/* Feedback Toast Notifikasi */}
          <FeedbackToast
            message={toast?.message}
            type={toast?.type as any}
            onDismiss={() => setToast(null)}
          />

          <ErrorBoundary>
            <ScrollView
              ref={scrollViewRef}
              style={styles.scrollView}
              contentContainerStyle={styles.scrollContent}
              onScroll={handleScroll}
              scrollEventThrottle={16}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={isRefreshing}
                  onRefresh={handlePullRefresh}
                  colors={[theme.primary]}
                  tintColor={theme.primary}
                />
              }
            >
              {/* ========================================================
                  KONTAINER UTAMA SATU HALAMAN (MAXWIDTH: 1280px)
                  ======================================================== */}
              <View style={styles.mainContainer}>
                {/* ========================================================
                    1. MENU HOME: [FOTO 1: POTRET DI KANAN | TEKS & PINTASAN DI KIRI]
                    ======================================================== */}
                <View
                  onLayout={(e) => {
                    sectionPositions.current['home'] = e.nativeEvent.layout.y;
                  }}
                  style={styles.sectionBlock}
                >
                  <View style={[styles.sectionRow, isDesktop ? styles.rowDesktop : styles.columnMobile]}>
                    {/* Sisi Kiri: Profil Hero (Nama, NIM, Role, Bio, Social & CTA) + 4 Card Pintasan */}
                    <View style={[styles.homeLeftCol, isDesktop && styles.homeLeftColDesktop]}>
                      <ProfileCard
                        data={profileData}
                        theme={theme}
                        onExploreScore={() => scrollToSection('score')}
                        onContactClick={() => scrollToSection('contact')}
                        hidePhoto={isDesktop}
                      />

                      {/* 4 Card Pintasan Navigasi */}
                      <View style={styles.homeCardsGrid}>
                        <TouchableOpacity
                          style={[
                            styles.homeFeatureCard,
                            {
                              backgroundColor: theme.surface,
                              borderColor: theme.border,
                              width: isDesktop ? '48%' : '48%',
                            },
                          ]}
                          activeOpacity={0.8}
                          onPress={() => scrollToSection('about')}
                        >
                          <View style={styles.homeFeatureTop}>
                            <View
                              style={[
                                styles.homeFeatureIconBox,
                                { backgroundColor: theme.surfaceMuted, borderColor: theme.borderLight },
                              ]}
                            >
                              <Ionicons name="person-outline" size={17} color={theme.primary} />
                            </View>
                            <Ionicons name="arrow-forward" size={14} color={theme.textMuted} />
                          </View>
                          <View style={styles.homeFeatureBottom}>
                            <Text style={[styles.homeFeatureTitle, { color: theme.textPrimary }]}>
                              Tentang Saya
                            </Text>
                            <Text
                              style={[styles.homeFeatureDesc, { color: theme.textSecondary }]}
                              numberOfLines={1}
                            >
                              Visi & pendidikan.
                            </Text>
                          </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={[
                            styles.homeFeatureCard,
                            {
                              backgroundColor: theme.surface,
                              borderColor: theme.border,
                              width: isDesktop ? '48%' : '48%',
                            },
                          ]}
                          activeOpacity={0.8}
                          onPress={() => scrollToSection('skills')}
                        >
                          <View style={styles.homeFeatureTop}>
                            <View
                              style={[
                                styles.homeFeatureIconBox,
                                { backgroundColor: theme.surfaceMuted, borderColor: theme.borderLight },
                              ]}
                            >
                              <Ionicons name="code-slash-outline" size={17} color={theme.primary} />
                            </View>
                            <Ionicons name="arrow-forward" size={14} color={theme.textMuted} />
                          </View>
                          <View style={styles.homeFeatureBottom}>
                            <Text style={[styles.homeFeatureTitle, { color: theme.textPrimary }]}>
                              Keahlian Teknis
                            </Text>
                            <Text
                              style={[styles.homeFeatureDesc, { color: theme.textSecondary }]}
                              numberOfLines={1}
                            >
                              23 skill & organisasi.
                            </Text>
                          </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={[
                            styles.homeFeatureCard,
                            {
                              backgroundColor: theme.surface,
                              borderColor: theme.border,
                              width: isDesktop ? '48%' : '48%',
                            },
                          ]}
                          activeOpacity={0.8}
                          onPress={() => scrollToSection('portfolio')}
                        >
                          <View style={styles.homeFeatureTop}>
                            <View
                              style={[
                                styles.homeFeatureIconBox,
                                { backgroundColor: theme.surfaceMuted, borderColor: theme.borderLight },
                              ]}
                            >
                              <Ionicons name="briefcase-outline" size={17} color={theme.primary} />
                            </View>
                            <Ionicons name="arrow-forward" size={14} color={theme.textMuted} />
                          </View>
                          <View style={styles.homeFeatureBottom}>
                            <Text style={[styles.homeFeatureTitle, { color: theme.textPrimary }]}>
                              Portofolio
                            </Text>
                            <Text
                              style={[styles.homeFeatureDesc, { color: theme.textSecondary }]}
                              numberOfLines={1}
                            >
                              Aplikasi SIMAK & mobile.
                            </Text>
                          </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={[
                            styles.homeFeatureCard,
                            {
                              backgroundColor: theme.surface,
                              borderColor: theme.border,
                              width: isDesktop ? '48%' : '48%',
                            },
                          ]}
                          activeOpacity={0.8}
                          onPress={() => scrollToSection('score')}
                        >
                          <View style={styles.homeFeatureTop}>
                            <View
                              style={[
                                styles.homeFeatureIconBox,
                                { backgroundColor: theme.surfaceMuted, borderColor: theme.borderLight },
                              ]}
                            >
                              <Ionicons name="school-outline" size={17} color={theme.primary} />
                            </View>
                            <Ionicons name="arrow-forward" size={14} color={theme.textMuted} />
                          </View>
                          <View style={styles.homeFeatureBottom}>
                            <Text style={[styles.homeFeatureTitle, { color: theme.textPrimary }]}>
                              My Score
                            </Text>
                            <Text
                              style={[styles.homeFeatureDesc, { color: theme.textSecondary }]}
                              numberOfLines={1}
                            >
                              Nilai UTS 90 (Grade A).
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>

                    {/* Sisi Kanan: FOTO 1 (HOME) + Bento KPI 2x2 + Bar Rekomendasi */}
                    <View style={[styles.homeRightCol, isDesktop && styles.homeRightColDesktop]}>
                      <ShowcasePhotoCard
                        photo={SIX_NAV_PHOTOS.homePhoto}
                        theme={theme}
                        slideDirection="right"
                        isVisible={true}
                        aspectRatio={4 / 3.4}
                      />

                      {/* 2x2 Bento KPI */}
                      <View style={styles.kpiGrid}>
                        {(profileData as any).academicKPIs?.map((kpi: any) => (
                          <View
                            key={kpi.id}
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
                              <Ionicons name={kpi.icon as any} size={15} color={theme.primary} />
                            </View>
                            <Text style={[styles.kpiValue, { color: theme.textPrimary }]}>
                              {kpi.value}
                            </Text>
                            <Text style={[styles.kpiLabel, { color: theme.textSecondary }]}>
                              {kpi.label}
                            </Text>
                            <Text style={[styles.kpiUnit, { color: theme.textMuted }]}>
                              {kpi.unit}
                            </Text>
                          </View>
                        ))}
                      </View>

                      {/* Bar Dukungan Rekomendasi Profil */}
                      <InteractiveEndorseBar
                        initialCount={48}
                        studentName={profileData.nama}
                        theme={theme}
                      />
                    </View>
                  </View>
                </View>

                {/* ========================================================
                    2. MENU ABOUT: [FOTO 2 DI KIRI | TENTANG SAYA & PENDIDIKAN DI KANAN]
                    ======================================================== */}
                <View
                  onLayout={(e) => {
                    sectionPositions.current['about'] = e.nativeEvent.layout.y;
                  }}
                  style={styles.sectionBlock}
                >
                  <View style={[styles.sectionRow, isDesktop ? styles.rowDesktop : styles.columnMobile]}>
                    {/* ▬▬► FOTO 2: ABOUT (Muncul Meluncur dari KIRI) */}
                    <View style={[styles.aboutLeftCol, isDesktop && styles.aboutLeftColDesktop]}>
                      <ShowcasePhotoCard
                        photo={SIX_NAV_PHOTOS.aboutPhoto}
                        theme={theme}
                        slideDirection="left"
                        isVisible={activeTab === 'about' || scrollY >= (sectionPositions.current['about'] || 200) - 400}
                        aspectRatio={3 / 4}
                      />
                    </View>

                    {/* ◄▬▬ KANAN: Tentang Saya & Riwayat Pendidikan */}
                    <View style={[styles.aboutRightCol, isDesktop && styles.aboutRightColDesktop]}>
                      <AboutIntroCard data={profileData} theme={theme} />
                      <IdentityDetailCard data={profileData} theme={theme} />
                    </View>
                  </View>

                  {/* Bidang Minat & Spesialisasi (100% Lebar Penuh - Grid 4 Kolom di Bawahnya) */}
                  <SpecializationCard data={profileData} theme={theme} />
                </View>

                {/* ========================================================
                    3. MENU SKILLS: [KEAHLIAN & PENGALAMAN DI KIRI | FOTO 3 DI KANAN]
                    ======================================================== */}
                <View
                  onLayout={(e) => {
                    sectionPositions.current['skills'] = e.nativeEvent.layout.y;
                  }}
                  style={styles.sectionBlock}
                >
                  <View style={[styles.sectionRow, isDesktop ? styles.rowDesktop : styles.columnMobile]}>
                    {/* ▬▬► Sisi Kiri: Keahlian Teknis, Pengalaman & Minat Hobi */}
                    <View style={[styles.skillsLeftCol, isDesktop && styles.skillsLeftColDesktop]}>
                      <SkillMatrixCard skills={profileData.technicalSkills} theme={theme} />
                      <ExperienceTimeline experiences={profileData.experience} theme={theme} />
                      <HobbySection hobbies={profileData.hobbies} theme={theme} columns={2} />
                    </View>

                    {/* ◄▬▬ FOTO 3: SKILLS (Muncul Meluncur dari KANAN) */}
                    <View style={[styles.skillsRightCol, isDesktop && styles.skillsRightColDesktop]}>
                      <ShowcasePhotoCard
                        photo={SIX_NAV_PHOTOS.skillsPhoto}
                        theme={theme}
                        slideDirection="right"
                        isVisible={activeTab === 'skills' || scrollY >= (sectionPositions.current['skills'] || 600) - 400}
                        aspectRatio={3 / 4}
                        badgePosition="top-right"
                      />
                    </View>
                  </View>
                </View>

                {/* ========================================================
                    4. MENU PORTFOLIO: [FOTO 4 DI KIRI | GALERI PROYEK DI KANAN]
                    ======================================================== */}
                <View
                  onLayout={(e) => {
                    sectionPositions.current['portfolio'] = e.nativeEvent.layout.y;
                  }}
                  style={styles.sectionBlock}
                >
                  <View style={[styles.sectionRow, isDesktop ? styles.rowDesktop : styles.columnMobile]}>
                    {/* ▬▬► FOTO 4: PORTFOLIO (Muncul Meluncur dari KIRI) */}
                    <View style={[styles.portfolioLeftCol, isDesktop && styles.portfolioLeftColDesktop]}>
                      <ShowcasePhotoCard
                        photo={SIX_NAV_PHOTOS.portfolioPhoto}
                        theme={theme}
                        slideDirection="left"
                        isVisible={activeTab === 'portfolio' || scrollY >= (sectionPositions.current['portfolio'] || 1000) - 400}
                        aspectRatio={3 / 4}
                      />
                    </View>

                    {/* ◄▬▬ KANAN: Galeri Portofolio Proyek (Search & Filter) */}
                    <View style={[styles.portfolioRightCol, isDesktop && styles.portfolioRightColDesktop]}>
                      <PortfolioGallery
                        portfolios={profileData.portfolios}
                        theme={theme}
                        showBanner={false}
                      />
                    </View>
                  </View>
                </View>

                {/* ========================================================
                    5. MENU MY SCORE: [FOTO 5 DI KIRI | DASHBOARD CAPAIAN DI KANAN]
                    ======================================================== */}
                <View
                  onLayout={(e) => {
                    sectionPositions.current['score'] = e.nativeEvent.layout.y;
                  }}
                  style={styles.sectionBlock}
                >
                  <View style={[styles.sectionRow, isDesktop ? styles.rowDesktop : styles.columnMobile]}>
                    {/* ▬▬► FOTO 5: MY SCORE (Top Scholar Dedication di Kiri) */}
                    <View style={[styles.scoreLeftCol, isDesktop && styles.scoreLeftColDesktop]}>
                      <ShowcasePhotoCard
                        photo={SIX_NAV_PHOTOS.myscorePhoto}
                        theme={theme}
                        slideDirection="left"
                        isVisible={activeTab === 'score' || scrollY >= (sectionPositions.current['score'] || 1400) - 400}
                        aspectRatio={3 / 4}
                      />
                    </View>

                    {/* ◄▬▬ KANAN: Toolbar Simulasi Resiliensi & MyScoreSection */}
                    <View style={[styles.scoreRightCol, isDesktop && styles.scoreRightColDesktop]}>
                      {/* Toolbar Simulasi Resiliensi Data */}
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
                          theme={theme}
                          onRetry={() => fetchScores({ isPullRefresh: false })}
                        />
                      ) : currentState === 'empty' ? (
                        <EmptyState
                          theme={theme}
                          title="Data Nilai Akademik Belum Tersedia"
                          message="Nilai UTS Semester 5 Anda belum diunggah oleh Dosen Pengampu."
                          actionLabel="Muat Ulang Data"
                          onAction={() => fetchScores({ isPullRefresh: false })}
                        />
                      ) : (
                        <MyScoreSection data={academicData} theme={theme} />
                      )}
                    </View>
                  </View>
                </View>

                {/* ========================================================
                    6. MENU CONTACT: [FOTO 6 & KANAL DI KIRI | FORMULIR DI KANAN]
                    ======================================================== */}
                <View
                  onLayout={(e) => {
                    sectionPositions.current['contact'] = e.nativeEvent.layout.y;
                  }}
                  style={styles.sectionBlock}
                >
                  <View style={[styles.sectionRow, isDesktop ? styles.rowDesktop : styles.columnMobile]}>
                    {/* ▬▬► Sisi Kiri: FOTO 6 (CONTACT) & Kanal Kontak */}
                    <View style={[styles.contactLeftCol, isDesktop && styles.contactLeftColDesktop]}>
                      <ShowcasePhotoCard
                        photo={SIX_NAV_PHOTOS.contactPhoto}
                        theme={theme}
                        slideDirection="left"
                        isVisible={activeTab === 'contact' || scrollY >= (sectionPositions.current['contact'] || 1800) - 400}
                        aspectRatio={4 / 3.2}
                      />
                      <ContactGridCard contactItems={profileData.contactItems} theme={theme} />
                    </View>

                    {/* ◄▬▬ Sisi Kanan: Form Kirim Pesan */}
                    <View style={[styles.contactRightCol, isDesktop && styles.contactRightColDesktop]}>
                      <ContactForm
                        data={profileData}
                        theme={theme}
                        onMessageSent={(payload) => {
                          setMessagesReceivedCount((prev) => prev + 1);
                          setToast({
                            message: `Pesan berhasil dikirim dari ${payload?.senderName || 'pengunjung'}!`,
                            type: 'success',
                          });
                        }}
                      />
                    </View>
                  </View>
                </View>

                {/* ========================================================
                    FOOTER INSTITUSI (RINGKAS, RAPI & TOMBOL KEMBALI KE ATAS)
                    ======================================================== */}
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

                  <TouchableOpacity
                    style={[
                      styles.backToTopBtn,
                      {
                        backgroundColor: theme.surfaceMuted,
                        borderColor: theme.border,
                      },
                    ]}
                    onPress={scrollToTop}
                    activeOpacity={0.8}
                  >
                    <Ionicons name="arrow-up" size={14} color={theme.primary} />
                    <Text style={[styles.backToTopText, { color: theme.textPrimary }]}>
                      Kembali ke atas ↑
                    </Text>
                  </TouchableOpacity>
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
    position: 'relative',
  },
  topNavStickyWrapper: {
    width: '100%',
    zIndex: 1000,
    ...Platform.select({
      web: {
        position: 'sticky' as any,
        top: 0,
      },
    }),
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  scrollContent: {
    paddingVertical: SPACING.md,
    paddingBottom: SPACING.huge,
  },
  // KONTAINER UTAMA SATU HALAMAN
  mainContainer: {
    width: '100%',
    maxWidth: 1260,
    marginHorizontal: 'auto',
    alignSelf: 'center',
    paddingHorizontal: 16,
    gap: 28,
  },
  sectionBlock: {
    width: '100%',
    gap: 20,
    paddingTop: 6,
    paddingBottom: 12,
  },
  sectionRow: {
    width: '100%',
    gap: 20,
  },
  rowDesktop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  columnMobile: {
    flexDirection: 'column',
  },

  // 1. HOME SECTION COLUMNS
  homeLeftCol: {
    width: '100%',
    gap: 16,
  },
  homeLeftColDesktop: {
    flex: 5.8,
  },
  homeRightCol: {
    width: '100%',
    gap: 16,
  },
  homeRightColDesktop: {
    flex: 4.2,
  },

  // 2. ABOUT SECTION COLUMNS (ZIG-ZAG: FOTO KIRI, TEKS KANAN)
  aboutLeftCol: {
    width: '100%',
  },
  aboutLeftColDesktop: {
    flex: 3.8,
  },
  aboutRightCol: {
    width: '100%',
    gap: 16,
  },
  aboutRightColDesktop: {
    flex: 6.2,
  },

  // 3. SKILLS SECTION COLUMNS (ZIG-ZAG: TEKS KIRI, FOTO KANAN)
  skillsLeftCol: {
    width: '100%',
    gap: 16,
  },
  skillsLeftColDesktop: {
    flex: 6.2,
  },
  skillsRightCol: {
    width: '100%',
  },
  skillsRightColDesktop: {
    flex: 3.8,
  },

  // 4. PORTFOLIO SECTION COLUMNS (ZIG-ZAG: FOTO KIRI, PROYEK KANAN)
  portfolioLeftCol: {
    width: '100%',
  },
  portfolioLeftColDesktop: {
    flex: 3.8,
  },
  portfolioRightCol: {
    width: '100%',
  },
  portfolioRightColDesktop: {
    flex: 6.2,
  },

  // 5. MY SCORE SECTION COLUMNS (ZIG-ZAG: FOTO KIRI, SCORE KANAN)
  scoreLeftCol: {
    width: '100%',
  },
  scoreLeftColDesktop: {
    flex: 3.4,
  },
  scoreRightCol: {
    width: '100%',
    gap: 16,
  },
  scoreRightColDesktop: {
    flex: 6.6,
  },

  // 6. CONTACT SECTION COLUMNS (ZIG-ZAG: FOTO & KANAL KIRI, FORM KANAN)
  contactLeftCol: {
    width: '100%',
    gap: 16,
  },
  contactLeftColDesktop: {
    flex: 4.4,
  },
  contactRightCol: {
    width: '100%',
  },
  contactRightColDesktop: {
    flex: 5.6,
  },

  // KPI GRID 2x2
  kpiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
    width: '100%',
  },
  kpiCard: {
    width: '48%',
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    justifyContent: 'space-between',
    minHeight: 104,
    gap: 3,
  },
  kpiIconBox: {
    width: 28,
    height: 28,
    borderRadius: 7,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  kpiValue: {
    fontFamily: FONTS.bold,
    fontSize: 18,
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
    fontSize: 9.5,
  },

  // 4 CARD NAVIGASI CEPAT HOME
  homeCardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    width: '100%',
    justifyContent: 'space-between',
  },
  homeFeatureCard: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 12,
    gap: 8,
    justifyContent: 'space-between',
    minHeight: 96,
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
    width: 32,
    height: 32,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeFeatureBottom: {
    width: '100%',
    flexShrink: 1,
    gap: 2,
  },
  homeFeatureTitle: {
    fontFamily: FONTS.bold,
    fontSize: 12.5,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  homeFeatureDesc: {
    fontFamily: FONTS.regular,
    fontSize: 10.5,
    lineHeight: 14,
    flexShrink: 1,
  },

  // SIMULATOR BAR (MY SCORE)
  simulatorBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: SPACING.cardRadius,
    borderWidth: 1,
    flexWrap: 'wrap',
    gap: 8,
    width: '100%',
  },
  simulatorLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  simulatorTitle: {
    fontFamily: FONTS.bold,
    fontSize: 12,
    fontWeight: '700',
  },
  simulatorActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'wrap',
  },
  miniSimBtn: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
  },
  miniSimBtnText: {
    fontFamily: FONTS.semiBold,
    fontSize: 11,
    fontWeight: '600',
  },

  // FOOTER
  footer: {
    marginTop: 20,
    alignItems: 'center',
    paddingVertical: 20,
    borderTopWidth: 1,
    gap: 8,
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
  backToTopBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
    borderWidth: 1,
    marginTop: 8,
  },
  backToTopText: {
    fontFamily: FONTS.semiBold,
    fontSize: 12,
    fontWeight: '600',
  },
});
