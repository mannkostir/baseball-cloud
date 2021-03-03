import Filters from '@/components/Filters';
import LeadersTable from '@/components/LeadersTable';
import LoadingScreen from '@/components/LoadingScreen';
import LeaderPitchingTable from '@/components/PitchingLeadersTable';
import ProfileSidebar from '@/components/ProfileSidebar';
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

const PositionOptions: ReactSelectOptions<PlayerPosition | null> = [
  { value: null, label: 'All' },
  { value: 'catcher', label: 'Catcher' },
  { value: 'first_base', label: 'First Base' },
  { value: 'second_base', label: 'Second Base' },
  { value: 'shortshop', label: 'Shortshop' },
  { value: 'third_base', label: 'Third Base' },
  { value: 'outfield', label: 'Outfield' },
  { value: 'pitcher', label: 'Pitcher' },
];

const BattingTypeOptions: ReactSelectOptions<
  'exit_velocity' | 'carry_distance'
> = [
  { value: 'exit_velocity', label: 'Exit Velocity' },
  { value: 'carry_distance', label: 'Carry Distance' },
];

const PitchingTypeOptions: ReactSelectOptions<
  'pitch_velocity' | 'spin_rate'
> = [
  { value: 'pitch_velocity', label: 'Pitch Velocity' },
  { value: 'spin_rate', label: 'Spin Rate' },
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

let timeout: number | null;

type FormValues = {
  [key: string]: { label: string; value: string } | string | number | any;
};

const Leaderboard = () => {
  const dispatch = useDispatch();

  const defaultQuery: GetLeaderboardQuery = {
    type: 'exit_velocity',
  };
  const defaultPitchingQuery: GetLeaderboardQuery = {
    type: 'pitch_velocity',
  };

  const [selectedMode, setSelectedMode] = useState<Mode>('batting');

  const [selectedType, setSelectedType] = useState<
    'exit_velocity' | 'pitch_velocity' | 'carry_distance' | 'spin_rate'
  >(selectedMode === 'batting' ? 'exit_velocity' : 'pitch_velocity');

  const [leaderboardItems, setLeaderboardItems] = useState<
    Unpromise<ReturnType<typeof leaderboardService.getLeaderboard>>
  >([]);
  const [leaderboardPitchingItems, setLeaderboardPitchingItems] = useState<
    Unpromise<ReturnType<typeof leaderboardService.getPitchingLeaderboard>>
  >([]);
  const [query, setQuery] = useState<typeof defaultQuery>();
  const [isLoading, setIsLoading] = useState(false);

  const fetchLeaderboard = async (
    fetchQuery: Partial<typeof query>,
    mode: typeof selectedMode = selectedMode
  ) => {
    try {
      setIsLoading(true);

      if (mode === 'batting') {
        const leaders = await leaderboardService.getLeaderboard({
          ...defaultQuery,
          ...fetchQuery,
        });

        setLeaderboardItems(leaders);
      } else {
        const leaders = await leaderboardService.getPitchingLeaderboard({
          ...defaultPitchingQuery,
          ...fetchQuery,
        });

        setLeaderboardPitchingItems(leaders);
      }
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

  const changeMode = async (mode: typeof selectedMode) => {
    setSelectedMode(mode);
    const type = mode === 'batting' ? 'exit_velocity' : 'pitch_velocity';

    setSelectedType(type);

    await fetchLeaderboard(
      {
        ...query,
        type,
      },
      mode
    );
  };

  const changeType = async (
    type: 'exit_velocity' | 'pitch_velocity' | 'carry_distance' | 'spin_rate'
  ) => {
    setSelectedType(type);
    await fetchLeaderboard({ ...query, type });
  };

  return (
    <Container>
      <Header>
        <h2>Leaderboard</h2>
        <div style={{ paddingRight: '40px' }}>
          <Form onSubmit={() => {}}>
            {(props) => (
              <form
                style={{ display: 'flex', flex: 1, justifyContent: 'flex-end' }}
              >
                <Field
                  name="date"
                  placeholder="Date"
                  options={DateOptions}
                  component={Filters.SelectInput}
                  initialValue={DateOptions[0]}
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
                  initialValue={PositionOptions[0]}
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
                  initialValue={FavoriteOptions[0]}
                />
                <FormSpy
                  subscription={{ values: true }}
                  onChange={(values: FormValues) => {
                    if (timeout) return;
                    timeout = window.setTimeout(async () => {
                      timeout = null;
                      await onSubmit(values);
                    }, 0);
                  }}
                />
              </form>
            )}
          </Form>
        </div>
      </Header>
      <main>
        <div
          style={{
            justifyContent: 'space-between',
            display: 'flex',
            paddingRight: '40px',
            width: '100%',
          }}
        >
          <div>
            <TabButton
              isSelected={selectedMode === 'batting'}
              onClick={() => changeMode('batting')}
            >
              Batting
            </TabButton>
            <TabButton
              isSelected={selectedMode === 'pitching'}
              onClick={() => changeMode('pitching')}
            >
              Pitching
            </TabButton>
          </div>
          <Filters.SelectInput
            input={{}}
            options={
              selectedMode === 'batting'
                ? [...BattingTypeOptions]
                : [
                    { value: 'pitch_velocity', label: 'Pitch Velocity' },
                    { value: 'spin_rate', label: 'Spin Rate' },
                  ]
            }
            onChange={(value: any) =>
              changeType(value?.value || 'pitch_velocity')
            }
            value={
              selectedMode === 'batting'
                ? BattingTypeOptions.find(
                    (option) => option.value === selectedType
                  )
                : PitchingTypeOptions.find(
                    (option) => option.value === selectedType
                  )
            }
          />
        </div>
        <div>
          {isLoading ? (
            <LoadingScreen />
          ) : selectedMode === 'batting' ? (
            <div style={{ padding: '0 20px', marginTop: '20px' }}>
              <LeadersTable
                type={selectedMode}
                toggleFavorite={toggleFavor}
                leaderboardItems={leaderboardItems}
                isLoading={isLoading}
              />
            </div>
          ) : (
            <>
              <LeaderPitchingTable
                leaderboardItems={leaderboardPitchingItems}
                toggleFavorite={toggleFavor}
              />
            </>
          )}
        </div>
      </main>
    </Container>
  );
};

export default Leaderboard;
