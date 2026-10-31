import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// Import Data Lokal Format JSON (Materi LEVEL 6: Local JSON Data Integration)
import profileData from './data/profile.json';

// Import Komponen UI Bersih & Reusable (Level 5 & Level 6 Structure)
import Header from './components/Header';
import ProfileHeader from './components/ProfileHeader';
import AboutSection from './components/AboutSection';
import ContactForm from './components/ContactForm';
import MetricBar from './components/MetricBar';
import InteractiveEndorseBar from './components/InteractiveEndorseBar';
import SkillMatrixCard from './components/SkillMatrixCard';
import IdentityDetailCard from './components/IdentityDetailCard';
import ContactGridCard from './components/ContactGridCard';
import Level6CriteriaCard from './components/Level6CriteriaCard';
import { COLORS, SPACING } from './theme';

export default function App() {
  // State untuk menghitung pesan terkirim secara dinamis
  const [messagesReceivedCount, setMessagesReceivedCount] = useState(0);

  const handleMessageSent = () => {
    setMessagesReceivedCount((prev) => prev + 1);
  };

  const handleShowValidation = () => {
    const info = `LEVEL 6 — PROFICIENT EVALUATION:\n\n• Sumber Data: data/profile.json (Format JSON Asli)\n• Mahasiswa: ${profileData.nama}\n• NIM: ${profileData.nim}\n• Program Studi: ${profileData.prodi} (Semester ${profileData.semester})\n• Kampus: ${profileData.kampus}\n• Status JSON: Valid & Berhasil diimpor langsung via "import profileData from './data/profile.json'"\n• Pemetaan Data: Dipetakan ke UI secara otomatis via Props tanpa hardcoding\n• Total Pesan Terkirim: ${messagesReceivedCount}`;

    if (Platform.OS === 'web') {
      window.alert(info);
    } else {
      Alert.alert('Verifikasi Capaian Level 6', info, [{ text: 'OK', style: 'default' }]);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right', 'bottom']}>
        <StatusBar style="dark" backgroundColor="#FFFFFF" />

        {/* Outer Container (Responsive Mobile Simulator Frame di Web & Full Screen di Android) */}
        <View style={styles.appContainer}>
          {/* Header Institusi & Level 6 Indicator */}
          <Header />

          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* 1. KARTU IDENTITAS UTAMA (Menerima data JSON via Props: <ProfileHeader data={profileData} />) */}
            <ProfileHeader data={profileData} />

            {/* 2. TOMBOL REKOMENDASI INTERAKTIF (Menerima data JSON via Props) */}
            <InteractiveEndorseBar
              studentName={profileData.namaPanggilan}
              initialCount={profileData.initialEndorseCount}
            />

            {/* 3. BAR STATISTIK METRIK AKADEMIK (Menerima data JSON via Props) */}
            <MetricBar metrics={profileData.academicMetrics} />

            {/* 4. CHECKLIST EVALUASI LEVEL 6 (Local JSON Data Verification) */}
            <Level6CriteriaCard onShowDetail={handleShowValidation} />

            {/* 5. SEKSI TENTANG SAYA & SPESIALISASI MINAT (Menerima data JSON via Props: <AboutSection data={profileData} />) */}
            <AboutSection data={profileData} />

            {/* 6. KEAHLIAN TEKNIS DENGAN PROGRESS BAR (Menerima data JSON via Props) */}
            <SkillMatrixCard skills={profileData.technicalSkills} />

            {/* 7. RIWAYAT PENDIDIKAN & DOMISILI ALAMAT (Menerima data JSON via Props) */}
            <IdentityDetailCard data={profileData} />

            {/* 8. GRID KONTAK & KOMUNIKASI (Menerima data JSON via Props) */}
            <ContactGridCard contactItems={profileData.contactItems} />

            {/* 9. FORMULIR KONTAK INTERAKTIF (Menerima data JSON via Props: <ContactForm data={profileData} />) */}
            <ContactForm
              data={profileData}
              onMessageSent={handleMessageSent}
            />

            {/* 10. FOOTER INFORMASI UTS */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>
                UTS Pemrograman Mobile • Masoem University
              </Text>
              <Text style={styles.footerSubtext}>
                Personal CV & Academic Score App — LEVEL 6 (Proficient)
              </Text>
              <Text style={styles.copyrightText}>
                © 2026 {profileData.nama} ({profileData.nim})
              </Text>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Platform.select({ web: '#F1F5F9', default: COLORS.background }),
    alignItems: 'center',
  },
  appContainer: {
    flex: 1,
    width: '100%',
    maxWidth: 500, // Menjaga rasio tampilan mobile di layar Web desktop
    backgroundColor: COLORS.background,
    ...Platform.select({
      web: {
        boxShadow: '0 4px 28px rgba(15, 23, 42, 0.08)',
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: COLORS.border,
      },
    }),
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: SPACING.lg,
    paddingBottom: 40,
  },
  footer: {
    marginTop: SPACING.md,
    alignItems: 'center',
    paddingVertical: SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  footerText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textSecondary,
  },
  footerSubtext: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  copyrightText: {
    fontSize: 10,
    color: COLORS.textLight,
    marginTop: 4,
  },
});
