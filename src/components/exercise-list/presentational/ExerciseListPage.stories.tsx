import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';
import ExerciseListPage from './ExerciseListPage';
import Shell from '../../../components/shell/Shell';

const exerciseListActions = {
  onAddExercise: action('onAddExercise'),
  onAcknowledgeExercise: action('onAcknowledgeExercise'),
  onCancelExercise: action('onCancelExercise'),
  onDeleteExercise: action('onDeleteExercise')
};

storiesOf('exercise-list/ExerciseListPage', module)
  .addDecorator((story, context) => withInfo()(story)(context))
  .add('with exercises list', () => (
    <Shell>
      <ExerciseListPage
        exercises={[
          { id: '1', name: 'Chess press', type: 'timed', done: false, steps: [], progress: null },
          { id: '2', name: 'Leg press', type: 'timed', done: false, steps: [], progress: null },
          { id: '3', name: 'Running 40 minutes', type: 'timed', done: true, steps: [], progress: null }
        ]}
        {...exerciseListActions}
      />
    </Shell>
  ))
  .add('with long exercises list', () => (
    <Shell>
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
    </Shell>
  ))
  .add('with empty exercise list', () => (
    <Shell>
      <ExerciseListPage exercises={[]} {...exerciseListActions} />
    </Shell>
  ))
  .add('loading', () => (
    <Shell>
      <ExerciseListPage exercises={[]} {...exerciseListActions} loading />
    </Shell>
  ))
  .add('error loading', () => (
    <Shell>
      <ExerciseListPage exercises={[]} {...exerciseListActions} errorLoading />
    </Shell>
  ));
