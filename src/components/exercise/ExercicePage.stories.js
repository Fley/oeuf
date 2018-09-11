import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';
import ExercisePage from './ExercisePage';

storiesOf('exercise/ExercisePage', module)
  .addDecorator((story, context) => withInfo()(story)(context))
  .add('Empty', () => (
    <ExercisePage
      exercise={{ id: '1', name: 'New exercise', steps: [] }}
      onAddStep={action('onAddStep')}
      onStartExercise={action('onStartExercise')}
    />
  ))
  .add('Repetiton', () => (
    <ExercisePage
      exercise={{
        id: '1',
        name: 'Chess press',
        type: 'repetition',
        steps: [
          { id: '1', type: 'kg', content: { kg: 25, repetition: 15, rest: 30 } },
          { id: '2', type: 'kg', content: { kg: 20, repetition: 10, rest: 30 } },
          { id: '3', type: 'kg', content: { kg: 20, repetition: 10, rest: 30 } },
          { id: '4', type: 'kg', content: { kg: 20, repetition: 10, rest: 30 } }
        ]
      }}
      onAddStep={action('onAddStep')}
      onStartExercise={action('onStartExercise')}
    />
  ))
  .add('Loading', () => (
    <ExercisePage loading={true} onAddStep={action('onAddStep')} onStartExercise={action('onStartExercise')} />
  ))
  .add('Error loading', () => <ExercisePage errorLoading={true} />)
  .add('Not found', () => <ExercisePage />);
