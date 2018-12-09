import React from 'react';
import { storiesOf } from '@storybook/react';
import ExerciseList from './ExerciseList';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';

const exerciseListActions = {
  onAddExercise: action('onAddExercise'),
  onAcknowledgeExercise: action('onAcknowledgeExercise'),
  onCancelExercise: action('onCancelExercise'),
  onDeleteExercise: action('onDeleteExercise')
};

storiesOf('exercise-list/ExerciseList', module)
  .addDecorator((story, context) => withInfo()(story)(context))
  .add('with empty exercise list', () => <ExerciseList exercises={[]} {...exerciseListActions} />)
  .add('with exercises list', () => (
    <ExerciseList
      exercises={[
        { id: '1', name: 'Chess press', type: 'timed', done: false, steps: [], progress: null },
        { id: '2', name: 'Leg press', type: 'timed', done: false, steps: [], progress: null },
        { id: '3', name: 'Running 40 minutes', type: 'timed', done: true, steps: [], progress: null }
      ]}
      {...exerciseListActions}
    />
  ));
