/**
 * SECTION_IMAGES CONFIGURATION
 * 
 * Objek konfigurasi terpusat untuk 6 Slot Gambar Eksklusif aplikasi
 * Personal CV & Academic Score (Febrian Iradatul Rahman).
 * Anda dapat dengan mudah mengganti URL atau file lokal di bawah ini.
 */

export interface SectionImageConfig {
  id: string;
  source: any; // require('../assets/...') atau { uri: 'https://...' }
  title: string;
  subtitle: string;
  badge: string;
  alt: string;
  description?: string;
}

export const SECTION_IMAGES: Record<string, SectionImageConfig> = {
  // 1. GAMBAR_1_HOME: Foto Profil Hero
  GAMBAR_1_HOME: {
    id: 'gambar-1-home',
    source: require('../assets/profile.png'),
    title: 'Febrian Iradatul Rahman',
    subtitle: 'Mahasiswa S1 Sistem Informasi • Masoem University',
    badge: 'AKTIF • SMT 5',
    alt: 'Foto Profil Resmi Febrian Iradatul Rahman',
    description: 'Mahasiswa semester 5 Sistem Informasi yang berfokus pada pengembangan React Native dan rekayasa UI/UX.',
  },

  // 2. GAMBAR_2_ABOUT: Foto Aktivitas Kampus / Workspace Editorial
  GAMBAR_2_ABOUT: {
    id: 'gambar-2-about',
    source: {
      uri: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=80',
    },
    title: 'Systems Information Journey',
    subtitle: 'Masoem University • Laboratorium & Riset Perangkat Lunak',
    badge: 'Editorial Masoem',
    alt: 'Suasana Riset dan Kolaborasi Akademik Sistem Informasi',
    description: 'Aktivitas akademik dan eksplorasi arsitektur sistem informasi di Masoem University.',
  },

  // 3. GAMBAR_3_SKILLS: Foto Eksplorasi Musik & Creative Setup
  GAMBAR_3_SKILLS: {
    id: 'gambar-3-skills',
    source: {
      uri: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1000&q=80',
    },
    title: 'Creative Workspace & Music Exploration',
    subtitle: 'Harmoni Logika Rekayasa & Ritme Musik (Gitar, Keyboard, Drum)',
    badge: 'Creative Balance',
    alt: 'Setup Kreatif Eksplorasi Musik dan Koding',
    description: 'Keseimbangan kreativitas antara ketepatan logika komputasi dan ekspresi ritmis musik instrumental.',
  },

  // 4. GAMBAR_4_PORTFOLIO: Featured Project Spotlight Banner
  GAMBAR_4_PORTFOLIO: {
    id: 'gambar-4-portfolio',
    source: {
      uri: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1200&q=80',
    },
    title: 'Masoem Mobile & Academic Systems',
    subtitle: 'Integrated Cross-Platform Ecosystem (React Native & SQL)',
    badge: '★ KARYA UNGGULAN (FEATURED SPOTLIGHT)',
    alt: 'Preview Mockup Aplikasi Mobile & Sistem Informasi',
    description: 'Showcase solusi rekayasa sistem terintegrasi: SIMAK Mobile, manajemen inventaris, dan UI/UX interaktif.',
  },

  // 5. GAMBAR_5_MYSCORE: Foto/Ilustrasi Pencapaian Akademik
  GAMBAR_5_MYSCORE: {
    id: 'gambar-5-myscore',
    source: {
      uri: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1000&q=80',
    },
    title: 'Academic Excellence & Verified Grade A',
    subtitle: 'Capaian 90/100 • 19.000 Learning Points',
    badge: 'Grade A • 90/100 • Verified Achievement',
    alt: 'Capaian Prestasi Akademik Pemrograman Mobile 2',
    description: 'Dokumentasi komitmen belajar berkelanjutan, konsistensi kehadiran 100%, dan evaluasi komprehensif.',
  },

  // 6. GAMBAR_6_CONTACT: Banner Visual Kolaborasi / Estetika Lokasi
  GAMBAR_6_CONTACT: {
    id: 'gambar-6-contact',
    source: {
      uri: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1000&q=80',
    },
    title: 'Open for Collaboration & Systems Engineering',
    subtitle: 'Jatinangor - Cicalengka, Jawa Barat • Siap Berkolaborasi',
    badge: 'Let’s Connect',
    alt: 'Visual Kolaborasi Profesional dan Diskusi Rekayasa Sistem',
    description: 'Terbuka untuk diskusi proyek pengembangan aplikasi mobile, riset akademik, dan kerja sama teknologi.',
  },
};

export default SECTION_IMAGES;
