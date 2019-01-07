import React, { SFC } from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';

export type RootContainerProps = {
  store: Store;
};
const RootContainer: SFC<RootContainerProps> = ({ children, store }) => <Provider store={store}>{children}</Provider>;

export default RootContainer;
