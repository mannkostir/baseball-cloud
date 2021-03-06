import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const FormHeader = styled.header`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
`;

export const RoleButtonsWrapper = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

export const RoleButton = styled.button<{ isSelected: boolean }>`
  flex: 1 1 auto;
  padding: 15px 5px 17px;
  display: flex;
  justify-content: center;
  color: ${(props) => (props.isSelected ? '#ffffff' : '#35c32a')};
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.13;
  border-radius: 0;
  border: solid 1px #35c32a;
  background-color: ${(props) => (props.isSelected ? '#35c32a' : '#ffffff')};
  outline: none;
  &:hover {
    color: #ffffff;
    border: solid 1px #35c32a;
    background-color: #35c32a;
  }
  &:first-child {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }
  &:nth-child(2) {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
`;

export const RoleDescription = styled.div`
  background: #48bbff;
  border-radius: 8px;
  padding: 16px;
`;

export const RoleTitle = styled.h1`
  line-height: 0.78;
  text-align: center;
  color: #ffffff;
`;

export const RoleText = styled.p`
  font-size: 14px;
  margin: 0;
  line-height: 1.44;
  color: #ffffff;
`;

export const Legal = styled.div`
  padding: 0 10px;
  margin: 8px 0;
  color: #333333;
`;
export const FormFooter = styled.footer`
  display: flex;
  justify-content: center;
`;

export const SignInLink = styled(Link)`
  margin-left: 4px;
  text-decoration: underline;
  color: #48bbff;
  &:hover,
  &:active {
    color: #48bbff;
  }
`;
