import React from 'react';
import SignInForm from '../SignInForm';
import { ModalContainer, StyledHeader } from './AuthView.styles';

const AuthView = () => {
  return (
    <ModalContainer>
      <StyledHeader>
        <h1>Welcome to BaseBallCloud</h1>
        <span>Sign into your account here:</span>
      </StyledHeader>
      <SignInForm />
    </ModalContainer>
  );
};

export default AuthView;
