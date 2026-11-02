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
 * StageNavigationStepper Component (Minimalist Tech: Flat, Scale 8px, Inter)
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
          <Ionicons name="layers-outline" size={15} color={theme.textPrimary} />
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
                    ? theme.primary
                    : theme.surfaceMuted,
                  borderColor: isActive
                    ? theme.primaryBorder
                    : theme.borderLight,
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
                      ? (isDark ? theme.surfaceMuted : theme.primaryHover)
                      : theme.surface,
                    borderColor: isActive ? 'transparent' : theme.borderLight,
                  },
                ]}
              >
                <Ionicons
                  name={s.icon as any}
                  size={14}
                  color={isActive ? theme.textInverted : theme.textPrimary}
                />
              </View>

              <View style={styles.stageTextCol}>
                <View style={styles.stageTitleRow}>
                  <Text
                    style={[
                      styles.stageTitle,
                      { color: isActive ? theme.textInverted : theme.textPrimary },
                    ]}
                  >
                    {s.title}
                  </Text>
                  <View
                    style={[
                      styles.stageLevelPill,
                      {
                        backgroundColor: isActive
                          ? 'rgba(0, 0, 0, 0.15)'
                          : theme.surface,
                        borderColor: isActive ? 'transparent' : theme.borderLight,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.stageLevelText,
                        { color: isActive ? theme.textInverted : theme.textSecondary },
                      ]}
                    >
                      {s.levels}
                    </Text>
                  </View>
                </View>

                <Text
                  style={[
                    styles.stageSubtitle,
                    { color: isActive ? theme.textInverted : theme.textMuted },
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
    borderRadius: SPACING.cardRadius, // 16px
    borderWidth: 1,
    padding: SPACING.cardPadding, // 24px standardized card padding
    marginBottom: SPACING.gap, // 20px standardized gap
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm, // 8px
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  headerTitle: {
    fontFamily: FONTS.bold,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  scrollHint: {
    fontFamily: FONTS.regular,
    fontSize: 11,
  },
  stagesRow: {
    flexDirection: 'row',
    gap: SPACING.sm, // 8px
  },
  stageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: 8,
    borderWidth: 1,
    gap: SPACING.sm,
    minWidth: 160,
  },
  iconWrap: {
    width: 28,
    height: 28,
    borderRadius: 6,
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
    gap: SPACING.xs,
  },
  stageTitle: {
    fontFamily: FONTS.bold,
    fontSize: 12,
    fontWeight: '700',
  },
  stageLevelPill: {
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4,
    borderWidth: 1,
  },
  stageLevelText: {
    fontFamily: FONTS.semiBold,
    fontSize: 9,
    fontWeight: '600',
  },
  stageSubtitle: {
    fontFamily: FONTS.regular,
    fontSize: 10.5,
    marginTop: 2,
  },
});
