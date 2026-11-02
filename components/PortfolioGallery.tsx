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
import { MaterialCommunityIcons } from '@expo/vector-icons';
import SectionHeading from './SectionHeading';
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
}

/**
 * PortfolioGallery Component (Minimalist Tech: CSS Grid 2 Kolom Desktop, 1 Kolom Mobile, Gap 24px)
 */
export default function PortfolioGallery({ portfolios = [], theme }: PortfolioGalleryProps) {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

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
            borderColor: theme.borderLight,
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
                      ? '#1E293B'
                      : '#0F172A'
                    : theme.surfaceMuted,
                  borderColor: isActive
                    ? isDark
                      ? '#334155'
                      : '#0F172A'
                    : theme.borderLight,
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

      {/* 3. Project Cards List */}
      {filteredProjects.length === 0 ? (
        <View style={styles.emptyContainer}>
          <MaterialCommunityIcons name="folder-search-outline" size={32} color={theme.textLight} />
          <Text style={[styles.emptyText, { color: theme.textMuted }]}>
            Tidak ada proyek yang sesuai dengan kriteria "{searchQuery}".
          </Text>
        </View>
      ) : (
        <View
          style={[
            styles.projectsGrid,
            isDesktop ? styles.projectsGridDesktop : styles.projectsGridMobile,
          ]}
        >
          {filteredProjects.map((proj) => (
            <View
              key={proj.id}
              style={[
                styles.projectCardWrapper,
                isDesktop && styles.projectCardWrapperDesktop,
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
                <View style={styles.projectTopRow}>
                  <View
                    style={[
                      styles.projectIconCircle,
                      {
                        backgroundColor: theme.surface,
                        borderColor: theme.borderLight,
                      },
                    ]}
                  >
                    <MaterialCommunityIcons
                      name={proj.icon || 'laptop'}
                      size={18}
                      color={theme.textPrimary}
                    />
                  </View>
                  <View style={styles.projectTitleCol}>
                    {/* H3 HEADING */}
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

                {/* View Details CTA */}
                <TouchableOpacity
                  style={[
                    styles.detailButton,
                    {
                      backgroundColor: theme.surface,
                      borderColor: theme.borderLight,
                    },
                  ]}
                  activeOpacity={0.8}
                  onPress={() => setActiveProject(proj)}
                  accessibilityRole="button"
                  accessibilityLabel={`Lihat detail ${proj.title}`}
                >
                  <MaterialCommunityIcons name="arrow-right" size={14} color={theme.textPrimary} />
                  <Text style={[styles.detailButtonText, { color: theme.textPrimary }]}>
                    Lihat Detail & Fitur Proyek
                  </Text>
                </TouchableOpacity>
              </View>
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
                        borderColor: theme.borderLight,
                      },
                    ]}
                  >
                    <MaterialCommunityIcons
                      name={activeProject.icon || 'laptop'}
                      size={22}
                      color={theme.textPrimary}
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
                        color={theme.textPrimary}
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
                          borderColor: theme.borderLight,
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
                  style={[styles.modalCloseButton, { backgroundColor: theme.textPrimary }]}
                  activeOpacity={0.8}
                  onPress={() => setActiveProject(null)}
                  accessibilityRole="button"
                  accessibilityLabel="Tutup rincian proyek"
                >
                  <Text style={[styles.modalCloseButtonText, { color: isDark ? '#090D16' : '#FFFFFF' }]}>
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
    borderRadius: SPACING.cardRadius, // 16px
    padding: SPACING.cardPadding, // 24px standardized card padding
    borderWidth: 1,
    marginBottom: SPACING.gap, // 20px standardized gap
    width: '100%',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md, // 16px
    borderRadius: 8,
    borderWidth: 1,
    height: 40,
    gap: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  searchInput: {
    fontFamily: FONTS.regular,
    flex: 1,
    fontSize: 13,
    paddingVertical: 0,
  },
  filterScroll: {
    marginBottom: SPACING.md, // 16px
  },
  filterContainer: {
    gap: SPACING.sm, // 8px
    flexDirection: 'row',
  },
  categoryChip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    borderWidth: 1,
  },
  categoryChipText: {
    fontFamily: FONTS.semiBold,
    fontSize: 11,
    fontWeight: '600',
  },
  emptyContainer: {
    padding: SPACING.xl,
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
  },
  emptyText: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    textAlign: 'center',
  },
  projectsGrid: {
    gap: 24, // Minimal 24px (md:gap-6)
    width: '100%',
    ...Platform.select({
      web: {
        display: 'grid' as any,
      },
    }),
  },
  projectsGridDesktop: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    ...Platform.select({
      web: {
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' as any, // 2 Kolom Desktop (md:grid-cols-2)
        gap: 24,
      },
    }),
  },
  projectsGridMobile: {
    flexDirection: 'column',
    ...Platform.select({
      web: {
        gridTemplateColumns: '1fr' as any, // 1 Kolom Mobile (grid-cols-1)
        gap: 24,
      },
    }),
  },
  projectCardWrapper: {
    width: '100%',
  },
  projectCardWrapperDesktop: {
    ...Platform.select({
      web: {
        width: 'auto' as any,
      },
      default: {
        width: '48%' as any,
      },
    }),
  },
  projectCard: {
    padding: SPACING.lg, // 24px (Lega & proporsional)
    borderRadius: 12,
    borderWidth: 1,
    height: '100%',
    justifyContent: 'space-between',
  },
  projectTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.xs,
  },
  projectIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 8,
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
    marginTop: 1,
  },
  projectDesc: {
    fontFamily: FONTS.regular,
    fontSize: 12.5,
    lineHeight: 18,
    marginBottom: SPACING.sm,
  },
  techChipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.xs,
    marginBottom: SPACING.sm,
  },
  techChip: {
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 4,
    borderWidth: 1,
  },
  techChipText: {
    fontFamily: FONTS.regular,
    fontSize: 11,
  },
  detailButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    gap: SPACING.xs,
  },
  detailButtonText: {
    fontFamily: FONTS.bold,
    fontSize: 11.5,
    fontWeight: '700',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  modalCard: {
    width: '100%',
    maxWidth: 520,
    maxHeight: '85%',
    borderRadius: 14,
    padding: SPACING.lg, // 24px
    borderWidth: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
    paddingBottom: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(150, 150, 150, 0.15)',
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
    fontFamily: FONTS.bold,
    fontSize: 15,
    fontWeight: '700',
  },
  modalCategory: {
    fontFamily: FONTS.regular,
    fontSize: 11,
    marginTop: 2,
  },
  modalCloseIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalSectionLabel: {
    fontFamily: FONTS.bold,
    fontSize: 12,
    fontWeight: '700',
    marginTop: SPACING.md,
    marginBottom: SPACING.xs,
  },
  modalDescText: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    lineHeight: 19,
  },
  modalFeaturesList: {
    gap: 6,
    marginBottom: SPACING.xs,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
  },
  featureText: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    flex: 1,
    lineHeight: 18,
  },
  modalCloseButton: {
    marginTop: SPACING.lg,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalCloseButtonText: {
    fontFamily: FONTS.bold,
    fontSize: 13,
    fontWeight: '700',
  },
});
