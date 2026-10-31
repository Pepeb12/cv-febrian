// Data Profil Mahasiswa untuk Personal CV & Academic Score App
// Sesuai dengan data Febrian Iradatul Rahman (NIM: 242505024)
// Diperbarui untuk pemenuhan LEVEL 3 — ELEMENTARY: Layout dan Styling React Native

export const STUDENT_PROFILE = {
  // Identitas Utama (Level 1)
  nim: "242505024",
  fullName: "Febrian Iradatul Rahman",
  shortName: "Febrian",
  studyProgram: "Sistem Informasi",
  faculty: "Fakultas Ilmu Komputer",
  university: "Masoem University",
  semester: 5,
  academicYear: "2024/2025 - Gasal",
  status: "Mahasiswa Aktif",

  // Metrik Akademik Cepat (Materi P4: Visual Metric Stat Cards)
  academicMetrics: [
    { label: "Semester", value: "05", unit: "Reguler", icon: "calendar-outline" },
    { label: "IPK Kumulatif", value: "3.84", unit: "Skala 4.00", icon: "ribbon-outline" },
    { label: "SKS Selesai", value: "92", unit: "SKS Tempuh", icon: "school-outline" },
    { label: "Status Kuliah", value: "Aktif", unit: "2024 - Skrg", icon: "checkmark-circle-outline" },
  ],

  // Profesi & Spesialisasi (Level 2)
  professionTitle: "Junior Systems Analyst & Mobile App Developer",
  tagline: "Bridging Business Logic & Modern Mobile Experiences",

  // Deskripsi Singkat / Personal Introduction (Level 2)
  introduction: {
    headline: "Halo! Saya Febrian Iradatul Rahman",
    summary:
      "Saya adalah mahasiswa semester 5 Program Studi Sistem Informasi di Masoem University dengan dedikasi tinggi dalam menjembatani kebutuhan proses bisnis dengan solusi teknologi perangkat lunak yang inovatif, efisien, dan ramah pengguna.",
    detailedBio:
      "Fokus utama saya saat ini terpusat pada pengembangan aplikasi mobile modern menggunakan React Native dan Expo, perancangan antarmuka pengguna (UI/UX), serta analisis sistem informasi berbasis database relasional. Saya memiliki komitmen kuat terhadap arsitektur kode yang bersih dan terstandarisasi.",
    motto: "“Mengubah tantangan proses bisnis menjadi aplikasi digital yang bernilai nyata.”",
  },

  // Hard Skills dengan Metrik Persentase (Materi P4: Styling Flexbox Progress Bar)
  technicalSkills: [
    { name: "React Native & Expo", level: "Intermediate", percentage: 85, color: "#2563EB" },
    { name: "JavaScript (ES6+) & JSX", level: "Advanced", percentage: 88, color: "#D97706" },
    { name: "Systems Analysis (UML/DFD)", level: "Advanced", percentage: 90, color: "#059669" },
    { name: "UI/UX Design (Figma)", level: "Intermediate", percentage: 80, color: "#7C3AED" },
    { name: "Database & SQL (MySQL)", level: "Intermediate", percentage: 82, color: "#0284C7" },
  ],

  // Bidang Minat / Areas of Interest (Level 2 & 3)
  fieldsOfInterest: [
    {
      id: "interest-1",
      title: "Mobile App Development",
      category: "Frontend & Mobile",
      icon: "phone-portrait-outline",
      accentColor: "#2563EB",
      bgColor: "#EFF6FF",
      description:
        "Pengembangan aplikasi mobile lintas platform (Android & iOS) dengan React Native, Expo, dan integrasi RESTful API.",
      tags: ["React Native", "Expo", "JavaScript (ES6+)", "Mobile UI"],
    },
    {
      id: "interest-2",
      title: "Systems & Business Analysis",
      category: "System Engineering",
      icon: "analytics-outline",
      accentColor: "#059669",
      bgColor: "#ECFDF5",
      description:
        "Analisis kebutuhan pengguna, pemodelan proses bisnis, pembuatan diagram alir sistem (DFD, UML Use Case, ERD), dan penyusunan SRS.",
      tags: ["UML", "DFD", "BPMN", "Business Requirements"],
    },
    {
      id: "interest-3",
      title: "UI/UX & Interactive Design",
      category: "Product Design",
      icon: "color-palette-outline",
      accentColor: "#7C3AED",
      bgColor: "#F5F3FF",
      description:
        "Perancangan wireframe interaktif, user flow, dan desain antarmuka aplikasi yang ergonomis serta mengutamakan user experience.",
      tags: ["Figma", "Design System", "Wireframing", "User Research"],
    },
    {
      id: "interest-4",
      title: "Database Management & SQL",
      category: "Data Management",
      icon: "server-outline",
      accentColor: "#D97706",
      bgColor: "#FFFBEB",
      description:
        "Perancangan relasional basis data, normalisasi data, query SQL teroptimasi, dan integritas data untuk sistem enterprise.",
      tags: ["MySQL", "PostgreSQL", "ERD Modeling", "Data Flow"],
    },
  ],

  // Keunggulan Diri / Key Attributes
  coreAttributes: [
    {
      label: "Problem Solving",
      desc: "Kemampuan memecah permasalahan sistem menjadi komponen logika yang terstruktur dan mudah diimplementasi.",
    },
    {
      label: "Team Collaboration",
      desc: "Mampu berkolaborasi aktif dalam tim pengembangan sistem dan proyek akademik.",
    },
    {
      label: "Continuous Learner",
      desc: "Selalu antusias memperdalam dokumentasi resmi Expo dan perkembangan arsitektur React Native.",
    },
  ],

  // Alamat & Domisili (Data Mahasiswa)
  address: {
    village: "Kp Babakan Stasiun",
    subDistrict: "Kecamatan Cicalengka",
    district: "Kabupaten Bandung",
    province: "Jawa Barat",
    postalCode: "40395",
    fullAddress: "Kp Babakan Stasiun Cicalengka, Kec. Cicalengka, Kab. Bandung",
  },

  // Riwayat Pendidikan Lengkap
  educationHistory: [
    {
      level: "Perguruan Tinggi (S1)",
      school: "Masoem University",
      major: "Sistem Informasi",
      period: "2024 - Sekarang",
      status: "Mahasiswa Aktif (Semester 5)",
      description: "Fokus studi rekayasa sistem informasi, basis data, dan pemrograman mobile modern.",
    },
    {
      level: "SMA / Sederajat",
      school: "SMA",
      major: "MIPA / IPS",
      period: "2021 - 2024",
      status: "Lulus",
      description: "Menyelesaikan pendidikan menengah dengan fondasi matematika dan logika yang kuat.",
    },
    {
      level: "SMP / Sederajat",
      school: "SMP",
      period: "2018 - 2021",
      status: "Lulus",
      description: "Menyelesaikan pendidikan dasar lanjutan dengan aktif dalam kegiatan ekstrakurikuler.",
    },
    {
      level: "SD / Sederajat",
      school: "SD",
      period: "2011 - 2018",
      status: "Lulus",
      description: "Menyelesaikan pendidikan dasar dengan predikat kelulusan baik.",
    },
  ],

  // Kontak Informasi Terstruktur (Materi P4: Flexbox Grid Layout)
  contactItems: [
    {
      type: "email",
      label: "Email Mahasiswa",
      value: "febrian.iradatul@student.masoem.ac.id",
      displayValue: "febrian.iradatul@student.masoem.ac.id",
      icon: "mail-outline",
      color: "#2563EB",
      bgColor: "#EFF6FF",
    },
    {
      type: "phone",
      label: "Nomor WhatsApp / HP",
      value: "+62 821-2425-05024",
      displayValue: "+62 821-2425-05024",
      icon: "call-outline",
      color: "#059669",
      bgColor: "#ECFDF5",
    },
    {
      type: "location",
      label: "Domisili Tempat Tinggal",
      value: "Kp Babakan Stasiun Cicalengka, Kab. Bandung",
      displayValue: "Cicalengka, Bandung",
      icon: "location-outline",
      color: "#D97706",
      bgColor: "#FFFBEB",
    },
    {
      type: "campus",
      label: "Kampus Utama",
      value: "Masoem University, Jl. Raya Cipacing No. 22",
      displayValue: "Masoem Univ, Jabar",
      icon: "business-outline",
      color: "#7C3AED",
      bgColor: "#F5F3FF",
    },
  ],
};
