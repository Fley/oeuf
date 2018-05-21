import React from 'react';
import { storiesOf } from '@storybook/react';
import ExerciseList from './ExerciseList';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';

storiesOf('exercise-list/ExerciseList', module)
  .addDecorator((story, context) => withInfo()(story)(context))
  .add('with empty exercise list', () => <ExerciseList onAddExercise={action('onAddExercise')} />)
  .add('with exercises list', () => (
    <ExerciseList
      exercises={[
        { id: '1', name: 'Chess press' },
        { id: '2', name: 'Leg press' },
        { id: '3', name: 'Running 40 minutes', done: true }
      ]}
      onAddExercise={action('onAddExercise')}
    />
  ));
