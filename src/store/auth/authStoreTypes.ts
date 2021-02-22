import { User } from '@/types/commonTypes';

export type AuthState = {
  user: User | null;
  isLoading: boolean;
  error: string;
};
