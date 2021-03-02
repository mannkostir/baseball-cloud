import PitcherSummary from '@/components/PitcherSummary';
import ProfileAnalysis from '@/components/ProfileAnalysis';
import RecentEvents from '@/components/RecentEvents';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import SubmitButton from '@/components/SubmitButton';
import DiscardButton from '@/components/DiscardButton';
import { profilesService } from '@/services/profilesService';
import { useProfileSelector } from '@/store/profile';
import UserInfoCompound from '@/components/UserInfoCompound';
import { Form } from 'react-final-form';
import SchoolInfoCompound from '@/components/SchoolInfo';
import FacilityInfoCompound from '@/components/FacilityInfo';
import ProfileAboutCompound from '@/components/ProfileAbout';
import PersonalInfo from '@/components/PersonalInfo';
import { useParams } from 'react-router-dom';
import LoadingScreen from '@/components/LoadingScreen';
import { Unpromise } from '@/types/commonTypes';

const Container = styled.div`
  display: flex;
  width: 100%;
`;

const ProfileMain = styled.main`
  background: #788b99;
  flex: 2;
  overflow: auto;
  width: calc(100vw - 220px);
`;

const ProfileSidebarContainer = styled.aside`
  background: #fff;
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  flex: 0 298px;
  overflow: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
`;

const ProfileSummary = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 15px;
`;

type FormValues = {
  [key: string]: { label: string; value: string } | string | number;
};

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState<Unpromise<
    ReturnType<typeof profilesService.getProfile>
  > | null>(null);

  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const { currentProfileId } = useProfileSelector();

  const params = useParams<{ id: string }>();

  const saveChanges = async (values: FormValues) => {
    try {
      if (!profileData) return;

      console.log(values);

      const submitValues = Object.entries(values).reduce<Record<string, any>>(
        (acc, [key, value]) => {
          let changeValue = value;

          if (typeof value === 'object') {
            changeValue = value?.label && value?.value ? value.value : value;
          }

          if (+value > 0) {
            changeValue = +value;
          }

          acc[key] = changeValue;

          return acc;
        },
        {}
      );

      const updatedProfile = await profilesService.updateProfile({
        id: profileData.id,
        teams: profileData.teams,
        facilities: profileData.facilities,
        ...submitValues,
      });

      setProfileData({ ...profileData, ...updatedProfile });
    } catch (e) {
      throw e;
    } finally {
      setIsEditingProfile(false);
    }
  };

  useEffect(() => {
    let id: number | string;

    if (params.id) {
      id = params.id;
    } else if (currentProfileId) {
      id = currentProfileId;
    } else {
      return;
    }

    (async () => {
      try {
        setIsLoading(true);

        const profile = await profilesService.getProfile({
          id: typeof id === 'string' ? id : id,
        });

        setProfileData(profile);
      } catch (e) {
        throw e;
      } finally {
        setIsLoading(false);
      }
    })();
  }, [currentProfileId, params.id]);

  return (
    <Container>
      {profileData && !isLoading ? (
        <>
          <ProfileSidebarContainer>
            {isEditingProfile ? (
              <Form onSubmit={saveChanges}>
                {(props) => (
                  <form onSubmit={props.handleSubmit}>
                    <UserInfoCompound.EditForm profileData={profileData} />
                    <PersonalInfo.EditForm profileData={profileData} />
                    <SchoolInfoCompound.EditForm profileData={profileData} />
                    <FacilityInfoCompound.EditForm profileData={profileData} />
                    <ProfileAboutCompound.EditForm profileData={profileData} />
                    <ButtonsWrapper>
                      <DiscardButton
                        onClick={() => setIsEditingProfile(false)}
                        style={{ marginRight: 12 }}
                      >
                        Cancel
                      </DiscardButton>
                      <SubmitButton style={{ padding: '7px 19px 10px 18px' }}>
                        Save
                      </SubmitButton>
                    </ButtonsWrapper>
                  </form>
                )}
              </Form>
            ) : (
              <>
                <UserInfoCompound.UserInfo
                  profileData={profileData}
                  onEditButtonClick={() =>
                    setIsEditingProfile(
                      !params.id && currentProfileId ? true : false
                    )
                  }
                />
                <PersonalInfo.View profileData={profileData} />
                {profileData.school && profileData.teams.length ? (
                  <SchoolInfoCompound.View profileData={profileData} />
                ) : null}
                {profileData.facilities.length ? (
                  <FacilityInfoCompound.View profileData={profileData} />
                ) : null}
                {profileData.biography ? (
                  <ProfileAboutCompound.View profileData={profileData} />
                ) : null}
              </>
            )}
          </ProfileSidebarContainer>
          <ProfileMain>
            <ProfileSummary>
              <PitcherSummary
                summary={{ batter_summary: profileData.batter_summary }}
              />
              <RecentEvents
                events={{ recent_events: profileData.recent_events }}
              />
            </ProfileSummary>
            <ProfileAnalysis profileData={profileData} />
          </ProfileMain>
        </>
      ) : (
        <LoadingScreen />
      )}
    </Container>
  );
};

export default Profile;
