import React from 'react';
import './Theme.css';

const Theme = ({ children }) => {
  React.Children.only(children);
  return children;
};

export default Theme;