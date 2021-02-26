import React, { HTMLAttributes } from 'react';
import Select from 'react-select';
import * as Styled from './ProfileSidebar.styles';

interface IProfileSidebar {
  children: JSX.Element | JSX.Element[] | string;
}

const ProfileSidebar = ({ children }: IProfileSidebar) => {
  return <div>{children}</div>;
};

const SectionTitle = ({
  children,
  ...props
}: { children: string } & HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <Styled.SectionTitleContainer>
      <Styled.SectionTitle {...props}>{children}</Styled.SectionTitle>
    </Styled.SectionTitleContainer>
  );
};

interface ITextInputAdapterProps {
  input: Record<string, any>;
  onChange?: (e: any) => void;
  [key: string]: any;
}

const TextInputAdapter = ({
  input,
  ...props
}: ITextInputAdapterProps & HTMLAttributes<HTMLInputElement>) => {
  return <Styled.TextInput type="text" {...input} {...props} />;
};

interface ITextareaAdapterProps {
  input: Record<string, any>;
  [key: string]: any;
}

const TextareaInputAdapter = ({
  input,
  ...props
}: ITextareaAdapterProps & HTMLAttributes<HTMLTextAreaElement>) => {
  return <Styled.TextareaInput {...input} {...props} />;
};

interface IReactSelectAdapterProps {
  input: Record<string, any>;
  [key: string]: any;
}

const ReactSelectAdapter = ({ input, ...props }: IReactSelectAdapterProps) => {
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
      placeholder={props.placeholder}
      {...input}
      {...props}
    />
  );
};

ProfileSidebar.DataItem = Styled.DataItem;
ProfileSidebar.SectionTitle = SectionTitle;
ProfileSidebar.Heading = Styled.Heading;
ProfileSidebar.Value = Styled.Value;
ProfileSidebar.InlineInputsWrapper = Styled.InlineInputsWrapper;
ProfileSidebar.TextInput = TextInputAdapter;
ProfileSidebar.SelectInput = ReactSelectAdapter;
ProfileSidebar.TextareaInput = TextareaInputAdapter;

export default ProfileSidebar;
