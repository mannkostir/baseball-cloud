import { BattingSummary, ProfileAnalysisInfo } from '@/types/commonTypes';
import React from 'react';
import { UserImage } from '../TopNav/TopNav.styled';

interface IProfileComparisonProps {
  playerData: ProfileAnalysisInfo;
  summary: {
    average_values: BattingSummary[];
    top_values: BattingSummary[];
  };
}

const ProfileComparison = ({
  playerData,
  summary,
}: IProfileComparisonProps) => {
  return (
    <div>
      <UserImage />
      <div>
        <span>
          {playerData.first_name} {playerData.last_name}
        </span>
        <div>Age: {playerData.age}</div>
        <div>
          Height: {playerData.feet} ft {playerData.inches} in
        </div>
        <div>Weight: {playerData.weight} lbs</div>
      </div>
    </div>
  );
};

export default ProfileComparison;
