import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppContainer, GlobalStyles, MainContent } from './App.styles';
import Footer from './components/Footer';
import Header from './components/Header';
import Routes from './Routes';
import { authActions, useAuthSelector } from './store/auth';

function App() {
  const { isAuthenticated } = useAuthSelector();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) return;

    dispatch(authActions.validateToken());
  }, []);
  return (
    <Router>
      <GlobalStyles />
      <AppContainer>
        <Header />
        <MainContent>
          <Routes />
        </MainContent>
        <Footer />
      </AppContainer>
    </Router>
  );
}

export default App;
