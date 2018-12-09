import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import Theme from './components/theme/Theme';
import RootContainer from './redux/RootContainer';
import { StoryDecorator } from '@storybook/react';

export const ReduxDecorator: StoryDecorator = storyFn => <RootContainer>{storyFn()}</RootContainer>;

export const StoryWrapper: StoryDecorator = storyFn => (
  <Router>
    <Theme>{storyFn()}</Theme>
  </Router>
);
