import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  Animated,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SectionHeading from './SectionHeading';
import { Theme, FONTS } from '../theme';

interface SkillItem {
  name: string;
  category: 'MOBILE' | 'DESIGN' | 'DATA' | 'ANALYSIS';
  icon?: string;
  detail?: string;
}

interface SkillMatrixCardProps {
  skills?: any[];
  theme: Theme;
}

const DEFAULT_SKILLS: SkillItem[] = [
  // Mobile App
  { name: 'React Native', category: 'MOBILE', icon: 'logo-react', detail: 'Cross-platform Mobile Architecture' },
  { name: 'Expo & EAS', category: 'MOBILE', icon: 'flash-outline', detail: 'Cloud Build & Continuous Native Dev' },
  { name: 'TypeScript', category: 'MOBILE', icon: 'code-slash-outline', detail: 'Strict Type-Safe Engineering' },
  { name: 'JavaScript (ES6+)', category: 'MOBILE', icon: 'logo-javascript', detail: 'Modern Asynchronous Logic & Hooks' },
  { name: 'Expo Router', category: 'MOBILE', icon: 'compass-outline', detail: 'File-based Clean Routing' },
  { name: 'Mobile State Hooks', category: 'MOBILE', icon: 'cube-outline', detail: 'Scalable UI State Management' },

  // UI/UX Design
  { name: 'UI/UX Design', category: 'DESIGN', icon: 'color-palette-outline', detail: 'User-Centered Interaction Design' },
  { name: 'Figma Prototyping', category: 'DESIGN', icon: 'shapes-outline', detail: 'High-Fidelity Interactive Mockups' },
  { name: 'Wireframing', category: 'DESIGN', icon: 'grid-outline', detail: 'Low-Fi Structural Information Architecture' },
  { name: 'Design Systems', category: 'DESIGN', icon: 'layers-outline', detail: 'Reusable Components & Design Tokens' },
  { name: 'User Flow & IA', category: 'DESIGN', icon: 'git-network-outline', detail: 'Streamlined UX Navigation Journeys' },
  { name: 'Mobile Usability', category: 'DESIGN', icon: 'phone-portrait-outline', detail: 'Responsive Ergonomics & A11y' },

  // Database
  { name: 'Database & SQL', category: 'DATA', icon: 'server-outline', detail: 'Relational Database Queries & DDL' },
  { name: 'MySQL', category: 'DATA', icon: 'hardware-chip-outline', detail: 'Schema Design & Data Normalization' },
  { name: 'Relational DB Modeling', category: 'DATA', icon: 'git-merge-outline', detail: 'Entity Relationship Diagrams (ERD)' },
  { name: 'REST API Integration', category: 'DATA', icon: 'cloud-download-outline', detail: 'JSON Web Services & Fetch Client' },
  { name: 'AsyncStorage Persistence', category: 'DATA', icon: 'save-outline', detail: 'Offline Local Client Storage' },

  // Systems Analysis
  { name: 'Systems Analysis', category: 'ANALYSIS', icon: 'analytics-outline', detail: 'Business Process & Requirements Analysis' },
  { name: 'UML (Use Case/Activity)', category: 'ANALYSIS', icon: 'git-branch-outline', detail: 'Object-Oriented System Diagrams' },
  { name: 'Data Flow Diagram (DFD)', category: 'ANALYSIS', icon: 'swap-horizontal-outline', detail: 'Logical Process & Data Modeling' },
  { name: 'Business Process Mapping', category: 'ANALYSIS', icon: 'pie-chart-outline', detail: 'As-Is & To-Be Optimization' },
  { name: 'Git & GitHub', category: 'ANALYSIS', icon: 'logo-github', detail: 'Version Control & Team Collaboration' },
];

/**
 * 3D Flip Card Item Component
 */
