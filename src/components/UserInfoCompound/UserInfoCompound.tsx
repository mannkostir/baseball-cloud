import { ExtendedProfileRecord } from '@/services/profilesService/profileServiceTypes';
import { PlayerPosition } from '@/types/commonTypes';
import React from 'react';
import { Field, FormRenderProps } from 'react-final-form';
import ProfileSidebar from '../ProfileSidebar';
import { UserImage } from '../TopNav/TopNav.styled';
import * as Styled from './UserInfoCompound.styles';

interface IPositionOptionsTypes
  extends Array<{ value: PlayerPosition; label: string }> {}
interface ISecondaryPositionOptionsTypes
  extends Array<{ value: PlayerPosition | null; label: string }> {}

const primaryPositionOptions: IPositionOptionsTypes = [
  { value: 'catcher', label: 'Catcher' },
  { value: 'first_base', label: 'First Base' },
  { value: 'second_base', label: 'Second Base' },
  { value: 'shortshop', label: 'Shortshop' },
  { value: 'third_base', label: 'Third Base' },
  { value: 'outfield', label: 'Outfield' },
  { value: 'pitcher', label: 'Pitcher' },
];

const secondaryPositionOptions: ISecondaryPositionOptionsTypes = [
  { value: null, label: '-' },
  ...primaryPositionOptions,
];

const UserInfoCompound = () => {
  return <div></div>;
};

interface IUserInfoProps {
  onEditButtonClick?: () => void;
  profileData: ExtendedProfileRecord;
}

const UserInfo = ({ onEditButtonClick, profileData }: IUserInfoProps) => {
  return (
    <Styled.Container>
      <span
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
      </span>
      <UserImage />
      <Styled.Username>{`${profileData.first_name} ${profileData.last_name}`}</Styled.Username>
      <Styled.Role>{profileData.position}</Styled.Role>
    </Styled.Container>
  );
};

interface IUserInfoEditFormProps {
  profileData: ExtendedProfileRecord;
}

const UserInfoEditForm = ({ profileData }: IUserInfoEditFormProps) => {
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
        placeholder="Position in Game *"
        defaultValue={profileData.position}
        component={ProfileSidebar.SelectInput}
        options={primaryPositionOptions}
      />
      <Field
        name="position2"
        placeholder="Secondary Position in Game"
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
