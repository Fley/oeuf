import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';
import ExerciseListPage from './ExerciseListPage';
import Shell from 'components/shell/Shell';

storiesOf('exercise-list/ExerciseListPage', module)
  .addDecorator((story, context) => withInfo()(story)(context))
  .add('with exercises list', () => (
    <Shell>
      <ExerciseListPage
        exercises={[
          { id: '1', name: 'Chess press' },
          { id: '2', name: 'Leg press' },
          { id: '3', name: 'Running 40 minutes', done: true }
        ]}
        onAddExercise={action('onAddExercise')}
        onAcknowledgeExercise={action('onAcknowledgeExercise')}
        onCancelExercise={action('onCancelExercise')}
        onDeleteExercise={action('onDeleteExercise')}
      />
    </Shell>
  ))
  .add('with long exercises list', () => (
    <Shell>
      <ExerciseListPage
        exercises={[
          { id: '21', name: 'Chess press' },
          { id: '22', name: 'Leg press' },
          { name: 'Lorem ipsum', id: '1' },
          { name: 'Lorem ipsum', id: '2' },
          { name: 'Lorem ipsum', id: '3' },
          { name: 'Lorem ipsum', id: '4' },
          { name: 'Lorem ipsum', id: '5' },
          { name: 'Lorem ipsum', id: '6' },
          { name: 'Lorem ipsum', id: '7' },
          { name: 'Lorem ipsum', id: '8' },
          { name: 'Lorem ipsum', id: '9' },
          { name: 'Lorem ipsum', id: '10' },
          { name: 'Lorem ipsum', id: '11' },
          { id: '23', name: 'Running 40 minutes', done: true }
        ]}
        onAddExercise={action('onAddExercise')}
        onAcknowledgeExercise={action('onAcknowledgeExercise')}
        onCancelExercise={action('onCancelExercise')}
        onDeleteExercise={action('onDeleteExercise')}
      />
    </Shell>
  ))
  .add('with empty exercise list', () => (
    <Shell>
      <ExerciseListPage
        onAddExercise={action('onAddExercise')}
        onAcknowledgeExercise={action('onAcknowledgeExercise')}
        onCancelExercise={action('onCancelExercise')}
        onDeleteExercise={action('onDeleteExercise')}
      />
    </Shell>
  ))
  .add('loading', () => (
    <Shell>
      <ExerciseListPage
        onAddExercise={action('onAddExercise')}
        onAcknowledgeExercise={action('onAcknowledgeExercise')}
        onCancelExercise={action('onCancelExercise')}
        onDeleteExercise={action('onDeleteExercise')}
        loading
      />
    </Shell>
  ))
  .add('error loading', () => (
    <Shell>
      <ExerciseListPage
        onAddExercise={action('onAddExercise')}
        onAcknowledgeExercise={action('onAcknowledgeExercise')}
        onCancelExercise={action('onCancelExercise')}
        onDeleteExercise={action('onDeleteExercise')}
        errorLoading
      />
    </Shell>
  ));
