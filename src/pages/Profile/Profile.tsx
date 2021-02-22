import UserInfo from '@/components/UserInfo';
import PitcherSummary from '@/components/PitcherSummary';
import ProfileAnalysis from '@/components/ProfileAnalysis';
import RecentEvents from '@/components/RecentEvents';
import UserImage from '@/components/UserImage';
import React from 'react';
import styled from 'styled-components/macro';
import PersonalInfo from '@/components/PersonalInfo';

const Container = styled.div`
  display: flex;
`;

const ProfileMain = styled.main`
  background: #788b99;
  flex: 2;
  overflow: auto;
  width: calc(100vw - 220px);
`;

const ProfileSidebar = styled.aside`
  background: #fff;
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  width: 200px;
  overflow: auto;
  padding: 16px;
`;

const ProfileSummary = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Profile = () => {
  return (
    <Container>
      <ProfileSidebar>
        <UserInfo />
        <PersonalInfo />
      </ProfileSidebar>
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
