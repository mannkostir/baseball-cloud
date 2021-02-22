import React from 'react';
import * as Styled from './UserInfo.styles';
import UserImage from '../UserImage';

const UserInfo = () => {
  return (
    <Styled.Container>
      <UserImage />
      <Styled.Username>Username</Styled.Username>
      <Styled.Role>Role</Styled.Role>
    </Styled.Container>
  );
};

export default UserInfo;
