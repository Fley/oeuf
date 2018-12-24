import React from 'react';
import { storiesOf } from '@storybook/react';
import { RepetitionProgress } from './RepetitionProgress';
import { action } from '@storybook/addon-actions';
import { CenteredPageLayout } from 'components/layout';

storiesOf('exercise/runner/RepetitionProgress', module).add('with repetition', () => (
  <CenteredPageLayout>
    <RepetitionProgress kg={25} repetition={12} onFinished={action('onFinished')} />
  </CenteredPageLayout>
));
