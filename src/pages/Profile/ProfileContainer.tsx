import PitcherSummary from './components/PitcherSummary';
import ProfileAnalysis from './components/ProfileAnalysis';
import RecentEvents from './components/RecentEvents';
import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components/macro';
import SubmitButton from '@/components/SubmitButton';
import DiscardButton from '@/components/DiscardButton';
import { profilesService } from '@/services/profilesService';
import { useProfileSelector } from '@/store/profile';
import UserInfoCompound from './components/UserInfoCompound';
import { Form } from 'react-final-form';
import SchoolInfoCompound from './components/SchoolInfo';
import FacilityInfoCompound from './components/FacilityInfo';
import ProfileAboutCompound from './components/ProfileAbout';
import PersonalInfo from './components/PersonalInfo';
import { useParams } from 'react-router-dom';
import LoadingScreen from '@/components/LoadingScreen';
import { Unpromise } from '@/types/commonTypes';
import { parseFormValues } from '@/utils/parseFormValues';
import Container from '@/components/Container';
import Icons from '@/components/Icons';
import { useDispatch } from 'react-redux';
import { useProfileService } from '@/services/profilesService/useProfileService';
import { notificationsActions } from '@/store/notifications';

const ProfileMain = styled.main`
  background: #788b99;
  flex: 2;
  overflow: auto;
  width: calc(100vw - 220px);
`;

const ProfileSidebarContainer = styled.aside`
  position: relative;
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
  [key: string]: { label: string; value: string } | string | number | any;
};

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState<Unpromise<
    ReturnType<typeof profilesService.getProfile>
  > | null>(null);

  const summaryBatterValues = useMemo(() => {
    if (!profileData) return;

    const sum = profileData.batter_summary.reduce(
      (acc, curr) => {
        acc.exit_velocity += curr.exit_velocity;
        acc.distance += curr.distance;
        acc.launch_angle += curr.launch_angle;

        return acc;
      },
      { exit_velocity: 0, distance: 0, launch_angle: 0 }
    );

    return sum;
  }, [profileData]);

  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const { currentProfileId } = useProfileSelector();

  const params = useParams<{ id: string }>();

  const dispatch = useDispatch();

  const { toggleMyHolyFavor } = useProfileService();

  const toggleFavor = async () => {
    if (!profileData) return;

    await toggleMyHolyFavor(+profileData.id, profileData.favorite);
    await fetchProfile(profileData.id, false);

    let message: string;

    if (profileData.favorite) {
      message = 'Removed from favorite';
    } else {
      message = 'Added to favorite';
    }

    dispatch(
      notificationsActions.addNotification({
        status: 'success',
        message,
      })
    );
  };

  const saveChanges = async (values: FormValues) => {
    try {
      if (!profileData) return;

      const submitValues = parseFormValues(values);

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

  const fetchProfile = async (
    profileId: string,
    indicateLoading: boolean = true
  ) => {
    try {
      indicateLoading && setIsLoading(true);

      const profile = await profilesService.getProfile({
        id: profileId,
      });

      setProfileData(profile);
    } catch (e) {
      throw e;
    } finally {
      setIsLoading(false);
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

    fetchProfile(id);
  }, [currentProfileId, params.id]);

  return (
    <Container style={{ flexDirection: 'row' }}>
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
                {!params.id ? (
                  <Icons.Edit
                    style={{
                      position: 'absolute',
                      right: '13px',
                      top: '12px',
                      padding: 0,
                      cursor: 'pointer',
                      zIndex: 10,
                    }}
                    onClick={() =>
                      setIsEditingProfile(
                        !params.id && currentProfileId ? true : false
                      )
                    }
                  />
                ) : profileData.favorite ? (
                  <Icons.ProfileUnlove
                    style={{
                      position: 'absolute',
                      right: '13px',
                      top: '12px',
                      padding: 0,
                      cursor: 'pointer',
                      zIndex: 10,
                    }}
                    onClick={toggleFavor}
                  />
                ) : (
                  <Icons.ProfileLove
                    style={{
                      position: 'absolute',
                      right: '13px',
                      top: '12px',
                      padding: 0,
                      cursor: 'pointer',
                      zIndex: 10,
                    }}
                    onClick={toggleFavor}
                  />
                )}
                <UserInfoCompound.UserInfo profileData={profileData} />
                <PersonalInfo.View profileData={profileData} />
                {profileData.school ? (
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
