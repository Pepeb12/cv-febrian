import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Platform, Easing } from 'react-native';
import { Theme } from '../theme';

interface CosmicCanvasBackgroundProps {
  theme: Theme;
}

// Fixed deterministic star coordinates to avoid re-render recalculation
const STAR_PARTICLES = [
  { top: '8%', left: '12%', size: 3, opacity: 0.7 },
  { top: '15%', left: '78%', size: 2, opacity: 0.5 },
  { top: '24%', left: '35%', size: 4, opacity: 0.8 },
  { top: '32%', left: '88%', size: 2.5, opacity: 0.6 },
  { top: '42%', left: '18%', size: 3, opacity: 0.75 },
  { top: '48%', left: '62%', size: 2, opacity: 0.4 },
  { top: '58%', left: '82%', size: 3.5, opacity: 0.85 },
  { top: '65%', left: '28%', size: 2, opacity: 0.5 },
  { top: '74%', left: '92%', size: 3, opacity: 0.7 },
  { top: '82%', left: '15%', size: 4, opacity: 0.8 },
  { top: '91%', left: '52%', size: 2.5, opacity: 0.6 },
  { top: '18%', left: '50%', size: 3, opacity: 0.65 },
  { top: '85%', left: '70%', size: 2, opacity: 0.45 },
  { top: '38%', left: '4%', size: 3.5, opacity: 0.7 },
  { top: '55%', left: '96%', size: 2, opacity: 0.5 },
];

export default function CosmicCanvasBackground({ theme }: CosmicCanvasBackgroundProps) {
  const isDark = theme.isDark;

  // Floating animations
  const floatAnim1 = useRef(new Animated.Value(0)).current;
  const floatAnim2 = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Up & down drift 1
    const loop1 = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim1, {
          toValue: 24,
          duration: 6000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: Platform.OS !== 'web',
        }),
        Animated.timing(floatAnim1, {
          toValue: 0,
          duration: 6000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: Platform.OS !== 'web',
        }),
      ])
    );

    // Up & down drift 2
    const loop2 = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim2, {
          toValue: -20,
          duration: 7500,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: Platform.OS !== 'web',
        }),
        Animated.timing(floatAnim2, {
          toValue: 0,
          duration: 7500,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: Platform.OS !== 'web',
        }),
      ])
    );

    // Continuous slow rotation
    const loopRotate = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 32000,
        easing: Easing.linear,
        useNativeDriver: Platform.OS !== 'web',
      })
    );

    loop1.start();
    loop2.start();
    loopRotate.start();

    return () => {
      loop1.stop();
      loop2.stop();
      loopRotate.stop();
    };
  }, []);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const reverseSpin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['360deg', '0deg'],
  });

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {/* 1. Star Particles Layer (in dark mode) */}
      {isDark &&
        STAR_PARTICLES.map((star, idx) => (
          <View
            key={`star-${idx}`}
            style={[
              styles.star,
              {
                top: star.top as any,
                left: star.left as any,
                width: star.size,
                height: star.size,
                borderRadius: star.size / 2,
                opacity: star.opacity * 0.45,
                backgroundColor: idx % 3 === 0 ? '#818CF8' : idx % 3 === 1 ? '#FBBF24' : '#E0E7FF',
              },
            ]}
          />
        ))}

      {/* 2. Floating Wireframe Torus / Ring Element 1 (Top-Right) */}
      <Animated.View
        style={[
          styles.wireframeRing,
          {
            top: 90,
            right: '8%',
            borderColor: isDark ? 'rgba(99, 102, 241, 0.28)' : 'rgba(79, 70, 229, 0.12)',
            transform: [{ translateY: floatAnim1 }, { rotate: spin }],
          },
        ]}
      >
        <View
          style={[
            styles.innerRing,
            {
              borderColor: isDark ? 'rgba(56, 189, 248, 0.22)' : 'rgba(99, 102, 241, 0.08)',
            },
          ]}
        />
      </Animated.View>

      {/* 3. Floating Wireframe Diamond / Cube (Mid-Left) */}
      <Animated.View
        style={[
          styles.wireframeDiamond,
          {
            top: '36%',
            left: '5%',
            borderColor: isDark ? 'rgba(245, 158, 11, 0.25)' : 'rgba(217, 119, 6, 0.12)',
            transform: [{ translateY: floatAnim2 }, { rotate: reverseSpin }],
          },
        ]}
      >
        <View
          style={[
            styles.innerDiamond,
            {
              borderColor: isDark ? 'rgba(99, 102, 241, 0.2)' : 'rgba(79, 70, 229, 0.08)',
            },
          ]}
        />
      </Animated.View>

      {/* 4. Floating Low-Poly Geometric Ring (Bottom-Right) */}
      <Animated.View
        style={[
          styles.wireframeTorus,
          {
            bottom: '18%',
            right: '6%',
            borderColor: isDark ? 'rgba(56, 189, 248, 0.24)' : 'rgba(79, 70, 229, 0.10)',
            transform: [{ translateY: floatAnim1 }, { rotate: spin }],
          },
        ]}
      />

      {/* 5. Ambient Glowing Radial Halo Overlays */}
      <View
        style={[
          styles.ambientGlowPrimary,
          {
            backgroundColor: isDark ? 'rgba(99, 102, 241, 0.08)' : 'rgba(79, 70, 229, 0.04)',
          },
        ]}
      />
      <View
        style={[
          styles.ambientGlowSecondary,
          {
            backgroundColor: isDark ? 'rgba(245, 158, 11, 0.05)' : 'rgba(245, 158, 11, 0.03)',
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  star: {
    position: 'absolute',
  },
  wireframeRing: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 1,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerRing: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 1,
  },
  wireframeDiamond: {
    position: 'absolute',
    width: 96,
    height: 96,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerDiamond: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  wireframeTorus: {
    position: 'absolute',
    width: 170,
    height: 170,
    borderRadius: 85,
    borderWidth: 1.2,
    borderStyle: 'dashed',
  },
  ambientGlowPrimary: {
    position: 'absolute',
    top: 0,
    left: '20%',
    width: 500,
    height: 500,
    borderRadius: 250,
    ...Platform.select({
      web: { filter: 'blur(120px)' } as any,
    }),
  },
  ambientGlowSecondary: {
    position: 'absolute',
    top: '40%',
    right: '10%',
    width: 450,
    height: 450,
    borderRadius: 225,
    ...Platform.select({
      web: { filter: 'blur(130px)' } as any,
    }),
  },
});
