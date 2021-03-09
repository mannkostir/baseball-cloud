import React from 'react';
import Select from 'react-select';

const ReactSelectInput = (
  props: Select<{ label: string; value: any }>['props'] | Record<string, any>
) => {
  return <Select {...props} />;
};

export default ReactSelectInput;
