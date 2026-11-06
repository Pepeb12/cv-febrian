import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Theme, FONTS } from '../theme';

export interface ProjectItem {
  id: string | number;
  title: string;
  category: string;
  year?: string;
  role?: string;
  shortDesc: string;
  fullDesc?: string;
  technologies: string[];
  features?: string[];
  icon?: string;
  accentColor?: string;
  imageUrl?: string;
  imageCaption?: string;
}

interface PortfolioGalleryProps {
  portfolios?: ProjectItem[];
  theme: Theme;
}

const projectCvPhoto = require('../assets/project_cv.jpg');
const projectPmbPhoto = require('../assets/project_pmb_masoem.jpg');
const projectInventarisPhoto = require('../assets/project_inventaris.jpg');

const LOCAL_PROJECT_PHOTOS: { [key: string]: any } = {
  'proj-1': projectCvPhoto,
  'proj-2': projectPmbPhoto,
  'proj-3': projectInventarisPhoto,
};

function getProjectDefaultImage(proj: ProjectItem): string {
  if (proj.imageUrl) return proj.imageUrl;
  const title = (proj.title || '').toLowerCase();
  const cat = (proj.category || '').toLowerCase();
  if (title.includes('cv') || cat.includes('mobile')) {
    return 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1000&auto=format&fit=crop&q=80';
  }
  if (title.includes('pendaftaran') || title.includes('mahasiswa')) {
    return 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1000&auto=format&fit=crop&q=80';
  }
  return 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000&auto=format&fit=crop&q=80';
}

function getProjectImageSource(proj: ProjectItem): any {
  if (proj.id && LOCAL_PROJECT_PHOTOS[String(proj.id)]) {
    return LOCAL_PROJECT_PHOTOS[String(proj.id)];
  }
  const title = (proj.title || '').toLowerCase();
  if (title.includes('cv') || title.includes('academic')) {
    return projectCvPhoto;
  }
  if (title.includes('pendaftaran') || title.includes('pmb') || title.includes("ma'soem") || title.includes('masoem')) {
    return projectPmbPhoto;
  }
  if (title.includes('inventaris') || title.includes('peminjaman')) {
    return projectInventarisPhoto;
  }
  if (proj.imageUrl) {
    if (typeof proj.imageUrl === 'string') {
      if (proj.imageUrl.includes('project_cv')) return projectCvPhoto;
      if (proj.imageUrl.includes('project_pmb_masoem')) return projectPmbPhoto;
      if (proj.imageUrl.includes('project_inventaris')) return projectInventarisPhoto;
      return { uri: proj.imageUrl };
    }
    return proj.imageUrl;
  }
  return { uri: getProjectDefaultImage(proj) };
}

function getProjectIcon(proj: ProjectItem): keyof typeof Ionicons.glyphMap {
  const cat = (proj.category || '').toLowerCase();
  const title = (proj.title || '').toLowerCase();

  if (cat.includes('mobile') || title.includes('mobile') || title.includes('cv')) {
    return 'phone-portrait-outline';
  }
  if (cat.includes('web') || title.includes('web') || title.includes('simak')) {
    return 'globe-outline';
  }
  if (cat.includes('design') || cat.includes('ui') || title.includes('hub')) {
    return 'color-palette-outline';
  }
  if (cat.includes('data') || title.includes('inventory') || title.includes('logistics')) {
    return 'server-outline';
  }
  return 'briefcase-outline';
}

/**
 * PortfolioGallery Component — LEVEL 7 (Galeri Portofolio Proyek Interaktif)
 * - Menampilkan daftar proyek dari JSON lokal (profile.json)
 * - Filter kategori dinamis & Pencarian langsung (Live Search)
 * - Modal detail interaktif untuk setiap proyek
 * - Empty state jika pencarian tidak ditemukan
 */
