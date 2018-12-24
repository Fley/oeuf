import React, { SFC } from 'react';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import { Store } from 'redux';

const appStore = configureStore();
export type RootContainerProps = {
  store?: Store;
};
const RootContainer: SFC<RootContainerProps> = ({ children, store }) => (
  <Provider store={store || appStore}>{children}</Provider>
);

export default RootContainer;
