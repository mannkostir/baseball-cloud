import React from 'react';
import styled, { keyframes } from 'styled-components/macro';

const bounceFrames = keyframes`
  0%, 80%, 100% {
    transform: scale(0)
  }

  40% {
    transform: scale(1)
  }
`;

const SpinnerContainer = styled.div`
  margin: 0 auto 0;
  width: 70px;
  text-align: center;
`;

const Bounce = styled.div`
  width: 18px;
  height: 18px;
  background-color: #48bbff;
  border-radius: 100%;
  display: inline-block;
  animation: ${bounceFrames} 1.4s infinite ease-in-out both;
  &:first-child {
    animation-delay: -0.32s;
  }
  &:nth-child(2) {
    animation-delay: -0.16s;
  }
`;

const Spinner = () => {
  return (
    <SpinnerContainer>
      <Bounce />
      <Bounce />
      <Bounce />
    </SpinnerContainer>
  );
};

export default Spinner;
