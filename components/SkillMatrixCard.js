import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import SectionHeading from './SectionHeading';
import { COLORS, SHADOWS, SPACING } from '../theme';

/**
 * SkillMatrixCard Component (Level 3 & Level 4: Props, State & Filter Event Handling)
 * Menampilkan keahlian teknis dengan filter interaktif berbasis State dan progress bar visual.
 */
export default function SkillMatrixCard({ skills }) {
  // State untuk filter kategori aktif (Materi P3 & P5)
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const categories = [
    { key: 'ALL', label: 'Semua' },
    { key: 'MOBILE', label: 'Mobile App' },
    { key: 'ANALYSIS', label: 'Systems' },
    { key: 'DESIGN', label: 'UI/UX' },
    { key: 'DATA', label: 'Database' },
  ];

  // Memfilter data berdasarkan State aktif
  const filteredSkills = skills.filter((skill) => {
    if (selectedCategory === 'ALL') return true;
    if (selectedCategory === 'MOBILE') return skill.name.toLowerCase().includes('react') || skill.name.toLowerCase().includes('javascript');
    if (selectedCategory === 'ANALYSIS') return skill.name.toLowerCase().includes('systems') || skill.name.toLowerCase().includes('analysis');
    if (selectedCategory === 'DESIGN') return skill.name.toLowerCase().includes('ui') || skill.name.toLowerCase().includes('figma');
    if (selectedCategory === 'DATA') return skill.name.toLowerCase().includes('database') || skill.name.toLowerCase().includes('sql');
    return true;
  });

  return (
    <View style={styles.card}>
      <SectionHeading
        title="Keahlian Teknis (Technical Skills)"
        subtitle="Filter Interaktif Kompetensi Rekayasa Perangkat Lunak"
        icon="code-slash"
        badgeText={`${filteredSkills.length} Skills`}
      />

      {/* FILTER PILL TABS BERBASIS STATE (Materi P3 & P5) */}
      <View style={styles.filterTabsRow}>
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.key;
          return (
            <TouchableOpacity
              key={cat.key}
              style={[
                styles.filterTab,
                isActive ? styles.filterTabActive : null,
              ]}
              activeOpacity={0.7}
              onPress={() => setSelectedCategory(cat.key)}
            >
              <Text
                style={[
                  styles.filterTabText,
                  isActive ? styles.filterTabTextActive : null,
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
              <Text style={styles.skillName}>{skill.name}</Text>
              <View style={styles.levelBadge}>
                <Text style={styles.levelText}>{skill.level}</Text>
                <Text style={styles.percentageText}>{skill.percentage}%</Text>
              </View>
            </View>

            {/* Visual Progress Bar (Flexbox layout) */}
            <View style={styles.progressTrack}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${skill.percentage}%`,
                    backgroundColor: skill.color || COLORS.primary,
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
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
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
    backgroundColor: COLORS.surfaceMuted,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  filterTabActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterTabText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  filterTabTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
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
    color: COLORS.textPrimary,
  },
  levelBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  levelText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textMuted,
  },
  percentageText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.primary,
  },
  progressTrack: {
    height: 7,
    backgroundColor: '#E2E8F0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
});
