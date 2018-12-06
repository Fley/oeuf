import React, { SFC, ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export type EmptyPageProps = {
  icon: IconProp;
  text: string | ReactNode;
  action: ReactNode;
};

const EmptyPage: SFC<EmptyPageProps> = ({ icon, text, action }) => {
  return (
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
        <div>{icon && <FontAwesomeIcon icon={icon} size="7x" />}</div>
        <div>{text}</div>
        {action && <div className="m-5">{action}</div>}
      </div>
    </div>
  );
};

export default EmptyPage;
