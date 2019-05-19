import React, { FC } from 'react';
import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3
    },
    marginBottom: theme.spacing.unit * 11 // Leave space for FAB
  }
}));

export const PageLayout: FC = ({ children }) => {
  const classes = useStyles();
  return <div className={classes.container}>{children}</div>;
};