function FlipSkillCard({
  skill,
  theme,
  isDesktop,
  isTablet,
  staggerDelay,
  triggerReset,
}: {
  skill: SkillItem;
  theme: Theme;
  isDesktop: boolean;
  isTablet: boolean;
  staggerDelay: number;
  triggerReset: number;
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const animatedFlip = useRef(new Animated.Value(0)).current;
  const entranceAnim = useRef(new Animated.Value(0)).current;

  // Stagger entrance animation
  useEffect(() => {
    entranceAnim.setValue(0);
    const timer = setTimeout(() => {
      Animated.spring(entranceAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: Platform.OS !== 'web',
      }).start();
    }, staggerDelay);

    return () => clearTimeout(timer);
  }, [triggerReset, staggerDelay, entranceAnim]);

  // Flip Card Action
  const handleFlip = () => {
    const nextFlipped = !isFlipped;
    setIsFlipped(nextFlipped);
    Animated.spring(animatedFlip, {
      toValue: nextFlipped ? 180 : 0,
      tension: 40,
      friction: 7,
      useNativeDriver: Platform.OS !== 'web',
    }).start();
  };

  // Interpolations
  const frontInterpolate = animatedFlip.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = animatedFlip.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const isDark = theme.isDark;
  const categoryColor =
    skill.category === 'MOBILE'
      ? '#6366F1'
      : skill.category === 'DESIGN'
      ? '#F59E0B'
      : skill.category === 'DATA'
      ? '#38BDF8'
      : '#22C55E';

  const cardWidth = isDesktop ? '15.3%' : isTablet ? '31.8%' : '48%';

  return (
    <Animated.View
      style={[
        styles.cardContainer,
        {
          width: cardWidth,
          opacity: entranceAnim,
          transform: [
            {
              scale: entranceAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0.85, 1],
              }),
            },
          ],
        },
      ]}
    >
      <Pressable
        onPress={handleFlip}
        style={styles.cardPressable}
        accessibilityRole="button"
        accessibilityLabel={`${skill.name}. Ketuk untuk membalik kartu.`}
      >
        {/* SISI DEPAN (FRONT FACE) */}
        <Animated.View
          style={[
            styles.flipFace,
            styles.flipFaceFront,
            {
              backgroundColor: isDark ? 'rgba(22, 27, 51, 0.85)' : 'rgba(255, 255, 255, 0.9)',
              borderColor: theme.border,
              transform: [{ rotateY: frontInterpolate }],
            },
          ]}
        >
          <View style={[styles.skillDotGlow, { backgroundColor: categoryColor }]} />
          <Ionicons
            name={(skill.icon as any) || 'code-slash-outline'}
            size={22}
            color={categoryColor}
          />
          <Text
            style={[styles.skillName, { color: theme.textPrimary }]}
            numberOfLines={2}
          >
            {skill.name}
          </Text>
          <Text style={[styles.skillCatBadge, { color: categoryColor }]}>
            {skill.category}
          </Text>
          <Text style={[styles.tapHint, { color: theme.textMuted }]}>
            ↻ Balik
          </Text>
        </Animated.View>

        {/* SISI BELAKANG (BACK FACE - 180 DEG FLIP) */}
        <Animated.View
          style={[
            styles.flipFace,
            styles.flipFaceBack,
            {
              backgroundColor: isDark ? 'rgba(30, 37, 70, 0.95)' : 'rgba(238, 242, 255, 0.95)',
              borderColor: categoryColor,
              transform: [{ rotateY: backInterpolate }],
            },
          ]}
        >
          <Ionicons name="checkmark-circle" size={20} color={categoryColor} />
          <Text
            style={[styles.skillDetailTitle, { color: theme.textPrimary }]}
            numberOfLines={1}
          >
            {skill.name}
          </Text>
          <Text
            style={[styles.skillDetailDesc, { color: theme.textSecondary }]}
            numberOfLines={3}
          >
            {skill.detail}
          </Text>
          <View style={[styles.verifiedPill, { backgroundColor: isDark ? 'rgba(99,102,241,0.2)' : 'rgba(79,70,229,0.1)' }]}>
            <Text style={[styles.verifiedText, { color: categoryColor }]}>Verified Skill</Text>
          </View>
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
}

/**
 * SkillMatrixCard Component
 * Interactive 3D Flip Cards & Staggered Animation with Category Filter & Replay Button
 */
