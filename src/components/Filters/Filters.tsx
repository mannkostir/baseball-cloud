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
  [key: string]: any;
}

const FilterSelect = ({
  ...props
}: IFilterSelectProps & SelectHTMLAttributes<HTMLSelectElement> & any) => {
  return (
    <ProfileSidebar.SelectInput
      styles={{
        container: (provided, state) => ({
          ...provided,
          minWidth: '100px',
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
          width: '100%',
        }),
        dropdownIndicator: (provided, state) => ({
          ...provided,
          color: '#48bbff !important',
        }),
      }}
      {...props}
    />
  );
};

Filters.TextInput = FilterInput;
Filters.SelectInput = FilterSelect;

export default Filters;
