import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ExerciseListPage from './ExerciseListPage';

const exerciseListActions = {
  onAddExercise: action('onAddExercise'),
  onAcknowledgeExercise: action('onAcknowledgeExercise'),
  onCancelExercise: action('onCancelExercise'),
  onDeleteExercise: action('onDeleteExercise')
};

storiesOf('exercise-list/ExerciseListPage', module)
  .add('with exercises list', () => (
    <ExerciseListPage
      exercises={[
        { id: '1', name: 'Chess press', type: 'timed', done: false, steps: [], progress: null },
        { id: '2', name: 'Leg press', type: 'timed', done: false, steps: [], progress: null },
        { id: '3', name: 'Running 40 minutes', type: 'timed', done: true, steps: [], progress: null }
      ]}
      {...exerciseListActions}
    />
  ))
  .add('with long exercises list', () => (
    <ExerciseListPage
      exercises={[
        { id: '21', name: 'Chess press', type: 'timed', done: false, steps: [], progress: null },
        { id: '22', name: 'Leg press', type: 'timed', done: false, steps: [], progress: null },
        { name: 'Lorem ipsum', id: '1', type: 'timed', done: false, steps: [], progress: null },
        { name: 'Lorem ipsum', id: '2', type: 'timed', done: false, steps: [], progress: null },
        { name: 'Lorem ipsum', id: '3', type: 'timed', done: false, steps: [], progress: null },
        { name: 'Lorem ipsum', id: '4', type: 'timed', done: false, steps: [], progress: null },
        { name: 'Lorem ipsum', id: '5', type: 'timed', done: false, steps: [], progress: null },
        { name: 'Lorem ipsum', id: '6', type: 'timed', done: false, steps: [], progress: null },
        { name: 'Lorem ipsum', id: '7', type: 'timed', done: false, steps: [], progress: null },
        { name: 'Lorem ipsum', id: '8', type: 'timed', done: false, steps: [], progress: null },
        { name: 'Lorem ipsum', id: '9', type: 'timed', done: false, steps: [], progress: null },
        { name: 'Lorem ipsum', id: '10', type: 'timed', done: false, steps: [], progress: null },
        { name: 'Lorem ipsum', id: '11', type: 'timed', done: false, steps: [], progress: null },
        { id: '23', name: 'Running 40 minutes', type: 'timed', done: true, steps: [], progress: null }
      ]}
      {...exerciseListActions}
    />
  ))
  .add('with empty exercise list', () => <ExerciseListPage exercises={[]} {...exerciseListActions} />)
  .add('loading', () => <ExerciseListPage exercises={[]} {...exerciseListActions} loading />)
  .add('error loading', () => <ExerciseListPage exercises={[]} {...exerciseListActions} errorLoading />);
