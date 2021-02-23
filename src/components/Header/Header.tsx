import { useAuthSelector } from '@/store/auth';
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo';
import TopNav from '../TopNav';
import * as Styled from './Header.styles';

const Header = () => {
  const { isAuthenticated } = useAuthSelector();
  return (
    <Styled.HeaderContainer>
      <Link to="/">
        <Logo />
      </Link>
      {isAuthenticated ? <TopNav /> : null}
    </Styled.HeaderContainer>
  );
};

export default Header;
