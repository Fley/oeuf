import React, { SFC } from 'react';
import classNames from 'classnames';

export type CenteredPageLayoutProps = {
  className?: string;
};

export const CenteredPageLayout: SFC<CenteredPageLayoutProps> = ({ children, className }) => (
  <div
    className={classNames('d-flex align-items-center w-100 text-center bg-light text-dark', className)}
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
