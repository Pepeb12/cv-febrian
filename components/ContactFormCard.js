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
 * ContactFormCard Component (Materi P3 & P5: Props, State, Input Form, Event Handling)
 * Menangani:
 * 1. State form input (nama, email, pesan)
 * 2. Event handling (onChangeText, onPress)
 * 3. Validasi input kosong & format email
 * 4. Tampilan respons setelah formulir berhasil diproses
 */
export default function ContactFormCard({ recipientName, onMessageSent }) {
  // State untuk mengelola data input yang berubah (Materi P3 & P5)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // State untuk validasi error
  const [errors, setErrors] = useState({});

  // State untuk status pengiriman dan data yang berhasil dikirim
  const [submittedData, setSubmittedData] = useState(null);

  // Fungsi validasi form
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

  // Event handler saat tombol Kirim Pesan ditekan
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

      // Simpan respons data ke state
      setSubmittedData(payload);

      // Notifikasi popup responsif
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

  // Event handler untuk reset formulir
  const handleReset = () => {
    setName('');
    setEmail('');
    setMessage('');
    setErrors({});
    setSubmittedData(null);
  };

  return (
    <View style={styles.card}>
      <SectionHeading
        title="Kirim Pesan / Kontak"
        subtitle={`Hubungi ${recipientName} untuk Kolaborasi Proyek`}
        icon="paper-plane-outline"
        badgeText="Form Interaktif"
      />

      {submittedData ? (
        // TAMPILAN RESPONS SETELAH FORMULIR BERHASIL DIPROSES (Kriteria Level 4)
        <View style={styles.successContainer}>
          <View style={styles.successBadgeRow}>
            <View style={styles.successIconCircle}>
              <Ionicons name="checkmark-done-circle" size={32} color={COLORS.success} />
            </View>
            <View style={styles.successTitleCol}>
              <Text style={styles.successHeading}>Pesan Berhasil Diproses!</Text>
              <Text style={styles.successTimestamp}>Terkirim pada pukul {submittedData.sentAt} WIB</Text>
            </View>
          </View>

          <View style={styles.summaryBox}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Nama Pengirim:</Text>
              <Text style={styles.summaryValue}>{submittedData.senderName}</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Email:</Text>
              <Text style={styles.summaryValue}>{submittedData.senderEmail}</Text>
            </View>
            <View style={styles.summaryItemMessage}>
              <Text style={styles.summaryLabel}>Isi Pesan:</Text>
              <Text style={styles.summaryMessageText}>"{submittedData.messageContent}"</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.resetButton}
            activeOpacity={0.8}
            onPress={handleReset}
          >
            <Ionicons name="refresh-outline" size={16} color={COLORS.primary} />
            <Text style={styles.resetButtonText}>Kirim Pesan Baru</Text>
          </TouchableOpacity>
        </View>
      ) : (
        // FORMULIR INPUT KONTAK (NAMA, EMAIL, PESAN)
        <View style={styles.formContainer}>
          {/* Input 1: Nama Pengirim */}
          <View style={styles.inputGroup}>
            <View style={styles.labelRow}>
              <Ionicons name="person-outline" size={14} color={COLORS.textSecondary} />
              <Text style={styles.inputLabel}>Nama Lengkap Pengirim <Text style={styles.requiredStar}>*</Text></Text>
            </View>
            <TextInput
              style={[
                styles.textInput,
                errors.name ? styles.inputErrorBorder : null,
              ]}
              placeholder="Contoh: Budi Santoso"
              placeholderTextColor={COLORS.textLight}
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
              <Ionicons name="mail-outline" size={14} color={COLORS.textSecondary} />
              <Text style={styles.inputLabel}>Alamat Email Aktif <Text style={styles.requiredStar}>*</Text></Text>
            </View>
            <TextInput
              style={[
                styles.textInput,
                errors.email ? styles.inputErrorBorder : null,
              ]}
              placeholder="Contoh: budi.santoso@gmail.com"
              placeholderTextColor={COLORS.textLight}
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
              <Ionicons name="chatbox-ellipses-outline" size={14} color={COLORS.textSecondary} />
              <Text style={styles.inputLabel}>Pesan / Keperluan Kolaborasi <Text style={styles.requiredStar}>*</Text></Text>
            </View>
            <TextInput
              style={[
                styles.textInput,
                styles.textAreaInput,
                errors.message ? styles.inputErrorBorder : null,
              ]}
              placeholder="Tuliskan pesan, penawaran proyek, atau feedback Anda di sini..."
              placeholderTextColor={COLORS.textLight}
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
              style={styles.submitButton}
              activeOpacity={0.8}
              onPress={handleSubmit}
            >
              <Ionicons name="send" size={16} color="#FFFFFF" />
              <Text style={styles.submitButtonText}>Kirim Pesan Sekarang</Text>
            </TouchableOpacity>

            {(name || email || message) ? (
              <TouchableOpacity
                style={styles.clearButton}
                activeOpacity={0.7}
                onPress={handleReset}
              >
                <Ionicons name="trash-outline" size={16} color={COLORS.textMuted} />
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
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
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
    color: COLORS.textPrimary,
  },
  requiredStar: {
    color: '#DC2626',
    fontWeight: '800',
  },
  textInput: {
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: SPACING.md,
    paddingVertical: 10,
    fontSize: 13,
    color: COLORS.textPrimary,
  },
  textAreaInput: {
    minHeight: 90,
    paddingTop: 10,
  },
  inputErrorBorder: {
    borderColor: '#EF4444',
    backgroundColor: '#FEF2F2',
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
    backgroundColor: COLORS.primary,
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
    backgroundColor: COLORS.surfaceMuted,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Tampilan Sukses
  successContainer: {
    backgroundColor: COLORS.successLight,
    borderRadius: 12,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.successBorder,
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
    backgroundColor: '#DCFCE7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  successTitleCol: {
    flex: 1,
  },
  successHeading: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.successText,
  },
  successTimestamp: {
    fontSize: 11,
    color: '#166534',
    marginTop: 2,
  },
  summaryBox: {
    backgroundColor: COLORS.surface,
    borderRadius: 10,
    padding: SPACING.md,
    gap: 8,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
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
    borderTopColor: COLORS.borderLight,
  },
  summaryLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textMuted,
  },
  summaryValue: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  summaryMessageText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontStyle: 'italic',
    lineHeight: 18,
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.surface,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.primaryBorder,
    gap: 6,
  },
  resetButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.primary,
  },
});
