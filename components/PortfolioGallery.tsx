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
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SectionHeading from './SectionHeading';
import FeaturedProjectSpotlightBanner from './FeaturedProjectSpotlightBanner';
import { Theme, SPACING, FONTS } from '../theme';

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
  showBanner?: boolean;
}

/**
 * Helper untuk memastikan ikon selalu valid (tidak pernah muncul tanda tanya '?')
 */
function getValidProjectIcon(proj: ProjectItem): keyof typeof Ionicons.glyphMap {
  const title = (proj.title || '').toLowerCase();
  const cat = (proj.category || '').toLowerCase();

  if (title.includes('cv') || title.includes('mobile') || cat.includes('mobile')) {
    return 'phone-portrait-outline';
  }
  if (title.includes('simak') || title.includes('akademik') || cat.includes('web')) {
    return 'school-outline';
  }
  if (title.includes('hub') || title.includes('ui/ux') || cat.includes('design')) {
    return 'color-palette-outline';
  }
  if (title.includes('inventory') || title.includes('database') || cat.includes('data')) {
    return 'server-outline';
  }
  return 'briefcase-outline';
}

/**
 * PortfolioGallery Component (Galeri Portofolio Proyek)
 * - Search bar dan filter kategori sejajar 1 baris di Desktop
 * - Tombol filter aktif menggunakan warna aksen tema (#B5893D)
 * - Ikon valid tanpa '?'
 * - Grid 2x2 kartu proyek dengan tinggi sejajar rata
 */
