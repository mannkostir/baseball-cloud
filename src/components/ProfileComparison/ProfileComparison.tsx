import { profilesService } from '@/services/profilesService';
import {
  BattingSummary,
  ProfileAnalysisInfo,
  Unpromise,
} from '@/types/commonTypes';
import React, { useState } from 'react';
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
  const [profileNames, setProfileNames] = useState<
    Unpromise<ReturnType<typeof profilesService.getProfileNames>>
  >([]);
  const [comparedProfile, setComparedProfile] = useState<Unpromise<
    ReturnType<typeof profilesService.getProfile>
  > | null>(null);

  return (
    <div>
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
      <div>
        <UserImage />
        <div>{}</div>
      </div>
    </div>
  );
};

export default ProfileComparison;
