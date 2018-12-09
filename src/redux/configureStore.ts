import { AppStore } from './../store/reducer';
import { createStore, applyMiddleware, Middleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../store/reducer';
import saga from '../store/saga';

const sagaMiddleware = createSagaMiddleware();

const middlewares: Middleware[] = [thunkMiddleware, sagaMiddleware];
if (process.env.NODE_ENV === 'development') {
  const loggerMiddleware = createLogger();
  middlewares.push(loggerMiddleware);
}

export default function configureStore(preloadedState?: AppStore) {
  const store = createStore(rootReducer, preloadedState, composeWithDevTools(applyMiddleware(...middlewares)));
  sagaMiddleware.run(saga);
  return store;
}
