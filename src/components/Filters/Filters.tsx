import React, { InputHTMLAttributes, SelectHTMLAttributes } from 'react';
import AsyncSelect, { AsyncProps, defaultProps } from 'react-select/async';
import { SingleValueProps } from 'react-select';
import ProfileSidebar from '../ProfileSidebar';
import * as Styled from './Filters.styles';

const Filters = () => {
  return <div></div>;
};

interface IFilterInputProps {
  selected?: boolean;
  width?: string;
  [key: string]: any;
}

const FilterInput = ({
  selected = false,
  width,
  ...props
}: IFilterInputProps & InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <div>
      <Styled.FilterInput selected={selected} style={{ width }} {...props} />
    </div>
  );
};

interface IFilterSelectProps {
  input: Record<string, any>;
  onChange?: (value: any) => any | void;
  width?: string;
  [key: string]: any;
}

const FilterSelect = ({ input, width, ...props }: IFilterSelectProps) => {
  return (
    <ProfileSidebar.SelectInput
      input={input}
      isMulti={false}
      styles={{
        container: (provided, state) => ({
          ...provided,
          display: 'inline-block',
        }),
        valueContainer: (provided, state) => ({
          ...provided,
          padding: '0',
          width: width || 'auto',
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
        singleValue: (provided, state) => ({
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          color: '#48bbff',
        }),
        input: (provided, state) => ({
          ...provided,
          position: 'absolute',
          color: 'red',
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
        ...(props.style && props.style),
      }}
      {...props}
      onChange={(value: any) => {
        input.onChange && input.onChange(value);
        props.onChange && props.onChange(value);
      }}
    />
  );
};

interface IFilterAsyncSelectProps {
  input: Record<string, any>;
  [key: string]: any;
}

const AsyncSelectInput = ({ input, ...props }: IFilterAsyncSelectProps) => {
  return (
    <AsyncSelect
      input={input}
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
Filters.AsyncSelectInput = AsyncSelectInput;

export default Filters;
