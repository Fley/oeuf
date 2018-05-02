import React from 'react';
import { storiesOf } from '@storybook/react';
import ExerciseList from './ExerciseList';
import { withInfo } from '@storybook/addon-info';

storiesOf('ExerciseList', module)
  .addDecorator((story, context) => withInfo()(story)(context))
  .add('with exercises list', () => (
    <ExerciseList
      exercises={[
        { id: '1', name: 'Chess press' },
        { id: '2', name: 'Leg press' },
        { id: '3', name: 'Running 40 minutes', done: true }
      ]}
    />
  ))
  .add('with empty exercise list', () => <ExerciseList />);
