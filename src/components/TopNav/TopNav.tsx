import { authActions } from '@/store/auth';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Icons from '../Icons';
import ProfileSidebar from '../ProfileSidebar';
import UserImage from '../UserImage';
import * as Styled from './TopNav.styled';

interface ITopNavProps {
  username: string;
  avatar?: string | null;
}

const TopNav = ({ username, avatar = null }: ITopNavProps) => {
  const dispatch = useDispatch();

  const [isDropdownOpened, setIsDropdownOpened] = useState(false);

  const signOut = () => {
    dispatch(authActions.signOut());
  };

  return (
    <Styled.Container>
      <Styled.NavList>
        <Styled.NavItem>
          <Styled.NavLink to="/leaderboard">Leaderboard</Styled.NavLink>
        </Styled.NavItem>
        <Styled.NavItem>
          <Styled.NavLink to="/network">Network</Styled.NavLink>
        </Styled.NavItem>
        <Styled.NavItem>
          <Link to="/profile">
            <UserImage
              imageUrl={avatar}
              style={{ height: '32px', width: '32px', margin: 0 }}
            />
          </Link>
        </Styled.NavItem>
        <Styled.NavItem>
          <Styled.UserDropdownToggle
            onClick={() => setIsDropdownOpened((isOpened) => !isOpened)}
          >
            {username}{' '}
            <Icons.NavDropdownCaret
              style={{ marginLeft: '6px', transform: 'translateY(-15%)' }}
            />
          </Styled.UserDropdownToggle>
          <Styled.UserDropdownContent
            onClick={() => setIsDropdownOpened(false)}
            isDropdownOpened={isDropdownOpened}
          >
            <Styled.UserDropdownLink to="/profile">
              Profile
            </Styled.UserDropdownLink>
            <Styled.UserSignOutLink onClick={signOut}>
              Sign Out
            </Styled.UserSignOutLink>
          </Styled.UserDropdownContent>
        </Styled.NavItem>
      </Styled.NavList>
    </Styled.Container>
  );
};

export default TopNav;
