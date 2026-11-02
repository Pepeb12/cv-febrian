import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import SectionHeading from './SectionHeading';
import { Theme, SPACING, FONTS } from '../theme';

interface SkillItem {
  name: string;
  level: string;
  percentage: number;
}

interface SkillMatrixCardProps {
  skills?: SkillItem[];
  theme: Theme;
}

/**
 * SkillMatrixCard Component (Minimalist Tech: Flat, Scale 8px, Inter)
 */
export default function SkillMatrixCard({ skills = [], theme }: SkillMatrixCardProps) {
  const [selectedCategory, setSelectedCategory] = useState<'ALL' | 'MOBILE' | 'ANALYSIS' | 'DESIGN' | 'DATA'>('ALL');
  const isDark = theme.isDark;

  const categories: { key: 'ALL' | 'MOBILE' | 'ANALYSIS' | 'DESIGN' | 'DATA'; label: string }[] = [
    { key: 'ALL', label: 'Semua' },
    { key: 'MOBILE', label: 'Mobile App' },
    { key: 'ANALYSIS', label: 'Systems' },
    { key: 'DESIGN', label: 'UI/UX' },
    { key: 'DATA', label: 'Database' },
  ];

  const filteredSkills = skills.filter((skill) => {
    const lower = skill.name.toLowerCase();
    if (selectedCategory === 'ALL') return true;
    if (selectedCategory === 'MOBILE') return lower.includes('react') || lower.includes('javascript') || lower.includes('mobile');
    if (selectedCategory === 'ANALYSIS') return lower.includes('system') || lower.includes('analisis') || lower.includes('analysis');
    if (selectedCategory === 'DESIGN') return lower.includes('ui') || lower.includes('ux') || lower.includes('figma');
    if (selectedCategory === 'DATA') return lower.includes('database') || lower.includes('sql') || lower.includes('data');
    return true;
  });

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.surface,
          borderColor: theme.border,
        },
      ]}
    >
      <SectionHeading
        title="Keahlian Teknis"
        subtitle="Kompetensi Rekayasa Perangkat Lunak & Analisis Sistem"
        icon="code-slash-outline"
        badgeText={`${filteredSkills.length} Bidang`}
        theme={theme}
      />

      {/* Filter Tabs */}
      <View style={styles.filterTabsRow}>
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.key;
          return (
            <TouchableOpacity
              key={cat.key}
              style={[
                styles.filterTab,
                {
                  backgroundColor: isActive
                    ? isDark
                      ? '#1E293B'
                      : '#0F172A'
                    : theme.surfaceMuted,
                  borderColor: isActive
                    ? isDark
                      ? '#334155'
                      : '#0F172A'
                    : theme.borderLight,
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
                  { color: isActive ? '#FFFFFF' : theme.textSecondary },
                  isActive && { fontWeight: '700' },
                ]}
              >
                {cat.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Skill Progress List */}
      <View style={styles.skillList}>
        {filteredSkills.map((skill, index) => (
          <View key={index} style={styles.skillItem}>
            <View style={styles.skillHeader}>
              <Text style={[styles.skillName, { color: theme.textPrimary }]}>
                {skill.name}
              </Text>
              <View style={styles.levelBadge}>
                <Text style={[styles.levelText, { color: theme.textMuted }]}>
                  {skill.level}
                </Text>
                <Text style={[styles.percentageText, { color: theme.textPrimary }]}>
                  {skill.percentage}%
                </Text>
              </View>
            </View>

            {/* Progress Bar */}
            <View style={[styles.progressTrack, { backgroundColor: theme.surfaceMuted, borderColor: theme.borderLight }]}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${skill.percentage}%`,
                    backgroundColor: theme.textPrimary,
                  },
                ]}
              />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 14,
    padding: SPACING.xl, // 32px (Scale 8px: mb-8, py-8)
    borderWidth: 1,
    marginBottom: SPACING.xl, // 32px (mb-8)
  },
  filterTabsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm, // 8px
    marginBottom: SPACING.lg, // 24px
  },
  filterTab: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    borderWidth: 1,
  },
  filterTabText: {
    fontFamily: FONTS.semiBold,
    fontSize: 11,
    fontWeight: '600',
  },
  skillList: {
    gap: SPACING.md, // 16px
  },
  skillItem: {
    marginBottom: 2,
  },
  skillHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  skillName: {
    fontFamily: FONTS.semiBold,
    fontSize: 13,
    fontWeight: '600',
  },
  levelBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  levelText: {
    fontFamily: FONTS.regular,
    fontSize: 11,
  },
  percentageText: {
    fontFamily: FONTS.bold,
    fontSize: 12,
    fontWeight: '700',
  },
  progressTrack: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
    borderWidth: 1,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
});
