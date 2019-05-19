import React, { Fragment, FC } from 'react';
import { storiesOf } from '@storybook/react';
import { Theme, getColorFromString } from './Theme';
import { PageHeader } from 'components/page-header/PageHeader';
import { PageLayout } from 'components/page-layout/PageLayout';
import { Paper, Typography, Button, Link, Avatar, Grid } from '@material-ui/core';

storiesOf('Atoms|Theme', module)
  .add('demo', () => (
    <Theme>
      <PageHeader title="Theme demo" />
      <PageLayout>
        <Paper style={{ padding: '24px' }}>
          <Typography variant="h5">This is a sheet of paper.</Typography>
          <Typography component="p">
            Paper can be used to build surface or other elements for your application.
          </Typography>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button variant="contained">Default</Button>
            <Button variant="contained" color="primary">
              Primary
            </Button>
            <Button variant="contained" color="secondary">
              Secondary
            </Button>
            <Button variant="contained" color="secondary" disabled>
              Disabled
            </Button>
            <Typography>
              <Link>Link</Link>
            </Typography>
          </div>
        </Paper>
      </PageLayout>
    </Theme>
  ))
  .add('Colors', () => {
    const AvatarItem: FC<{ text: string }> = ({ text }) => (
      <Grid item>
        <Avatar style={{ backgroundColor: getColorFromString(text) }}>{text}</Avatar>
      </Grid>
    );
    return (
      <Grid container spacing={8}>
        <AvatarItem text="" />
        {new Array<string>(26).fill('A').map((char, index) => {
          return <AvatarItem key={index} text={String.fromCharCode(index + char.charCodeAt(0))} />;
        })}
      </Grid>
    );
  });
