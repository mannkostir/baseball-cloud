import { profilesService } from '@/services/profilesService';
import {
  PlayerPosition,
  ReactSelectOptions,
  Unpromise,
} from '@/types/commonTypes';
import React, { useMemo } from 'react';
import { Field, FormRenderProps } from 'react-final-form';
import Icons from '@/components/Icons';
import ProfileSidebar from '@/components/ProfileSidebar';
import UserImage from '@/components/UserImage';
import * as Styled from './UserInfoCompound.styles';
import { Input, Select } from '@/components/FinalFormAdapters';

const primaryPositionOptions: ReactSelectOptions<PlayerPosition> = [
  { value: 'catcher', label: 'Catcher' },
  { value: 'first_base', label: 'First Base' },
  { value: 'second_base', label: 'Second Base' },
  { value: 'shortshop', label: 'Shortshop' },
  { value: 'third_base', label: 'Third Base' },
  { value: 'outfield', label: 'Outfield' },
  { value: 'pitcher', label: 'Pitcher' },
];

const secondaryPositionOptions: ReactSelectOptions<PlayerPosition | ''> = [
  { value: '', label: '-', allowFalsy: true },
  ...primaryPositionOptions,
];

const UserInfoCompound = () => {
  return <div></div>;
};

interface IUserInfoProps {
  profileData: Unpromise<ReturnType<typeof profilesService.getProfile>>;
}

const UserInfo = ({ profileData }: IUserInfoProps) => {
  return (
    <Styled.Container>
      <UserImage />
      <Styled.Username>{`${profileData.first_name} ${profileData.last_name}`}</Styled.Username>
      <Styled.Role>
        {
          primaryPositionOptions.find(
            (option) => option.value === profileData.position
          )?.label
        }
      </Styled.Role>
      <Styled.Role>
        {
          secondaryPositionOptions.find(
            (option) => option.value === profileData.position2
          )?.label
        }
      </Styled.Role>
    </Styled.Container>
  );
};

interface IUserInfoEditFormProps {
  profileData: Unpromise<ReturnType<typeof profilesService.getProfile>>;
}

const UserInfoEditForm = ({ profileData }: IUserInfoEditFormProps) => {
  const initialPrimaryPosition = useMemo(() => {
    return primaryPositionOptions.find(
      (position) => position.value === profileData.position
    );
  }, []);

  const initialSecondaryPosition = useMemo(() => {
    return secondaryPositionOptions.find(
      (position) => position.value === profileData.position2
    );
  }, []);
  return (
    <>
      <ProfileSidebar.InlineInputsWrapper>
        <Field name="first_name" initialValue={profileData.first_name}>
          {(fieldProps) => <Input {...fieldProps} placeholder="First Name *" />}
        </Field>
        <Field name="last_name" initialValue={profileData.last_name}>
          {(fieldProps) => <Input {...fieldProps} placeholder="Last Name *" />}
        </Field>
      </ProfileSidebar.InlineInputsWrapper>
      <Field name="position" initialValue={initialPrimaryPosition}>
        {(fieldProps) => (
          <Select
            {...fieldProps}
            options={primaryPositionOptions}
            placeholder="Position in Game *"
          />
        )}
      </Field>
      <Field name="position2" initialValue={initialSecondaryPosition}>
        {(fieldProps) => (
          <Select
            {...fieldProps}
            options={secondaryPositionOptions}
            placeholder="Secondary Position in Game *"
          />
        )}
      </Field>
    </>
  );
};

UserInfoCompound.UserInfo = UserInfo;
UserInfoCompound.EditForm = UserInfoEditForm;

export default UserInfoCompound;
