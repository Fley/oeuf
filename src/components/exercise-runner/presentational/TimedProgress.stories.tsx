import React from 'react';
import { storiesOf } from '@storybook/react';
import { TimedProgress } from './TimedProgress';
import { action } from '@storybook/addon-actions';
import { CenteredPageLayout } from 'components/layout';

storiesOf('exercise/runner/TimedProgress', module)
  .add('with time', () => (
    <CenteredPageLayout>
      <TimedProgress totalTime={5} onFinished={action('onFinished')} />
    </CenteredPageLayout>
  ))
  .add('rest theme', () => (
    <CenteredPageLayout>
      <TimedProgress totalTime={5} onFinished={action('onFinished')} theme="rest" />
    </CenteredPageLayout>
  ));
