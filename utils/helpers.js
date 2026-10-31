/**
 * Production Utilities & Helper Functions
 * Personal CV & Academic Score App — LEVEL 10 (Industry)
 */

/**
 * Validasi alamat email menggunakan regex standar industri (RFC 5322 subset)
 * @param {string} email
 * @returns {boolean}
 */
export function validateEmail(email) {
  if (!email || typeof email !== 'string') return false;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email.trim());
}

/**
 * Validasi form kontak komprehensif
 * @param {string} name
 * @param {string} email
 * @param {string} message
 * @returns {{ isValid: boolean, errors: { name?: string, email?: string, message?: string } }}
 */
export function validateContactForm(name, email, message) {
  const errors = {};

  if (!name || !name.trim()) {
    errors.name = 'Nama lengkap wajib diisi.';
  } else if (name.trim().length < 2) {
    errors.name = 'Nama minimal 2 karakter.';
  }

  if (!email || !email.trim()) {
    errors.email = 'Alamat email wajib diisi.';
  } else if (!validateEmail(email)) {
    errors.email = 'Format email tidak valid (contoh: nama@domain.com).';
  }

  if (!message || !message.trim()) {
    errors.message = 'Pesan wajib diisi.';
  } else if (message.trim().length < 5) {
    errors.message = 'Pesan minimal 5 karakter.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Konversi nilai angka akademik ke predikat huruf (Grade)
 * @param {number} score
 * @returns {'A' | 'B' | 'C' | 'D' | 'E'}
 */
export function calculateGrade(score) {
  if (typeof score !== 'number' || isNaN(score)) return 'E';
  if (score >= 85) return 'A';
  if (score >= 75) return 'B';
  if (score >= 65) return 'C';
  if (score >= 50) return 'D';
  return 'E';
}

/**
 * Format angka ribuan ke standar Indonesia (contoh: 19000 -> 19.000 LP)
 * @param {number} points
 * @param {string} unit
 * @returns {string}
 */
export function formatLP(points, unit = 'LP') {
  if (typeof points !== 'number' || isNaN(points)) return `0 ${unit}`;
  return `${points.toLocaleString('id-ID')} ${unit}`;
}

/**
 * Hitung rata-rata progres capaian belajar
 * @param {Array<{ percentage: number }>} progressList
 * @returns {number}
 */
export function calculateOverallProgress(progressList) {
  if (!Array.isArray(progressList) || progressList.length === 0) return 0;
  const total = progressList.reduce((acc, curr) => acc + (curr.percentage || 0), 0);
  return Math.round(total / progressList.length);
}

/**
 * Helper pembuat prop Accessibility (a11y) standar industri
 * @param {string} label
 * @param {string} hint
 * @param {string} role
 */
export function createA11yProps(label, hint, role = 'button') {
  return {
    accessible: true,
    accessibilityLabel: label,
    accessibilityHint: hint,
    accessibilityRole: role,
  };
}
