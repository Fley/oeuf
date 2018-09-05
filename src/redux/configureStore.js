import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../store/reducer';
import saga from '../store/saga';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [thunkMiddleware, sagaMiddleware];
if (process.env.NODE_ENV === 'development') {
  const loggerMiddleware = createLogger();
  middlewares.push(loggerMiddleware);
}

const compose = middlewares => process.env.NODE_ENV === 'development' ? composeWithDevTools(middlewares) : middlewares;

export default function configureStore(preloadedState) {
  const store = createStore(rootReducer, preloadedState, compose(applyMiddleware(...middlewares)));
  sagaMiddleware.run(saga);
  return store;
}
