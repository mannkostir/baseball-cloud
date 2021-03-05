import { profilesService } from '@/services/profilesService';
import {
  BattingSummary,
  PlayerPosition,
  ProfileAnalysisInfo,
  ReactSelectOptions,
  Unpromise,
} from '@/types/commonTypes';
import React, { useEffect, useState } from 'react';
import { Field, Form, FormSpy } from 'react-final-form';
import Filters from '../Filters';
import StyledTable from '../StyledTable';
import { UserImage } from '../TopNav/TopNav.styled';

const gameTypes: Array<'Fastball' | 'Curveball' | 'Changeup' | 'Slider'> = [
  'Fastball',
  'Curveball',
  'Changeup',
  'Slider',
];

interface IProfileComparisonProps {
  playerData: ProfileAnalysisInfo;
  topValues: BattingSummary[];
}

const BattingValuesOptions: ReactSelectOptions<
  'exit_velocity' | 'launch_angle' | 'distance'
> = [
  { label: 'Exit Velocity', value: 'exit_velocity' },
  { label: 'Launch Angle', value: 'launch_angle' },
  { label: 'Distance', value: 'distance' },
];

const ProfileComparison = ({
  playerData,
  topValues,
}: IProfileComparisonProps) => {
  const [comparedProfile, setComparedProfile] = useState<Unpromise<
    ReturnType<typeof profilesService.getProfile>
  > | null>(null);
  const [selectedType, setSelectedType] = useState<
    'exit_velocity' | 'launch_angle' | 'distance'
  >('exit_velocity');

  const getProfileNames = async (query: { player_name: string }) => {
    try {
      const names = await profilesService.getProfileNames({
        player_name: query.player_name,
        position: playerData.position,
      });

      return names.map((data) => ({
        label: `${data.first_name} ${data.last_name}`,
        value: data.id,
      }));
    } catch (e) {
      throw e;
    }
  };

  const getProfile = async (id: string) => {
    try {
      const profile = await profilesService.getProfile({ id });

      setComparedProfile(profile);
    } catch (e) {
      throw e;
    }
  };

  const loadOptions = async (inputValue: string) => {
    return getProfileNames({ player_name: inputValue });
  };

  return (
    <div style={{ width: '100%' }}>
      <div
        style={{ display: 'flex', justifyContent: 'flex-start', width: '100%' }}
      >
        <div style={{ marginRight: '40px', flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <UserImage />
            <span>
              {playerData.first_name} {playerData.last_name}
            </span>
          </div>
          <div>
            <div>Age: {playerData.age}</div>
            <div>
              Height: {playerData.feet} ft {playerData.inches} in
            </div>
            <div>Weight: {playerData.weight} lbs</div>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <UserImage />
            <Form onSubmit={getProfileNames}>
              {(props) => (
                <form>
                  <Field name="player_name">
                    {(fieldProps) => (
                      <Filters.AsyncSelectInput
                        {...fieldProps}
                        placeholder="Enter player name"
                        loadOptions={loadOptions}
                        defaultOptions={true}
                        onChange={async (data: {
                          value: string;
                          label: string;
                        }) => {
                          if (!data || !data.value) return;

                          getProfile(data.value);

                          return data;
                        }}
                        onInputChange={(value: string) => {
                          if (!value) return '';
                          return value;
                        }}
                      />
                    )}
                  </Field>
                </form>
              )}
            </Form>
          </div>
          <div>Age: {comparedProfile?.age || '-'}</div>
          <div>
            Height:{' '}
            {comparedProfile?.feet && comparedProfile?.inches
              ? `${comparedProfile.feet} ft ${comparedProfile.inches} in`
              : '-'}
          </div>
          <div>Weight: {comparedProfile?.weight + ' lbs' || '-'}</div>
        </div>
      </div>
      <Form onSubmit={() => {}}>
        {(props) => (
          <form>
            <Field
              name="batting_values"
              component={Filters.SelectInput}
              initialValue={BattingValuesOptions[0]}
              options={BattingValuesOptions}
              onChange={(
                value: ReactSelectOptions<
                  'exit_velocity' | 'launch_angle' | 'distance'
                >[0]
              ) => {
                setSelectedType(value.value);
              }}
            />
          </form>
        )}
      </Form>
      <StyledTable>
        {gameTypes.map((type) => (
          <tr>
            <td>{type}</td>
            <td>
              {topValues.find((value) => value.pitch_type === type)?.[
                selectedType
              ] || '-'}
            </td>
            <td>
              {comparedProfile?.batting_top_values.find(
                (value) => value.pitch_type === type
              )?.[selectedType] || '-'}
            </td>
          </tr>
        ))}
      </StyledTable>
    </div>
  );
};

export default ProfileComparison;
