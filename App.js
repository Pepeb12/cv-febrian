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
import MetricBar from './components/MetricBar';
import PersonalIntroCard from './components/PersonalIntroCard';
import SkillMatrixCard from './components/SkillMatrixCard';
import IdentityDetailCard from './components/IdentityDetailCard';
import ContactGridCard from './components/ContactGridCard';
import Level3CriteriaCard from './components/Level3CriteriaCard';
import { STUDENT_PROFILE } from './data/profileData';
import { COLORS, SPACING } from './theme';

export default function App() {
  const handleShowValidation = () => {
    const info = `LEVEL 3 — ELEMENTARY EVALUATION:\n\n• Mahasiswa: ${STUDENT_PROFILE.fullName}\n• NIM: ${STUDENT_PROFILE.nim}\n• Layout: Terstruktur dengan Flexbox & Design Tokens\n• Bagian: Profile, Metrics, Intro, Skills Matrix, Timeline, & Contact Grid\n• Responsivitas: Terbaca nyaman pada layar ponsel & browser tanpa terpotong.`;

    if (Platform.OS === 'web') {
      window.alert(info);
    } else {
      Alert.alert('Verifikasi Capaian Level 3', info, [{ text: 'OK', style: 'default' }]);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right', 'bottom']}>
        <StatusBar style="dark" backgroundColor="#FFFFFF" />

        {/* Outer Container (Simulator Frame di Web & Full Screen di Android) */}
        <View style={styles.appContainer}>
          {/* Header Institusi & Level 3 Badge */}
          <Header />

          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* 1. KARTU IDENTITAS UTAMA (Digital Student Card) */}
            <ProfileCard profile={STUDENT_PROFILE} />

            {/* 2. STATISTIK METRIK AKADEMIK (Materi P4: Flexbox Grid Row) */}
            <MetricBar metrics={STUDENT_PROFILE.academicMetrics} />

            {/* 3. CHECKLIST EVALUASI LEVEL 3 (Layout & Styling Verification) */}
            <Level3CriteriaCard onShowDetail={handleShowValidation} />

            {/* 4. PERSONAL INTRODUCTION & BIDANG MINAT SPESIALISASI */}
            <PersonalIntroCard profile={STUDENT_PROFILE} />

            {/* 5. KEAHLIAN TEKNIS DENGAN VISUAL PROGRESS BARS (Materi P4) */}
            <SkillMatrixCard skills={STUDENT_PROFILE.technicalSkills} />

            {/* 6. RIWAYAT PENDIDIKAN (TIMELINE) & DOMISILI ALAMAT */}
            <IdentityDetailCard profile={STUDENT_PROFILE} />

            {/* 7. GRID KONTAK & KOMUNIKASI (Materi P4: 2-Column Wrap Grid) */}
            <ContactGridCard contactItems={STUDENT_PROFILE.contactItems} />

            {/* 8. FOOTER INFORMASI UTS */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>
                UTS Pemrograman Mobile • Masoem University
              </Text>
              <Text style={styles.footerSubtext}>
                Personal CV & Academic Score App — LEVEL 3 (Elementary)
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
    maxWidth: 500, // Menjaga rasio smartphone pada layar browser desktop
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
