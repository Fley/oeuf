import { Notification } from './reducer';

export const NOTIFICATION_PUSH: 'NOTIFICATION_PUSH' = 'NOTIFICATION_PUSH';
export const pushNotification = (notification: Notification) => ({
  type: NOTIFICATION_PUSH,
  notification
});

export const NOTIFICATION_PAUSE_AUTO_HIDE: 'NOTIFICATION_PAUSE_AUTO_HIDE' = 'NOTIFICATION_PAUSE_AUTO_HIDE';
export const pauseAutoHideNotification = () => ({ type: NOTIFICATION_PAUSE_AUTO_HIDE });

export const NOTIFICATION_RESUME_AUTO_HIDE: 'NOTIFICATION_RESUME_AUTO_HIDE' = 'NOTIFICATION_RESUME_AUTO_HIDE';
export const resumeAutoHideNotification = () => ({ type: NOTIFICATION_RESUME_AUTO_HIDE });

const NOTIFICATION_SHOW: 'NOTIFICATION_SHOW' = 'NOTIFICATION_SHOW';
export const showNotification = (notification: Notification) => ({
  type: NOTIFICATION_SHOW,
  notification
});

export const NOTIFICATION_HIDE: 'NOTIFICATION_HIDE' = 'NOTIFICATION_HIDE';
export const hideNotification = () => ({
  type: NOTIFICATION_HIDE
});

export type Action =
  | ReturnType<typeof pushNotification>
  | ReturnType<typeof pauseAutoHideNotification>
  | ReturnType<typeof resumeAutoHideNotification>
  | ReturnType<typeof showNotification>
  | ReturnType<typeof hideNotification>;
