import React, { SFC } from 'react';
import { Toast } from '../presentational/Toast';
import { Notification } from '../redux/reducer';
import { MapStateToProps, connect, MapDispatchToProps } from 'react-redux';
import { AppStore } from 'store/reducer';
import { getNotification } from '../redux/selectors';
import { getNotificationState } from 'store/selectors';
import { hideNotification, pauseAutoHideNotification, resumeAutoHideNotification } from '../redux/actions';

type NotificationComponentStateProps = {
  notification?: Notification;
};

type NotificationComponentDispatchProps = {
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

type NotificationComponentProps = NotificationComponentStateProps & NotificationComponentDispatchProps;

const NotificationComponent: SFC<NotificationComponentProps> = ({
  notification,
  onClick,
  onMouseEnter,
  onMouseLeave
}) => (
  <>
    {notification && (
      <Toast
        message={notification.message}
        type={notification.type}
        actions={notification.actions}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
    )}
  </>
);

const mapStateToProps: MapStateToProps<NotificationComponentStateProps, {}, AppStore> = state => ({
  notification: getNotification(getNotificationState(state))
});

const mapDispatchToProps: MapDispatchToProps<NotificationComponentDispatchProps, {}> = dispatch => ({
  onClick: () => dispatch(hideNotification()),
  onMouseEnter: () => dispatch(pauseAutoHideNotification()),
  onMouseLeave: () => dispatch(resumeAutoHideNotification())
});

export const NotificationContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationComponent);
