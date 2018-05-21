import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import configureStore from '../redux/configureStore';
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
