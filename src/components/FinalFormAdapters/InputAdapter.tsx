import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import styled from 'styled-components';
import Input from '../Input';

export const StyledInput = styled(Input)`
  height: 40px;
  padding: 0 16px;
`;

const TextInputAdapter = ({
  input,
  ...props
}: FieldRenderProps<string | number, HTMLInputElement> &
  React.InputHTMLAttributes<HTMLInputElement>) => {
  return <StyledInput {...input} value={input?.value} {...props} />;
};

export default TextInputAdapter;
