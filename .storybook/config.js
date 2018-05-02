import { configure, addDecorator } from '@storybook/react';
import { StoryWrapper } from './story-decorators';

const req = require.context('../src', true, /\.stories\.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);

// Decorators
addDecorator(StoryWrapper);
