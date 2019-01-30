import React from 'react';
import { storiesOf } from '@storybook/react';
import { Toast, ToastProps } from './Toast';
import { action } from '@storybook/addon-actions';
import { Store, State } from '@sambego/storybook-state';
import { UpgradeVersionButton } from 'components/version/UpgradeVersionButton';

const store = new Store({
  hidden: false
});

const props: ToastProps = {
  message: 'Some alert text',
  actions: [<a key="action-1">LEARN MORE</a>, 'X'],
  hidden: store.get('hidden'),
  onClick: () => {
    action('onClick');
    store.set({ hidden: !store.get('hidden') });
  }
};

const types: ToastProps['type'][] = ['default', 'info', 'success', 'warning', 'danger'];

storiesOf('toast/Toast', module)
  .add('default', () => (
    <div
      style={{
        position: 'absolute',
        bottom: '50%',
        width: '100%'
      }}
    >
      <State store={store}>
        <Toast {...props} />
      </State>
    </div>
  ))
  .add('all types', () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        height: '100vh'
      }}
    >
      <State store={store}>
        {types.map(type => (
          <Toast {...props} key={type} type={type} />
        ))}
      </State>
    </div>
  ))
  .add('upgrade button', () => (
    <div
      style={{
        position: 'absolute',
        bottom: '50%',
        width: '100%'
      }}
    >
      <State store={store}>
        <Toast {...props} actions={[<UpgradeVersionButton key="upgrade-button" />]} />
      </State>
    </div>
  ));
