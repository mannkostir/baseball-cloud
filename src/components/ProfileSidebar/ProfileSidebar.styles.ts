import styled from 'styled-components/macro';
import Input from '../Input';
import Select, { Styles, StylesConfig } from 'react-select';

export const DataItem = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SectionTitleContainer = styled.div`
  position: relative;
  margin: 15px 0;
  &::before {
    content: '';
    position: absolute;
    top: 11px;
    left: 0;
    right: 0;
    height: 1px;
    background-color: #e7ebef;
    z-index: 0;
  }
`;

export const SectionTitle = styled.h3`
  display: inline-block;
  position: relative;
  padding-right: 12px;
  font-weight: 900;
  color: #414f5a;
  z-index: 2;
  background-color: #ffffff;
`;

export const Heading = styled.span`
  font-size: 14px;
  line-height: 17px;
  font-weight: 300;
  color: #667784;
  margin-bottom: 3px;
  text-align: left;
`;

export const Value = styled.span`
  font-size: 16px;
  color: #667784;
  margin-bottom: 11px;
`;

export const InlineInputsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  > * {
    flex: 0 0 48%;
  }
`;

export const TextInput = styled(Input)`
  height: 40px;
  padding: 0 16px;
`;

export const TextareaInput = styled.textarea`
  display: block;
  width: 100%;
  min-height: 110px;
  resize: none;
  border-radius: 4px;
  background-color: #eff1f3;
  padding: 11px 16px;
  font-size: 1rem;
  line-height: 1.13;
  font-weight: 400;
  color: #667784;
  border: 1px solid transparent;
  &:focus,
  &:active {
    outline: none;
    background-color: #fff;
    border: solid 1px #48bbff;
  }
`;

// export const ReactSelect = styled(Select)<{ isFocused: boolean }>`
//   &.react-select__control {
//     max-width: 100%;
//     height: 40px;
//     background-color: #eff1f3;
//     border-width: 1px;
//     border-style: solid;
//     font-weight: normal;
//     color: #667784;
//     border-color: transparent !important;
//     line-height: 1.13;
//     border-spacing: 0;
//     border-collapse: separate;
//     &:hover {
//       box-shadow: ${(props) =>
//         props.isFocused ? 'none' : '0 1px 0 rgb(0 0 0 / 6%)'};
//       border-color: #48bbff;
//     }
//   }
// `;

//   control: (provided, state) => ({
//     ...provided,
//     maxWidth: '100%',
//     height: '40px',
//     borderRadius: '4px',
//     backgroundColor: '#eff1f3',
//     borderWidth: '1px',
//     borderStyle: 'solid',
//     fontWeight: 'normal',
//     color: '#667784',
//     borderColor: 'transparent !important',
//     lineHeight: '1.13',
//     borderSpacing: '0',
//     borderCollapse: 'separate',
//     [':hover']: {
//       boxShadow: state.isFocused ? 'none' : '0 1px 0 rgb(0 0 0 / 6%)',
//       borderColor: '#48bbff',
//     },
//     ...(state.isFocused
//       ? {
//           backgroundColor: '#ffffff',
//           borderColor: '#48bbff',
//           boxShadow: 'none',
//         }
//       : {}),
//   }),
//   container: (provided, state) => ({
//     ...provided,
//     marginBottom: '15px',
//   }),
//   indicatorSeparator: (provided, state) => ({
//     ...provided,
//     display: 'none',
//   }),
//   menu: (provided, state) => ({
//     ...provided,
//     zIndex: 5,
//   }),
//   menuList: (provided, state) => ({
//     ...provided,
//     maxHeight: '200px',
//     overflow: 'auto',
//   }),
//   dropdownIndicator: (provided, state) => ({
//     ...provided,
//     color: 'hsl(0, 0%, 50%) !important',
//   }),
//   singleValue: (provided, state) => ({
//     ...provided,
//     color: '#667784',
//   }),
//   multiValue: (provided, state) => ({
//     ...provided,
//     color: '#007eff',
//   }),
//   multiValueLabel: (provided, state) => ({
//     ...provided,
//     color: '#007eff',
//   }),
//   placeholder: (provided, state) => ({
//     ...provided,
//     color: '#667784',
//   }),
//   multiValueRemove: (provided, state) => ({
//     ...provided,
//     left: 0,
//   }),
//   ...styles,
// }
