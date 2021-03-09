import AuthView from '@/components/AuthView';
import SignInForm from './components/SignInForm';
import { SignInRequest } from '@/api/auth/authAPITypes';
import { authActions } from '@/store/auth';
import React from 'react';
import { useDispatch } from 'react-redux';

const SignIn = () => {
  const dispatch = useDispatch();

  const signIn = ({ email, password }: SignInRequest) => {
    dispatch(authActions.signIn({ email, password }));
  };

  return (
    <AuthView>
      <SignInForm signIn={signIn} />
    </AuthView>
  );
};

export default SignIn;
