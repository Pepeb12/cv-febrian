import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

/**
 * SectionHeading Component (Materi P2: Reusable Component & JSX Props)
 * Menampilkan judul section hierarkis dengan ikon dan subjudul deskriptif.
 */
export default function SectionHeading({ title, subtitle, icon, badgeText }) {
  return (
    <View style={styles.headingContainer}>
      <View style={styles.topRow}>
        <View style={styles.titleWithIcon}>
          {icon && (
            <View style={styles.iconWrapper}>
              <Ionicons name={icon} size={18} color="#1E40AF" />
            </View>
          )}
          <Text style={styles.mainTitle}>{title}</Text>
        </View>
        {badgeText && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badgeText}</Text>
          </View>
        )}
      </View>
      {subtitle ? <Text style={styles.subTitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  headingContainer: {
    marginBottom: 12,
    marginTop: 8,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconWrapper: {
    width: 28,
    height: 28,
    borderRadius: 7,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: 0.3,
  },
  subTitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
    paddingLeft: 36,
  },
  badge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#475569',
    textTransform: 'uppercase',
  },
});

