import { Reducer } from 'redux';
import { ServiceWorkerAction } from './actions';

export type ServiceWorkerStore = {
  newVersionAvailable: boolean;
  serviceWorker?: ServiceWorker;
};

const initialState: ServiceWorkerStore = {
  newVersionAvailable: false
};

export const serviceWorkerReducer: Reducer<ServiceWorkerStore, ServiceWorkerAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case 'SERVICEWORKER_NEW_CONTENT_AVAILABLE':
      return { ...state, newVersionAvailable: true, serviceWorker: action.serviceWorker };
    default:
      return state;
  }
};
