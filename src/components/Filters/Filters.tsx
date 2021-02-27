import React, { InputHTMLAttributes, SelectHTMLAttributes } from 'react';
import ProfileSidebar from '../ProfileSidebar';
import * as Styled from './Filters.styles';

const Filters = () => {
  return <div></div>;
};

interface IFilterInputProps {
  selected?: boolean;
  [key: string]: any;
}

const FilterInput = ({
  selected = false,
  ...props
}: IFilterInputProps & InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <div>
      <Styled.FilterInput selected={selected} {...props} />
    </div>
  );
};

interface IFilterSelectProps {
  input: Record<string, any>;
  [key: string]: any;
}

const FilterSelect = ({
  ...props
}: IFilterSelectProps & SelectHTMLAttributes<HTMLSelectElement>) => {
  return (
    <ProfileSidebar.SelectInput
      styles={{
        container: (provided, state) => ({
          ...provided,
        }),
        valueContainer: (provided, state) => ({
          ...provided,
          padding: '0',
          width: `${
            state.selectProps.placeholder
              ? state.selectProps.placeholder.toString().length * 5 + 20
              : '80'
          }px`,
        }),
        control: (provided, state) => ({
          ...provided,
          background: 'transparent',
          border: 'none',
          outline: 'none',
          boxShadow: 'none',
        }),
        placeholder: (provided, state) => ({
          ...provided,
          color: '#48bbff',
        }),
        dropdownIndicator: (provided, state) => ({
          ...provided,
          padding: 0,
          color: '#48bbff !important',
        }),
        indicatorsContainer: (provided, state) => ({
          ...provided,
        }),
        menu: (provided, state) => ({
          ...provided,
          width: 'auto',
        }),
      }}
      {...props}
    />
  );
};

Filters.TextInput = FilterInput;
Filters.SelectInput = FilterSelect;

export default Filters;
