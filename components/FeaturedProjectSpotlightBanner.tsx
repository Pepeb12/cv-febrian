import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Theme, SPACING, FONTS } from '../theme';
import { SECTION_IMAGES } from '../data/sectionImages';

interface FeaturedProjectSpotlightBannerProps {
  theme: Theme;
  onExploreProject?: () => void;
}

export default function FeaturedProjectSpotlightBanner({
  theme,
  onExploreProject,
}: FeaturedProjectSpotlightBannerProps) {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1024;
  const config = SECTION_IMAGES.GAMBAR_4_PORTFOLIO;

  return (
    <View
      style={[
        styles.bannerCard,
        {
          backgroundColor: theme.surfaceMuted,
          borderColor: theme.border,
        },
      ]}
      accessibilityRole="region"
      accessibilityLabel="Sorotan Karya Unggulan Portofolio"
    >
      <View style={[styles.innerRow, isDesktop ? styles.innerRowDesktop : styles.innerRowMobile]}>
        {/* SISI KIRI (GAMBAR MOCKUP DENGAN EFEK SHINE & ZOOM) */}
        <View style={[styles.imageCol, isDesktop ? styles.imageColDesktop : styles.imageColMobile]}>
          <View style={styles.imageFrame}>
            <Image
              source={config.source}
              style={styles.bannerImage}
              resizeMode="cover"
              accessibilityLabel={config.alt}
            />
            {/* Spotlight Pill Overlay */}
            <View
              style={[
                styles.spotlightPill,
                {
                  backgroundColor: theme.primary,
                },
              ]}
            >
              <Ionicons name="star" size={12} color={theme.textInverted || '#FFFDF7'} />
              <Text style={[styles.spotlightPillText, { color: theme.textInverted || '#FFFDF7' }]}>
                {config.badge}
              </Text>
            </View>
          </View>
        </View>

        {/* SISI KANAN (DESKRIPSI KARYA REKAYASA & CTA) */}
        <View style={[styles.contentCol, isDesktop ? styles.contentColDesktop : styles.contentColMobile]}>
          <View style={styles.headerInfo}>
            <Text style={[styles.projectTitle, { color: theme.textPrimary }]}>
              {config.title}
            </Text>
            <Text style={[styles.projectSubtitle, { color: theme.textSecondary }]}>
              {config.subtitle}
            </Text>
          </View>

          <Text style={[styles.projectDesc, { color: theme.textSecondary }]}>
            {config.description}
          </Text>

          {/* Tech Stack Chips */}
          <View style={styles.techRow}>
            {['React Native', 'Expo Router', 'TypeScript', 'MySQL Relational', 'REST API'].map(
              (tech, idx) => (
                <View
                  key={idx}
                  style={[
                    styles.techPill,
                    {
                      backgroundColor: theme.surface,
                      borderColor: theme.borderLight,
                    },
                  ]}
                >
                  <Text style={[styles.techPillText, { color: theme.textPrimary }]}>
                    {tech}
                  </Text>
                </View>
              )
            )}
          </View>

          {/* Action CTA Button */}
          {onExploreProject && (
            <TouchableOpacity
              style={[
                styles.actionBtn,
                {
                  backgroundColor: theme.primary,
                },
              ]}
              onPress={onExploreProject}
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityLabel="Lihat Detail Karya Unggulan"
            >
              <Text style={[styles.actionBtnText, { color: theme.textInverted || '#FFFDF7' }]}>
                Lihat Detail &amp; Arsitektur Proyek
              </Text>
              <Ionicons name="arrow-forward" size={14} color={theme.textInverted || '#FFFDF7'} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bannerCard: {
    borderRadius: SPACING.cardRadius,
    borderWidth: 1,
    padding: 16,
    marginBottom: SPACING.gap,
    width: '100%',
    overflow: 'hidden',
    ...Platform.select({
      web: {
        transition: 'transform 0.2s ease, box-shadow 0.2s ease' as any,
      },
    }),
  },
  innerRow: {
    width: '100%',
    gap: 16,
  },
  innerRowDesktop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  innerRowMobile: {
    flexDirection: 'column',
  },
  imageCol: {
    width: '100%',
  },
  imageColDesktop: {
    flex: 4.5,
  },
  imageColMobile: {
    width: '100%',
  },
  imageFrame: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#000000',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  spotlightPill: {
    position: 'absolute',
    top: 10,
    left: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  spotlightPillText: {
    fontFamily: FONTS.bold,
    fontSize: 10.5,
    fontWeight: '700',
  },
  contentCol: {
    gap: 10,
    justifyContent: 'center',
  },
  contentColDesktop: {
    flex: 5.5,
  },
  contentColMobile: {
    width: '100%',
  },
  headerInfo: {
    gap: 2,
  },
  projectTitle: {
    fontFamily: FONTS.extraBold,
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  projectSubtitle: {
    fontFamily: FONTS.medium,
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 18,
  },
  projectDesc: {
    fontFamily: FONTS.regular,
    fontSize: 12.5,
    lineHeight: 18,
  },
  techRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginVertical: 2,
  },
  techPill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
  },
  techPillText: {
    fontFamily: FONTS.medium,
    fontSize: 11,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    marginTop: 4,
    ...Platform.select({
      web: {
        cursor: 'pointer' as any,
      },
    }),
  },
  actionBtnText: {
    fontFamily: FONTS.bold,
    fontSize: 12,
    fontWeight: '700',
  },
});
