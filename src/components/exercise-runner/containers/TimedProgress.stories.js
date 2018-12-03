import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { TimedProgress } from './TimedProgress';
import { ReduxDecorator } from '../../../../.storybook/story-decorators';
import { action } from '@storybook/addon-actions';

storiesOf('exercise/runner/TimedProgress', module)
  .addDecorator(ReduxDecorator)
  .addDecorator(withInfo)
  .add('Empty', () => <TimedProgress time={5} onFinished={action('onFinished')} />);
