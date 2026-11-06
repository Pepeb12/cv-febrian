import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
  RefreshControl,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
} from '@expo-google-fonts/inter';

// Data Lokal JSON 
import profileData from './data/profile.json';
import academicData from './data/academicScore.json';

// Tema Dark Space & Cyan Glow
import { getTheme, SPACING } from './theme';

// Komponen Utama Sesuai Struktur UTS (Level 1 s.d. Level 10)
import ProfileHeader from './components/ProfileHeader';
import AboutSection from './components/AboutSection';
import PortfolioGallery from './components/PortfolioGallery';
import MyScoreSection from './components/MyScoreSection';
import ContactForm from './components/ContactForm';

// Komponen Pendukung Navigasi & Tampilan
import NavigationTabBar, { TabKey } from './components/NavigationTabBar';
import CosmicFooter from './components/CosmicFooter';
import FeedbackToast from './components/FeedbackToast';
import GlobalAnimations from './components/GlobalAnimations';
import ErrorBoundary from './components/ErrorBoundary';
import Level10Showcase from './components/Level10Showcase';

export default function App() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const isLaptop = width >= 1024 && width < 1280;

  // Responsive desktop wide layout:
  // Desktop wide (>= 1280px): 92%
  // Laptop (1024 - 1279px): 94%
  // Tablet (768 - 1023px): 95%
  // Mobile (< 768px): 100%
  const containerWidthPercent = isMobile
    ? '100%'
    : isTablet
    ? '95%'
    : isLaptop
    ? '94%'
    : '92%';

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
  });

  const [isDarkMode, setIsDarkMode] = useState(true);
  const theme = getTheme(isDarkMode);

  const [activeTab, setActiveTab] = useState<TabKey>('home');
  const [viewMode, setViewMode] = useState<'screen' | 'continuous'>('screen');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'warning' } | null>(null);

  const scrollViewRef = useRef<any>(null);
  const sectionPositions = useRef<{ [key: string]: number }>({});
  const skillsRelYRef = useRef(350);
  const isManualScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<any>(null);

  const registerSection = (key: string, y: number) => {
    sectionPositions.current[key] = Math.max(0, y - 72);
  };

  const scrollToSection = (tab: TabKey) => {
    setActiveTab(tab);
    isManualScrollingRef.current = true;

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    // Lock scroll spy briefly during direct transition
    scrollTimeoutRef.current = setTimeout(() => {
      isManualScrollingRef.current = false;
    }, 200);

    if (Platform.OS === 'web') {
      if (tab === 'home') {
        const homeEl = document.getElementById('section-home');
        if (homeEl) {
          homeEl.classList.add('revealed');
          homeEl.scrollIntoView({ behavior: 'instant', block: 'start' });
        } else {
          window.scrollTo(0, 0);
        }
        return;
      }

      // Find the target element
      const targetElement =
        document.getElementById(`section-${tab}`) ||
        document.querySelector(`[data-testid="section-${tab}"]`) ||
        document.querySelector(`[id*="${tab}"]`);

      if (targetElement) {
        // Immediately reveal target section so it is completely visible without delay
        targetElement.classList.add('revealed');
        const children = targetElement.querySelectorAll(
          '.scroll-reveal, .fade-in-up, .scale-fade, .slide-up, .fade-in-left, .fade-in-right'
        );
        children.forEach((c) => c.classList.add('revealed'));

        // Instant scroll direct to target section
        targetElement.scrollIntoView({ behavior: 'instant', block: 'start' });
        return;
      }
    }

    const y = tab === 'home' ? 0 : sectionPositions.current[tab] ?? 0;
    scrollViewRef.current?.scrollTo({ y, animated: false });
  };

  const handleTabChange = (tab: TabKey) => {
    setActiveTab(tab);
    if (viewMode === 'screen') {
      if (Platform.OS === 'web') {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
      scrollViewRef.current?.scrollTo({ y: 0, animated: false });
    } else {
      scrollToSection(tab);
    }
  };

  // Web Title & Scroll listener
  useEffect(() => {
    if (Platform.OS !== 'web') return;

    // Set judul tab browser resmi
    document.title = 'CV FEBRIAN';

    const handleWebScroll = () => {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setScrollProgress(scrollY / docHeight);
      }

      // Do not overwrite activeTab while smooth scrolling from user click
      if (isManualScrollingRef.current) return;

      // At top of page (scrollY <= 80), always activate home
      if (scrollY <= 80) {
        setActiveTab('home');
        return;
      }

      // Reached bottom of document
      if (window.innerHeight + scrollY >= document.documentElement.scrollHeight - 50) {
        setActiveTab('contact');
        return;
      }

      const sectionOrder: TabKey[] = ['contact', 'score', 'portfolio', 'skills', 'about'];
      const triggerY = isMobile ? 180 : 160;

      for (const key of sectionOrder) {
        const el = document.getElementById(`section-${key}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Active if top has entered viewport threshold and bottom is still visible
          if (rect.top <= triggerY && rect.bottom > 80) {
            setActiveTab(key);
            return;
          }
        }
      }

      setActiveTab('home');
    };

    window.addEventListener('scroll', handleWebScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleWebScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  const handleScroll = (event: any) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    const currentY = contentOffset.y;
    const maxScroll = contentSize.height - layoutMeasurement.height;
    if (maxScroll > 0) {
      setScrollProgress(currentY / maxScroll);
    }

    if (isManualScrollingRef.current) return;

    if (currentY <= 80) {
      setActiveTab('home');
      return;
    }

    // Update active tab based on scroll position
    const contactY = sectionPositions.current['contact'] || 2800;
    const scoreY = sectionPositions.current['score'] || 2200;
    const portfolioY = sectionPositions.current['portfolio'] || 1600;
    const skillsY = sectionPositions.current['skills'] || 700;
    const aboutY = sectionPositions.current['about'] || 350;

    if (currentY >= contactY - 120) {
      setActiveTab('contact');
    } else if (currentY >= scoreY - 120) {
      setActiveTab('score');
    } else if (currentY >= portfolioY - 120) {
      setActiveTab('portfolio');
    } else if (currentY >= skillsY - 120) {
      setActiveTab('skills');
    } else if (currentY >= aboutY - 120) {
      setActiveTab('about');
    } else {
      setActiveTab('home');
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      setToast({ message: 'Data profil Febrian berhasil diperbarui.', type: 'info' });
    }, 600);
  };

  const handleToggleTheme = () => {
    setIsDarkMode((prev) => !prev);
    setToast({
      message: isDarkMode ? 'Beralih ke Mode Terang (Light Mode)' : 'Beralih ke Mode Gelap (Dark Mode)',
      type: 'info',
    });
  };

  if (!fontsLoaded) {
    return <View style={[styles.loadingContainer, { backgroundColor: '#25191D' }]} />;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={[styles.rootContainer, { backgroundColor: theme.background }]}
        edges={['top', 'left', 'right']}
      >
        <StatusBar style={isDarkMode ? 'light' : 'dark'} />

        {/* SISTEM ANIMASI, GOOGLE FONTS & MICRO-INTERACTIONS */}
        <GlobalAnimations theme={theme} />

        {/* 1. STICKY TOP NAVBAR DENGAN LOGO TERANG / TEMA RAPI */}
        <NavigationTabBar
          activeTab={activeTab}
          onTabChange={handleTabChange}
          theme={theme}
          isDarkMode={isDarkMode}
          onToggleTheme={handleToggleTheme}
          scrollProgress={scrollProgress}
        />

        {/* 2. MAIN SCROLL CONTAINER DILINDUNGI ERROR BOUNDARY */}
        <ErrorBoundary theme={theme}>
          <ScrollView
            ref={scrollViewRef}
          style={styles.scrollView}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingHorizontal: isMobile ? 12 : isTablet ? 18 : 24 },
          ]}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor={theme.accent}
              colors={[theme.accent]}
            />
          }
        >
          {/* SATU CONTAINER UTAMA MAX-WIDTH SIMETRIS & TERPUSAT (MAX-WIDTH 1150PX) */}
          <View style={[styles.mainContentWrapper, { width: containerWidthPercent as any }]}>
            {/* VIEW MODE TOGGLE PILL: MULTI-SCREEN (PER LAYAR) VS SEMUA HALAMAN (SCROLL) */}
            <View style={[styles.viewModeBanner, { backgroundColor: theme.surface, borderColor: theme.border }]}>
              <View style={styles.viewModeHeaderLeft}>
                <Ionicons name="layers" size={16} color={theme.accent} />
                <Text style={[styles.viewModeTitle, { color: theme.heading }]}>
                  Navigasi Level 9:
                </Text>
                <Text style={[styles.viewModeSubtitle, { color: theme.textSecondary }]}>
                  {viewMode === 'screen' ? 'Multi-Screen (Halaman Terpisah)' : 'Continuous Scroll (Semua Halaman)'}
                </Text>
              </View>
              <View style={[styles.viewModeSegment, { backgroundColor: theme.surface2, borderColor: theme.border }]}>
                <TouchableOpacity
                  style={[
                    styles.segmentBtn,
                    viewMode === 'screen' && { backgroundColor: theme.primary },
                  ]}
                  onPress={() => {
                    setViewMode('screen');
                    if (Platform.OS === 'web') window.scrollTo({ top: 0, behavior: 'instant' });
                    scrollViewRef.current?.scrollTo({ y: 0, animated: false });
                    setToast({ message: 'Mode Multi-Screen Aktif: Menampilkan halaman sesuai tab yang dipilih.', type: 'info' });
                  }}
                  activeOpacity={0.8}
                >
                  <Ionicons
                    name="albums-outline"
                    size={13}
                    color={viewMode === 'screen' ? (theme.isDark ? '#25191D' : '#FFFFFF') : theme.textSecondary}
                  />
                  <Text
                    style={[
                      styles.segmentBtnText,
                      {
                        color: viewMode === 'screen' ? (theme.isDark ? '#25191D' : '#FFFFFF') : theme.textSecondary,
                        fontWeight: viewMode === 'screen' ? '700' : '500',
                      },
                    ]}
                  >
                    Halaman Terpisah
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.segmentBtn,
                    viewMode === 'continuous' && { backgroundColor: theme.primary },
                  ]}
                  onPress={() => {
                    setViewMode('continuous');
                    setToast({ message: 'Mode Semua Halaman Aktif: Menampilkan seluruh seksi dalam satu halaman panjang.', type: 'info' });
                  }}
                  activeOpacity={0.8}
                >
                  <Ionicons
                    name="document-text-outline"
                    size={13}
                    color={viewMode === 'continuous' ? (theme.isDark ? '#25191D' : '#FFFFFF') : theme.textSecondary}
                  />
                  <Text
                    style={[
                      styles.segmentBtnText,
                      {
                        color: viewMode === 'continuous' ? (theme.isDark ? '#25191D' : '#FFFFFF') : theme.textSecondary,
                        fontWeight: viewMode === 'continuous' ? '700' : '500',
                      },
                    ]}
                  >
                    Semua Halaman
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {viewMode === 'screen' ? (
              /* ================= MODE MULTI-SCREEN (PER LAYAR / HALAMAN SESUAI DIAGRAM) ================= */
              <View style={{ width: '100%', gap: 20 }}>
                {activeTab === 'home' && (
                  <View style={styles.sectionBlock}>
                    <View style={[styles.screenTitleBanner, { backgroundColor: theme.surface, borderColor: theme.border }]}>
                      <Ionicons name="home" size={16} color={theme.accent} />
                      <Text style={[styles.screenTitleText, { color: theme.heading }]}>
                        Halaman 1: Home — Profil Singkat
                      </Text>
                      <Text style={[styles.screenTitleBadge, { color: theme.primary, borderColor: theme.border, backgroundColor: theme.surface2 }]}>
                        Level 9 Multi-Screen
                      </Text>
                    </View>
                    <ProfileHeader
                      data={profileData}
                      theme={theme}
                      onContactClick={() => handleTabChange('contact')}
                    />

                    {/* Home Quick Explore Directory */}
                    <View style={[styles.homeQuickNavCard, { backgroundColor: theme.surface, borderColor: theme.border }]}>
                      <View style={styles.quickNavHeader}>
                        <Ionicons name="compass-outline" size={18} color={theme.accent} />
                        <Text style={[styles.quickNavTitle, { color: theme.heading }]}>
                          Navigasi Cepat Halaman CV Lainnya
                        </Text>
                      </View>
                      <Text style={[styles.quickNavDesc, { color: theme.textSecondary }]}>
                        Klik kartu di bawah atau pilih menu tab di header untuk membuka halaman yang diinginkan secara instan:
                      </Text>
                      <View style={styles.quickNavGrid}>
                        {[
                          { key: 'about', label: 'About', sub: 'Informasi Pribadi & Pengalaman', icon: 'person-outline' },
                          { key: 'skills', label: 'Skills', sub: 'Daftar Keterampilan & Hobi Musik', icon: 'code-slash-outline' },
                          { key: 'portfolio', label: 'Portfolio', sub: '3 Portofolio Web & Mobile', icon: 'briefcase-outline' },
                          { key: 'score', label: 'My Score', sub: 'Nilai 90 (A) & 19.000 LP', icon: 'school-outline' },
                          { key: 'contact', label: 'Contact', sub: 'Formulir Kontak Langsung', icon: 'mail-outline' },
                        ].map((item) => (
                          <TouchableOpacity
                            key={item.key}
                            style={[styles.quickNavItem, { backgroundColor: theme.surface2, borderColor: theme.border }]}
                            onPress={() => handleTabChange(item.key as TabKey)}
                            activeOpacity={0.75}
                          >
                            <View style={[styles.quickNavIconBox, { backgroundColor: theme.surface, borderColor: theme.border }]}>
                              <Ionicons name={item.icon as any} size={18} color={theme.primary} />
                            </View>
                            <View style={{ flex: 1 }}>
                              <Text style={[styles.quickNavItemLabel, { color: theme.heading }]}>{item.label}</Text>
                              <Text style={[styles.quickNavItemSub, { color: theme.textSecondary }]} numberOfLines={1}>{item.sub}</Text>
                            </View>
                            <Ionicons name="chevron-forward" size={16} color={theme.textMuted} />
                          </TouchableOpacity>
                        ))}
                      </View>
                    </View>
                  </View>
                )}

                {activeTab === 'about' && (
                  <View style={styles.sectionBlock}>
                    <View style={[styles.screenTitleBanner, { backgroundColor: theme.surface, borderColor: theme.border }]}>
                      <Ionicons name="person" size={16} color={theme.accent} />
                      <Text style={[styles.screenTitleText, { color: theme.heading }]}>
                        Halaman 2: About — Informasi Pribadi & Pengalaman
                      </Text>
                      <Text style={[styles.screenTitleBadge, { color: theme.primary, borderColor: theme.border, backgroundColor: theme.surface2 }]}>
                        Level 9 Multi-Screen
                      </Text>
                    </View>
                    <AboutSection
                      data={profileData}
                      theme={theme}
                      filterSection="about"
                    />
                  </View>
                )}

                {activeTab === 'skills' && (
                  <View style={styles.sectionBlock}>
                    <View style={[styles.screenTitleBanner, { backgroundColor: theme.surface, borderColor: theme.border }]}>
                      <Ionicons name="code-slash" size={16} color={theme.accent} />
                      <Text style={[styles.screenTitleText, { color: theme.heading }]}>
                        Halaman 3: Skills — Daftar Keterampilan & Hobi Musik
                      </Text>
                      <Text style={[styles.screenTitleBadge, { color: theme.primary, borderColor: theme.border, backgroundColor: theme.surface2 }]}>
                        Level 9 Multi-Screen
                      </Text>
                    </View>
                    <AboutSection
                      data={profileData}
                      theme={theme}
                      filterSection="skills"
                    />
                  </View>
                )}

                {activeTab === 'portfolio' && (
                  <View style={styles.sectionBlock}>
                    <View style={[styles.screenTitleBanner, { backgroundColor: theme.surface, borderColor: theme.border }]}>
                      <Ionicons name="briefcase" size={16} color={theme.accent} />
                      <Text style={[styles.screenTitleText, { color: theme.heading }]}>
                        Halaman 4: Portfolio — Daftar Proyek Unggulan
                      </Text>
                      <Text style={[styles.screenTitleBadge, { color: theme.primary, borderColor: theme.border, backgroundColor: theme.surface2 }]}>
                        Level 9 Multi-Screen
                      </Text>
                    </View>
                    <PortfolioGallery
                      portfolios={profileData.portfolios}
                      theme={theme}
                    />
                  </View>
                )}

                {activeTab === 'score' && (
                  <View style={styles.sectionBlock}>
                    <View style={[styles.screenTitleBanner, { backgroundColor: theme.surface, borderColor: theme.border }]}>
                      <Ionicons name="school" size={16} color={theme.accent} />
                      <Text style={[styles.screenTitleText, { color: theme.heading }]}>
                        Halaman 5: My Score — Academic Dashboard & Capaian Belajar
                      </Text>
                      <Text style={[styles.screenTitleBadge, { color: theme.primary, borderColor: theme.border, backgroundColor: theme.surface2 }]}>
                        Level 9 Multi-Screen
                      </Text>
                    </View>
                    <MyScoreSection
                      data={academicData}
                      theme={theme}
                    />
                  </View>
                )}

                {activeTab === 'contact' && (
                  <View style={styles.sectionBlock}>
                    <View style={[styles.screenTitleBanner, { backgroundColor: theme.surface, borderColor: theme.border }]}>
                      <Ionicons name="mail" size={16} color={theme.accent} />
                      <Text style={[styles.screenTitleText, { color: theme.heading }]}>
                        Halaman 6: Contact — Formulir Kontak & Media Sosial
                      </Text>
                      <Text style={[styles.screenTitleBadge, { color: theme.primary, borderColor: theme.border, backgroundColor: theme.surface2 }]}>
                        Level 9 Multi-Screen
                      </Text>
                    </View>
                    <ContactForm
                      data={profileData}
                      recipientName={profileData.nama}
                      theme={theme}
                      onMessageSent={() =>
                        setToast({
                          message: 'Pesan Anda berhasil dikirim ke Febrian!',
                          type: 'success',
                        })
                      }
                    />
                  </View>
                )}
              </View>
            ) : (
              /* ================= MODE CONTINUOUS SCROLL (SEMUA HALAMAN SEKALIGUS) ================= */
              <View style={{ width: '100%', gap: 28 }}>
                {/* SECTION 1: PROFILE HEADER (LEVEL 1 & LEVEL 2) */}
                <View
                  nativeID="section-home"
                  testID="section-home"
                  {...(Platform.OS === 'web' ? { id: 'section-home', 'data-section': 'home', className: 'scroll-reveal fade-in-up' } : {})}
                  onLayout={(e) => registerSection('home', e.nativeEvent.layout.y)}
                  style={[
                    styles.sectionBlock,
                    { ...Platform.select({ web: { scrollMarginTop: isMobile ? 92 : 85 } as any }) },
                  ]}
                >
                  <ProfileHeader
                    data={profileData}
                    theme={theme}
                    onContactClick={() => handleTabChange('contact')}
                  />
                </View>

                {/* SECTION 2: ABOUT, SKILLS & EDUCATION (LEVEL 2, 3, 5, 6) */}
                <View
                  nativeID="section-about"
                  testID="section-about"
                  {...(Platform.OS === 'web' ? { id: 'section-about', 'data-section': 'about', className: 'scroll-reveal fade-in-up' } : {})}
                  onLayout={(e) => {
                    const y = e.nativeEvent.layout.y;
                    registerSection('about', y);
                    sectionPositions.current['skills'] = y + skillsRelYRef.current;
                  }}
                  style={[
                    styles.sectionBlock,
                    { ...Platform.select({ web: { scrollMarginTop: isMobile ? 92 : 85 } as any }) },
                  ]}
                >
                  <AboutSection
                    data={profileData}
                    theme={theme}
                    filterSection="all"
                    onLayoutSkills={(skillRelY) => {
                      skillsRelYRef.current = skillRelY;
                      const aboutBaseY = sectionPositions.current['about'] || 350;
                      registerSection('skills', aboutBaseY + skillRelY);
                    }}
                  />
                </View>

                {/* SECTION 3: PORTFOLIO GALLERY (LEVEL 7 — ADVANCED) */}
                <View
                  nativeID="section-portfolio"
                  testID="section-portfolio"
                  {...(Platform.OS === 'web' ? { id: 'section-portfolio', 'data-section': 'portfolio', className: 'scroll-reveal fade-in-up' } : {})}
                  onLayout={(e) => registerSection('portfolio', e.nativeEvent.layout.y)}
                  style={[
                    styles.sectionBlock,
                    { ...Platform.select({ web: { scrollMarginTop: isMobile ? 92 : 85 } as any }) },
                  ]}
                >
                  <PortfolioGallery
                    portfolios={profileData.portfolios}
                    theme={theme}
                  />
                </View>

                {/* SECTION 4: MY SCORE ACADEMIC DASHBOARD (LEVEL 8 — EXPERT) */}
                <View
                  nativeID="section-score"
                  testID="section-score"
                  {...(Platform.OS === 'web' ? { id: 'section-score', 'data-section': 'score', className: 'scroll-reveal fade-in-up' } : {})}
                  onLayout={(e) => registerSection('score', e.nativeEvent.layout.y)}
                  style={[
                    styles.sectionBlock,
                    { ...Platform.select({ web: { scrollMarginTop: isMobile ? 92 : 85 } as any }) },
                  ]}
                >
                  <MyScoreSection
                    data={academicData}
                    theme={theme}
                  />
                </View>

                {/* SECTION 5: CONTACT FORM & CHANNELS (LEVEL 4, 5, 10) */}
                <View
                  nativeID="section-contact"
                  testID="section-contact"
                  {...(Platform.OS === 'web' ? { id: 'section-contact', 'data-section': 'contact', className: 'scroll-reveal fade-in-up' } : {})}
                  onLayout={(e) => registerSection('contact', e.nativeEvent.layout.y)}
                  style={[
                    styles.sectionBlock,
                    { ...Platform.select({ web: { scrollMarginTop: isMobile ? 92 : 85 } as any }) },
                  ]}
                >
                  <ContactForm
                    data={profileData}
                    recipientName={profileData.nama}
                    theme={theme}
                    onMessageSent={() =>
                      setToast({
                        message: 'Pesan Anda berhasil dikirim ke Febrian!',
                        type: 'success',
                      })
                    }
                  />
                </View>

                {/* SECTION 6: LEVEL 10 — PRODUCTION & INDUSTRY SHOWCASE */}
                <View
                  nativeID="section-level10"
                  testID="section-level10"
                  {...(Platform.OS === 'web' ? { id: 'section-level10', 'data-section': 'level10', className: 'scroll-reveal fade-in-up' } : {})}
                  onLayout={(e) => registerSection('level10', e.nativeEvent.layout.y)}
                  style={[
                    styles.sectionBlock,
                    { ...Platform.select({ web: { scrollMarginTop: isMobile ? 92 : 85 } as any }) },
                  ]}
                >
                  <Level10Showcase
                    theme={theme}
                    isDarkMode={isDarkMode}
                    onToggleTheme={handleToggleTheme}
                    onScrollToContact={() => handleTabChange('contact')}
                  />
                </View>
              </View>
            )}

            {/* LEVEL 10 SHOWCASE MODAL / STRIP IN SCREEN MODE */}
            {viewMode === 'screen' && (
              <View style={[styles.sectionBlock, { marginTop: 12 }]}>
                <Level10Showcase
                  theme={theme}
                  isDarkMode={isDarkMode}
                  onToggleTheme={handleToggleTheme}
                  onScrollToContact={() => handleTabChange('contact')}
                />
              </View>
            )}

            {/* SECTION 4: FOOTER IDENTITAS MAHASISWA & MASOEM UNIVERSITY */}
            <CosmicFooter
              theme={theme}
              onNavigate={handleTabChange}
              onScrollToTop={() => handleTabChange('home')}
            />
          </View>
        </ScrollView>
        </ErrorBoundary>

        {/* TOAST FEEDBACK NOTIFIKASI */}
        <FeedbackToast
          message={toast?.message}
          type={toast?.type}
          onDismiss={() => setToast(null)}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 48,
  },
  mainContentWrapper: {
    maxWidth: 1150,
    gap: 28,
  },
  sectionBlock: {
    width: '100%',
  },
  viewModeBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 14,
    borderWidth: 1,
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 4,
  },
  viewModeHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  viewModeTitle: {
    fontSize: 13,
    fontWeight: '700',
  },
  viewModeSubtitle: {
    fontSize: 12,
  },
  viewModeSegment: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    padding: 3,
    borderWidth: 1,
    gap: 4,
  },
  segmentBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    gap: 6,
  },
  segmentBtnText: {
    fontSize: 11.5,
  },
  homeQuickNavCard: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 20,
    gap: 14,
    marginTop: 18,
  },
  quickNavHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  quickNavTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  quickNavDesc: {
    fontSize: 13,
    lineHeight: 19,
  },
  quickNavGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickNavItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
    gap: 12,
    flex: 1,
    minWidth: 260,
  },
  quickNavIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickNavItemLabel: {
    fontSize: 13.5,
    fontWeight: '700',
  },
  quickNavItemSub: {
    fontSize: 11.5,
  },
  screenTitleBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 14,
    borderWidth: 1,
    gap: 10,
    marginBottom: 16,
  },
  screenTitleText: {
    fontSize: 16,
    fontWeight: '700',
  },
  screenTitleBadge: {
    fontSize: 11,
    fontWeight: '600',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    marginLeft: 'auto',
  },
});
