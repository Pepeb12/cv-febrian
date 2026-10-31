/**
 * Diagnostic & Automated Test Runner Modal (Level 10 Industry)
 * Memungkinkan dosen / penguji menjalankan suite pengujian otomatis secara live di dalam aplikasi
 */

import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SPACING } from '../theme';
import { runAllTests } from '../tests/unitTests';

export default function DiagnosticModal({ visible, onClose, theme }) {
  const [isRunning, setIsRunning] = useState(false);
  const [testReport, setTestReport] = useState(null);

  const isDark = theme?.isDark || false;

  const handleRunTests = async () => {
    setIsRunning(true);
    setTestReport(null);
    try {
      // Sedikit jeda untuk memberikan efek visual progres
      await new Promise((resolve) => setTimeout(resolve, 350));
      const report = await runAllTests();
      setTestReport(report);
    } catch (err) {
      console.error('Gagal menjalankan test:', err);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View
          style={[
            styles.modalContent,
            {
              backgroundColor: theme?.surface || '#FFFFFF',
              borderColor: theme?.border || '#E2E8F0',
            },
          ]}
        >
          {/* Header */}
          <View style={[styles.header, { borderBottomColor: theme?.border || '#E2E8F0' }]}>
            <View style={styles.headerLeft}>
              <View style={styles.iconCircle}>
                <MaterialCommunityIcons name="test-tube" size={20} color="#0284C7" />
              </View>
              <View>
                <Text style={[styles.title, { color: theme?.text || '#1E293B' }]}>
                  Test Suite & Diagnostik
                </Text>
                <Text style={[styles.subtitle, { color: theme?.textMuted || '#94A3B8' }]}>
                  LEVEL 10 — Industry Production Testing
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={onClose}
              style={styles.closeBtn}
              accessibilityRole="button"
              accessibilityLabel="Tutup Modal Test"
            >
              <MaterialCommunityIcons
                name="close"
                size={22}
                color={theme?.textSecondary || '#64748B'}
              />
            </TouchableOpacity>
          </View>

          {/* Body */}
          <ScrollView style={styles.body} contentContainerStyle={styles.bodyContent}>
            {/* Info Box */}
            <View
              style={[
                styles.infoBox,
                { backgroundColor: isDark ? '#1E293B' : '#F8FAFC', borderColor: isDark ? '#334155' : '#E2E8F0' },
              ]}
            >
              <Text style={[styles.infoTitle, { color: theme?.text || '#1E293B' }]}>
                Cakupan Pengujian Otomatis (Unit & Integration):
              </Text>
              <Text style={[styles.infoDesc, { color: theme?.textSecondary || '#64748B' }]}>
                • Validasi Regex Email & Error Boundary form kontak{'\n'}
                • Algoritma kalkulasi Grade akademik (A, B, C, D, E){'\n'}
                • Kontrak data JSON (profile.json & academicScore.json){'\n'}
                • Formatting lokalisasi ribuan LP (Indonesian locale){'\n'}
                • Resilience terhadap null/empty array boundary
              </Text>
            </View>

            {/* Tombol Jalankan Test */}
            <TouchableOpacity
              style={[styles.runButton, isRunning && { opacity: 0.7 }]}
              onPress={handleRunTests}
              disabled={isRunning}
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityLabel="Jalankan Pengujian Otomatis Sekarang"
            >
              {isRunning ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <MaterialCommunityIcons name="play-circle-outline" size={20} color="#FFFFFF" />
              )}
              <Text style={styles.runButtonText}>
                {isRunning ? 'Mengeksekusi Assertions...' : 'Jalankan Pengujian Otomatis'}
              </Text>
            </TouchableOpacity>

            {/* Test Results Summary Banner */}
            {testReport ? (
              <View
                style={[
                  styles.summaryBanner,
                  {
                    backgroundColor: testReport.allPassed
                      ? isDark
                        ? '#064E3B'
                        : '#ECFDF5'
                      : isDark
                      ? '#7F1D1D'
                      : '#FEF2F2',
                    borderColor: testReport.allPassed ? '#10B981' : '#EF4444',
                  },
                ]}
              >
                <MaterialCommunityIcons
                  name={testReport.allPassed ? 'check-decagram' : 'alert-decagram'}
                  size={28}
                  color={testReport.allPassed ? '#10B981' : '#EF4444'}
                />
                <View style={{ flex: 1 }}>
                  <Text
                    style={[
                      styles.summaryTitle,
                      { color: testReport.allPassed ? '#065F46' : '#991B1B' },
                    ]}
                  >
                    {testReport.allPassed ? 'SEMUA TEST LOLOS (100% PASS)' : 'BEBERAPA TEST GAGAL'}
                  </Text>
                  <Text
                    style={[
                      styles.summaryText,
                      { color: testReport.allPassed ? '#047857' : '#B91C1C' },
                    ]}
                  >
                    Hasil: {testReport.passedCount} dari {testReport.totalCount} pengujian berhasil dieksekusi tanpa error.
                  </Text>
                </View>
              </View>
            ) : null}

            {/* List of Test Results */}
            {testReport?.results?.map((item, index) => (
              <View
                key={index}
                style={[
                  styles.testRow,
                  {
                    backgroundColor: isDark ? '#0F172A' : '#FFFFFF',
                    borderColor: item.passed ? '#10B981' : '#EF4444',
                  },
                ]}
              >
                <View style={styles.testRowHeader}>
                  <MaterialCommunityIcons
                    name={item.passed ? 'check-circle' : 'close-circle'}
                    size={18}
                    color={item.passed ? '#10B981' : '#EF4444'}
                  />
                  <Text style={[styles.testName, { color: theme?.text || '#1E293B' }]}>
                    {item.name}
                  </Text>
                </View>
                <Text style={[styles.testDetails, { color: theme?.textMuted || '#64748B' }]}>
                  {item.details}
                </Text>
              </View>
            ))}
          </ScrollView>

          {/* Footer */}
          <View style={[styles.modalFooter, { borderTopColor: theme?.border || '#E2E8F0' }]}>
            <TouchableOpacity style={styles.closeFooterBtn} onPress={onClose}>
              <Text style={styles.closeFooterText}>Tutup Panel Diagnostik</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.md,
  },
  modalContent: {
    width: '100%',
    maxWidth: 500,
    maxHeight: '85%',
    borderRadius: 20,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.lg,
    borderBottomWidth: 1,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(2, 132, 199, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
  closeBtn: {
    padding: 6,
  },
  body: {
    flex: 1,
  },
  bodyContent: {
    padding: SPACING.lg,
    gap: 12,
  },
  infoBox: {
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  infoTitle: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 4,
  },
  infoDesc: {
    fontSize: 11,
    lineHeight: 17,
  },
  runButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0284C7',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  runButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  summaryBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1.5,
    gap: 12,
  },
  summaryTitle: {
    fontSize: 13,
    fontWeight: '800',
  },
  summaryText: {
    fontSize: 11,
    marginTop: 2,
    fontWeight: '600',
  },
  testRow: {
    padding: 10,
    borderRadius: 10,
    borderLeftWidth: 4,
    backgroundColor: '#FFFFFF',
    gap: 4,
  },
  testRowHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  testName: {
    fontSize: 12,
    fontWeight: '700',
    flex: 1,
  },
  testDetails: {
    fontSize: 11,
    paddingLeft: 26,
  },
  modalFooter: {
    padding: SPACING.md,
    borderTopWidth: 1,
    alignItems: 'center',
  },
  closeFooterBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  closeFooterText: {
    color: '#64748B',
    fontWeight: '700',
    fontSize: 13,
  },
});
