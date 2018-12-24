import React from 'react';
import './ExerciseRunner.css';
import { storiesOf } from '@storybook/react';
import { ExerciseRunner, ExerciseRunnerProps } from './ExerciseRunner';
import { action } from '@storybook/addon-actions';

const timerRunnerProps: ExerciseRunnerProps = {
  exerciseId: 'an-id',
  exerciseName: 'Run',
  type: 'timed',
  steps: [
    { id: 'first-step-id', duration: 45, rest: 20, done: true },
    { id: 'second-step-id', duration: 50, rest: 30, done: false },
    { id: 'third-step-id', duration: 60, rest: 40, done: false }
  ],
  onStepFinished: action('onStepFinished'),
  currentStepIndex: 0
};

storiesOf('exercise/runner/TimerRunner', module)
  .add('First step', () => <ExerciseRunner {...timerRunnerProps} />)
  .add('Second step', () => <ExerciseRunner {...timerRunnerProps} currentStepIndex={1} />)
  .add('Last step', () => <ExerciseRunner {...timerRunnerProps} currentStepIndex={2} />);

const repetitionRunnerProps: ExerciseRunnerProps = {
  exerciseId: 'an-id',
  exerciseName: 'Run',
  type: 'repetition',
  steps: [
    { id: 'first-step-id', kg: 45, repetition: 5, rest: 20, done: true },
    { id: 'second-step-id', kg: 50, repetition: 5, rest: 30, done: false },
    { id: 'third-step-id', kg: 60, repetition: 5, rest: 40, done: false }
  ],
  onStepFinished: action('onStepFinished'),
  currentStepIndex: 0
};

storiesOf('exercise/runner/RepetitionRunner', module)
  .add('First step', () => <ExerciseRunner {...repetitionRunnerProps} />)
  .add('Second step', () => <ExerciseRunner {...repetitionRunnerProps} currentStepIndex={1} />)
  .add('Last step', () => <ExerciseRunner {...repetitionRunnerProps} currentStepIndex={2} />);
