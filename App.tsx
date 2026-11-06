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

// Data Lokal JSON (Bahasa Indonesia)
import profileData from './data/profil.json';
import academicData from './data/nilaiAkademik.json';

// Tema Dark Space & Cyan Glow
import { getTheme, SPACING } from './theme';

// Komponen Utama Sesuai Struktur UTS (Bahasa Indonesia)
import HeaderProfil from './components/HeaderProfil';
import TentangSaya from './components/TentangSaya';
import GaleriPortofolio from './components/GaleriPortofolio';
import NilaiAkademik from './components/NilaiAkademik';
import FormulirKontak from './components/FormulirKontak';

// Komponen Pendukung Navigasi & Tampilan (Bahasa Indonesia)
import BilahNavigasi, { TabKey } from './components/BilahNavigasi';
import FooterAplikasi from './components/FooterAplikasi';
import NotifikasiToast from './components/NotifikasiToast';
import AnimasiGlobal from './components/AnimasiGlobal';
import PenangananError from './components/PenangananError';

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

  const handleTabChange = (tab: TabKey) => {
    setActiveTab(tab);
    if (Platform.OS === 'web') {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
    scrollViewRef.current?.scrollTo({ y: 0, animated: false });
  };

  // Web Title & Scroll progress
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
        <AnimasiGlobal theme={theme} />

        {/* 1. STICKY TOP NAVBAR DENGAN LOGO TERANG / TEMA RAPI */}
        <BilahNavigasi
          activeTab={activeTab}
          onTabChange={handleTabChange}
          theme={theme}
          isDarkMode={isDarkMode}
          onToggleTheme={handleToggleTheme}
          scrollProgress={scrollProgress}
        />

        {/* 2. MAIN SCROLL CONTAINER DILINDUNGI PENANGANAN ERROR */}
        <PenangananError theme={theme}>
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
            {/* 1. HOME: CUKUP PROFIL SINGKAT */}
            {activeTab === 'home' && (
              <View style={styles.sectionBlock}>
                <HeaderProfil
                  data={profileData}
                  theme={theme}
                  onContactClick={() => handleTabChange('contact')}
                />
              </View>
            )}

            {/* 2. ABOUT: CUKUP INFORMASI PRIBADI & PENGALAMAN ORGANISASI */}
            {activeTab === 'about' && (
              <View style={styles.sectionBlock}>
                <TentangSaya
                  data={profileData}
                  theme={theme}
                  filterSection="about"
                />
              </View>
            )}

            {/* 3. SKILLS: CUKUP DAFTAR KETERAMPILAN & HOBI MUSIK */}
            {activeTab === 'skills' && (
              <View style={styles.sectionBlock}>
                <TentangSaya
                  data={profileData}
                  theme={theme}
                  filterSection="skills"
                />
              </View>
            )}

            {/* 4. PORTFOLIO: CUKUP DAFTAR PROYEK */}
            {activeTab === 'portfolio' && (
              <View style={styles.sectionBlock}>
                <GaleriPortofolio
                  portfolios={profileData.portfolios}
                  theme={theme}
                />
              </View>
            )}

            {/* 5. MY SCORE: CUKUP ACADEMIC DASHBOARD */}
            {activeTab === 'score' && (
              <View style={styles.sectionBlock}>
                <NilaiAkademik
                  data={academicData}
                  theme={theme}
                />
              </View>
            )}

            {/* 6. CONTACT: CUKUP FORMULIR KONTAK */}
            {activeTab === 'contact' && (
              <View style={styles.sectionBlock}>
                <FormulirKontak
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

            {/* SECTION 4: FOOTER IDENTITAS MAHASISWA & MASOEM UNIVERSITY */}
            <FooterAplikasi
              theme={theme}
              onNavigate={handleTabChange}
              onScrollToTop={() => handleTabChange('home')}
            />
          </View>
        </ScrollView>
        </PenangananError>

        {/* TOAST FEEDBACK NOTIFIKASI */}
        <NotifikasiToast
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
