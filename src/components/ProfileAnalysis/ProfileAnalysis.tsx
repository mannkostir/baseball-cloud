import { profilesService } from '@/services/profilesService';
import { BattingSummary, ProfileAnalysisInfo } from '@/types/commonTypes';
import React, { useEffect, useState } from 'react';
import BattingValues from '../BattingValues';
import Card from '../Card';
import ProfileComparison from '../ProfileComparison';
import TabButton from '../TabButton';
import * as Styled from './ProfileAnalysis.styles';

type ProfileTabs = 'batting' | 'sessionReports' | 'comparison';

interface IProfileAnalysisProps {
  profileData: ProfileAnalysisInfo;
}

const ProfileAnalysis = ({ profileData }: IProfileAnalysisProps) => {
  const [selectedTab, setSelectedTab] = useState<ProfileTabs>('batting');

  const [battingSummary, setBattingSummary] = useState<{
    average_values: BattingSummary[];
    top_values: BattingSummary[];
  }>();

  useEffect(() => {
    (async () => {
      const data = await profilesService.getBattingSummary({
        id: profileData.id,
      });

      setBattingSummary(data);
    })();
  }, []);

  return (
    <Card>
      <Styled.ProfileTabsList>
        <li>
          <TabButton
            isSelected={selectedTab === 'batting'}
            onClick={() => setSelectedTab('batting')}
          >
            Batting
          </TabButton>
        </li>
        <li>
          <TabButton
            isSelected={selectedTab === 'sessionReports'}
            onClick={() => setSelectedTab('sessionReports')}
          >
            Session Reports
          </TabButton>
        </li>
        <li>
          <TabButton
            isSelected={selectedTab === 'comparison'}
            onClick={() => setSelectedTab('comparison')}
          >
            Comparison
          </TabButton>
        </li>
      </Styled.ProfileTabsList>
      <Styled.TabContent>
        {selectedTab === 'batting' && battingSummary && (
          <BattingValues battingSummary={battingSummary} />
        )}
        {selectedTab === 'comparison' && battingSummary && (
          <ProfileComparison
            playerData={profileData}
            topValues={battingSummary.top_values}
          />
        )}
      </Styled.TabContent>
    </Card>
  );
};

export default ProfileAnalysis;
