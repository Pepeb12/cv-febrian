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

## 🎯 Evaluasi Challenge Level (Lengkap Level 1 s.d. Level 6)

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
- [x] **Seluruh Persyaratan Level 5**: Dipertahankan secara menyeluruh.
- [x] **Penyimpanan Data Lokal Format `.json`**:
  - Data profil disimpan murni dalam berkas terpisah: [`data/profile.json`](file:///d:/UTS%20FEBRIAN/data/profile.json).
- [x] **Aplikasi Membaca & Menampilkan Data JSON Secara Langsung**:
  - Diimpor langsung pada file root `App.js`:
    ```javascript
    import profileData from './data/profile.json';
    ```
- [x] **Struktur Data JSON Valid**:
  - Sintaks JSON 100% valid dan lolos uji parsing `JSON.parse()`.
- [x] **Pemetaan Data ke Komponen UI Tanpa Menulis Ulang Seluruh Konten**:
  - Objek dan array JSON langsung dipetakan ke dalam komponen presentasional melalui Props.
- [x] **Pemisahan Data dan UI Tetap Terjaga**:
  - Mengubah isi JSON otomatis mengubah tampilan antarmuka secara instan.
- [x] **Materi Utama: Pemisahan Data, Struktur JSON, dan Rendering Data**.

---

## 📁 Struktur Proyek (Level 6 Architecture)

```text
├── assets/
│   └── profile.png                 # Foto profil formal Febrian Iradatul Rahman
├── components/
│   ├── Header.js                   # Header institusi Masoem University & Level 6 Badge
│   ├── ProfileHeader.js            # [Level 5/6] Header Profil: <ProfileHeader data={profileData} />
│   ├── ProfileCard.js              # Kartu identitas presentasional
│   ├── AboutSection.js             # [Level 5/6] Tentang & Minat: <AboutSection data={profileData} />
│   ├── ContactForm.js              # [Level 5/6] Form Kontak: <ContactForm data={profileData} />
│   ├── ContactFormCard.js          # Logika form kontak, input state, dan validasi
│   ├── InteractiveEndorseBar.js    # Tombol rekomendasi/endorse
│   ├── MetricBar.js                # Bar statistik metrik akademik
│   ├── SectionHeading.js           # Reusable heading hierarkis dengan ikon
│   ├── SkillMatrixCard.js          # Progress bar keahlian dengan filter tabs
│   ├── IdentityDetailCard.js       # Timeline riwayat pendidikan & domisili alamat
│   ├── ContactGridCard.js          # Grid 2-kolom kontak interaktif
│   └── Level6CriteriaCard.js       # Checklist evaluasi kriteria Level 6
├── data/
│   ├── profile.json                # [Level 6] Data lokal murni berekstensi .json
│   └── profileData.js              # Bridge re-exporting profile.json
├── theme/
│   └── index.js                    # Design tokens: COLORS, SPACING, TYPOGRAPHY, SHADOWS
├── App.js                          # Root component yang mengimpor profile.json langsung
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

## 💡 Panduan Menjelaskan Materi Level 6 ke Dosen Penguji

Jika dosen menanyakan implementasi **Level 6 (Local JSON Data)**:

1. **Penyimpanan Data Berformat JSON (`data/profile.json`)**:
   > *"Pada Level 6 ini, data identitas mahasiswa disimpan dalam format universal JSON (`data/profile.json`). Berkas ini berisi pasangan key-value murni tanpa fungsi ataupun sintaks JavaScript khusus, sehingga data bersifat independen dari bahasa pemrograman (language-agnostic)."*

2. **Cara Membaca File JSON di Expo / React Native**:
   > *"Ekosistem Expo dan Metro Bundler mendukung pembacaan berkas JSON secara native. Di dalam `App.js`, saya cukup menuliskan `import profileData from './data/profile.json';`. Bundler Metro secara otomatis mem-parsing teks JSON menjadi JavaScript Object yang siap pakai."*

3. **Perbedaan Mendasar Data JSON dengan Komponen UI**:
   > *"**Data JSON** hanyalah representasi teks statis yang menyimpan informasi terstruktur (hanya mendukung tipe data string, number, boolean, array, object, dan null). Sedangkan **Komponen UI** adalah fungsi React yang menghasilkan elemen visual dinamis (JSX), memiliki siklus hidup (lifecycle), dapat menyimpan state internal, serta mampu merespons interaksi pengguna melalui event handling."*

4. **Pemetaan Data (*Data Mapping*)**:
   > *"Data yang dimuat dari JSON diteruskan ke komponen-komponen antarmuka melalui props (misalnya `<ProfileHeader data={profileData} />` dan `<AboutSection data={profileData} />`). Komponen kemudian melakukan pemetaan array (seperti `profileData.fieldsOfInterest.map(...)`) untuk menampilkan daftar kartu secara efisien tanpa menuliskan ulang konten secara manual."*
