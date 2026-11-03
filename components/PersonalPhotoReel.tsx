import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  Easing,
  Platform,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Theme, FONTS } from '../theme';
import { PersonalPhotoItem } from '../data/personalPhotos';

interface VerticalPhotoReelProps {
  photos: PersonalPhotoItem[];
  direction: 'up' | 'down';
  theme: Theme;
}

export function VerticalPhotoReel({ photos, direction, theme }: VerticalPhotoReelProps) {
  // We duplicate photos array to create seamless loop
  const displayPhotos = [...photos, ...photos];
  const CARD_HEIGHT = 240;
  const GAP = 16;
  const ITEM_FULL_HEIGHT = CARD_HEIGHT + GAP;
  const TOTAL_DISTANCE = photos.length * ITEM_FULL_HEIGHT;

  const scrollAnim = useRef(
    new Animated.Value(direction === 'up' ? 0 : -TOTAL_DISTANCE)
  ).current;

  const [isPaused, setIsPaused] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<PersonalPhotoItem | null>(null);

  useEffect(() => {
    let animLoop: Animated.CompositeAnimation | null = null;

    if (!isPaused) {
      if (direction === 'up') {
        scrollAnim.setValue(0);
        animLoop = Animated.loop(
          Animated.timing(scrollAnim, {
            toValue: -TOTAL_DISTANCE,
            duration: 22000,
            easing: Easing.linear,
            useNativeDriver: Platform.OS !== 'web',
          })
        );
      } else {
        scrollAnim.setValue(-TOTAL_DISTANCE);
        animLoop = Animated.loop(
          Animated.timing(scrollAnim, {
            toValue: 0,
            duration: 22000,
            easing: Easing.linear,
            useNativeDriver: Platform.OS !== 'web',
          })
        );
      }
      animLoop.start();
    }

    return () => {
      if (animLoop) animLoop.stop();
    };
  }, [direction, isPaused, TOTAL_DISTANCE]);

  const maskColor = theme.background;

  return (
    <View
      style={[
        styles.verticalReelContainer,
        {
          borderColor: theme.border,
          backgroundColor: theme.surfaceSubtle,
        },
      ]}
      {...(Platform.OS === 'web'
        ? ({
            onMouseEnter: () => setIsPaused(true),
            onMouseLeave: () => setIsPaused(false),
          } as any)
        : {})}
    >
      {/* Top Fade Mask */}
      <View
        pointerEvents="none"
        style={[
          styles.topMask,
          {
            backgroundColor: maskColor,
            opacity: 0.85,
          },
        ]}
      />

      {/* Animated Track */}
      <Animated.View
        style={[
          styles.verticalTrack,
          {
            transform: [{ translateY: scrollAnim }],
          },
        ]}
      >
        {displayPhotos.map((item, idx) => (
          <TouchableOpacity
            key={`${item.id}-${idx}`}
            activeOpacity={0.88}
            onPress={() => setSelectedPhoto(item)}
            style={[
              styles.photoCard,
              {
                borderColor: theme.primary,
                backgroundColor: theme.surface,
              },
            ]}
          >
            <Image source={item.source} style={styles.cardImage} resizeMode="cover" />

            {/* Top Tag Badge */}
            <View
              style={[
                styles.cardTagBadge,
                {
                  backgroundColor: theme.primary,
                },
              ]}
            >
              <Text style={[styles.cardTagText, { color: theme.textInverted }]}>
                {item.tag}
              </Text>
            </View>

            {/* Bottom Info Gradient/Overlay */}
            <View
              style={[
                styles.cardBottomOverlay,
                {
                  backgroundColor: theme.isDark
                    ? 'rgba(34, 27, 20, 0.90)'
                    : 'rgba(250, 245, 232, 0.92)',
                  borderTopColor: theme.borderLight,
                },
              ]}
            >
              <Text
                style={[styles.cardTitleText, { color: theme.textPrimary }]}
                numberOfLines={1}
              >
                {item.title}
              </Text>
              <Text
                style={[styles.cardCaptionText, { color: theme.textSecondary }]}
                numberOfLines={1}
              >
                {item.caption}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </Animated.View>

      {/* Bottom Fade Mask */}
      <View
        pointerEvents="none"
        style={[
          styles.bottomMask,
          {
            backgroundColor: maskColor,
            opacity: 0.85,
          },
        ]}
      />

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <Modal
          visible={true}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setSelectedPhoto(null)}
        >
          <Pressable
            style={styles.modalBackdrop}
            onPress={() => setSelectedPhoto(null)}
          >
            <View
              style={[
                styles.modalCard,
                {
                  backgroundColor: theme.surface,
                  borderColor: theme.primary,
                },
              ]}
            >
              <TouchableOpacity
                style={[styles.modalCloseBtn, { backgroundColor: theme.surfaceMuted }]}
                onPress={() => setSelectedPhoto(null)}
              >
                <Ionicons name="close" size={20} color={theme.textPrimary} />
              </TouchableOpacity>
              <Image
                source={selectedPhoto.source}
                style={styles.modalImage}
                resizeMode="cover"
              />
              <View style={styles.modalInfo}>
                <View
                  style={[
                    styles.cardTagBadge,
                    {
                      backgroundColor: theme.primary,
                      alignSelf: 'flex-start',
                    },
                  ]}
                >
                  <Text style={[styles.cardTagText, { color: theme.textInverted }]}>
                    {selectedPhoto.tag}
                  </Text>
                </View>
                <Text style={[styles.modalTitle, { color: theme.textPrimary }]}>
                  {selectedPhoto.title}
                </Text>
                <Text style={[styles.modalCaption, { color: theme.textSecondary }]}>
                  {selectedPhoto.caption}
                </Text>
              </View>
            </View>
          </Pressable>
        </Modal>
      )}
    </View>
  );
}

