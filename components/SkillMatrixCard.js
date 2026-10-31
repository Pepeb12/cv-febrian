import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import SectionHeading from './SectionHeading';
import { COLORS, SHADOWS, SPACING } from '../theme';

/**
 * SkillMatrixCard Component (Level 7: Theme Adaptable Technical Skills)
 */
export default function SkillMatrixCard({ skills, theme }) {
  const currentTheme = theme || COLORS;
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const categories = [
    { key: 'ALL', label: 'Semua' },
    { key: 'MOBILE', label: 'Mobile App' },
    { key: 'ANALYSIS', label: 'Systems' },
    { key: 'DESIGN', label: 'UI/UX' },
    { key: 'DATA', label: 'Database' },
  ];

  const filteredSkills = (skills || []).filter((skill) => {
    if (selectedCategory === 'ALL') return true;
    if (selectedCategory === 'MOBILE') return skill.name.toLowerCase().includes('react') || skill.name.toLowerCase().includes('javascript');
    if (selectedCategory === 'ANALYSIS') return skill.name.toLowerCase().includes('systems') || skill.name.toLowerCase().includes('analysis');
    if (selectedCategory === 'DESIGN') return skill.name.toLowerCase().includes('ui') || skill.name.toLowerCase().includes('figma');
    if (selectedCategory === 'DATA') return skill.name.toLowerCase().includes('database') || skill.name.toLowerCase().includes('sql');
    return true;
  });

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: currentTheme.surface,
          borderColor: currentTheme.borderLight,
        },
      ]}
    >
      <SectionHeading
        title="Keahlian Teknis (Technical Skills)"
        subtitle="Filter Interaktif Kompetensi Rekayasa Perangkat Lunak"
        icon="code-slash"
        badgeText={`${filteredSkills.length} Skills`}
        theme={currentTheme}
      />

      {/* FILTER PILL TABS */}
      <View style={styles.filterTabsRow}>
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.key;
          return (
            <TouchableOpacity
              key={cat.key}
              style={[
                styles.filterTab,
                {
                  backgroundColor: currentTheme.surfaceMuted,
                  borderColor: currentTheme.border,
                },
                isActive
                  ? { backgroundColor: currentTheme.primary, borderColor: currentTheme.primary }
                  : null,
              ]}
              activeOpacity={0.7}
              onPress={() => setSelectedCategory(cat.key)}
            >
              <Text
                style={[
                  styles.filterTabText,
                  { color: currentTheme.textSecondary },
                  isActive ? { color: '#FFFFFF', fontWeight: '700' } : null,
                ]}
              >
                {cat.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* DAFTAR SKILL SESUAI STATE FILTER */}
      <View style={styles.skillList}>
        {filteredSkills.map((skill, index) => (
          <View key={index} style={styles.skillItem}>
            <View style={styles.skillHeader}>
              <Text style={[styles.skillName, { color: currentTheme.textPrimary }]}>
                {skill.name}
              </Text>
              <View style={styles.levelBadge}>
                <Text style={[styles.levelText, { color: currentTheme.textMuted }]}>
                  {skill.level}
                </Text>
                <Text style={[styles.percentageText, { color: currentTheme.primary }]}>
                  {skill.percentage}%
                </Text>
              </View>
            </View>

            {/* Visual Progress Bar */}
            <View
              style={[
                styles.progressTrack,
                { backgroundColor: currentTheme.isDark ? '#1E293B' : '#E2E8F0' },
              ]}
            >
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${skill.percentage}%`,
                    backgroundColor: skill.color || currentTheme.primary,
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
    borderRadius: 16,
    padding: SPACING.lg,
    borderWidth: 1,
    marginBottom: SPACING.lg,
    ...SHADOWS.md,
  },
  filterTabsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: SPACING.md,
    marginTop: 2,
  },
  filterTab: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
  },
  filterTabText: {
    fontSize: 11,
    fontWeight: '600',
  },
  skillList: {
    gap: SPACING.md,
  },
  skillItem: {
    gap: SPACING.xs,
  },
  skillHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skillName: {
    fontSize: 13,
    fontWeight: '700',
  },
  levelBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  levelText: {
    fontSize: 11,
    fontWeight: '600',
  },
  percentageText: {
    fontSize: 11,
    fontWeight: '700',
  },
  progressTrack: {
    height: 7,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
});
