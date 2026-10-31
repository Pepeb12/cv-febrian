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

import Header from './components/Header';
import ProfileCard from './components/ProfileCard';
import MetricBar from './components/MetricBar';
import InteractiveEndorseBar from './components/InteractiveEndorseBar';
import PersonalIntroCard from './components/PersonalIntroCard';
import SkillMatrixCard from './components/SkillMatrixCard';
import IdentityDetailCard from './components/IdentityDetailCard';
import ContactGridCard from './components/ContactGridCard';
import ContactFormCard from './components/ContactFormCard';
import Level4CriteriaCard from './components/Level4CriteriaCard';
import { STUDENT_PROFILE } from './data/profileData';
import { COLORS, SPACING } from './theme';

export default function App() {
  // State di level root (Materi P3 & P5: Props & State)
  const [messagesReceivedCount, setMessagesReceivedCount] = useState(0);

  const handleMessageSent = (payload) => {
    setMessagesReceivedCount((prev) => prev + 1);
  };

  const handleShowValidation = () => {
    const info = `LEVEL 4 — INTERMEDIATE EVALUATION:\n\n• Mahasiswa: ${STUDENT_PROFILE.fullName}\n• NIM: ${STUDENT_PROFILE.nim}\n• Pengelolaan State: Form Kontak (nama, email, pesan), Filter Keahlian, & Counter Endorsement\n• Validasi Input: Validasi string kosong, panjang karakter, & format email regex\n• Respons UI: Kartu respon sukses pesan & notifikasi popup\n• Total Pesan Terkirim di Sesi Ini: ${messagesReceivedCount}`;

    if (Platform.OS === 'web') {
      window.alert(info);
    } else {
      Alert.alert('Verifikasi Capaian Level 4', info, [{ text: 'OK', style: 'default' }]);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right', 'bottom']}>
        <StatusBar style="dark" backgroundColor="#FFFFFF" />

        {/* Outer Container (Responsive Mobile Simulator Frame di Web & Full Screen di Android) */}
        <View style={styles.appContainer}>
          {/* Header Institusi & Level 4 Indicator */}
          <Header />

          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* 1. KARTU PROFIL UTAMA (Digital Student Card) */}
            <ProfileCard profile={STUDENT_PROFILE} />

            {/* 2. TOMBOL INTERAKSI DUKUNGAN / ENDORSE (Materi P3 & P5: State & Event Handling) */}
            <InteractiveEndorseBar
              studentName={STUDENT_PROFILE.shortName}
              initialCount={48}
            />

            {/* 3. BAR STATISTIK METRIK AKADEMIK (Materi P4: Flexbox Grid) */}
            <MetricBar metrics={STUDENT_PROFILE.academicMetrics} />

            {/* 4. CHECKLIST EVALUASI LEVEL 4 (Interactive CV Verification) */}
            <Level4CriteriaCard onShowDetail={handleShowValidation} />

            {/* 5. FORMULIR KONTAK INTERAKTIF (Materi P5: TextInput, State, Validasi, & Respons) */}
            <ContactFormCard
              recipientName={STUDENT_PROFILE.fullName}
              onMessageSent={handleMessageSent}
            />

            {/* 6. PERSONAL INTRODUCTION & SPESIALISASI MINAT */}
            <PersonalIntroCard profile={STUDENT_PROFILE} />

            {/* 7. KEAHLIAN TEKNIS DENGAN FILTER TABS INTERAKTIF (Materi P3, P4, & P5) */}
            <SkillMatrixCard skills={STUDENT_PROFILE.technicalSkills} />

            {/* 8. RIWAYAT PENDIDIKAN (TIMELINE) & DOMISILI ALAMAT */}
            <IdentityDetailCard profile={STUDENT_PROFILE} />

            {/* 9. GRID KONTAK & KOMUNIKASI (Flexbox 2-Kolom) */}
            <ContactGridCard contactItems={STUDENT_PROFILE.contactItems} />

            {/* 10. FOOTER INFORMASI UTS */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>
                UTS Pemrograman Mobile • Masoem University
              </Text>
              <Text style={styles.footerSubtext}>
                Personal CV & Academic Score App — LEVEL 4 (Intermediate)
              </Text>
              <Text style={styles.copyrightText}>
                © 2026 Febrian Iradatul Rahman ({STUDENT_PROFILE.nim})
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
