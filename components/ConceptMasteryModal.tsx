import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SPACING } from '../theme';
import { ThemeColors } from '../types';

interface ConceptMasteryModalProps {
  visible: boolean;
  onClose: () => void;
  theme: ThemeColors | any;
}

const CONCEPTS = [
  {
    id: 'c1',
    topic: 'P1 & P2: Komponen, JSX, & Virtual DOM',
    icon: 'react' as const,
    color: '#0284C7',
    summary: 'Komponen fungsional sebagai unit independen antarmuka dengan sintaks JSX.',
    keyPoints: [
      'JSX mengizinkan penulisan sintaks mirip HTML di dalam JavaScript yang ditransformasi ke React.createElement.',
      'Semua tampilan dibangun dengan komponen bawaan React Native (<View>, <Text>, <Image>, <ScrollView>).',
      'Virtual DOM melakukan reconcilation yang efisien sehingga hanya elemen yang berubah yang dirender ulang.',
    ],
    codeReference: 'components/ProfileHeader.tsx, components/SectionHeading.js',
  },
  {
    id: 'c2',
    topic: 'P3: Aliran Data Props (Unidirectional Flow)',
    icon: 'swap-horizontal-bold' as const,
    color: '#10B981',
    summary: 'Props mengalirkan data satu arah dari parent ke child sebagai parameter murni (read-only).',
    keyPoints: [
      'Menjaga komponen UI bersifat presentasional, dapat digunakan kembali (reusable), dan bebas hardcode.',
      'Contoh nyata: <MyScoreSection data={academicScoreData} theme={theme} /> menerima data akademik murni.',
      'Perubahan data di file JSON otomatis merender ulang seluruh komponen penerima props tanpa mengubah JSX.',
    ],
    codeReference: 'App.tsx -> MyScoreSection.tsx, ProfileCard.tsx',
  },
  {
    id: 'c3',
    topic: 'P4: Layout Flexbox & StyleSheet',
    icon: 'view-dashboard-outline' as const,
    color: '#8B5CF6',
    summary: 'Sistem tata letak deklaratif mobile menggunakan Flexbox murni tanpa layout kaku (absolute).',
    keyPoints: [
      'flexDirection ("row" / "column") mengontrol sumbu utama (main axis).',
      'justifyContent dan alignItems mengatur perataan konten secara responsif di berbagai resolusi layar ponsel.',
      'Progress Bar capaian belajar dibuat murni dengan dua <View> Flexbox: track background & dynamic fill { width: `${percentage}%` }.',
    ],
    codeReference: 'theme/index.js, components/MetricBar.js, components/MyScoreSection.tsx',
  },
  {
    id: 'c4',
    topic: 'P5: State Management & Event Handling',
    icon: 'cursor-pointer' as const,
    color: '#F59E0B',
    summary: 'Pengelolaan data dinamis lokal yang memicu re-render antarmuka saat mengalami perubahan.',
    keyPoints: [
      'Hook useState digunakan untuk menyimpan state formulir kontak (name, email, message, errors, submittedData).',
      'Event listener onChangeText menangkap masukan teks secara real-time dan memvalidasi string kosong/regex.',
      'Event onPress pada TouchableOpacity menangani aksi tombol (endorse counter, switch tema, submit kontak).',
    ],
    codeReference: 'components/ContactFormCard.js, components/InteractiveEndorseBar.js',
  },
  {
    id: 'c5',
    topic: 'P6: Pemisahan Data JSON Lokal (Separation of Concerns)',
    icon: 'code-json' as const,
    color: '#EC4899',
    summary: 'Pemisahan mutlak antara data bisnis (Business Logic/Model) dengan antarmuka presentasional (View).',
    keyPoints: [
      'Data profil disimpan di data/profile.json dan nilai akademik di data/academicScore.json.',
      'Diimpor langsung secara native oleh Metro Bundler: import profileData from "./data/profile.json".',
      'Data dipetakan (mapping) ke elemen UI menggunakan fungsi array .map() tanpa pengulangan kode manual.',
    ],
    codeReference: 'data/profile.json, data/academicScore.json',
  },
  {
    id: 'c6',
    topic: 'P7 & P8: Eksplorasi Fitur Lanjut & My Score Dashboard',
    icon: 'trophy-award' as const,
    color: '#F97316',
    summary: 'Implementasi komponen native tingkat lanjut dan visualisasi pencapaian akademik terpadu.',
    keyPoints: [
      'Komponen native <Modal /> digunakan untuk pop-up detail portofolio dan dialog pengujian.',
      'Dual-Theme Switcher (Dark/Light) mengalirkan token warna terpusat ke seluruh subsistem aplikasi.',
      'Hero Score Card menampilkan Nilai 90 (Grade A), 19.000 LP, dan 4 pilar progres (Attendance, Practice, Quest, Challenge).',
    ],
    codeReference: 'components/PortfolioGallery.js, components/MyScoreSection.tsx',
  },
  {
    id: 'c7',
    topic: 'P10: Standar Industri, Service Layer, Error Boundary, & Testing',
    icon: 'shield-check' as const,
    color: '#0D9488',
    summary: 'Praktik rekayasa perangkat lunak mobile tingkat lanjut mendekati standar industri produksi.',
    keyPoints: [
      'Service Layer (academicService.js) mengabstraksi panggilan data LMS, network latency simulasi, dan error status 503.',
      'ErrorBoundary class component mengisolasi runtime JavaScript crash agar tidak memicu white screen of death.',
      'StorageService menggunakan @react-native-async-storage/async-storage untuk persistensi tema & draft.',
      'Automated Unit Testing Suite (tests/run-tests.js) memverifikasi 10 assertions (100% PASS) via npm test.',
    ],
    codeReference: 'services/academicService.js, services/storageService.js, components/ErrorBoundary.tsx, tests/run-tests.js',
  },
];

