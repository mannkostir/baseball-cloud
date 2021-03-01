import { Notification } from '@/types/commonTypes';
import { createUUID } from '@/utils/createUUID';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NotificationsState } from './notificationsStoreTypes';

const defaultNotifications: NotificationsState = {
  currentNotifications: [],
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: defaultNotifications,
  reducers: {
    addNotification(state, action: PayloadAction<Omit<Notification, 'id'>>) {
      state.currentNotifications.unshift({
        ...action.payload,
        id: createUUID(),
      });
    },
    removeNotification(state, action: PayloadAction<Pick<Notification, 'id'>>) {
      const targetIndex = state.currentNotifications.findIndex(
        (notification) => notification.id === action.payload.id
      );

      state.currentNotifications.splice(targetIndex, 1);
    },
  },
});

export const notificationsActions = notificationsSlice.actions;
export default notificationsSlice.reducer;
