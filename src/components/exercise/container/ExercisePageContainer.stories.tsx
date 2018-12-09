import React from 'react';
import { storiesOf, StoryDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import RootContainer from '../../../redux/RootContainer';
import ExercisePageContainer from './ExercisePageContainer';

// TODO: move to common space
const rootContainerDecorator: StoryDecorator = storyFn => <RootContainer>{storyFn()}</RootContainer>;

storiesOf('exercise/ExercisePageContainer', module)
  .addDecorator((story, context) => withInfo()(story)(context))
  .addDecorator(rootContainerDecorator)
  .add('Default', () => <ExercisePageContainer exerciseId="myExerciseId" />);
