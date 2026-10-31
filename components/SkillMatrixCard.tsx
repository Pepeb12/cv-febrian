import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import SectionHeading from './SectionHeading';
import { Theme, SPACING, SHADOWS } from '../theme';

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
 * SkillMatrixCard Component (Level 7: Dynamic Skills Filter & Progress Bars)
 * Clean, restrained developer competency matrix without excessive neon styling.
 */
export default function SkillMatrixCard({ skills = [], theme }: SkillMatrixCardProps) {
  const [selectedCategory, setSelectedCategory] = useState<'ALL' | 'MOBILE' | 'ANALYSIS' | 'DESIGN' | 'DATA'>('ALL');

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
        icon="code-tags"
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
                  backgroundColor: isActive ? theme.primary : theme.surfaceMuted,
                  borderColor: isActive ? theme.primary : theme.border,
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
                <Text style={[styles.percentageText, { color: theme.primary }]}>
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
                    backgroundColor: theme.primary,
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
    padding: SPACING.lg,
    borderWidth: 1,
    marginBottom: SPACING.lg,
    ...SHADOWS.sm,
  },
  filterTabsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: SPACING.md,
  },
  filterTab: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  filterTabText: {
    fontSize: 11,
    fontWeight: '600',
  },
  skillList: {
    gap: 12,
    marginTop: 4,
  },
  skillItem: {
    marginBottom: 4,
  },
  skillHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  skillName: {
    fontSize: 13,
    fontWeight: '600',
  },
  levelBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  levelText: {
    fontSize: 11,
  },
  percentageText: {
    fontSize: 12,
    fontWeight: '800',
  },
  progressTrack: {
    height: 7,
    borderRadius: 4,
    overflow: 'hidden',
    borderWidth: 0.5,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
});

