import React from 'react';
import uuidV4 from 'uuid/v4';
import { storiesOf } from '@storybook/react';
import { ExerciseList } from './ExerciseList';
import { ExerciseListItemProps } from './ExerciseListItem';

const exercises: ExerciseListItemProps[] = new Array(10)
  .fill([
    { type: 'timed', name: 'Abds' },
    { type: 'repetition', name: 'Chess press' },
    { type: 'repetition', name: 'Vertical traction' }
  ])
  .flat()
  .map(e => ({ ...e, id: uuidV4() }));

storiesOf('Pages|ExerciseList', module)
  .add('With items', () => <ExerciseList exercises={exercises} />)
  .add('Empty', () => <ExerciseList exercises={[]} />)
  .add('Loading', () => <ExerciseList exercises={[]} loading />)
  .add('With error', () => <ExerciseList exercises={[]} errorLoading />);
