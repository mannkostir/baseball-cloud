import { profilesAPI } from '@/api/profiles';
import { BattingSummary, Unpromise } from '@/types/commonTypes';
import React, { useState } from 'react';
import BattingValues from '../BattingValues';
import Card from '@/components/Card';
import ProfileComparison from '../ProfileComparison';
import * as Styled from './ProfileAnalysis.styles';
import { TabButton } from '@/components/Buttons';
import Sessions from '../Sessions';
import { useMount } from '@/hooks/useMount';
import axios from 'axios';

type ProfileTabs = 'batting' | 'sessionReports' | 'comparison';

interface IProfileAnalysisProps {
  profileData: Unpromise<ReturnType<typeof profilesAPI.getProfile>>;
}

const ProfileAnalysis = ({ profileData }: IProfileAnalysisProps) => {
  const [selectedTab, setSelectedTab] = useState<ProfileTabs>('batting');

  const [battingSummary, setBattingSummary] = useState<{
    average_values: BattingSummary[];
    top_values: BattingSummary[];
  }>();

  useMount(() => {
    const source = axios.CancelToken.source();

    (async () => {
      try {
        const data = await profilesAPI.getBattingSummary({
          id: profileData.id,
          cancelToken: source.token,
        });

        setBattingSummary(data);
      } catch (e) {
        if (e.message) throw e;
      }
    })();

    return () => {
      source.cancel();
    };
  });

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
        {selectedTab === 'sessionReports' && battingSummary && (
          <Sessions
            events={profileData.recent_events}
            profile_id={profileData.id}
          />
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
