import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import SectionHeading from './SectionHeading';
import { Theme, SPACING, SHADOWS } from '../theme';

interface ProjectItem {
  id: string | number;
  title: string;
  category: string;
  year: string;
  role: string;
  shortDesc: string;
  fullDesc: string;
  technologies: string[];
  features: string[];
  icon?: any;
  accentColor?: string;
}

interface PortfolioGalleryProps {
  portfolios?: ProjectItem[];
  theme: Theme;
}

/**
 * PortfolioGallery Component (Level 7: Dynamic Content, Search, Filter & Modal Exploration)
 * Clean project showcase with live search, category filtering, and modal inspection.
 */
export default function PortfolioGallery({ portfolios = [], theme }: PortfolioGalleryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  const categories = [
    { key: 'ALL', label: 'Semua Proyek' },
    { key: 'Mobile App', label: 'Mobile App' },
    { key: 'Web System', label: 'Web System' },
    { key: 'UI/UX Design', label: 'UI/UX Design' },
    { key: 'Database System', label: 'Database' },
  ];

  // Search & Category Filtering
  const filteredProjects = portfolios.filter((proj) => {
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
        title="Galeri Portofolio Proyek"
        subtitle="Eksplorasi Proyek Nyata & Karya Rekayasa Perangkat Lunak"
        icon="briefcase-check-outline"
        badgeText={`${filteredProjects.length} Proyek`}
        theme={theme}
      />

      {/* 1. Live Search Input */}
      <View
        style={[
          styles.searchBox,
          {
            backgroundColor: theme.surfaceMuted,
            borderColor: theme.border,
          },
        ]}
      >
        <MaterialCommunityIcons name="magnify" size={18} color={theme.textMuted} />
        <TextInput
          style={[styles.searchInput, { color: theme.textPrimary }]}
          placeholder="Cari proyek (React Native, SIMAK, Figma)..."
          placeholderTextColor={theme.textLight}
          value={searchQuery}
          onChangeText={setSearchQuery}
          clearButtonMode="while-editing"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <MaterialCommunityIcons name="close-circle" size={16} color={theme.textMuted} />
          </TouchableOpacity>
        )}
      </View>

      {/* 2. Category Filter Chips */}
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
                {
                  backgroundColor: isActive ? theme.primary : theme.surfaceMuted,
                  borderColor: isActive ? theme.primary : theme.border,
                },
              ]}
              activeOpacity={0.7}
              onPress={() => setSelectedCategory(cat.key)}
              accessibilityRole="button"
              accessibilityLabel={`Filter ${cat.label}`}
            >
              <Text
                style={[
                  styles.categoryChipText,
                  { color: isActive ? '#FFFFFF' : theme.textSecondary },
                  isActive && { fontWeight: '700' },
                ]}
              >
                {cat.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* 3. Project Cards Grid / List */}
      {filteredProjects.length === 0 ? (
        <View style={styles.emptyContainer}>
          <MaterialCommunityIcons name="folder-search-outline" size={36} color={theme.textLight} />
          <Text style={[styles.emptyText, { color: theme.textMuted }]}>
            Tidak ada proyek yang sesuai dengan kriteria "{searchQuery}".
          </Text>
        </View>
      ) : (
        <View style={styles.projectsList}>
          {filteredProjects.map((proj) => (
            <View
              key={proj.id}
              style={[
                styles.projectCard,
                {
                  backgroundColor: theme.surfaceMuted,
                  borderColor: theme.borderLight,
                },
              ]}
            >
              <View style={styles.projectTopRow}>
                <View
                  style={[
                    styles.projectIconCircle,
                    {
                      backgroundColor: theme.surface,
                      borderColor: theme.border,
                    },
                  ]}
                >
                  <MaterialCommunityIcons
                    name={proj.icon || 'laptop'}
                    size={20}
                    color={proj.accentColor || theme.primary}
                  />
                </View>
                <View style={styles.projectTitleCol}>
                  <Text style={[styles.projectTitle, { color: theme.textPrimary }]}>
                    {proj.title}
                  </Text>
                  <Text style={[styles.projectMeta, { color: theme.textMuted }]}>
                    {proj.category} • {proj.year} • {proj.role}
                  </Text>
                </View>
              </View>

              <Text style={[styles.projectDesc, { color: theme.textSecondary }]}>
                {proj.shortDesc}
              </Text>

              {/* Tech Stack Chips */}
              <View style={styles.techChipsRow}>
                {proj.technologies.map((tech, idx) => (
                  <View
                    key={idx}
                    style={[
                      styles.techChip,
                      {
                        backgroundColor: theme.surface,
                        borderColor: theme.border,
                      },
                    ]}
                  >
                    <Text style={[styles.techChipText, { color: theme.textSecondary }]}>
                      {tech}
                    </Text>
                  </View>
                ))}
              </View>

              {/* View Details CTA */}
              <TouchableOpacity
                style={[
                  styles.detailButton,
                  {
                    backgroundColor: theme.surface,
                    borderColor: theme.border,
                  },
                ]}
                activeOpacity={0.8}
                onPress={() => setActiveProject(proj)}
                accessibilityRole="button"
                accessibilityLabel={`Lihat detail ${proj.title}`}
              >
                <MaterialCommunityIcons name="eye-outline" size={14} color={theme.primary} />
                <Text style={[styles.detailButtonText, { color: theme.primary }]}>
                  Lihat Detail & Fitur Proyek
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}

      {/* 4. Modal Detail Proyek */}
      <Modal
        visible={activeProject !== null}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setActiveProject(null)}
      >
        <View style={styles.modalBackdrop}>
          <View
            style={[
              styles.modalCard,
              {
                backgroundColor: theme.surface,
                borderColor: theme.border,
              },
            ]}
          >
            {activeProject && (
              <ScrollView showsVerticalScrollIndicator={false}>
                {/* Modal Header */}
                <View style={styles.modalHeader}>
                  <View
                    style={[
                      styles.modalIconBox,
                      {
                        backgroundColor: theme.surfaceMuted,
                        borderColor: theme.border,
                      },
                    ]}
                  >
                    <MaterialCommunityIcons
                      name={activeProject.icon || 'laptop'}
                      size={24}
                      color={activeProject.accentColor || theme.primary}
                    />
                  </View>
                  <View style={styles.modalTitleCol}>
                    <Text style={[styles.modalTitle, { color: theme.textPrimary }]}>
                      {activeProject.title}
                    </Text>
                    <Text style={[styles.modalCategory, { color: theme.textMuted }]}>
                      {activeProject.category} • {activeProject.year}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={[styles.modalCloseIcon, { backgroundColor: theme.surfaceMuted }]}
                    onPress={() => setActiveProject(null)}
                    accessibilityRole="button"
                    accessibilityLabel="Tutup dialog"
                  >
                    <MaterialCommunityIcons name="close" size={18} color={theme.textPrimary} />
                  </TouchableOpacity>
                </View>

                {/* Deskripsi Lengkap */}
                <Text style={[styles.modalSectionLabel, { color: theme.textPrimary }]}>
                  Deskripsi Proyek:
                </Text>
                <Text style={[styles.modalDescText, { color: theme.textSecondary }]}>
                  {activeProject.fullDesc}
                </Text>

                {/* Fitur Utama */}
                <Text style={[styles.modalSectionLabel, { color: theme.textPrimary }]}>
                  Fitur-Fitur Utama:
                </Text>
                <View style={styles.modalFeaturesList}>
                  {activeProject.features.map((feat, fIdx) => (
                    <View key={fIdx} style={styles.featureItem}>
                      <MaterialCommunityIcons
                        name="check-circle-outline"
                        size={16}
                        color={theme.secondary}
                      />
                      <Text style={[styles.featureText, { color: theme.textSecondary }]}>
                        {feat}
                      </Text>
                    </View>
                  ))}
                </View>

                {/* Teknologi & Tools */}
                <Text style={[styles.modalSectionLabel, { color: theme.textPrimary }]}>
                  Teknologi yang Digunakan:
                </Text>
                <View style={styles.techChipsRow}>
                  {activeProject.technologies.map((t, tIdx) => (
                    <View
                      key={tIdx}
                      style={[
                        styles.techChip,
                        {
                          backgroundColor: theme.surfaceMuted,
                          borderColor: theme.border,
                        },
                      ]}
                    >
                      <Text style={[styles.techChipText, { color: theme.textSecondary }]}>
                        {t}
                      </Text>
                    </View>
                  ))}
                </View>

                {/* Tombol Tutup */}
                <TouchableOpacity
                  style={[styles.modalCloseButton, { backgroundColor: theme.primary }]}
                  activeOpacity={0.8}
                  onPress={() => setActiveProject(null)}
                  accessibilityRole="button"
                  accessibilityLabel="Tutup rincian proyek"
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
    borderRadius: 14,
    padding: SPACING.lg,
    borderWidth: 1,
    marginBottom: SPACING.lg,
    ...SHADOWS.sm,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    height: 40,
    gap: 8,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 12,
    paddingVertical: 0,
  },
  filterScroll: {
    marginBottom: SPACING.md,
  },
  filterContainer: {
    gap: 8,
    flexDirection: 'row',
  },
  categoryChip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  categoryChipText: {
    fontSize: 11,
    fontWeight: '600',
  },
  emptyContainer: {
    padding: SPACING.xl,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  emptyText: {
    fontSize: 12,
    textAlign: 'center',
  },
  projectsList: {
    gap: 12,
  },
  projectCard: {
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
  },
  projectTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  projectIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  projectTitleCol: {
    flex: 1,
  },
  projectTitle: {
    fontSize: 13.5,
    fontWeight: '700',
  },
  projectMeta: {
    fontSize: 11,
    marginTop: 2,
  },
  projectDesc: {
    fontSize: 11.5,
    lineHeight: 17,
    marginBottom: 10,
  },
  techChipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 10,
  },
  techChip: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    borderWidth: 1,
  },
  techChipText: {
    fontSize: 10.5,
    fontWeight: '500',
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
    fontSize: 11.5,
    fontWeight: '700',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalCard: {
    width: '100%',
    maxWidth: 540,
    maxHeight: '85%',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    ...SHADOWS.lg,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(150, 150, 150, 0.2)',
  },
  modalIconBox: {
    width: 44,
    height: 44,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitleCol: {
    flex: 1,
  },
  modalTitle: {
    fontSize: 15,
    fontWeight: '800',
  },
  modalCategory: {
    fontSize: 11,
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
    fontSize: 12,
    fontWeight: '700',
    marginTop: 12,
    marginBottom: 6,
  },
  modalDescText: {
    fontSize: 12,
    lineHeight: 18,
  },
  modalFeaturesList: {
    gap: 6,
    marginBottom: 8,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  featureText: {
    fontSize: 11.5,
    flex: 1,
    lineHeight: 17,
  },
  modalCloseButton: {
    marginTop: 20,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalCloseButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
});

