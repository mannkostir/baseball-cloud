import PitcherSummary from './components/PitcherSummary';
import ProfileAnalysis from './components/ProfileAnalysis';
import RecentEvents from './components/RecentEvents';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { profilesAPI } from '@/api/profiles';
import { profileActions, useProfileSelector } from '@/store/profile';
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
import FlexContainer from '@/components/FlexContainer';
import Icons from '@/components/Icons';
import { useDispatch } from 'react-redux';
import { useProfileService } from '@/api/profiles/useProfilesAPI';
import { notificationsActions } from '@/store/notifications';
import { DiscardButton, SubmitButton } from '@/components/Buttons';
import ProfileSidebar from '@/components/ProfileSidebar';
import axios, { CancelTokenSource } from 'axios';

const ProfileMain = styled.main`
  background: #788b99;
  flex: 2;
  overflow: auto;
  width: calc(100vw - 220px);
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
    ReturnType<typeof profilesAPI.getProfile>
  > | null>(null);

  const [
    cancelTokenSource,
    setCancelTokenSource,
  ] = useState<CancelTokenSource | null>(null);

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

      const updatedProfile = await profilesAPI.updateProfile({
        id: profileData.id,
        teams: profileData.teams,
        facilities: profileData.facilities,
        ...submitValues,
      });

      dispatch(profileActions.updateProfile(updatedProfile));

      dispatch(
        notificationsActions.addNotification({
          status: 'success',
          message: 'Profile has been updated successfully.',
        })
      );

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

      const source = axios.CancelToken.source();

      const profile = await profilesAPI.getProfile({
        id: profileId,
        cancelToken: source.token,
      });

      setCancelTokenSource(source);

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

    return () => {
      cancelTokenSource?.cancel();
    };
  }, [currentProfileId, params.id]);

  return (
    <FlexContainer style={{ flexDirection: 'row' }}>
      {profileData && !isLoading ? (
        <>
          <ProfileSidebar.Container>
            {isEditingProfile ||
            (!profileData.first_name && !profileData.last_name) ? (
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
          </ProfileSidebar.Container>
          <ProfileMain>
            <ProfileSummary>
              <PitcherSummary
                summary={{ batter_summary: profileData.batter_summary }}
              />
              {!params.id && (
                <RecentEvents
                  events={{ recent_events: profileData.recent_events }}
                />
              )}
            </ProfileSummary>
            <ProfileAnalysis profileData={profileData} />
          </ProfileMain>
        </>
      ) : (
        <LoadingScreen />
      )}
    </FlexContainer>
  );
};

export default Profile;
