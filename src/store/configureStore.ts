import { createStore, applyMiddleware, Middleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { AppStore } from './reducer';
import rootReducer from './reducer';
import saga from './saga';

const sagaMiddleware = createSagaMiddleware();

const middlewares: Middleware[] = [sagaMiddleware];
if (process.env.NODE_ENV === 'development') {
  const loggerMiddleware = createLogger();
  middlewares.push(loggerMiddleware);
}

export default function configureStore(preloadedState?: AppStore) {
  const store = createStore(rootReducer, preloadedState, composeWithDevTools(applyMiddleware(...middlewares)));
  sagaMiddleware.run(saga);
  return store;
}
