import React from 'react';
import ProfileCard from './ProfileCard';

/**
 * ProfileHeader Component (Contoh Struktur Level 5)
 * Menerima data melalui Props: <ProfileHeader data={profileData} />
 */
export default function ProfileHeader({ data, profile }) {
  return <ProfileCard data={data || profile} />;
}

