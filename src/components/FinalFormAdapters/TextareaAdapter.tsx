import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import styled from 'styled-components/macro';

export const StyledTextarea = styled.textarea`
  display: block;
  width: 100%;
  min-height: 110px;
  resize: none;
  border-radius: 4px;
  background-color: #eff1f3;
  padding: 11px 16px;
  font-size: 1rem;
  line-height: 1.13;
  font-weight: 400;
  color: #667784;
  border: 1px solid transparent;
  &:focus,
  &:active {
    outline: none;
    background-color: #fff;
    border: solid 1px #48bbff;
  }
`;

const TextareaAdapter = ({
  input,
  ...props
}: FieldRenderProps<string, HTMLTextAreaElement> &
  React.HTMLAttributes<HTMLTextAreaElement>) => {
  return <StyledTextarea {...input} value={input.value} {...props} />;
};

export default TextareaAdapter;
