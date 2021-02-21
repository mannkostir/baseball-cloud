import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppContainer, GlobalStyles } from './App.styles';
import Footer from './components/Footer';
import Header from './components/Header';
import Routes from './Routes';

function App() {
  return (
    <Router>
      <GlobalStyles />
      <AppContainer>
        <Header />
        <Routes />
        <Footer />
      </AppContainer>
    </Router>
  );
}

export default App;
