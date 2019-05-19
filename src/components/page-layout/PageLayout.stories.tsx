import React from 'react';
import { storiesOf } from '@storybook/react';
import { PageLayout } from './PageLayout';
import { Paper } from '@material-ui/core';

storiesOf('Atoms|Layout', module).add('default', () => (
  <PageLayout>
    <Paper>Hello</Paper>
  </PageLayout>
));
