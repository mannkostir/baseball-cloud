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

export type PlayerPosition =
  | 'catcher'
  | 'first_base'
  | 'second_base'
  | 'shortshop'
  | 'third_base'
  | 'outfield'
  | 'pitcher';

export type SchoolYear = 'freshman' | 'sophomore' | 'junior' | 'senior' | '';

export type School = { name: string; id: string };

export type Team = { name: string; id: string };

export type Facility = { id: string; email: string; u_name: string };

export type ReactSelectValue<T = string> = { value: T; label: string };

export type FormValue<T = string> = ReactSelectValue<T> | string | number;

export type ReactSelectOptions<T = string> = { value: T; label: string }[];

export type FilterType = 'exit_velocity' | 'carry_distance';
