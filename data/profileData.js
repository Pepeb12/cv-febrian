// Data Profil Mahasiswa untuk Personal CV & Academic Score App
// Sesuai dengan data Febrian Iradatul Rahman (NIM: 242505024)
// Diperbarui untuk pemenuhan LEVEL 2 — BEGINNER: Personal Introduction & Bidang Minat

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

  // Profesi & Spesialisasi (Level 2)
  professionTitle: "Junior Systems Analyst & Mobile App Developer",
  tagline: "Bridging Business Logic & Modern Mobile Experiences",

  // Deskripsi Singkat / Personal Introduction (Level 2)
  introduction: {
    headline: "Halo! Saya Febrian Iradatul Rahman",
    summary:
      "Saya adalah mahasiswa semester 5 Program Studi Sistem Informasi di Masoem University dengan dedikasi tinggi dalam menjembatani kebutuhan proses bisnis dengan solusi teknologi perangkat lunak yang inovatif, efisien, dan ramah pengguna.",
    detailedBio:
      "Fokus utama saya saat ini terpusat pada pengembangan aplikasi mobile modern menggunakan React Native dan Expo, perancangan antarmuka pengguna (UI/UX), serta analisis sistem informasi berbasis database. Saya memiliki antusiasme tinggi untuk terus mempelajari teknologi terdepan dalam ekosistem JavaScript dan arsitektur sistem informasi enterprise.",
    motto: "“Mengubah tantangan proses bisnis menjadi aplikasi digital yang bernilai nyata.”",
  },

  // Bidang Minat / Areas of Interest (Level 2)
  fieldsOfInterest: [
    {
      id: "interest-1",
      title: "Mobile App Development",
      category: "Frontend & Mobile",
      icon: "phone-portrait-outline",
      accentColor: "#2563EB", // Blue
      bgColor: "#EFF6FF",
      description:
        "Pengembangan aplikasi mobile lintas platform (Android & iOS) menggunakan React Native, Expo, dan integrasi RESTful API.",
      tags: ["React Native", "Expo", "JavaScript (ES6+)", "Mobile UI"],
    },
    {
      id: "interest-2",
      title: "Systems & Business Analysis",
      category: "System Engineering",
      icon: "analytics-outline",
      accentColor: "#059669", // Emerald Green
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
      accentColor: "#7C3AED", // Violet
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
      accentColor: "#D97706", // Amber
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
      desc: "Kemampuan memecah permasalahan sistem menjadi komponen logika yang terstruktur.",
    },
    {
      label: "Team Collaboration",
      desc: "Mampu berkolaborasi aktif dalam tim pengembangan sistem dan proyek akademik.",
    },
    {
      label: "Continuous Learner",
      desc: "Selalu antusias memperdalam dokumentasi resmi Expo dan ekosistem React.",
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

  // Riwayat Pendidikan
  educationHistory: [
    {
      level: "Perguruan Tinggi (S1)",
      school: "Masoem University",
      major: "Sistem Informasi",
      period: "2024 - Sekarang",
      status: "Mahasiswa Aktif (Semester 5)",
    },
    {
      level: "SMA / Sederajat",
      school: "SMA",
      major: "MIPA / IPS",
      period: "2021 - 2024",
      status: "Lulus",
    },
    {
      level: "SMP / Sederajat",
      school: "SMP",
      period: "2018 - 2021",
      status: "Lulus",
    },
    {
      level: "SD / Sederajat",
      school: "SD",
      period: "2011 - 2018",
      status: "Lulus",
    },
  ],

  // Kontak Informasi
  contact: {
    email: "febrian.iradatul@student.masoem.ac.id",
    phone: "+62 821-xxxx-xxxx",
    location: "Cicalengka, Kab. Bandung",
  },
};
