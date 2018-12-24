import React from 'react';
import { storiesOf } from '@storybook/react';
import ExercisePageContainer from './ExercisePageContainer';
import { ReduxDecorator } from 'story-decorators';

storiesOf('exercise/ExercisePageContainer', module)
  .addDecorator(ReduxDecorator)
  .add('Default', () => <ExercisePageContainer exerciseId="myExerciseId" />);
