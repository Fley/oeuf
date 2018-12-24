import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ExercisePage from './ExercisePage';

const actionProps = {
  onAddStep: () => () => action('onAddStep'),
  onDeleteStep: () => () => action('onAddStep'),
  onAcknowledgeStep: () => action('onAddStep'),
  onCancelStep: () => action('onAddStep'),
  onUpdateStep: () => () => action('onAddStep'),
  onMoveStep: () => action('onAddStep'),
  onExerciseNameChange: () => action('onAddStep'),
  onStartExercise: action('onStartExercise')
};

storiesOf('exercise/ExercisePage', module)
  .add('Empty', () => (
    <ExercisePage
      exercise={{ id: '1', name: 'New exercise', steps: [], type: null, done: false, progress: null }}
      {...actionProps}
    />
  ))
  .add('Repetiton', () => (
    <ExercisePage
      exercise={{
        id: '1',
        name: 'Chess press',
        type: 'repetition',
        steps: [
          { id: '1', kg: 25, repetition: 15, rest: 30, done: true },
          { id: '2', kg: 20, repetition: 10, rest: 30, done: false },
          { id: '3', kg: 20, repetition: 10, rest: 30, done: false },
          { id: '4', kg: 20, repetition: 10, rest: 30, done: false }
        ],
        done: false,
        progress: null
      }}
      {...actionProps}
    />
  ))
  .add('Loading', () => <ExercisePage loading={true} {...actionProps} />)
  .add('Error loading', () => <ExercisePage errorLoading={true} {...actionProps} />)
  .add('Not found', () => <ExercisePage {...actionProps} />);
