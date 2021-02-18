import styled from 'styled-components';

export const ModalContainer = styled.div`
  background: hsla(0, 0%, 100%, 0.8);
  padding: 16px;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  box-shadow: 0 0 20px rgb(0 0 0 / 40%);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(10px);
  width: 100%;
  max-width: 450px;
`;

export const StyledHeader = styled.header`
  display: flex;
  color: #667784;
  align-items: center;
  flex-direction: column;
`;

export const StyledAuthForm = styled.form``;
export const StyledAuthInput = styled.input``;
