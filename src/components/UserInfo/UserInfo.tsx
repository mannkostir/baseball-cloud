import React from 'react';
import * as Styled from './UserInfo.styles';
import UserImage from '../UserImage';
import { Field, Form } from 'react-final-form';
import ProfileSidebar from '../ProfileSidebar';
import { PlayerPosition } from '@/types/commonTypes';

interface IUserInfoProps {
  isEditing?: boolean;
  onEditButtonClick?: () => void;
}

type PositionOptionsType = {
  value: PlayerPosition;
  label: string;
}[];

interface IPositionOptionsTypes
  extends Array<{ value: PlayerPosition; label: string }> {}

const primaryPositionOptions: IPositionOptionsTypes = [
  { value: 'catcher', label: 'Catcher' },
  { value: 'first_base', label: 'First Base' },
  { value: 'second_base', label: 'Second Base' },
  { value: 'shortshop', label: 'Shortshop' },
  { value: 'third_base', label: 'Third Base' },
  { value: 'outfield', label: 'Outfield' },
  { value: 'pitcher', label: 'Pitcher' },
];

const secondaryPositionOptions: typeof primaryPositionOptions = [
  { value: '', label: '-' },
  ...primaryPositionOptions,
];

const UserInfo = ({ isEditing = false, onEditButtonClick }: IUserInfoProps) => {
  return !isEditing ? (
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
      <Styled.Username>Username</Styled.Username>
      <Styled.Role>Role</Styled.Role>
    </Styled.Container>
  ) : (
    <>
      <UserImage />
      <Styled.ChoosePhotoLabel>Choose Photo</Styled.ChoosePhotoLabel>
      <Form onSubmit={() => {}}>
        {(props) => (
          <form>
            <ProfileSidebar.InlineInputsWrapper>
              <Field
                name="first_name"
                placeholder="First Name *"
                component={ProfileSidebar.TextInput}
              />
              <Field
                name="last_name"
                placeholder="Last Name *"
                component={ProfileSidebar.TextInput}
              />
            </ProfileSidebar.InlineInputsWrapper>
            <Field
              name="position"
              placeholder="Position in Game *"
              component={ProfileSidebar.SelectInput}
              options={primaryPositionOptions}
            />
            <Field
              name="position2"
              placeholder="Secondary Position in Game"
              component={ProfileSidebar.SelectInput}
              options={secondaryPositionOptions}
            />
          </form>
        )}
      </Form>
    </>
  );
};

export default UserInfo;
