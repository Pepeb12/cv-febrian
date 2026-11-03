/**
 * PERSONAL_PHOTOS CONFIGURATION
 * 
 * Konfigurasi Foto Diri untuk Galeri Auto-Scrolling Kiri & Kanan (3-Zona Layout).
 * Anda dapat dengan mudah mengganti require('../assets/...') atau URL foto di bawah ini.
 */

export interface PersonalPhotoItem {
  id: string;
  title: string;
  caption: string;
  source: any;
  tag: string;
}

export interface PersonalPhotosConfig {
  leftPhotos: PersonalPhotoItem[];
  rightPhotos: PersonalPhotoItem[];
}

export const PERSONAL_PHOTOS: PersonalPhotosConfig = {
  // Sisi Kiri (Auto-scroll bergerak ke ATAS)
  leftPhotos: [
    {
      id: 'photo-1',
      title: 'Formal / Almamater',
      caption: 'Jas Almamater Masoem University',
      source: require('../assets/profile.png'),
      tag: 'Formal',
    },
    {
      id: 'photo-2',
      title: 'Aktivitas Coding / Lab',
      caption: 'Riset Sistem & Lab Komputer',
      source: {
        uri: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80',
      },
      tag: 'Lab RPL',
    },
    {
      id: 'photo-3',
      title: 'Diskusi Tim & Riset',
      caption: 'Kolaborasi Proyek HIMASI',
      source: {
        uri: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80',
      },
      tag: 'Diskusi Tim',
    },
    {
      id: 'photo-4',
      title: 'Presentasi Proyek',
      caption: 'Showcase Solusi Mobile',
      source: {
        uri: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80',
      },
      tag: 'Presentasi',
    },
  ],

  // Sisi Kanan (Auto-scroll bergerak ke BAWAH)
  rightPhotos: [
    {
      id: 'photo-5',
      title: 'Kegiatan Organisasi',
      caption: 'Divisi Teknologi HIMASI',
      source: {
        uri: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=600&q=80',
      },
      tag: 'HIMASI',
    },
    {
      id: 'photo-6',
      title: 'Hobi Musik / Studio',
      caption: 'Eksplorasi Gitar & Keyboard',
      source: {
        uri: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=600&q=80',
      },
      tag: 'Musik',
    },
    {
      id: 'photo-7',
      title: 'Eksplorasi UI/UX',
      caption: 'Prototype React Native & Web',
      source: {
        uri: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=600&q=80',
      },
      tag: 'UI/UX',
    },
    {
      id: 'photo-8',
      title: 'Potret Kasual Lapangan',
      caption: 'Aktivitas Luar Ruangan & Kampus',
      source: {
        uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      },
      tag: 'Kasual',
    },
  ],
};

export default PERSONAL_PHOTOS;
