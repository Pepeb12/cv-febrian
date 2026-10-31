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
- [x] **Seluruh Persyaratan Level 2**: Dipertahankan dan ditingkatkan secara menyeluruh.
- [x] **Layout Terstruktur & Visual Hierarchy**:
  - Tampilan CV modern terbagi dalam 7 bagian terorganisasi:
    1. *Header Kampus & Level Indicator*
    2. *Digital Student Profile Card (Hero Section)*
    3. *Academic Metrics Bar (4 Kolom Stat Card Flexbox)*
    4. *Personal Introduction & 4 Spesialisasi Minat*
    5. *Keahlian Teknis (Technical Skills) dengan Visual Progress Bar*
    6. *Riwayat Pendidikan (Timeline Vertikal) & Alamat Domisili*
    7. *Grid Kontak & Komunikasi (2-Kolom Flexbox Wrap)*
- [x] **Pengaturan Tipografi, Warna, Jarak, & Ukuran Elemen (Design Tokens)**:
  - Dibuat file terpusat `theme/index.js` yang mengatur palet warna (Masoem Deep Blue, Slate, Emerald), skala tipografi (H1, H2, H3, Body, Caption), ukuran jarak baku (SPACING), dan sistem bayangan (*Shadows*).
- [x] **Pemanfaatan Flexbox & StyleSheet Murni**:
  - Penerapan `flexDirection: 'row'`, `justifyContent: 'space-between'`, `alignItems: 'center'`, `flexWrap: 'wrap'`, dan visual progress bars.
  - 100% kode styling menggunakan `StyleSheet.create` tanpa inline style yang berantakan.
- [x] **Optimal & Nyaman Dibaca di Layar Ponsel**:
  - Tidak ada teks yang terpotong tanpa sengaja, batas padding responsif, dan dukungan *mobile simulator frame* saat diakses melalui browser.
- [x] **Materi Utama: P4 — Layout dan Styling React Native**:
  - Pemisahan token desain, flexbox container model, dan responsivitas lintas platform (Android & Web).

---

## 📁 Struktur Komponen Proyek (Clean Architecture)

```text
├── assets/
│   └── profile.png                 # Foto profil formal Febrian Iradatul Rahman
├── components/
│   ├── Header.js                   # Header institusi Masoem University & Level Badge
│   ├── ProfileCard.js              # Kartu identitas utama mahasiswa
│   ├── MetricBar.js                # Bar statistik metrik akademik (Materi P4)
│   ├── SectionHeading.js           # Reusable heading hierarkis dengan ikon
│   ├── PersonalIntroCard.js        # Personal introduction & 4 bidang minat
│   ├── SkillMatrixCard.js          # Progress bar keahlian teknis (Materi P4)
│   ├── IdentityDetailCard.js       # Timeline riwayat pendidikan & domisili alamat
│   ├── ContactGridCard.js          # Grid 2-kolom kontak interaktif (Materi P4)
│   └── Level3CriteriaCard.js       # Checklist evaluasi kriteria Level 3
├── data/
│   └── profileData.js              # Single source of truth data mahasiswa Febrian
├── theme/
│   └── index.js                    # Design tokens: COLORS, SPACING, TYPOGRAPHY, SHADOWS
├── App.js                          # Root component dengan Safe Area & responsive container
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
   - Pilih **Enter URL manually** dan masukkan IP lokal:
     ```text
     exp://10.163.121.98:8081
     ```
   - Atau scan QR code yang tertera pada terminal.

---

## 💡 Panduan Menjelaskan Materi P4 ke Dosen Penguji

Jika dosen menanyakan implementasi materi **P4 — Layout dan Styling React Native**:

1. **Design Tokens & Theme System (`theme/index.js`)**:
   > *"Untuk menjamin konsistensi visual dan kemudahan pemeliharaan kode (maintainability), saya membuat sistem token desain di `theme/index.js` yang mencakup palet warna kampus `COLORS`, skala tipografi `TYPOGRAPHY`, spacing baku `SPACING`, serta elevasi bayangan `SHADOWS` untuk Android, iOS, dan Web."*

2. **Pemanfaatan Flexbox**:
   > *"Pada `MetricBar.js`, saya menggunakan `flexDirection: 'row'` dan `gap` untuk membagi metrik menjadi 4 kolom berukuran seimbang (`flex: 1`). Pada `ContactGridCard.js`, saya menerapkan `flexWrap: 'wrap'` dengan lebar elemen `48%` untuk membentuk grid 2 kolom yang otomatis menyesuaikan lebar layar."*

3. **Komponen Visual Progress Bar (`SkillMatrixCard.js`)**:
   > *"Untuk menampilkan persentase keahlian, saya mendesain relasi dua View menggunakan Flexbox: `progressTrack` sebagai lintasan abu-abu dengan `overflow: 'hidden'`, dan `progressFill` di dalamnya dengan lebar dinamis `{ width: `${skill.percentage}%` }`."*

4. **Pencegahan Teks Terpotong**:
   > *"Semua teks utama memiliki toleransi padding dan `lineHeight` yang proporsional. Pada teks nilai kontak, saya menerapkan `numberOfLines={1}` dan `ellipsizeMode='tail'` sehingga jika nilai terlalu panjang pada ponsel berlayar sempit, teks tidak akan merusak layout kartu."*
