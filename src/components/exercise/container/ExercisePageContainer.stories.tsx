import React from 'react';
import { storiesOf } from '@storybook/react';
import ExercisePageContainer from './ExercisePageContainer';

storiesOf('exercise/ExercisePageContainer', module)
  .add('Timed exercise', () => <ExercisePageContainer exerciseId="timedExerciseId" />)
  .add('Repetition exercise', () => <ExercisePageContainer exerciseId="repetitionExerciseId" />)
  .add('Unknown exercise', () => <ExercisePageContainer exerciseId="unknonwnExerciseId" />);
