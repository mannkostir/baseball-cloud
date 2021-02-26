import Filters from '@/components/Filters';
import LeadersTable from '@/components/LeadersTable';
import TabButton from '@/components/TabButton';
import { leaderboardService } from '@/services/leaderboardService';
import { LeaderboardRecord } from '@/services/leaderboardService/leaderboardServiceTypes';
import React, { useEffect, useState } from 'react';
import { Field, Form } from 'react-final-form';
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

const DateOptions = [
  { value: 'all', label: 'All' },
  { value: 'last_week', label: 'Last Week' },
  { value: 'last_month', label: 'Last Month' },
];

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
        <Form onSubmit={() => {}}>
          {(props) => (
            <form
              style={{ display: 'flex', flex: 1, justifyContent: 'flex-end' }}
            >
              <Field
                name="date"
                placeholder="Date"
                component={Filters.SelectInput}
                options={DateOptions}
              />
              <Field
                name="school"
                placeholder="School"
                component={Filters.TextInput}
              />
              <Field
                name="team"
                placeholder="Team"
                component={Filters.TextInput}
              />
              <Field
                name="position"
                placeholder="Position"
                component={Filters.SelectInput}
              />
              <Field
                name="age"
                placeholder="Age"
                component={Filters.TextInput}
              />
            </form>
          )}
        </Form>
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
