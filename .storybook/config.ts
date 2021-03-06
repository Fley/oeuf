import { configure, addDecorator } from '@storybook/react';
import { StoryWrapper, ReduxDecorator } from '../src/story-decorators';
import { checkA11y } from '@storybook/addon-a11y';

const req = require.context('../src', true, /\.stories\.tsx$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

// Decorators
addDecorator(checkA11y);
addDecorator(StoryWrapper);
addDecorator(ReduxDecorator());

configure(loadStories, module);
