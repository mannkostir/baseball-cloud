import React, { InputHTMLAttributes, useState } from 'react';
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
import { AsyncSelect, Select } from '../FinalFormAdapters';
import { FieldRenderProps } from 'react-final-form';

const Filters = () => {
  return <div></div>;
};

const DropdownIndicator = ({
  isExpanded,
  ...props
}: any & {
  isExpanded: boolean;
}) => {
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

const FilterSelect = (
  props: React.ComponentProps<typeof Select> & {
    width?: string;
  }
) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <Select
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
          width: props.width || 'auto',
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
          position: 'static',
          top: 0,
          transform: 'none',
        }),
        singleValue: (provided, state) => ({
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          color: '#48bbff',
        }),
        input: (provided, state) => ({
          ...provided,
          // position: 'absolute',
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
        ...(props.style && props.style),
      }}
      {...props}
      onMenuOpen={() => setIsExpanded(true)}
      onMenuClose={() => setIsExpanded(false)}
      components={{
        DropdownIndicator: (indicatorProps: any) => (
          <DropdownIndicator {...indicatorProps} isExpanded={isExpanded} />
        ),
      }}
    />
  );
};

const AsyncSelectInput = (props: React.ComponentProps<typeof AsyncSelect>) => {
  return (
    <AsyncSelect
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
