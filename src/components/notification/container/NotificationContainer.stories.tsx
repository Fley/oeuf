import React from 'react';
import { storiesOf } from '@storybook/react';
import { NotificationContainer } from './NotificationContainer';
import { connect } from 'react-redux';
import { pushNotification } from '../redux/actions';
import { Notification } from '../redux/reducer';

storiesOf('toast/NotificationContainer', module).add('default', () => {
  let notificationNumber = 1;
  const Connected = connect(
    () => ({}),
    dispatch => ({
      onAddNotification: (notification: Notification) => dispatch(pushNotification(notification))
    })
  )(({ onAddNotification }: { onAddNotification: (notification: Notification) => void }) => (
    <div>
      <div
        style={{
          position: 'absolute',
          bottom: '50%',
          width: '100%'
        }}
      >
        <NotificationContainer />
        <div
          style={{
            backgroundColor: 'white',
            height: '50px',
            position: 'relative'
          }}
        />
      </div>
      <button
        onClick={() =>
          onAddNotification({
            message: `Hello ${notificationNumber++}`
          })
        }
      >
        Push notification
      </button>
    </div>
  ));
  return <Connected />;
});
