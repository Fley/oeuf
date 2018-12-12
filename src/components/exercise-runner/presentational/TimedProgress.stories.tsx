import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { TimedProgress } from './TimedProgress';
import { action } from '@storybook/addon-actions';

storiesOf('exercise/runner/TimedProgress', module)
  .addDecorator((story, context) => withInfo()(story)(context))
  .add('with time', () => <TimedProgress totalTime={5} onFinished={action('onFinished')} />);
