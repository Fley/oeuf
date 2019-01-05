import { take, actionChannel, call, put, race } from 'redux-saga/effects';
import {
  NOTIFICATION_PUSH,
  showNotification,
  hideNotification,
  pushNotification,
  NOTIFICATION_HIDE,
  NOTIFICATION_PAUSE_AUTO_HIDE,
  NOTIFICATION_RESUME_AUTO_HIDE
} from './actions';
import { delay, Channel } from 'redux-saga';
import { Notification } from './reducer';

const NOTIFICATION_DELAY_MS = 5000;

export function* watchNotifications() {
  const notificationChannel: Channel<ReturnType<typeof pushNotification>> = yield actionChannel(NOTIFICATION_PUSH);
  while (true) {
    const { notification } = yield take<ReturnType<typeof pushNotification>>(notificationChannel);
    yield call(handleNotification, notification);
  }
}

function* handleNotification(notification?: Notification) {
  if (notification) {
    yield put(showNotification(notification));
  }
  let waiting = true;
  while (waiting) {
    const { stopped, timeout } = yield race({
      hide: take(NOTIFICATION_HIDE),
      stopped: take(NOTIFICATION_PAUSE_AUTO_HIDE),
      timeout: call(delay, NOTIFICATION_DELAY_MS)
    });
    if (timeout) {
      yield put(hideNotification());
      waiting = false;
    } else if (stopped) {
      yield take(NOTIFICATION_RESUME_AUTO_HIDE);
    }
  }
}
