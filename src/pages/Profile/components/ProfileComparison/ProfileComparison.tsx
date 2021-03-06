import { profilesService } from '@/services/profilesService';
import {
  BattingSummary,
  FormValues,
  PlayerPosition,
  ProfileAnalysisInfo,
  ReactSelectOptions,
  Unpromise,
} from '@/types/commonTypes';
import React, { useEffect, useState } from 'react';
import { Field, Form, FormSpy, withTypes } from 'react-final-form';
import Filters from '@/components/Filters';
import StyledTable from '@/components/StyledTable';
import UserImage from '@/components/UserImage';
import { Select } from '@/components/FinalFormAdapters';

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

  const PlayerNameForm = withTypes<{
    ['player_name']: { label: string; value: string };
  }>();
  const ValuesTypeForm = withTypes<
    Record<'batting_values', typeof selectedType>
  >();

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
            <UserImage
              style={{
                width: '40px',
                height: '40px',
                margin: 0,
                marginRight: '8px',
              }}
            />
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
            <UserImage
              style={{
                width: '40px',
                height: '40px',
                margin: 0,
                marginRight: '8px',
              }}
            />
            <PlayerNameForm.Form onSubmit={() => {}}>
              {(props) => (
                <form>
                  <Field name="player_name">
                    {(fieldProps) => (
                      <Filters.AsyncSelectInput
                        {...fieldProps}
                        placeholder="Enter player name"
                        loadOptions={loadOptions}
                        defaultOptions={true}
                      />
                    )}
                  </Field>
                  <PlayerNameForm.FormSpy
                    subscription={{
                      values: true,
                      modifiedSinceLastSubmit: true,
                    }}
                    onChange={(formState) => {
                      if (!formState.values.player_name) return;

                      getProfile(formState.values.player_name.value);
                    }}
                  />
                </form>
              )}
            </PlayerNameForm.Form>
          </div>
          <div>Age: {comparedProfile?.age || '-'}</div>
          <div>
            Height:{' '}
            {comparedProfile?.feet && comparedProfile?.inches
              ? `${comparedProfile.feet} ft ${comparedProfile.inches} in`
              : '-'}
          </div>
          <div>
            Weight:{' '}
            {comparedProfile?.weight ? `${comparedProfile.weight} lbs` : '-'}
          </div>
        </div>
      </div>
      <ValuesTypeForm.Form onSubmit={() => {}}>
        {(props) => (
          <form>
            <Field name="batting_values" initialValue={BattingValuesOptions[0]}>
              {(fieldProps) => (
                <Select options={BattingValuesOptions} {...fieldProps} />
              )}
            </Field>
            <ValuesTypeForm.FormSpy
              subscription={{ values: true, modifiedSinceLastSubmit: true }}
              onChange={(formState) => {
                // To evade "cannot setState while rendering" warning
                // Basically delaying setState call until render is complete

                // Delay happens not because of some exact timeout time, but
                // because of how Event Loop works
                setTimeout(() => {
                  setSelectedType(formState.values.batting_values);
                }, 0);
              }}
            />
          </form>
        )}
      </ValuesTypeForm.Form>
      <StyledTable>
        <tbody>
          {gameTypes.map((type) => (
            <tr key={type}>
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
        </tbody>
      </StyledTable>
    </div>
  );
};

export default ProfileComparison;
