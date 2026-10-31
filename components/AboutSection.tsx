import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SectionHeading from './SectionHeading';
import { COLORS, SHADOWS, SPACING } from '../theme';

interface AboutSectionProps {
  data?: any;
  profile?: any;
  theme?: any;
}

/**
 * AboutSection Component (Level 10: TSX Supported)
 */
export default function AboutSection({ data, profile, theme }: AboutSectionProps) {
  const student = data || profile;
  const currentTheme = theme || COLORS;

  if (!student) return null;

  const { deskripsi, introduction, fieldsOfInterest, coreAttributes } = student;

  return (
    <View style={styles.container}>
      {/* SECTION 1: Personal Introduction */}
      <View
        style={[
          styles.card,
          {
            backgroundColor: currentTheme.surface,
            borderColor: currentTheme.borderLight,
          },
        ]}
      >
        <SectionHeading
          title="Tentang Saya"
          subtitle="Personal Introduction & Career Vision"
          icon="person-circle"
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
                  backgroundColor: currentTheme.primaryLight,
                  borderLeftColor: currentTheme.primary,
                },
              ]}
            >
              <Ionicons name="chatbubble-ellipses" size={16} color={currentTheme.primary} />
              <Text style={[styles.quoteText, { color: currentTheme.primary }]}>
                {introduction.motto}
              </Text>
            </View>
          )}
        </View>

        {/* Core Attributes Pill Grid */}
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

      {/* SECTION 2: Bidang Minat / Areas of Interest */}
      {fieldsOfInterest && (
        <View
          style={[
            styles.card,
            {
              backgroundColor: currentTheme.surface,
              borderColor: currentTheme.borderLight,
            },
          ]}
        >
          <SectionHeading
            title="Bidang Minat & Spesialisasi"
            subtitle="Areas of Interest in Information Systems"
            icon="sparkles"
            badgeText="Spesialisasi"
            theme={currentTheme}
          />

          <View style={styles.interestsList}>
            {fieldsOfInterest.map((item: any) => (
              <View
                key={item.id}
                style={[
                  styles.interestCard,
                  {
                    backgroundColor: currentTheme.surfaceMuted,
                    borderColor: currentTheme.border,
                    borderLeftColor: item.accentColor,
                  },
                ]}
              >
                <View style={styles.interestTopRow}>
                  <View
                    style={[
                      styles.interestIconBox,
                      { backgroundColor: item.accentColor + '18' },
                    ]}
                  >
                    <Ionicons
                      name={item.icon}
                      size={20}
                      color={item.accentColor}
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
                          borderColor: currentTheme.border,
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
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  card: {
    borderRadius: 16,
    padding: SPACING.lg,
    borderWidth: 1,
    ...SHADOWS.md,
  },
  introContent: {
    gap: SPACING.sm,
    marginTop: SPACING.xs,
  },
  headlineText: {
    fontSize: 16,
    fontWeight: '800',
  },
  paragraphText: {
    fontSize: 13,
    lineHeight: 21,
    textAlign: 'justify',
  },
  quoteBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    padding: SPACING.md,
    gap: SPACING.sm,
    marginTop: SPACING.xs,
    borderLeftWidth: 3,
  },
  quoteText: {
    fontSize: 12,
    fontStyle: 'italic',
    flex: 1,
    fontWeight: '600',
  },
  attributesContainer: {
    marginTop: SPACING.md,
    paddingTop: SPACING.md,
    borderTopWidth: 1,
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
    marginTop: 6,
  },
  attrTextCol: {
    flex: 1,
  },
  attrLabel: {
    fontSize: 12,
    fontWeight: '700',
  },
  attrDesc: {
    fontSize: 11,
    lineHeight: 16,
  },
  interestsList: {
    gap: SPACING.md,
    marginTop: SPACING.xs,
  },
  interestCard: {
    borderRadius: 12,
    padding: SPACING.md,
    borderWidth: 1,
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
  },
  interestCategory: {
    fontSize: 11,
    fontWeight: '500',
  },
  interestDescription: {
    fontSize: 12,
    lineHeight: 18,
    marginBottom: SPACING.sm,
  },
  tagWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  tagPill: {
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  tagPillText: {
    fontSize: 11,
    fontWeight: '600',
  },
});
