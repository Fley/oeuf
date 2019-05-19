import React from 'react';
import { storiesOf } from '@storybook/react';
import { PageHeader } from './PageHeader';
import { ChevronLeftSharp, CloseSharp } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';

const left = (
  <IconButton>
    <ChevronLeftSharp />
  </IconButton>
);
const right = (
  <IconButton>
    <CloseSharp />
  </IconButton>
);

storiesOf('Molecules|PageHeader', module)
  .add('Title only', () => <PageHeader title="Exercices" />)
  .add('With left icon', () => <PageHeader title="Exercices" left={left} />)
  .add('With right icon', () => <PageHeader title="Exercices" right={right} />)
  .add('With icons', () => <PageHeader title="Exercices" left={left} right={right} />);
