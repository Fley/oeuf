import React from 'react';
import Theme from '../src/components/theme/Theme';

export const StoryWrapper = storyFn => <Theme>{storyFn()}</Theme>;
