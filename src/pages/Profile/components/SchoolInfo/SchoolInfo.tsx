import { profilesAPI } from '@/api/profiles';
import { schoolsAPI } from '@/api/schools';
import { teamsAPI } from '@/api/teams';
import { SchoolYear, Unpromise } from '@/types/commonTypes';
import React, { useMemo } from 'react';
import { Field } from 'react-final-form';
import ProfileSidebar from '@/components/ProfileSidebar';

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
  profileData: Unpromise<ReturnType<typeof profilesAPI.getProfile>>;
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
      {!!profileData.teams.length && (
        <ProfileSidebar.DataItem>
          <ProfileSidebar.Heading>Teams</ProfileSidebar.Heading>
          <ProfileSidebar.Value>
            {profileData.teams.map((team) => team.name).join(', ')}
          </ProfileSidebar.Value>
        </ProfileSidebar.DataItem>
      )}
    </div>
  );
};

interface ISchoolInfoEditProps {
  profileData: Unpromise<ReturnType<typeof profilesAPI.getProfile>>;
}

const SchoolInfoEdit = ({ profileData }: ISchoolInfoEditProps) => {
  const getSchools = async (search: string) => {
    return await schoolsAPI.getSchools({ search });
  };

  const getSchoolsOptions = async (inputValue: string) => {
    const schoolsRes = await getSchools(inputValue);

    const schools = schoolsRes.map((school) => ({
      label: school.name,
      value: school,
    }));

    return schools;
  };

  const getTeams = async (search: string) => {
    return await teamsAPI.getTeams({ search });
  };

  const getTeamsOptions = async (inputValue: string) => {
    const teams = await getTeams(inputValue);

    return teams.map((team) => ({ label: team.name, value: team }));
  };

  const defaultTeams = useMemo(() => {
    return profileData.teams.map((team) => ({ label: team.name, value: team }));
  }, [profileData.teams]);

  const defaultSchool = useMemo(() => {
    return profileData.school
      ? { label: profileData.school?.name, value: profileData.school }
      : '';
  }, [profileData.school]);

  return (
    <>
      <ProfileSidebar.SectionTitle>School</ProfileSidebar.SectionTitle>
      <Field name="school" initialValue={defaultSchool}>
        {(fieldProps) => (
          <ProfileSidebar.AsyncSelect
            {...fieldProps}
            loadOptions={getSchoolsOptions}
            defaultOptions={true}
            placeholder="School"
          />
        )}
      </Field>
      <Field
        name="school_year"
        initialValue={
          schoolYearOptions.find(
            (schoolYear) => schoolYear.value === profileData.school_year
          ) || ''
        }
      >
        {(fieldProps) => (
          <ProfileSidebar.Select
            {...fieldProps}
            placeholder="School Year"
            options={schoolYearOptions}
          />
        )}
      </Field>
      <Field name="teams" initialValue={defaultTeams}>
        {(fieldProps) => (
          <ProfileSidebar.AsyncSelect
            {...fieldProps}
            isMulti={true}
            placeholder="Teams"
            loadOptions={getTeamsOptions}
            defaultOptions={true}
            isClearable={false}
          />
        )}
      </Field>
    </>
  );
};

SchoolInfoCompound.View = SchoolInfoView;
SchoolInfoCompound.EditForm = SchoolInfoEdit;

export default SchoolInfoCompound;
