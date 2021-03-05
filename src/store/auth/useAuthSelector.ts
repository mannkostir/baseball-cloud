import { useSelector } from 'react-redux';
import { RootState } from '..';

export const useAuthSelector = () => {
  const authState = useSelector((state: RootState) => state.auth);

  const isAuthenticated = !!authState.userId && !authState.error;

  return {
    userId: authState.userId,
    isAuthenticated,
    isAuthLoading: authState.isLoading,
    error: authState.error,
  };
};
