import React from 'react';
import { View, Text, Image, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileCard({ profile }) {
  return (
    <View style={styles.card}>
      {/* Background Banner Decoration */}
      <View style={styles.cardHeaderBanner} />

      <View style={styles.cardContent}>
        {/* Foto Profil Mahasiswa */}
        <View style={styles.avatarWrapper}>
          <Image
            source={require('../assets/profile.png')}
            style={styles.avatar}
            resizeMode="cover"
          />
          {/* Online/Active Badge */}
          <View style={styles.activeDot} />
        </View>

        {/* Nama Lengkap Mahasiswa */}
        <Text style={styles.fullName}>{profile.fullName}</Text>

        {/* Badge NIM Mahasiswa (Highlight Utama Persyaratan Level 1) */}
        <View style={styles.nimContainer}>
          <Ionicons name="card-outline" size={16} color="#1E40AF" />
          <Text style={styles.nimLabel}>NIM:</Text>
          <Text style={styles.nimValue}>{profile.nim}</Text>
        </View>

        {/* Jurusan & Semester */}
        <Text style={styles.studyProgram}>
          {profile.studyProgram} • Semester {profile.semester}
        </Text>

        {/* Perguruan Tinggi */}
        <View style={styles.universityRow}>
          <Ionicons name="business-outline" size={14} color="#64748B" />
          <Text style={styles.universityText}>{profile.university}</Text>
        </View>

        {/* Status Tag Pill */}
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
    height: 80,
    backgroundColor: '#1E40AF',
  },
  cardContent: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 24,
    marginTop: -45,
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 12,
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
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'center',
    marginBottom: 8,
  },
  nimContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#BFDBFE',
    marginBottom: 10,
    gap: 6,
  },
  nimLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1E40AF',
  },
  nimValue: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1E40AF',
    letterSpacing: 0.8,
  },
  studyProgram: {
    fontSize: 15,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 4,
  },
  universityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 12,
  },
  universityText: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '500',
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

