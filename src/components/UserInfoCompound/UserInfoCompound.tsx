import { profilesService } from '@/services/profilesService';
import {
  PlayerPosition,
  ReactSelectOptions,
  Unpromise,
} from '@/types/commonTypes';
import React, { useMemo } from 'react';
import { Field, FormRenderProps } from 'react-final-form';
import Icons from '../Icons';
import ProfileSidebar from '../ProfileSidebar';
import UserImage from '../UserImage';
import * as Styled from './UserInfoCompound.styles';

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
  { value: '', label: '-' },
  ...primaryPositionOptions,
];

const UserInfoCompound = () => {
  return <div></div>;
};

interface IUserInfoProps {
  onEditButtonClick?: () => void;
  profileData: Unpromise<ReturnType<typeof profilesService.getProfile>>;
}

const UserInfo = ({ onEditButtonClick, profileData }: IUserInfoProps) => {
  return (
    <Styled.Container>
      <Icons.Edit
        style={{
          position: 'absolute',
          right: '13px',
          top: '12px',
          padding: 0,
          cursor: 'pointer',
        }}
        onClick={() => {
          onEditButtonClick && onEditButtonClick();
        }}
      >
        Edit
      </Icons.Edit>
      <UserImage />
      <Styled.Username>{`${profileData.first_name} ${profileData.last_name}`}</Styled.Username>
      <Styled.Role>{profileData.position}</Styled.Role>
    </Styled.Container>
  );
};

interface IUserInfoEditFormProps {
  profileData: Unpromise<ReturnType<typeof profilesService.getProfile>>;
}

const UserInfoEditForm = ({ profileData }: IUserInfoEditFormProps) => {
  const defaultPrimaryPosition = useMemo(() => {
    return primaryPositionOptions.find(
      (position) => position.value === profileData.position
    );
  }, []);

  const defaultSecondaryPosition = useMemo(() => {
    return secondaryPositionOptions.find(
      (position) => position.value === profileData.position2
    );
  }, []);
  return (
    <>
      <ProfileSidebar.InlineInputsWrapper>
        <Field
          name="first_name"
          placeholder="First Name *"
          defaultValue={profileData.first_name}
        >
          {(inputProps) => (
            <ProfileSidebar.TextInput input={inputProps.input} />
          )}
        </Field>
        <Field
          name="last_name"
          placeholder="Last Name *"
          defaultValue={profileData.last_name}
          component={ProfileSidebar.TextInput}
        />
      </ProfileSidebar.InlineInputsWrapper>
      <Field
        name="position"
        placeholder={defaultPrimaryPosition?.label || 'Position in Game *'}
        component={ProfileSidebar.SelectInput}
        options={primaryPositionOptions}
      />
      <Field
        name="position2"
        placeholder={'Secondary Position in Game'}
        defaultValue={profileData.position2}
        component={ProfileSidebar.SelectInput}
        options={secondaryPositionOptions}
      />
    </>
  );
};

UserInfoCompound.UserInfo = UserInfo;
UserInfoCompound.EditForm = UserInfoEditForm;

export default UserInfoCompound;