export default function PortfolioGallery({
  portfolios = [],
  theme,
  showBanner = true,
}: PortfolioGalleryProps) {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1024;
  const isTablet = width >= 768 && width < 1024;

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
          width: '100%',
        },
      ]}
      accessibilityRole="region"
      accessibilityLabel="Galeri Portofolio Proyek"
    >
      <SectionHeading
        title="Galeri Portofolio Proyek"
        subtitle="Eksplorasi Proyek Nyata & Karya Rekayasa Perangkat Lunak"
        icon="briefcase-outline"
        badgeText={`${filteredProjects.length} Proyek`}
        theme={theme}
      />

      {/* FEATURED PROJECT SPOTLIGHT BANNER (GAMBAR_4_PORTFOLIO) */}
      {showBanner && (
        <FeaturedProjectSpotlightBanner
          theme={theme}
          onExploreProject={() => portfolios.length > 0 && setActiveProject(portfolios[0])}
        />
      )}

      {/* TOP CONTROLS: SEARCH BAR (KIRI) & FILTER CHIPS (KANAN) - SEJAJAR 1 BARIS DI DESKTOP */}
      <View style={[styles.controlsRow, isDesktop ? styles.controlsRowDesktop : styles.controlsRowMobile]}>
        {/* Search Input Box */}
        <View
          style={[
            styles.searchBox,
            {
              backgroundColor: theme.inputBackground || theme.surfaceMuted,
              borderColor: theme.inputBorder || theme.border,
              flex: isDesktop ? 1 : undefined,
              width: isDesktop ? undefined : '100%',
            },
          ]}
        >
          <Ionicons name="search-outline" size={17} color={theme.textMuted} />
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
              <Ionicons name="close-circle" size={16} color={theme.textMuted} />
            </TouchableOpacity>
          )}
        </View>

        {/* Category Filter Chips */}
        <View style={styles.filterGroup}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
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
                      {
                        color: isActive ? theme.textInverted : theme.textSecondary,
                        fontFamily: isActive ? FONTS.bold : FONTS.medium,
                        fontWeight: isActive ? '700' : '500',
                      },
                    ]}
                  >
                    {cat.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </View>

      {/* PROJECT CARDS LIST (GRID 2x2 SEJAJAR DI DESKTOP / TABLET, 1 KOLOM DI MOBILE) */}
      {filteredProjects.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="folder-open-outline" size={32} color={theme.textLight} />
          <Text style={[styles.emptyText, { color: theme.textMuted }]}>
            Tidak ada proyek yang sesuai dengan kata kunci "{searchQuery}".
          </Text>
        </View>
      ) : (
        <View style={styles.projectsGrid}>
          {filteredProjects.map((proj) => {
            const iconName = getValidProjectIcon(proj);

            return (
              <View
                key={proj.id}
                style={[
                  styles.projectCardWrapper,
                  {
                    width: isDesktop || isTablet ? '48.8%' : '100%',
                  },
                ]}
              >
                <View
                  style={[
                    styles.projectCard,
                    {
                      backgroundColor: theme.surfaceMuted,
                      borderColor: theme.borderLight,
                    },
                  ]}
                >
                  {/* Top Row: Icon + Title */}
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
                      <Ionicons
                        name={iconName}
                        size={19}
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

                  {/* Project Description */}
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
                            borderColor: theme.borderLight,
                          },
                        ]}
                      >
                        <Text style={[styles.techChipText, { color: theme.textSecondary }]}>
                          {tech}
                        </Text>
                      </View>
                    ))}
                  </View>

                  {/* View Details CTA Button (Flush at bottom) */}
                  <TouchableOpacity
                    style={[
                      styles.detailButton,
                      {
                        backgroundColor: theme.surfaceSecondary || theme.surfaceMuted,
                        borderColor: theme.borderStrong || theme.primaryBorder,
                      },
                    ]}
                    activeOpacity={0.8}
                    onPress={() => setActiveProject(proj)}
                    accessibilityRole="button"
                    accessibilityLabel={`Lihat detail ${proj.title}`}
                  >
                    <Text style={[styles.detailButtonText, { color: theme.textPrimary }]}>
                      Lihat Detail &amp; Fitur Proyek
                    </Text>
                    <Ionicons name="arrow-forward" size={14} color={theme.textPrimary} />
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>
      )}

      {/* MODAL DETAIL PROYEK */}
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
                        borderColor: theme.borderLight,
                      },
                    ]}
                  >
                    <Ionicons
                      name={getValidProjectIcon(activeProject)}
                      size={22}
                      color={theme.primary}
                    />
                  </View>
                  <View style={styles.modalTitleCol}>
                    <Text style={[styles.modalTitle, { color: theme.textPrimary }]}>
                      {activeProject.title}
                    </Text>
                    <Text style={[styles.modalCategory, { color: theme.textMuted }]}>
                      {activeProject.category} • {activeProject.year} • {activeProject.role}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={[styles.modalCloseIcon, { backgroundColor: theme.surfaceMuted }]}
                    onPress={() => setActiveProject(null)}
                    accessibilityRole="button"
                    accessibilityLabel="Tutup detail proyek"
                  >
                    <Ionicons name="close" size={18} color={theme.textPrimary} />
                  </TouchableOpacity>
                </View>

                {/* Deskripsi Lengkap */}
                <Text style={[styles.modalSectionLabel, { color: theme.textPrimary }]}>
                  Tentang Proyek:
                </Text>
                <Text style={[styles.modalDescText, { color: theme.textSecondary }]}>
                  {activeProject.fullDesc || activeProject.shortDesc}
                </Text>

                {/* Fitur Utama */}
                {activeProject.features && activeProject.features.length > 0 && (
                  <>
                    <Text style={[styles.modalSectionLabel, { color: theme.textPrimary }]}>
                      Fitur Utama &amp; Implementasi Teknis:
                    </Text>
                    <View style={styles.modalFeaturesList}>
                      {activeProject.features.map((feature, idx) => (
                        <View key={idx} style={styles.featureItem}>
                          <Ionicons
                            name="checkmark-circle"
                            size={15}
                            color={theme.success}
                            style={{ marginTop: 2 }}
                          />
                          <Text style={[styles.featureText, { color: theme.textSecondary }]}>
                            {feature}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </>
                )}

                {/* Teknologi yang Digunakan */}
                <Text style={[styles.modalSectionLabel, { color: theme.textPrimary }]}>
                  Teknologi &amp; Tools:
                </Text>
                <View style={styles.techChipsRow}>
                  {activeProject.technologies.map((tech, idx) => (
                    <View
                      key={idx}
                      style={[
                        styles.techChip,
                        {
                          backgroundColor: theme.surfaceMuted,
                          borderColor: theme.borderLight,
                        },
                      ]}
                    >
                      <Text style={[styles.techChipText, { color: theme.textPrimary }]}>
                        {tech}
                      </Text>
                    </View>
                  ))}
                </View>

                {/* Tombol Tutup */}
                <TouchableOpacity
                  style={[
                    styles.modalCloseButton,
                    { backgroundColor: theme.primary },
                  ]}
                  onPress={() => setActiveProject(null)}
                  accessibilityRole="button"
                  accessibilityLabel="Tutup dialog detail proyek"
                >
                  <Text style={[styles.modalCloseButtonText, { color: theme.textInverted }]}>
                    Tutup Detail
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
    borderRadius: SPACING.cardRadius,
    padding: SPACING.cardPadding,
    borderWidth: 1,
    marginBottom: 0,
    width: '100%',
  },
  // CONTROLS ROW: SEARCH & FILTER
  controlsRow: {
    marginBottom: SPACING.md,
    gap: 12,
  },
  controlsRowDesktop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  controlsRowMobile: {
    flexDirection: 'column',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'ios' ? 9 : 6,
    borderRadius: 9,
    borderWidth: 1,
    gap: 8,
    minHeight: 40,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    fontFamily: FONTS.regular,
    padding: 0,
    ...Platform.select({
      web: { outlineStyle: 'none' as any },
    }),
  },
  filterGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  categoryChip: {
    paddingVertical: 7,
    paddingHorizontal: 13,
    borderRadius: 8,
    borderWidth: 1,
  },
  categoryChipText: {
    fontSize: 12,
  },
  // EMPTY STATE
  emptyContainer: {
    paddingVertical: 40,
    alignItems: 'center',
    gap: 10,
  },
  emptyText: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    textAlign: 'center',
  },
  // PROJECTS GRID
  projectsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginTop: 4,
    justifyContent: 'space-between',
  },
  projectCardWrapper: {
    marginBottom: 0,
  },
  projectCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    flex: 1,
    justifyContent: 'space-between',
    minHeight: 220,
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
    borderRadius: 9,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  projectTitleCol: {
    flex: 1,
  },
  projectTitle: {
    fontFamily: FONTS.bold,
    fontSize: 14,
    fontWeight: '700',
  },
  projectMeta: {
    fontFamily: FONTS.regular,
    fontSize: 11,
    marginTop: 2,
  },
  projectDesc: {
    fontFamily: FONTS.regular,
    fontSize: 12.5,
    lineHeight: 18,
    marginBottom: 12,
  },
  techChipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 14,
  },
  techChip: {
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 5,
    borderWidth: 1,
  },
  techChipText: {
    fontFamily: FONTS.medium,
    fontSize: 10.5,
  },
  detailButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    gap: 6,
    marginTop: 'auto',
  },
  detailButtonText: {
    fontFamily: FONTS.semiBold,
    fontSize: 12,
    fontWeight: '600',
  },
  // MODAL STYLES
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.md,
  },
  modalCard: {
    width: '100%',
    maxWidth: 540,
    maxHeight: '85%',
    borderRadius: 16,
    padding: SPACING.lg,
    borderWidth: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(150, 150, 150, 0.2)',
  },
  modalIconBox: {
    width: 42,
    height: 42,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitleCol: {
    flex: 1,
  },
  modalTitle: {
    fontFamily: FONTS.bold,
    fontSize: 15.5,
    fontWeight: '700',
  },
  modalCategory: {
    fontFamily: FONTS.regular,
    fontSize: 11.5,
    marginTop: 2,
  },
  modalCloseIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalSectionLabel: {
    fontFamily: FONTS.bold,
    fontSize: 12.5,
    fontWeight: '700',
    marginTop: 14,
    marginBottom: 6,
  },
  modalDescText: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    lineHeight: 19,
  },
  modalFeaturesList: {
    gap: 6,
    marginBottom: 6,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  featureText: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    flex: 1,
    lineHeight: 18,
  },
  modalCloseButton: {
    marginTop: 20,
    paddingVertical: 11,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalCloseButtonText: {
    fontFamily: FONTS.bold,
    fontSize: 13,
    fontWeight: '700',
  },
});
