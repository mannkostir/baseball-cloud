import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { Select } from '../ReactSelectInputs';

const SelectAdapter = ({
  input,
  ...props
}: FieldRenderProps<any, HTMLSelectElement> &
  React.ComponentProps<typeof Select>) => {
  return <Select {...input} value={input.value} {...props} />;
};

export default SelectAdapter;
