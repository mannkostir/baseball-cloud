import React, { useState } from 'react';
import Card from '../Card';
import TabButton from '../TabButton';
import * as Styled from './ProfileAnalysis.styles';

type ProfileTabs = 'batting' | 'sessionReports' | 'comparison';

const ProfileAnalysis = () => {
  const [selectedTab, setSelectedTab] = useState<ProfileTabs>('batting');

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
      <Styled.TabContent></Styled.TabContent>
    </Card>
  );
};

export default ProfileAnalysis;
