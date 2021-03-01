import { useSelector } from 'react-redux';
import { RootState } from '..';

export const useViewSelector = () => {
  const viewState = useSelector((state: RootState) => state.view);

  return { ...viewState };
};
