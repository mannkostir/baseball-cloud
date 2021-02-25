import { SchoolYear } from '@/types/commonTypes';
import React from 'react';
import { Field, Form } from 'react-final-form';
import ProfileSidebar from '../ProfileSidebar';

interface ISchoolInfoProps {
  isEditing?: boolean;
}

type SchoolOptionsType = {
  label: string;
  value: string;
}[];
type SchoolYearOptionsType = { value: SchoolYear; label: string }[];
type TeamOptionsType = { value: string; label: string }[];

const schoolOptions: SchoolOptionsType = [
  { value: 'fsu', label: 'FSU' },
  { value: 'rockledge', label: 'Rockledge' },
  { value: 'good', label: 'Good' },
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

const SchoolInfo = ({ isEditing = false }: ISchoolInfoProps) => {
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
            <Field
              name="name"
              component={ProfileSidebar.SelectInput}
              placeholder="School"
              options={schoolOptions}
            />
            <Field
              name="year"
              component={ProfileSidebar.SelectInput}
              placeholder="School Year"
              options={schoolYearOptions}
            />
            <Field
              name="teams"
              component={ProfileSidebar.SelectInput}
              placeholder="Teams"
              options={teamOptions}
              isMulti={true}
              isClearable={false}
            />
          </form>
        )}
      </Form>
    </>
  );
};

export default SchoolInfo;
