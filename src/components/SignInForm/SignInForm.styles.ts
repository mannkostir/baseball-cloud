import styled from 'styled-components';

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  > input:not(:last-child) {
    margin-bottom: 10px;
  }
`;

export const StyledInput = styled.input`
  width: 100%;
  height: 50px;
  border-radius: 4px;
  background-color: #eff1f3;
  padding: 6px 12px 10px 37px;
  font-weight: 400;
  color: #667784;
  border: 1px solid transparent;
  box-sizing: border-box;
`;
