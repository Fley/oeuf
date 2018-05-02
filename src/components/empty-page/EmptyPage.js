import React from 'react';

const EmptyPage = () => {
  return (
    <div
      className="d-flex align-items-center w-100 text-center"
      style={{
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0
      }}
    >
      <div className="m-auto">You have no exercises yet</div>
    </div>
  );
};

export default EmptyPage;
