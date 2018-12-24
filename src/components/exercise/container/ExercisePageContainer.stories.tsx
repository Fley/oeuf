import React from 'react';
import { storiesOf } from '@storybook/react';
import ExercisePageContainer from './ExercisePageContainer';
import { ReduxDecorator } from 'story-decorators';

storiesOf('exercise/ExercisePageContainer', module)
  .addDecorator(ReduxDecorator())
  .add('Timed exercise', () => <ExercisePageContainer exerciseId="timedExerciseId" />)
  .add('Repetition exercise', () => <ExercisePageContainer exerciseId="repetitionExerciseId" />)
  .add('Unknown exercise', () => <ExercisePageContainer exerciseId="unknonwnExerciseId" />);
