import styled, { createGlobalStyle } from 'styled-components';

export const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-flow: column;
`;

export const GlobalStyles = createGlobalStyle`
  *, *::after, *::before {
    box-sizing: border-box;
  }
  body {
    font-size: 16px;
    font-weight: 400;
    font-style: normal;
    color: #667784;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  h2 {
    font-size: 24px;
    line-height: 1.25;
    font-weight: 400;
    text-align: center;
    color: #667784;
    margin: 0;
    margin-bottom: 8px;
  }
`;
