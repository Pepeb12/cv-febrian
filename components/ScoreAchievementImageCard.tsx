import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Theme, SPACING, FONTS } from '../theme';
import { SECTION_IMAGES } from '../data/sectionImages';

interface ScoreAchievementImageCardProps {
  theme: Theme;
}

export default function ScoreAchievementImageCard({ theme }: ScoreAchievementImageCardProps) {
  const config = SECTION_IMAGES.GAMBAR_5_MYSCORE;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Animasi Pulse Berdenyut Halus untuk Badge Prestasi
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.08,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [pulseAnim]);

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
      {/* 1. FRAME GAMBAR PRESTASI AKADEMIK */}
      <View style={styles.imageWrapper}>
        <Image
          source={config.source}
          style={styles.image}
          resizeMode="cover"
          accessibilityLabel={config.alt}
        />

        {/* 2. ANIMATED PULSE RING BADGE */}
        <Animated.View
          style={[
            styles.pulseBadge,
            {
              backgroundColor: theme.primary,
              borderColor: theme.isDark ? '#221B14' : '#FFFDF7',
              transform: [{ scale: pulseAnim }],
            },
          ]}
        >
          <Ionicons name="ribbon" size={13} color={theme.textInverted || '#FFFDF7'} />
          <Text style={[styles.pulseBadgeText, { color: theme.textInverted || '#FFFDF7' }]}>
            {config.badge}
          </Text>
        </Animated.View>
      </View>

      {/* 3. KONTEN DETAIL CAPAIAN & REFLEKSI */}
      <View style={styles.contentCol}>
        <Text style={[styles.title, { color: theme.textPrimary }]}>
          {config.title}
        </Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          {config.subtitle}
        </Text>

        <View style={[styles.quoteBox, { backgroundColor: theme.surfaceMuted, borderColor: theme.borderLight }]}>
          <Ionicons name="school-outline" size={15} color={theme.primary} />
          <Text style={[styles.quoteText, { color: theme.textPrimary }]}>
            "{config.description}"
          </Text>
        </View>

        {/* Mini Highlight Metrics */}
        <View style={styles.metricGrid}>
          {[
            { label: 'GRADE', val: 'A (90/100)' },
            { label: 'SKS SELESAI', val: '92 SKS' },
            { label: 'KONSISTENSI', val: '100% Hadir' },
            { label: 'STATUS', val: 'Terverifikasi' },
          ].map((m, idx) => (
            <View
              key={idx}
              style={[
                styles.metricItem,
                {
                  backgroundColor: theme.surfaceMuted,
                  borderColor: theme.borderLight,
                },
              ]}
            >
              <Text style={[styles.metricLabel, { color: theme.textMuted }]}>
                {m.label}
              </Text>
              <Text style={[styles.metricVal, { color: theme.primary }]}>
                {m.val}
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
    gap: 14,
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    ...Platform.select({
      web: {
        transition: 'transform 0.2s ease, box-shadow 0.2s ease' as any,
      },
    }),
  },
  imageWrapper: {
    width: '100%',
    height: 190,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#000000',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  pulseBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1.5,
    ...Platform.select({
      web: {
        boxShadow: '0 4px 12px rgba(181, 137, 61, 0.4)' as any,
      },
      default: {
        elevation: 3,
      },
    }),
  },
  pulseBadgeText: {
    fontFamily: FONTS.bold,
    fontSize: 10.5,
    fontWeight: '700',
    letterSpacing: 0.2,
    textAlign: 'center',
  },
  contentCol: {
    gap: 10,
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
  },
  quoteBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
  },
  quoteText: {
    flex: 1,
    fontFamily: FONTS.regular,
    fontSize: 11,
    lineHeight: 16,
    fontStyle: 'italic',
  },
  metricGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 2,
  },
  metricItem: {
    width: '48%',
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    gap: 2,
  },
  metricLabel: {
    fontFamily: FONTS.semiBold,
    fontSize: 9.5,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  metricVal: {
    fontFamily: FONTS.bold,
    fontSize: 11.5,
    fontWeight: '700',
  },
});
