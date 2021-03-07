import React from 'react';
import ProfileSidebar from '@/components/ProfileSidebar';
import styled from 'styled-components/macro';
import { Form, Field } from 'react-final-form';
import { profilesService } from '@/services/profilesService';
import { Unpromise } from '@/types/commonTypes';
import { Textarea } from '@/components/FinalFormAdapters';

const AboutContent = styled(ProfileSidebar.Value)`
  color: #788b99;
  line-height: 1.75;
`;

const ProfileAboutCompound = () => {
  return <div></div>;
};

interface IProfileAboutViewProps {
  profileData: Unpromise<ReturnType<typeof profilesService.getProfile>>;
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
  profileData: Unpromise<ReturnType<typeof profilesService.getProfile>>;
}

const ProfileAboutEdit = ({ profileData }: IProfileAboutEditProps) => {
  return (
    <>
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
