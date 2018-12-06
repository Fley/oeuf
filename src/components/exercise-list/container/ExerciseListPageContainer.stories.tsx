import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import RootContainer from 'redux/RootContainer';
import ExerciseListPageContainer from './ExerciseListPageContainer';

const rootContainerDecorator = storyFn => <RootContainer>{storyFn()}</RootContainer>;

storiesOf('exercise-list/ExerciseListPageContainer', module)
  .addDecorator((story, context) => withInfo()(story)(context))
  .addDecorator(rootContainerDecorator)
  .add('Default', () => <ExerciseListPageContainer />);
