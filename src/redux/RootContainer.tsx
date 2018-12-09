import React, { SFC } from 'react';
import { Provider } from 'react-redux';
import configureStore from './configureStore';

const store = configureStore();
const RootContainer: SFC = ({ children }) => <Provider store={store}>{children}</Provider>;

export default RootContainer;
