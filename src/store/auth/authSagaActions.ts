import {
  SignInRequest,
  SignOutRequest,
  SignUpRequest,
  ValidateTokenRequest,
} from '@/services/authService/authServiceTypes';
import { createAction } from '@reduxjs/toolkit';

enum AuthPublicActions {
  SIGN_IN = 'signInRequested',
  SIGN_UP = 'signUpRequested',
  SIGN_OUT = 'signOutRequested',
  VALIDATE_TOKEN = 'validateTokenRequested',
}

export const signIn = createAction<SignInRequest>(AuthPublicActions.SIGN_IN);
export const signUp = createAction<SignUpRequest>(AuthPublicActions.SIGN_UP);
export const signOut = createAction<SignOutRequest>(AuthPublicActions.SIGN_OUT);
export const validateToken = createAction<ValidateTokenRequest>(
  AuthPublicActions.VALIDATE_TOKEN
);
