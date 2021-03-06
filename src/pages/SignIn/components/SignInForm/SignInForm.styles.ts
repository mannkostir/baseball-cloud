import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';

export const Container = styled.div`
  font-size: 1rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const FormHeader = styled.header`
  display: flex;
  color: #667784;
  align-items: center;
  flex-direction: column;
  margin-bottom: 3em;
`;

export const ForgottenPassword = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 15px;
`;

export const FormFooter = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SigUpLink = styled(Link)`
  margin-left: 4px;
  text-decoration: underline;
  color: #48bbff;
  &:hover,
  &:active {
    color: #48bbff;
  }
`;
