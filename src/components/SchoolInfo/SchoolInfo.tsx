import React from 'react';
import { Field, Form } from 'react-final-form';
import ProfileSidebar from '../ProfileSidebar';

interface ISchoolInfoProps {
  isEditing?: boolean;
}

const SchoolInfo = ({ isEditing = true }: ISchoolInfoProps) => {
  return !isEditing ? (
    <div>
      <ProfileSidebar.DataItem>
        <ProfileSidebar.Heading>School</ProfileSidebar.Heading>
        <ProfileSidebar.Value>FSU</ProfileSidebar.Value>
      </ProfileSidebar.DataItem>
      <ProfileSidebar.DataItem>
        <ProfileSidebar.Heading>School Year</ProfileSidebar.Heading>
        <ProfileSidebar.Value>Freshman</ProfileSidebar.Value>
      </ProfileSidebar.DataItem>
      <ProfileSidebar.DataItem>
        <ProfileSidebar.Heading>Team</ProfileSidebar.Heading>
        <ProfileSidebar.Value>Scorps</ProfileSidebar.Value>
      </ProfileSidebar.DataItem>
    </div>
  ) : (
    <>
      <ProfileSidebar.SectionTitle>School</ProfileSidebar.SectionTitle>
      <Form onSubmit={() => {}}>
        {(props) => (
          <form>
            <Field name="name">{(props) => <ProfileSidebar.TextInput />}</Field>
            <Field name="year">{(props) => <ProfileSidebar.TextInput />}</Field>
            <Field name="teams">
              {(props) => <ProfileSidebar.TextInput />}
            </Field>
          </form>
        )}
      </Form>
    </>
  );
};

export default SchoolInfo;
