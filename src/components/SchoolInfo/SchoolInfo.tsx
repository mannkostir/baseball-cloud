import { profilesService } from '@/services/profilesService';
import { schoolsService } from '@/services/schoolsService';
import { teamsService } from '@/services/teamsService';
import { School, SchoolYear, Team, Unpromise } from '@/types/commonTypes';
import React, { useEffect, useState } from 'react';
import { Field, Form } from 'react-final-form';
import ProfileSidebar from '../ProfileSidebar';

type SchoolYearOptionsType = { value: SchoolYear; label: string }[];

const schoolYearOptions: SchoolYearOptionsType = [
  { value: 'freshman', label: 'Freshman' },
  { value: 'sophomore', label: 'Sophomore' },
  { value: 'junior', label: 'Junior' },
  { value: 'senior', label: 'Senior' },
  { value: '', label: 'None' },
];
const SchoolInfoCompound = () => {
  return <div></div>;
};

interface ISchoolInfoCompoundProps {
  profileData: Unpromise<ReturnType<typeof profilesService.getProfile>>;
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
        <ProfileSidebar.Value>
          {profileData.school_year[0].toUpperCase() +
            profileData.school_year.slice(1)}
        </ProfileSidebar.Value>
      </ProfileSidebar.DataItem>
      <ProfileSidebar.DataItem>
        <ProfileSidebar.Heading>Team</ProfileSidebar.Heading>
        <ProfileSidebar.Value>{profileData.teams[0].name}</ProfileSidebar.Value>
      </ProfileSidebar.DataItem>
    </div>
  );
};

interface ISchoolInfoEditProps {
  profileData: Unpromise<ReturnType<typeof profilesService.getProfile>>;
}

const SchoolInfoEdit = ({ profileData }: ISchoolInfoEditProps) => {
  const [schools, setSchools] = useState<School[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    (async () => {
      const schoolsRes = await schoolsService.getSchools({ search: '' });

      setSchools(schoolsRes);

      const teamsRes = await teamsService.getTeams({ search: '' });

      setTeams(teamsRes);
    })();
  }, []);

  return (
    <>
      <Field
        name="school"
        component={ProfileSidebar.SelectInput}
        placeholder="School"
        options={schools.map((school) => ({
          label: school.name,
          value: school,
        }))}
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
        placeholder="Teams"
        options={teams.map((team) => ({
          label: team.name,
          value: team,
        }))}
        isMulti={true}
        isClearable={false}
      />
    </>
  );
};

SchoolInfoCompound.View = SchoolInfoView;
SchoolInfoCompound.EditForm = SchoolInfoEdit;

export default SchoolInfoCompound;
