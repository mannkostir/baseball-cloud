import React from 'react';
import { Link } from 'react-router-dom';
import * as Styled from './TopNav.styled';

const TopNav = () => {
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
            <Styled.UserImage />
          </Link>
        </Styled.NavItem>
        <Styled.NavItem>
          <Styled.UserDropdownToggle>Username</Styled.UserDropdownToggle>
        </Styled.NavItem>
      </Styled.NavList>
    </Styled.Container>
  );
};

export default TopNav;
