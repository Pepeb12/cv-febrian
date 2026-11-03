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
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SectionHeading from './SectionHeading';
import { Theme, FONTS } from '../theme';
import { SECTION_IMAGES } from '../data/sectionImages';

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

export default function PortfolioGallery({ portfolios = [], theme }: PortfolioGalleryProps) {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1024;
  const isTablet = width >= 768 && width < 1024;
  const isMobile = width < 768;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(null);

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

  const activeProject =
    activeProjectIndex !== null && filteredProjects[activeProjectIndex]
      ? filteredProjects[activeProjectIndex]
      : null;

  const handlePrev = () => {
    if (activeProjectIndex !== null && activeProjectIndex > 0) {
      setActiveProjectIndex(activeProjectIndex - 1);
    }
  };

  const handleNext = () => {
    if (
      activeProjectIndex !== null &&
      activeProjectIndex < filteredProjects.length - 1
    ) {
      setActiveProjectIndex(activeProjectIndex + 1);
    }
  };

  const isDark = theme.isDark;

  return (
    <View
      style={[
        styles.mainCard,
        {
          backgroundColor: theme.surface,
          borderColor: theme.border,
          padding: isDesktop ? 28 : 18,
        },
      ]}
      accessibilityRole="region"
      accessibilityLabel="Galeri Portofolio Proyek"
    >
      <SectionHeading
        title="Galeri Portofolio Proyek"
        subtitle="Eksplorasi Proyek Nyata & Rekayasa Perangkat Lunak"
        icon="briefcase-outline"
        badgeText={`${filteredProjects.length} Proyek`}
        theme={theme}
      />

      {/* TOP CONTROLS: SEARCH BAR (KIRI) & FILTER CHIPS (KANAN) */}
      <View style={[styles.controlsRow, isDesktop ? styles.controlsRowDesktop : styles.controlsRowMobile]}>
        {/* Search Input Box */}
        <View
          style={[
            styles.searchBox,
            {
              backgroundColor: isDark ? 'rgba(15, 19, 40, 0.85)' : 'rgba(241, 245, 249, 0.85)',
              borderColor: theme.border,
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

      {/* PROJECT CARDS (GRID 3 KOLOM DI DESKTOP / 2 DI TABLET / 1 DI HP) */}
      {filteredProjects.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="folder-open-outline" size={32} color={theme.textLight} />
          <Text style={[styles.emptyText, { color: theme.textMuted }]}>
            Tidak ada proyek yang sesuai dengan kata kunci "{searchQuery}".
          </Text>
        </View>
      ) : (
        <View style={styles.projectsGrid3Col}>
          {filteredProjects.map((proj, idx) => {
            const iconName = getValidProjectIcon(proj);
            const cardWidth = isDesktop ? '31.8%' : isTablet ? '48.5%' : '100%';

            return (
              <View
                key={proj.id}
                style={[
                  styles.projectCardItem,
                  {
                    width: cardWidth,
                    backgroundColor: isDark ? 'rgba(22, 27, 51, 0.75)' : 'rgba(248, 250, 252, 0.9)',
                    borderColor: theme.border,
                  },
                ]}
              >
                {/* Visual Thumbnail Preview Header */}
                <View
                  style={[
                    styles.thumbnailContainer,
                    {
                      backgroundColor: isDark ? 'rgba(30, 37, 70, 0.8)' : 'rgba(238, 242, 255, 0.85)',
                      borderBottomColor: theme.borderLight,
                    },
                  ]}
                >
                  <View style={[styles.glowIconThumb, { borderColor: theme.primary }]}>
                    <Ionicons name={iconName} size={24} color={theme.primary} />
                  </View>
                  <View style={[styles.categoryBadgeOverlay, { backgroundColor: isDark ? 'rgba(15, 19, 40, 0.85)' : 'rgba(255, 255, 255, 0.9)' }]}>
                    <Text style={[styles.categoryBadgeText, { color: theme.secondary }]}>
                      {proj.category}
                    </Text>
                  </View>
                </View>

                {/* Project Info Body */}
                <View style={styles.projectBody}>
                  <Text style={[styles.projectTitle, { color: theme.textPrimary }]}>
                    {proj.title}
                  </Text>
                  <Text style={[styles.projectMeta, { color: theme.textMuted }]}>
                    {proj.year} • {proj.role}
                  </Text>
                  <Text
                    style={[styles.projectDesc, { color: theme.textSecondary }]}
                    numberOfLines={3}
                  >
                    {proj.shortDesc}
                  </Text>

                  {/* Tech stack chips preview */}
                  <View style={styles.techPillRow}>
                    {(proj.technologies || []).slice(0, 3).map((tech, tIdx) => (
                      <View
                        key={tIdx}
                        style={[
                          styles.techPill,
                          {
                            backgroundColor: isDark ? 'rgba(30, 37, 70, 0.6)' : 'rgba(238, 242, 255, 0.8)',
                            borderColor: theme.borderLight,
                          },
                        ]}
                      >
                        <Text style={[styles.techPillText, { color: theme.primary }]}>
                          {tech}
                        </Text>
                      </View>
                    ))}
                    {(proj.technologies || []).length > 3 && (
                      <Text style={[styles.moreTechText, { color: theme.textMuted }]}>
                        +{proj.technologies.length - 3}
                      </Text>
                    )}
                  </View>
                </View>

                {/* Tombol Lihat Detail → */}
                <TouchableOpacity
                  style={[
                    styles.detailBtn,
                    {
                      borderTopColor: theme.borderLight,
                      backgroundColor: isDark ? 'rgba(15, 19, 40, 0.5)' : 'rgba(255, 255, 255, 0.7)',
                    },
                  ]}
                  onPress={() => setActiveProjectIndex(idx)}
                  activeOpacity={0.7}
                  accessibilityRole="button"
                  accessibilityLabel={`Lihat detail proyek ${proj.title}`}
                >
                  <Text style={[styles.detailBtnText, { color: theme.primary }]}>
                    Lihat detail
                  </Text>
                  <Ionicons name="arrow-forward" size={15} color={theme.primary} />
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      )}

      {/* ========================================================
          INTERACTIVE LIGHTBOX MODAL (PREV / NEXT + DUA KOLOM)
          ======================================================== */}
      {activeProject && (
        <Modal
          visible={true}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setActiveProjectIndex(null)}
        >
          <View style={styles.modalBackdrop}>
            <View
              style={[
                styles.modalCard,
                {
                  backgroundColor: theme.surface,
                  borderColor: theme.borderStrong,
                },
              ]}
            >
              {/* Modal Header Toolbar */}
              <View style={styles.modalHeaderRow}>
                <View style={styles.modalCategoryBadge}>
                  <Text style={[styles.modalCatText, { color: theme.secondary }]}>
                    {activeProject.category}
                  </Text>
                </View>

                <TouchableOpacity
                  style={[styles.closeModalBtn, { backgroundColor: theme.surfaceMuted }]}
                  onPress={() => setActiveProjectIndex(null)}
                  accessibilityRole="button"
                  accessibilityLabel="Tutup dialog proyek"
                >
                  <Ionicons name="close" size={20} color={theme.textPrimary} />
                </TouchableOpacity>
              </View>

              {/* Modal Body: 2 Kolom di Desktop (Kiri: Visual Besar, Kanan: Konten Lengkap) */}
              <ScrollView style={styles.modalScrollBody} showsVerticalScrollIndicator={false}>
                <View style={[styles.modalColsWrapper, !isMobile && styles.modalColsRow]}>
                  {/* Kolom Kiri: Visual / Image Besar */}
                  <View style={[styles.modalLeftCol, !isMobile && styles.modalLeftColDesktop]}>
                    <View
                      style={[
                        styles.largeVisualBox,
                        {
                          backgroundColor: isDark ? 'rgba(30, 37, 70, 0.8)' : 'rgba(238, 242, 255, 0.85)',
                          borderColor: theme.border,
                        },
                      ]}
                    >
                      <Image
                        source={SECTION_IMAGES.GAMBAR_4_PORTFOLIO.source}
                        style={styles.modalCoverImage}
                        resizeMode="cover"
                      />
                      <View style={styles.visualOverlayGradient}>
                        <Ionicons
                          name={getValidProjectIcon(activeProject)}
                          size={32}
                          color="#FFFFFF"
                        />
                        <Text style={styles.visualOverlayTitle}>
                          {activeProject.title}
                        </Text>
                      </View>
                    </View>
                  </View>

                  {/* Kolom Kanan: Teks Lengkap, Fitur, Teknologi */}
                  <View style={[styles.modalRightCol, !isMobile && styles.modalRightColDesktop]}>
                    <Text style={[styles.modalTitle, { color: theme.textPrimary }]}>
                      {activeProject.title}
                    </Text>

                    <Text style={[styles.modalMeta, { color: theme.textMuted }]}>
                      Tahun: {activeProject.year} • Peran: {activeProject.role}
                    </Text>

                    <Text style={[styles.modalSectionLabel, { color: theme.secondary }]}>
                      DESKRIPSI PROYEK
                    </Text>
                    <Text style={[styles.modalDesc, { color: theme.textSecondary }]}>
                      {activeProject.fullDesc || activeProject.shortDesc}
                    </Text>

                    {/* Fitur Utama */}
                    {activeProject.features && activeProject.features.length > 0 && (
                      <View style={styles.featuresBlock}>
                        <Text style={[styles.modalSectionLabel, { color: theme.secondary }]}>
                          FITUR UTAMA
                        </Text>
                        {activeProject.features.map((feature, fIdx) => (
                          <View key={fIdx} style={styles.featureItemRow}>
                            <Ionicons name="checkmark-circle" size={15} color="#22C55E" />
                            <Text style={[styles.featureText, { color: theme.textSecondary }]}>
                              {feature}
                            </Text>
                          </View>
                        ))}
                      </View>
                    )}

                    {/* Teknologi yang Digunakan */}
                    {activeProject.technologies && activeProject.technologies.length > 0 && (
                      <View style={styles.techStackBlock}>
                        <Text style={[styles.modalSectionLabel, { color: theme.secondary }]}>
                          TEKNOLOGI
                        </Text>
                        <View style={styles.techPillGrid}>
                          {activeProject.technologies.map((tech, tIdx) => (
                            <View
                              key={tIdx}
                              style={[
                                styles.modalTechPill,
                                {
                                  backgroundColor: isDark ? 'rgba(30, 37, 70, 0.7)' : 'rgba(238, 242, 255, 0.85)',
                                  borderColor: theme.border,
                                },
                              ]}
                            >
                              <Text style={[styles.modalTechText, { color: theme.primary }]}>
                                {tech}
                              </Text>
                            </View>
                          ))}
                        </View>
                      </View>
                    )}
                  </View>
                </View>
              </ScrollView>

              {/* MODAL FOOTER NAVIGATION: [← Sebelumnya]  1 / 4  [Berikutnya →] */}
              <View
                style={[
                  styles.modalNavFooter,
                  {
                    borderTopColor: theme.borderLight,
                    backgroundColor: isDark ? 'rgba(15, 19, 40, 0.6)' : 'rgba(248, 250, 252, 0.8)',
                  },
                ]}
              >
                <TouchableOpacity
                  style={[
                    styles.navBtn,
                    activeProjectIndex === 0 && styles.navBtnDisabled,
                    {
                      backgroundColor: theme.surfaceMuted,
                      borderColor: theme.border,
                    },
                  ]}
                  onPress={handlePrev}
                  disabled={activeProjectIndex === 0}
                  accessibilityRole="button"
                  accessibilityLabel="Proyek sebelumnya"
                >
                  <Ionicons
                    name="chevron-back"
                    size={16}
                    color={activeProjectIndex === 0 ? theme.textMuted : theme.primary}
                  />
                  <Text
                    style={[
                      styles.navBtnText,
                      { color: activeProjectIndex === 0 ? theme.textMuted : theme.primary },
                    ]}
                  >
                    Sebelumnya
                  </Text>
                </TouchableOpacity>

                {/* Indikator Urutan 1 / 4 */}
                <View style={styles.counterBadge}>
                  <Text style={[styles.counterText, { color: theme.textPrimary }]}>
                    {(activeProjectIndex ?? 0) + 1} / {filteredProjects.length}
                  </Text>
                </View>

                <TouchableOpacity
                  style={[
                    styles.navBtn,
                    activeProjectIndex === filteredProjects.length - 1 && styles.navBtnDisabled,
                    {
                      backgroundColor: theme.surfaceMuted,
                      borderColor: theme.border,
                    },
                  ]}
                  onPress={handleNext}
                  disabled={activeProjectIndex === filteredProjects.length - 1}
                  accessibilityRole="button"
                  accessibilityLabel="Proyek berikutnya"
                >
                  <Text
                    style={[
                      styles.navBtnText,
                      {
                        color:
                          activeProjectIndex === filteredProjects.length - 1
                            ? theme.textMuted
                            : theme.primary,
                      },
                    ]}
                  >
                    Berikutnya
                  </Text>
                  <Ionicons
                    name="chevron-forward"
                    size={16}
                    color={
                      activeProjectIndex === filteredProjects.length - 1
                        ? theme.textMuted
                        : theme.primary
                    }
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  mainCard: {
    width: '100%',
    borderRadius: 22,
    borderWidth: 1,
    overflow: 'hidden',
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
  controlsRow: {
    gap: 14,
    marginBottom: 20,
    alignItems: 'center',
  },
  controlsRowDesktop: {
    flexDirection: 'row',
  },
  controlsRowMobile: {
    flexDirection: 'column',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    height: 42,
    borderRadius: 999,
    borderWidth: 1,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontFamily: FONTS.regular,
    fontSize: 13,
  },
  filterGroup: {
    flexShrink: 0,
  },
  filterContainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  categoryChip: {
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 999,
    borderWidth: 1,
    ...Platform.select({
      web: { cursor: 'pointer' as any },
    }),
  },
  categoryChipText: {
    fontSize: 12,
  },
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
  projectsGrid3Col: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 18,
    width: '100%',
  },
  projectCardItem: {
    borderRadius: 18,
    borderWidth: 1,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    ...Platform.select({
      web: {
        transition: 'transform 0.18s ease, border-color 0.18s ease' as any,
        backdropFilter: 'blur(10px)',
      } as any,
    }),
  },
  thumbnailContainer: {
    width: '100%',
    height: 130,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    borderBottomWidth: 1,
  },
  glowIconThumb: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      web: {
        boxShadow: '0 0 16px rgba(99, 102, 241, 0.3)',
      } as any,
    }),
  },
  categoryBadgeOverlay: {
    position: 'absolute',
    top: 10,
    right: 10,
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 999,
  },
  categoryBadgeText: {
    fontFamily: FONTS.semiBold,
    fontSize: 10.5,
    fontWeight: '600',
  },
  projectBody: {
    padding: 16,
    gap: 6,
    flex: 1,
  },
  projectTitle: {
    fontFamily: FONTS.bold,
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  projectMeta: {
    fontFamily: FONTS.medium,
    fontSize: 11.5,
  },
  projectDesc: {
    fontFamily: FONTS.regular,
    fontSize: 12.5,
    lineHeight: 18,
    marginTop: 2,
  },
  techPillRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 8,
  },
  techPill: {
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 6,
    borderWidth: 1,
  },
  techPillText: {
    fontFamily: FONTS.semiBold,
    fontSize: 10.5,
    fontWeight: '600',
  },
  moreTechText: {
    fontFamily: FONTS.medium,
    fontSize: 11,
  },
  detailBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    ...Platform.select({
      web: { cursor: 'pointer' as any },
    }),
  },
  detailBtnText: {
    fontFamily: FONTS.semiBold,
    fontSize: 12.5,
    fontWeight: '600',
  },
  // Lightbox Modal
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.78)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    ...Platform.select({
      web: {
        backdropFilter: 'blur(10px)',
      } as any,
    }),
  },
  modalCard: {
    width: '100%',
    maxWidth: 820,
    maxHeight: '90%',
    borderRadius: 22,
    borderWidth: 1,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    ...Platform.select({
      web: {
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.45)',
      } as any,
    }),
  },
  modalHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(99, 102, 241, 0.15)',
  },
  modalCategoryBadge: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
  },
  modalCatText: {
    fontFamily: FONTS.bold,
    fontSize: 11.5,
    fontWeight: '700',
  },
  closeModalBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      web: { cursor: 'pointer' as any },
    }),
  },
  modalScrollBody: {
    flex: 1,
  },
  modalColsWrapper: {
    padding: 20,
    gap: 20,
  },
  modalColsRow: {
    flexDirection: 'row',
  },
  modalLeftCol: {
    width: '100%',
  },
  modalLeftColDesktop: {
    flex: 4.5,
  },
  largeVisualBox: {
    width: '100%',
    height: 250,
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'flex-end',
  },
  modalCoverImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  visualOverlayGradient: {
    backgroundColor: 'rgba(11, 13, 30, 0.75)',
    padding: 16,
    gap: 4,
  },
  visualOverlayTitle: {
    fontFamily: FONTS.bold,
    fontSize: 14,
    color: '#FFFFFF',
  },
  modalRightCol: {
    width: '100%',
    gap: 10,
  },
  modalRightColDesktop: {
    flex: 5.5,
  },
  modalTitle: {
    fontFamily: FONTS.extraBold,
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  modalMeta: {
    fontFamily: FONTS.medium,
    fontSize: 12,
  },
  modalSectionLabel: {
    fontFamily: FONTS.bold,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
    marginTop: 6,
  },
  modalDesc: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    lineHeight: 20,
  },
  featuresBlock: {
    gap: 6,
  },
  featureItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  featureText: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    flex: 1,
  },
  techStackBlock: {
    gap: 6,
  },
  techPillGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  modalTechPill: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
  },
  modalTechText: {
    fontFamily: FONTS.semiBold,
    fontSize: 11,
    fontWeight: '600',
  },
  // Modal Navigation Footer
  modalNavFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderTopWidth: 1,
  },
  navBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
    borderWidth: 1,
    gap: 6,
    ...Platform.select({
      web: { cursor: 'pointer' as any },
    }),
  },
  navBtnDisabled: {
    opacity: 0.4,
  },
  navBtnText: {
    fontFamily: FONTS.semiBold,
    fontSize: 12,
    fontWeight: '600',
  },
  counterBadge: {
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  counterText: {
    fontFamily: FONTS.bold,
    fontSize: 12,
    fontWeight: '700',
  },
});
