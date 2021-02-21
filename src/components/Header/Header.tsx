import React from 'react';
import Logo from '../Logo';
import * as Styled from './Header.styles';

const Header = () => {
  return (
    <Styled.HeaderContainer>
      <Logo />
    </Styled.HeaderContainer>
  );
};

export default Header;
