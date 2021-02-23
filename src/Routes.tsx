import React from 'react';
import { Redirect, Route, RouteProps, Switch } from 'react-router-dom';
import Profile from '@/pages/Profile';
import Leaderboard from '@/pages/Leaderboard';
import Network from '@/pages/Network';
import PlayerInfo from '@/pages/PlayerInfo';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import { useAuthSelector } from './store/auth';

const AuthOnlyRoute = ({
  children,
  ...props
}: RouteProps & {
  children: JSX.Element | JSX.Element[];
}) => {
  const { isAuthenticated } = useAuthSelector();
  return (
    <Route {...props}>
      {isAuthenticated ? children : <Redirect to={{ pathname: '/login' }} />}
    </Route>
  );
};

const UnAuthOnlyRoute = ({
  children,
  ...props
}: RouteProps & {
  children: JSX.Element | JSX.Element[];
}) => {
  const { isAuthenticated } = useAuthSelector();
  return (
    <Route {...props}>
      {!isAuthenticated ? children : <Redirect to={{ pathname: '/profile' }} />}
    </Route>
  );
};

const Routes = () => {
  return (
    <Switch>
      <UnAuthOnlyRoute path="/login">
        <SignIn />
      </UnAuthOnlyRoute>
      <UnAuthOnlyRoute path="/registration">
        <SignUp />
      </UnAuthOnlyRoute>
      <AuthOnlyRoute path="/profile">
        <Profile />
      </AuthOnlyRoute>
      <AuthOnlyRoute path="/leaderboard">
        <Leaderboard />
      </AuthOnlyRoute>
      <AuthOnlyRoute path="/network">
        <Network />
      </AuthOnlyRoute>
      <AuthOnlyRoute path="/profile/:id">
        <PlayerInfo />
      </AuthOnlyRoute>
      <Redirect to={{ pathname: '/profile' }} />
    </Switch>
  );
};

export default Routes;
