import React from 'react';
import * as Styled from './AuthView.styles';

interface IAuthViewProps {
  children: JSX.Element | JSX.Element[];
}

const AuthView = ({ children }: IAuthViewProps) => {
  return (
    <Styled.Container>
      <Styled.ModalContainer>{children}</Styled.ModalContainer>
    </Styled.Container>
  );
};

export default AuthView;
