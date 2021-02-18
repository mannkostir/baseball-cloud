import React from 'react';
import { Redirect, Route, RouteProps, Switch } from 'react-router-dom';
import Auth from '@/pages/Auth';
import Profile from '@/pages/Profile';
import Leaderboard from '@/pages/Leaderboard';
import PlayersList from '@/pages/PlayersList';
import PlayerInfo from '@/pages/PlayerInfo';

const isAuthenticated = false;

const AuthOnlyRoute = ({
  children,
  ...props
}: RouteProps & {
  children: JSX.Element | JSX.Element[];
}) => {
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
        <Auth />
      </UnAuthOnlyRoute>
      <UnAuthOnlyRoute path="/registration">
        <Auth />
      </UnAuthOnlyRoute>
      <AuthOnlyRoute path="/profile">
        <Profile />
      </AuthOnlyRoute>
      <AuthOnlyRoute path="/leaderboard">
        <Leaderboard />
      </AuthOnlyRoute>
      <AuthOnlyRoute path="/network">
        <PlayersList />
      </AuthOnlyRoute>
      <AuthOnlyRoute path="/profile/:id">
        <PlayerInfo />
      </AuthOnlyRoute>
      <Redirect to={{ pathname: '/profile' }} />
    </Switch>
  );
};

export default Routes;
