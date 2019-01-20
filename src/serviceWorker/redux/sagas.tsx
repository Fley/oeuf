import React from 'react';
import { all, put, takeLatest, call } from 'redux-saga/effects';
import {
  SERVICEWORKER_REGISTRATION_ERROR,
  registrationError,
  SERVICEWORKER_NEW_CONTENT_AVAILABLE,
  SERVICEWORKER_CONTENT_CACHED,
  SERVICEWORKER_OFFLINE,
  newContentAvailable,
  contentCached,
  offlineMode,
  updateContent,
  SERVICEWORKER_UPDATE_CONTENT
} from './actions';
import { pushNotification } from 'components/notification';
import { UpgradeVersionButton } from 'components/version/UpgradeVersionButton';

function* onRegistrationError({ errorMessage }: ReturnType<typeof registrationError>) {
  yield put(pushNotification({ message: errorMessage, type: 'danger' }));
}

function* onNewContentAvailable({  }: ReturnType<typeof newContentAvailable>) {
  yield put(
    pushNotification({
      message: 'New version is available!',
      actions: [<UpgradeVersionButton key="upgrade-button" />]
    })
  );
}

function* onUpdateContent({  }: ReturnType<typeof updateContent>) {
  // const serviceWorker: ServiceWorker = yield select<AppStore>(state => getServiceWorker(getServiceWorkerState(state)));
  // yield call([serviceWorker, 'postMessage'], 'skipWaiting');
  yield call([window.location, 'reload']);
}

function* onContentCached({  }: ReturnType<typeof contentCached>) {
  yield put(pushNotification({ message: 'Content is cached for offline use.' }));
}

function* onOfflineReady({ offline }: ReturnType<typeof offlineMode>) {
  if (offline) {
    yield put(pushNotification({ message: "Offline ? Keep working out it's fine !" }));
  }
}

export function* watchServiceWorker() {
  yield all([
    yield takeLatest(SERVICEWORKER_REGISTRATION_ERROR, onRegistrationError),
    yield takeLatest(SERVICEWORKER_NEW_CONTENT_AVAILABLE, onNewContentAvailable),
    yield takeLatest(SERVICEWORKER_CONTENT_CACHED, onContentCached),
    yield takeLatest(SERVICEWORKER_OFFLINE, onOfflineReady),
    yield takeLatest(SERVICEWORKER_UPDATE_CONTENT, onUpdateContent)
  ]);
}
