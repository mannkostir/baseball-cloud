import { notificationsActions } from '@/store/notifications';
import { Notification } from '@/types/commonTypes';
import React, { useEffect, useState } from 'react';
import * as Styled from './Notifications.styles';

interface INotificationProps {
  notifications: Notification[];
  dispatch: React.Dispatch<any>;
}

const notificationTerminateTimeoutMs = 2500;

const NotificationsItem = ({
  notification,
  dispatch,
}: {
  notification: Notification;
  dispatch: React.Dispatch<any>;
}) => {
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [currentTimeoutId, setCurrentTimeoutId] = useState<number>();

  const setTerminateTimeout = () => {
    const timeout = window.setTimeout(() => {
      dispatch(
        notificationsActions.removeNotification({ id: notification.id })
      );
    }, notificationTerminateTimeoutMs);

    setCurrentTimeoutId(timeout);
  };

  useEffect(() => {
    if (isMouseOver) {
      clearTimeout(currentTimeoutId);
    } else {
      setTerminateTimeout();
    }
    // The only dependency should be isMouseOver
  }, [isMouseOver]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Styled.NotificationWrapper
      onMouseOver={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
    >
      <Styled.StatusText>
        {notification.status[0].toUpperCase() + notification.status.slice(1)}
      </Styled.StatusText>
      <div>{notification.message}</div>
      <Styled.ProgressBarContainer>
        <Styled.ProgressBar
          animationTimeMs={notificationTerminateTimeoutMs}
          isMouseOver={isMouseOver}
        />
      </Styled.ProgressBarContainer>
    </Styled.NotificationWrapper>
  );
};

const Notifications = ({ notifications, dispatch }: INotificationProps) => {
  return (
    <Styled.Container>
      {notifications.map((notification) => (
        <NotificationsItem
          notification={notification}
          dispatch={dispatch}
          key={notification.id}
        />
      ))}
    </Styled.Container>
  );
};

export default Notifications;
