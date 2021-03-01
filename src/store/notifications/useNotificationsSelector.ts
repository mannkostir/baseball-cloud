import { useSelector } from 'react-redux';
import { RootState } from '..';

export const useNotificationSelector = () => {
  const notificationsState = useSelector(
    (state: RootState) => state.notifications
  );

  return { ...notificationsState };
};
