import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import SectionHeading from './SectionHeading';
import { Theme, SPACING, FONTS } from '../theme';

interface SkillItem {
  name: string;
  category?: string;
  level?: string;
  percentage?: number;
}

interface SkillMatrixCardProps {
  skills?: SkillItem[];
  theme: Theme;
}

const DEFAULT_SKILLS = [
  // Mobile App
  { name: 'React Native', category: 'MOBILE' },
  { name: 'Expo & EAS', category: 'MOBILE' },
  { name: 'TypeScript', category: 'MOBILE' },
  { name: 'JavaScript (ES6+)', category: 'MOBILE' },
  { name: 'Expo Router', category: 'MOBILE' },
  { name: 'Mobile State Hooks', category: 'MOBILE' },
  { name: 'Cross-Platform UI', category: 'MOBILE' },

  // UI/UX Design
  { name: 'UI/UX Design', category: 'DESIGN' },
  { name: 'Figma Prototyping', category: 'DESIGN' },
  { name: 'Wireframing', category: 'DESIGN' },
  { name: 'Design Systems', category: 'DESIGN' },
  { name: 'User Flow & IA', category: 'DESIGN' },
  { name: 'Mobile Usability (UX)', category: 'DESIGN' },

  // Database
  { name: 'Database & SQL', category: 'DATA' },
  { name: 'MySQL', category: 'DATA' },
  { name: 'Relational DB Modeling', category: 'DATA' },
  { name: 'REST API Integration', category: 'DATA' },
  { name: 'AsyncStorage Persistence', category: 'DATA' },

  // Systems Analysis
  { name: 'Systems Analysis', category: 'ANALYSIS' },
  { name: 'UML (Use Case/Activity)', category: 'ANALYSIS' },
  { name: 'Data Flow Diagram (DFD)', category: 'ANALYSIS' },
  { name: 'Business Process Mapping', category: 'ANALYSIS' },
  { name: 'Git & GitHub', category: 'ANALYSIS' },
];

/**
 * SkillMatrixCard Component (Minimalist Tech: Chips/Tags flex-wrap, rounded-full, bg-slate-100, text-sm, px-3, py-1)
 * Menggantikan progress bar panjang dengan tag cloud yang hemat ruang vertikal dan elegan.
 */
export default function SkillMatrixCard({ skills = [], theme }: SkillMatrixCardProps) {
  const [selectedCategory, setSelectedCategory] = useState<'ALL' | 'MOBILE' | 'DESIGN' | 'DATA' | 'ANALYSIS'>('ALL');
  const isDark = theme.isDark;

  const categories: { key: 'ALL' | 'MOBILE' | 'DESIGN' | 'DATA' | 'ANALYSIS'; label: string }[] = [
    { key: 'ALL', label: 'Semua' },
    { key: 'MOBILE', label: 'Mobile App' },
    { key: 'DESIGN', label: 'UI/UX' },
    { key: 'DATA', label: 'Database' },
    { key: 'ANALYSIS', label: 'Systems Analysis' },
  ];

  // Gunakan gabungan skills dari prop atau data default
  const sourceSkills = DEFAULT_SKILLS;

  const filteredSkills = sourceSkills.filter((skill) => {
    if (selectedCategory === 'ALL') return true;
    return skill.category === selectedCategory;
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
      accessibilityRole="region"
      accessibilityLabel="Keahlian Teknis Mahasiswa"
    >
      <SectionHeading
        title="Keahlian Teknis"
        subtitle="Kompetensi Rekayasa Perangkat Lunak & Analisis Sistem"
        icon="code-slash-outline"
        badgeText={`${filteredSkills.length} Keahlian`}
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
                    ? theme.primary
                    : theme.surfaceMuted,
                  borderColor: isActive
                    ? theme.primaryBorder
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

      {/* Sekumpulan Chip/Tag (rounded-full, bg-slate-100, text-sm, px-3, py-1) dibungkus flex-wrap */}
      <View style={styles.chipsWrapContainer}>
        {filteredSkills.map((skill, index) => (
          <View
            key={index}
            style={[
              styles.skillChip,
              {
                backgroundColor: isDark ? theme.surfaceMuted : theme.surfaceSubtle,
                borderColor: theme.border,
              },
            ]}
          >
            {/* Subtle dot indicator */}
            <View
              style={[
                styles.chipDot,
                {
                  backgroundColor:
                    skill.category === 'MOBILE'
                      ? '#0284C7' // Sky Blue
                      : skill.category === 'DESIGN'
                      ? '#7C3AED' // Purple
                      : skill.category === 'DATA'
                      ? '#059669' // Emerald Green
                      : '#D97706', // Amber
                },
              ]}
            />
            {/* Teks chip: text-sm (13px), dark slate */}
            <Text
              style={[
                styles.skillChipText,
                {
                  color: theme.textPrimary,
                },
              ]}
            >
              {skill.name}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: SPACING.cardRadius, // 16px
    padding: SPACING.cardPadding, // 24px standardized card padding
    borderWidth: 1,
    marginBottom: 0,
    width: '100%',
    flex: 1,
  },
  filterTabsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm, // 8px
    marginBottom: SPACING.lg, // 24px
  },
  filterTab: {
    paddingVertical: 5,
    paddingHorizontal: 11,
    borderRadius: 6,
    borderWidth: 1,
  },
  filterTabText: {
    fontFamily: FONTS.semiBold,
    fontSize: 11,
    fontWeight: '600',
  },
  // WRAPPER SEKUMPULAN CHIP (flex-wrap)
  chipsWrapContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8, // 8px spacing
    alignItems: 'center',
  },
  // CHIP / TAG: (rounded-full, bg-slate-100, text-sm, px-3, py-1)
  skillChip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 999, // rounded-full
    paddingHorizontal: 12, // px-3 (12px)
    paddingVertical: 6, // py-1 (6px)
    borderWidth: 1,
    gap: 7,
  },
  chipDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  skillChipText: {
    fontFamily: FONTS.medium,
    fontSize: 13, // text-sm
    fontWeight: '500',
  },
});
