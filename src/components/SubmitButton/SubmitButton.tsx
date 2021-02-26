import React from 'react';
import * as Styled from './SubmitButton.styles';

interface ISubmitButtonProps {
  children: JSX.Element | JSX.Element[] | string;
}

const SubmitButton = ({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & ISubmitButtonProps) => {
  return (
    <Styled.Button type="submit" {...props}>
      {children}
    </Styled.Button>
  );
};

export default SubmitButton;
