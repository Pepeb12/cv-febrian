import React from 'react';
import { View, Text, Image, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

/**
 * ProfileCard Component (Level 1 & Level 2)
 * Menampilkan:
 * 1. Foto Profil Mahasiswa (Level 1)
 * 2. Nama Lengkap Mahasiswa (Level 1)
 * 3. NIM Mahasiswa (Level 1)
 * 4. Profesi / Gelar Minat Profesional (Level 2)
 * 5. Tagline & Status Kemahasiswaan Aktif (Level 2)
 */
export default function ProfileCard({ profile }) {
  return (
    <View style={styles.card}>
      {/* Background Banner Header */}
      <View style={styles.cardHeaderBanner} />

      <View style={styles.cardContent}>
        {/* Foto Profil Mahasiswa (Persyaratan Level 1) */}
        <View style={styles.avatarWrapper}>
          <Image
            source={require('../assets/profile.png')}
            style={styles.avatar}
            resizeMode="cover"
          />
          {/* Active Status Indicator */}
          <View style={styles.activeDot} />
        </View>

        {/* Nama Lengkap Mahasiswa (Persyaratan Level 1) */}
        <Text style={styles.fullName}>{profile.fullName}</Text>

        {/* Profesi & Minat Utama (Persyaratan Level 2) */}
        <View style={styles.professionContainer}>
          <Ionicons name="briefcase" size={14} color="#1E40AF" />
          <Text style={styles.professionText}>{profile.professionTitle}</Text>
        </View>

        {/* Tagline Personal */}
        <Text style={styles.taglineText}>"{profile.tagline}"</Text>

        {/* Badge NIM Mahasiswa (Persyaratan Level 1) */}
        <View style={styles.nimContainer}>
          <Ionicons name="card-outline" size={15} color="#0369A1" />
          <Text style={styles.nimLabel}>NIM:</Text>
          <Text style={styles.nimValue}>{profile.nim}</Text>
        </View>

        {/* Program Studi & Perguruan Tinggi */}
        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Ionicons name="book-outline" size={14} color="#64748B" />
            <Text style={styles.metaText}>{profile.studyProgram}</Text>
          </View>
          <Text style={styles.metaSeparator}>•</Text>
          <View style={styles.metaItem}>
            <Ionicons name="calendar-outline" size={14} color="#64748B" />
            <Text style={styles.metaText}>Semester {profile.semester}</Text>
          </View>
        </View>

        {/* Nama Kampus */}
        <View style={styles.universityRow}>
          <Ionicons name="business" size={14} color="#475569" />
          <Text style={styles.universityText}>{profile.university}</Text>
        </View>

        {/* Status Mahasiswa Aktif Pill */}
        <View style={styles.statusPill}>
          <View style={styles.greenCircle} />
          <Text style={styles.statusText}>{profile.status}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 10,
      },
      android: {
        elevation: 4,
      },
    }),
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  cardHeaderBanner: {
    height: 85,
    backgroundColor: '#1E40AF',
  },
  cardContent: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 22,
    marginTop: -50,
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    backgroundColor: '#E2E8F0',
  },
  activeDot: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#22C55E',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  fullName: {
    fontSize: 21,
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'center',
    marginBottom: 4,
  },
  professionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 20,
    gap: 6,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  professionText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1E40AF',
  },
  taglineText: {
    fontSize: 12,
    fontStyle: 'italic',
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  nimContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F9FF',
    paddingVertical: 5,
    paddingHorizontal: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#BAE6FD',
    marginBottom: 12,
    gap: 6,
  },
  nimLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0369A1',
  },
  nimValue: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0369A1',
    letterSpacing: 0.8,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaSeparator: {
    color: '#CBD5E1',
    fontSize: 14,
  },
  metaText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#334155',
  },
  universityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 12,
  },
  universityText: {
    fontSize: 13,
    color: '#475569',
    fontWeight: '600',
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DCFCE7',
    gap: 6,
  },
  greenCircle: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#22C55E',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#16A34A',
  },
});
