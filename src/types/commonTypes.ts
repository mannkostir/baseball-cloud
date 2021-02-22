export type Unpromise<T extends Promise<any>> = T extends Promise<infer U>
  ? U
  : never;

export type UserRole = 'player' | 'scout';

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

export type ResponseStatus = 'success' | 'failure' | 'pending';
export type ResponseError = {
  errors: string[];
  success: false;
};

export type UserCredentials = {
  token: string;
  client: string;
  uid: string;
};

export type RequestHeaders = {
  'access-token': string;
  client: string;
  uid: string;
};
