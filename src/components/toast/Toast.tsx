import React, { SFC } from 'react';
import classNames from 'classnames';
import './Toast.css';

export type ToastProps = {
  text: string;
  type?: 'default' | 'danger' | 'success' | 'warning' | 'info';
  hidden?: boolean;
  actions?: React.ReactNode[];
  onClick: () => void;
};

export const Toast: SFC<ToastProps> = ({ text, type = 'default', actions = [], hidden = false, onClick }) => (
  <div className="toast-container" onClick={onClick}>
    <div
      className={classNames('toast', 'shadow-up-sm', `toast-${type}`, {
        'toast-hidden': hidden,
        'toast-visible': !hidden
      })}
    >
      <div>{text}</div>
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
