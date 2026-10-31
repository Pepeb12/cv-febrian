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
import { Ionicons } from '@expo/vector-icons';
import SectionHeading from './SectionHeading';
import { COLORS, SHADOWS, SPACING } from '../theme';

/**
 * ContactFormCard Component (Level 7: Theme Adaptable Interactive Form)
 */
export default function ContactFormCard({ recipientName, onMessageSent, theme }) {
  const currentTheme = theme || COLORS;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);

  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Nama lengkap pengirim wajib diisi.';
    } else if (name.trim().length < 3) {
      newErrors.name = 'Nama minimal terdiri dari 3 karakter.';
    }

    if (!email.trim()) {
      newErrors.email = 'Alamat email wajib diisi.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        newErrors.email = 'Format alamat email tidak valid (contoh: user@gmail.com).';
      }
    }

    if (!message.trim()) {
      newErrors.message = 'Pesan atau pertanyaan wajib diisi.';
    } else if (message.trim().length < 5) {
      newErrors.message = 'Pesan minimal terdiri dari 5 karakter.';
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

      const alertMsg = `Terima kasih, ${payload.senderName}!\n\nPesan Anda berhasil diproses dan dikirim ke profil ${recipientName}.\n\nRingkasan Pesan:\n"${payload.messageContent}"`;
      if (Platform.OS === 'web') {
        window.alert(alertMsg);
      } else {
        Alert.alert('Pesan Berhasil Terkirim! ✅', alertMsg, [{ text: 'OK', style: 'default' }]);
      }

      if (onMessageSent) {
        onMessageSent(payload);
      }
    } else {
      const errorMsg = 'Mohon periksa kembali formulir. Semua kolom wajib diisi dengan benar.';
      if (Platform.OS === 'web') {
        window.alert(errorMsg);
      } else {
        Alert.alert('Validasi Gagal ⚠️', errorMsg, [{ text: 'Perbaiki', style: 'cancel' }]);
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
          backgroundColor: currentTheme.surface,
          borderColor: currentTheme.borderLight,
        },
      ]}
    >
      <SectionHeading
        title="Kirim Pesan / Kontak"
        subtitle={`Hubungi ${recipientName} untuk Kolaborasi Proyek`}
        icon="paper-plane-outline"
        badgeText="Form Interaktif"
        theme={currentTheme}
      />

      {submittedData ? (
        // TAMPILAN RESPONS SETELAH FORMULIR BERHASIL DIPROSES
        <View
          style={[
            styles.successContainer,
            {
              backgroundColor: currentTheme.successLight,
              borderColor: currentTheme.successBorder,
            },
          ]}
        >
          <View style={styles.successBadgeRow}>
            <View
              style={[
                styles.successIconCircle,
                { backgroundColor: currentTheme.isDark ? '#064E3B' : '#DCFCE7' },
              ]}
            >
              <Ionicons name="checkmark-done-circle" size={32} color={currentTheme.success} />
            </View>
            <View style={styles.successTitleCol}>
              <Text style={[styles.successHeading, { color: currentTheme.successText }]}>
                Pesan Berhasil Diproses!
              </Text>
              <Text style={[styles.successTimestamp, { color: currentTheme.successText }]}>
                Terkirim pada pukul {submittedData.sentAt} WIB
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.summaryBox,
              {
                backgroundColor: currentTheme.surface,
                borderColor: currentTheme.border,
              },
            ]}
          >
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryLabel, { color: currentTheme.textMuted }]}>
                Nama Pengirim:
              </Text>
              <Text style={[styles.summaryValue, { color: currentTheme.textPrimary }]}>
                {submittedData.senderName}
              </Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryLabel, { color: currentTheme.textMuted }]}>
                Email:
              </Text>
              <Text style={[styles.summaryValue, { color: currentTheme.textPrimary }]}>
                {submittedData.senderEmail}
              </Text>
            </View>
            <View
              style={[
                styles.summaryItemMessage,
                { borderTopColor: currentTheme.borderLight },
              ]}
            >
              <Text style={[styles.summaryLabel, { color: currentTheme.textMuted }]}>
                Isi Pesan:
              </Text>
              <Text style={[styles.summaryMessageText, { color: currentTheme.textSecondary }]}>
                "{submittedData.messageContent}"
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={[
              styles.resetButton,
              {
                backgroundColor: currentTheme.surface,
                borderColor: currentTheme.primaryBorder,
              },
            ]}
            activeOpacity={0.8}
            onPress={handleReset}
          >
            <Ionicons name="refresh-outline" size={16} color={currentTheme.primary} />
            <Text style={[styles.resetButtonText, { color: currentTheme.primary }]}>
              Kirim Pesan Baru
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        // FORMULIR INPUT KONTAK
        <View style={styles.formContainer}>
          {/* Input 1: Nama Pengirim */}
          <View style={styles.inputGroup}>
            <View style={styles.labelRow}>
              <Ionicons name="person-outline" size={14} color={currentTheme.textSecondary} />
              <Text style={[styles.inputLabel, { color: currentTheme.textPrimary }]}>
                Nama Lengkap Pengirim <Text style={styles.requiredStar}>*</Text>
              </Text>
            </View>
            <TextInput
              style={[
                styles.textInput,
                {
                  backgroundColor: currentTheme.inputBackground || currentTheme.surfaceMuted,
                  borderColor: currentTheme.border,
                  color: currentTheme.textPrimary,
                },
                errors.name ? styles.inputErrorBorder : null,
              ]}
              placeholder="Contoh: Budi Santoso"
              placeholderTextColor={currentTheme.textLight}
              value={name}
              onChangeText={(text) => {
                setName(text);
                if (errors.name) {
                  setErrors({ ...errors, name: null });
                }
              }}
              autoCapitalize="words"
            />
            {errors.name && (
              <View style={styles.errorRow}>
                <Ionicons name="alert-circle" size={13} color="#DC2626" />
                <Text style={styles.errorText}>{errors.name}</Text>
              </View>
            )}
          </View>

          {/* Input 2: Email Pengirim */}
          <View style={styles.inputGroup}>
            <View style={styles.labelRow}>
              <Ionicons name="mail-outline" size={14} color={currentTheme.textSecondary} />
              <Text style={[styles.inputLabel, { color: currentTheme.textPrimary }]}>
                Alamat Email Aktif <Text style={styles.requiredStar}>*</Text>
              </Text>
            </View>
            <TextInput
              style={[
                styles.textInput,
                {
                  backgroundColor: currentTheme.inputBackground || currentTheme.surfaceMuted,
                  borderColor: currentTheme.border,
                  color: currentTheme.textPrimary,
                },
                errors.email ? styles.inputErrorBorder : null,
              ]}
              placeholder="Contoh: budi.santoso@gmail.com"
              placeholderTextColor={currentTheme.textLight}
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (errors.email) {
                  setErrors({ ...errors, email: null });
                }
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            {errors.email && (
              <View style={styles.errorRow}>
                <Ionicons name="alert-circle" size={13} color="#DC2626" />
                <Text style={styles.errorText}>{errors.email}</Text>
              </View>
            )}
          </View>

          {/* Input 3: Pesan */}
          <View style={styles.inputGroup}>
            <View style={styles.labelRow}>
              <Ionicons name="chatbox-ellipses-outline" size={14} color={currentTheme.textSecondary} />
              <Text style={[styles.inputLabel, { color: currentTheme.textPrimary }]}>
                Pesan / Keperluan Kolaborasi <Text style={styles.requiredStar}>*</Text>
              </Text>
            </View>
            <TextInput
              style={[
                styles.textInput,
                styles.textAreaInput,
                {
                  backgroundColor: currentTheme.inputBackground || currentTheme.surfaceMuted,
                  borderColor: currentTheme.border,
                  color: currentTheme.textPrimary,
                },
                errors.message ? styles.inputErrorBorder : null,
              ]}
              placeholder="Tuliskan pesan, penawaran proyek, atau feedback Anda di sini..."
              placeholderTextColor={currentTheme.textLight}
              value={message}
              onChangeText={(text) => {
                setMessage(text);
                if (errors.message) {
                  setErrors({ ...errors, message: null });
                }
              }}
              multiline={true}
              numberOfLines={4}
              textAlignVertical="top"
            />
            {errors.message && (
              <View style={styles.errorRow}>
                <Ionicons name="alert-circle" size={13} color="#DC2626" />
                <Text style={styles.errorText}>{errors.message}</Text>
              </View>
            )}
          </View>

          {/* Tombol Submit & Reset */}
          <View style={styles.actionRow}>
            <TouchableOpacity
              style={[styles.submitButton, { backgroundColor: currentTheme.primary }]}
              activeOpacity={0.8}
              onPress={handleSubmit}
            >
              <Ionicons name="send" size={16} color="#FFFFFF" />
              <Text style={styles.submitButtonText}>Kirim Pesan Sekarang</Text>
            </TouchableOpacity>

            {(name || email || message) ? (
              <TouchableOpacity
                style={[
                  styles.clearButton,
                  {
                    backgroundColor: currentTheme.surfaceMuted,
                    borderColor: currentTheme.border,
                  },
                ]}
                activeOpacity={0.7}
                onPress={handleReset}
              >
                <Ionicons name="trash-outline" size={16} color={currentTheme.textMuted} />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: SPACING.lg,
    borderWidth: 1,
    marginBottom: SPACING.lg,
    ...SHADOWS.md,
  },
  formContainer: {
    gap: SPACING.md,
    marginTop: SPACING.xs,
  },
  inputGroup: {
    gap: 6,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '700',
  },
  requiredStar: {
    color: '#DC2626',
    fontWeight: '800',
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: SPACING.md,
    paddingVertical: 10,
    fontSize: 13,
  },
  textAreaInput: {
    minHeight: 90,
    paddingTop: 10,
  },
  inputErrorBorder: {
    borderColor: '#EF4444',
  },
  errorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 2,
  },
  errorText: {
    fontSize: 11,
    color: '#DC2626',
    fontWeight: '500',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginTop: SPACING.xs,
  },
  submitButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    gap: 8,
    ...SHADOWS.sm,
  },
  submitButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  clearButton: {
    width: 44,
    height: 44,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Tampilan Sukses
  successContainer: {
    borderRadius: 12,
    padding: SPACING.lg,
    borderWidth: 1,
    marginTop: SPACING.xs,
    gap: SPACING.md,
  },
  successBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  successIconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successTitleCol: {
    flex: 1,
  },
  successHeading: {
    fontSize: 15,
    fontWeight: '800',
  },
  successTimestamp: {
    fontSize: 11,
    marginTop: 2,
  },
  summaryBox: {
    borderRadius: 10,
    padding: SPACING.md,
    gap: 8,
    borderWidth: 1,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryItemMessage: {
    gap: 4,
    paddingTop: 6,
    borderTopWidth: 1,
  },
  summaryLabel: {
    fontSize: 11,
    fontWeight: '600',
  },
  summaryValue: {
    fontSize: 12,
    fontWeight: '700',
  },
  summaryMessageText: {
    fontSize: 12,
    fontStyle: 'italic',
    lineHeight: 18,
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
    fontSize: 12,
    fontWeight: '700',
  },
});
