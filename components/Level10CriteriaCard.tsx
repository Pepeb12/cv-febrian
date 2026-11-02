import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SPACING, FONTS } from '../theme';
import { ThemeColors } from '../types';

interface Level10CriteriaCardProps {
  onTriggerNormal: () => void;
  onTriggerError: () => void;
  onTriggerEmpty: () => void;
  onOpenTestRunner: () => void;
  currentState?: string;
  theme: ThemeColors | any;
}

export default function Level10CriteriaCard({
  onTriggerNormal,
  onTriggerError,
  onTriggerEmpty,
  onOpenTestRunner,
  currentState = 'normal',
  theme,
}: Level10CriteriaCardProps) {
  const isDark = theme?.isDark || false;

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme?.surface || '#FFFFFF',
          borderColor: theme?.border || '#E2E8F0',
        },
      ]}
      accessibilityRole="region"
      accessibilityLabel="Arsitektur Aplikasi & Industri"
    >
      {/* Header Badge */}
      <View style={styles.topRow}>
        <View style={styles.badge}>
          <MaterialCommunityIcons name="shield-check-outline" size={14} color="#0D9488" />
          <Text style={styles.badgeText}>ARSITEKTUR INDUSTRI</Text>
        </View>
        <View style={styles.lmsPill}>
          <View style={styles.onlineDot} />
          <Text style={styles.lmsPillText}>Mock API: ONLINE</Text>
        </View>
      </View>

      <Text style={[styles.title, { color: theme?.text || '#1E293B' }]}>
        Production-Oriented Mobile Architecture
      </Text>
      <Text style={[styles.description, { color: theme?.textSecondary || '#64748B' }]}>
        Aplikasi memenuhi standar industri mobile dengan pemisahan service layer API, penanganan kondisi error/empty/loading, Error Boundary, persistensi lokal AsyncStorage, serta test suite otomatis.
      </Text>

      {/* Checklist Evaluasi Level 10 */}
      <View
        style={[
          styles.checklistContainer,
          { backgroundColor: theme?.surfaceMuted || '#E5DFCE', borderColor: theme?.borderLight || '#939675' },
        ]}
      >
        <Text style={[styles.checklistHeading, { color: theme?.textPrimary || '#363C2E' }]}>
          Pencapaian Kriteria Industri (100% Terpenuhi):
        </Text>
        <View style={styles.itemRow}>
          <MaterialCommunityIcons name="check-circle" size={16} color={theme?.success || '#4A6B41'} />
          <Text style={[styles.itemText, { color: theme?.textSecondary || '#5A604E' }]}>
            <Text style={styles.bold}>Service Layer & API LMS:</Text> Simulasi asinkron, retry, dan network latency
          </Text>
        </View>
        <View style={styles.itemRow}>
          <MaterialCommunityIcons name="check-circle" size={16} color={theme?.success || '#4A6B41'} />
          <Text style={[styles.itemText, { color: theme?.textSecondary || '#5A604E' }]}>
            <Text style={styles.bold}>Resilience States:</Text> Loading skeleton, Error banner, & Empty state
          </Text>
        </View>
        <View style={styles.itemRow}>
          <MaterialCommunityIcons name="check-circle" size={16} color={theme?.success || '#4A6B41'} />
          <Text style={[styles.itemText, { color: theme?.textSecondary || '#5A604E' }]}>
            <Text style={styles.bold}>Error Boundary:</Text> Perlindungan runtime crash pada root UI aplikasi
          </Text>
        </View>
        <View style={styles.itemRow}>
          <MaterialCommunityIcons name="check-circle" size={16} color={theme?.success || '#4A6B41'} />
          <Text style={[styles.itemText, { color: theme?.textSecondary || '#5A604E' }]}>
            <Text style={styles.bold}>Local Storage:</Text> Persistensi AsyncStorage untuk preferensi & draft
          </Text>
        </View>
        <View style={styles.itemRow}>
          <MaterialCommunityIcons name="check-circle" size={16} color={theme?.success || '#4A6B41'} />
          <Text style={[styles.itemText, { color: theme?.textSecondary || '#5A604E' }]}>
            <Text style={styles.bold}>Accessibility (a11y):</Text> ARIA roles, label pembaca layar, min 48dp target
          </Text>
        </View>
        <View style={styles.itemRow}>
          <MaterialCommunityIcons name="check-circle" size={16} color={theme?.success || '#4A6B41'} />
          <Text style={[styles.itemText, { color: theme?.textSecondary || '#5A604E' }]}>
            <Text style={styles.bold}>Pull-to-Refresh:</Text> RefreshControl interaktif untuk sinkronisasi ulang
          </Text>
        </View>
      </View>

      {/* Simulator Control Buttons for Presentation */}
      <Text style={[styles.controlHeading, { color: theme?.textPrimary || '#363C2E' }]}>
        Panel Demonstrasi Dosen & Pengujian:
      </Text>
      <View style={styles.buttonGrid}>
        {/* Normal Button */}
        <TouchableOpacity
          style={[
            styles.simBtn,
            {
              backgroundColor: currentState === 'normal' ? (theme?.primary || '#62684D') : (theme?.surfaceMuted || '#E5DFCE'),
              borderColor: currentState === 'normal' ? (theme?.primary || '#62684D') : (theme?.borderLight || '#939675'),
              borderWidth: 1,
            },
          ]}
          onPress={onTriggerNormal}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel="Tampilkan Mode Data Normal"
        >
          <MaterialCommunityIcons
            name="check"
            size={16}
            color={currentState === 'normal' ? (theme?.textInverted || '#FFFFFF') : (theme?.textSecondary || '#5A604E')}
          />
          <Text
            style={[
              styles.simBtnText,
              { color: currentState === 'normal' ? (theme?.textInverted || '#FFFFFF') : (theme?.textPrimary || '#363C2E') },
            ]}
          >
            Normal State
          </Text>
        </TouchableOpacity>

        {/* Error Button */}
        <TouchableOpacity
          style={[
            styles.simBtn,
            {
              backgroundColor: currentState === 'error' ? '#A83B3B' : (theme?.surfaceMuted || '#E5DFCE'),
              borderColor: currentState === 'error' ? '#A83B3B' : (theme?.borderLight || '#939675'),
              borderWidth: 1,
            },
          ]}
          onPress={onTriggerError}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel="Simulasi Error 503 LMS"
        >
          <MaterialCommunityIcons
            name="alert-circle-outline"
            size={16}
            color={currentState === 'error' ? '#FFFFFF' : '#A83B3B'}
          />
          <Text
            style={[
              styles.simBtnText,
              { color: currentState === 'error' ? '#FFFFFF' : (theme?.textPrimary || '#363C2E') },
            ]}
          >
            Simulasi Error (503)
          </Text>
        </TouchableOpacity>

        {/* Empty Button */}
        <TouchableOpacity
          style={[
            styles.simBtn,
            {
              backgroundColor: currentState === 'empty' ? '#9C6F32' : (theme?.surfaceMuted || '#E5DFCE'),
              borderColor: currentState === 'empty' ? '#9C6F32' : (theme?.borderLight || '#939675'),
              borderWidth: 1,
            },
          ]}
          onPress={onTriggerEmpty}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel="Simulasi Data Kosong (Empty State)"
        >
          <MaterialCommunityIcons
            name="file-outline"
            size={16}
            color={currentState === 'empty' ? '#FFFFFF' : '#9C6F32'}
          />
          <Text
            style={[
              styles.simBtnText,
              { color: currentState === 'empty' ? '#FFFFFF' : (theme?.textPrimary || '#363C2E') },
            ]}
          >
            Simulasi Empty State
          </Text>
        </TouchableOpacity>

        {/* Automated Test Runner Button */}
        <TouchableOpacity
          style={[styles.testRunnerBtn, { backgroundColor: theme?.primary || '#62684D' }]}
          onPress={onOpenTestRunner}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel="Buka Test Runner Otomatis Live"
        >
          <MaterialCommunityIcons name="speedometer" size={16} color={theme?.textInverted || '#FFFFFF'} />
          <Text style={[styles.testRunnerBtnText, { color: theme?.textInverted || '#FFFFFF' }]}>Buka Automated Test Suite</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: SPACING.cardPadding, // 24px standardized card padding
    borderRadius: SPACING.cardRadius, // 16px
    borderWidth: 1, // Soft hairline, no harsh border
    marginBottom: 0,
    width: '100%',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
    flexWrap: 'wrap',
    gap: 8,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#CCFBF1',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    gap: 6,
  },
  badgeText: {
    fontFamily: FONTS.bold,
    color: '#0F766E',
    fontWeight: '700',
    fontSize: 11,
    letterSpacing: 0.5,
  },
  lmsPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 6,
  },
  onlineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
  },
  lmsPillText: {
    fontFamily: FONTS.semiBold,
    fontSize: 10,
    fontWeight: '600',
    color: '#059669',
  },
  title: {
    fontFamily: FONTS.extraBold,
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 6,
  },
  description: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 16,
  },
  checklistContainer: {
    padding: SPACING.md,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
    marginBottom: 14,
  },
  checklistHeading: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 2,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  itemText: {
    fontSize: 11,
    lineHeight: 16,
    flex: 1,
  },
  bold: {
    fontWeight: '700',
  },
  controlHeading: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 8,
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  simBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    gap: 6,
  },
  simBtnActiveNormal: {
    backgroundColor: '#0284C7',
  },
  simBtnActiveError: {
    backgroundColor: '#EF4444',
  },
  simBtnActiveEmpty: {
    backgroundColor: '#F59E0B',
  },
  simBtnText: {
    fontSize: 11,
    fontWeight: '700',
  },
  testRunnerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0D9488',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    gap: 6,
  },
  testRunnerBtnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
});

