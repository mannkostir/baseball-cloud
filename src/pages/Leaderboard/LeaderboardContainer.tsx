import Container from '@/components/Container';
import Filters from '@/components/Filters';
import LeaderboardFilters from './components/LeaderboardFilters';
import LeadersTable from './components/LeadersTable';
import LoadingScreen from '@/components/LoadingScreen';
import LeaderPitchingTable from './components/PitchingLeadersTable';
import { GetLeaderboardQuery } from '@/services/leaderboardService/leaderboardServiceTypes';
import { useProfileService } from '@/services/profilesService/useProfileService';
import { notificationsActions } from '@/store/notifications';
import {
  FormValues,
  LeaderboardMode,
  ReactSelectOptions,
} from '@/types/commonTypes';
import { parseFormValues } from '@/utils/parseFormValues';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components/macro';
import { useLeaderboard } from './useLeaderboard';
import { TabButton } from '@/components/Buttons';
import { Field, Form } from 'react-final-form';
import { Select } from '@/components/FinalFormAdapters';

const Header = styled.header`
  padding: 16px;
  display: flex;
  justify-content: space-between;
`;

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

const Leaderboard = () => {
  const dispatch = useDispatch();

  const [query, setQuery] = useState<Partial<GetLeaderboardQuery>>();

  const [selectedMode, setSelectedMode] = useState<LeaderboardMode>('batting');

  const [selectedType, setSelectedType] = useState<
    'exit_velocity' | 'pitch_velocity' | 'carry_distance' | 'spin_rate'
  >(selectedMode === 'batting' ? 'exit_velocity' : 'pitch_velocity');

  const {
    fetchLeaderboard,
    leaderboardItems,
    leaderboardPitchingItems,
    isLoading,
  } = useLeaderboard();

  useEffect(() => {
    if (!query) return;

    fetchLeaderboard(query, selectedMode);
  }, [query]);

  const onFiltersChange = async (values: FormValues) => {
    const submitValues = parseFormValues(values);

    setQuery(submitValues);
  };

  const { toggleMyHolyFavor } = useProfileService();

  const toggleFavor = async (id: number, isInFavor: boolean) => {
    if (!query) return;

    await toggleMyHolyFavor(id, isInFavor);
    await fetchLeaderboard(query, selectedMode);

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

    setQuery((prevQuery) => ({ ...prevQuery, type }));
  };

  const changeType = async (
    type: 'exit_velocity' | 'pitch_velocity' | 'carry_distance' | 'spin_rate'
  ) => {
    setSelectedType(type);
    setQuery((prevQuery) => ({ ...prevQuery, type }));
  };

  return (
    <Container>
      <Header>
        <h2>Leaderboard</h2>
        <LeaderboardFilters onFiltersChange={onFiltersChange} />
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
          <Form onSubmit={() => {}}>
            {(props) => (
              <Field name="mode">
                {(fieldProps) => (
                  <Filters.SelectInput
                    {...fieldProps}
                    options={
                      selectedMode === 'batting'
                        ? [...BattingTypeOptions]
                        : [
                            {
                              value: 'pitch_velocity',
                              label: 'Pitch Velocity',
                            },
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
                )}
              </Field>
            )}
          </Form>
        </div>
        <div
          style={{
            padding: '0 20px',
            marginTop: '20px',
            minHeight: '436px',
          }}
        >
          {isLoading ? (
            <LoadingScreen style={{ minHeight: '436px' }} />
          ) : selectedMode === 'batting' ? (
            <div
              style={{
                padding: '0 20px',
                marginTop: '20px',
                marginBottom: '30px',
              }}
            >
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
