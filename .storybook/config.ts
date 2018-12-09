import { configure, addDecorator } from '@storybook/react';
import { StoryWrapper } from '../src/story-decorators';

const req = require.context('../src', true, /\.stories\.tsx$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

// Decorators
addDecorator(StoryWrapper);

configure(loadStories, module);
