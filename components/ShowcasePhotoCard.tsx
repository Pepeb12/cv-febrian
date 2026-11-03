import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
  Animated,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Theme, FONTS } from '../theme';
import { NavPhotoItem } from '../data/sixNavPhotos';

interface ShowcasePhotoCardProps {
  photo: NavPhotoItem;
  theme: Theme;
  slideDirection?: 'left' | 'right';
  isVisible?: boolean;
  aspectRatio?: number;
  height?: number | string;
  badgePosition?: 'top-left' | 'top-right';
}

/**
 * ShowcasePhotoCard Component
 * Kartu foto showcase tematik untuk arsitektur Zig-Zag Alternating Photo Reveal.
 * Mendukung animasi spring/slide-in dari kiri atau kanan, serta modal zoom interaktif.
 */
export default function ShowcasePhotoCard({
  photo,
  theme,
  slideDirection = 'left',
  isVisible = true,
  aspectRatio = 3 / 4,
  height,
  badgePosition = 'top-left',
}: ShowcasePhotoCardProps) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const [isZoomed, setIsZoomed] = useState(false);

  // Animated values for entrance transition
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const translateAnim = useRef(
    new Animated.Value(slideDirection === 'left' ? -60 : 60)
  ).current;

  useEffect(() => {
    if (isVisible) {
      Animated.parallel([
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 650,
          useNativeDriver: Platform.OS !== 'web',
        }),
        Animated.spring(translateAnim, {
          toValue: 0,
          friction: 8,
          tension: 40,
          useNativeDriver: Platform.OS !== 'web',
        }),
      ]).start();
    }
  }, [isVisible, slideDirection]);

  return (
    <>
      <Animated.View
        style={[
          styles.container,
          {
            opacity: opacityAnim,
            transform: [{ translateX: translateAnim }],
          },
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.92}
          onPress={() => setIsZoomed(true)}
          style={[
            styles.cardFrame,
            {
              backgroundColor: theme.surface,
              borderColor: theme.primary,
              aspectRatio: height ? undefined : aspectRatio,
              height: height as any,
            },
          ]}
          accessibilityRole="button"
          accessibilityLabel={`${photo.title}. Ketuk untuk memperbesar foto`}
        >
          <Image
            source={photo.source}
            style={styles.image}
            resizeMode="cover"
            accessibilityLabel={photo.alt}
          />

          {/* Tag Badge */}
          <View
            style={[
              styles.tagBadge,
              badgePosition === 'top-right' ? styles.tagTopRight : styles.tagTopLeft,
              { backgroundColor: theme.primary },
            ]}
          >
            <View style={styles.tagDot} />
            <Text style={[styles.tagText, { color: theme.textInverted }]}>
              {photo.tag}
            </Text>
          </View>

          {/* Zoom Hint Icon */}
          <View
            style={[
              styles.zoomHint,
              badgePosition === 'top-right' ? styles.zoomTopLeft : styles.zoomTopRight,
              { backgroundColor: 'rgba(0, 0, 0, 0.55)' },
            ]}
          >
            <Ionicons name="expand-outline" size={13} color="#FFFDF7" />
          </View>

          {/* Bottom Information Glass Overlay */}
          <View
            style={[
              styles.bottomOverlay,
              {
                backgroundColor: theme.isDark
                  ? 'rgba(34, 27, 20, 0.92)'
                  : 'rgba(250, 245, 232, 0.94)',
                borderTopColor: theme.borderLight,
              },
            ]}
          >
            <Text
              style={[styles.titleText, { color: theme.textPrimary }]}
              numberOfLines={1}
            >
              {photo.title}
            </Text>
            <Text
              style={[styles.subtitleText, { color: theme.textSecondary }]}
              numberOfLines={2}
            >
              {photo.subtitle}
            </Text>
          </View>
        </TouchableOpacity>
      </Animated.View>

      {/* Interactive Zoom Lightbox Modal */}
      {isZoomed && (
        <Modal
          visible={true}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setIsZoomed(false)}
        >
          <Pressable
            style={styles.modalBackdrop}
            onPress={() => setIsZoomed(false)}
          >
            <View
              style={[
                styles.modalCard,
                {
                  backgroundColor: theme.surface,
                  borderColor: theme.primary,
                  maxWidth: isMobile ? '92%' : 460,
                },
              ]}
            >
              <TouchableOpacity
                style={[
                  styles.modalCloseBtn,
                  { backgroundColor: theme.surfaceMuted, borderColor: theme.border },
                ]}
                onPress={() => setIsZoomed(false)}
                accessibilityRole="button"
                accessibilityLabel="Tutup preview foto"
              >
                <Ionicons name="close" size={20} color={theme.textPrimary} />
              </TouchableOpacity>

              <Image
                source={photo.source}
                style={styles.modalImage}
                resizeMode="cover"
              />

              <View style={styles.modalContent}>
                <View
                  style={[
                    styles.tagBadge,
                    { backgroundColor: theme.primary, alignSelf: 'flex-start', marginBottom: 6 },
                  ]}
                >
                  <Text style={[styles.tagText, { color: theme.textInverted }]}>
                    {photo.tag}
                  </Text>
                </View>
                <Text style={[styles.modalTitle, { color: theme.textPrimary }]}>
                  {photo.title}
                </Text>
                <Text style={[styles.modalSubtitle, { color: theme.textSecondary }]}>
                  {photo.subtitle}
                </Text>
              </View>
            </View>
          </Pressable>
        </Modal>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'relative',
  },
  cardFrame: {
    width: '100%',
    borderRadius: 18,
    borderWidth: 1.5,
    overflow: 'hidden',
    position: 'relative',
    ...Platform.select({
      web: {
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)' as any,
        transition: 'transform 0.25s ease, box-shadow 0.25s ease' as any,
        cursor: 'pointer' as any,
      },
      default: {
        elevation: 3,
      },
    }),
  },
  image: {
    width: '100%',
    height: '100%',
  },
  tagBadge: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    zIndex: 10,
  },
  tagTopLeft: {
    top: 12,
    left: 12,
  },
  tagTopRight: {
    top: 12,
    right: 12,
  },
  tagDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFFDF7',
  },
  tagText: {
    fontFamily: FONTS.bold,
    fontSize: 10.5,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  zoomHint: {
    position: 'absolute',
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  zoomTopRight: {
    top: 12,
    right: 12,
  },
  zoomTopLeft: {
    top: 12,
    left: 12,
  },
  bottomOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderTopWidth: 1,
    gap: 3,
    zIndex: 10,
    ...Platform.select({
      web: {
        backdropFilter: 'blur(10px)' as any,
      },
    }),
  },
  titleText: {
    fontFamily: FONTS.bold,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  subtitleText: {
    fontFamily: FONTS.regular,
    fontSize: 11.5,
    lineHeight: 16,
  },

  // MODAL STYLES
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    ...Platform.select({
      web: {
        backdropFilter: 'blur(8px)' as any,
      },
    }),
  },
  modalCard: {
    width: '100%',
    borderRadius: 20,
    borderWidth: 1.5,
    overflow: 'hidden',
    position: 'relative',
    ...Platform.select({
      web: {
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.45)' as any,
      },
    }),
  },
  modalCloseBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 20,
    ...Platform.select({
      web: { cursor: 'pointer' as any },
    }),
  },
  modalImage: {
    width: '100%',
    height: 340,
  },
  modalContent: {
    padding: 18,
    gap: 4,
  },
  modalTitle: {
    fontFamily: FONTS.bold,
    fontSize: 17,
    fontWeight: '700',
  },
  modalSubtitle: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    lineHeight: 19,
  },
});
