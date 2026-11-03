/**
 * SIX_NAV_PHOTOS CONFIGURATION
 * 
 * 6 Foto Showcase yang diselaraskan secara tematik dengan 6 menu navigasi utama:
 * 1. homePhoto      -> Section 1: Home (Potret Utama Profesional / Jas Almamater)
 * 2. aboutPhoto     -> Section 2: About (Aktivitas Akademik / Kampus Universitas Ma'soem)
 * 3. skillsPhoto    -> Section 3: Skills (Suasana Workspace & Pengaturan Koding)
 * 4. portfolioPhoto -> Section 4: Portfolio (Analisis Proyek & Rekayasa Perangkat Lunak)
 * 5. myscorePhoto   -> Section 5: My Score (Top Scholar Achievement & Prestasi Akademik)
 * 6. contactPhoto   -> Section 6: Contact (Potret Kasual Profesional & Kolaborasi)
 */

export interface NavPhotoItem {
  id: string;
  source: any;
  title: string;
  subtitle: string;
  tag: string;
  alt: string;
}

export interface SixNavPhotosConfig {
  homePhoto: NavPhotoItem;
  aboutPhoto: NavPhotoItem;
  skillsPhoto: NavPhotoItem;
  portfolioPhoto: NavPhotoItem;
  myscorePhoto: NavPhotoItem;
  contactPhoto: NavPhotoItem;
}

export const SIX_NAV_PHOTOS: SixNavPhotosConfig = {
  // 1. HOME: Potret Utama Profesional
  homePhoto: {
    id: 'photo-home',
    source: require('../assets/profile.png'),
    title: 'Febrian Iradatul Rahman',
    subtitle: 'Potret Utama Profesional • Jas Almamater Masoem University',
    tag: 'PROFIL UTAMA',
    alt: 'Foto Profil Utama Profesional Febrian Iradatul Rahman',
  },

  // 2. ABOUT: Aktivitas Akademik Kampus
  aboutPhoto: {
    id: 'photo-about',
    source: {
      uri: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=80',
    },
    title: 'Aktivitas Akademik Kampus',
    subtitle: 'Eksplorasi Laboratorium & Riset Sistem Informasi • Masoem University',
    tag: 'AKADEMIK & RISET',
    alt: 'Suasana Riset Akademik dan Laboratorium Komputer Masoem University',
  },

  // 3. SKILLS: Suasana Workspace Koding
  skillsPhoto: {
    id: 'photo-skills',
    source: {
      uri: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1000&q=80',
    },
    title: 'Suasana Workspace Koding',
    subtitle: 'Arsitektur Clean Code, Mobile Development & UI/UX Engineering',
    tag: 'WORKSPACE KODING',
    alt: 'Setup Workspace Rekayasa Perangkat Lunak dan Koding React Native',
  },

  // 4. PORTFOLIO: Analisis Proyek Rekayasa Perangkat Lunak
  portfolioPhoto: {
    id: 'photo-portfolio',
    source: {
      uri: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1000&q=80',
    },
    title: 'Analisis Proyek & Rekayasa Perangkat Lunak',
    subtitle: 'Perancangan Solusi Terintegrasi (SIMAK Mobile, Web & Database)',
    tag: 'SHOWCASE PROYEK',
    alt: 'Preview Mockup Analisis dan Perancangan Aplikasi Sistem Informasi',
  },

  // 5. MY SCORE: Top Scholar Achievement
  myscorePhoto: {
    id: 'photo-myscore',
    source: {
      uri: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1000&q=80',
    },
    title: 'Top Scholar Achievement',
    subtitle: 'Nilai UTS 90/100 (Grade A) • 19.000 Learning Points Terverifikasi',
    tag: 'PRESTASI AKADEMIK',
    alt: 'Dokumentasi Prestasi Akademik Pemrograman Mobile 2 Nilai 90 Grade A',
  },

  // 6. CONTACT: Potret Kasual Profesional & Kolaborasi
  contactPhoto: {
    id: 'photo-contact',
    source: {
      uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=80',
    },
    title: 'Potret Kasual Profesional',
    subtitle: 'Keterbukaan Kolaborasi & Komunikasi Terbuka • Jatinangor, Jabar',
    tag: 'KOLABORASI',
    alt: 'Potret Kasual Ramah Keterbukaan Kolaborasi dan Jejaring Profesional',
  },
};

export default SIX_NAV_PHOTOS;
