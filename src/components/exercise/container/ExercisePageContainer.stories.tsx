import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import ExercisePageContainer from './ExercisePageContainer';
import { ReduxDecorator } from 'story-decorators';

storiesOf('exercise/ExercisePageContainer', module)
  .addDecorator((story, context) => withInfo()(story)(context))
  .addDecorator(ReduxDecorator)
  .add('Default', () => <ExercisePageContainer exerciseId="myExerciseId" />);
