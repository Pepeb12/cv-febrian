import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SectionHeading from './SectionHeading';

/**
 * PersonalIntroCard Component (Pemenuhan Fokus Utama LEVEL 2 — BEGINNER)
 * 1. Personal Introduction (Deskripsi Singkat Diri Sendiri)
 * 2. Bidang Minat / Areas of Interest dengan JSX Component
 * 3. Nilai Keunggulan / Core Attributes
 */
export default function PersonalIntroCard({ profile }) {
  const { introduction, fieldsOfInterest, coreAttributes } = profile;

  return (
    <View style={styles.container}>
      {/* SECTION 1: Personal Introduction (Deskripsi Diri Sendiri) */}
      <View style={styles.card}>
        <SectionHeading
          title="Tentang Saya"
          subtitle="Personal Introduction & Career Vision"
          icon="person-circle"
          badgeText="Introduction"
        />

        <View style={styles.introContent}>
          <Text style={styles.headlineText}>{introduction.headline}</Text>
          <Text style={styles.paragraphText}>{introduction.summary}</Text>
          <Text style={styles.paragraphText}>{introduction.detailedBio}</Text>

          {/* Kutipan / Personal Motto */}
          <View style={styles.quoteBox}>
            <Ionicons name="chatbubble-ellipses" size={16} color="#2563EB" />
            <Text style={styles.quoteText}>{introduction.motto}</Text>
          </View>
        </View>

        {/* Core Attributes Pill Grid */}
        <View style={styles.attributesContainer}>
          {coreAttributes.map((attr, index) => (
            <View key={index} style={styles.attributeItem}>
              <View style={styles.attrBullet} />
              <View style={styles.attrTextCol}>
                <Text style={styles.attrLabel}>{attr.label}</Text>
                <Text style={styles.attrDesc}>{attr.desc}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* SECTION 2: Bidang Minat / Areas of Interest */}
      <View style={styles.card}>
        <SectionHeading
          title="Bidang Minat & Spesialisasi"
          subtitle="Areas of Interest in Information Systems"
          icon="sparkles"
          badgeText="Skills & Interest"
        />

        <View style={styles.interestsList}>
          {fieldsOfInterest.map((item) => (
            <View
              key={item.id}
              style={[styles.interestCard, { borderLeftColor: item.accentColor }]}
            >
              <View style={styles.interestTopRow}>
                <View
                  style={[
                    styles.interestIconBox,
                    { backgroundColor: item.bgColor },
                  ]}
                >
                  <Ionicons
                    name={item.icon}
                    size={20}
                    color={item.accentColor}
                  />
                </View>
                <View style={styles.interestTitleCol}>
                  <Text style={styles.interestTitle}>{item.title}</Text>
                  <Text style={styles.interestCategory}>{item.category}</Text>
                </View>
              </View>

              <Text style={styles.interestDescription}>
                {item.description}
              </Text>

              {/* Tag / Chips Keahlian terkait Minat */}
              <View style={styles.tagWrap}>
                {item.tags.map((tag, tagIdx) => (
                  <View key={tagIdx} style={styles.tagPill}>
                    <Text style={styles.tagPillText}>{tag}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
    marginBottom: 20,
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
  introContent: {
    gap: 10,
    marginTop: 4,
  },
  headlineText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
  },
  paragraphText: {
    fontSize: 13,
    color: '#334155',
    lineHeight: 20,
    textAlign: 'justify',
  },
  quoteBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    borderRadius: 10,
    padding: 12,
    gap: 10,
    marginTop: 4,
    borderLeftWidth: 3,
    borderLeftColor: '#2563EB',
  },
  quoteText: {
    fontSize: 12,
    fontStyle: 'italic',
    color: '#1D4ED8',
    flex: 1,
    fontWeight: '500',
  },
  attributesContainer: {
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    gap: 8,
  },
  attributeItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  attrBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#3B82F6',
    marginTop: 6,
  },
  attrTextCol: {
    flex: 1,
  },
  attrLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1E293B',
  },
  attrDesc: {
    fontSize: 11,
    color: '#64748B',
    lineHeight: 16,
  },
  interestsList: {
    gap: 12,
    marginTop: 6,
  },
  interestCard: {
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderLeftWidth: 4,
  },
  interestTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 6,
  },
  interestIconBox: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  interestTitleCol: {
    flex: 1,
  },
  interestTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  interestCategory: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
  },
  interestDescription: {
    fontSize: 12,
    color: '#475569',
    lineHeight: 18,
    marginBottom: 10,
  },
  tagWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  tagPill: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  tagPillText: {
    fontSize: 11,
    color: '#334155',
    fontWeight: '600',
  },
});

