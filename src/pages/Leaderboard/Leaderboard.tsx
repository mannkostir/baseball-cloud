import LeadersTable from '@/components/LeadersTable';
import TabButton from '@/components/TabButton';
import { leaderboardService } from '@/services/leaderboardService';
import { LeaderboardRecord } from '@/services/leaderboardService/leaderboardServiceTypes';
import React, { useEffect, useState } from 'react';
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
  const [leaderboardItems, setLeaderboardItems] = useState<LeaderboardRecord[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);

        const leaders = await leaderboardService.getLeaderboard({
          type: 'exit_velocity',
        });

        setLeaderboardItems(leaders);
      } catch (e) {
        throw e;
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

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
          <LeadersTable leaderboardItems={leaderboardItems} />
        </div>
      </main>
    </Container>
  );
};

export default Leaderboard;
