import React, { FC } from 'react';
import { Fab, Theme, Zoom } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(({ spacing }: Theme) => ({
  fab: {
    position: 'fixed',
    bottom: spacing.unit * 2,
    right: spacing.unit * 2
  }
}));

export const FixedBottomFab: FC = ({ children }) => {
  const classes = useStyles();
  return (
    <Zoom in={true}>
      <Fab className={classes.fab} color="primary">
        {children}
      </Fab>
    </Zoom>
  );
};
