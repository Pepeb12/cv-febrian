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
| **Tahun Masuk** | 2024 - Sekarang |
| **Alamat** | Kp Babakan Stasiun Cicalengka, Kec. Cicalengka, Kab. Bandung |

---

## 🎯 Evaluasi Challenge Level: LEVEL 1 — NOVICE

### Persyaratan & Status Pemenuhan
- [x] **Menampilkan NIM**: NIM `242505024` ditampilkan dengan jelas menggunakan badge khusus di kartu profil utama.
- [x] **Menampilkan Nama Lengkap**: Nama `Febrian Iradatul Rahman` ditampilkan secara proporsional dengan tipografi tegas.
- [x] **Menampilkan Foto Profil**: Foto profil formal & profesional ditampilkan dalam bentuk circular avatar dengan status badge aktif.
- [x] **Aplikasi Dapat Dijalankan**: Lolos 100% pemeriksaan `npx expo-doctor` (20/20 checks passed) dan Metro Bundler berhasil melakukan bundle tanpa error.

---

## 📁 Struktur Proyek

```text
├── assets/
│   └── profile.png             # Foto profil mahasiswa Febrian Iradatul Rahman
├── components/
│   ├── Header.js               # Header identitas kampus Masoem University
│   ├── ProfileCard.js          # Kartu identitas utama (Foto, NIM, Nama Lengkap)
│   └── IdentityDetailCard.js   # Rincian alamat, riwayat pendidikan & minat
├── data/
│   └── profileData.js          # Data terpusat profil mahasiswa Febrian
├── App.js                      # Root component aplikasi
├── app.json                    # Konfigurasi aplikasi Expo
└── package.json                # Dependensi proyek
```

---

## 🚀 Cara Menjalankan Aplikasi

1. Buka terminal pada folder proyek:
   ```bash
   cd "D:\UTS FEBRIAN"
   ```

2. Jalankan Expo dev server:
   ```bash
   npx expo start
   ```

3. Jalankan pada perangkat:
   - **Android**: Tekan `a` pada keyboard atau scan QR Code via aplikasi **Expo Go** di HP Android.
   - **iOS**: Scan QR Code menggunakan kamera bawaan iPhone untuk membuka di **Expo Go**.
   - **Web**: Tekan `w` untuk melihat langsung di browser Chrome/Edge.

---

## 💡 Panduan Menjelaskan Kode ke Dosen Penguji

Jika dosen meminta penjelasan kode:
1. **File `data/profileData.js`**:
   - Berisi objek JavaScript `STUDENT_PROFILE` yang menyimpan seluruh identitas: nama, NIM, prodi, alamat, dan riwayat pendidikan dari SD, SMP, SMA hingga Masoem University.
   - *Alasan*: Memisahkan data dari tampilan (Clean Code) memudahkan pengembangan fitur di level berikutnya.

2. **File `components/ProfileCard.js`**:
   - Menggunakan komponen bawaan React Native: `Image`, `Text`, dan `View`.
   - Mengimpor foto profil lokal via `require('../assets/profile.png')`.
   - Mengatur foto profil berbentuk lingkaran sempurna dengan properti `borderRadius: 50` (setengah dari ukuran lebar `width: 100`).
   - Menampilkan NIM `242505024` di dalam kontainer berbingkai dengan ikon kartu ID (`Ionicons`).

3. **File `components/IdentityDetailCard.js`**:
   - Merender riwayat pendidikan secara vertikal (*timeline*) dari Masoem University hingga SD menggunakan fungsi array `.map()`.
   - Menampilkan alamat domisili lengkap di Babakan Stasiun Cicalengka, Kab. Bandung.

4. **File `App.js`**:
   - Memanfaatkan `SafeAreaProvider` dan `SafeAreaView` agar tampilan tidak tertutup oleh *notch* / *status bar* HP.
   - Menggunakan `ScrollView` agar tampilan tetap responsif dan dapat di-scroll dengan nyaman di berbagai ukuran layar.

