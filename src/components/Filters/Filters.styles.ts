import styled from 'styled-components/macro';
import ProfileSidebar from '../ProfileSidebar';

export const FilterInput = styled(ProfileSidebar.TextInput)<{
  placeholderColor?: string;
  isFocused: boolean;
}>`
  display: flex;
  align-items: center;
  width: 66px;
  padding: 5px;
  font-size: 16px;
  line-height: 19px;
  min-height: 38px;
  font-weight: 400;
  color: #788b99;
  background: transparent;
  -webkit-transition: width 0.5s;
  transition: width 0.5s;
  border: none;
  border-radius: 0;
  flex: 1;
  &:focus {
    width: 180px;
    border: none;
    border-bottom: 1px solid #48bbff;
    outline: none;
    color: #788b99;
    padding-bottom: 6px;
    &::placeholder {
      color: #788b99;
    }
  }
  &::placeholder {
    color: ${(props) =>
      props.placeholderColor ? props.placeholderColor : '#48bbff'};
  }
`;
