import { ExtendedProfileRecord } from '@/services/profilesService/profileServiceTypes';
import React from 'react';
import { Field, Form } from 'react-final-form';
import ProfileSidebar from '../ProfileSidebar';

interface IFacilityInfoProps {
  isEditing?: boolean;
  profileData: ExtendedProfileRecord;
}

type FacilityOptionsType = { value: string; label: string }[];

const facilityOptions: FacilityOptionsType = [
  { value: 'example', label: 'Example' },
];

const FacilityInfo = ({
  isEditing = false,
  profileData,
}: IFacilityInfoProps) => {
  return !isEditing ? (
    <div>
      <ProfileSidebar.DataItem>
        <ProfileSidebar.Heading>Facility</ProfileSidebar.Heading>
        <ProfileSidebar.Value>
          {profileData.facilities[0].u_name}
        </ProfileSidebar.Value>
      </ProfileSidebar.DataItem>
    </div>
  ) : (
    <>
      <ProfileSidebar.SectionTitle>Facility</ProfileSidebar.SectionTitle>
      <Form onSubmit={() => {}}>
        {(props) => (
          <Field
            name="facility"
            component={ProfileSidebar.SelectInput}
            placeholder="Facility"
            options={facilityOptions}
          />
        )}
      </Form>
    </>
  );
};

export default FacilityInfo;
