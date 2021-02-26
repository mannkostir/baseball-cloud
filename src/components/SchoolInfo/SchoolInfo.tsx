import { ExtendedProfileRecord } from '@/services/profilesService/profileServiceTypes';
import { School, SchoolYear } from '@/types/commonTypes';
import React from 'react';
import { Field, Form } from 'react-final-form';
import ProfileSidebar from '../ProfileSidebar';

type SchoolOptionsType = {
  label: string;
  value: School;
}[];
type SchoolYearOptionsType = { value: SchoolYear; label: string }[];
type TeamOptionsType = { value: string; label: string }[];

const schoolOptions: SchoolOptionsType = [
  { value: { name: 'fsu', id: '1' }, label: 'FSU' },
  { value: { name: 'rockledge', id: '2' }, label: 'Rockledge' },
  { value: { name: 'good', id: '3' }, label: 'Good' },
];
const schoolYearOptions: SchoolYearOptionsType = [
  { value: 'freshman', label: 'Freshman' },
  { value: 'sophomore', label: 'Sophomore' },
  { value: 'junior', label: 'Junior' },
  { value: 'senior', label: 'Senior' },
  { value: '', label: 'None' },
];
const teamOptions: TeamOptionsType = [
  { value: 'scorps', label: 'Scorps' },
  { value: 'ftb', label: 'FTB' },
  { value: 'good_team', label: 'Good Team' },
];

const SchoolInfoCompound = () => {
  return <div></div>;
};

interface ISchoolInfoCompoundProps {
  profileData: ExtendedProfileRecord;
}

const SchoolInfoView = ({ profileData }: ISchoolInfoCompoundProps) => {
  return (
    <div>
      <ProfileSidebar.DataItem>
        <ProfileSidebar.Heading>School</ProfileSidebar.Heading>
        <ProfileSidebar.Value>{profileData.school.name}</ProfileSidebar.Value>
      </ProfileSidebar.DataItem>
      <ProfileSidebar.DataItem>
        <ProfileSidebar.Heading>School Year</ProfileSidebar.Heading>
        <ProfileSidebar.Value>{profileData.school_year}</ProfileSidebar.Value>
      </ProfileSidebar.DataItem>
      <ProfileSidebar.DataItem>
        <ProfileSidebar.Heading>Team</ProfileSidebar.Heading>
        <ProfileSidebar.Value>{profileData.teams[0].name}</ProfileSidebar.Value>
      </ProfileSidebar.DataItem>
    </div>
  );
};

interface ISchoolInfoEditProps {
  profileData: ExtendedProfileRecord;
}

const SchoolInfoEdit = ({ profileData }: ISchoolInfoEditProps) => {
  return (
    <>
      <Field
        name="school"
        component={ProfileSidebar.SelectInput}
        defaultValue={schoolOptions.find(
          (option) => option.value.name === profileData.school.name
        )}
        placeholder="School"
        options={schoolOptions}
      />
      <Field
        name="school_year"
        component={ProfileSidebar.SelectInput}
        defaultValue={schoolYearOptions.find(
          (option) => option.value === profileData.school_year.toLowerCase()
        )}
        placeholder="School Year"
        options={schoolYearOptions}
      />
      <Field
        name="teams"
        component={ProfileSidebar.SelectInput}
        defaultValue={teamOptions.find(
          (option) => option.value === profileData.teams[0].name.toLowerCase()
        )}
        placeholder="Teams"
        options={teamOptions}
        isMulti={true}
        isClearable={false}
      />
    </>
  );
};

SchoolInfoCompound.View = SchoolInfoView;
SchoolInfoCompound.EditForm = SchoolInfoEdit;

export default SchoolInfoCompound;
