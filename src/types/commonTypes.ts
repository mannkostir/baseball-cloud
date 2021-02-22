export type Unpromise<T extends Promise<any>> = T extends Promise<infer U>
  ? U
  : never;

export type UserRole = 'player' | 'scout';

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
