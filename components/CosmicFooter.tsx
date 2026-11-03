import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Theme, FONTS } from '../theme';
import { TabKey, TABS } from './NavigationTabBar';

interface CosmicFooterProps {
  student: any;
  theme: Theme;
  onNavigateSection: (tabKey: TabKey) => void;
  onScrollToTop: () => void;
}

export default function CosmicFooter({
  student,
  theme,
  onNavigateSection,
  onScrollToTop,
}: CosmicFooterProps) {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1024;
  const isTablet = width >= 768 && width < 1024;
  const isDark = theme.isDark;

  return (
    <View
      style={[
        styles.footerWrapper,
        {
          backgroundColor: isDark ? 'rgba(15, 19, 40, 0.75)' : 'rgba(238, 242, 255, 0.65)',
          borderColor: theme.border,
        },
      ]}
    >
      {/* 3 KOLOM SEJAJAR DI DESKTOP */}
      <View
        style={[
          styles.columnsRow,
          isDesktop ? styles.columnsRowDesktop : styles.columnsRowMobile,
        ]}
      >
        {/* KOLOM 1: IDENTITAS & DESKRIPSI ASLI */}
        <View style={[styles.columnItem, isDesktop && styles.columnItemThird]}>
          <Text style={[styles.brandTitle, { color: theme.textPrimary }]}>
            Personal CV
          </Text>
          <Text style={[styles.brandSubtitle, { color: theme.textHighlight }]}>
            {student.nama}
          </Text>
          <Text style={[styles.mottoText, { color: theme.secondary }]}>
            TEKUN • DISIPLIN • BERKELAS
          </Text>
          <Text style={[styles.bioSummary, { color: theme.textSecondary }]}>
            {student.deskripsi}
          </Text>
        </View>

        {/* KOLOM 2: PINTASAN MENU ASLI */}
        <View style={[styles.columnItem, isDesktop && styles.columnItemThird]}>
          <Text style={[styles.colHeading, { color: theme.textPrimary }]}>
            Pintasan Navigasi
          </Text>
          <View style={styles.navLinksList}>
            {TABS.map((tab) => (
              <TouchableOpacity
                key={tab.key}
                style={styles.navLinkItem}
                onPress={() => onNavigateSection(tab.key)}
                activeOpacity={0.7}
                accessibilityRole="button"
                accessibilityLabel={`Ke bagian ${tab.label}`}
              >
                <Ionicons name="chevron-forward" size={13} color={theme.primary} />
                <Text style={[styles.navLinkText, { color: theme.textSecondary }]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* KOLOM 3: INFO AKADEMIK & KONTAK */}
        <View style={[styles.columnItem, isDesktop && styles.columnItemThird]}>
          <Text style={[styles.colHeading, { color: theme.textPrimary }]}>
            Informasi Akademik
          </Text>
          <View style={styles.infoMetaList}>
            <View style={styles.infoMetaItem}>
              <Ionicons name="school-outline" size={15} color={theme.primary} />
              <Text style={[styles.infoMetaText, { color: theme.textSecondary }]}>
                {student.fakultas} • {student.kampus}
              </Text>
            </View>

            <View style={styles.infoMetaItem}>
              <Ionicons name="ribbon-outline" size={15} color={theme.secondary} />
              <Text style={[styles.infoMetaText, { color: theme.textSecondary }]}>
                UTS Pemrograman Mobile 2 • Dosen: Iin, M.Kom
              </Text>
            </View>

            <View style={styles.infoMetaItem}>
              <Ionicons name="mail-outline" size={15} color={theme.primary} />
              <Text style={[styles.infoMetaText, { color: theme.textSecondary }]}>
                {student.email}
              </Text>
            </View>

            <View style={styles.infoMetaItem}>
              <Ionicons name="call-outline" size={15} color={theme.secondary} />
              <Text style={[styles.infoMetaText, { color: theme.textSecondary }]}>
                {student.kontak}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* BARIS COPYRIGHT & TOMBOL KEMBALI KE ATAS ↑ */}
      <View
        style={[
          styles.bottomBarRow,
          {
            borderTopColor: theme.borderLight,
          },
        ]}
      >
        <Text style={[styles.copyrightText, { color: theme.textMuted }]}>
          © 2026 {student.nama} ({student.nim}) • All Rights Reserved
        </Text>

        <TouchableOpacity
          style={[
            styles.backToTopBtn,
            {
              backgroundColor: isDark ? 'rgba(30, 37, 70, 0.8)' : 'rgba(238, 242, 255, 0.9)',
              borderColor: theme.border,
            },
          ]}
          onPress={onScrollToTop}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel="Kembali ke atas halaman"
        >
          <Text style={[styles.backToTopText, { color: theme.primary }]}>
            Kembali ke atas
          </Text>
          <Ionicons name="arrow-up" size={15} color={theme.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footerWrapper: {
    width: '100%',
    borderRadius: 22,
    borderWidth: 1,
    padding: 24,
    marginTop: 20,
    gap: 24,
    ...Platform.select({
      web: {
        backdropFilter: 'blur(16px)',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.12)',
      } as any,
      default: {
        elevation: 4,
      },
    }),
  },
  columnsRow: {
    width: '100%',
    gap: 24,
  },
  columnsRowDesktop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  columnsRowMobile: {
    flexDirection: 'column',
  },
  columnItem: {
    gap: 10,
  },
  columnItemThird: {
    flex: 1,
    paddingHorizontal: 8,
  },
  brandTitle: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    fontWeight: '700',
  },
  brandSubtitle: {
    fontFamily: FONTS.bold,
    fontSize: 14,
    fontWeight: '700',
    marginTop: -4,
  },
  mottoText: {
    fontFamily: FONTS.bold,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  bioSummary: {
    fontFamily: FONTS.regular,
    fontSize: 12.5,
    lineHeight: 19,
  },
  colHeading: {
    fontFamily: FONTS.bold,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  navLinksList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  navLinkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    width: '45%',
    paddingVertical: 3,
    ...Platform.select({
      web: { cursor: 'pointer' as any },
    }),
  },
  navLinkText: {
    fontFamily: FONTS.medium,
    fontSize: 12.5,
  },
  infoMetaList: {
    gap: 8,
  },
  infoMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoMetaText: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    flex: 1,
  },
  bottomBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 16,
    borderTopWidth: 1,
    flexWrap: 'wrap',
    gap: 12,
  },
  copyrightText: {
    fontFamily: FONTS.regular,
    fontSize: 12,
  },
  backToTopBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 999,
    borderWidth: 1,
    gap: 6,
    ...Platform.select({
      web: {
        cursor: 'pointer' as any,
        transition: 'transform 0.15s ease' as any,
      },
    }),
  },
  backToTopText: {
    fontFamily: FONTS.bold,
    fontSize: 12,
    fontWeight: '700',
  },
});
