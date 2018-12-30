import React, { SFC } from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import configureStore from './configureStore';
import { register as registerServiceWorker } from '../serviceWorker';

const appStore = configureStore();
export type RootContainerProps = {
  store?: Store;
};
registerServiceWorker(appStore.dispatch);
const RootContainer: SFC<RootContainerProps> = ({ children, store }) => (
  <Provider store={store || appStore}>{children}</Provider>
);

export default RootContainer;
