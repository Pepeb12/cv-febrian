import React from 'react';
import ProfileCard from './ProfileCard';
import { StudentProfile, ThemeColors } from '../types';

interface ProfileHeaderProps {
  data?: StudentProfile | any;
  profile?: StudentProfile | any;
  theme?: ThemeColors | any;
  onExploreScore?: () => void;
  onContactClick?: () => void;
}

/**
 * ProfileHeader Component (Level 10: TSX Supported)
 */
export default function ProfileHeader({
  data,
  profile,
  theme,
  onExploreScore,
  onContactClick,
}: ProfileHeaderProps) {
  return (
    <ProfileCard
      data={data || profile}
      theme={theme}
      onExploreScore={onExploreScore}
      onContactClick={onContactClick}
    />
  );
}
