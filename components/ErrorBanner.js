/**
 * Error Banner & Retry Component (Level 10 Industry)
 * Ditampilkan saat terjadi kegagalan jaringan atau respons error API (500/503)
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SPACING } from '../theme';

export default function ErrorBanner({ error, onRetry, theme }) {
  const isDark = theme?.isDark || false;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDark ? '#450A0A' : '#FEF2F2',
          borderColor: isDark ? '#991B1B' : '#FECACA',
        },
      ]}
      accessibilityRole="alert"
    >
      <View style={styles.headerRow}>
        <View style={styles.iconCircle}>
          <MaterialCommunityIcons name="cloud-off-outline" size={24} color="#EF4444" />
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.title, { color: isDark ? '#FCA5A5' : '#991B1B' }]}>
            Gagal Terhubung ke LMS
          </Text>
          <Text style={[styles.statusBadge, { color: isDark ? '#F87171' : '#DC2626' }]}>
            STATUS {error?.status || 503} • {error?.name || 'NetworkError'}
          </Text>
        </View>
      </View>

      <Text style={[styles.message, { color: isDark ? '#FEE2E2' : '#7F1D1D' }]}>
        {error?.message || 'Terjadi gangguan saat mengambil data nilai dari LMS. Silakan periksa koneksi Anda dan coba kembali.'}
      </Text>

      {onRetry ? (
        <TouchableOpacity
          style={styles.retryButton}
          onPress={onRetry}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel="Coba Lagi Menghubungkan ke Server"
        >
          <MaterialCommunityIcons name="reload" size={16} color="#FFFFFF" />
          <Text style={styles.retryButtonText}>Coba Lagi (Retry)</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: SPACING.md,
    borderRadius: 14,
    borderWidth: 1,
    marginVertical: SPACING.md,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '800',
  },
  statusBadge: {
    fontSize: 10,
    fontWeight: '700',
    marginTop: 2,
    letterSpacing: 0.5,
  },
  message: {
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 12,
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DC2626',
    paddingVertical: 9,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 6,
    alignSelf: 'flex-start',
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
});
