import { useSelector } from 'react-redux';
import { RootState } from '..';

export const useProfileSelector = () => {
  const profileState = useSelector((state: RootState) => state.profile);

  return { ...profileState };
};
