import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Theme from '../src/components/theme/Theme';
import RootContainer from '../src/redux/RootContainer';

export const ReduxDecorator = storyFn => <RootContainer>{storyFn()}</RootContainer>;

export const StoryWrapper = storyFn => (
  <Router>
    <Theme>{storyFn()}</Theme>
  </Router>
);
