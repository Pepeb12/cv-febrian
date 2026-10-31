import React from 'react';
import ProfileCard from './ProfileCard';

/**
 * ProfileHeader Component (Level 7: Theme & Data Props Supported)
 */
export default function ProfileHeader({ data, profile, theme }) {
  return <ProfileCard data={data || profile} theme={theme} />;
}
