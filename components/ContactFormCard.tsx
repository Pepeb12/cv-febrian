import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SectionHeading from './SectionHeading';
import { Theme, FONTS } from '../theme';

interface ContactFormCardProps {
  recipientName?: string;
  onMessageSent?: (payload: any) => void;
  theme: Theme;
}

export default function ContactFormCard({
  recipientName = 'Febrian',
  onMessageSent,
  theme,
}: ContactFormCardProps) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

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

  const isDark = theme.isDark;

  const validateForm = () => {
    const newErrors: { name?: string; email?: string; message?: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Nama lengkap pengirim wajib diisi.';
    } else if (name.trim().length < 3) {
      newErrors.name = 'Nama minimal 3 karakter.';
    }

    if (!email.trim()) {
      newErrors.email = 'Alamat email wajib diisi.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        newErrors.email = 'Format email tidak valid (contoh: user@gmail.com).';
      }
    }

    if (!message.trim()) {
      newErrors.message = 'Pesan atau pertanyaan wajib diisi.';
    } else if (message.trim().length < 5) {
      newErrors.message = 'Pesan minimal 5 karakter.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const payload = {
        senderName: name.trim(),
        senderEmail: email.trim(),
        messageContent: message.trim(),
        sentAt: new Date().toLocaleTimeString('id-ID', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
      };

      setSubmittedData(payload);

      const alertMsg = `Terima kasih, ${payload.senderName}!\n\nPesan Anda berhasil diproses dan dikirim ke ${recipientName}.\n\nIsi Pesan:\n"${payload.messageContent}"`;
      if (Platform.OS === 'web') {
        window.alert(alertMsg);
      } else {
        Alert.alert('Pesan Berhasil Terkirim', alertMsg, [{ text: 'OK', style: 'default' }]);
      }

      if (onMessageSent) {
        onMessageSent(payload);
      }
    } else {
      const errorMsg = 'Mohon periksa kolom formulir. Semua kolom wajib diisi dengan format yang benar.';
      if (Platform.OS === 'web') {
        window.alert(errorMsg);
      } else {
        Alert.alert('Validasi Gagal', errorMsg, [{ text: 'Perbaiki', style: 'cancel' }]);
      }
    }
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setMessage('');
    setErrors({});
    setSubmittedData(null);
  };

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.surface,
          borderColor: theme.border,
        },
      ]}
    >
      <SectionHeading
        title="Kirim Pesan / Kontak"
        subtitle={`Hubungi ${recipientName} untuk Kolaborasi & Pertanyaan`}
        icon="send-outline"
        badgeText="Interaktif"
        theme={theme}
      />

      {submittedData ? (
        // State Setelah Formulir Berhasil Dikirim
        <View
          style={[
            styles.successContainer,
            {
              backgroundColor: isDark ? 'rgba(22, 27, 51, 0.7)' : 'rgba(241, 245, 249, 0.85)',
              borderColor: theme.primary,
            },
          ]}
        >
          <View style={styles.successHeader}>
            <Ionicons name="checkmark-circle" size={24} color="#22C55E" />
            <View style={styles.successHeaderText}>
              <Text style={[styles.successTitle, { color: theme.textPrimary }]}>
                Pesan Berhasil Diterima
              </Text>
              <Text style={[styles.successSubtitle, { color: theme.textMuted }]}>
                Terkirim pukul {submittedData.sentAt} WIB
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.summaryBox,
              {
                backgroundColor: theme.surface,
                borderColor: theme.border,
              },
            ]}
          >
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryLabel, { color: theme.textMuted }]}>Pengirim:</Text>
              <Text style={[styles.summaryVal, { color: theme.textPrimary }]}>
                {submittedData.senderName} ({submittedData.senderEmail})
              </Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryLabel, { color: theme.textMuted }]}>Pesan:</Text>
              <Text style={[styles.summaryVal, { color: theme.textSecondary }]}>
                "{submittedData.messageContent}"
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={[
              styles.resetButton,
              {
                backgroundColor: theme.surfaceMuted,
                borderColor: theme.border,
              },
            ]}
            activeOpacity={0.8}
            onPress={handleReset}
            accessibilityRole="button"
            accessibilityLabel="Kirim pesan baru"
          >
            <Ionicons name="refresh" size={15} color={theme.primary} />
            <Text style={[styles.resetButtonText, { color: theme.primary }]}>
              Kirim Pesan Baru
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        // Input Form
        <View style={styles.formContainer}>
          {/* BARIS ATAS: INPUT NAMA & INPUT EMAIL BERDAMPINGAN 2 KOLOM */}
          <View style={[styles.topRowTwoCols, isMobile && styles.topRowTwoColsMobile]}>
            {/* Input Nama */}
            <View style={[styles.inputGroupCol, isMobile ? styles.fullWidth : styles.halfWidth]}>
              <Text style={[styles.inputLabel, { color: theme.textPrimary }]}>
                Nama Lengkap Pengirim <Text style={{ color: theme.error }}>*</Text>
              </Text>
              <TextInput
                style={[
                  styles.textInput,
                  {
                    backgroundColor: isDark ? 'rgba(15, 19, 40, 0.85)' : 'rgba(248, 250, 252, 0.85)',
                    borderColor: errors.name ? theme.error : theme.border,
                    color: theme.textPrimary,
                  },
                ]}
                placeholder="Masukkan nama lengkap Anda..."
                placeholderTextColor={theme.textLight}
                value={name}
                onChangeText={(text) => {
                  setName(text);
                  if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                }}
              />
              {errors.name && (
                <Text style={[styles.errorHelper, { color: theme.error }]}>{errors.name}</Text>
              )}
            </View>

            {/* Input Email */}
            <View style={[styles.inputGroupCol, isMobile ? styles.fullWidth : styles.halfWidth]}>
              <Text style={[styles.inputLabel, { color: theme.textPrimary }]}>
                Alamat Email <Text style={{ color: theme.error }}>*</Text>
              </Text>
              <TextInput
                style={[
                  styles.textInput,
                  {
                    backgroundColor: isDark ? 'rgba(15, 19, 40, 0.85)' : 'rgba(248, 250, 252, 0.85)',
                    borderColor: errors.email ? theme.error : theme.border,
                    color: theme.textPrimary,
                  },
                ]}
                placeholder="nama@email.com..."
                placeholderTextColor={theme.textLight}
                value={email}
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={(text) => {
                  setEmail(text);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                }}
              />
              {errors.email && (
                <Text style={[styles.errorHelper, { color: theme.error }]}>{errors.email}</Text>
              )}
            </View>
          </View>

          {/* BARIS BAWAH: INPUT PESAN (TEXTAREA) */}
          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, { color: theme.textPrimary }]}>
              Pesan / Pertanyaan <Text style={{ color: theme.error }}>*</Text>
            </Text>
            <TextInput
              style={[
                styles.textArea,
                {
                  backgroundColor: isDark ? 'rgba(15, 19, 40, 0.85)' : 'rgba(248, 250, 252, 0.85)',
                  borderColor: errors.message ? theme.error : theme.border,
                  color: theme.textPrimary,
                },
              ]}
              placeholder="Tulis pesan atau pertanyaan di sini..."
              placeholderTextColor={theme.textLight}
              value={message}
              multiline={true}
              numberOfLines={4}
              maxLength={500}
              textAlignVertical="top"
              onChangeText={(text) => {
                setMessage(text);
                if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
              }}
            />
            {errors.message && (
              <Text style={[styles.errorHelper, { color: theme.error }]}>{errors.message}</Text>
            )}
          </View>

          {/* BARIS FOOTER FORM: PENGHITUNG KARAKTER DI KIRI & TOMBOL KIRIM KAPSUL INDIGO DI KANAN */}
          <View style={styles.formFooterRow}>
            <Text style={[styles.charCounter, { color: theme.textMuted }]}>
              {message.length}/500
            </Text>

            <TouchableOpacity
              style={[styles.submitCapsuleBtn, { backgroundColor: theme.primaryButton }]}
              activeOpacity={0.8}
              onPress={handleSubmit}
              accessibilityRole="button"
              accessibilityLabel="Kirim Pesan"
            >
              <Text style={styles.submitBtnText}>
                Kirim Pesan
              </Text>
              <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      )}
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
  formContainer: {
    gap: 16,
    marginTop: 8,
  },
  topRowTwoCols: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
    width: '100%',
  },
  topRowTwoColsMobile: {
    flexDirection: 'column',
    gap: 14,
  },
  inputGroupCol: {
    gap: 6,
  },
  halfWidth: {
    flex: 1,
  },
  fullWidth: {
    width: '100%',
  },
  inputGroup: {
    gap: 6,
    width: '100%',
  },
  inputLabel: {
    fontFamily: FONTS.semiBold,
    fontSize: 12.5,
    fontWeight: '600',
  },
  textInput: {
    height: 44,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    fontFamily: FONTS.regular,
    fontSize: 13,
  },
  textArea: {
    minHeight: 110,
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontFamily: FONTS.regular,
    fontSize: 13,
  },
  errorHelper: {
    fontFamily: FONTS.regular,
    fontSize: 11,
    marginTop: 2,
  },
  formFooterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  charCounter: {
    fontFamily: FONTS.medium,
    fontSize: 12,
  },
  submitCapsuleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 999,
    gap: 8,
    ...Platform.select({
      web: {
        cursor: 'pointer' as any,
        transition: 'transform 0.15s ease' as any,
        boxShadow: '0 4px 14px rgba(79, 70, 229, 0.3)',
      } as any,
    }),
  },
  submitBtnText: {
    fontFamily: FONTS.bold,
    fontSize: 13.5,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  // Success state
  successContainer: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    gap: 14,
  },
  successHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  successHeaderText: {
    gap: 2,
  },
  successTitle: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    fontWeight: '700',
  },
  successSubtitle: {
    fontFamily: FONTS.regular,
    fontSize: 12,
  },
  summaryBox: {
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
  },
  summaryItem: {
    gap: 2,
  },
  summaryLabel: {
    fontFamily: FONTS.semiBold,
    fontSize: 11,
  },
  summaryVal: {
    fontFamily: FONTS.regular,
    fontSize: 13,
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    gap: 6,
  },
  resetButtonText: {
    fontFamily: FONTS.semiBold,
    fontSize: 13,
  },
});
