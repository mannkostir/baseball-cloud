import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '..';

export const useAuthSelector = () => {
  const authState = useSelector((state: RootState) => state.auth);

  const isAuthenticated = useMemo(
    () => authState.user?.id && authState.user?.uid && !authState.error,
    [authState.user]
  );

  return { currentUser: authState.user, isAuthenticated };
};
