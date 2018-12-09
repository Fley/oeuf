import React, { SFC } from 'react';
import './Theme.css';

const Theme: SFC = ({ children }) => {
  React.Children.only(children);
  return <>{children}</>;
};

export default Theme;
