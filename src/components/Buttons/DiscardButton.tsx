import React, { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components/macro';

const StyledButton = styled.button`
  border: solid 1px #d1d7db;
  background-color: #ffffff;
  box-shadow: 0 2px 25px 0 rgb(0 0 0 / 0%);
  width: 100%;
  flex: 1 1 auto;
  display: block;
  padding: 7px 19px 10px 18px;
  border-radius: 4px;
  box-shadow: none;
  font-size: 16px;
  line-height: 19px;
  font-weight: 400;
  margin-bottom: 15px;
  color: #333333;
  &:hover {
    color: #48bbff;
    box-shadow: 0 0 4px 0 rgb(72 187 255 / 80%);
    border: solid 1px #48bbff;
  }
  &:active {
    box-shadow: inset 0 1px 3px 0 rgb(0 0 0 / 30%);
    border: solid 1px #48bbff;
    color: #48bbff;
  }
`;

const DiscardButton = ({
  children,
  ...props
}: { children: string } & ButtonHTMLAttributes<HTMLButtonElement>) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};

export default DiscardButton;
