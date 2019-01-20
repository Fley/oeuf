import { ServiceWorkerStore } from './reducer';

export const isNewVersionAvailable = (state: ServiceWorkerStore) => state.newVersionAvailable;
export const getServiceWorker = (state: ServiceWorkerStore) => state.serviceWorker;
