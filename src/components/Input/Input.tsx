import React, { InputHTMLAttributes } from 'react';
import * as Styled from './Input.styles';

const Input = ({ ...props }: InputHTMLAttributes<HTMLInputElement>) => {
  return <Styled.Input {...props} />;
};

export default Input;
