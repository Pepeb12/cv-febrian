/**
 * BRIDGE FILE: data/profileData.js (Level 6: Local JSON Data Integration)
 * 
 * Mengimpor langsung data dari file JSON lokal `data/profile.json`
 * sesuai spesifikasi Level 6, lalu mengekspornya kembali untuk menjamin
 * kompatibilitas penuh di seluruh arsitektur proyek.
 */

import profileJson from './profile.json';

export default profileJson;
export { profileJson as profileData, profileJson as STUDENT_PROFILE };