export default function SkillMatrixCard({ skills = [], theme }: SkillMatrixCardProps) {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1024;
  const isTablet = width >= 768 && width < 1024;

  const [selectedCategory, setSelectedCategory] = useState<'ALL' | 'MOBILE' | 'DESIGN' | 'DATA' | 'ANALYSIS'>('ALL');
  const [replayCounter, setReplayCounter] = useState(0);

  const categories: { key: 'ALL' | 'MOBILE' | 'DESIGN' | 'DATA' | 'ANALYSIS'; label: string }[] = [
    { key: 'ALL', label: 'Semua' },
    { key: 'MOBILE', label: 'Mobile App' },
    { key: 'DESIGN', label: 'UI/UX' },
    { key: 'DATA', label: 'Database' },
    { key: 'ANALYSIS', label: 'Systems Analysis' },
  ];

  const sourceSkills = DEFAULT_SKILLS;

  const filteredSkills = sourceSkills.filter((skill) => {
    if (selectedCategory === 'ALL') return true;
    return skill.category === selectedCategory;
  });

  const handleReplay = () => {
    setReplayCounter((prev) => prev + 1);
  };

  return (
    <View
      style={[
        styles.mainCard,
        {
          backgroundColor: theme.surface,
          borderColor: theme.border,
          padding: isDesktop ? 28 : 18,
        },
      ]}
      accessibilityRole="region"
      accessibilityLabel="Keahlian Teknis Mahasiswa"
    >
      <SectionHeading
        title="Keahlian Teknis"
        subtitle="Interactive 3D Flip Cards • Klik kartu untuk melihat detail kompetensi"
        icon="code-slash-outline"
        badgeText={`${filteredSkills.length} Keahlian`}
        theme={theme}
      />

      {/* Baris Tab Filter di Kiri & Tombol Putar Ulang di Kanan */}
      <View style={styles.topToolbarRow}>
        <View style={styles.filterTabsRow}>
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.key;
            return (
              <TouchableOpacity
                key={cat.key}
                style={[
                  styles.filterTab,
                  {
                    backgroundColor: isActive ? theme.primary : theme.surfaceMuted,
                    borderColor: isActive ? theme.primaryBorder : theme.borderLight,
                  },
                ]}
                activeOpacity={0.7}
                onPress={() => setSelectedCategory(cat.key)}
                accessibilityRole="button"
                accessibilityLabel={`Filter ${cat.label}`}
              >
                <Text
                  style={[
                    styles.filterTabText,
                    { color: isActive ? theme.textInverted : theme.textSecondary },
                    isActive && { fontWeight: '700' },
                  ]}
                >
                  {cat.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Tombol [↻ Putar ulang] */}
        <TouchableOpacity
          style={[
            styles.replayButton,
            {
              backgroundColor: theme.surfaceMuted,
              borderColor: theme.border,
            },
          ]}
          onPress={handleReplay}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel="Putar ulang animasi kartu keahlian"
        >
          <Ionicons name="refresh" size={15} color={theme.primary} />
          <Text style={[styles.replayBtnText, { color: theme.primary }]}>
            Putar ulang
          </Text>
        </TouchableOpacity>
      </View>

      {/* Grid Kartu Kotak (6 Kolom di Desktop / 3 di Tablet / 2 di HP) */}
      <View style={styles.cardsGridWrap}>
        {filteredSkills.map((skill, index) => (
          <FlipSkillCard
            key={`${skill.name}-${replayCounter}`}
            skill={skill}
            theme={theme}
            isDesktop={isDesktop}
            isTablet={isTablet}
            staggerDelay={index * 35}
            triggerReset={replayCounter}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainCard: {
    width: '100%',
    borderRadius: 22,
    borderWidth: 1,
    overflow: 'hidden',
    ...Platform.select({
      web: {
        backdropFilter: 'blur(16px)',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.12)',
      } as any,
      default: {
        elevation: 4,
      },
    }),
  },
  topToolbarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  filterTabsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterTab: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
    borderWidth: 1,
    ...Platform.select({
      web: { cursor: 'pointer' as any },
    }),
  },
  filterTabText: {
    fontFamily: FONTS.medium,
    fontSize: 12,
  },
  replayButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
    borderWidth: 1,
    gap: 6,
    ...Platform.select({
      web: { cursor: 'pointer' as any },
    }),
  },
  replayBtnText: {
    fontFamily: FONTS.semiBold,
    fontSize: 12,
    fontWeight: '600',
  },
  cardsGridWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
    width: '100%',
  },
  cardContainer: {
    height: 140,
    ...Platform.select({
      web: {
        perspective: '1000px' as any,
      },
    }),
  },
  cardPressable: {
    width: '100%',
    height: '100%',
    position: 'relative',
    ...Platform.select({
      web: { cursor: 'pointer' as any },
    }),
  },
  flipFace: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 16,
    borderWidth: 1,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backfaceVisibility: 'hidden',
    ...Platform.select({
      web: {
        transformStyle: 'preserve-3d' as any,
        backdropFilter: 'blur(12px)',
      } as any,
    }),
  },
  flipFaceFront: {
    zIndex: 2,
  },
  flipFaceBack: {
    zIndex: 1,
  },
  skillDotGlow: {
    width: 6,
    height: 6,
    borderRadius: 3,
    position: 'absolute',
    top: 10,
    right: 10,
  },
  skillName: {
    fontFamily: FONTS.bold,
    fontSize: 12.5,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 16,
  },
  skillCatBadge: {
    fontFamily: FONTS.semiBold,
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  tapHint: {
    fontFamily: FONTS.regular,
    fontSize: 9.5,
  },
  skillDetailTitle: {
    fontFamily: FONTS.bold,
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
  },
  skillDetailDesc: {
    fontFamily: FONTS.regular,
    fontSize: 10.5,
    textAlign: 'center',
    lineHeight: 14,
  },
  verifiedPill: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 999,
    marginTop: 2,
  },
  verifiedText: {
    fontFamily: FONTS.semiBold,
    fontSize: 9,
    fontWeight: '600',
  },
});
