import { BattingSummary, ProfileAnalysisInfo } from '@/types/commonTypes';
import React from 'react';

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
  return <div></div>;
};

export default ProfileComparison;
