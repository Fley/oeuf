import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import RootContainer from 'redux/RootContainer';
import ExercisePageContainer from './ExercisePageContainer';

const rootContainerDecorator = storyFn => <RootContainer>{storyFn()}</RootContainer>;

storiesOf('exercise/ExercisePageContainer', module)
  .addDecorator((story, context) => withInfo()(story)(context))
  .addDecorator(rootContainerDecorator)
  .add('Default', () => <ExercisePageContainer />);
