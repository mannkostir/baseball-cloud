import React from 'react';
import ProfileSidebar from '@/components/ProfileSidebar';
import styled from 'styled-components/macro';
import { Field } from 'react-final-form';
import { profilesAPI } from '@/api/profiles';
import { Unpromise } from '@/types/commonTypes';

const AboutContent = styled(ProfileSidebar.Value)`
  color: #788b99;
  line-height: 1.75;
`;

const ProfileAboutCompound = () => {
  return <div></div>;
};

interface IProfileAboutViewProps {
  profileData: Unpromise<ReturnType<typeof profilesAPI.getProfile>>;
}

const ProfileAboutView = ({ profileData }: IProfileAboutViewProps) => {
  return (
    <div>
      <ProfileSidebar.SectionTitle>About</ProfileSidebar.SectionTitle>
      <AboutContent>{profileData.biography}</AboutContent>
    </div>
  );
};

interface IProfileAboutEditProps {
  profileData: Unpromise<ReturnType<typeof profilesAPI.getProfile>>;
}

const ProfileAboutEdit = ({ profileData }: IProfileAboutEditProps) => {
  return (
    <>
      <ProfileSidebar.SectionTitle>About</ProfileSidebar.SectionTitle>
      <Field name="biography" initialValue={profileData.biography}>
        {(fieldProps) => (
          <ProfileSidebar.Textarea
            {...fieldProps}
            placeholder="Describe yourself in a few words"
          />
        )}
      </Field>
    </>
  );
};

ProfileAboutCompound.View = ProfileAboutView;
ProfileAboutCompound.EditForm = ProfileAboutEdit;

export default ProfileAboutCompound;
