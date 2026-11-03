import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Platform, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SectionHeading from './SectionHeading';
import { COLORS, SPACING, FONTS } from '../theme';
import { ContactItem, ThemeColors } from '../types';
import { SECTION_IMAGES } from '../data/sectionImages';

interface ContactGridCardProps {
  contactItems?: ContactItem[];
  theme?: ThemeColors | any;
}

/**
 * ContactGridCard Component (Kanal Kontak & Jaringan)
 * - Email Mahasiswa 1 baris penuh (100% width) agar alamat email utuh tanpa elipsis
 * - 4 item lainnya (WhatsApp, GitHub, Domisili, Kampus) dalam Grid 2x2
 * - Box Status Kolaborasi di bagian paling bawah (marginTop: 'auto')
 * - flex: 1 dan tinggi rata sejajar dengan Card Form Pesan di kanan
 */
export default function ContactGridCard({ contactItems = [], theme }: ContactGridCardProps) {
  const currentTheme = theme || COLORS;

  const handleContactPress = (item: ContactItem) => {
    const message = `${item.label}:\n${item.value}`;
    if (Platform.OS === 'web') {
      window.alert(message);
    } else {
      Alert.alert(item.label, item.value, [{ text: 'Tutup', style: 'default' }]);
    }
  };

  // Pisahkan Email dari 4 item lainnya
  const emailItem = contactItems.find((i) => i.type === 'email');
  const otherItems = contactItems.filter((i) => i.type !== 'email');

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: currentTheme.surface,
          borderColor: currentTheme.border,
        },
      ]}
      accessibilityRole="region"
      accessibilityLabel="Informasi Kontak & Jaringan"
    >
      <SectionHeading
        title="Kanal Kontak & Jaringan"
        subtitle="Komunikasi & Kolaborasi Profesional"
        icon="share-social-outline"
        badgeText="Kontak"
        theme={currentTheme}
      />

      <View style={styles.contentWrapper}>
        {/* VISUAL COLLABORATION BANNER (GAMBAR_6_CONTACT) */}
        <View style={[styles.collabBannerFrame, { borderColor: currentTheme.borderLight }]}>
          <Image
            source={SECTION_IMAGES.GAMBAR_6_CONTACT.source}
            style={styles.collabBannerImage}
            resizeMode="cover"
            accessibilityLabel={SECTION_IMAGES.GAMBAR_6_CONTACT.alt}
          />
          <View
            style={[
              styles.collabBannerOverlay,
              {
                backgroundColor: currentTheme.isDark
                  ? 'rgba(34, 27, 20, 0.78)'
                  : 'rgba(250, 245, 232, 0.86)',
                borderColor: currentTheme.borderLight,
              },
            ]}
          >
            <View style={styles.collabBadgeRow}>
              <View style={[styles.collabDot, { backgroundColor: currentTheme.primary }]} />
              <Text style={[styles.collabBadgeTitle, { color: currentTheme.textPrimary }]}>
                {SECTION_IMAGES.GAMBAR_6_CONTACT.title}
              </Text>
            </View>
            <Text style={[styles.collabBadgeSub, { color: currentTheme.textSecondary }]}>
              {SECTION_IMAGES.GAMBAR_6_CONTACT.subtitle}
            </Text>
          </View>
        </View>

        {/* 1. EMAIL MAHASISWA — 1 BARIS PENUH (100% WIDTH, UTUH TANPA TERPOTONG) */}
        {emailItem && (
          <TouchableOpacity
            style={[
              styles.fullWidthItem,
              {
                backgroundColor: currentTheme.surfaceMuted,
                borderColor: currentTheme.border,
              },
            ]}
            activeOpacity={0.7}
            onPress={() => handleContactPress(emailItem)}
            accessibilityRole="button"
            accessibilityLabel={`${emailItem.label}: ${emailItem.displayValue}`}
          >
            <View
              style={[
                styles.iconCircle,
                {
                  backgroundColor: currentTheme.surface,
                  borderColor: currentTheme.border,
                },
              ]}
            >
              <Ionicons name="mail-outline" size={17} color={currentTheme.primary} />
            </View>
            <View style={styles.textContainer}>
              <Text style={[styles.itemLabel, { color: currentTheme.textMuted }]}>
                {emailItem.label}
              </Text>
              <Text
                style={[styles.itemValueEmail, { color: currentTheme.textPrimary }]}
                selectable={true}
              >
                {emailItem.displayValue || emailItem.value}
              </Text>
            </View>
          </TouchableOpacity>
        )}

        {/* 2. GRID 2x2 UNTUK 4 ITEM SISANYA (WhatsApp, GitHub, Domisili, Kampus) */}
        <View style={styles.grid2x2}>
          {otherItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.gridItem,
                {
                  backgroundColor: currentTheme.surfaceMuted,
                  borderColor: currentTheme.border,
                },
              ]}
              activeOpacity={0.7}
              onPress={() => handleContactPress(item)}
              accessibilityRole="button"
              accessibilityLabel={`${item.label}: ${item.displayValue}`}
            >
              <View
                style={[
                  styles.iconCircle,
                  {
                    backgroundColor: currentTheme.surface,
                    borderColor: currentTheme.border,
                  },
                ]}
              >
                <Ionicons name={(item.icon as any) || 'link-outline'} size={16} color={currentTheme.primary} />
              </View>
              <View style={styles.textContainer}>
                <Text style={[styles.itemLabel, { color: currentTheme.textMuted }]}>
                  {item.label}
                </Text>
                <Text
                  style={[styles.itemValue, { color: currentTheme.textPrimary }]}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {item.displayValue}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* 3. BOX STATUS KOLABORASI & KETERSEDIAAN DI BAGIAN PALING BAWAH (marginTop: 'auto') */}
        <View
          style={[
            styles.statusCollabBox,
            {
              backgroundColor: currentTheme.surfaceMuted,
              borderColor: currentTheme.borderLight,
              borderLeftColor: currentTheme.primary,
            },
          ]}
        >
          <View style={styles.statusCollabTop}>
            <View style={[styles.statusDot, { backgroundColor: currentTheme.success }]} />
            <Text style={[styles.statusCollabHeading, { color: currentTheme.textPrimary }]}>
              Status Ketersediaan &amp; Kolaborasi
            </Text>
          </View>
          <Text style={[styles.statusCollabDesc, { color: currentTheme.textSecondary }]}>
            Aktif — Terbuka untuk diskusi proyek pengembangan aplikasi mobile React Native, rekayasa UI/UX, dan analisis sistem informasi.
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: SPACING.cardRadius,
    padding: SPACING.cardPadding,
    borderWidth: 1,
    marginBottom: 0,
    flex: 1,
    width: '100%',
  },
  contentWrapper: {
    flex: 1,
    gap: 12,
    marginTop: 4,
    justifyContent: 'space-between',
  },
  // EMAIL FULL WIDTH ITEM
  fullWidthItem: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    gap: 12,
  },
  // GRID 2x2
  grid2x2: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '48.5%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 11,
    borderRadius: 10,
    borderWidth: 1,
    gap: 10,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
  },
  itemLabel: {
    fontFamily: FONTS.semiBold,
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.3,
    marginBottom: 2,
  },
  itemValueEmail: {
    fontFamily: FONTS.bold,
    fontSize: 13,
    fontWeight: '700',
  },
  itemValue: {
    fontFamily: FONTS.bold,
    fontSize: 12,
    fontWeight: '700',
  },
  // STATUS COLLABORATION BOX
  statusCollabBox: {
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderLeftWidth: 3,
    marginTop: 'auto',
    gap: 6,
  },
  statusCollabTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
  },
  statusCollabHeading: {
    fontFamily: FONTS.bold,
    fontSize: 12,
    fontWeight: '700',
  },
  statusCollabDesc: {
    fontFamily: FONTS.regular,
    fontSize: 11.5,
    lineHeight: 17,
  },
  // COLLABORATION BANNER (GAMBAR_6_CONTACT)
  collabBannerFrame: {
    width: '100%',
    height: 140,
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#000000',
    marginBottom: 4,
  },
  collabBannerImage: {
    width: '100%',
    height: '100%',
  },
  collabBannerOverlay: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    right: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    gap: 2,
    ...Platform.select({
      web: {
        backdropFilter: 'blur(8px)' as any,
      },
    }),
  },
  collabBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  collabDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  collabBadgeTitle: {
    fontFamily: FONTS.bold,
    fontSize: 11.5,
    fontWeight: '700',
  },
  collabBadgeSub: {
    fontFamily: FONTS.medium,
    fontSize: 10.5,
  },
});
