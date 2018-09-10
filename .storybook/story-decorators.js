import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Theme from '../src/components/theme/Theme';

export const StoryWrapper = storyFn => (
  <Router>
    <Theme>{storyFn()}</Theme>
  </Router>
);
