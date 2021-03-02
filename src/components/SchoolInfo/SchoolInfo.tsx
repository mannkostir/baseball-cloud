import { profilesService } from '@/services/profilesService';
import { schoolsService } from '@/services/schoolsService';
import { teamsService } from '@/services/teamsService';
import { School, SchoolYear, Team, Unpromise } from '@/types/commonTypes';
import React, { useCallback, useEffect, useState, useMemo } from 'react';
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
        <ProfileSidebar.Value>
          {profileData.teams.map((team) => team.name).join(', ')}
        </ProfileSidebar.Value>
      </ProfileSidebar.DataItem>
    </div>
  );
};

interface ISchoolInfoEditProps {
  profileData: Unpromise<ReturnType<typeof profilesService.getProfile>>;
}

const SchoolInfoEdit = ({ profileData }: ISchoolInfoEditProps) => {
  const getSchools = async (search: string) => {
    return await schoolsService.getSchools({ search });
  };

  const getSchoolsOptions = async (inputValue: string) => {
    const schools = await getSchools(inputValue);

    return schools.map((school) => ({ label: school.name, value: school }));
  };

  const getTeams = async (search: string) => {
    return await teamsService.getTeams({ search });
  };

  const getTeamsOptions = async (inputValue: string) => {
    const teams = await getTeams(inputValue);

    return teams.map((team) => ({ label: team.name, value: team }));
  };

  const defaultTeams = useMemo(() => {
    return profileData.teams.map((team) => ({ label: team.name }));
  }, [profileData.teams]);

  return (
    <>
      <Field
        name="school"
        component={ProfileSidebar.AsyncSelectInput}
        loadOptions={getSchoolsOptions}
        defaultOptions={true}
        placeholder={profileData.school.name}
      ></Field>
      <Field
        name="school_year"
        component={ProfileSidebar.SelectInput}
        placeholder={
          profileData.school_year[0].toUpperCase() +
          profileData.school_year.slice(1)
        }
        options={schoolYearOptions}
      />
      <Field
        name="teams"
        component={ProfileSidebar.AsyncSelectInput}
        placeholder="Teams"
        loadOptions={getTeamsOptions}
        defaultOptions={true}
        isMulti={true}
        isClearable={false}
        defaultValue={defaultTeams}
      />
    </>
  );
};

SchoolInfoCompound.View = SchoolInfoView;
SchoolInfoCompound.EditForm = SchoolInfoEdit;

export default SchoolInfoCompound;
