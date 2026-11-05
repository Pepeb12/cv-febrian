# Personal CV & Academic Portfolio App
> **UTS Pemrograman Mobile 2 — Level 1 s.d. Level 10 (Production-Oriented Mobile Application)**  
> **Universitas Ma'soem (Masoem University)**

---

## 👨‍💻 Identitas Mahasiswa

| Informasi | Keterangan |
| :--- | :--- |
| **Nama Lengkap** | **Febrian Iradatul Rahman** |
| **Nama Panggilan** | Pepeb |
| **NIM** | **242505024** |
| **Program Studi** | S1 Sistem Informasi |
| **Fakultas** | Fakultas Komputer |
| **Perguruan Tinggi** | Universitas Ma'soem (Masoem University) |
| **Semester / Tahun**| Semester 5 / 2024/2025 - Gasal |
| **Mata Kuliah** | Pemrograman Mobile 2 |
| **GitHub** | [@Pepeb12](https://github.com/Pepeb12) |
| **Email** | febrianrahman902@gmail.com |

---

## 🌐 Live Demo & Deployment

Aplikasi ini telah diekspor dan di-deploy secara otomatis ke GitHub Pages menggunakan GitHub Actions:

- **Live Web App**: [https://pepeb12.github.io/cv-febrian/](https://pepeb12.github.io/cv-febrian/) *(atau sesuai repositori GitHub)*
- **Struktur Repositori**: Terbuka untuk inspeksi file, folder, dan arsitektur kode oleh dosen penilai.

---

## 🏆 Pemenuhan Kriteria Modul UTS (Level 1 s.d. Level 10)

Aplikasi ini dibangun secara bertahap dan menyeluruh memenuhi seluruh 10 tingkatan kriteria:

1. **Level 1 — Basic Profile Display**: Menampilkan data profil lengkap (NIM, Nama, Prodi, Kampus, Lokasi, Status Mahasiswa Aktif).
2. **Level 2 — Rich Bio & Passfoto Resmi**: Foto almamater resmi, dynamic typewriter role, dan 3 nilai karakter diri (Problem Solving, Teamwork, Continuous Learner).
3. **Level 3 — Skills Matrix & Kategorisasi**: Visual bar penguasaan teknologi (React Native, Laravel, JS, MySQL, UML) dengan filter kategori interaktif.
4. **Level 4 — Interactive Contact Form**: Formulir kontak lengkap dengan validasi real-time RFC 5322 regex dan toast feedback notifikasi.
5. **Level 5 — Micro-Interactions & Theming**: Transisi halus, animasi entrance/scroll reveal, dan pengubah tema ganda (Burgundy Classic Dark & Light Mode).
6. **Level 6 — Education Timeline & Hobi**: Linimasa 4 jenjang pendidikan formal (SD, SMP, SMA, S1) dan pemutar Spotify interaktif (*Anything You Want - Reality Club*).
7. **Level 7 — Portofolio & Pengalaman Nyata**:
   - 3 Portofolio proyek nyata (Personal CV App, PMB Masoem University, Inventaris Barang Cicalengka) dengan filter dan modal banner.
   - 3 Pengalaman organisasi nyata lengkap dengan foto dokumentasi asli (Sound System Eskul Musik, Marching Band SMA PGRI Cicalengka, UKM TEMAHOLIC Masoem).
8. **Level 8 — Academic Dashboard (My Score)**: Kartu skor UTS (Nilai 90, Grade A, 19.000 LP), ringkasan 4 modul, dan kalkulasi predikat otomatis.
9. **Level 9 — Polishing & Architecture**: 0 Delay navigation, layout responsif (Mobile, Tablet, Laptop, Desktop Wide), dan struktur file modular.
10. **Level 10 — Industry Production-Oriented Mobile App**:
    - **Pemisahan 3-Tier Layer**: Presentation (`components/`), Service (`services/`), Data (`data/`).
    - **Resilience States**: Simulasi kondisi Normal (200 OK), Shimmer Loading, Error 503 dengan retry, dan Empty State.
    - **Error Boundary**: Perlindungan crash runtime aplikasi.
    - **Local Persistence**: `AsyncStorage` untuk preferensi tema dan draft pesan kontak.
    - **Automated Test Suite**: 10 unit test mandiri berstatus **100% PASS** (`node tests/run-tests.js`).

---

## 📂 Struktur File & Folder Proyek

```text
v UTS FEBRIAN
  v .github/workflows
    deploy.yml               <-- Otomatisasi CI/CD GitHub Pages
  v app
    index.tsx                <-- Entry point Expo Router
  v assets
    eskul_musik.jpg          <-- Dokumentasi Eskul Musik SMA PGRI Cicalengka
    marching_band.jpg        <-- Dokumentasi Marching Band SMA PGRI Cicalengka
    profile.jpg              <-- Foto resmi almamater
    project_cv.jpg           <-- Screenshot Proyek Personal CV App
    project_inventaris.jpg   <-- Screenshot Proyek Peminjaman Inventaris
    project_pmb_masoem.jpg   <-- Screenshot Proyek PMB Masoem University
    ukm_temaholic.jpg        <-- Dokumentasi UKM Temaholic Masoem University
  v components
    AboutSection.tsx         <-- Bagian Tentang Saya, Riwayat & Organisasi
    ContactForm.tsx          <-- Formulir kontak interaktif
    CosmicFooter.tsx         <-- Footer identitas institusi & pengembang
    ErrorBoundary.tsx        <-- Proteksi runtime crash
    FeedbackToast.tsx        <-- Notifikasi umpan balik
    GlobalAnimations.tsx     <-- Sistem animasi CSS web
    Level10Showcase.tsx      <-- Tampilan demonstrasi Level 10 Industri
    MyScoreSection.tsx       <-- Dashboard nilai akademik UTS
    NavigationTabBar.tsx     <-- Header navigasi satu baris floating pill
    PortfolioGallery.tsx     <-- Galeri portofolio proyek
    ProfileHeader.tsx        <-- Header hero profil mahasiswa
  v data
    academicScore.json       <-- Data kontrak nilai UTS Masoem University
    profile.json             <-- Data profil, portofolio & pengalaman
  v services
    academicService.js       <-- Service API, latensi & penanganan error 503
    storageService.js        <-- Abstraksi AsyncStorage persistensi lokal
  v tests
    run-tests.js             <-- 10 Automated unit test suite
  v theme
    index.ts                 <-- Token warna resmi Burgundy Classic
  LICENSE                    <-- Lisensi perlindungan hak cipta akademik
  package.json
  tsconfig.json
```

---

## 🚀 Panduan Menjalankan Aplikasi

### 1. Menjalankan Server Pengembangan Lokal
```bash
npx expo start
```
- Tekan `w` untuk membuka di browser web.
- Scan QR code dengan aplikasi Expo Go pada perangkat Android/iOS.

### 2. Menjalankan 10 Automated Unit Tests (Level 10)
```bash
node tests/run-tests.js
```
*Hasil: 10 PASS / 0 FAIL (100% Lolos).*

### 3. Memeriksa Type Safety TypeScript
```bash
npx tsc --noEmit
```
*Hasil: 0 Error.*

### 4. Ekspor Bundle Web Statis
```bash
npx expo export -p web
```

---

## 🔒 Kebijakan Hak Cipta & Integritas Akademik (Anti-Copy Notice)

Repositori ini disetel secara terbuka khusus untuk keperluan evaluasi penilaian akademik oleh dosen dan institusi.

> **PERINGATAN:**  
> Seluruh kode sumber, arsitektur, dan aset dokumentasi di dalam repositori ini dilindungi oleh hak cipta atas nama **Febrian Iradatul Rahman (242505024)**.  
> **Dilarang keras menyalin, menduplikasi, mengkloning, atau mengumpulkan sebagian atau seluruh karya ini sebagai tugas pihak lain.** Pelanggaran akan dilaporkan sebagai bentuk pelanggaran integritas akademik perguruan tinggi. Lihat file [LICENSE](LICENSE) untuk rincian ketentuan hukum.
