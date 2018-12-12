import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { ReduxDecorator } from '../../../story-decorators';
import { TimerRunner } from './TimerRunner';

const props = {
  exerciseId: 'an-id',
  exerciseName: 'Run',
  steps: [
    { id: 'first-step-id', duration: 45, rest: 20, done: false },
    { id: 'first-step-id', duration: 50, rest: 30, done: false },
    { id: 'first-step-id', duration: 60, rest: 40, done: false }
  ]
};

storiesOf('exercise/runner/TimerRunner', module)
  .addDecorator(ReduxDecorator)
  .addDecorator((story, context) => withInfo()(story)(context))
  .add('First step', () => <TimerRunner {...props} />)
  .add('Second step', () => <TimerRunner currentStepIndex={1} {...props} />)
  .add('Last step', () => <TimerRunner currentStepIndex={2} {...props} />);
