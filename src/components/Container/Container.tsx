import React from 'react';
import styled from 'styled-components/macro';

const StyledContainer = styled.div`
  display: flex;
  overflow: auto;
  flex-direction: column;
  width: 100%;
`;

interface IContainerProps {
  children: JSX.Element | JSX.Element[];
}

const Container = ({
  children,
  ...props
}: IContainerProps & React.HTMLAttributes<HTMLDivElement>) => {
  return <StyledContainer {...props}>{children}</StyledContainer>;
};

export default Container;
