import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SectionHeading from './SectionHeading';
import { COLORS, SHADOWS, SPACING } from '../theme';

/**
 * SkillMatrixCard Component (Materi P4: Flexbox Styling & Progress Bars)
 * Menampilkan keahlian teknis dengan bar persentase visual yang rapi dan terukur.
 */
export default function SkillMatrixCard({ skills }) {
  return (
    <View style={styles.card}>
      <SectionHeading
        title="Keahlian Teknis (Technical Skills)"
        subtitle="Kompetensi Utama dalam Rekayasa Perangkat Lunak"
        icon="code-slash"
        badgeText="Skills"
      />

      <View style={styles.skillList}>
        {skills.map((skill, index) => (
          <View key={index} style={styles.skillItem}>
            {/* Top Row: Nama Skill & Label Level */}
            <View style={styles.skillHeader}>
              <Text style={styles.skillName}>{skill.name}</Text>
              <View style={styles.levelBadge}>
                <Text style={styles.levelText}>{skill.level}</Text>
                <Text style={styles.percentageText}>{skill.percentage}%</Text>
              </View>
            </View>

            {/* Visual Progress Bar (Flexbox relative track & fill) */}
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
  skillList: {
    gap: SPACING.md,
    marginTop: SPACING.xs,
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

