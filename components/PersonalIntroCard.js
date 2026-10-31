import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SectionHeading from './SectionHeading';
import { COLORS, SHADOWS, SPACING } from '../theme';

/**
 * PersonalIntroCard Component (Level 2 & Level 3)
 * Menampilkan:
 * 1. Personal Introduction & Kutipan Nilai Diri
 * 2. 4 Bidang Minat Sistem Informasi dengan Icon & Chips
 * 3. Nilai Atribut Keunggulan Personal
 */
export default function PersonalIntroCard({ profile }) {
  const { introduction, fieldsOfInterest, coreAttributes } = profile;

  return (
    <View style={styles.container}>
      {/* SECTION 1: Personal Introduction */}
      <View style={styles.card}>
        <SectionHeading
          title="Tentang Saya"
          subtitle="Personal Introduction & Career Vision"
          icon="person-circle"
          badgeText="Intro"
        />

        <View style={styles.introContent}>
          <Text style={styles.headlineText}>{introduction.headline}</Text>
          <Text style={styles.paragraphText}>{introduction.summary}</Text>
          <Text style={styles.paragraphText}>{introduction.detailedBio}</Text>

          {/* Kutipan / Personal Motto */}
          <View style={styles.quoteBox}>
            <Ionicons name="chatbubble-ellipses" size={16} color={COLORS.primary} />
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
          badgeText="Spesialisasi"
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
    gap: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    ...SHADOWS.md,
  },
  introContent: {
    gap: SPACING.sm,
    marginTop: SPACING.xs,
  },
  headlineText: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  paragraphText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 21,
    textAlign: 'justify',
  },
  quoteBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primaryLight,
    borderRadius: 10,
    padding: SPACING.md,
    gap: SPACING.sm,
    marginTop: SPACING.xs,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.primary,
  },
  quoteText: {
    fontSize: 12,
    fontStyle: 'italic',
    color: COLORS.primary,
    flex: 1,
    fontWeight: '600',
  },
  attributesContainer: {
    marginTop: SPACING.md,
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
    gap: SPACING.sm,
  },
  attributeItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: SPACING.sm,
  },
  attrBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.primary,
    marginTop: 6,
  },
  attrTextCol: {
    flex: 1,
  },
  attrLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  attrDesc: {
    fontSize: 11,
    color: COLORS.textMuted,
    lineHeight: 16,
  },
  interestsList: {
    gap: SPACING.md,
    marginTop: SPACING.xs,
  },
  interestCard: {
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderLeftWidth: 4,
  },
  interestTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
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
    color: COLORS.textPrimary,
  },
  interestCategory: {
    fontSize: 11,
    color: COLORS.textMuted,
    fontWeight: '500',
  },
  interestDescription: {
    fontSize: 12,
    color: COLORS.textSecondary,
    lineHeight: 18,
    marginBottom: SPACING.sm,
  },
  tagWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  tagPill: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  tagPillText: {
    fontSize: 11,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
});
