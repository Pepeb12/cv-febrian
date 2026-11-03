import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Platform, Easing } from 'react-native';
import { Theme, FONTS } from '../theme';

interface InfiniteMarqueeRibbonProps {
  items: string[];
  theme: Theme;
}

export default function InfiniteMarqueeRibbon({ items, theme }: InfiniteMarqueeRibbonProps) {
  const animatedValue = useRef(new Animated.Value(0)).current;

  // Duplicate items array to ensure seamless infinite looping
  const displayItems = [...items, ...items, ...items];

  useEffect(() => {
    const loopAnim = Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 24000,
        easing: Easing.linear,
        useNativeDriver: Platform.OS !== 'web',
      })
    );
    loopAnim.start();

    return () => loopAnim.stop();
  }, [animatedValue]);

  // Translate by percentage on web or fixed offset
  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -600],
  });

  return (
    <View
      style={[
        styles.ribbonContainer,
        {
          backgroundColor: theme.isDark ? 'rgba(22, 27, 51, 0.65)' : 'rgba(238, 242, 255, 0.75)',
          borderColor: theme.border,
        },
      ]}
      accessibilityRole="text"
      accessibilityLabel="Sorotan Keahlian & Fokus Utama"
    >
      <Animated.View
        style={[
          styles.marqueeTrack,
          {
            transform: [{ translateX }],
          },
        ]}
      >
        {displayItems.map((item, index) => (
          <View key={`marquee-${index}`} style={styles.itemWrapper}>
            <Text style={[styles.starSymbol, { color: theme.secondary }]}>✦</Text>
            <Text
              style={[
                styles.itemText,
                {
                  color: theme.textPrimary,
                },
              ]}
            >
              {item}
            </Text>
          </View>
        ))}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  ribbonContainer: {
    width: '100%',
    overflow: 'hidden',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginVertical: 14,
    ...Platform.select({
      web: {
        backdropFilter: 'blur(10px)',
      } as any,
    }),
  },
  marqueeTrack: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 10,
  },
  starSymbol: {
    fontSize: 13,
    fontWeight: '700',
  },
  itemText: {
    fontFamily: FONTS.semiBold,
    fontSize: 13.5,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});
