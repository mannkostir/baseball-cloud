import React from 'react';
import ProfileSidebar from '../ProfileSidebar';
import styled from 'styled-components/macro';
import { Form, Field } from 'react-final-form';

const AboutContent = styled(ProfileSidebar.Value)`
  color: #788b99;
  line-height: 1.75;
`;

interface IProfileAboutProps {
  isEditing?: boolean;
}

const ProfileAbout = ({ isEditing = true }: IProfileAboutProps) => {
  return !isEditing ? (
    <div>
      <ProfileSidebar.SectionTitle>About</ProfileSidebar.SectionTitle>
      <AboutContent>dasfasfasfas</AboutContent>
    </div>
  ) : (
    <>
      <ProfileSidebar.SectionTitle>About</ProfileSidebar.SectionTitle>
      <Form onSubmit={() => {}}>
        {(props) => (
          <form>
            <Field name="about">
              {(props) => (
                <ProfileSidebar.TextInput placeholder="Describe yourself in a few words..." />
              )}
            </Field>
          </form>
        )}
      </Form>
    </>
  );
};

export default ProfileAbout;
