import LeadersTable from '@/components/LeadersTable';
import TabButton from '@/components/TabButton';
import React, { useState } from 'react';
import styled from 'styled-components/macro';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Header = styled.header`
  padding: 16px;
  display: flex;
  justify-content: space-between;
`;

type Mode = 'batting' | 'pitching';

const Leaderboard = () => {
  const [selectedMode, setSelectedMode] = useState<Mode>('batting');

  return (
    <Container>
      <Header>
        <h2>Leaderboard</h2>
      </Header>
      <main>
        <div>
          <TabButton
            isSelected={selectedMode === 'batting'}
            onClick={() => setSelectedMode('batting')}
          >
            Batting
          </TabButton>
          <TabButton
            isSelected={selectedMode === 'pitching'}
            onClick={() => setSelectedMode('pitching')}
          >
            Pitching
          </TabButton>
        </div>
        <div>
          <LeadersTable />
        </div>
      </main>
    </Container>
  );
};

export default Leaderboard;
