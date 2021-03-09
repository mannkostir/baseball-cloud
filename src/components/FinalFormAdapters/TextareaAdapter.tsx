import React from 'react';
import { FieldRenderProps } from 'react-final-form';

const TextareaAdapter = ({
  input,
  ...props
}: FieldRenderProps<string, HTMLTextAreaElement> &
  React.HTMLAttributes<HTMLTextAreaElement>) => {
  return <textarea {...input} value={input.value} {...props} />;
};

export default TextareaAdapter;
