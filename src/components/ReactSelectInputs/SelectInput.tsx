import React from 'react';
import { FieldInputProps } from 'react-final-form';
import Select from 'react-select';

const ReactSelectInput = (
  props: Select<{ label: string; value: any }>['props'] | Record<string, any>
) => {
  return (
    <Select
      styles={{
        control: (provided, state) => ({
          ...provided,
          maxWidth: '100%',
          height: '40px',
          borderRadius: '4px',
          backgroundColor: '#eff1f3',
          borderWidth: '1px',
          borderStyle: 'solid',
          fontWeight: 'normal',
          color: '#667784',
          borderColor: 'transparent !important',
          lineHeight: '1.13',
          borderSpacing: '0',
          borderCollapse: 'separate',
          [':hover']: {
            boxShadow: state.isFocused ? 'none' : '0 1px 0 rgb(0 0 0 / 6%)',
            borderColor: '#48bbff',
          },
          ...(state.isFocused
            ? {
                backgroundColor: '#ffffff',
                borderColor: '#48bbff',
                boxShadow: 'none',
              }
            : {}),
        }),
        container: (provided, state) => ({
          ...provided,
          marginBottom: '15px',
        }),
        indicatorSeparator: (provided, state) => ({
          ...provided,
          display: 'none',
        }),
        menu: (provided, state) => ({
          ...provided,
          zIndex: 5,
        }),
        menuList: (provided, state) => ({
          ...provided,
          maxHeight: '200px',
          overflow: 'auto',
        }),
        dropdownIndicator: (provided, state) => ({
          ...provided,
          color: 'hsl(0, 0%, 50%) !important',
        }),
        singleValue: (provided, state) => ({
          ...provided,
          color: '#667784',
        }),
        multiValue: (provided, state) => ({
          ...provided,
          color: '#007eff',
        }),
        multiValueLabel: (provided, state) => ({
          ...provided,
          color: '#007eff',
        }),
        placeholder: (provided, state) => ({
          ...provided,
          color: '#667784',
        }),
        multiValueRemove: (provided, state) => ({
          ...provided,
          left: 0,
        }),
      }}
      {...props}
    />
  );
};

export default ReactSelectInput;
