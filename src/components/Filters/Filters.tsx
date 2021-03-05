import React, { InputHTMLAttributes, useState } from 'react';
import AsyncSelect, { AsyncProps, defaultProps } from 'react-select/async';
import {
  CommonProps,
  components,
  GroupTypeBase,
  OptionTypeBase,
  IndicatorProps,
} from 'react-select';
import ProfileSidebar from '../ProfileSidebar';
import * as Styled from './Filters.styles';
import Icons from '../Icons';

const Filters = () => {
  return <div></div>;
};

const DropdownIndicator = ({
  isExpanded,
  ...props
}: { isExpanded: boolean } & IndicatorProps<
  OptionTypeBase,
  boolean,
  GroupTypeBase<OptionTypeBase>
>) => {
  return (
    <components.DropdownIndicator {...props}>
      <Icons.DropdownCaret
        style={{
          ...(isExpanded
            ? { transform: 'rotate(180deg)' }
            : { transform: 'rotate(0deg)' }),
          padding: '0 8px',
        }}
      />
    </components.DropdownIndicator>
  );
};

interface IFilterInputProps {
  selected?: boolean;
  width?: string;
  Icon?: () => JSX.Element;
  placeholderColor?: string;
  [key: string]: any;
}

const FilterInput = ({
  selected = false,
  width,
  Icon,
  placeholderColor,
  ...props
}: IFilterInputProps & InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <div style={{ position: 'relative' }}>
      <Styled.FilterInput
        placeholderColor={placeholderColor}
        style={{ width, ...(!!Icon ? { paddingLeft: '25px' } : {}) }}
        {...props}
      />
      {!!Icon && (
        <div
          style={{
            position: 'absolute',
            left: '0',
            top: '0',
            transform: 'translateY(50%)',
          }}
        >
          {Icon()}
        </div>
      )}
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
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <ProfileSidebar.SelectInput
      input={input}
      isMulti={false}
      isSearchable={false}
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
      onMenuOpen={() => setIsExpanded(true)}
      onMenuClose={() => setIsExpanded(false)}
      components={{
        DropdownIndicator: (
          props: IndicatorProps<
            OptionTypeBase,
            boolean,
            GroupTypeBase<OptionTypeBase>
          >
        ) => <DropdownIndicator {...props} isExpanded={isExpanded} />,
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
