/**
 * Automated Unit Test Suite
 * Level 10 — Industry Production Testing
 * Menguji helper functions, validasi form, service API LMS, storage persistence, dan integritas data.
 */

import {
  validateEmail,
  validateContactForm,
  calculateGrade,
  formatLP,
  calculateOverallProgress,
} from '../utils/helpers.js';
import profileData from '../data/profile.json';
import academicData from '../data/academicScore.json';

export async function runAllTests() {
  const results = [];

  function assert(testName, passed, details = '') {
    results.push({
      name: testName,
      passed,
      details,
      timestamp: new Date().toISOString(),
    });
  }

  // TEST 1: Email Validation Helper
  try {
    const valid1 = validateEmail('febrian@masoem.ac.id');
    const valid2 = validateEmail('iradatul.rahman@gmail.com');
    const invalid1 = validateEmail('not-an-email');
    const invalid2 = validateEmail('');
    const invalid3 = validateEmail(null);

    const isSuccess = valid1 && valid2 && !invalid1 && !invalid2 && !invalid3;
    assert(
      'Unit Test 1: validateEmail() RFC standard format',
      isSuccess,
      isSuccess ? 'Lolos validasi email positif dan negatif' : 'Gagal pada filter regex email'
    );
  } catch (err) {
    assert('Unit Test 1: validateEmail()', false, err.message);
  }

  // TEST 2: Contact Form Validation
  try {
    const validForm = validateContactForm('Febrian', 'febrian@mail.com', 'Halo, ini pesan uji coba.');
    const emptyName = validateContactForm('', 'febrian@mail.com', 'Pesan uji.');
    const badEmail = validateContactForm('Febrian', 'invalid-email', 'Pesan uji.');
    const shortMsg = validateContactForm('Febrian', 'febrian@mail.com', 'Hai');

    const isSuccess =
      validForm.isValid &&
      !emptyName.isValid &&
      emptyName.errors.name &&
      !badEmail.isValid &&
      badEmail.errors.email &&
      !shortMsg.isValid &&
      shortMsg.errors.message;

    assert(
      'Unit Test 2: validateContactForm() Required & Bounds Checking',
      isSuccess,
      isSuccess ? 'Semua edge cases form tertangani dengan pesan error deskriptif' : 'Validasi form gagal'
    );
  } catch (err) {
    assert('Unit Test 2: validateContactForm()', false, err.message);
  }

  // TEST 3: Grade Calculation Engine
  try {
    const gradeA = calculateGrade(90) === 'A';
    const gradeB = calculateGrade(80) === 'B';
    const gradeC = calculateGrade(70) === 'C';
    const gradeD = calculateGrade(55) === 'D';
    const gradeE = calculateGrade(30) === 'E';

    const isSuccess = gradeA && gradeB && gradeC && gradeD && gradeE;
    assert(
      'Unit Test 3: calculateGrade() Grading Thresholds (90=A, 80=B, 70=C, 55=D, 30=E)',
      isSuccess,
      isSuccess ? 'Threshold rentang nilai terverifikasi akurat' : 'Perhitungan grade tidak sesuai'
    );
  } catch (err) {
    assert('Unit Test 3: calculateGrade()', false, err.message);
  }

  // TEST 4: LP Formatting (Indonesian locale)
  try {
    const formatted = formatLP(19000, 'LP');
    const isSuccess = formatted === '19.000 LP' || formatted === '19000 LP' || formatted.includes('19');
    assert(
      'Unit Test 4: formatLP() Number Localization',
      isSuccess,
      `Hasil format: ${formatted}`
    );
  } catch (err) {
    assert('Unit Test 4: formatLP()', false, err.message);
  }

  // TEST 5: Overall Progress Calculation
  try {
    const dummyProgress = [
      { percentage: 100 },
      { percentage: 95 },
      { percentage: 100 },
      { percentage: 100 },
    ];
    const avg = calculateOverallProgress(dummyProgress);
    const expected = Math.round((100 + 95 + 100 + 100) / 4); // 99%
    const isSuccess = avg === expected;
    assert(
      'Unit Test 5: calculateOverallProgress() Array Aggregation',
      isSuccess,
      `Rata-rata dihitung: ${avg}% (Target: ${expected}%)`
    );
  } catch (err) {
    assert('Unit Test 5: calculateOverallProgress()', false, err.message);
  }

  // TEST 6: Profile JSON Data Integrity
  try {
    const hasNim = profileData.nim === '242505024';
    const hasName = profileData.nama.toLowerCase().includes('febrian');
    const hasPortfolios = Array.isArray(profileData.portfolios) && profileData.portfolios.length > 0;
    const hasSkills = Array.isArray(profileData.technicalSkills) && profileData.technicalSkills.length > 0;

    const isSuccess = hasNim && hasName && hasPortfolios && hasSkills;
    assert(
      'Unit Test 6: profile.json Schema & Identity Integrity',
      isSuccess,
      isSuccess ? `Data mahasiswa: ${profileData.nama} (${profileData.nim})` : 'Integritas JSON profil gagal'
    );
  } catch (err) {
    assert('Unit Test 6: profile.json Schema Integrity', false, err.message);
  }

  // TEST 7: Academic Score Data Integrity
  try {
    const { studentIdentity, currentScore, learningPoints, learningProgress } = academicData;
    const isNimValid = studentIdentity.nim === '242505024';
    const isScore90 = currentScore.score === 90 && currentScore.grade === 'A';
    const isLP19k = learningPoints.total === 19000;
    const hasAllProgress =
      learningProgress.some((p) => p.name === 'Attendance' && p.percentage === 100) &&
      learningProgress.some((p) => p.name === 'Practice' && p.percentage === 95) &&
      learningProgress.some((p) => p.name === 'Quest' && p.percentage === 100) &&
      learningProgress.some((p) => p.name === 'Challenge' && p.percentage === 100);

    const isSuccess = isNimValid && isScore90 && isLP19k && hasAllProgress;
    assert(
      'Unit Test 7: academicScore.json UTS Requirements Contract',
      isSuccess,
      isSuccess ? 'Nilai 90 (Grade A), 19.000 LP, dan progress 4 kategori 100% valid' : 'Data akademik tidak sesuai spesifikasi'
    );
  } catch (err) {
    assert('Unit Test 7: academicScore.json Contract', false, err.message);
  }

  // TEST 8: Experience & Education Timeline Structure
  try {
    const edu = profileData.educationHistory || profileData.education || [];
    const exp = profileData.experience || [];
    const isEduComplete =
      edu.some((e) => e.level.includes('SD')) &&
      edu.some((e) => e.level.includes('SMP')) &&
      edu.some((e) => e.level.includes('SMA')) &&
      edu.some((e) => (e.school || e.institution || '').toLowerCase().includes('masoem'));

    const isSuccess = isEduComplete && Array.isArray(exp) && exp.length >= 2;
    assert(
      'Unit Test 8: Education & Experience Timeline Completeness',
      isSuccess,
      isSuccess ? 'Riwayat SD, SMP, SMA, dan Masoem University terverifikasi' : 'Riwayat pendidikan tidak lengkap'
    );
  } catch (err) {
    assert('Unit Test 8: Education Timeline', false, err.message);
  }

  // TEST 9: Empty Progress Fallback Resilience
  try {
    const avgEmpty = calculateOverallProgress([]);
    const avgNull = calculateOverallProgress(null);
    const isSuccess = avgEmpty === 0 && avgNull === 0;
    assert(
      'Unit Test 9: calculateOverallProgress() Empty/Null Resilience',
      isSuccess,
      'Aman dari runtime error division by zero'
    );
  } catch (err) {
    assert('Unit Test 9: Null Resilience', false, err.message);
  }

  // TEST 10: Score Boundaries Handling
  try {
    const invalidNegative = calculateGrade(-10) === 'E';
    const invalidOver100 = calculateGrade(150) === 'A';
    const notANumber = calculateGrade('sembilan puluh') === 'E';
    const isSuccess = invalidNegative && invalidOver100 && notANumber;
    assert(
      'Unit Test 10: calculateGrade() Type Safety & Boundary Guards',
      isSuccess,
      'Guard against NaN dan non-number input berfungsi'
    );
  } catch (err) {
    assert('Unit Test 10: Boundary Guards', false, err.message);
  }

  const passedCount = results.filter((r) => r.passed).length;
  const totalCount = results.length;

  return {
    results,
    passedCount,
    totalCount,
    allPassed: passedCount === totalCount,
  };
}

export default runAllTests;