export default function PortfolioGallery({ portfolios = [], theme }: PortfolioGalleryProps) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [expandedProjectDocs, setExpandedProjectDocs] = useState<{ [key: string]: boolean }>({
    'proj-1': true,
    'proj-2': true,
    'proj-3': true,
  });

  const toggleProjectDoc = (id: string | number) => {
    const key = String(id);
    setExpandedProjectDocs((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const categories = [
    { key: 'ALL', label: 'Semua Proyek' },
    { key: 'Mobile App', label: 'Aplikasi Mobile' },
    { key: 'Web Developer', label: 'Aplikasi Web' },
  ];

  const filteredProjects = portfolios.filter((proj) => {
    const matchesCategory =
      selectedCategory === 'ALL' || proj.category === selectedCategory;
    const query = searchQuery.trim().toLowerCase();
    const matchesQuery =
      !query ||
      proj.title.toLowerCase().includes(query) ||
      proj.shortDesc.toLowerCase().includes(query) ||
      proj.technologies.some((t) => t.toLowerCase().includes(query));
    return matchesCategory && matchesQuery;
  });

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.surface,
          borderColor: theme.border,
          ...Platform.select({
            web: {
              scrollMarginTop: isMobile ? 95 : 85,
            } as any,
          }),
        },
      ]}
      accessibilityRole="region"
      accessibilityLabel="Galeri Portofolio Proyek"
    >
      {/* HEADER SECTION */}
      <View
        style={styles.headerRow}
        {...(Platform.OS === 'web' ? { className: 'slide-up' } : {})}
      >
        <View style={[styles.headerIconBox, { backgroundColor: theme.surface2 }]}>
          <Ionicons name="briefcase-outline" size={20} color={theme.primary} />
        </View>
        <View style={styles.headerTextGroup}>
          <Text style={[styles.sectionTitle, { color: theme.heading }]}>
            Portofolio Proyek
          </Text>
          <Text style={[styles.sectionSubtitle, { color: theme.textSecondary }]}>
            Eksplorasi Proyek Nyata, Sistem Informasi, & Aplikasi Mobile
          </Text>
        </View>
      </View>

      {/* SEARCH INPUT & CATEGORY FILTER */}
      <View
        style={styles.filterControlsWrapper}
        {...(Platform.OS === 'web' ? { className: 'fade-in-up' } : {})}
      >
        <View
          style={[
            styles.searchBar,
            {
              backgroundColor: theme.input,
              borderColor: theme.border,
            },
          ]}
        >
          <Ionicons name="search-outline" size={17} color={theme.textMuted} />
          <TextInput
            style={[styles.searchInput, { color: theme.heading }]}
            placeholder="Cari proyek, teknologi (contoh: React Native, Laravel)..."
            placeholderTextColor={theme.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
            accessibilityLabel="Kotak pencarian portofolio"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <Ionicons name="close-circle" size={16} color={theme.textMuted} />
            </TouchableOpacity>
          )}
        </View>

        {/* CATEGORY PILLS */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScroll}
        >
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.key;
            return (
              <TouchableOpacity
                key={cat.key}
                style={[
                  styles.categoryPill,
                  {
                    backgroundColor: isSelected ? theme.primary : theme.surface2,
                    borderColor: isSelected ? theme.primaryHover : theme.border,
                  },
                ]}
                {...(Platform.OS === 'web' ? { className: 'interactive-btn' } : {})}
                onPress={() => setSelectedCategory(cat.key)}
                activeOpacity={0.75}
                accessibilityRole="button"
                accessibilityState={{ selected: isSelected }}
              >
                <Text
                  style={[
                    styles.categoryPillText,
                    {
                      color: isSelected ? (theme.isDark ? '#25191D' : '#FFFFFF') : theme.textSecondary,
                      fontWeight: isSelected ? '700' : '500',
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

      {/* PROYEK GRID */}
      {filteredProjects.length === 0 ? (
        <View style={[styles.emptyContainer, { backgroundColor: theme.surface2, borderColor: theme.border }]}>
          <Ionicons name="folder-open-outline" size={38} color={theme.textMuted} />
          <Text style={[styles.emptyTitle, { color: theme.heading }]}>
            Tidak Ada Proyek yang Ditemukan
          </Text>
          <Text style={[styles.emptySub, { color: theme.textSecondary }]}>
            Coba sesuaikan kata kunci pencarian atau pilih kategori lain.
          </Text>
        </View>
      ) : (
        <View
          style={styles.projectsGrid}
          {...(Platform.OS === 'web' ? { className: 'stagger-group' } : {})}
        >
          {filteredProjects.map((proj) => {
            const iconName = getProjectIcon(proj);
            return (
              <TouchableOpacity
                key={proj.id}
                style={[
                  styles.projectCard,
                  isMobile && styles.projectCardMobile,
                  {
                    backgroundColor: theme.surface2,
                    borderColor: theme.border,
                  },
                ]}
                {...(Platform.OS === 'web' ? { className: 'interactive-card' } : {})}
                onPress={() => setActiveProject(proj)}
                activeOpacity={0.85}
                accessibilityRole="article"
                accessibilityLabel={`Kartu proyek ${proj.title}`}
              >
                {/* Card Top: Icon & Year */}
                <View style={styles.cardTopRow}>
                  <View style={[styles.cardIconBox, { backgroundColor: theme.surface, borderColor: theme.border }]}>
                    <Ionicons name={iconName} size={18} color={theme.primary} />
                  </View>
                  <View style={styles.cardMetaRight}>
                    <View style={[styles.categoryBadge, { backgroundColor: theme.surface, borderColor: theme.border }]}>
                      <Text style={[styles.categoryBadgeText, { color: theme.primary }]}>
                        {proj.category}
                      </Text>
                    </View>
                    {proj.year && (
                      <Text style={[styles.yearText, { color: theme.textMuted }]}>{proj.year}</Text>
                    )}
                  </View>
                </View>

                {/* Title & Role */}
                <Text style={[styles.projectTitle, { color: theme.heading }]} numberOfLines={2}>
                  {proj.title}
                </Text>
                {proj.role && (
                  <Text style={[styles.projectRole, { color: theme.primary }]} numberOfLines={1}>
                    {proj.role}
                  </Text>
                )}

                {/* Short Description */}
                <Text style={[styles.projectDesc, { color: theme.textSecondary }]} numberOfLines={3}>
                  {proj.shortDesc}
                </Text>

                {/* Tombol Lihat Dokumentasi Proyek (Mengecil dulu lalu muncul saat diklik) */}
                <TouchableOpacity
                  style={[
                    styles.docToggleButton,
                    {
                      backgroundColor: expandedProjectDocs[String(proj.id)] ? theme.primary : theme.surface,
                      borderColor: expandedProjectDocs[String(proj.id)] ? theme.primaryHover : theme.border,
                    },
                  ]}
                  onPress={(e: any) => {
                    if (Platform.OS === 'web') {
                      e?.stopPropagation?.();
                    }
                    toggleProjectDoc(proj.id);
                  }}
                  activeOpacity={0.8}
                  {...(Platform.OS === 'web' ? { className: 'interactive-btn' } : {})}
                  accessibilityRole="button"
                  accessibilityLabel={`${expandedProjectDocs[String(proj.id)] ? 'Tutup' : 'Lihat'} dokumentasi proyek ${proj.title}`}
                >
                  <Ionicons
                    name={expandedProjectDocs[String(proj.id)] ? 'chevron-up-circle-outline' : 'camera-outline'}
                    size={14}
                    color={expandedProjectDocs[String(proj.id)] ? (theme.isDark ? '#25191D' : '#FFFFFF') : theme.primary}
                  />
                  <Text
                    style={[
                      styles.docToggleText,
                      {
                        color: expandedProjectDocs[String(proj.id)]
                          ? theme.isDark
                            ? '#25191D'
                            : '#FFFFFF'
                          : theme.heading,
                      },
                    ]}
                  >
                    {expandedProjectDocs[String(proj.id)] ? 'Tutup Dokumentasi' : 'Lihat Dokumentasi'}
                  </Text>
                  <Ionicons
                    name={expandedProjectDocs[String(proj.id)] ? 'chevron-up' : 'chevron-down'}
                    size={13}
                    color={expandedProjectDocs[String(proj.id)] ? (theme.isDark ? '#25191D' : '#FFFFFF') : theme.primary}
                  />
                </TouchableOpacity>

                {/* Foto Dokumentasi Proyek (Muncul saat tombol ditekan, sejajar border) */}
                {expandedProjectDocs[String(proj.id)] && (
                  <View
                    style={[
                      styles.projectPhotoWrapper,
                      {
                        backgroundColor: theme.surface,
                        borderColor: theme.border,
                      },
                    ]}
                  >
                    <Image
                      source={getProjectImageSource(proj)}
                      style={styles.projectPhotoImage}
                      resizeMode="cover"
                      {...(Platform.OS === 'web' ? ({ className: 'doc-gallery-img', loading: 'lazy' } as any) : {})}
                    />
                    <View style={[styles.projectPhotoTag, { backgroundColor: 'rgba(37, 25, 29, 0.85)' }]}>
                      <Ionicons name="camera-outline" size={12} color="#C17B88" />
                      <Text style={styles.projectPhotoTagText} numberOfLines={1}>
                        {proj.imageCaption || `Dokumentasi Proyek ${proj.title}`}
                      </Text>
                    </View>
                  </View>
                )}

                {/* Tech Pills */}
                <View style={styles.techPillsRow}>
                  {proj.technologies.slice(0, 3).map((tech, idx) => (
                    <View
                      key={idx}
                      style={[styles.techPill, { backgroundColor: theme.surface, borderColor: theme.border }]}
                    >
                      <Text style={[styles.techPillText, { color: theme.textSecondary }]}>
                        {tech}
                      </Text>
                    </View>
                  ))}
                  {proj.technologies.length > 3 && (
                    <View
                      style={[styles.techPill, { backgroundColor: theme.surface, borderColor: theme.border }]}
                    >
                      <Text style={[styles.techPillText, { color: theme.primary, fontWeight: '700' }]}>
                        +{proj.technologies.length - 3}
                      </Text>
                    </View>
                  )}
                </View>

                {/* View Details Link */}
                <View style={styles.detailLinkRow}>
                  <Text style={[styles.detailLinkText, { color: theme.primary }]}>
                    Detail Proyek
                  </Text>
                  <Ionicons name="arrow-forward" size={13} color={theme.primary} />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      )}

      {/* DETAIL MODAL POPUP */}
      <Modal
        visible={!!activeProject}
        transparent
        animationType="fade"
        onRequestClose={() => setActiveProject(null)}
      >
        <TouchableOpacity
          style={styles.modalBackdrop}
          activeOpacity={1}
          onPress={() => setActiveProject(null)}
        >
          <View
            style={[
              styles.modalCard,
              {
                backgroundColor: theme.surface,
                borderColor: theme.border,
              },
            ]}
            onStartShouldSetResponder={() => true}
          >
            {activeProject && (
              <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.modalContent}>
                {/* Modal Header */}
                <View style={styles.modalHeaderRow}>
                  <View style={[styles.cardIconBox, { backgroundColor: theme.surface2, borderColor: theme.border }]}>
                    <Ionicons name={getProjectIcon(activeProject)} size={22} color={theme.primary} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.modalTitle, { color: theme.heading }]}>
                      {activeProject.title}
                    </Text>
                    <Text style={[styles.modalRole, { color: theme.primary }]}>
                      {activeProject.role} • {activeProject.category} ({activeProject.year || '2025'})
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => setActiveProject(null)}
                    style={[styles.closeIconBtn, { backgroundColor: theme.surface2, borderColor: theme.border }]}
                  >
                    <Ionicons name="close" size={18} color={theme.heading} />
                  </TouchableOpacity>
                </View>

                {/* Banner Foto Dokumentasi Proyek di Dalam Modal */}
                <View
                  style={[
                    styles.modalImageWrapper,
                    {
                      backgroundColor: theme.surface2,
                      borderColor: theme.border,
                    },
                  ]}
                >
                  <Image
                    source={getProjectImageSource(activeProject)}
                    style={styles.modalProjectImage}
                    resizeMode="cover"
                  />
                  <View style={[styles.modalImageCaptionTag, { backgroundColor: 'rgba(37, 25, 29, 0.85)' }]}>
                    <Ionicons name="camera-outline" size={13} color="#C17B88" />
                    <Text style={styles.modalImageCaptionText} numberOfLines={1}>
                      {activeProject.imageCaption || `Dokumentasi ${activeProject.title}`}
                    </Text>
                  </View>
                </View>

                {/* Full Description */}
                <Text style={[styles.modalSectionHeading, { color: theme.heading }]}>
                  Tentang Proyek
                </Text>
                <Text style={[styles.modalDesc, { color: theme.textSecondary }]}>
                  {activeProject.fullDesc || activeProject.shortDesc}
                </Text>

                {/* Features List */}
                {activeProject.features && activeProject.features.length > 0 && (
                  <>
                    <Text style={[styles.modalSectionHeading, { color: theme.heading }]}>
                      Fitur & Capaian Utama
                    </Text>
                    <View style={styles.featuresList}>
                      {activeProject.features.map((feat, idx) => (
                        <View key={idx} style={styles.featureItemRow}>
                          <Ionicons name="checkmark-circle" size={15} color={theme.success} />
                          <Text style={[styles.featureText, { color: theme.textSecondary }]}>
                            {feat}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </>
                )}

                {/* Technologies */}
                <Text style={[styles.modalSectionHeading, { color: theme.heading }]}>
                  Teknologi & Lingkungan
                </Text>
                <View style={styles.modalTechGrid}>
                  {activeProject.technologies.map((t, idx) => (
                    <View
                      key={idx}
                      style={[styles.modalTechBadge, { backgroundColor: theme.surface2, borderColor: theme.border }]}
                    >
                      <Ionicons name="code-working-outline" size={13} color={theme.primary} />
                      <Text style={[styles.modalTechText, { color: theme.heading }]}>{t}</Text>
                    </View>
                  ))}
                </View>

                {/* Close Button */}
                <TouchableOpacity
                  style={[styles.modalCloseBtn, { backgroundColor: theme.primary }]}
                  onPress={() => setActiveProject(null)}
                >
                  <Text style={[styles.modalCloseBtnText, { color: theme.isDark ? '#25191D' : '#FFFFFF' }]}>
                    Tutup Detail
                  </Text>
                </TouchableOpacity>
              </ScrollView>
            )}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 18,
    borderWidth: 1.2,
    padding: 20,
    width: '100%',
    gap: 16,
    ...Platform.select({
      web: {
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.25)',
      } as any,
      default: {
        elevation: 3,
      },
    }),
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTextGroup: {
    flex: 1,
    gap: 2,
  },
  titleBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flexWrap: 'wrap',
  },
  sectionTitle: {
    fontFamily: FONTS.display,
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  badgePill: {
    paddingHorizontal: 8,
    paddingVertical: 2.5,
    borderRadius: 999,
    borderWidth: 1,
  },
  badgePillText: {
    fontFamily: FONTS.mono,
    fontSize: 10,
    fontWeight: '700',
  },
  sectionSubtitle: {
    fontFamily: FONTS.body,
    fontSize: 12.5,
  },
  filterControlsWrapper: {
    gap: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontFamily: FONTS.body,
    fontSize: 13,
    padding: 0,
    ...Platform.select({
      web: {
        outlineStyle: 'none' as any,
      },
    }),
  },
  categoryScroll: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 2,
  },
  categoryPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
  },
  categoryPillText: {
    fontSize: 11.5,
    fontFamily: FONTS.bodyMedium,
  },
  projectsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
  },
  projectCard: {
    width: '48.7%',
    borderRadius: 14,
    borderWidth: 1,
    padding: 16,
    gap: 10,
    ...Platform.select({
      web: {
        transition: 'transform 0.2s ease, border-color 0.2s ease' as any,
        cursor: 'pointer' as any,
      },
    }),
  },
  projectCardMobile: {
    width: '100%',
  },
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardIconBox: {
    width: 34,
    height: 34,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardMetaRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
  },
  categoryBadgeText: {
    fontFamily: FONTS.mono,
    fontSize: 10,
    fontWeight: '700',
  },
  yearText: {
    fontFamily: FONTS.mono,
    fontSize: 11,
  },
  projectTitle: {
    fontFamily: FONTS.display,
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 20,
  },
  projectRole: {
    fontFamily: FONTS.mono,
    fontSize: 11.5,
    fontWeight: '600',
  },
  projectDesc: {
    fontFamily: FONTS.body,
    fontSize: 12.5,
    lineHeight: 18,
  },
  techPillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
    marginTop: 2,
  },
  techPill: {
    paddingHorizontal: 7,
    paddingVertical: 2.5,
    borderRadius: 6,
    borderWidth: 1,
  },
  techPillText: {
    fontFamily: FONTS.mono,
    fontSize: 10.5,
  },
  detailLinkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 6,
  },
  detailLinkText: {
    fontFamily: FONTS.bold,
    fontSize: 12,
    fontWeight: '700',
  },
  emptyContainer: {
    padding: 30,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  emptyTitle: {
    fontFamily: FONTS.display,
    fontSize: 15,
    fontWeight: '700',
  },
  emptySub: {
    fontFamily: FONTS.body,
    fontSize: 12.5,
    textAlign: 'center',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(3, 7, 18, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalCard: {
    width: '100%',
    maxWidth: 540,
    maxHeight: '85%',
    borderRadius: 20,
    borderWidth: 1.5,
    padding: 22,
    ...Platform.select({
      web: {
        boxShadow: '0 20px 48px rgba(0, 0, 0, 0.5)',
      } as any,
    }),
  },
  modalContent: {
    gap: 14,
  },
  modalHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  modalTitle: {
    fontFamily: FONTS.display,
    fontSize: 17,
    fontWeight: '800',
  },
  modalRole: {
    fontFamily: FONTS.mono,
    fontSize: 11.5,
    marginTop: 2,
  },
  closeIconBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalSectionHeading: {
    fontFamily: FONTS.bold,
    fontSize: 13,
    fontWeight: '700',
    marginTop: 6,
  },
  modalDesc: {
    fontFamily: FONTS.body,
    fontSize: 13,
    lineHeight: 20,
  },
  featuresList: {
    gap: 8,
  },
  featureItemRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  featureText: {
    flex: 1,
    fontFamily: FONTS.body,
    fontSize: 12.5,
    lineHeight: 18,
  },
  modalTechGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  modalTechBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    gap: 5,
  },
  modalTechText: {
    fontFamily: FONTS.mono,
    fontSize: 11,
    fontWeight: '600',
  },
  modalCloseBtn: {
    marginTop: 10,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCloseBtnText: {
    fontFamily: FONTS.bold,
    fontSize: 13,
    fontWeight: '700',
  },
  docToggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 7,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 7,
    borderWidth: 1,
    marginTop: 8,
    marginBottom: 6,
    ...Platform.select({
      web: {
        cursor: 'pointer' as any,
        transition: 'all 0.2s ease' as any,
      },
    }),
  },
  docToggleText: {
    fontFamily: FONTS.medium,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.1,
  },
  projectPhotoWrapper: {
    width: '100%',
    height: 180,
    borderRadius: 9,
    borderWidth: 1,
    overflow: 'hidden',
    marginTop: 6,
    marginBottom: 8,
    position: 'relative',
  },
  projectPhotoImage: {
    width: '100%',
    height: '100%',
  },
  projectPhotoTag: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  projectPhotoTagText: {
    fontFamily: FONTS.mono,
    fontSize: 11,
    color: '#FBF6EF',
    flex: 1,
  },
  modalImageWrapper: {
    width: '100%',
    height: 240,
    borderRadius: 10,
    borderWidth: 1,
    overflow: 'hidden',
    marginTop: 14,
    marginBottom: 14,
    position: 'relative',
  },
  modalProjectImage: {
    width: '100%',
    height: '100%',
  },
  modalImageCaptionTag: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  modalImageCaptionText: {
    fontFamily: FONTS.mono,
    fontSize: 11.5,
    color: '#FBF6EF',
    flex: 1,
  },
});

