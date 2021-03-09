import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppContainer, GlobalStyles, MainContent } from './App.styles';
import Footer from './components/Footer';
import Header from './components/Header';
import LoadingScreen from './components/LoadingScreen';
import Notifications from './components/Notifications';
import { useMount } from './hooks/useMount';
import Routes from './Routes';
import { authActions, useAuthSelector } from './store/auth';
import { useNotificationSelector } from './store/notifications';
import { profileActions } from './store/profile';

function App() {
  const { currentNotifications } = useNotificationSelector();

  const { isAuthenticated, isAuthLoading } = useAuthSelector();
  const dispatch = useDispatch();

  useMount(() => {
    if (isAuthenticated) return;

    dispatch(authActions.validateToken());
  });

  useEffect(() => {
    if (!isAuthenticated) return;

    dispatch(profileActions.getCurrentProfile());
    // disabling warning because passing dispatch as dependency is not intended
  }, [isAuthenticated]); // eslint-disable-line react-hooks/exhaustive-deps

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
          {isAuthLoading ? <LoadingScreen /> : <Routes />}
        </MainContent>
        <Footer />
      </AppContainer>
    </Router>
  );
}

export default App;
