# Personal CV & Academic Score App — UTS Pemrograman Mobile

Aplikasi mobile representasi digital profil mahasiswa yang menggabungkan personal branding, identitas diri, portofolio interaktif, dan capaian akademik berbasis **React Native** dan **Expo**.

---

## 👤 Identitas Mahasiswa

| Informasi | Detail |
|---|---|
| **Nama Lengkap** | Febrian Iradatul Rahman |
| **NIM** | **242505024** |
| **Program Studi** | Sistem Informasi |
| **Semester** | 5 |
| **Perguruan Tinggi** | Masoem University |
| **Mata Kuliah UTS** | **Pemrograman Mobile 2** |
| **Dosen Pengampu** | **Iin, M.Kom** |
| **Profesi / Minat Utama** | **Junior Systems Analyst & Mobile App Developer** |
| **Alamat** | Kp Babakan Stasiun Cicalengka, Kec. Cicalengka, Kab. Bandung |

---

## 🎯 Evaluasi Challenge Level (Lengkap Level 1 s.d. Level 8)

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
- [x] **Galeri Portofolio Proyek Dinamis**:
  - 4 portofolio riil dengan pencarian real-time dan filter kategori.
- [x] **Eksplorasi Komponen Native `<Modal />`**:
  - Dialog pop-up interaktif untuk melihat rincian software architecture & features.
- [x] **Dual-Theme Switcher (Dark & Light Mode)**:
  - Tombol pengubah tema di Header dengan transisi warna menyeluruh secara dinamis.
- [x] **Timeline Pengalaman Organisasi & Seksi Hobi**:
  - Riwayat keaktifan di HIMASI Masoem University dan seksi hobi dari JSON.

### LEVEL 8 — EXPERT (Status: ✅ Selesai)
- [x] **Seluruh Persyaratan Level 7**: Dipertahankan secara menyeluruh.
- [x] **Section My Score Terintegrasi Penuh ke Aplikasi**:
  - Dashboard visual capaian akademik Pemrograman Mobile 2 Masoem University.
- [x] **Struktur Data Terpisah (`data/academicScore.json`)**:
  - Data nilai dan indikator disimpan terisolasi dalam format JSON murni.
- [x] **Identitas Akademik Lengkap**:
  - Nama: **Febrian**, NIM: **242505024**, MK: **Pemrograman Mobile 2**, Dosen: **Iin, M.Kom**.
- [x] **Current Score Menonjol & Jelas**:
  - Nilai: **90 / 100**, Grade: **A**, Status: **Sangat Memuaskan**.
- [x] **Learning Points Tampil Jelas**:
  - Total: **19,000 LP**, Predikat: **Top Tier Scholar**.
- [x] **Indikator Capaian Belajar (Learning Progress) Dinamis**:
  - **Attendance**: **100%** (14 dari 14 pertemuan)
  - **Practice**: **95%** (19 dari 20 modul hands-on coding)
  - **Quest**: **100%** (Tugas mandiri & kuis tuntas)
  - **Challenge**: **100%** (Challenge UTS Level 1 - Level 8 tuntas)
- [x] **Komponen Reusable Berbasis Props**:
  - `<MyScoreSection data={academicScoreData} theme={theme} />` merender seluruh list dan progress bar dinamis.
- [x] **Materi Utama: Props, Component, JSON, List Data, dan Layout**.

---

## 📁 Struktur Proyek (Level 8 Expert Architecture)

```text
├── assets/
│   └── profile.png                 # Foto profil formal Febrian Iradatul Rahman
├── components/
│   ├── Header.js                   # Header institusi, Level 8 Badge, & Theme Toggle
│   ├── ProfileHeader.js            # Header Profil: <ProfileHeader data={profileData} />
│   ├── ProfileCard.js              # Kartu identitas adaptif tema
│   ├── MyScoreSection.js           # [Level 8] Dashboard Capaian Akademik (Score, LP, Progress)
│   ├── PortfolioGallery.js         # Galeri portofolio: Search, Filter, & Native Modal
│   ├── ExperienceTimeline.js       # Timeline organisasi & riset kampus
│   ├── HobbySection.js             # Seksi hobi & minat personal dari JSON
│   ├── AboutSection.js             # Komponen Tentang & Minat adaptif tema
│   ├── ContactForm.js              # Komponen Form Kontak adaptif tema
│   ├── ContactFormCard.js          # Logika form kontak, input state, dan validasi
│   ├── InteractiveEndorseBar.js    # Tombol rekomendasi/endorse
│   ├── MetricBar.js                # Bar statistik metrik akademik umum
│   ├── SectionHeading.js           # Reusable heading hierarkis adaptif tema
│   ├── SkillMatrixCard.js          # Progress bar keahlian dengan filter tabs
│   ├── IdentityDetailCard.js       # Timeline riwayat pendidikan & domisili alamat
│   ├── ContactGridCard.js          # Grid 2-kolom kontak interaktif
│   └── Level8CriteriaCard.js       # Checklist evaluasi kriteria Level 8
├── data/
│   ├── academicScore.json          # [Level 8] Data akademik murni: MK, Dosen, Nilai, LP, Progress
│   ├── profile.json                # Data lokal murni: profil, portofolio, hobi, & pengalaman
│   └── profileData.js              # Bridge re-exporting data JSON
├── theme/
│   └── index.js                    # Dual-theme tokens (LIGHT_THEME, DARK_THEME, getTheme)
├── App.js                          # Root component: Dashboard My Score & Theme Switcher
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

## 💡 Panduan Menjelaskan Materi Level 8 (My Score & Academic Dashboard) ke Dosen Penguji

Jika dosen menanyakan implementasi **Level 8 — Expert (My Score & Academic Dashboard)**:

1. **Pemisahan Data Akademik (`data/academicScore.json`)**:
   > *"Sesuai dengan instruksi Level 8, data capaian akademik disimpan dalam berkas terpisah `data/academicScore.json`. Berkas ini memuat identitas mata kuliah (Pemrograman Mobile 2), dosen pengampu (Iin, M.Kom), identitas mahasiswa (Febrian, NIM 242505024), Current Score (90, Grade A), Total Learning Points (19,000 LP), serta array list capaian belajar (Attendance 100%, Practice 95%, Quest 100%, Challenge 100%)."*

2. **Arsitektur Komponen Reusable (`MyScoreSection.js`)**:
   > *"Komponen `MyScoreSection.js` menerima data melalui prop `data` dari berkas `academicScore.json`. Komponen ini murni mengandalkan data props sehingga bila semester depan nilai diubah atau mata kuliah diganti, tampilan antarmuka akan langsung menyesuaikan secara otomatis."*

3. **Visibilitas Current Score & Learning Points**:
   > *"Untuk memastikan nilai utama mudah dilihat sesuai ketentuan UI, saya merancang kartu grid 2 kolom dengan tipografi tegas: angka nilai raksasa `90/100` berbingkai hijau dengan badge `Grade A`, bersanding dengan kartu `19,000 LP` berhiaskan ikon piala dan gelar `Top Tier Scholar`."*

4. **Rendering Dinamis Indikator Belajar (List Data & Progress Bar)**:
   > *"Keempat indikator capaian belajar dirender menggunakan fungsi array mapping (`data.learningProgress.map(...)`). Setiap kartu indikator menampilkan nama komponen, persentase nilai tebal, dan visualisasi bar horizontal menggunakan Flexbox (`width: `${item.percentage}%``) dengan kode warna tematik."*
