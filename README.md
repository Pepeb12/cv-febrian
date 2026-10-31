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

## 🎯 Evaluasi Challenge Level

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
- [x] **Seluruh Persyaratan Level 4**: Dipertahankan secara menyeluruh.
- [x] **Data Profil Tidak Ditulis Langsung pada Elemen UI (Zero Hardcoded Data)**:
  - Seluruh informasi profil disimpan terpusat di `data/profileData.js`.
  - Komponen antarmuka visual murni bersifat presentasional tanpa string nama/NIM statis di dalam komponen.
- [x] **Data Disimpan dalam File Terpisah**:
  - File `data/profileData.js` bertindak sebagai *Single Source of Truth* dan mengekspor objek data melalui `export default profileData;`.
- [x] **Komponen UI Menerima Data Melalui Props**:
  - `<ProfileHeader data={profileData} />`
  - `<AboutSection data={profileData} />`
  - `<ContactForm data={profileData} onMessageSent={...} />`
  - `<MetricBar metrics={profileData.academicMetrics} />`
  - `<SkillMatrixCard skills={profileData.technicalSkills} />`
  - `<IdentityDetailCard data={profileData} />`
  - `<ContactGridCard contactItems={profileData.contactItems} />`
- [x] **Struktur Kode Terorganisasi & Mudah Dikembangkan (Separation of Concerns)**:
  - Memisahkan direktori data (`data/`), tema (`theme/`), komponen presentasional (`components/`), dan root (`App.js`).
- [x] **Reusabilitas & Bukti Perubahan Data**:
  - Mengubah data di `profileData.js` secara otomatis memperbarui seluruh UI tanpa perlu mengubah satu baris pun kode komponen.
- [x] **Materi Utama: Component, Props, dan Pengorganisasian Kode**.

---

## 📁 Struktur Proyek (Clean Architecture Level 5)

```text
├── assets/
│   └── profile.png                 # Foto profil formal Febrian Iradatul Rahman
├── components/
│   ├── Header.js                   # Header institusi Masoem University & Level 5 Badge
│   ├── ProfileHeader.js            # [Level 5] Profile header: <ProfileHeader data={profileData} />
│   ├── ProfileCard.js              # Kartu identitas presentasional
│   ├── AboutSection.js             # [Level 5] About & Interests: <AboutSection data={profileData} />
│   ├── ContactForm.js              # [Level 5] Contact form wrapper: <ContactForm data={profileData} />
│   ├── ContactFormCard.js          # Formulir kontak dengan validasi & state
│   ├── InteractiveEndorseBar.js    # Tombol rekomendasi interaktif
│   ├── MetricBar.js                # Bar statistik metrik akademik
│   ├── SectionHeading.js           # Reusable heading hierarkis dengan ikon
│   ├── SkillMatrixCard.js          # Progress bar keahlian dengan State Filter Tabs
│   ├── IdentityDetailCard.js       # Timeline riwayat pendidikan & domisili alamat
│   ├── ContactGridCard.js          # Grid 2-kolom kontak interaktif
│   └── Level5CriteriaCard.js       # Checklist evaluasi kriteria Level 5
├── data/
│   └── profileData.js              # [Level 5] Single source of truth (export default profileData)
├── theme/
│   └── index.js                    # Design tokens: COLORS, SPACING, TYPOGRAPHY, SHADOWS
├── App.js                          # Root component pengatur aliran Props
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

## 💡 Panduan Menjelaskan Materi Level 5 (Separation of UI and Data) ke Dosen Penguji

Jika dosen menanyakan implementasi **Separation of UI and Data**:

1. **Pemisahan Tanggung Jawab (*Separation of Concerns*)**:
   > *"Sesuai dengan kriteria Level 5, tidak ada satu pun komponen UI yang menuliskan data mahasiswa secara hardcoded di dalam JSX-nya. Semua informasi nama, NIM, prodi, riwayat pendidikan, kontak, dan keahlian dipisahkan secara murni ke dalam berkas `data/profileData.js`."*

2. **Aliran Data (*Data Flow*) Melalui Props**:
   > *"Aliran data dimulai dari `data/profileData.js` yang diekspor menggunakan `export default profileData;`. Berkas root `App.js` mengimpor data tersebut lalu mendistribusikannya ke masing-masing komponen anak melalui properti `data` (misalnya `<ProfileHeader data={profileData} />`, `<AboutSection data={profileData} />`, dan `<ContactForm data={profileData} />`)."*

3. **Kemudahan Pengembangan (*Maintainability & Scalability*)**:
   > *"Keuntungan utama dari arsitektur ini adalah reusabilitas dan kemudahan pengujian. Jika kita ingin mengganti profil mahasiswa, kita hanya perlu mengubah berkas `profileData.js` tanpa harus menyentuh satu baris pun kode logika antarmuka atau styling komponen."*
