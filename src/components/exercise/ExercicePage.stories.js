import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import Shell from '../../components/shell/Shell';
import ExercisePage from './ExercisePage';

storiesOf('exercise/ExercisePage', module)
  .addDecorator((story, context) => withInfo()(story)(context))
  .add('Empty', () => (
    <Shell>
      <ExercisePage />
    </Shell>
  ))
  .add('Existing', () => (
    <Shell>
      <ExercisePage
        exercise={{
          id: '1',
          name: 'Chess press',
          steps: [
            { id: '1', type: 'kg', content: { kg: 25, repetition: 15, rest: 30 } },
            { id: '2', type: 'kg', content: { kg: 20, repetition: 10, rest: 30 } },
            { id: '3', type: 'kg', content: { kg: 20, repetition: 10, rest: 30 } },
            { id: '4', type: 'kg', content: { kg: 20, repetition: 10, rest: 30 } }
          ]
        }}
      />
    </Shell>
  ));
