import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SectionHeading from './SectionHeading';
import { SHADOWS, SPACING } from '../theme';

/**
 * ExperienceTimeline Component (Level 7: Organizational & Academic Experience)
 * Menampilkan pengalaman organisasi dan riset dalam bentuk timeline vertikal.
 */
export default function ExperienceTimeline({ experiences, theme }) {
  if (!experiences || experiences.length === 0) return null;

  return (
    <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.borderLight }]}>
      <SectionHeading
        title="Pengalaman & Organisasi"
        subtitle="Aktivitas Kepemimpinan & Proyek Akademik"
        icon="ribbon"
        badgeText="Pengalaman"
        theme={theme}
      />

      <View style={styles.timelineContainer}>
        {experiences.map((exp, index) => {
          const isLast = index === experiences.length - 1;
          return (
            <View key={exp.id || index} style={styles.timelineItem}>
              {/* Sisi Kiri: Bullet Node & Vertical Line */}
              <View style={styles.leftCol}>
                <View style={[styles.nodeCircle, { backgroundColor: exp.color || theme.primary }]}>
                  <Ionicons name={exp.icon || 'star'} size={12} color="#FFFFFF" />
                </View>
                {!isLast && <View style={[styles.connectingLine, { backgroundColor: theme.border }]} />}
              </View>

              {/* Sisi Kanan: Konten Pengalaman */}
              <View style={styles.contentCol}>
                <View style={styles.headerRow}>
                  <Text style={[styles.roleText, { color: theme.textPrimary }]}>{exp.role}</Text>
                  <Text style={[styles.periodText, { color: theme.textMuted }]}>{exp.period}</Text>
                </View>
                <Text style={[styles.orgText, { color: exp.color || theme.primary }]}>
                  {exp.organization}
                </Text>
                <Text style={[styles.descText, { color: theme.textSecondary }]}>
                  {exp.description}
                </Text>
              </View>
            </View>
          );
        })}
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
  timelineContainer: {
    paddingLeft: 4,
    marginTop: SPACING.sm,
  },
  timelineItem: {
    flexDirection: 'row',
    position: 'relative',
    marginBottom: SPACING.md,
  },
  leftCol: {
    width: 28,
    alignItems: 'center',
  },
  nodeCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  connectingLine: {
    position: 'absolute',
    top: 24,
    bottom: -16,
    width: 2,
    zIndex: 1,
  },
  contentCol: {
    flex: 1,
    paddingLeft: 10,
    paddingBottom: 6,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  roleText: {
    fontSize: 13,
    fontWeight: '800',
    flex: 1,
    marginRight: 6,
  },
  periodText: {
    fontSize: 11,
    fontWeight: '600',
  },
  orgText: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 4,
  },
  descText: {
    fontSize: 11,
    lineHeight: 17,
  },
});

