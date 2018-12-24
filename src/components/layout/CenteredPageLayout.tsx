import React, { SFC } from 'react';

export const CenteredPageLayout: SFC = ({ children }) => (
  <div
    className="d-flex align-items-center w-100 text-center bg-light text-dark"
    style={{
      height: '100vh',
      position: 'fixed',
      top: 0,
      left: 0
    }}
  >
    <div className="m-auto">{children}</div>
  </div>
);
