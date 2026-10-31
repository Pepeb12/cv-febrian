import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import SectionHeading from './SectionHeading';
import { Theme, SPACING, SHADOWS } from '../theme';

interface ContactFormCardProps {
  recipientName?: string;
  onMessageSent?: (payload: any) => void;
  theme: Theme;
}

/**
 * ContactFormCard Component (Level 4, Level 5, Level 10: Interactive Contact Form)
 * Clean, accessible contact form with rigorous validation, state management, and clear user feedback.
 */
export default function ContactFormCard({
  recipientName = 'Febrian',
  onMessageSent,
  theme,
}: ContactFormCardProps) {
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
              backgroundColor: theme.surfaceMuted,
              borderColor: theme.secondary,
            },
          ]}
        >
          <View style={styles.successHeader}>
            <MaterialCommunityIcons name="check-circle" size={28} color={theme.secondary} />
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
                backgroundColor: theme.surface,
                borderColor: theme.border,
              },
            ]}
            activeOpacity={0.8}
            onPress={handleReset}
            accessibilityRole="button"
            accessibilityLabel="Kirim pesan baru"
          >
            <MaterialCommunityIcons name="refresh" size={16} color={theme.primary} />
            <Text style={[styles.resetButtonText, { color: theme.primary }]}>
              Kirim Pesan Baru
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        // Input Form
        <View style={styles.formContainer}>
          {/* Input Nama */}
          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, { color: theme.textPrimary }]}>
              Nama Lengkap Pengirim <Text style={{ color: theme.error }}>*</Text>
            </Text>
            <TextInput
              style={[
                styles.textInput,
                {
                  backgroundColor: theme.surfaceMuted,
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
          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, { color: theme.textPrimary }]}>
              Alamat Email <Text style={{ color: theme.error }}>*</Text>
            </Text>
            <TextInput
              style={[
                styles.textInput,
                {
                  backgroundColor: theme.surfaceMuted,
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

          {/* Input Pesan */}
          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, { color: theme.textPrimary }]}>
              Pesan / Pertanyaan <Text style={{ color: theme.error }}>*</Text>
            </Text>
            <TextInput
              style={[
                styles.textArea,
                {
                  backgroundColor: theme.surfaceMuted,
                  borderColor: errors.message ? theme.error : theme.border,
                  color: theme.textPrimary,
                },
              ]}
              placeholder="Tulis pesan atau tawaran kolaborasi Anda di sini..."
              placeholderTextColor={theme.textLight}
              value={message}
              multiline={true}
              numberOfLines={4}
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

          {/* Submit Button */}
          <TouchableOpacity
            style={[styles.submitButton, { backgroundColor: theme.primary }]}
            activeOpacity={0.8}
            onPress={handleSubmit}
            accessibilityRole="button"
            accessibilityLabel="Kirim Pesan"
          >
            <MaterialCommunityIcons name="send" size={16} color="#FFFFFF" />
            <Text style={styles.submitButtonText}>Kirim Pesan Sekarang</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 14,
    padding: SPACING.lg,
    borderWidth: 1,
    marginBottom: SPACING.lg,
    ...SHADOWS.sm,
  },
  formContainer: {
    gap: 12,
  },
  inputGroup: {
    gap: 5,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  textInput: {
    height: 42,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 12,
  },
  textArea: {
    minHeight: 80,
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 12,
  },
  errorHelper: {
    fontSize: 11,
    marginTop: 2,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
    borderRadius: 10,
    gap: 8,
    marginTop: 6,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  successContainer: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 12,
  },
  successHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  successHeaderText: {
    flex: 1,
  },
  successTitle: {
    fontSize: 13,
    fontWeight: '700',
  },
  successSubtitle: {
    fontSize: 11,
    marginTop: 2,
  },
  summaryBox: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    gap: 8,
  },
  summaryItem: {
    gap: 2,
  },
  summaryLabel: {
    fontSize: 10.5,
    fontWeight: '600',
  },
  summaryVal: {
    fontSize: 11.5,
    lineHeight: 16,
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    gap: 6,
  },
  resetButtonText: {
    fontSize: 12,
    fontWeight: '700',
  },
});

