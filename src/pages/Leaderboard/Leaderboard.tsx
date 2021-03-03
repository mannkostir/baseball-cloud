import Filters from '@/components/Filters';
import LeadersTable from '@/components/LeadersTable';
import LoadingScreen from '@/components/LoadingScreen';
import TabButton from '@/components/TabButton';
import { leaderboardService } from '@/services/leaderboardService';
import { GetLeaderboardQuery } from '@/services/leaderboardService/leaderboardServiceTypes';
import { profilesService } from '@/services/profilesService';
import { useProfileService } from '@/services/profilesService/useProfileService';
import { notificationsActions } from '@/store/notifications';
import {
  FilterType,
  PlayerPosition,
  ReactSelectOptions,
  School,
  Unpromise,
} from '@/types/commonTypes';
import { parseFormValues } from '@/utils/parseFormValues';
import React, { useEffect, useState } from 'react';
import { Field, Form, FormSpy } from 'react-final-form';
import { useDispatch } from 'react-redux';
import Select from 'react-select';
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

const DateOptions: ReactSelectOptions<'all' | 'last_week' | 'last_month'> = [
  { value: 'all', label: 'All' },
  { value: 'last_week', label: 'Last Week' },
  { value: 'last_month', label: 'Last Month' },
];

const FavoriteOptions: ReactSelectOptions<1 | null> = [
  { value: null, label: 'All' },
  { value: 1, label: 'Favorite' },
];

const TypeOptions: ReactSelectOptions<FilterType> = [
  { value: 'exit_velocity', label: 'Exit Velocity' },
  { value: 'carry_distance', label: 'Carry Distance' },
];

const PositionOptions: ReactSelectOptions<PlayerPosition> = [
  { value: 'catcher', label: 'Catcher' },
  { value: 'first_base', label: 'First Base' },
  { value: 'second_base', label: 'Second Base' },
  { value: 'shortshop', label: 'Shortshop' },
  { value: 'third_base', label: 'Third Base' },
  { value: 'outfield', label: 'Outfield' },
  { value: 'pitcher', label: 'Pitcher' },
];

// type FormValues = {
//   date: 'last_week' | 'last_month';
//   school: string;
//   team: string;
//   position: PlayerPosition;
//   age: number;
//   favorite: 1;
//   type: FilterType;
// };

type FormValues = {
  [key: string]: { label: string; value: string } | string | number | any;
};

const Leaderboard = () => {
  const dispatch = useDispatch();

  const defaultQuery: GetLeaderboardQuery = {
    type: 'exit_velocity',
  };

  const [selectedMode, setSelectedMode] = useState<Mode>('batting');
  const [leaderboardItems, setLeaderboardItems] = useState<
    Unpromise<ReturnType<typeof leaderboardService.getLeaderboard>>
  >([]);
  const [query, setQuery] = useState<typeof defaultQuery>();
  const [isLoading, setIsLoading] = useState(false);

  const fetchLeaderboard = async (fetchQuery: Partial<typeof query>) => {
    try {
      setIsLoading(true);

      const leaders = await leaderboardService.getLeaderboard({
        ...defaultQuery,
        ...fetchQuery,
      });

      setLeaderboardItems(leaders);
    } catch (e) {
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (values: FormValues) => {
    const submitValues = parseFormValues(values);

    setQuery({ ...defaultQuery, ...submitValues });
    await fetchLeaderboard({ ...submitValues });
  };

  const { toggleMyHolyFavor } = useProfileService();

  const toggleFavor = async (id: number, isInFavor: boolean) => {
    await toggleMyHolyFavor(id, isInFavor);
    await fetchLeaderboard({ ...query });

    let message: string;

    if (isInFavor) {
      message = 'Removed from favorite';
    } else {
      message = 'Added to favorite';
    }

    dispatch(
      notificationsActions.addNotification({
        status: 'success',
        message,
      })
    );
  };

  return (
    <Container>
      <Header>
        <h2>Leaderboard</h2>
        <Form onSubmit={onSubmit}>
          {(props) => (
            <form
              style={{ display: 'flex', flex: 1, justifyContent: 'flex-end' }}
            >
              <Field
                name="date"
                placeholder="Date"
                options={DateOptions}
                component={Filters.SelectInput}
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
                options={PositionOptions}
              />
              <Field
                name="age"
                placeholder="Age"
                component={Filters.TextInput}
                parse={(value) => (+value > 0 ? +value : null)}
              />
              <Field
                name="favorite"
                placeholder="Favorite"
                component={Filters.SelectInput}
                options={FavoriteOptions}
              />
              <Field
                name="type"
                placeholder="Type"
                component={Filters.SelectInput}
                options={TypeOptions}
              />
              <FormSpy
                subscription={{ values: true }}
                onChange={(values: FormValues) => {
                  setTimeout(() => {
                    onSubmit(values);
                  }, 0);
                }}
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
          {isLoading ? (
            <LoadingScreen />
          ) : (
            <LeadersTable
              toggleFavorite={toggleFavor}
              leaderboardItems={leaderboardItems}
              isLoading={isLoading}
            />
          )}
        </div>
      </main>
    </Container>
  );
};

export default Leaderboard;
