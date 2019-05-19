import { Avatar, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Theme } from '@material-ui/core';
import { DragHandleSharp, FitnessCenterSharp, TimerSharp } from '@material-ui/icons';
import React, { FC } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import { LinkProps } from '@material-ui/core/Link';
import { getColorFromString } from 'components/theme-2/Theme';

const ExerciseAvatar: FC<{ id: string; type?: ExerciseType }> = ({ id, type }) => {
  const style = { backgroundColor: getColorFromString(id) };
  return (
    <Avatar style={style}>
      {type === 'repetition' ? <FitnessCenterSharp /> : type === 'timed' ? <TimerSharp /> : '?'}
    </Avatar>
  );
};

export type ExerciseType = 'repetition' | 'timed';
export type ExerciseListItemProps = {
  type?: ExerciseType;
  name: string;
  id: string;
};

const useItemStyles = makeStyles(({ palette }: Theme) => ({
  handleBar: {
    color: palette.grey[500]
  }
}));

const renderLink = (id: string) => (props: LinkProps) => <Link to={`/${id}`} {...props} />;

export const ExerciseListItem: FC<ExerciseListItemProps> = ({ id, type, name }) => {
  const classes = useItemStyles();
  return (
    <ListItem component={renderLink(id)} button>
      <ListItemAvatar>
        <ExerciseAvatar type={type} id={id} />
      </ListItemAvatar>
      <ListItemText primary={name} />
      <ListItemSecondaryAction>
        <DragHandleSharp className={classes.handleBar} />
      </ListItemSecondaryAction>
    </ListItem>
  );
};
