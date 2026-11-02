import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SectionHeading from './SectionHeading';
import { COLORS, SPACING, FONTS } from '../theme';

interface AboutComponentProps {
  data?: any;
  profile?: any;
  theme?: any;
}

/**
 * Card Tentang Saya (Personal Introduction)
 * Digunakan pada Baris 1 Halaman About (50% Kiri Sejajar dengan Riwayat Pendidikan)
 */
export function AboutIntroCard({ data, profile, theme }: AboutComponentProps) {
  const student = data || profile;
  const currentTheme = theme || COLORS;

  if (!student) return null;
  const { deskripsi, introduction, coreAttributes } = student;

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: currentTheme.surface,
          borderColor: currentTheme.border,
          flex: 1,
        },
      ]}
    >
      <SectionHeading
        title="Tentang Saya"
        subtitle="Personal Introduction & Career Vision"
        icon="person-circle-outline"
        badgeText="Intro"
        theme={currentTheme}
      />

      <View style={styles.introContent}>
        {introduction?.headline && (
          <Text style={[styles.headlineText, { color: currentTheme.textPrimary }]}>
            {introduction.headline}
          </Text>
        )}
        <Text style={[styles.paragraphText, { color: currentTheme.textSecondary }]}>
          {deskripsi || introduction?.summary}
        </Text>
        {introduction?.detailedBio && (
          <Text style={[styles.paragraphText, { color: currentTheme.textSecondary }]}>
            {introduction.detailedBio}
          </Text>
        )}

        {/* Kutipan / Personal Motto */}
        {introduction?.motto && (
          <View
            style={[
              styles.quoteBox,
              {
                backgroundColor: currentTheme.surfaceMuted,
                borderLeftColor: currentTheme.primary,
              },
            ]}
          >
            <Ionicons name="chatbubble-ellipses-outline" size={16} color={currentTheme.primary} />
            <Text style={[styles.quoteText, { color: currentTheme.primary }]}>
              "{introduction.motto}"
            </Text>
          </View>
        )}
      </View>

      {/* Core Attributes */}
      {coreAttributes && (
        <View
          style={[
            styles.attributesContainer,
            { borderTopColor: currentTheme.borderLight },
          ]}
        >
          {coreAttributes.map((attr: any, index: number) => (
            <View key={index} style={styles.attributeItem}>
              <View style={[styles.attrBullet, { backgroundColor: currentTheme.primary }]} />
              <View style={styles.attrTextCol}>
                <Text style={[styles.attrLabel, { color: currentTheme.textPrimary }]}>
                  {attr.label}
                </Text>
                <Text style={[styles.attrDesc, { color: currentTheme.textMuted }]}>
                  {attr.desc}
                </Text>
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

/**
 * Card Bidang Minat & Spesialisasi (Areas of Interest)
 * Digunakan pada Baris 2 Halaman About (100% Lebar Penuh dengan Grid 2x2 di Dalamnya)
 */
export function SpecializationCard({ data, profile, theme }: AboutComponentProps) {
  const student = data || profile;
  const currentTheme = theme || COLORS;
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1024;
  const isTablet = width >= 768 && width < 1024;

  if (!student) return null;
  const fieldsOfInterest = student.fieldsOfInterest || [];

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: currentTheme.surface,
          borderColor: currentTheme.border,
          width: '100%',
        },
      ]}
    >
      <SectionHeading
        title="Bidang Minat & Spesialisasi"
        subtitle="Areas of Interest in Information Systems"
        icon="sparkles-outline"
        badgeText="Spesialisasi"
        theme={currentTheme}
      />

      {/* GRID 2x2 SPESIALISASI */}
      <View style={styles.specializationGrid}>
        {fieldsOfInterest.map((item: any) => (
          <View
            key={item.id}
            style={[
              styles.interestCard,
              {
                backgroundColor: currentTheme.surfaceMuted,
                borderColor: currentTheme.borderLight,
                borderLeftColor: currentTheme.primary,
                width: isDesktop || isTablet ? '48.5%' : '100%',
              },
            ]}
          >
            <View style={styles.interestTopRow}>
              <View
                style={[
                  styles.interestIconBox,
                  { backgroundColor: currentTheme.surface, borderColor: currentTheme.borderLight },
                ]}
              >
                <Ionicons
                  name={item.icon || 'star-outline'}
                  size={18}
                  color={currentTheme.primary}
                />
              </View>
              <View style={styles.interestTitleCol}>
                <Text style={[styles.interestTitle, { color: currentTheme.textPrimary }]}>
                  {item.title}
                </Text>
                <Text style={[styles.interestCategory, { color: currentTheme.textMuted }]}>
                  {item.category}
                </Text>
              </View>
            </View>

            <Text style={[styles.interestDescription, { color: currentTheme.textSecondary }]}>
              {item.description}
            </Text>

            {/* Tag / Chips Keahlian terkait Minat */}
            <View style={styles.tagWrap}>
              {item.tags.map((tag: string, tagIdx: number) => (
                <View
                  key={tagIdx}
                  style={[
                    styles.tagPill,
                    {
                      backgroundColor: currentTheme.surface,
                      borderColor: currentTheme.borderLight,
                    },
                  ]}
                >
                  <Text style={[styles.tagPillText, { color: currentTheme.textSecondary }]}>
                    {tag}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

/**
 * AboutSection Default Export (Menyatukan Intro & Spesialisasi jika dipanggil langsung)
 */
export default function AboutSection({ data, profile, theme }: AboutComponentProps) {
  return (
    <View style={styles.container}>
      <AboutIntroCard data={data} profile={profile} theme={theme} />
      <SpecializationCard data={data} profile={profile} theme={theme} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: SPACING.gap,
    marginBottom: 0,
    width: '100%',
  },
  card: {
    borderRadius: SPACING.cardRadius,
    padding: SPACING.cardPadding,
    borderWidth: 1,
  },
  introContent: {
    gap: 10,
    marginTop: 4,
  },
  headlineText: {
    fontFamily: FONTS.bold,
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 22,
  },
  paragraphText: {
    fontFamily: FONTS.regular,
    fontSize: 13.5,
    lineHeight: 21,
  },
  quoteBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 3,
    gap: 8,
    marginVertical: 4,
  },
  quoteText: {
    fontFamily: FONTS.semiBold,
    fontSize: 12.5,
    fontStyle: 'italic',
    flex: 1,
    lineHeight: 18,
  },
  attributesContainer: {
    borderTopWidth: 1,
    paddingTop: 12,
    marginTop: 12,
    gap: 8,
  },
  attributeItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  attrBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 6,
  },
  attrTextCol: {
    flex: 1,
  },
  attrLabel: {
    fontFamily: FONTS.bold,
    fontSize: 12.5,
    fontWeight: '700',
  },
  attrDesc: {
    fontFamily: FONTS.regular,
    fontSize: 11.5,
    lineHeight: 16,
  },
  // SPESIALISASI GRID 2x2
  specializationGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
    marginTop: 8,
    justifyContent: 'space-between',
  },
  interestCard: {
    borderRadius: 12,
    borderWidth: 1,
    borderLeftWidth: 3,
    padding: 16,
    gap: 10,
    justifyContent: 'space-between',
  },
  interestTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  interestIconBox: {
    width: 36,
    height: 36,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  interestTitleCol: {
    flex: 1,
  },
  interestTitle: {
    fontFamily: FONTS.bold,
    fontSize: 13.5,
    fontWeight: '700',
  },
  interestCategory: {
    fontFamily: FONTS.medium,
    fontSize: 11,
  },
  interestDescription: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    lineHeight: 18,
  },
  tagWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 2,
  },
  tagPill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
  },
  tagPillText: {
    fontFamily: FONTS.medium,
    fontSize: 10.5,
  },
});
