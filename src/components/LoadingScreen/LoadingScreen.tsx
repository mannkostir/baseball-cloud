import React from 'react';
import styled from 'styled-components/macro';
import Spinner from '../Spinner';

const Container = styled.div`
  background: #fff;
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const LoadingScreen = () => {
  return (
    <Container>
      <Spinner />
    </Container>
  );
};

export default LoadingScreen;
