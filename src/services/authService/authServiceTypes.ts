import { ResponseStatus, User } from '@/types/commonTypes';

export type SignInRequest = {
  email: string;
  password: string;
};
export type SignInResponse = { data: User };

export type SignUpRequest = {
  email: string;
  password: string;
  password_confirmation: string;
  role: string;
};
export type SignUpResponse = {
  data: User;
  status: ResponseStatus;
};

export type SignOutRequest = undefined;
export type SignOutResponse = { success: boolean };

export type ValidateTokenRequest = undefined;
export type ValidateTokenResponse = {
  data: User;
  success: true;
};
