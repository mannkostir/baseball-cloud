import styled from 'styled-components/macro';

export const Input = styled.input`
  width: 100%;
  height: 50px;
  border-radius: 4px;
  background-color: #eff1f3;
  padding: 6px 12px 10px 37px;
  font-weight: 400;
  color: #667784;
  border: 1px solid transparent;
  line-height: 1.13;
  &:not(:last-child) {
    margin-bottom: calc(1em - 1px);
  }
  &:focus {
    outline: none;
    background-color: #fff;
    border: solid 1px #48bbff;
  }
`;
