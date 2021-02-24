import UserInfo from '@/components/UserInfo';
import PitcherSummary from '@/components/PitcherSummary';
import ProfileAnalysis from '@/components/ProfileAnalysis';
import RecentEvents from '@/components/RecentEvents';
import UserImage from '@/components/UserImage';
import React from 'react';
import styled from 'styled-components/macro';
import PersonalInfo from '@/components/PersonalInfo';
import SchoolInfo from '@/components/SchoolInfo';
import ProfileSidebar from '@/components/ProfileSidebar';
import ProfileAbout from '@/components/ProfileAbout';
import FacilityInfo from '@/components/FacilityInfo';
import SubmitButton from '@/components/SubmitButton';
import DiscardButton from '@/components/DiscardButton';

const Container = styled.div`
  display: flex;
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

const Profile = () => {
  return (
    <Container>
      <ProfileSidebarContainer>
        <UserInfo />
        <PersonalInfo />
        <SchoolInfo />
        <FacilityInfo />
        <ProfileAbout />
        <ButtonsWrapper>
          <DiscardButton style={{ marginRight: 12 }}>Cancel</DiscardButton>
          <SubmitButton style={{ padding: '7px 19px 10px 18px' }}>
            Save
          </SubmitButton>
        </ButtonsWrapper>
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
