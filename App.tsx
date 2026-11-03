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
import { PERSONAL_PHOTOS } from './data/personalPhotos';

// Import Services & Persistence Layer
import StorageService from './services/storageService';
import AcademicService from './services/academicService';

// Import Theme System (Retro Mustard & Brown)
import { getTheme, SPACING, FONTS } from './theme';

// Import Komponen UI Modular
import NavigationTabBar, { TabKey } from './components/NavigationTabBar';
import { VerticalPhotoReel, HorizontalPhotoReel } from './components/PersonalPhotoReel';
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
  // 3-Zone Architecture breakpoint: width >= 1200px
  const isWideDesktop = width >= 1200;
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
      if (pos !== undefined && currentY >= pos - 140) {
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
                  ARSITEKTUR 3-ZONA: [FOTO KIRI] + [KONTEN UTAMA] + [FOTO KANAN]
                  ======================================================== */}
              <View style={styles.threeZoneWrapper}>
                {/* 1. JALUR FOTO KIRI (Auto-Scroll ke ATAS, Desktop width >= 1200px) */}
                {isWideDesktop && (
                  <VerticalPhotoReel
                    photos={PERSONAL_PHOTOS.leftPhotos}
                    direction="up"
                    theme={theme}
                  />
                )}

                {/* 2. KONTEN UTAMA CV (TENGAH, BEBAS HALANGAN) */}
                <View style={styles.centerCvContent}>
                  {/* ========================================================
                      SECTION 1: HOME (Hero Profile & Bento KPI 2x2)
                      ======================================================== */}
                  <View
                    onLayout={(e) => {
                      sectionPositions.current['home'] = e.nativeEvent.layout.y;
                    }}
                    style={styles.sectionContainer}
                  >
                    <View style={[styles.bentoRow, isDesktop ? styles.bentoRowDesktop : styles.bentoRowMobile]}>
                      {/* Kolom Kiri: Profil Hero (Foto 1:1, Nama, NIM, Bio, Social) */}
                      <View style={[styles.bentoLeft, isDesktop && styles.bentoLeftDesktop]}>
                        <ProfileCard
                          data={profileData}
                          theme={theme}
                          onExploreScore={() => scrollToSection('score')}
                          onContactClick={() => scrollToSection('contact')}
                        />
                      </View>

                      {/* Kolom Kanan: 2x2 Bento KPI & Endorsement Bar */}
                      <View style={[styles.bentoRight, isDesktop && styles.bentoRightDesktop]}>
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
                                <Ionicons name={kpi.icon as any} size={16} color={theme.primary} />
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

                        {/* Bar Dukungan / Rekomendasi Profil */}
                        <InteractiveEndorseBar
                          initialCount={48}
                          studentName={profileData.nama}
                          theme={theme}
                        />
                      </View>
                    </View>

                    {/* 4 Card Navigasi Cepat Home */}
                    <View style={styles.homeCardsGrid}>
                      <TouchableOpacity
                        style={[
                          styles.homeFeatureCard,
                          {
                            backgroundColor: theme.surface,
                            borderColor: theme.border,
                            width: isDesktop ? '23.5%' : isTablet ? '48%' : '100%',
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
                            <Ionicons name="person-outline" size={18} color={theme.primary} />
                          </View>
                          <Ionicons name="arrow-forward" size={14} color={theme.textMuted} />
                        </View>
                        <View style={styles.homeFeatureBottom}>
                          <Text style={[styles.homeFeatureTitle, { color: theme.textPrimary }]}>
                            Tentang Saya
                          </Text>
                          <Text
                            style={[styles.homeFeatureDesc, { color: theme.textSecondary }]}>
                            Latar belakang, visi & 4 jenjang pendidikan.
                          </Text>
                        </View>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          styles.homeFeatureCard,
                          {
                            backgroundColor: theme.surface,
                            borderColor: theme.border,
                            width: isDesktop ? '23.5%' : isTablet ? '48%' : '100%',
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
                            <Ionicons name="code-slash-outline" size={18} color={theme.primary} />
                          </View>
                          <Ionicons name="arrow-forward" size={14} color={theme.textMuted} />
                        </View>
                        <View style={styles.homeFeatureBottom}>
                          <Text style={[styles.homeFeatureTitle, { color: theme.textPrimary }]}>
                            Keahlian Teknis
                          </Text>
                          <Text
                            style={[styles.homeFeatureDesc, { color: theme.textSecondary }]}>
                            23 keahlian teknis & 3 pengalaman organisasi.
                          </Text>
                        </View>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          styles.homeFeatureCard,
                          {
                            backgroundColor: theme.surface,
                            borderColor: theme.border,
                            width: isDesktop ? '23.5%' : isTablet ? '48%' : '100%',
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
                            <Ionicons name="briefcase-outline" size={18} color={theme.primary} />
                          </View>
                          <Ionicons name="arrow-forward" size={14} color={theme.textMuted} />
                        </View>
                        <View style={styles.homeFeatureBottom}>
                          <Text style={[styles.homeFeatureTitle, { color: theme.textPrimary }]}>
                            Portofolio Proyek
                          </Text>
                          <Text
                            style={[styles.homeFeatureDesc, { color: theme.textSecondary }]}>
                            Galeri aplikasi mobile, SIMAK & basis data.
                          </Text>
                        </View>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          styles.homeFeatureCard,
                          {
                            backgroundColor: theme.surface,
                            borderColor: theme.border,
                            width: isDesktop ? '23.5%' : isTablet ? '48%' : '100%',
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
                            <Ionicons name="school-outline" size={18} color={theme.primary} />
                          </View>
                          <Ionicons name="arrow-forward" size={14} color={theme.textMuted} />
                        </View>
                        <View style={styles.homeFeatureBottom}>
                          <Text style={[styles.homeFeatureTitle, { color: theme.textPrimary }]}>
                            My Score & LMS
                          </Text>
                          <Text
                            style={[styles.homeFeatureDesc, { color: theme.textSecondary }]}>
                            Nilai UTS 90 (Grade A), 19.000 LP & resiliensi.
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>

                    {/* Pada Layar HP & Tablet (< 1200px): Pita Horizontal Auto-Scroll Reels */}
                    {!isWideDesktop && (
                      <View style={{ marginTop: 12 }}>
                        <HorizontalPhotoReel
                          photos={[...PERSONAL_PHOTOS.leftPhotos, ...PERSONAL_PHOTOS.rightPhotos]}
                          theme={theme}
                        />
                      </View>
                    )}
                  </View>

                  {/* ========================================================
                      SECTION 2: ABOUT (2 Kolom Simetris 50% : 50% + Grid 2x2)
                      ======================================================== */}
                  <View
                    onLayout={(e) => {
                      sectionPositions.current['about'] = e.nativeEvent.layout.y;
                    }}
                    style={styles.sectionContainer}
                  >
                    {/* Baris 1: 50% Kiri: Tentang Saya | 50% Kanan: Riwayat Pendidikan (Tinggi Rata) */}
                    <View style={isDesktop ? styles.desktopGrid2Col : styles.mobileColumn}>
                      <View style={isDesktop ? styles.desktopColHalf : styles.mobileFullWidth}>
                        <AboutIntroCard data={profileData} theme={theme} />
                      </View>
                      <View style={isDesktop ? styles.desktopColHalf : styles.mobileFullWidth}>
                        <IdentityDetailCard data={profileData} theme={theme} />
                      </View>
                    </View>

                    {/* Baris 2: Bidang Minat & Spesialisasi (100% Lebar Penuh - Grid 2x2) */}
                    <SpecializationCard data={profileData} theme={theme} />
                  </View>

                  {/* ========================================================
                      SECTION 3: SKILLS (2 Kolom Simetris 50% : 50% + Hobi Full Width)
                      ======================================================== */}
                  <View
                    onLayout={(e) => {
                      sectionPositions.current['skills'] = e.nativeEvent.layout.y;
                    }}
                    style={styles.sectionContainer}
                  >
                    {/* Baris 1: Keahlian Teknis (50% Kiri) & Pengalaman Organisasi (50% Kanan) */}
                    <View style={isDesktop ? styles.desktopGrid2Col : styles.mobileColumn}>
                      <View style={isDesktop ? styles.desktopColHalf : styles.mobileFullWidth}>
                        <SkillMatrixCard skills={profileData.technicalSkills} theme={theme} />
                      </View>
                      <View style={isDesktop ? styles.desktopColHalf : styles.mobileFullWidth}>
                        <ExperienceTimeline experiences={profileData.experience} theme={theme} />
                      </View>
                    </View>

                    {/* Baris 2: Minat & Hobi (Grid 4 Kolom Sejajar Full Width) */}
                    <HobbySection hobbies={profileData.hobbies} theme={theme} columns={4} />
                  </View>

                  {/* ========================================================
                      SECTION 4: PORTFOLIO (Galeri Karya Proyek & Live Filter)
                      ======================================================== */}
                  <View
                    onLayout={(e) => {
                      sectionPositions.current['portfolio'] = e.nativeEvent.layout.y;
                    }}
                    style={styles.sectionContainer}
                  >
                    <PortfolioGallery portfolios={profileData.portfolios} theme={theme} />
                  </View>

                  {/* ========================================================
                      SECTION 5: MY SCORE (100% Lebar Penuh Tanpa Ruang Kosong)
                      ======================================================== */}
                  <View
                    onLayout={(e) => {
                      sectionPositions.current['score'] = e.nativeEvent.layout.y;
                    }}
                    style={styles.sectionContainer}
                  >
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

                    {/* Konten Capaian Akademik My Score (100% Width) */}
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

                  {/* ========================================================
                      SECTION 6: CONTACT (2 Kolom 50% : 50% Tinggi Sama Rata)
                      ======================================================== */}
                  <View
                    onLayout={(e) => {
                      sectionPositions.current['contact'] = e.nativeEvent.layout.y;
                    }}
                    style={styles.sectionContainer}
                  >
                    <View style={isDesktop ? styles.desktopGrid2Col : styles.mobileColumn}>
                      {/* Kolom Kiri 50%: Kanal Kontak & Jaringan */}
                      <View style={isDesktop ? styles.desktopColHalf : styles.mobileFullWidth}>
                        <ContactGridCard contactItems={profileData.contactItems} theme={theme} />
                      </View>

                      {/* Kolom Kanan 50%: Form Kirim Pesan */}
                      <View style={isDesktop ? styles.desktopColHalf : styles.mobileFullWidth}>
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

                {/* 3. JALUR FOTO KANAN (Auto-Scroll ke BAWAH, Desktop width >= 1200px) */}
                {isWideDesktop && (
                  <VerticalPhotoReel
                    photos={PERSONAL_PHOTOS.rightPhotos}
                    direction="down"
                    theme={theme}
                  />
                )}
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
  // 3-ZONA WRAPPER
  threeZoneWrapper: {
    width: '100%',
    maxWidth: 1460,
    marginHorizontal: 'auto',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: 20,
    paddingHorizontal: 16,
  },
  centerCvContent: {
    flex: 1,
    maxWidth: 1040,
    width: '100%',
    gap: 24,
  },
  sectionContainer: {
    width: '100%',
    gap: 18,
    paddingTop: 8,
    paddingBottom: 16,
  },
  // BENTO ROW (HOME SCREEN)
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
  // 4 CARD NAVIGASI CEPAT HOME
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
    width: '100%',
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
