import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
const store = configureStore();

class RootContainer extends Component {
  render() {
    return (
      <Provider store={store}>
        {this.props.children}
      </Provider>
    );
  }
}

RootContainer.propTypes = {};

export default RootContainer;
