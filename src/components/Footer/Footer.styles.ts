import styled from 'styled-components/macro';

export const FooterContainer = styled.footer`
  grid-area: footer;
  background: #fff;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  font-size: 14px;
  height: 40px;
`;

export const Copyright = styled.span`
  color: #333333;
  padding-right: 10px;
`;

export const Legal = styled.div`
  & > a {
    padding: 8px;
  }
`;

export const Social = styled.div`
  & > a {
    padding: 8px;
  }
`;
