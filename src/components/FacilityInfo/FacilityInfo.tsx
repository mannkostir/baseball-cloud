import React from 'react';
import { Field, Form } from 'react-final-form';
import ProfileSidebar from '../ProfileSidebar';

interface IFacilityInfoProps {
  isEditing?: boolean;
}

const FacilityInfo = ({ isEditing = true }: IFacilityInfoProps) => {
  return !isEditing ? (
    <div>
      <ProfileSidebar.DataItem>
        <ProfileSidebar.Heading>Facility</ProfileSidebar.Heading>
        <ProfileSidebar.Value>Example</ProfileSidebar.Value>
      </ProfileSidebar.DataItem>
    </div>
  ) : (
    <>
      <ProfileSidebar.SectionTitle>Facility</ProfileSidebar.SectionTitle>
      <Form onSubmit={() => {}}>
        {(props) => (
          <Field name="facility">
            {(props) => <ProfileSidebar.TextInput />}
          </Field>
        )}
      </Form>
    </>
  );
};

export default FacilityInfo;
