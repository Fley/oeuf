import React from 'react';
import { storiesOf } from '@storybook/react';
import { FixedBottomFab } from './FixedBottomFab';
import { AddSharp } from '@material-ui/icons';

storiesOf('Molecules|FAB', module).add('Fixed bottom right', () => (
  <FixedBottomFab>
    <AddSharp />
  </FixedBottomFab>
));
