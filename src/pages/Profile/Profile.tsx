import UserInfo from '@/components/UserInfo';
import PitcherSummary from '@/components/PitcherSummary';
import ProfileAnalysis from '@/components/ProfileAnalysis';
import RecentEvents from '@/components/RecentEvents';
import UserImage from '@/components/UserImage';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import PersonalInfo from '@/components/PersonalInfo';
import SchoolInfo from '@/components/SchoolInfo';
import ProfileSidebar from '@/components/ProfileSidebar';
import ProfileAbout from '@/components/ProfileAbout';
import FacilityInfo from '@/components/FacilityInfo';
import SubmitButton from '@/components/SubmitButton';
import DiscardButton from '@/components/DiscardButton';
import { profilesService } from '@/services/profilesService';
import { useAuthSelector } from '@/store/auth';
import {
  ExtendedProfileRecord,
  ProfileRecord,
} from '@/services/profilesService/profileServiceTypes';
import { useProfileSelector } from '@/store/profile';

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

interface IProfileProps {
  playerId?: number;
}

const Profile = ({ playerId }: IProfileProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState<ExtendedProfileRecord | null>(
    null
  );
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const { currentProfileId } = useProfileSelector();

  useEffect(() => {
    let id: number | string;

    if (playerId) {
      id = playerId;
    } else if (currentProfileId) {
      id = currentProfileId;
    } else {
      return;
    }

    (async () => {
      try {
        setIsLoading(true);

        const profile = await profilesService.getProfile({
          id: typeof id === 'string' ? id : id.toString(),
        });

        setProfileData(profile);
      } catch (e) {
        throw e;
      } finally {
        setIsLoading(false);
      }
    })();
  }, [playerId, currentProfileId]);

  return (
    <Container>
      <ProfileSidebarContainer>
        {profileData ? (
          <>
            <UserInfo
              onEditButtonClick={() =>
                setIsEditingProfile(
                  !playerId && currentProfileId ? true : false
                )
              }
              isEditing={isEditingProfile && !playerId}
              profileData={profileData}
            />
            <PersonalInfo
              profileData={profileData}
              isEditing={isEditingProfile}
            />
            <SchoolInfo
              profileData={profileData}
              isEditing={isEditingProfile}
            />
            <FacilityInfo
              profileData={profileData}
              isEditing={isEditingProfile}
            />
            <ProfileAbout
              profileData={profileData}
              isEditing={isEditingProfile}
            />
          </>
        ) : (
          'Loading'
        )}
        {isEditingProfile ? (
          <ButtonsWrapper>
            <DiscardButton
              onClick={() => setIsEditingProfile(false)}
              style={{ marginRight: 12 }}
            >
              Cancel
            </DiscardButton>
            <SubmitButton
              onClick={() => {
                setIsEditingProfile(false);
              }}
              style={{ padding: '7px 19px 10px 18px' }}
            >
              Save
            </SubmitButton>
          </ButtonsWrapper>
        ) : null}
      </ProfileSidebarContainer>
      <ProfileMain>
        <ProfileSummary>
          <PitcherSummary />
          <RecentEvents />
        </ProfileSummary>
        <ProfileAnalysis />
      </ProfileMain>
    </Container>
  );
};

export default Profile;
