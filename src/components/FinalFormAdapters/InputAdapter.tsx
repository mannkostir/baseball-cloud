import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import Input from '../Input';

const TextInputAdapter = ({
  input,
  ...props
}: FieldRenderProps<string | number, HTMLInputElement> &
  React.InputHTMLAttributes<HTMLInputElement>) => {
  return <Input {...input} value={input?.value} {...props} />;
};

export default TextInputAdapter;
