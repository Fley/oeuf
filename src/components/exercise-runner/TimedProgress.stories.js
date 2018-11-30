import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { TimedProgress } from './TimedProgress';

storiesOf('exercise/runner/TimedProgress', module)
  .addDecorator((story, context) => withInfo()(story)(context))
  .add('Empty', () => <TimedProgress />);
