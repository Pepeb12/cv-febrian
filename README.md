# Personal CV & Academic Score App — UTS Pemrograman Mobile

Aplikasi mobile representasi digital profil mahasiswa yang menggabungkan personal branding, identitas diri, portofolio, dan capaian akademik berbasis **React Native** dan **Expo**.

---

## 👤 Identitas Mahasiswa

| Informasi | Detail |
|---|---|
| **Nama Lengkap** | Febrian Iradatul Rahman |
| **NIM** | **242505024** |
| **Program Studi** | Sistem Informasi |
| **Semester** | 5 |
| **Perguruan Tinggi** | Masoem University |
| **Profesi / Minat Utama** | **Junior Systems Analyst & Mobile App Developer** |
| **Alamat** | Kp Babakan Stasiun Cicalengka, Kec. Cicalengka, Kab. Bandung |

---

## 🎯 Evaluasi Challenge Level (Lengkap Level 1 s.d. Level 7)

### LEVEL 1 — NOVICE (Status: ✅ Selesai)
- [x] **NIM Mahasiswa**: Ditampilkan jelas dengan badge khusus (`242505024`).
- [x] **Nama Lengkap**: `Febrian Iradatul Rahman` dengan tipografi tegas.
- [x] **Foto Profil**: Foto profesional berbingkai circular (`assets/profile.png`) dengan status online aktif.
- [x] **Aplikasi Berjalan**: Berjalan lancar di Web browser dan perangkat Android via Expo Go.

### LEVEL 2 — BEGINNER (Status: ✅ Selesai)
- [x] **Seluruh Persyaratan Level 1**: Dipertahankan secara utuh dan terintegrasi rapi.
- [x] **Profesi / Bidang Minat**:
  - Profesi: *Junior Systems Analyst & Mobile App Developer*
  - 4 Bidang Minat Sistem Informasi: *Mobile App Dev*, *Systems Analysis*, *UI/UX Design*, dan *Database Management*.
- [x] **Deskripsi Singkat Personal Introduction**:
  - Ringkasan profil mahasiswa semester 5 prodi Sistem Informasi Masoem University.
  - Visi karir, motto hidup, dan 3 atribut keunggulan diri.
- [x] **Judul / Heading yang Sesuai**:
  - Implementasi komponen semantik `SectionHeading.js` dengan judul, subjudul, dan ikon visual.
- [x] **Materi P2 (JavaScript, JSX, Component)**:
  - ES6+ destructuring, array `.map()`, modular components.

### LEVEL 3 — ELEMENTARY (Status: ✅ Selesai)
- [x] **Layout Terstruktur & Visual Hierarchy**:
  - Tampilan CV terbagi dalam seksi-seksi terorganisasi (Header, Digital Student Card, Academic Metrics, Intro, Skills Matrix, Timeline Pendidikan, Grid Kontak).
- [x] **Design Tokens & Theme System**:
  - Pengaturan palet warna kampus Masoem (`COLORS`), tipografi (`TYPOGRAPHY`), jarak (`SPACING`), dan bayangan (`SHADOWS`) terpusat di `theme/index.js`.
- [x] **Flexbox & StyleSheet**:
  - Flex direction, alignment, wrap, grid 2-kolom, dan visual progress bar.
- [x] **Materi Utama: P4 — Layout dan Styling React Native**:
  - Model box layout flexbox dan responsivitas layar ponsel tanpa teks terpotong.

### LEVEL 4 — INTERMEDIATE (Status: ✅ Selesai)
- [x] **Penggunaan Props & State (`useState`)**:
  - Form input (`name`, `email`, `message`), validasi error (`errors`), data terkirim (`submittedData`), endorse counter (`endorseCount`, `isEndorsed`), dan filter kategori aktif (`selectedCategory`).
- [x] **Formulir Kontak (Nama, Email, Pesan)**:
  - Input form interaktif dengan validasi string kosong dan regex email.
- [x] **Respons Pemrosesan Formulir**:
  - Kartu notifikasi sukses berwarna hijau dengan timestamp waktu pengiriman.
