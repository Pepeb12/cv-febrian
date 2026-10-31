/**
 * Storage Service — Local Persistence Abstraction
 * Mengelola penyimpanan lokal preferensi pengguna (Tema, Draft, Bookmark, Endorsement)
 * Menggunakan AsyncStorage dengan fallback in-memory yang tangguh
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  THEME_MODE: '@app_theme_mode',
  ENDORSE_COUNT: '@app_endorse_count',
  FAVORITE_PROJECTS: '@app_favorite_projects',
  CONTACT_DRAFT: '@app_contact_draft',
  LAST_SYNC: '@app_last_sync',
};

// In-Memory Fallback Cache untuk testing dan lingkungan tanpa storage native
const memoryFallback = new Map();

export const StorageService = {
  /**
   * Simpan string/objek ke AsyncStorage
   */
  async setItem(key, value) {
    const serialized = typeof value === 'string' ? value : JSON.stringify(value);
    memoryFallback.set(key, serialized);
    try {
      await AsyncStorage.setItem(key, serialized);
      return true;
    } catch (error) {
      console.warn(`[StorageService] Gagal setItem ${key}:`, error);
      return false;
    }
  },

  /**
   * Ambil item dari AsyncStorage
   */
  async getItem(key, defaultValue = null) {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        memoryFallback.set(key, value);
        try {
          return JSON.parse(value);
        } catch {
          return value;
        }
      }
    } catch (error) {
      console.warn(`[StorageService] Gagal getItem ${key}:`, error);
    }

    // Coba fallback memori
    if (memoryFallback.has(key)) {
      const fallbackVal = memoryFallback.get(key);
      try {
        return JSON.parse(fallbackVal);
      } catch {
        return fallbackVal;
      }
    }

    return defaultValue;
  },

  /**
   * Hapus item dari AsyncStorage
   */
  async removeItem(key) {
    memoryFallback.delete(key);
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (error) {
      console.warn(`[StorageService] Gagal removeItem ${key}:`, error);
      return false;
    }
  },

  // ==========================================
  // METODE PREFERENSI TERTENTU (TYPED GETTERS/SETTERS)
  // ==========================================

  async getThemeMode() {
    return await this.getItem(STORAGE_KEYS.THEME_MODE, 'light');
  },

  async setThemeMode(mode) {
    return await this.setItem(STORAGE_KEYS.THEME_MODE, mode);
  },

  async getEndorseCount(fallback = 42) {
    const val = await this.getItem(STORAGE_KEYS.ENDORSE_COUNT, fallback);
    return typeof val === 'number' ? val : fallback;
  },

  async setEndorseCount(count) {
    return await this.setItem(STORAGE_KEYS.ENDORSE_COUNT, count);
  },

  async getFavoriteProjects() {
    return await this.getItem(STORAGE_KEYS.FAVORITE_PROJECTS, []);
  },

  async toggleFavoriteProject(projectId) {
    const current = await this.getFavoriteProjects();
    const updated = current.includes(projectId)
      ? current.filter((id) => id !== projectId)
      : [...current, projectId];
    await this.setItem(STORAGE_KEYS.FAVORITE_PROJECTS, updated);
    return updated;
  },

  async getContactDraft() {
    return await this.getItem(STORAGE_KEYS.CONTACT_DRAFT, { name: '', email: '', message: '' });
  },

  async saveContactDraft(draft) {
    return await this.setItem(STORAGE_KEYS.CONTACT_DRAFT, draft);
  },

  async clearContactDraft() {
    return await this.removeItem(STORAGE_KEYS.CONTACT_DRAFT);
  },

  async setLastSyncTime(timestamp = new Date().toISOString()) {
    return await this.setItem(STORAGE_KEYS.LAST_SYNC, timestamp);
  },

  async getLastSyncTime() {
    return await this.getItem(STORAGE_KEYS.LAST_SYNC, null);
  },
};

export default StorageService;