interface HorizontalPhotoReelProps {
  photos: PersonalPhotoItem[];
  theme: Theme;
}

export function HorizontalPhotoReel({ photos, theme }: HorizontalPhotoReelProps) {
  const displayPhotos = [...photos, ...photos];
  const CARD_WIDTH = 140;
  const GAP = 12;
  const TOTAL_DISTANCE = photos.length * (CARD_WIDTH + GAP);

  const scrollAnim = useRef(new Animated.Value(0)).current;
  const [selectedPhoto, setSelectedPhoto] = useState<PersonalPhotoItem | null>(null);

  useEffect(() => {
    scrollAnim.setValue(0);
    const loop = Animated.loop(
      Animated.timing(scrollAnim, {
        toValue: -TOTAL_DISTANCE,
        duration: 25000,
        easing: Easing.linear,
        useNativeDriver: Platform.OS !== 'web',
      })
    );
    loop.start();

    return () => loop.stop();
  }, [TOTAL_DISTANCE]);

  return (
    <View
      style={[
        styles.horizontalReelContainer,
        {
          borderColor: theme.border,
          backgroundColor: theme.surface,
        },
      ]}
    >
      <View style={styles.horizontalHeaderRow}>
        <View style={styles.horizontalHeaderLeft}>
          <Ionicons name="images-outline" size={16} color={theme.primary} />
          <Text style={[styles.horizontalHeaderTitle, { color: theme.textPrimary }]}>
            Galeri Rekam Jejak & Dokumentasi
          </Text>
        </View>
        <Text style={[styles.horizontalHeaderSubtitle, { color: theme.textMuted }]}>
          Auto-Scroll Reels
        </Text>
      </View>

      <View style={styles.horizontalTrackWrapper}>
        <Animated.View
          style={[
            styles.horizontalTrack,
            {
              transform: [{ translateX: scrollAnim }],
            },
          ]}
        >
          {displayPhotos.map((item, idx) => (
            <TouchableOpacity
              key={`h-${item.id}-${idx}`}
              activeOpacity={0.88}
              onPress={() => setSelectedPhoto(item)}
              style={[
                styles.horizontalPhotoCard,
                {
                  borderColor: theme.border,
                  backgroundColor: theme.surfaceSecondary,
                },
              ]}
            >
              <Image source={item.source} style={styles.horizontalCardImage} resizeMode="cover" />
              <View
                style={[
                  styles.horizontalCardBottom,
                  {
                    backgroundColor: theme.isDark
                      ? 'rgba(34, 27, 20, 0.92)'
                      : 'rgba(250, 245, 232, 0.94)',
                    borderTopColor: theme.borderLight,
                  },
                ]}
              >
                <Text
                  style={[styles.horizontalCardTag, { color: theme.primary }]}
                  numberOfLines={1}
                >
                  {item.tag}
                </Text>
                <Text
                  style={[styles.horizontalCardTitle, { color: theme.textPrimary }]}
                  numberOfLines={1}
                >
                  {item.title}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </Animated.View>
      </View>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <Modal
          visible={true}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setSelectedPhoto(null)}
        >
          <Pressable
            style={styles.modalBackdrop}
            onPress={() => setSelectedPhoto(null)}
          >
            <View
              style={[
                styles.modalCard,
                {
                  backgroundColor: theme.surface,
                  borderColor: theme.primary,
                },
              ]}
            >
              <TouchableOpacity
                style={[styles.modalCloseBtn, { backgroundColor: theme.surfaceMuted }]}
                onPress={() => setSelectedPhoto(null)}
              >
                <Ionicons name="close" size={20} color={theme.textPrimary} />
              </TouchableOpacity>
              <Image
                source={selectedPhoto.source}
                style={styles.modalImage}
                resizeMode="cover"
              />
              <View style={styles.modalInfo}>
                <View
                  style={[
                    styles.cardTagBadge,
                    {
                      backgroundColor: theme.primary,
                      alignSelf: 'flex-start',
                    },
                  ]}
                >
                  <Text style={[styles.cardTagText, { color: theme.textInverted }]}>
                    {selectedPhoto.tag}
                  </Text>
                </View>
                <Text style={[styles.modalTitle, { color: theme.textPrimary }]}>
                  {selectedPhoto.title}
                </Text>
                <Text style={[styles.modalCaption, { color: theme.textSecondary }]}>
                  {selectedPhoto.caption}
                </Text>
              </View>
            </View>
          </Pressable>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  // VERTICAL REEL (DESKTOP)
  verticalReelContainer: {
    width: 190,
    height: Platform.OS === 'web' ? ('calc(100vh - 100px)' as any) : 680,
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
    position: (Platform.OS === 'web' ? 'sticky' : 'relative') as any,
    top: 84,
  },
  topMask: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 36,
    zIndex: 10,
  },
  bottomMask: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 36,
    zIndex: 10,
  },
  verticalTrack: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    gap: 16,
    alignItems: 'center',
  },
  photoCard: {
    width: 172,
    height: 240,
    borderRadius: 14,
    borderWidth: 1.5,
    overflow: 'hidden',
    position: 'relative',
    ...Platform.select({
      web: {
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)' as any,
        transition: 'transform 0.2s ease' as any,
        cursor: 'pointer' as any,
      },
    }),
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardTagBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    zIndex: 5,
  },
  cardTagText: {
    fontFamily: FONTS.semiBold,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  cardBottomOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderTopWidth: 1,
    gap: 2,
    zIndex: 5,
  },
  cardTitleText: {
    fontFamily: FONTS.bold,
    fontSize: 11.5,
    fontWeight: '700',
  },
  cardCaptionText: {
    fontFamily: FONTS.regular,
    fontSize: 10,
  },

  // HORIZONTAL REEL (MOBILE/TABLET)
  horizontalReelContainer: {
    width: '100%',
    borderRadius: 16,
    borderWidth: 1,
    padding: 14,
    gap: 12,
  },
  horizontalHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  horizontalHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  horizontalHeaderTitle: {
    fontFamily: FONTS.bold,
    fontSize: 13,
    fontWeight: '700',
  },
  horizontalHeaderSubtitle: {
    fontFamily: FONTS.regular,
    fontSize: 11,
  },
  horizontalTrackWrapper: {
    width: '100%',
    overflow: 'hidden',
  },
  horizontalTrack: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  horizontalPhotoCard: {
    width: 140,
    height: 180,
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  horizontalCardImage: {
    width: '100%',
    height: 125,
  },
  horizontalCardBottom: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderTopWidth: 1,
    gap: 2,
    flex: 1,
    justifyContent: 'center',
  },
  horizontalCardTag: {
    fontFamily: FONTS.bold,
    fontSize: 9.5,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  horizontalCardTitle: {
    fontFamily: FONTS.semiBold,
    fontSize: 11,
    fontWeight: '600',
  },

  // MODAL LIGHTBOX
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  modalCard: {
    width: '100%',
    maxWidth: 420,
    borderRadius: 18,
    borderWidth: 1.5,
    overflow: 'hidden',
    position: 'relative',
    ...Platform.select({
      web: {
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.4)' as any,
      },
    }),
  },
  modalCloseBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 20,
  },
  modalImage: {
    width: '100%',
    height: 320,
  },
  modalInfo: {
    padding: 16,
    gap: 6,
  },
  modalTitle: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    fontWeight: '700',
  },
  modalCaption: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    lineHeight: 18,
  },
});
