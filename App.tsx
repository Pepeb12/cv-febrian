import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Platform,
  RefreshControl,
  useWindowDimensions,
} from 'react-native';
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
          onTabChange={scrollToSection}
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
                onContactClick={() => scrollToSection('contact')}
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
                onScrollToContact={() => scrollToSection('contact')}
              />
            </View>

            {/* SECTION 4: FOOTER IDENTITAS MAHASISWA & MASOEM UNIVERSITY */}
            <CosmicFooter
              theme={theme}
              onNavigate={scrollToSection}
              onScrollToTop={() => scrollToSection('home')}
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
});
