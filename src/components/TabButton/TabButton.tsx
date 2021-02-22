import React, { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components/macro';

const StyledTabButton = styled.button<{ isSelected: boolean }>`
  padding: 8px;
  margin: 8px;
  border: 2px solid #788b99;
  border-radius: 40px;
  font-size: 14px;
  line-height: 17px;
  font-weight: 700;
  color: ${(props) => (props.isSelected ? '#ffffff' : '#667784')};
  background: ${(props) => (props.isSelected ? '#788b99' : 'transparent')};
  cursor: pointer;
  &:hover {
    color: ${(props) => (props.isSelected ? '#ffffff' : '#788b99')};
    background: rgba(120, 139, 153, 0.4);
  }
`;

interface ITabButtonProps {
  isSelected?: boolean;
  children: JSX.Element | JSX.Element[] | string;
}

const TabButton = ({
  children,
  isSelected = false,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & ITabButtonProps) => {
  return (
    <StyledTabButton isSelected={isSelected} {...props}>
      {children}
    </StyledTabButton>
  );
};

export default TabButton;
