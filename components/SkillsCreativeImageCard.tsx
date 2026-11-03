import React from 'react';
import { View, Text, StyleSheet, Image, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Theme, SPACING, FONTS } from '../theme';
import { SECTION_IMAGES } from '../data/sectionImages';

interface SkillsCreativeImageCardProps {
  theme: Theme;
}

export default function SkillsCreativeImageCard({ theme }: SkillsCreativeImageCardProps) {
  const config = SECTION_IMAGES.GAMBAR_3_SKILLS;

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.surface,
          borderColor: theme.border,
        },
      ]}
      accessibilityRole="region"
      accessibilityLabel={config.alt}
    >
      {/* Container Gambar dengan Overlay Glassmorphism */}
      <View style={styles.imageContainer}>
        <Image
          source={config.source}
          style={styles.image}
          resizeMode="cover"
          accessibilityLabel={config.alt}
        />
        {/* Badge Overlay Glassmorphism */}
        <View
          style={[
            styles.badgeOverlay,
            {
              backgroundColor: theme.isDark ? 'rgba(34, 27, 20, 0.78)' : 'rgba(250, 245, 232, 0.85)',
              borderColor: theme.primary,
            },
          ]}
        >
          <Ionicons name="musical-notes" size={12} color={theme.primary} />
          <Text style={[styles.badgeText, { color: theme.primary }]}>
            {config.badge}
          </Text>
        </View>
      </View>

      {/* Konten Teks di Bagian Bawah */}
      <View style={styles.contentCol}>
        <Text style={[styles.title, { color: theme.textPrimary }]}>
          {config.title}
        </Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          {config.subtitle}
        </Text>
        <Text style={[styles.desc, { color: theme.textMuted }]}>
          {config.description}
        </Text>

        {/* Instrumental Tags */}
        <View style={styles.tagsRow}>
          {[
            { label: 'Gitar', icon: 'musical-note' },
            { label: 'Keyboard', icon: 'musical-notes' },
            { label: 'Drum', icon: 'radio' },
            { label: 'Code', icon: 'code-slash' },
          ].map((item, idx) => (
            <View
              key={idx}
              style={[
                styles.miniTag,
                {
                  backgroundColor: theme.surfaceMuted,
                  borderColor: theme.borderLight,
                },
              ]}
            >
              <Ionicons name={item.icon as any} size={11} color={theme.primary} />
              <Text style={[styles.miniTagText, { color: theme.textSecondary }]}>
                {item.label}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: SPACING.cardRadius,
    borderWidth: 1,
    padding: 16,
    gap: 12,
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    ...Platform.select({
      web: {
        transition: 'transform 0.2s ease, box-shadow 0.2s ease' as any,
      },
    }),
  },
  imageContainer: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#000000',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  badgeOverlay: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    ...Platform.select({
      web: {
        backdropFilter: 'blur(8px)' as any,
      },
    }),
  },
  badgeText: {
    fontFamily: FONTS.bold,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  contentCol: {
    gap: 6,
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  subtitle: {
    fontFamily: FONTS.medium,
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 17,
  },
  desc: {
    fontFamily: FONTS.regular,
    fontSize: 11.5,
    lineHeight: 16,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 4,
  },
  miniTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
  },
  miniTagText: {
    fontFamily: FONTS.medium,
    fontSize: 10.5,
  },
});

