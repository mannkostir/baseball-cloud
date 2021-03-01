import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppContainer, GlobalStyles, MainContent } from './App.styles';
import Footer from './components/Footer';
import Header from './components/Header';
import Notifications from './components/Notifications';
import Routes from './Routes';
import { authActions, useAuthSelector } from './store/auth';
import { useNotificationSelector } from './store/notifications';
import { profileActions } from './store/profile';

function App() {
  const { currentNotifications } = useNotificationSelector();

  const { isAuthenticated } = useAuthSelector();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) return;

    dispatch(authActions.validateToken());
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;

    dispatch(profileActions.getCurrentProfile());
  }, [isAuthenticated]);

  return (
    <Router>
      <GlobalStyles />
      <AppContainer>
        <Notifications
          dispatch={dispatch}
          notifications={currentNotifications}
        />
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
