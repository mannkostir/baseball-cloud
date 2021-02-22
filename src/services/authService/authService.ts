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
import { RequestHeaders, UserCredentials } from '@/types/commonTypes';

export const signIn = async (
  params: SignInRequest
): Promise<SignInResponse & { credentials: UserCredentials }> => {
  const res = await fetchAPI.post<SignInResponse>('/auth/sign_in', {
    ...params,
  });

  const headers: RequestHeaders = res.headers;

  const credentials: UserCredentials = {
    token: headers['access-token'],
    client: headers.client,
    uid: headers.uid,
  };

  return { ...res.data, credentials };
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
