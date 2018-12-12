import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { RepetitionProgress } from './RepetitionProgress';
import { action } from '@storybook/addon-actions';

storiesOf('exercise/runner/RepetitionProgress', module)
  .addDecorator((story, context) => withInfo()(story)(context))
  .add('with repetition', () => <RepetitionProgress kg={25} repetition={12} onFinished={action('onFinished')} />);
