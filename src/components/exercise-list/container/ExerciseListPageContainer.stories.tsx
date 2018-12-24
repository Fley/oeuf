import React from 'react';
import { storiesOf } from '@storybook/react';
import ExerciseListPageContainer from './ExerciseListPageContainer';
import { ReduxDecorator } from 'story-decorators';

storiesOf('exercise-list/ExerciseListPageContainer', module)
  .addDecorator(ReduxDecorator())
  .add('Default', () => <ExerciseListPageContainer />);
