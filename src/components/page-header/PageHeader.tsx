import React, { FC } from 'react';
import { Typography, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(({ spacing }: Theme) => ({
  container: {
    height: spacing.unit * 8,
    paddingLeft: spacing.unit * 3,
    paddingRight: spacing.unit * 3,
    display: 'flex',
    alignItems: 'center'
  },
  text: {
    flexGrow: 1,
    textAlign: 'center'
  }
}));

export type PageHeaderProps = {
  title: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
};

export const PageHeader: FC<PageHeaderProps> = ({ left, title, right }) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      {left}
      <Typography variant="h6" gutterBottom className={classes.text}>
        {title}
      </Typography>
      {right}
    </div>
  );
};
