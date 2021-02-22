import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '..';

export const useAuthSelector = () => {
  const authState = useSelector((state: RootState) => state.auth);

  const isAuthenticated = useMemo(() => authState.userId && !authState.error, [
    authState.userId,
    authState.error,
  ]);

  return {
    userId: authState.userId,
    isAuthenticated,
    isLoading: authState.isLoading,
    error: authState.error,
  };
};
