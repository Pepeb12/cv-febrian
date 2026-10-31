import React from 'react';
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
import PersonalIntroCard from './components/PersonalIntroCard';
import IdentityDetailCard from './components/IdentityDetailCard';
import Level2CriteriaCard from './components/Level2CriteriaCard';
import { STUDENT_PROFILE } from './data/profileData';

export default function App() {
  const handleShowValidation = () => {
    const info = `LEVEL 2 — BEGINNER VALIDATION:\n\n• Mahasiswa: ${STUDENT_PROFILE.fullName}\n• NIM: ${STUDENT_PROFILE.nim}\n• Profesi/Minat: ${STUDENT_PROFILE.professionTitle}\n• Program Studi: ${STUDENT_PROFILE.studyProgram} (Semester ${STUDENT_PROFILE.semester})\n• Kampus: ${STUDENT_PROFILE.university}\n• Fokus Minat: Mobile App, Systems Analysis, UI/UX, Database`;

    if (Platform.OS === 'web') {
      window.alert(info);
    } else {
      Alert.alert('Verifikasi Capaian Level 2', info, [{ text: 'OK', style: 'default' }]);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right', 'bottom']}>
        <StatusBar style="dark" backgroundColor="#FFFFFF" />

        {/* Outer Container (Simulator Frame di Web & Full Screen di Android) */}
        <View style={styles.appContainer}>
          {/* Header Institusi & Level Badge */}
          <Header />

          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* 1. KARTU PROFIL UTAMA (Level 1 & Level 2: Foto, Nama, NIM, Profesi) */}
            <ProfileCard profile={STUDENT_PROFILE} />

            {/* 2. CHECKLIST EVALUASI LEVEL 2 (Menampilkan Pemenuhan Kriteria) */}
            <Level2CriteriaCard onShowDetail={handleShowValidation} />

            {/* 3. PERSONAL INTRODUCTION & BIDANG MINAT (Fokus Utama Level 2) */}
            <PersonalIntroCard profile={STUDENT_PROFILE} />

            {/* 4. DETAIL RIWAYAT PENDIDIKAN & DOMISILI ALAMAT */}
            <IdentityDetailCard profile={STUDENT_PROFILE} />

            {/* 5. FOOTER INFORMASI UTS */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>
                UTS Pemrograman Mobile • Masoem University
              </Text>
              <Text style={styles.footerSubtext}>
                Personal CV & Academic Score App — Level 2 (Beginner)
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
    backgroundColor: Platform.select({ web: '#F1F5F9', default: '#F8FAFC' }),
    alignItems: 'center',
  },
  appContainer: {
    flex: 1,
    width: '100%',
    maxWidth: 500, // Menjaga rasio tampilan mobile di layar Web desktop
    backgroundColor: '#F8FAFC',
    ...Platform.select({
      web: {
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.08)',
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: '#E2E8F0',
      },
    }),
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 36,
  },
  footer: {
    marginTop: 16,
    alignItems: 'center',
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  footerText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
  },
  footerSubtext: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  copyrightText: {
    fontSize: 10,
    color: '#94A3B8',
    marginTop: 4,
  },
});
