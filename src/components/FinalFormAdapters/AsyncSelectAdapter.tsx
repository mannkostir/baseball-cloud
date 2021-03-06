import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { AsyncSelect } from '../ReactSelectInputs';

function AsyncSelectAdapter({
  input,
  ...props
}: FieldRenderProps<any, HTMLSelectElement> &
  React.ComponentProps<typeof AsyncSelect>) {
  return <AsyncSelect {...input} value={input.value} {...props} />;
}

export default AsyncSelectAdapter;
