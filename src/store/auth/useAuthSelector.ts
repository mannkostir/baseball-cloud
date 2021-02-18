import { useSelector } from 'react-redux';
import { RootState } from '..';

export const useAuthSelector = () => {
  const authState = useSelector((state: RootState) => state.auth);

  return { currentUser: authState.user };
};
