# Personal CV & Academic Portfolio App
> Aplikasi Mobile & Web Portofolio Mahasiswa berbasis Expo React Native 
> Universitas Ma'soem (Masoem University)

---

## 👨‍💻 Profil Mahasiswa

| Informasi | Keterangan |
| :--- | :--- |
| **Nama Lengkap** | **Febrian Iradatul Rahman** |
| **Nama Panggilan** | Pepeb |
| **NIM** | **242505024** |
| **Program Studi** | S1 Sistem Informasi |
| **Fakultas** | Fakultas Komputer |
| **Perguruan Tinggi** | Universitas Ma'soem (Masoem University) |
| **Mata Kuliah** | Pemrograman Mobile 2 |
| **GitHub** | [@Pepeb12](https://github.com/Pepeb12) |
| **Email** | febrianrahman902@gmail.com |
| **Live Web App** | [pepeb12.github.io/cv-febrian](https://pepeb12.github.io/cv-febrian/) |

---

## ✨ Fitur Aplikasi

1. **Header Profil & Bio Interaktif:**
   - Foto almamater resmi dengan modal pratinjau (*zoom-in*).
   - Efek mesin tik (*typewriter*) dinamis untuk spesialisasi peran.
   - Tombol tautan cepat media sosial (WhatsApp, Email, Instagram, GitHub).
2. **Matriks Keahlian & Filter Kategori:**
   - Visualisasi persentase penguasaan teknologi (React Native, Laravel, JavaScript, MySQL, UML).
   - Filter interaktif kategori (Semua, Mobile, Web, Bahasa, Database, Tools).
3. **Linimasa Pendidikan & Hobi Musik:**
   - Riwayat 4 jenjang pendidikan formal (SD, SMP, SMA, S1 Masoem University).
   - Pemutar musik interaktif bertema Spotify (*Reality Club - Anything You Want*) dengan animasi bar equalizer.
4. **Portofolio Proyek & Organisasi Nyata:**
   - Galeri proyek nyata (Personal CV App, PMB Masoem University, Sistem Inventaris Cicalengka) dengan filter dan modal detail.
   - Dokumentasi foto asli pengalaman organisasi (Eskul Musik, Marching Band, UKM Temaholic).
5. **Dashboard Akademik (My Score):**
   - Kartu nilai UTS (Skor 90, Mutu A, 19.000 Learning Points) beranimasi *count-up*.
   - Progres indikator capaian belajar (kehadiran, tugas, dan keaktifan).
6. **Formulir Kontak Terverifikasi:**
   - Validasi *real-time* format email menggunakan standar regex RFC 5322.
   - Kartu informasi kontak dan domisili yang responsif dan rapi.
7. **Theming & Desain Responsif:**
   - Pengalih tema ganda (*Burgundy Classic Light Mode* & *Dark Mode*).
   - Tampilan adaptif untuk smartphone, tablet, hingga layar desktop lebar.
   - Perlindungan *runtime crash* menggunakan *Error Boundary*.

---

## 🚀 Cara Menjalankan

### 1. Menjalankan Server Pengembangan
```bash
# Menjalankan aplikasi Expo
npx expo start

# Atau langsung membuka di browser web
npx expo start --web
```
*Gunakan tombol `w` pada terminal untuk membuka web, atau scan QR code melalui aplikasi Expo Go di smartphone (Android/iOS).*

### 2. Menjalankan Uji Otomatis (Unit Test)
```bash
node tests/run-tests.js
```
*Memverifikasi 10 pengujian kualitas (validasi form, kalkulasi grade, integritas skema data).*

### 3. Memeriksa Tipe Data TypeScript
```bash
npx tsc --noEmit
```

### 4. Build Bundle Web Statis
```bash
npx expo export -p web
```
