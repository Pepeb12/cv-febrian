import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SectionHeading from './SectionHeading';
import { Theme, FONTS } from '../theme';
import { ContactItem } from '../types';

interface ContactGridCardProps {
  contactItems?: ContactItem[];
  theme: Theme;
}

export default function ContactGridCard({ contactItems = [], theme }: ContactGridCardProps) {
  const isDark = theme.isDark;

  const handleContactPress = (item: ContactItem) => {
    const message = `${item.label}:\n${item.value}`;
    if (Platform.OS === 'web') {
      window.alert(message);
    } else {
      Alert.alert(item.label, item.value, [{ text: 'Tutup', style: 'default' }]);
    }
  };

  // 4 Default Items with authentic data
  const defaultItems = [
    {
      label: 'Email',
      value: 'febrianrahman902@gmail.com',
      icon: 'mail-outline',
      sub: 'Respon Cepat',
    },
    {
      label: 'WhatsApp / Telepon',
      value: '089512336537',
      icon: 'logo-whatsapp',
      sub: 'Pesan Singkat & Diskusi',
    },
    {
      label: 'GitHub Repository',
      value: 'github.com/pepeb12',
      icon: 'logo-github',
      sub: 'Karya Kode Terbuka',
    },
    {
      label: 'Domisili & Status',
      value: 'Rancaekek / Sumedang, Jawa Barat',
      icon: 'location-outline',
      sub: 'Mahasiswa Masoem University',
    },
  ];

  const items = contactItems && contactItems.length >= 4
    ? contactItems.slice(0, 4).map((c, i) => ({
        label: c.label,
        value: c.displayValue || c.value,
        icon: c.icon || defaultItems[i]?.icon || 'chatbubble-outline',
        sub: defaultItems[i]?.sub || 'Info Kontak',
      }))
    : defaultItems;

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
      accessibilityLabel="Informasi Kontak & Jaringan"
    >
      <SectionHeading
        title="Kanal Kontak & Jaringan"
        subtitle="Komunikasi & Kolaborasi Profesional"
        icon="share-social-outline"
        badgeText="Kontak"
        theme={theme}
      />

      {/* 4 Tumpukan Kartu Info Kontak Vertikal dengan Kotak Ikon Indigo di Sisi Kiri */}
      <View style={styles.verticalCardsStack}>
        {items.map((item, idx) => (
          <TouchableOpacity
            key={idx}
            style={[
              styles.contactInfoCard,
              {
                backgroundColor: isDark ? 'rgba(22, 27, 51, 0.7)' : 'rgba(248, 250, 252, 0.85)',
                borderColor: theme.border,
              },
            ]}
            onPress={() => handleContactPress(item as any)}
            activeOpacity={0.75}
            accessibilityRole="button"
            accessibilityLabel={`${item.label}: ${item.value}`}
          >
            {/* Kotak Ikon Indigo di Kiri */}
            <View
              style={[
                styles.indigoIconBox,
                {
                  backgroundColor: isDark ? 'rgba(99, 102, 241, 0.16)' : 'rgba(79, 70, 229, 0.1)',
                  borderColor: theme.primary,
                },
              ]}
            >
              <Ionicons name={item.icon as any} size={18} color={theme.primary} />
            </View>

            {/* Informasi Teks */}
            <View style={styles.infoTextCol}>
              <View style={styles.labelRow}>
                <Text style={[styles.itemLabel, { color: theme.textMuted }]}>
                  {item.label}
                </Text>
                <Text style={[styles.itemSub, { color: theme.secondary }]}>
                  {item.sub}
                </Text>
              </View>
              <Text
                style={[styles.itemValue, { color: theme.textPrimary }]}
                selectable={true}
                numberOfLines={1}
              >
                {item.value}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 22,
    padding: 24,
    borderWidth: 1,
    width: '100%',
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
  verticalCardsStack: {
    gap: 14,
    marginTop: 8,
  },
  contactInfoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    gap: 14,
    ...Platform.select({
      web: {
        cursor: 'pointer' as any,
        transition: 'transform 0.15s ease, border-color 0.15s ease' as any,
      },
    }),
  },
  indigoIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    borderWidth: 1.2,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    ...Platform.select({
      web: {
        boxShadow: '0 0 12px rgba(99, 102, 241, 0.25)',
      } as any,
    }),
  },
  infoTextCol: {
    flex: 1,
    gap: 3,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemLabel: {
    fontFamily: FONTS.semiBold,
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  itemSub: {
    fontFamily: FONTS.medium,
    fontSize: 10.5,
  },
  itemValue: {
    fontFamily: FONTS.bold,
    fontSize: 13.5,
    fontWeight: '700',
  },
});
