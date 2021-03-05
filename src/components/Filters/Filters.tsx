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
  Icon?: (props: any) => JSX.Element | null;
  placeholderColor?: string;
  position?: 'left' | 'right';
  [key: string]: any;
}

const FilterInput = ({
  selected = false,
  width,
  Icon = (props: any) => <Icons.DropdownCaret {...props} />,
  placeholderColor,
  position = 'right',
  ...props
}: IFilterInputProps & InputHTMLAttributes<HTMLInputElement>) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div style={{ position: 'relative' }}>
      <Styled.FilterInput
        placeholderColor={placeholderColor}
        style={{
          width,
          ...(position === 'left'
            ? { paddingLeft: '25px' }
            : { paddingRight: '25px' }),
        }}
        onClick={() => setIsExpanded(true)}
        onBlur={() => setIsExpanded(false)}
        {...props}
      />
      {!!Icon && (
        <div
          style={{
            position: 'absolute',
            [position]: '0',
            top: '0',
            transform: 'translateY(50%)',
          }}
        >
          <Icon
            style={{
              ...(isExpanded
                ? { transform: 'rotate(180deg)' }
                : { transform: 'rotate(0deg)' }),
              padding: '0 8px',
            }}
          />
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
          height: '100%',
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
        props.onChange && props.onChange(value);
        input.onChange && input.onChange(value);
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
          width: '100%',
          flexWrap: 'nowrap',
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
          position: 'static',
          transform: 'none',
          whiteSpace: 'nowrap',
        }),
        singleValue: (provided, state) => ({
          ...provided,
          position: 'static',
          overflow: 'visible',
          top: 0,
          transform: 'none',
        }),
        input: (provided, state) => ({
          ...provided,
        }),
        dropdownIndicator: (provided, state) => ({
          ...provided,
          padding: 0,
          color: '#48bbff !important',
        }),
        indicatorsContainer: (provided, state) => ({
          ...provided,
        }),
        indicatorSeparator: (provided, state) => ({
          ...provided,
          display: 'none',
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
