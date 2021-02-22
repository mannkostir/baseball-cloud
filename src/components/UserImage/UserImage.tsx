import React from 'react';
import styled from 'styled-components/macro';
import userImage from '@/assets/images/user_image.png';

const UserPhoto = styled.div`
  background-image: url(${userImage});
  width: 100px;
  height: 100px;
  background-size: cover;
  background-position: 50% 50%;
  border-radius: 50%;
  margin: 0 auto;
  margin-bottom: 8px;
`;

const UserImage = () => {
  return <UserPhoto />;
};

export default UserImage;
