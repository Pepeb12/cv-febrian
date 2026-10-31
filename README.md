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
- [x] **Foto Profil**: Foto profesional berbingkai circular (`assets/profile.png`) dengan badge status aktif.
- [x] **Aplikasi Berjalan**: Berjalan lancar di Web browser dan perangkat Android via Expo Go.

### LEVEL 2 — BEGINNER (Status: ✅ Selesai)
- [x] **Seluruh Persyaratan Level 1**: Dipertahankan secara utuh dan terintegrasi rapi.
- [x] **Profesi / Bidang Minat**:
  - Profesi: *Junior Systems Analyst & Mobile App Developer*
  - 4 Bidang Minat Utama Sistem Informasi:
    1. *Mobile App Development (React Native & Expo)*
    2. *Systems & Business Analysis (UML, DFD, BPMN, SRS)*
    3. *UI/UX & Interactive Design (Figma, Design System)*
    4. *Database Management & SQL (MySQL, PostgreSQL)*
- [x] **Deskripsi Singkat Personal Introduction**:
  - Headline sambutan personal branding.
  - Ringkasan profil mahasiswa semester 5 prodi Sistem Informasi Masoem University.
  - Visi karir dan motto hidup.
  - 3 atribut keunggulan diri (*Problem Solving*, *Team Collaboration*, *Continuous Learner*).
- [x] **Judul / Heading yang Sesuai**:
  - Implementasi komponen semantik `SectionHeading.js` dengan judul, subjudul, ikon visual, dan badge kategori.
- [x] **Materi P2 (JavaScript, JSX, Component)**:
  - Menggunakan JavaScript ES6+ (destructuring, array `.map()`, template literals).
  - Tampilan modular dibangun murni menggunakan JSX dan komponen inti React Native (`View`, `Text`, `Image`, `ScrollView`, `StyleSheet`, `TouchableOpacity`).

---

## 📁 Struktur Komponen Proyek (Clean Architecture)

```text
├── assets/
│   └── profile.png                 # Foto profil formal Febrian Iradatul Rahman
├── components/
│   ├── Header.js                   # Header kampus Masoem University & Level Badge
│   ├── ProfileCard.js              # Kartu profil utama (Foto, Nama, NIM, Profesi)
│   ├── SectionHeading.js           # Komponen reusable heading terstruktur (Materi P2)
│   ├── PersonalIntroCard.js        # Personal introduction & 4 bidang minat (Level 2)
│   ├── Level2CriteriaCard.js       # Checklist evaluasi kriteria Level 2
│   └── IdentityDetailCard.js       # Timeline riwayat pendidikan & domisili alamat
├── data/
│   └── profileData.js              # Single source of truth data mahasiswa
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

## 💡 Panduan Menjelaskan Kode Materi P2 ke Dosen Penguji

Jika dosen menanyakan korelasi kode dengan materi **P2 — JavaScript, JSX, dan Component**:

1. **Penggunaan JavaScript ES6+**:
   > *"Pada file `PersonalIntroCard.js`, saya menerapkan object destructuring `const { introduction, fieldsOfInterest } = profile;` untuk mengekstrak data dari `profileData.js`. Selain itu, saya menggunakan fungsi array `.map()` untuk me-render daftar bidang minat dan tags secara dinamis tanpa duplikasi kode."*

2. **Penerapan JSX (JavaScript XML)**:
   > *"Semua elemen visual ditulis menggunakan sintaks JSX yang menggabungkan logika JavaScript dan struktur visual, seperti rendering bersyarat `{subtitle ? <Text style={styles.subTitle}>{subtitle}</Text> : null}` pada komponen `SectionHeading.js`."*

3. **Prinsip Reusable Component**:
   > *"Saya membuat komponen reusable `SectionHeading.js` yang menerima properti (`props`): `title`, `subtitle`, `icon`, dan `badgeText`. Komponen ini digunakan berulang kali di seluruh kartu tampilan dengan gaya konsisten dan bersih."*
