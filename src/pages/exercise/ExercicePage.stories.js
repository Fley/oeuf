import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import Shell from '../../components/shell/Shell';
import ExercisePage from './ExercisePage';

storiesOf('pages/ExercisePage', module)
  .addDecorator((story, context) => withInfo()(story)(context))
  .add('Empty', () => (
    <Shell>
      <ExercisePage
        exercise={{
          id: '1',
          name: 'Chess press',
          steps: [
            { type: 'kg', content: { kg: 25, repetition: 15, rest: 30 } },
            { type: 'kg', content: { kg: 20, repetition: 10, rest: 30 } },
            { type: 'kg', content: { kg: 20, repetition: 10, rest: 30 } },
            { type: 'kg', content: { kg: 20, repetition: 10, rest: 30 } }
          ]
        }}
      />
    </Shell>
  ));
