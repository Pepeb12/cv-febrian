import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Level2CriteriaCard({ onShowDetail }) {
  const criteria = [
    {
      title: 'Seluruh Persyaratan Level 1 Terpenuhi',
      desc: 'NIM (242505024), Nama Lengkap, & Foto Profil aktif',
    },
    {
      title: 'Menampilkan Profesi & Bidang Minat',
      desc: 'Junior Systems Analyst & 4 Spesialisasi SI',
    },
    {
      title: 'Deskripsi Singkat Personal Introduction',
      desc: 'Pengenalan diri, latar belakang, dan visi karir',
    },
    {
      title: 'Judul & Heading Sesuai dan Terstruktur',
      desc: 'Komponen SectionHeading hierarkis berbasis JSX',
    },
    {
      title: 'Penerapan Materi P2 (JS, JSX, Component)',
      desc: 'ES6+ destructuring, array map, modular architecture',
    },
  ];

  return (
    <View style={styles.criteriaCard}>
      <View style={styles.criteriaHeader}>
        <View style={styles.badgeIcon}>
          <Ionicons name="trophy" size={16} color="#D97706" />
        </View>
        <View style={styles.headerTextCol}>
          <Text style={styles.criteriaTitle}>Checklist Evaluasi LEVEL 2 — BEGINNER</Text>
          <Text style={styles.criteriaSubtitle}>Fokus: Personal Introduction & Bidang Minat</Text>
        </View>
      </View>

      <View style={styles.criteriaList}>
        {criteria.map((item, index) => (
          <View key={index} style={styles.criteriaItem}>
            <Ionicons name="checkmark-circle" size={18} color="#16A34A" />
            <View style={styles.itemTextCol}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemDesc}>{item.desc}</Text>
            </View>
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={styles.verifyButton}
        activeOpacity={0.8}
        onPress={onShowDetail}
      >
        <Ionicons name="shield-checkmark-outline" size={16} color="#1E40AF" />
        <Text style={styles.verifyButtonText}>Verifikasi Validasi Data Level 2</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
    gap: 10,
    marginBottom: 14,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#DCFCE7',
  },
  badgeIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTextCol: {
    flex: 1,
  },
  criteriaTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#15803D',
  },
  criteriaSubtitle: {
    fontSize: 11,
    color: '#166534',
    fontWeight: '500',
  },
  criteriaList: {
    gap: 10,
  },
  criteriaItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  itemTextCol: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#14532D',
  },
  itemDesc: {
    fontSize: 11,
    color: '#166534',
    marginTop: 1,
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
    fontSize: 12,
    fontWeight: '700',
    color: '#1E40AF',
  },
});

