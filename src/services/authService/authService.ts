import {
  SignInRequest,
  SignInResponse,
  SignOutRequest,
  SignOutResponse,
  SignUpRequest,
  SignUpResponse,
  ValidateTokenRequest,
  ValidateTokenResponse,
} from './authServiceTypes';
import fetchAPI from '@/services';

export const signIn = async (params: SignInRequest) => {
  const { data } = await fetchAPI.post<SignInResponse>('/auth/sign_in', {
    ...params,
  });

  return data;
};

export const signUp = async (params: SignUpRequest) => {
  const { data } = await fetchAPI.post<SignUpResponse>('/auth/sign_up', {
    ...params,
  });

  return data;
};

export const signOut = async (params: SignOutRequest) => {
  const { data } = await fetchAPI.delete<SignOutResponse>('/auth/sign_out');

  return data;
};

export const validateToken = async (params: ValidateTokenRequest) => {
  const { data } = await fetchAPI.get<ValidateTokenResponse>(
    '/auth/validate_token'
  );

  return data;
};
