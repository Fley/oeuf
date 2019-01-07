import { Dispatch } from 'redux';
import {
  registrationError,
  registrationSuccess,
  newContentAvailable,
  ServiceWorkerAction,
  contentCached,
  offlineMode
} from './redux/actions';

export * from './redux/sagas';

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
);

export function register(dispatch: Dispatch<ServiceWorkerAction>) {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    // The URL constructor is available in all browsers that support SW.
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) {
      dispatch(
        registrationError({ errorMessage: "Our service worker won't work if PUBLIC_URL is on a different origin" })
      );
      return;
    }

    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      if (isLocalhost) {
        // This is running on localhost. Lets check if a service worker still exists or not.
        checkValidServiceWorker(swUrl, dispatch);

        // Add some additional logging to localhost, pointing developers to the
        // service worker/PWA documentation.
        navigator.serviceWorker.ready.then(() => dispatch(registrationSuccess()));
      } else {
        // Is not local host. Just register service worker
        registerValidSW(swUrl, dispatch);
      }
    });
    window.addEventListener('online', updateOnlineStatus(dispatch));
    window.addEventListener('offline', updateOnlineStatus(dispatch));
  } else {
    dispatch(registrationError({ errorMessage: 'Service worker is not supported by your navigator.' }));
  }
}

const updateOnlineStatus = (dispatch: Dispatch<ServiceWorkerAction>) => () => {
  dispatch(offlineMode(!navigator.onLine));
};

function registerValidSW(swUrl: string, dispatch: Dispatch<ServiceWorkerAction>) {
  navigator.serviceWorker
    .register(swUrl)
    .then(registration => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        installingWorker!.onstatechange = () => {
          if (installingWorker!.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // At this point, the old content will have been purged and
              // the fresh content will have been added to the cache.
              // It's the perfect time to display a "New content is
              // available; please refresh." message in your web app.
              dispatch(newContentAvailable());
            } else {
              // At this point, everything has been precached.
              // It's the perfect time to display a
              // "Content is cached for offline use." message.
              dispatch(contentCached());
            }
          }
        };
      };
    })
    .catch(error => {
      dispatch(
        registrationError({
          errorMessage: 'Error during service worker registration',
          error
        })
      );
    });
}

function checkValidServiceWorker(swUrl: string, dispatch: Dispatch<ServiceWorkerAction>) {
  // Check if the service worker can be found. If it can't reload the page.
  fetch(swUrl)
    .then(response => {
      // Ensure service worker exists, and that we really are getting a JS file.
      if (response.status === 404 || response.headers.get('content-type')!.indexOf('javascript') === -1) {
        // No service worker found. Probably a different app. Reload the page.
        navigator.serviceWorker.ready.then(registration => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        // Service worker found. Proceed as normal.
        registerValidSW(swUrl, dispatch);
      }
    })
    .catch(() => {
      dispatch(offlineMode());
    });
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister();
    });
  }
}
