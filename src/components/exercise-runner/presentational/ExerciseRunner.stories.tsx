import React from 'react';
import { storiesOf } from '@storybook/react';
import { ReduxDecorator } from '../../../story-decorators';
import { TimedRunner, TimedRunnerProps, RepetitionRunnerProps, RepetitionRunner } from './ExerciseRunner';
import { action } from '@storybook/addon-actions';

const timerRunnerProps: TimedRunnerProps = {
  exerciseId: 'an-id',
  exerciseName: 'Run',
  steps: [
    { id: 'first-step-id', duration: 45, rest: 20, done: false },
    { id: 'second-step-id', duration: 50, rest: 30, done: false },
    { id: 'third-step-id', duration: 60, rest: 40, done: false }
  ],
  onStepFinished: action('onStepFinished')
};

storiesOf('exercise/runner/TimerRunner', module)
  .addDecorator(ReduxDecorator)
  .add('First step', () => <TimedRunner {...timerRunnerProps} />)
  .add('Second step', () => <TimedRunner currentStepIndex={1} {...timerRunnerProps} />)
  .add('Last step', () => <TimedRunner currentStepIndex={2} {...timerRunnerProps} />);

const repetitionRunnerProps: RepetitionRunnerProps = {
  exerciseId: 'an-id',
  exerciseName: 'Run',
  steps: [
    { id: 'first-step-id', kg: 45, repetition: 5, rest: 20, done: false },
    { id: 'second-step-id', kg: 50, repetition: 5, rest: 30, done: false },
    { id: 'third-step-id', kg: 60, repetition: 5, rest: 40, done: false }
  ],
  onStepFinished: action('onStepFinished')
};

storiesOf('exercise/runner/RepetitionRunner', module)
  .addDecorator(ReduxDecorator)
  .add('First step', () => <RepetitionRunner {...repetitionRunnerProps} />)
  .add('Second step', () => <RepetitionRunner currentStepIndex={1} {...repetitionRunnerProps} />)
  .add('Last step', () => <RepetitionRunner currentStepIndex={2} {...repetitionRunnerProps} />);