export default function ConceptMasteryModal({ visible, onClose, theme }: ConceptMasteryModalProps) {
  const [selectedConcept, setSelectedConcept] = useState('c1');
  const isDark = theme?.isDark || false;

  const activeItem = CONCEPTS.find((c) => c.id === selectedConcept) || CONCEPTS[0];

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
          {/* Header Modal */}
          <View style={[styles.header, { borderBottomColor: theme?.border || '#E2E8F0' }]}>
            <View style={styles.headerLeft}>
              <View style={styles.iconCircle}>
                <MaterialCommunityIcons name="school-outline" size={22} color="#0284C7" />
              </View>
              <View>
                <Text style={[styles.title, { color: theme?.text || '#1E293B' }]}>
                  Penguasaan Konsep React Native
                </Text>
                <Text style={[styles.subtitle, { color: theme?.textMuted || '#94A3B8' }]}>
                  Materi Pertanggungjawaban Sidang UTS (P1 s.d. P10)
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={onClose}
              style={styles.closeBtn}
              accessibilityRole="button"
              accessibilityLabel="Tutup Panduan Konsep"
            >
              <MaterialCommunityIcons
                name="close"
                size={22}
                color={theme?.textSecondary || '#64748B'}
              />
            </TouchableOpacity>
          </View>

          {/* Tab Selector Konsep */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={[styles.tabsScroll, { borderBottomColor: theme?.border || '#E2E8F0' }]}
            contentContainerStyle={styles.tabsContainer}
          >
            {CONCEPTS.map((item) => {
              const isSelected = item.id === selectedConcept;
              return (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.tabItem,
                    isSelected && {
                      backgroundColor: isDark ? '#1E293B' : '#EFF6FF',
                      borderColor: item.color,
                      borderWidth: 1.5,
                    },
                  ]}
                  onPress={() => setSelectedConcept(item.id)}
                  accessibilityRole="tab"
                  accessibilityState={{ selected: isSelected }}
                >
                  <MaterialCommunityIcons
                    name={item.icon}
                    size={16}
                    color={isSelected ? item.color : theme?.textMuted || '#94A3B8'}
                  />
                  <Text
                    style={[
                      styles.tabText,
                      {
                        color: isSelected ? item.color : theme?.textSecondary || '#64748B',
                        fontWeight: isSelected ? '800' : '600',
                      },
                    ]}
                  >
                    {item.topic.split(':')[0]}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Konten Detail Konsep Terpilih */}
          <ScrollView style={styles.body} contentContainerStyle={styles.bodyContent}>
            {/* Banner Topik */}
            <View
              style={[
                styles.topicCard,
                {
                  backgroundColor: isDark ? '#0F172A' : '#F8FAFC',
                  borderColor: isDark ? '#334155' : '#E2E8F0',
                  borderLeftColor: activeItem.color,
                },
              ]}
            >
              <View style={styles.topicHeader}>
                <View style={[styles.topicIconBox, { backgroundColor: `${activeItem.color}15` }]}>
                  <MaterialCommunityIcons name={activeItem.icon} size={24} color={activeItem.color} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.topicTitle, { color: theme?.text || '#1E293B' }]}>
                    {activeItem.topic}
                  </Text>
                  <Text style={[styles.topicSummary, { color: theme?.textSecondary || '#64748B' }]}>
                    {activeItem.summary}
                  </Text>
                </View>
              </View>
            </View>

            {/* Poin-Poin Kunci Konseptual */}
            <Text style={[styles.sectionTitle, { color: theme?.text || '#1E293B' }]}>
              Penjelasan Teoritis & Bukti Implementasi:
            </Text>
            {activeItem.keyPoints.map((point, idx) => (
              <View key={idx} style={styles.pointRow}>
                <MaterialCommunityIcons
                  name="check-circle"
                  size={16}
                  color={activeItem.color}
                  style={{ marginTop: 2 }}
                />
                <Text style={[styles.pointText, { color: theme?.text || '#334155' }]}>
                  {point}
                </Text>
              </View>
            ))}

            {/* File Kode Rujukan */}
            <View
              style={[
                styles.refBox,
                { backgroundColor: isDark ? '#1E293B' : '#F1F5F9', borderColor: isDark ? '#334155' : '#CBD5E1' },
              ]}
            >
              <MaterialCommunityIcons name="file-code-outline" size={16} color={activeItem.color} />
              <View style={{ flex: 1 }}>
                <Text style={[styles.refLabel, { color: theme?.textMuted || '#64748B' }]}>
                  Berkas Kode Implementasi:
                </Text>
                <Text style={[styles.refValue, { color: theme?.text || '#1E293B' }]}>
                  {activeItem.codeReference}
                </Text>
              </View>
            </View>
          </ScrollView>

          {/* Footer Modal */}
          <View style={[styles.footer, { borderTopColor: theme?.border || '#E2E8F0' }]}>
            <TouchableOpacity style={styles.footerBtn} onPress={onClose}>
              <Text style={styles.footerBtnText}>Tutup Panduan Sidang</Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.md,
  },
  modalContent: {
    width: '100%',
    maxWidth: 540,
    maxHeight: '85%',
    borderRadius: 20,
    borderWidth: 1,
    overflow: 'hidden',
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
    fontSize: 15,
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
  tabsScroll: {
    maxHeight: 52,
    borderBottomWidth: 1,
  },
  tabsContainer: {
    paddingHorizontal: SPACING.md,
    alignItems: 'center',
    gap: 8,
  },
  tabItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 20,
    gap: 6,
    backgroundColor: 'transparent',
  },
  tabText: {
    fontSize: 11,
  },
  body: {
    flex: 1,
  },
  bodyContent: {
    padding: SPACING.lg,
    gap: 14,
  },
  topicCard: {
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderLeftWidth: 4,
  },
  topicHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  topicIconBox: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topicTitle: {
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 4,
  },
  topicSummary: {
    fontSize: 11,
    lineHeight: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '800',
    marginTop: 4,
  },
  pointRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  pointText: {
    fontSize: 12,
    lineHeight: 18,
    flex: 1,
  },
  refBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    gap: 10,
    marginTop: 6,
  },
  refLabel: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  refValue: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 1,
  },
  footer: {
    padding: SPACING.md,
    borderTopWidth: 1,
    alignItems: 'center',
  },
  footerBtn: {
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  footerBtnText: {
    color: '#64748B',
    fontWeight: '700',
    fontSize: 13,
  },
});

