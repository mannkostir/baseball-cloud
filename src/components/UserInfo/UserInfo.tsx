import React from 'react';
import * as Styled from './UserInfo.styles';
import UserImage from '../UserImage';
import { Field, Form } from 'react-final-form';
import ProfileSidebar from '../ProfileSidebar';

interface IUserInfoProps {
  isEditing?: boolean;
}

const UserInfo = ({ isEditing = true }: IUserInfoProps) => {
  return !isEditing ? (
    <Styled.Container>
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
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Field name="first_name">
                {(props) => (
                  <ProfileSidebar.TextInput placeholder="First Name *" />
                )}
              </Field>
              <Field name="last_name">
                {(props) => (
                  <ProfileSidebar.TextInput placeholder="Last Name *" />
                )}
              </Field>
            </div>
            <Field name="position">
              {(props) => <ProfileSidebar.TextInput />}
            </Field>
            <Field name="position">
              {(props) => <ProfileSidebar.TextInput />}
            </Field>
          </form>
        )}
      </Form>
    </>
  );
};

export default UserInfo;
