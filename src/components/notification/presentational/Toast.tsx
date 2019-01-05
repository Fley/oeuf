import React, { SFC } from 'react';
import classNames from 'classnames';
import './Toast.css';

export type ToastProps = {
  message: string;
  type?: 'default' | 'danger' | 'success' | 'warning' | 'info';
  hidden?: boolean;
  actions?: React.ReactNode[];
  onClick: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

export const Toast: SFC<ToastProps> = ({
  message,
  type = 'default',
  actions = [],
  hidden = false,
  onClick,
  onMouseEnter,
  onMouseLeave
}) => (
  <div className="toast-container" onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
    <div
      className={classNames('toast', 'shadow-up-sm', `toast-${type}`, {
        'toast-hidden': hidden,
        'toast-visible': !hidden
      })}
    >
      <div>{message}</div>
      {actions && (
        <div className="toast-actions">
          {actions.map((action, index) => (
            <span key={`action-${index}`}>{action}</span>
          ))}
        </div>
      )}
    </div>
  </div>
);
