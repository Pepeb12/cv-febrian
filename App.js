import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import Header from './components/Header';
import ProfileCard from './components/ProfileCard';
import IdentityDetailCard from './components/IdentityDetailCard';
import { STUDENT_PROFILE } from './data/profileData';

export default function App() {
  const handleVerifyAlert = () => {
    Alert.alert(
      'Verifikasi Identitas Mahasiswa',
      `Nama: ${STUDENT_PROFILE.fullName}\nNIM: ${STUDENT_PROFILE.nim}\nProdi: ${STUDENT_PROFILE.studyProgram}\nSemester: ${STUDENT_PROFILE.semester}\nStatus: ${STUDENT_PROFILE.status}\nKampus: ${STUDENT_PROFILE.university}`,
      [{ text: 'OK', style: 'default' }]
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <StatusBar style="dark" backgroundColor="#FFFFFF" />

        {/* Header Identitas Institusi */}
        <Header />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Card Utama: Foto Profil, Nama Lengkap & NIM (Persyaratan Level 1) */}
          <ProfileCard profile={STUDENT_PROFILE} />

          {/* Banner Checklist Verifikasi Persyaratan Level 1 */}
          <View style={styles.criteriaCard}>
            <View style={styles.criteriaHeader}>
              <Ionicons name="shield-checkmark" size={18} color="#16A34A" />
              <Text style={styles.criteriaTitle}>Checklist Evaluasi Level 1 (Novice)</Text>
            </View>
            <View style={styles.criteriaList}>
              <View style={styles.criteriaItem}>
                <Ionicons name="checkmark-circle" size={16} color="#16A34A" />
                <Text style={styles.criteriaText}>
                  NIM Ditampilkan: <Text style={styles.boldText}>{STUDENT_PROFILE.nim}</Text>
                </Text>
              </View>
              <View style={styles.criteriaItem}>
                <Ionicons name="checkmark-circle" size={16} color="#16A34A" />
                <Text style={styles.criteriaText}>
                  Nama Lengkap: <Text style={styles.boldText}>{STUDENT_PROFILE.fullName}</Text>
                </Text>
              </View>
              <View style={styles.criteriaItem}>
                <Ionicons name="checkmark-circle" size={16} color="#16A34A" />
                <Text style={styles.criteriaText}>
                  Foto Profil Mahasiswa: <Text style={styles.boldText}>Aktif & Ditampilkan</Text>
                </Text>
              </View>
              <View style={styles.criteriaItem}>
                <Ionicons name="checkmark-circle" size={16} color="#16A34A" />
                <Text style={styles.criteriaText}>
                  Status Aplikasi: <Text style={styles.boldText}>Berjalan Lancar (Running)</Text>
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.verifyButton}
              activeOpacity={0.8}
              onPress={handleVerifyAlert}
            >
              <Ionicons name="information-circle-outline" size={18} color="#1E40AF" />
              <Text style={styles.verifyButtonText}>Cek Detail Validasi Data</Text>
            </TouchableOpacity>
          </View>

          {/* Rincian Identitas Lengkap (Domisili, Pendidikan, Bio) */}
          <IdentityDetailCard profile={STUDENT_PROFILE} />

          {/* Footer Ujian Tengah Semester */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              UTS Pemrograman Mobile • Masoem University
            </Text>
            <Text style={styles.footerSubtext}>
              Personal CV & Academic Score App © 2026 Febrian Iradatul Rahman
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  criteriaCard: {
    backgroundColor: '#F0FDF4',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#BBF7D0',
    marginBottom: 20,
  },
  criteriaHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  criteriaTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#15803D',
  },
  criteriaList: {
    gap: 8,
  },
  criteriaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  criteriaText: {
    fontSize: 13,
    color: '#166534',
  },
  boldText: {
    fontWeight: '700',
    color: '#14532D',
  },
  verifyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 14,
    borderWidth: 1,
    borderColor: '#BFDBFE',
    gap: 6,
  },
  verifyButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1E40AF',
  },
  footer: {
    marginTop: 28,
    alignItems: 'center',
    paddingVertical: 12,
  },
  footerText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  footerSubtext: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 4,
  },
});
