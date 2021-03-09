import AuthView from '@/components/AuthView';
import SignUpForm from './components/SignUpForm';
import { SignUpRequest } from '@/api/auth/authAPITypes';
import { authActions } from '@/store/auth';
import React from 'react';
import { useDispatch } from 'react-redux';

const SignUp = () => {
  const dispatch = useDispatch();

  const signUp = ({
    email,
    password,
    password_confirmation,
    role,
  }: SignUpRequest) => {
    dispatch(
      authActions.signUp({ email, password, password_confirmation, role })
    );
  };

  return (
    <AuthView>
      <SignUpForm signUp={signUp} />
    </AuthView>
  );
};

export default SignUp;
