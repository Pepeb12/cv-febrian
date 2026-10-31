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
- [x] **Seluruh Persyaratan Level 3**: Dipertahankan secara menyeluruh.
- [x] **Penggunaan Props**:
  - Mengirimkan data profil, daftar keahlian, status tombol, dan callback event antar komponen (`ProfileCard`, `ContactFormCard`, `InteractiveEndorseBar`, `SkillMatrixCard`).
- [x] **Penggunaan State (`useState`)**:
  - State form input: `name`, `email`, `message`.
  - State error validasi: `errors`.
  - State respons pengiriman pesan: `submittedData`.
  - State counter endorsement: `endorseCount`, `isEndorsed`.
  - State filter kategori keahlian aktif: `selectedCategory`.
- [x] **Tombol & Interaksi Sederhana**:
  - Tombol interaktif *Endorse/Dukung Profil* dengan update counter otomatis.
  - Filter tabs kategori keahlian (*Semua, Mobile, Systems, UI/UX, Database*).
  - Tombol submit formulir dan tombol reset pesan.
- [x] **Formulir Kontak (Nama, Email, Pesan)**:
  - Dibangun dengan `TextInput`, label informatif, placeholder, dan indikator required field.
- [x] **Event Handling**:
  - `onChangeText` untuk update state input secara real-time.
  - `onPress` untuk submit, reset, endorsement, dan pergantian filter.
- [x] **Validasi Input Kosong & Format Email**:
  - Pengecekan input kosong (`trim()`).
  - Pengecekan batas minimal karakter (nama min 3 huruf, pesan min 5 huruf).
  - Pengecekan format alamat email menggunakan RegEx (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`).
  - Tampilan visual error border merah dan teks peringatan di bawah input.
- [x] **Respons Setelah Formulir Diproses**:
  - Kartu notifikasi sukses berwarna hijau dengan timestamp waktu pengiriman.
  - Rincian ringkasan data yang baru saja dikirim (Nama, Email, Isi Pesan).
  - Tombol untuk kembali mengirim pesan baru.
- [x] **Materi Utama: P3 dan P5 — Props, State, Input Form, dan Event Handling**.

---

## 📁 Struktur Komponen Proyek (Clean Architecture)

```text
├── assets/
│   └── profile.png                 # Foto profil formal Febrian Iradatul Rahman
├── components/
│   ├── Header.js                   # Header institusi Masoem University & Level 4 Badge
│   ├── ProfileCard.js              # Kartu identitas utama mahasiswa
│   ├── InteractiveEndorseBar.js    # Tombol rekomendasi/endorse berbasis State (Level 4)
│   ├── MetricBar.js                # Bar statistik metrik akademik
│   ├── SectionHeading.js           # Reusable heading hierarkis dengan ikon
│   ├── ContactFormCard.js          # Formulir kontak: Input, Validasi, State, & Respons (Level 4)
│   ├── PersonalIntroCard.js        # Personal introduction & 4 bidang minat
│   ├── SkillMatrixCard.js          # Progress bar keahlian dengan State Filter Tabs (Level 4)
│   ├── IdentityDetailCard.js       # Timeline riwayat pendidikan & domisili alamat
│   ├── ContactGridCard.js          # Grid 2-kolom kontak interaktif
│   └── Level4CriteriaCard.js       # Checklist evaluasi kriteria Level 4
├── data/
│   └── profileData.js              # Single source of truth data mahasiswa Febrian
├── theme/
│   └── index.js                    # Design tokens: COLORS, SPACING, TYPOGRAPHY, SHADOWS
├── App.js                          # Root component dengan Safe Area & State manajemen
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

## 💡 Panduan Menjelaskan Materi P3 & P5 ke Dosen Penguji

Jika dosen menanyakan korelasi kode dengan materi **P3 & P5 (Props, State, Input Form, Event Handling)**:

1. **Penggunaan State (`useState`)**:
   > *"Pada file `ContactFormCard.js`, saya menggunakan hook `useState` untuk mengelola input teks: `const [name, setName] = useState('')`, `const [email, setEmail] = useState('')`, dan `const [message, setMessage] = useState('')`. State ini menjamin input bersifat controlled component dan data terbarui secara reaktif."*

2. **Penggunaan Props**:
   > *"Komponen `ContactFormCard` menerima props `recipientName` dan callback function `onMessageSent`. Nilai props dikirimkan dari komponen induk `App.js` sehingga komponen form bersifat reusable dan data-driven."*

3. **Event Handling pada Form**:
   > *"Event `onChangeText` pada `TextInput` secara real-time memperbarui nilai state dan menghapus pesan error saat pengguna mulai mengetik ulang. Sementara itu, event `onPress` pada tombol kirim memicu fungsi `handleSubmit` untuk menjalankan logika validasi."*

4. **Logika Validasi Input**:
   > *"Fungsi `validateForm` memeriksa apakah ada input kosong menggunakan `.trim()`. Untuk email, saya menerapkan Regular Expression untuk memvalidasi format email yang benar. Jika ditemukan kesalahan, state `errors` akan diisi sehingga bingkai input berubah menjadi merah dan memunculkan label error."*

5. **Tampilan Respons Formulir**:
   > *"Setelah formulir lolos validasi, objek data pengirim disimpan ke dalam state `submittedData`. Menggunakan conditional rendering `{submittedData ? <SuccessView /> : <FormView />}`, aplikasi langsung mengganti formulir dengan kartu ringkasan pesan yang berhasil diproses."*
