import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function IdentityDetailCard({ profile }) {
  return (
    <View style={styles.container}>
      {/* Kartu Informasi Domisili / Alamat */}
      <View style={styles.card}>
        <View style={styles.cardTitleRow}>
          <View style={[styles.iconBox, { backgroundColor: '#FEF3C7' }]}>
            <Ionicons name="location" size={18} color="#D97706" />
          </View>
          <Text style={styles.cardTitle}>Alamat & Domisili</Text>
        </View>
        <View style={styles.cardBody}>
          <Text style={styles.addressText}>{profile.address.fullAddress}</Text>
          <View style={styles.addressTags}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>{profile.address.subDistrict}</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>{profile.address.district}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Kartu Jenjang Pendidikan */}
      <View style={styles.card}>
        <View style={styles.cardTitleRow}>
          <View style={[styles.iconBox, { backgroundColor: '#EDE9FE' }]}>
            <Ionicons name="school" size={18} color="#7C3AED" />
          </View>
          <Text style={styles.cardTitle}>Riwayat Pendidikan</Text>
        </View>
        <View style={styles.timelineContainer}>
          {profile.educationHistory.map((edu, index) => {
            const isLatest = index === 0;
            return (
              <View key={index} style={styles.timelineItem}>
                <View style={styles.timelineLeftCol}>
                  <View
                    style={[
                      styles.timelineDot,
                      isLatest ? styles.timelineDotActive : null,
                    ]}
                  />
                  {index < profile.educationHistory.length - 1 && (
                    <View style={styles.timelineLine} />
                  )}
                </View>
                <View style={styles.timelineContent}>
                  <View style={styles.timelineHeader}>
                    <Text
                      style={[
                        styles.educationSchool,
                        isLatest ? styles.activeSchoolText : null,
                      ]}
                    >
                      {edu.school}
                    </Text>
                    <Text style={styles.educationPeriod}>{edu.period}</Text>
                  </View>
                  <Text style={styles.educationLevel}>
                    {edu.level} {edu.major ? `• ${edu.major}` : ''}
                  </Text>
                  <Text style={styles.educationStatus}>Status: {edu.status}</Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>

      {/* Kartu Profil & Minat Sistem Informasi */}
      <View style={styles.card}>
        <View style={styles.cardTitleRow}>
          <View style={[styles.iconBox, { backgroundColor: '#E0F2FE' }]}>
            <Ionicons name="person" size={18} color="#0284C7" />
          </View>
          <Text style={styles.cardTitle}>Tentang Mahasiswa</Text>
        </View>
        <Text style={styles.bioText}>{profile.bio}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 10,
  },
  iconBox: {
    width: 34,
    height: 34,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  cardBody: {
    gap: 8,
  },
  addressText: {
    fontSize: 14,
    color: '#334155',
    lineHeight: 20,
    fontWeight: '500',
  },
  addressTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
  },
  tag: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  tagText: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '500',
  },
  timelineContainer: {
    paddingLeft: 4,
    marginTop: 4,
  },
  timelineItem: {
    flexDirection: 'row',
    position: 'relative',
    marginBottom: 16,
  },
  timelineLeftCol: {
    width: 24,
    alignItems: 'center',
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#CBD5E1',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    marginTop: 2,
    zIndex: 2,
  },
  timelineDotActive: {
    backgroundColor: '#1E40AF',
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  timelineLine: {
    position: 'absolute',
    top: 14,
    bottom: -16,
    width: 2,
    backgroundColor: '#E2E8F0',
    zIndex: 1,
  },
  timelineContent: {
    flex: 1,
    paddingLeft: 10,
  },
  timelineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  educationSchool: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E293B',
  },
  activeSchoolText: {
    color: '#1E40AF',
  },
  educationPeriod: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  educationLevel: {
    fontSize: 13,
    color: '#475569',
    fontWeight: '500',
    marginBottom: 2,
  },
  educationStatus: {
    fontSize: 11,
    color: '#94A3B8',
    fontStyle: 'italic',
  },
  bioText: {
    fontSize: 13,
    lineHeight: 20,
    color: '#334155',
  },
});

