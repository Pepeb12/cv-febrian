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
import { Theme, SPACING, SHADOWS, FONTS } from '../theme';

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
 * Styled with Emerald – Cream – White – Mint luxury palette & Lato fonts.
 */
export default function PortfolioGallery({ portfolios = [], theme }: PortfolioGalleryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const isDark = theme.isDark;

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
        icon="briefcase-outline"
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
        <MaterialCommunityIcons name="magnify" size={17} color={theme.textMuted} />
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
            <MaterialCommunityIcons name="close-circle" size={15} color={theme.textMuted} />
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
                  backgroundColor: isActive
                    ? isDark
                      ? '#064E3B'
                      : '#065F46'
                    : theme.surfaceMuted,
                  borderColor: isActive ? '#A7F3D0' : theme.border,
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

      {/* 3. Project Cards Grid */}
      {filteredProjects.length === 0 ? (
        <View style={styles.emptyContainer}>
          <MaterialCommunityIcons name="folder-search-outline" size={32} color={theme.textLight} />
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
                    size={18}
                    color={theme.primary}
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
                      size={22}
                      color={theme.primary}
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
                    <MaterialCommunityIcons name="close" size={16} color={theme.textPrimary} />
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
                        size={15}
                        color={theme.primary}
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
                  <Text style={[styles.modalCloseButtonText, { color: isDark ? '#041812' : '#FFFFFF' }]}>
                    Tutup Rincian
                  </Text>
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
    marginBottom: SPACING.md,
    ...SHADOWS.sm,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    height: 38,
    gap: 8,
    marginBottom: 8,
  },
  searchInput: {
    fontFamily: FONTS.body,
    flex: 1,
    fontSize: 11.5,
    paddingVertical: 0,
  },
  filterScroll: {
    marginBottom: SPACING.sm,
  },
  filterContainer: {
    gap: 6,
    flexDirection: 'row',
  },
  categoryChip: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 7,
    borderWidth: 1,
  },
  categoryChipText: {
    fontFamily: FONTS.heading,
    fontSize: 10.5,
    fontWeight: '700',
  },
  emptyContainer: {
    padding: SPACING.lg,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  emptyText: {
    fontFamily: FONTS.body,
    fontSize: 11.5,
    textAlign: 'center',
  },
  projectsList: {
    gap: 10,
  },
  projectCard: {
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
  },
  projectTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  projectIconCircle: {
    width: 34,
    height: 34,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  projectTitleCol: {
    flex: 1,
  },
  projectTitle: {
    fontFamily: FONTS.heading,
    fontSize: 13,
    fontWeight: '700',
  },
  projectMeta: {
    fontFamily: FONTS.body,
    fontSize: 10.5,
    marginTop: 1,
  },
  projectDesc: {
    fontFamily: FONTS.body,
    fontSize: 11,
    lineHeight: 16,
    marginBottom: 8,
  },
  techChipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
    marginBottom: 8,
  },
  techChip: {
    paddingVertical: 3,
    paddingHorizontal: 7,
    borderRadius: 5,
    borderWidth: 1,
  },
  techChipText: {
    fontFamily: FONTS.body,
    fontSize: 10,
    fontWeight: '500',
  },
  detailButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 7,
    borderRadius: 7,
    borderWidth: 1,
    gap: 6,
  },
  detailButtonText: {
    fontFamily: FONTS.heading,
    fontSize: 11,
    fontWeight: '700',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalCard: {
    width: '100%',
    maxWidth: 520,
    maxHeight: '85%',
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    ...SHADOWS.lg,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(150, 150, 150, 0.2)',
  },
  modalIconBox: {
    width: 38,
    height: 38,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitleCol: {
    flex: 1,
  },
  modalTitle: {
    fontFamily: FONTS.heading,
    fontSize: 14,
    fontWeight: '700',
  },
  modalCategory: {
    fontFamily: FONTS.body,
    fontSize: 10.5,
    marginTop: 1,
  },
  modalCloseIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalSectionLabel: {
    fontFamily: FONTS.heading,
    fontSize: 11.5,
    fontWeight: '700',
    marginTop: 10,
    marginBottom: 4,
  },
  modalDescText: {
    fontFamily: FONTS.body,
    fontSize: 11.5,
    lineHeight: 17,
  },
  modalFeaturesList: {
    gap: 5,
    marginBottom: 6,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
  },
  featureText: {
    fontFamily: FONTS.body,
    fontSize: 11,
    flex: 1,
    lineHeight: 16,
  },
  modalCloseButton: {
    marginTop: 16,
    paddingVertical: 9,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalCloseButtonText: {
    fontFamily: FONTS.heading,
    fontSize: 12,
    fontWeight: '700',
  },
});
