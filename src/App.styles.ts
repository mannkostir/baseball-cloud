import styled, { createGlobalStyle } from 'styled-components/macro';

export const AppContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    'header header'
    'content content'
    'footer footer';
  min-height: 100vh;
`;

export const MainContent = styled.main`
  grid-area: content;
  background: #fff;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
`;

export const GlobalStyles = createGlobalStyle`
  *, *::after, *::before {
    box-sizing: border-box;
  }
  body {
    font-family: 'Lato';
    font-size: 16px;
    font-weight: 400;
    font-style: normal;
    color: #667784;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 0;
    line-height: 1.5;
  }
  input {
    font-family: 'Lato';
    font-size: 1rem;
    font-weight: 400;
    font-style: normal;
  }
  button {
    cursor: pointer;
    font-family: 'Lato';
    font-size: 1rem;
    font-weight: 400;
    font-style: normal;
    outline: none;
    background: transparent;
    border: none;
    box-shadow: none;
    color: #788B99;
  }
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  a {
    color: #337ab7;
    text-decoration: none;
    cursor: pointer;
    outline: none;
    &:hover {
      color: #23527c;
      text-decoration: underline;
    }
  }
  h1 {
    font-size: 36px;
    font-weight: 700;
    font-style: normal;
    line-height: 1.25;
    margin: 0;
    margin-bottom: 21px;
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
  h3 {
    font-size: 18px;
    line-height: 1.25;
    font-weight: 900;
    color: #414f5a;
    margin: 0;
  }
`;
