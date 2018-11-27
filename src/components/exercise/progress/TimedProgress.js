import React from 'react';

export const TimedProgress = () => (
  <div
    className="d-flex align-items-center w-100 text-center bg-light text-dark"
    style={{
      height: '100vh',
      position: 'fixed',
      top: 0,
      left: 0
    }}
  >
    <div className="m-auto">
      <div>Hello</div>
      <div>Hello</div>
      {<div className="m-5">Action</div>}
    </div>
  </div>
);
