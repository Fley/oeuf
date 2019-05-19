import React, { FC, Fragment } from 'react';
import { List, Paper, Typography, Button, Grid, Theme, CircularProgress } from '@material-ui/core';
import { AddSharp, SentimentDissatisfiedSharp } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';

import { PageHeader } from 'components/page-header/PageHeader';
import { PageLayout } from 'components/page-layout/PageLayout';
import { FixedBottomFab } from 'components/fab/FixedBottomFab';
import { ExerciseListItem, ExerciseListItemProps } from './ExerciseListItem';
import { Logo } from 'components/logo/Logo';

export type ExerciseListProps = {
  exercises: ExerciseListItemProps[];
  loading?: boolean;
  errorLoading?: boolean;
};

export const ExerciseList: FC<ExerciseListProps> = ({ loading, errorLoading, exercises }) => (
  <Fragment>
    <PageHeader title="Exercises" />
    <PageLayout>
      {loading ? (
        <LoadingList />
      ) : errorLoading ? (
        <ErrorLoadingList />
      ) : (
        <Fragment>
          {exercises.length > 0 ? <ListComponent exercises={exercises} /> : <EmptyList />}
          <FixedBottomFab>
            <AddSharp />
          </FixedBottomFab>
        </Fragment>
      )}
    </PageLayout>
  </Fragment>
);

const ListComponent: FC<Pick<ExerciseListProps, 'exercises'>> = ({ exercises }) => (
  <Paper elevation={1}>
    <List>
      {exercises.map(({ type, name, id }) => (
        <ExerciseListItem key={id} type={type} name={name} id={id} />
      ))}
    </List>
  </Paper>
);

const useEmptyListStyles = makeStyles((theme: Theme) => {
  return {
    logo: {
      margin: theme.spacing.unit
    },
    text: {
      margin: theme.spacing.unit
    },
    button: {
      margin: theme.spacing.unit
    }
  };
});

const EmptyList: FC = () => {
  const classes = useEmptyListStyles();
  return (
    <Grid container direction="column" justify="space-around" alignItems="center" spacing={24}>
      <Grid direction="column" justify="center" alignItems="center" container item>
        <Logo />
        <Typography className={classes.text} variant="body1">
          You have no exercise yet
        </Typography>
      </Grid>
      <Button className={classes.button} variant="contained" color="primary">
        Create your first exercise
      </Button>
      <Button className={classes.button} variant="contained">
        Import exercises
      </Button>
    </Grid>
  );
};

const LoadingList: FC = () => (
  <Grid container direction="column" justify="space-around" alignItems="center" spacing={24}>
    <Grid item>
      <CircularProgress />
    </Grid>
    <Grid item>
      <Typography variant="caption">Your exercises are being loaded</Typography>
    </Grid>
  </Grid>
);

const useErrorLoadingListStyles = makeStyles((theme: Theme) => ({
  icon: {
    fontSize: '5em',
    color: theme.palette.error.main
  }
}));

const ErrorLoadingList: FC = () => {
  const classes = useErrorLoadingListStyles();
  return (
    <Grid container direction="column" justify="space-around" alignItems="center" spacing={24}>
      <Grid item>
        <SentimentDissatisfiedSharp className={classes.icon} />
      </Grid>
      <Grid item>
        <Typography variant="body1">An error occured loading your exercises</Typography>
      </Grid>
    </Grid>
  );
};
