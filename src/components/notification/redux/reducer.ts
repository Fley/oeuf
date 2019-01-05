import { Reducer } from 'redux';
import { Action } from './actions';

export type Notification = {
  message: string;
  type?: 'default' | 'danger' | 'success' | 'warning' | 'info';
  actions?: React.ReactNode[];
};

export type NotificationStore = {
  notification?: Notification;
};

const initialState: NotificationStore = {
  notification: undefined
};

export const notificationReducer: Reducer<NotificationStore, Action> = (state = initialState, action) => {
  switch (action.type) {
    case 'NOTIFICATION_SHOW':
      return { ...state, notification: action.notification };
    case 'NOTIFICATION_HIDE':
      return { ...state, notification: undefined };
    default:
      return state;
  }
};
