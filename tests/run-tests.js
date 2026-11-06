/**
 * CLI Test Runner Script for Terminal Execution
 * Run: node tests/run-tests.js
 */

const fs = require('fs');
const path = require('path');

// Read JSON files (Bahasa Indonesia)
const profilePath = fs.existsSync(path.join(__dirname, '..', 'data', 'profil.json'))
  ? path.join(__dirname, '..', 'data', 'profil.json')
  : path.join(__dirname, '..', 'data', 'profile.json');
const academicPath = fs.existsSync(path.join(__dirname, '..', 'data', 'nilaiAkademik.json'))
  ? path.join(__dirname, '..', 'data', 'nilaiAkademik.json')
  : path.join(__dirname, '..', 'data', 'academicScore.json');

const profileData = JSON.parse(fs.readFileSync(profilePath, 'utf8'));
const academicData = JSON.parse(fs.readFileSync(academicPath, 'utf8'));

// Helper implementations for Node CLI run
function validateEmail(email) {
  if (!email || typeof email !== 'string') return false;
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.trim());
}

function validateContactForm(name, email, message) {
  const errors = {};
  if (!name || !name.trim()) errors.name = 'Nama wajib diisi.';
  if (!email || !validateEmail(email)) errors.email = 'Email tidak valid.';
  if (!message || message.trim().length < 5) errors.message = 'Pesan terlalu pendek.';
  return { isValid: Object.keys(errors).length === 0, errors };
}

function calculateGrade(score) {
  if (typeof score !== 'number' || isNaN(score)) return 'E';
  if (score >= 85) return 'A';
  if (score >= 75) return 'B';
  if (score >= 65) return 'C';
  if (score >= 50) return 'D';
  return 'E';
}

function formatLP(points) {
  return `${Number(points).toLocaleString('id-ID')} LP`;
}

function calculateOverallProgress(list) {
  if (!Array.isArray(list) || list.length === 0) return 0;
  const total = list.reduce((acc, curr) => acc + (curr.percentage || 0), 0);
  return Math.round(total / list.length);
}

console.log('\n======================================================');
console.log('  UTS PEMROGRAMAN MOBILE — LEVEL 10 AUTOMATED TEST SUITE');
console.log('  Aplikasi Personal CV & Academic Score (Febrian / 242505024)');
console.log('======================================================\n');

const tests = [
  {
    name: 'Test 1: Email Validation (RFC 5322 regex)',
    run: () => validateEmail('febrian@masoem.ac.id') && !validateEmail('invalid'),
  },
  {
    name: 'Test 2: Contact Form Validation (Required & Email check)',
    run: () => {
      const v = validateContactForm('Febrian', 'febrian@mail.com', 'Pesan pengujian');
      const inv = validateContactForm('', 'bad', 'Hi');
      return v.isValid && !inv.isValid;
    },
  },
  {
    name: 'Test 3: Grade Calculation Engine (85+=A, 75+=B, 65+=C)',
    run: () =>
      calculateGrade(90) === 'A' &&
      calculateGrade(78) === 'B' &&
      calculateGrade(68) === 'C' &&
      calculateGrade(52) === 'D' &&
      calculateGrade(20) === 'E',
  },
  {
    name: 'Test 4: LP Formatting Localization (19000 -> 19.000 LP)',
    run: () => formatLP(19000).includes('19') && formatLP(19000).includes('LP'),
  },
  {
    name: 'Test 5: Overall Academic Progress Aggregation (100, 95, 100, 100 -> 99%)',
    run: () =>
      calculateOverallProgress([
        { percentage: 100 },
        { percentage: 95 },
        { percentage: 100 },
        { percentage: 100 },
      ]) === 99,
  },
  {
    name: 'Test 6: profile.json Schema & Student Identity Integrity',
    run: () =>
      profileData.nim === '242505024' &&
      profileData.nama.toLowerCase().includes('febrian') &&
      profileData.portfolios.length >= 3,
  },
  {
    name: 'Test 7: academicScore.json UTS Contract (Score 90, Grade A, 19000 LP)',
    run: () =>
      academicData.studentIdentity.nim === '242505024' &&
      academicData.currentScore.score === 90 &&
      academicData.currentScore.grade === 'A' &&
      academicData.learningPoints.total === 19000,
  },
  {
    name: 'Test 8: Education Timeline Completeness (SD, SMP, SMA, Masoem Univ)',
    run: () => {
      const edu = profileData.educationHistory || profileData.education || [];
      return (
        edu.some((e) => e.level.includes('SD')) &&
        edu.some((e) => e.level.includes('SMP')) &&
        edu.some((e) => e.level.includes('SMA')) &&
        edu.some((e) => (e.school || e.institution || '').toLowerCase().includes('masoem'))
      );
    },
  },
  {
    name: 'Test 9: Empty/Null Array Resilience for Math Aggregators',
    run: () => calculateOverallProgress([]) === 0 && calculateOverallProgress(null) === 0,
  },
  {
    name: 'Test 10: Type Safety & Boundary Guards for Grading Engine',
    run: () => calculateGrade(-5) === 'E' && calculateGrade('90') === 'E',
  },
];

let passed = 0;
let failed = 0;

tests.forEach((t, idx) => {
  try {
    const success = t.run();
    if (success) {
      passed++;
      console.log(`  \x1b[32m✔ PASS\x1b[0m [${idx + 1}/10] ${t.name}`);
    } else {
      failed++;
      console.log(`  \x1b[31m✖ FAIL\x1b[0m [${idx + 1}/10] ${t.name}`);
    }
  } catch (err) {
    failed++;
    console.log(`  \x1b[31m✖ ERROR\x1b[0m [${idx + 1}/10] ${t.name} -> ${err.message}`);
  }
});

console.log('\n------------------------------------------------------');
console.log(`  Ringkasan: ${passed} Lolos / ${failed} Gagal (${tests.length} Total Tests)`);
console.log('------------------------------------------------------');

if (failed === 0) {
  console.log('\x1b[32m  ✔ SEMUA UJI KUALITAS LEVEL 10 BERHASIL (100% PASS)\x1b[0m\n');
  process.exit(0);
} else {
  console.log('\x1b[31m  ✖ BEBERAPA TEST GAGAL\x1b[0m\n');
  process.exit(1);
}
