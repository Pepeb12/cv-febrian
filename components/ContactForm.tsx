import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
  Linking,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONTS, Theme } from '../theme';

interface ContactFormProps {
  data?: any;
  recipientName?: string;
  onMessageSent?: (payload?: any) => void;
  theme?: Theme | any;
}

/**
 * ContactForm Component — Level 4 & Level 5 (Formulir Kontak Interaktif)
 * Menggabungkan formulir kontak terverifikasi dengan kanal media sosial asli.
 */
export default function ContactForm({
  data,
  recipientName = 'Febrian Iradatul Rahman',
  onMessageSent,
  theme,
}: ContactFormProps) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const currentTheme: Theme = theme || COLORS;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [submittedData, setSubmittedData] = useState<{
    senderName: string;
    senderEmail: string;
    messageContent: string;
    sentAt: string;
  } | null>(null);

  const validateForm = () => {
    const newErrors: { name?: string; email?: string; message?: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Nama lengkap wajib diisi.';
    } else if (name.trim().length < 3) {
      newErrors.name = 'Nama minimal 3 karakter.';
    }

    if (!email.trim()) {
      newErrors.email = 'Alamat email wajib diisi.';
    } else {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(email.trim())) {
        newErrors.email = 'Format email tidak valid (contoh: user@gmail.com).';
      }
    }

    if (!message.trim()) {
      newErrors.message = 'Pesan wajib diisi.';
    } else if (message.trim().length < 5) {
      newErrors.message = 'Pesan minimal 5 karakter.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const payload = {
      senderName: name.trim(),
      senderEmail: email.trim(),
      messageContent: message.trim(),
      sentAt: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    };

    setSubmittedData(payload);
    setName('');
    setEmail('');
    setMessage('');
    setErrors({});

    if (onMessageSent) {
      onMessageSent(payload);
    } else {
      if (Platform.OS === 'web') {
        alert(`Terima kasih ${payload.senderName}! Pesan Anda telah terkirim ke Febrian.`);
      } else {
        Alert.alert('Pesan Terkirim', `Terima kasih ${payload.senderName}, pesan Anda telah diterima.`);
      }
    }
  };

  const handleOpenWA = () => {
    const url = 'https://wa.me/6289512336537?text=Halo%20Febrian';
    if (Platform.OS === 'web') window.open(url, '_blank');
    else Linking.openURL(url).catch(() => {});
  };

  const handleOpenEmail = () => {
    const url = 'mailto:febrianrahman902@gmail.com';
    if (Platform.OS === 'web') window.open(url, '_blank');
    else Linking.openURL(url).catch(() => {});
  };

  const handleOpenIG = () => {
    const url = 'https://instagram.com/febrianrhmn_2';
    if (Platform.OS === 'web') window.open(url, '_blank');
    else Linking.openURL(url).catch(() => {});
  };

  const handleOpenGitHub = () => {
    const url = 'https://github.com/pepeb12';
    if (Platform.OS === 'web') window.open(url, '_blank');
    else Linking.openURL(url).catch(() => {});
  };

  return (
    <View style={styles.container}>
      <View style={[styles.twoColRow, isMobile && styles.twoColRowMobile]}>
        {/* KOLOM KIRI: FORMULIR INTERAKTIF */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: currentTheme.surface,
              borderColor: currentTheme.border,
              flex: 1.2,
            },
          ]}
          {...(Platform.OS === 'web' ? { className: 'fade-in-left' } : {})}
        >
          <View style={styles.cardHeader}>
            <View style={[styles.headerIconBox, { backgroundColor: currentTheme.surface2 }]}>
              <Ionicons name="mail-outline" size={20} color={currentTheme.primary} />
            </View>
            <View style={styles.headerTextGroup}>
              <Text style={[styles.cardTitle, { color: currentTheme.heading }]}>
                Kirim Pesan
              </Text>
              <Text style={[styles.cardSubtitle, { color: currentTheme.textSecondary }]}>
                Formulir Kontak Langsung ke {recipientName}
              </Text>
            </View>
          </View>

          {/* Form Inputs */}
          <View style={styles.formGroup}>
            <Text style={[styles.inputLabel, { color: currentTheme.textPrimary }]}>
              Nama Lengkap <Text style={{ color: currentTheme.danger }}>*</Text>
            </Text>
            <TextInput
              style={[
                styles.textInput,
                {
                  backgroundColor: currentTheme.input,
                  borderColor: errors.name ? currentTheme.danger : currentTheme.border,
                  color: currentTheme.textPrimary,
                },
              ]}
              placeholder="Contoh: Budi Santoso"
              placeholderTextColor={currentTheme.textMuted}
              value={name}
              onChangeText={(txt) => {
                setName(txt);
                if (errors.name) setErrors({ ...errors, name: undefined });
              }}
            />
            {errors.name && <Text style={[styles.errorText, { color: currentTheme.danger }]}>{errors.name}</Text>}
          </View>

          <View style={styles.formGroup}>
            <Text style={[styles.inputLabel, { color: currentTheme.textPrimary }]}>
              Alamat Email <Text style={{ color: currentTheme.danger }}>*</Text>
            </Text>
            <TextInput
              style={[
                styles.textInput,
                {
                  backgroundColor: currentTheme.input,
                  borderColor: errors.email ? currentTheme.danger : currentTheme.border,
                  color: currentTheme.textPrimary,
                },
              ]}
              placeholder="Contoh: budi@gmail.com"
              placeholderTextColor={currentTheme.textMuted}
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={(txt) => {
                setEmail(txt);
                if (errors.email) setErrors({ ...errors, email: undefined });
              }}
            />
            {errors.email && <Text style={[styles.errorText, { color: currentTheme.danger }]}>{errors.email}</Text>}
          </View>

          <View style={styles.formGroup}>
            <Text style={[styles.inputLabel, { color: currentTheme.textPrimary }]}>
              Pesan Anda <Text style={{ color: currentTheme.danger }}>*</Text>
            </Text>
            <TextInput
              style={[
                styles.textInput,
                styles.textAreaInput,
                {
                  backgroundColor: currentTheme.input,
                  borderColor: errors.message ? currentTheme.danger : currentTheme.border,
                  color: currentTheme.textPrimary,
                },
              ]}
              placeholder="Tuliskan pesan, pertanyaan, atau peluang kolaborasi..."
              placeholderTextColor={currentTheme.textMuted}
              multiline
              numberOfLines={4}
              value={message}
              onChangeText={(txt) => {
                setMessage(txt);
                if (errors.message) setErrors({ ...errors, message: undefined });
              }}
            />
            {errors.message && <Text style={[styles.errorText, { color: currentTheme.danger }]}>{errors.message}</Text>}
          </View>

          <TouchableOpacity
            style={[styles.submitBtn, { backgroundColor: currentTheme.primary }]}
            onPress={handleSubmit}
            activeOpacity={0.82}
            {...(Platform.OS === 'web' ? { className: 'interactive-btn' } : {})}
          >
            <Ionicons name="paper-plane" size={15} color={currentTheme.isDark ? '#25191D' : '#FFFFFF'} />
            <Text style={[styles.submitBtnText, { color: currentTheme.isDark ? '#25191D' : '#FFFFFF' }]}>Kirim Pesan Sekarang</Text>
          </TouchableOpacity>

          {/* Feedback Hasil Submit */}
          {submittedData && (
            <View style={[styles.submittedFeedbackCard, { backgroundColor: currentTheme.surface2, borderColor: currentTheme.success }]}>
              <View style={styles.feedbackTop}>
                <Ionicons name="checkmark-circle" size={18} color={currentTheme.success} />
                <Text style={[styles.feedbackTitle, { color: currentTheme.success }]}>Pesan Berhasil Terkirim!</Text>
                <Text style={[styles.feedbackTime, { color: currentTheme.textMuted }]}>{submittedData.sentAt}</Text>
              </View>
              <Text style={[styles.feedbackBody, { color: currentTheme.textPrimary }]}>
                Dari: <Text style={{ fontWeight: '700' }}>{submittedData.senderName}</Text> ({submittedData.senderEmail})
              </Text>
              <Text style={[styles.feedbackContent, { color: currentTheme.textSecondary }]}>
                "{submittedData.messageContent}"
              </Text>
            </View>
          )}
        </View>

        {/* KOLOM KANAN: KANAL KONTAK & JARINGAN */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: currentTheme.surface,
              borderColor: currentTheme.border,
              flex: 0.9,
            },
          ]}
          {...(Platform.OS === 'web' ? { className: 'fade-in-right' } : {})}
        >
          <View style={styles.cardHeader}>
            <View style={[styles.headerIconBox, { backgroundColor: currentTheme.surface2 }]}>
              <Ionicons name="share-social-outline" size={20} color={currentTheme.primary} />
            </View>
            <View style={styles.headerTextGroup}>
              <Text style={[styles.cardTitle, { color: currentTheme.heading }]}>
                Kanal Kontak
              </Text>
              <Text style={[styles.cardSubtitle, { color: currentTheme.textSecondary }]}>
                Hubungkan Kolaborasi & Diskusi
              </Text>
            </View>
          </View>

          <View style={styles.channelList}>
            {/* WhatsApp */}
            <TouchableOpacity
              style={[styles.channelItem, { backgroundColor: currentTheme.surface2, borderColor: currentTheme.border }]}
              onPress={handleOpenWA}
              activeOpacity={0.7}
              {...(Platform.OS === 'web' ? { className: 'interactive-card' } : {})}
            >
              <View style={[styles.channelIconBox, { backgroundColor: currentTheme.isDark ? 'rgba(128, 198, 155, 0.16)' : 'rgba(57, 123, 87, 0.14)' }]}>
                <Ionicons name="logo-whatsapp" size={20} color={currentTheme.success} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.channelLabel, { color: currentTheme.textSecondary }]}>WhatsApp Aktif</Text>
                <Text style={[styles.channelValue, { color: currentTheme.textPrimary }]}>0895-1233-6537</Text>
              </View>
              <Ionicons name="open-outline" size={16} color={currentTheme.textMuted} />
            </TouchableOpacity>

            {/* Email */}
            <TouchableOpacity
              style={[styles.channelItem, { backgroundColor: currentTheme.surface2, borderColor: currentTheme.border }]}
              onPress={handleOpenEmail}
              activeOpacity={0.7}
              {...(Platform.OS === 'web' ? { className: 'interactive-card' } : {})}
            >
              <View style={[styles.channelIconBox, { backgroundColor: currentTheme.isDark ? 'rgba(193, 123, 136, 0.16)' : 'rgba(132, 63, 75, 0.14)' }]}>
                <Ionicons name="mail" size={20} color={currentTheme.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.channelLabel, { color: currentTheme.textSecondary }]}>Email Resmi</Text>
                <Text style={[styles.channelValue, { color: currentTheme.textPrimary }]}>febrianrahman902@gmail.com</Text>
              </View>
              <Ionicons name="open-outline" size={16} color={currentTheme.textMuted} />
            </TouchableOpacity>

            {/* Instagram */}
            <TouchableOpacity
              style={[styles.channelItem, { backgroundColor: currentTheme.surface2, borderColor: currentTheme.border }]}
              onPress={handleOpenIG}
              activeOpacity={0.7}
              {...(Platform.OS === 'web' ? { className: 'interactive-card' } : {})}
            >
              <View style={[styles.channelIconBox, { backgroundColor: currentTheme.isDark ? 'rgba(240, 139, 145, 0.16)' : 'rgba(168, 63, 70, 0.14)' }]}>
                <Ionicons name="logo-instagram" size={20} color={currentTheme.danger} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.channelLabel, { color: currentTheme.textSecondary }]}>Instagram</Text>
                <Text style={[styles.channelValue, { color: currentTheme.textPrimary }]}>@febrianrhmn_2</Text>
              </View>
              <Ionicons name="open-outline" size={16} color={currentTheme.textMuted} />
            </TouchableOpacity>

            {/* GitHub */}
            <TouchableOpacity
              style={[styles.channelItem, { backgroundColor: currentTheme.surface2, borderColor: currentTheme.border }]}
              onPress={handleOpenGitHub}
              activeOpacity={0.7}
              {...(Platform.OS === 'web' ? { className: 'interactive-card' } : {})}
            >
              <View style={[styles.channelIconBox, { backgroundColor: currentTheme.isDark ? 'rgba(193, 123, 136, 0.16)' : 'rgba(132, 63, 75, 0.14)' }]}>
                <Ionicons name="logo-github" size={20} color={currentTheme.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.channelLabel, { color: currentTheme.textSecondary }]}>Profil GitHub</Text>
                <Text style={[styles.channelValue, { color: currentTheme.textPrimary }]}>pepeb12</Text>
              </View>
              <Ionicons name="open-outline" size={16} color={currentTheme.textMuted} />
            </TouchableOpacity>

            {/* Domisili */}
            <View
              style={[styles.channelItem, { backgroundColor: currentTheme.surface2, borderColor: currentTheme.border }]}
              {...(Platform.OS === 'web' ? { className: 'interactive-card' } : {})}
            >
              <View style={[styles.channelIconBox, { backgroundColor: currentTheme.surfaceHover }]}>
                <Ionicons name="location" size={20} color={currentTheme.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.channelLabel, { color: currentTheme.textSecondary }]}>Domisili Mahasiswa</Text>
                <Text style={[styles.channelValue, { color: currentTheme.textPrimary }]}>Kp Babakan Stasiun, Cicalengka</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  twoColRow: {
    flexDirection: 'row',
    gap: 20,
  },
  twoColRowMobile: {
    flexDirection: 'column',
  },
  card: {
    borderRadius: SPACING.cardRadius,
    borderWidth: 1,
    padding: SPACING.cardPadding,
    gap: 16,
    ...Platform.select({
      web: {
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
      } as any,
      default: {
        elevation: 3,
      },
    }),
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerIconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTextGroup: {
    flex: 1,
  },
  cardTitle: {
    fontFamily: FONTS.display,
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  cardSubtitle: {
    fontFamily: FONTS.mono,
    fontSize: 11,
    fontWeight: '500',
    marginTop: 1,
  },
  formGroup: {
    gap: 6,
  },
  inputLabel: {
    fontFamily: FONTS.bold,
    fontSize: 12.5,
    fontWeight: '700',
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 13.5,
    fontFamily: FONTS.body,
  },
  textAreaInput: {
    minHeight: 88,
    textAlignVertical: 'top',
  },
  errorText: {
    fontFamily: FONTS.mono,
    fontSize: 11,
  },
  submitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    gap: 8,
    marginTop: 4,
    ...Platform.select({
      web: {
        cursor: 'pointer' as any,
        transition: 'transform 0.15s ease' as any,
      },
    }),
  },
  submitBtnText: {
    color: '#030712',
    fontFamily: FONTS.bold,
    fontSize: 13.5,
    fontWeight: '700',
  },
  submittedFeedbackCard: {
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    gap: 6,
    marginTop: 4,
  },
  feedbackTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  feedbackTitle: {
    fontFamily: FONTS.bold,
    fontSize: 12.5,
    fontWeight: '700',
    flex: 1,
  },
  feedbackTime: {
    fontFamily: FONTS.mono,
    fontSize: 11,
  },
  feedbackBody: {
    fontFamily: FONTS.body,
    fontSize: 12,
  },
  feedbackContent: {
    fontFamily: FONTS.body,
    fontSize: 12,
    fontStyle: 'italic',
  },
  channelList: {
    gap: 10,
  },
  channelItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    gap: 12,
    ...Platform.select({
      web: {
        cursor: 'pointer' as any,
        transition: 'transform 0.15s ease' as any,
      },
    }),
  },
  channelIconBox: {
    width: 36,
    height: 36,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  channelLabel: {
    fontFamily: FONTS.mono,
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  channelValue: {
    fontFamily: FONTS.bold,
    fontSize: 12.5,
    fontWeight: '700',
    marginTop: 2,
  },
});
