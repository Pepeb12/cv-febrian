/**
 * Academic & LMS API Service (Mock API Architecture)
 * Mensimulasikan konsumsi REST API Academic War LMS dengan latensi jaringan nyata,
 * penanganan status error (503/404), empty state, serta POST submit feedback.
 */

import rawProfileData from '../data/profil.json';
import rawAcademicData from '../data/nilaiAkademik.json';

// Kelas Custom Error untuk penanganan error standar industri
export class ApiError extends Error {
  constructor(status, message, details = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
    this.timestamp = new Date().toISOString();
  }
}

// Helper simulasi network latency
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const AcademicService = {
  /**
   * Mengambil data capaian akademik dari LMS
   * @param {{ forceError?: boolean, forceEmpty?: boolean, delayMs?: number }} options
   */
  async fetchAcademicScore(options = {}) {
    const { forceError = false, forceEmpty = false, delayMs = 600 } = options;

    // 1. Simulasi network delay
    await sleep(delayMs);

    // 2. Simulasi penanganan kondisi error jaringan / server 503
    if (forceError) {
      throw new ApiError(
        503,
        'LMS Academic War API tidak merespons (503 Service Unavailable). Server sedang dalam pemeliharaan.',
        { endpoint: '/api/v1/academic/scores/242505024' }
      );
    }

    // 3. Simulasi penanganan kondisi data kosong (Empty State)
    if (forceEmpty) {
      return {
        studentIdentity: {
          ...rawAcademicData.studentIdentity,
        },
        currentScore: {
          score: 0,
          grade: '-',
          status: 'Belum Ada Penilaian',
          keterangan: 'Belum ada data nilai yang terinput untuk semester ini.',
        },
        learningPoints: {
          total: 0,
          unit: 'LP',
          rank: 'Novice Student',
          nextMilestone: 1000,
        },
        learningProgress: [],
      };
    }

    // 4. Data normal (berhasil)
    return JSON.parse(JSON.stringify(rawAcademicData));
  },

  /**
   * Mengambil data profil dan portofolio
   * @param {{ forceError?: boolean, forceEmpty?: boolean, delayMs?: number }} options
   */
  async fetchProfileData(options = {}) {
    const { forceError = false, forceEmpty = false, delayMs = 500 } = options;

    await sleep(delayMs);

    if (forceError) {
      throw new ApiError(500, 'Gagal memuat data profil pengguna. Silakan coba lagi.');
    }

    if (forceEmpty) {
      return {
        ...rawProfileData,
        portfolios: [],
        experience: [],
        technicalSkills: [],
      };
    }

    return JSON.parse(JSON.stringify(rawProfileData));
  },

  /**
   * Simulasi pengiriman pesan kontak via API POST
   * @param {{ name: string, email: string, message: string }} payload
   */
  async submitContactMessage(payload) {
    await sleep(750);

    if (!payload.name || !payload.email || !payload.message) {
      throw new ApiError(400, 'Field nama, email, dan pesan tidak boleh kosong.');
    }

    const receiptId = `MSG-${Date.now().toString(36).toUpperCase()}`;

    return {
      success: true,
      receiptId,
      message: `Pesan dari ${payload.name} berhasil diterima oleh server mock.`,
      timestamp: new Date().toISOString(),
      payload,
    };
  },

  /**
   * Health-check status koneksi LMS
   */
  async checkLmsStatus() {
    await sleep(250);
    return {
      status: 'ONLINE',
      latency: '42ms',
      version: 'v2.4.0-production',
      lmsProvider: 'Academic War LMS Masoem University',
    };
  },
};

export default AcademicService;

