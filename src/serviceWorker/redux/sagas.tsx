import React from 'react';
import { all, put, takeLatest } from 'redux-saga/effects';
import {
  SERVICEWORKER_REGISTRATION_ERROR,
  registrationError,
  SERVICEWORKER_NEW_CONTENT_AVAILABLE,
  SERVICEWORKER_CONTENT_CACHED,
  SERVICEWORKER_OFFLINE,
  newContentAvailable,
  contentCached,
  offlineMode
} from './actions';
import { pushNotification } from 'components/notification';

function* onRegistrationError({ errorMessage }: ReturnType<typeof registrationError>) {
  yield put(pushNotification({ message: errorMessage, type: 'danger' }));
}

function* onNewContentAvailable({  }: ReturnType<typeof newContentAvailable>) {
  yield put(
    pushNotification({
      message: 'New content is available; please refresh.',
      actions: [
        <a key="refresh-button" href="" onClick={() => window.location.reload()}>
          REFRESH
        </a>
      ]
    })
  );
}

function* onContentCached({  }: ReturnType<typeof contentCached>) {
  yield put(pushNotification({ message: 'Content is cached for offline use.' }));
}

function* onofflineReady({ offline }: ReturnType<typeof offlineMode>) {
  if (offline) {
    yield put(pushNotification({ message: "Offline ? Keep working out it's fine !" }));
  }
}

export function* watchServiceWorker() {
  yield all([
    yield takeLatest(SERVICEWORKER_REGISTRATION_ERROR, onRegistrationError),
    yield takeLatest(SERVICEWORKER_NEW_CONTENT_AVAILABLE, onNewContentAvailable),
    yield takeLatest(SERVICEWORKER_CONTENT_CACHED, onContentCached),
    yield takeLatest(SERVICEWORKER_OFFLINE, onofflineReady)
  ]);
}
