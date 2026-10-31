import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SectionHeading from './SectionHeading';
import { SHADOWS, SPACING } from '../theme';

/**
 * PortfolioGallery Component (Level 7: Dynamic Content, Search, Filter & Modal Exploration)
 * Menampilkan:
 * 1. Pencarian proyek real-time (Search Query)
 * 2. Filter kategori proyek interaktif
 * 3. Kartu portofolio dinamis dari data JSON
 * 4. Dialog Modal interaktif untuk melihat rincian lengkap proyek
 */
export default function PortfolioGallery({ portfolios, theme }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [activeProject, setActiveProject] = useState(null);

  const categories = [
    { key: 'ALL', label: 'Semua Proyek' },
    { key: 'Mobile App', label: 'Mobile App' },
    { key: 'Web System', label: 'Web System' },
    { key: 'UI/UX Design', label: 'UI/UX Design' },
    { key: 'Database System', label: 'Database' },
  ];

  // Logika filter gabungan antara kategori dan pencarian teks
  const filteredProjects = (portfolios || []).filter((proj) => {
    const matchesCategory =
      selectedCategory === 'ALL' || proj.category === selectedCategory;
    const matchesQuery =
      proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.technologies.some((tech) =>
        tech.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesQuery;
  });

  return (
    <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.borderLight }]}>
      <SectionHeading
        title="Galeri Portofolio Proyek"
        subtitle="Eksplorasi Proyek Nyata & Karya Mahasiswa"
        icon="briefcase"
        badgeText={`${filteredProjects.length} Proyek`}
        theme={theme}
      />

      {/* 1. INPUT PENCARIAN REAL-TIME */}
      <View style={[styles.searchBox, { backgroundColor: theme.inputBackground, borderColor: theme.border }]}>
        <Ionicons name="search-outline" size={16} color={theme.textMuted} />
        <TextInput
          style={[styles.searchInput, { color: theme.textPrimary }]}
          placeholder="Cari proyek (contoh: React, SIMAK, Figma)..."
          placeholderTextColor={theme.textLight}
          value={searchQuery}
          onChangeText={setSearchQuery}
          clearButtonMode="while-editing"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={16} color={theme.textMuted} />
          </TouchableOpacity>
        )}
      </View>

      {/* 2. FILTER KATEGORI PROYEK */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterScroll}
        contentContainerStyle={styles.filterContainer}
      >
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.key;
          return (
            <TouchableOpacity
              key={cat.key}
              style={[
                styles.categoryChip,
                { backgroundColor: theme.surfaceMuted, borderColor: theme.border },
                isActive ? { backgroundColor: theme.primary, borderColor: theme.primary } : null,
              ]}
              activeOpacity={0.7}
              onPress={() => setSelectedCategory(cat.key)}
            >
              <Text
                style={[
                  styles.categoryChipText,
                  { color: theme.textSecondary },
                  isActive ? { color: '#FFFFFF', fontWeight: '700' } : null,
                ]}
              >
                {cat.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* 3. DAFTAR KARTU PORTOFOLIO */}
      {filteredProjects.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="folder-open-outline" size={36} color={theme.textLight} />
          <Text style={[styles.emptyText, { color: theme.textMuted }]}>
            Tidak ada proyek yang sesuai dengan kriteria pencarian "{searchQuery}".
          </Text>
        </View>
      ) : (
        <View style={styles.projectsList}>
          {filteredProjects.map((proj) => (
            <View
              key={proj.id}
              style={[
                styles.projectCard,
                { backgroundColor: theme.surface, borderColor: theme.border, borderLeftColor: proj.accentColor },
              ]}
            >
              <View style={styles.projectTopRow}>
                <View style={[styles.projectIconCircle, { backgroundColor: proj.accentColor + '18' }]}>
                  <Ionicons name={proj.icon} size={20} color={proj.accentColor} />
                </View>
                <View style={styles.projectTitleCol}>
                  <Text style={[styles.projectTitle, { color: theme.textPrimary }]}>{proj.title}</Text>
                  <Text style={[styles.projectMeta, { color: theme.textMuted }]}>
                    {proj.category} • {proj.year} • {proj.role}
                  </Text>
                </View>
              </View>

              <Text style={[styles.projectDesc, { color: theme.textSecondary }]}>{proj.shortDesc}</Text>

              {/* Chips Tech Stack */}
              <View style={styles.techChipsRow}>
                {proj.technologies.map((tech, idx) => (
                  <View
                    key={idx}
                    style={[styles.techChip, { backgroundColor: theme.surfaceMuted, borderColor: theme.border }]}
                  >
                    <Text style={[styles.techChipText, { color: theme.textSecondary }]}>{tech}</Text>
                  </View>
                ))}
              </View>

              {/* Tombol Lihat Detail Interaktif */}
              <TouchableOpacity
                style={[styles.detailButton, { backgroundColor: theme.primaryLight, borderColor: theme.primaryBorder }]}
                activeOpacity={0.8}
                onPress={() => setActiveProject(proj)}
              >
                <Ionicons name="eye-outline" size={14} color={theme.primary} />
                <Text style={[styles.detailButtonText, { color: theme.primary }]}>
                  Lihat Detail & Fitur Proyek
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}

      {/* 4. MODAL POPUP RINCIAN LENGKAP PROYEK (React Native Modal Exploration) */}
      <Modal
        visible={activeProject !== null}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setActiveProject(null)}
      >
        <View style={styles.modalBackdrop}>
          <View style={[styles.modalCard, { backgroundColor: theme.surface, borderColor: theme.border }]}>
            {activeProject && (
              <ScrollView showsVerticalScrollIndicator={false}>
                {/* Modal Header */}
                <View style={styles.modalHeader}>
                  <View style={[styles.modalIconBox, { backgroundColor: activeProject.accentColor + '20' }]}>
                    <Ionicons name={activeProject.icon} size={24} color={activeProject.accentColor} />
                  </View>
                  <View style={styles.modalTitleCol}>
                    <Text style={[styles.modalTitle, { color: theme.textPrimary }]}>{activeProject.title}</Text>
                    <Text style={[styles.modalCategory, { color: theme.textMuted }]}>
                      {activeProject.category} ({activeProject.year})
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={[styles.modalCloseIcon, { backgroundColor: theme.surfaceMuted }]}
                    onPress={() => setActiveProject(null)}
                  >
                    <Ionicons name="close" size={18} color={theme.textPrimary} />
                  </TouchableOpacity>
                </View>

                {/* Deskripsi Lengkap */}
                <Text style={[styles.modalSectionLabel, { color: theme.textPrimary }]}>Deskripsi Proyek:</Text>
                <Text style={[styles.modalDescText, { color: theme.textSecondary }]}>{activeProject.fullDesc}</Text>

                {/* Fitur Utama */}
                <Text style={[styles.modalSectionLabel, { color: theme.textPrimary }]}>Fitur-Fitur Utama:</Text>
                <View style={styles.modalFeaturesList}>
                  {activeProject.features.map((feat, fIdx) => (
                    <View key={fIdx} style={styles.featureItem}>
                      <Ionicons name="checkmark-circle" size={16} color={theme.success} />
                      <Text style={[styles.featureText, { color: theme.textSecondary }]}>{feat}</Text>
                    </View>
                  ))}
                </View>

                {/* Teknologi yang Digunakan */}
                <Text style={[styles.modalSectionLabel, { color: theme.textPrimary }]}>Teknologi & Tools:</Text>
                <View style={styles.techChipsRow}>
                  {activeProject.technologies.map((t, tIdx) => (
                    <View
                      key={tIdx}
                      style={[styles.techChip, { backgroundColor: theme.surfaceMuted, borderColor: theme.border }]}
                    >
                      <Text style={[styles.techChipText, { color: theme.textSecondary }]}>{t}</Text>
                    </View>
                  ))}
                </View>

                {/* Tombol Tutup Modal */}
                <TouchableOpacity
                  style={[styles.modalCloseButton, { backgroundColor: theme.primary }]}
                  activeOpacity={0.8}
                  onPress={() => setActiveProject(null)}
                >
                  <Text style={styles.modalCloseButtonText}>Tutup Rincian</Text>
                </TouchableOpacity>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
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
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
    marginTop: 4,
    marginBottom: SPACING.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: 12,
    padding: 0,
  },
  filterScroll: {
    marginBottom: SPACING.md,
  },
  filterContainer: {
    gap: 6,
    paddingVertical: 2,
  },
  categoryChip: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
  },
  categoryChipText: {
    fontSize: 11,
    fontWeight: '600',
  },
  projectsList: {
    gap: SPACING.md,
  },
  projectCard: {
    borderRadius: 12,
    padding: SPACING.md,
    borderWidth: 1,
    borderLeftWidth: 4,
  },
  projectTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 6,
  },
  projectIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  projectTitleCol: {
    flex: 1,
  },
  projectTitle: {
    fontSize: 14,
    fontWeight: '800',
  },
  projectMeta: {
    fontSize: 11,
    fontWeight: '500',
    marginTop: 1,
  },
  projectDesc: {
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 8,
  },
  techChipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 10,
  },
  techChip: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
  },
  techChipText: {
    fontSize: 10,
    fontWeight: '600',
  },
  detailButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    gap: 6,
  },
  detailButtonText: {
    fontSize: 11,
    fontWeight: '700',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 24,
    gap: 8,
  },
  emptyText: {
    fontSize: 12,
    textAlign: 'center',
  },
  // Modal Styling
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  modalCard: {
    width: '100%',
    maxWidth: 460,
    maxHeight: '85%',
    borderRadius: 16,
    padding: SPACING.lg,
    borderWidth: 1,
    ...SHADOWS.lg,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: SPACING.md,
    paddingBottom: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  modalIconBox: {
    width: 44,
    height: 44,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitleCol: {
    flex: 1,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '800',
  },
  modalCategory: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
  },
  modalCloseIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalSectionLabel: {
    fontSize: 13,
    fontWeight: '800',
    marginTop: SPACING.sm,
    marginBottom: 4,
  },
  modalDescText: {
    fontSize: 12,
    lineHeight: 19,
    marginBottom: SPACING.sm,
  },
  modalFeaturesList: {
    gap: 6,
    marginBottom: SPACING.sm,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  featureText: {
    fontSize: 12,
    flex: 1,
  },
  modalCloseButton: {
    marginTop: SPACING.lg,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalCloseButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
});

