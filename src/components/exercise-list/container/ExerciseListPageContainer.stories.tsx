import React from 'react';
import { storiesOf, StoryDecorator } from '@storybook/react';
import RootContainer from '../../../redux/RootContainer';
import ExerciseListPageContainer from './ExerciseListPageContainer';

const rootContainerDecorator: StoryDecorator = storyFn => <RootContainer>{storyFn()}</RootContainer>;

storiesOf('exercise-list/ExerciseListPageContainer', module)
  .addDecorator(rootContainerDecorator)
  .add('Default', () => <ExerciseListPageContainer />);
