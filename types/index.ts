/**
 * TypeScript Type Definitions
 * Personal CV & Academic Score App
 */

export interface ThemeColors {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  primaryBorder: string;
  background: string;
  surface: string;
  surfaceMuted: string;
  surfaceSubtle: string;
  text: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  textLight: string;
  border: string;
  borderLight: string;
  success: string;
  successLight: string;
  warning: string;
  error: string;
  isDark: boolean;
  accentCyan: string;
  accentIndigo: string;
  accentAmber: string;
  cardHeaderBanner?: string;
}

export interface EducationItem {
  level: string;
  school?: string;
  institution?: string;
  major?: string;
  period: string;
  status: string;
  description: string;
}

export interface AcademicMetric {
  label: string;
  value: string;
  unit: string;
  icon: string;
}

export interface TechnicalSkill {
  name: string;
  level: string;
  percentage: number;
  color: string;
  category?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  role: string;
  year: string;
  icon: string;
  accentColor: string;
  shortDesc: string;
  fullDesc: string;
  technologies: string[];
  features: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  type: string;
  icon: string;
  color: string;
  description: string;
}

export interface HobbyItem {
  id: string;
  name: string;
  icon: string;
  color: string;
  bg: string;
  desc: string;
}

export interface ContactItem {
  type: string;
  label: string;
  value: string;
  displayValue: string;
  icon: string;
  color: string;
  bgColor: string;
}

export interface StudentProfile {
  nim: string;
  nama: string;
  namaPanggilan: string;
  fullName: string;
  shortName: string;
  prodi: string;
  studyProgram: string;
  fakultas: string;
  faculty: string;
  kampus: string;
  university: string;
  semester: number;
  tahunAkademik: string;
  status: string;
  profesi: string;
  professionTitle: string;
  tagline: string;
  deskripsi: string;
  initialEndorseCount: number;
  introduction: {
    headline: string;
    summary: string;
    detailedBio: string;
    motto: string;
  };
  address: {
    village: string;
    subDistrict: string;
    district: string;
    province: string;
    postalCode: string;
    fullAddress: string;
  };
  academicMetrics: AcademicMetric[];
  technicalSkills: TechnicalSkill[];
  portfolios: PortfolioItem[];
  experience: ExperienceItem[];
  hobbies: HobbyItem[];
  educationHistory: EducationItem[];
  contactItems: ContactItem[];
}

export interface LearningProgressItem {
  id?: string;
  name?: string;
  label?: string;
  percentage: number;
  description?: string;
}

export interface AcademicScoreData {
  studentIdentity: {
    name?: string;
    nama?: string;
    nim: string;
    course?: string;
    mataKuliah?: string;
    lecturer?: string;
    dosen?: string;
    semester: string | number;
    studyProgram?: string;
    prodi?: string;
    faculty?: string;
    university?: string;
    kampus?: string;
  };
  currentScore: {
    score: number;
    grade: string;
    status: string;
    keterangan: string;
    maxScore?: number;
    gradeScale?: string;
  };
  learningPoints: {
    total: number;
    unit: string;
    rank: string;
    nextMilestone: number;
    title?: string;
  };
  learningProgress: LearningProgressItem[];
}
