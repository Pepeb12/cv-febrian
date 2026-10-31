import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FONTS, SPACING, Theme } from '../theme';

export interface StageNavigationProps {
  activeStage: number;
  onSelectStage: (stageIndex: number) => void;
  theme: Theme;
}

const STAGES = [
  {
    index: 1,
    title: 'Tahap 1',
    levels: 'Level 1 - 3',
    label: 'Identitas & Layout',
    icon: 'person-outline',
  },
  {
    index: 2,
    title: 'Tahap 2',
    levels: 'Level 4 - 6',
    label: 'Interaksi & Data JSON',
    icon: 'git-network-outline',
  },
  {
    index: 3,
    title: 'Tahap 3',
    levels: 'Level 7 - 8',
    label: 'Eksplorasi & My Score',
    icon: 'school-outline',
  },
  {
    index: 4,
    title: 'Tahap 4',
    levels: 'Level 9 - 10',
    label: 'Industri & Pengujian',
    icon: 'shield-checkmark-outline',
  },
];

/**
 * StageNavigationStepper Component
 * Allows intuitive navigation across the 4 core progression stages (Level 1 to 10).
 * Styled with Emerald – Cream – White – Mint luxury palette & Lato fonts.
 */
export default function StageNavigationStepper({
  activeStage,
  onSelectStage,
  theme,
}: StageNavigationProps) {
  const isDark = theme.isDark;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.surface,
          borderColor: theme.border,
        },
      ]}
    >
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <Ionicons name="layers-outline" size={15} color={theme.primary} />
          <Text style={[styles.headerTitle, { color: theme.textPrimary }]}>
            ALUR EVALUASI UTS (LEVEL 1 S.D. LEVEL 10)
          </Text>
        </View>
        <Text style={[styles.scrollHint, { color: theme.textMuted }]}>
          4 Tahap Evaluasi Bertahap
        </Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.stagesRow}
      >
        {STAGES.map((s) => {
          const isActive = activeStage === s.index;
          return (
            <TouchableOpacity
              key={s.index}
              style={[
                styles.stageButton,
                {
                  backgroundColor: isActive
                    ? isDark
                      ? '#064E3B'
                      : '#065F46'
                    : theme.surfaceMuted,
                  borderColor: isActive ? '#A7F3D0' : theme.border,
                },
              ]}
              activeOpacity={0.8}
              onPress={() => onSelectStage(s.index)}
              accessibilityRole="button"
              accessibilityLabel={`Navigasi ke ${s.title}: ${s.levels}`}
            >
              <View
                style={[
                  styles.iconWrap,
                  {
                    backgroundColor: isActive
                      ? isDark
                        ? '#0A2920'
                        : '#044E39'
                      : theme.surface,
                    borderColor: isActive ? '#A7F3D0' : theme.borderLight,
                  },
                ]}
              >
                <Ionicons
                  name={s.icon as any}
                  size={14}
                  color={isActive ? '#A7F3D0' : theme.primary}
                />
              </View>

              <View style={styles.stageTextCol}>
                <View style={styles.stageTitleRow}>
                  <Text
                    style={[
                      styles.stageTitle,
                      { color: isActive ? '#FFFFFF' : theme.textPrimary },
                    ]}
                  >
                    {s.title}
                  </Text>
                  <View
                    style={[
                      styles.stageLevelPill,
                      {
                        backgroundColor: isActive
                          ? 'rgba(167, 243, 208, 0.25)'
                          : isDark
                          ? '#06281E'
                          : '#FFFFFF',
                        borderColor: isActive ? '#A7F3D0' : theme.border,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.stageLevelText,
                        { color: isActive ? '#A7F3D0' : theme.primary },
                      ]}
                    >
                      {s.levels}
                    </Text>
                  </View>
                </View>

                <Text
                  style={[
                    styles.stageSubtitle,
                    { color: isActive ? '#D3EAE0' : theme.textMuted },
                  ]}
                  numberOfLines={1}
                >
                  {s.label}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 10,
    marginBottom: SPACING.md,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  headerTitle: {
    fontFamily: FONTS.heading,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.6,
  },
  scrollHint: {
    fontFamily: FONTS.body,
    fontSize: 10,
  },
  stagesRow: {
    flexDirection: 'row',
    gap: 8,
  },
  stageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    gap: 8,
    minWidth: 160,
  },
  iconWrap: {
    width: 28,
    height: 28,
    borderRadius: 7,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stageTextCol: {
    flex: 1,
  },
  stageTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  stageTitle: {
    fontFamily: FONTS.heading,
    fontSize: 11.5,
    fontWeight: '700',
  },
  stageLevelPill: {
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 4,
    borderWidth: 0.5,
  },
  stageLevelText: {
    fontFamily: FONTS.heading,
    fontSize: 8.5,
    fontWeight: '700',
  },
  stageSubtitle: {
    fontFamily: FONTS.body,
    fontSize: 10,
    marginTop: 1,
  },
});

