const SERVICEWORKER_REGISTRATION_ERROR: 'SERVICEWORKER_REGISTRATION_ERROR' = 'SERVICEWORKER_REGISTRATION_ERROR';
export const registrationError = ({ errorMessage, error }: { errorMessage?: string; error?: Error }) => ({
  type: SERVICEWORKER_REGISTRATION_ERROR,
  error,
  errorMessage
});

const SERVICEWORKER_REGISTRATION_SUCCESS: 'SERVICEWORKER_REGISTRATION_SUCCESS' = 'SERVICEWORKER_REGISTRATION_SUCCESS';
export const registrationSuccess = () => ({ type: SERVICEWORKER_REGISTRATION_SUCCESS });

const SERVICEWORKER_NEW_CONTENT_AVAILABLE: 'SERVICEWORKER_NEW_CONTENT_AVAILABLE' =
  'SERVICEWORKER_NEW_CONTENT_AVAILABLE';
export const newContentAvailable = () => ({ type: SERVICEWORKER_NEW_CONTENT_AVAILABLE });

const SERVICEWORKER_CONTENT_CACHED: 'SERVICEWORKER_CONTENT_CACHED' = 'SERVICEWORKER_CONTENT_CACHED';
export const contentCached = () => ({ type: SERVICEWORKER_CONTENT_CACHED });

const SERVICEWORKER_OFFLINE: 'SERVICEWORKER_OFFLINE' = 'SERVICEWORKER_OFFLINE';
export const offlineMode = (offline = true) => ({ offline, type: SERVICEWORKER_OFFLINE });

export type ServiceWorkerAction =
  | ReturnType<typeof registrationError>
  | ReturnType<typeof registrationSuccess>
  | ReturnType<typeof newContentAvailable>
  | ReturnType<typeof offlineMode>
  | ReturnType<typeof contentCached>;
