import { ResponseStatus, UserRole } from '@/types/commonTypes';

export type User = {
  directPaid: boolean;
  email: string;
  id: number;
  paid: boolean;
  plan_id: number | null;
  role: UserRole;
  teamAvatar: {
    size_20_20: {
      url: string | null;
    };
    size_32_32: {
      url: string | null;
    };
    size_40_40: {
      url: string | null;
    };
    size_100_100: {
      url: string | null;
    };
    url: string | null;
  };
  teamUser: boolean;
  u_name: string | null;
  uid: string;
  unsubscribe: boolean;
};

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
