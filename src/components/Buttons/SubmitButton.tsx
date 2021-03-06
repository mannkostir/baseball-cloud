import React from 'react';
import styled from 'styled-components/macro';

export const StyledButton = styled.button`
  font-size: 1rem;
  padding-top: 15px;
  padding-bottom: 17px;
  width: 100%;
  flex: 1 1 auto;
  margin-bottom: 15px;
  color: #ffffff;
  font-weight: 400;
  border: solid 1px transparent;
  box-shadow: 0 0 4px 0 rgb(72 187 255 / 0%);
  background-color: #48bbff;
  border-radius: 4px;
  line-height: 19px;
  outline: none;
  &:hover {
    box-shadow: 0 0 4px 0 rgb(72 187 255 / 80%);
  }
  &:active {
    box-shadow: inset 0 1px 3px 0 rgb(0 0 0 / 25%);
  }
`;

interface ISubmitButtonProps {
  children: JSX.Element | JSX.Element[] | string;
}

const SubmitButton = ({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & ISubmitButtonProps) => {
  return (
    <StyledButton type="submit" {...props}>
      {children}
    </StyledButton>
  );
};

export default SubmitButton;