- [x] **Materi Utama: P3 dan P5 — Props, State, Input Form, dan Event Handling**.

### LEVEL 5 — COMPETENT (Status: ✅ Selesai)
- [x] **Pemisahan Mutlak Data & UI (Zero Hardcoded Data)**:
  - Tidak ada data statis di dalam komponen visual.
- [x] **Aliran Data Melalui Props**:
  - `<ProfileHeader data={profileData} />`, `<AboutSection data={profileData} />`, `<ContactForm data={profileData} />`.
- [x] **Materi Utama: Component, Props, dan Pengorganisasian Kode**.

### LEVEL 6 — PROFICIENT (Status: ✅ Selesai)
- [x] **Penyimpanan Data Lokal Format `.json`**:
  - Data profil disimpan murni dalam berkas terpisah: [`data/profile.json`](file:///d:/UTS%20FEBRIAN/data/profile.json).
- [x] **Aplikasi Membaca & Menampilkan Data JSON Secara Langsung**:
  - Diimpor langsung pada file root `App.js`: `import profileData from './data/profile.json';`.
- [x] **Struktur Data JSON Valid**:
  - Sintaks JSON 100% valid dan lolos uji parsing `JSON.parse()`.
- [x] **Materi Utama: Pemisahan Data, Struktur JSON, dan Rendering Data**.

### LEVEL 7 — ADVANCED (Status: ✅ Selesai)
- [x] **Seluruh Persyaratan Level 6**: Dipertahankan secara menyeluruh.
- [x] **Galeri Portofolio Proyek Interaktif (Portfolio Gallery)**:
  - Menampilkan 4 portofolio riil mahasiswa sistem informasi (*Personal CV App*, *SIMAK Masoem*, *Mobile Student Hub UI/UX*, *Inventory Logistics Database*).
- [x] **Pencarian Real-Time & Filter Kategori Proyek**:
  - `TextInput` pencarian kata kunci langsung memfilter kartu proyek secara instan.
  - Filter chips kategori (*Semua, Mobile App, Web System, UI/UX Design, Database*).
- [x] **Eksplorasi Komponen Modal React Native**:
  - Dialog pop-up rincian proyek menggunakan komponen native `<Modal />` dengan animasi `slide`, backdrop transparan, rincian arsitektur software, dan daftar fitur utama.
- [x] **Fitur Theme Switcher (Dark Mode / Light Mode)**:
  - Tombol pengubah tema di header dengan transisi warna instan (latar belakang, kartu, teks, dan status bar).
- [x] **Experience Timeline (Organisasi & Kepemimpinan)**:
  - Menampilkan riwayat keaktifan di HIMASI Masoem University dan riset akademik dalam bentuk timeline vertikal berikon.
- [x] **Hobby & Personal Interests Section**:
  - Seksi hobi mahasiswa IT (Mobile App Tinkering, Tech Gadget, Chess, Photography) yang dimuat dinamis dari data JSON.
- [x] **Materi Utama: Dynamic Content & React Native Exploration**.

---

## 📁 Struktur Proyek (Level 7 Architecture)

```text
├── assets/
│   └── profile.png                 # Foto profil formal Febrian Iradatul Rahman
├── components/
│   ├── Header.js                   # Header institusi, Level 7 Badge, & Theme Toggle Button
│   ├── ProfileHeader.js            # Komponen Header Profil: <ProfileHeader data={profileData} />
│   ├── ProfileCard.js              # Kartu identitas adaptif tema
│   ├── PortfolioGallery.js         # [Level 7] Galeri proyek: Search, Filter, & Native Modal
│   ├── ExperienceTimeline.js       # [Level 7] Timeline riwayat organisasi & riset kampus
│   ├── HobbySection.js             # [Level 7] Seksi hobi & minat personal dari JSON
│   ├── AboutSection.js             # Komponen Tentang & Minat adaptif tema
│   ├── ContactForm.js              # Komponen Form Kontak adaptif tema
│   ├── ContactFormCard.js          # Logika form kontak, input state, dan validasi
│   ├── InteractiveEndorseBar.js    # Tombol rekomendasi/endorse
│   ├── MetricBar.js                # Bar statistik metrik akademik
│   ├── SectionHeading.js           # Reusable heading hierarkis adaptif tema
│   ├── SkillMatrixCard.js          # Progress bar keahlian dengan filter tabs
│   ├── IdentityDetailCard.js       # Timeline riwayat pendidikan & domisili alamat
│   ├── ContactGridCard.js          # Grid 2-kolom kontak interaktif
│   └── Level7CriteriaCard.js       # Checklist evaluasi kriteria Level 7
├── data/
│   ├── profile.json                # Data lokal murni: profil, portofolio, hobi, & pengalaman
│   └── profileData.js              # Bridge re-exporting data JSON
├── theme/
│   └── index.js                    # Dual-theme tokens (LIGHT_THEME & DARK_THEME, getTheme)
├── App.js                          # Root component: Theme Switcher & Level 7 state management
├── app.json                        # Konfigurasi aplikasi Expo
└── package.json                    # Dependensi Expo & React Native Web
```

---

## 🚀 Cara Menjalankan Aplikasi

Aplikasi mendukung tampilan ganda (**Web & Android**):

1. **Jalankan Development Server**:
   ```bash
   npx expo start
   ```

2. **Melihat di Browser (Web)**:
   - Buka: [http://localhost:8081](http://localhost:8081)
   - Tampilan otomatis berada dalam simulator frame *smartphone* yang elegan di tengah layar.

3. **Melihat di HP Android**:
   - Hubungkan HP Android ke jaringan Wi-Fi yang sama dengan komputer.
   - Buka aplikasi **Expo Go** di HP Android.
   - Masukkan IP lokal:
     ```text
     exp://10.163.121.98:8081
     ```

---

## 💡 Panduan Menjelaskan Materi Level 7 ke Dosen Penguji

Jika dosen menanyakan fitur eksplorasi mandiri **Level 7 (Dynamic Content & React Native Exploration)**:

1. **Eksplorasi Komponen Modal Native React Native (`PortfolioGallery.js`)**:
   > *"Untuk menampilkan rincian proyek secara mendalam tanpa berpindah layar navigasi, saya mengeksplorasi komponen bawaan `<Modal />` dari React Native. Ketika tombol 'Lihat Detail' ditekan, state `activeProject` diisi dengan objek proyek yang dipilih, lalu Modal muncul dengan animasi halus `animationType="slide"` dan latar transparan."*

2. **Pencarian Real-Time dan Multi-Filtering**:
   > *"Pada `PortfolioGallery.js`, saya menggabungkan state `searchQuery` dan `selectedCategory`. Fungsi filter membandingkan query teks dengan judul, deskripsi, serta array teknologi (`proj.technologies.some(...)`), sehingga pengguna dapat mencari proyek berdasarkan keyword teknologi seperti 'React', 'Figma', atau 'MySQL' secara instan."*

3. **Eksplorasi Theme Switcher (Dark Mode / Light Mode)**:
   > *"Pada `theme/index.js`, saya membuat arsitektur dual-theme: `LIGHT_THEME` dan `DARK_THEME` dengan fungsi `getTheme(isDark)`. State `isDarkMode` dikelola di root `App.js` dan dapat diubah melalui tombol toggle bulan/matahari di header. Saat tema berganti, seluruh komponen, kartu, teks, border, serta `<StatusBar />` berubah warna secara dinamis."*

4. **Timeline Pengalaman Organisasi & Seksi Hobi**:
   > *"Saya menambahkan data pengalaman organisasi mahasiswa (HIMASI Masoem University) dan seksi hobi di `data/profile.json`. Data ini dirender secara dinamis menggunakan komponen terisolasi `ExperienceTimeline.js` dan `HobbySection.js` dengan visual bullet node dan palet warna representatif."*
