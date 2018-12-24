import React from 'react';
import { storiesOf } from '@storybook/react';
import { ReduxDecorator } from '../../../story-decorators';
import { ExerciseRunnerContainer } from './ExerciseRunnerContainer';

storiesOf('exercise/runner/ExerciseRunnerContainer', module)
  .addDecorator(ReduxDecorator())
  .add('Timed', () => <ExerciseRunnerContainer exerciseId="timedExerciseId" stepId="2" />)
  .add('Repetition', () => <ExerciseRunnerContainer exerciseId="repetitionExerciseId" stepId="2" />)
  .add('Exercise not found', () => <ExerciseRunnerContainer exerciseId="unknownExerciseId" stepId="1" />)
  .add('Step not found', () => <ExerciseRunnerContainer exerciseId="timedExerciseId" stepId="unknown-step" />);
