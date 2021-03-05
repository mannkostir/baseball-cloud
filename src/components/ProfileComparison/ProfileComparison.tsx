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
import { UserImage } from '../TopNav/TopNav.styled';

interface IProfileComparisonProps {
  playerData: ProfileAnalysisInfo;
  summary: {
    average_values: BattingSummary[];
    top_values: BattingSummary[];
  };
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
  summary,
}: IProfileComparisonProps) => {
  const [comparedProfile, setComparedProfile] = useState<Unpromise<
    ReturnType<typeof profilesService.getProfile>
  > | null>(null);

  const getProfileNames = async (query: { player_name: string }) => {
    try {
      if (!query) return;

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
        <div style={{ marginRight: '40px', width: '150px' }}>
          <UserImage />
          <div>
            <span>
              {playerData.first_name} {playerData.last_name}
            </span>
            <div>Age: {playerData.age}</div>
            <div>
              Height: {playerData.feet} ft {playerData.inches} in
            </div>
            <div>Weight: {playerData.weight} lbs</div>
          </div>
        </div>
        <div style={{ width: '150px' }}>
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
                      onChange={async (data: {
                        value: string;
                        label: string;
                      }) => {
                        await getProfile(data.value);
                      }}
                    />
                  )}
                </Field>
              </form>
            )}
          </Form>
          <div>
            <span>
              {comparedProfile?.first_name} {comparedProfile?.last_name}
            </span>
          </div>
          <div>Age: {comparedProfile?.age || '-'}</div>
          <div>
            Height:{' '}
            {comparedProfile?.feet && comparedProfile?.inches
              ? `${comparedProfile.feet} ft ${comparedProfile.inches} in`
              : '-'}
          </div>
          <div>Weight: {comparedProfile?.weight || '-'}</div>
        </div>
      </div>
      <Form onSubmit={() => {}}>
        {(props) => (
          <form>
            <Field name="batting_values">
              {(fieldProps) => (
                <Filters.SelectInput
                  options={BattingValuesOptions}
                  {...fieldProps}
                />
              )}
            </Field>
          </form>
        )}
      </Form>
    </div>
  );
};

export default ProfileComparison;
