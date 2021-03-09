import { profilesService } from '@/services/profilesService';
import { Facility, ReactSelectOptions, Unpromise } from '@/types/commonTypes';
import React from 'react';
import { Field } from 'react-final-form';
import ProfileSidebar from '@/components/ProfileSidebar';
import { Select } from '@/components/FinalFormAdapters';

const facilityOptions: ReactSelectOptions<Facility> = [
  {
    value: { id: '32', email: 'facility@example.com', u_name: 'Example' },
    label: 'Example',
  },
];

const FacilityInfoCompound = () => {
  return <div></div>;
};

interface IFacilityInfoViewProps {
  profileData: Unpromise<ReturnType<typeof profilesService.getProfile>>;
}

const FacilityInfoView = ({ profileData }: IFacilityInfoViewProps) => {
  return (
    <div>
      <ProfileSidebar.DataItem>
        <ProfileSidebar.Heading>Facility</ProfileSidebar.Heading>
        <ProfileSidebar.Value>
          {profileData.facilities[0].u_name}
        </ProfileSidebar.Value>
      </ProfileSidebar.DataItem>
    </div>
  );
};

interface IFacilityInfoViewProps {
  profileData: Unpromise<ReturnType<typeof profilesService.getProfile>>;
}

const FacilityInfoEdit = ({ profileData }: IFacilityInfoViewProps) => {
  return (
    <>
      <Field
        name="facilities"
        initialValue={facilityOptions.find(
          (option) => option.value.id === profileData.facilities[0]?.id
        )}
      >
        {(fieldProps) => (
          <ProfileSidebar.Select
            {...fieldProps}
            placeholder="Facility"
            options={facilityOptions}
          />
        )}
      </Field>
    </>
  );
};

FacilityInfoCompound.View = FacilityInfoView;
FacilityInfoCompound.EditForm = FacilityInfoEdit;

export default FacilityInfoCompound;
