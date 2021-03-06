import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListAlt } from '@fortawesome/free-regular-svg-icons';
import { faAngleRight, faSun, faPoo, faTrash, faCheck, faUndo } from '@fortawesome/free-solid-svg-icons';
import EmptyPage from '../../../components/empty-page/EmptyPage';
import SwipeableListItem, {
  SwipedItemAcknowledged,
  SwipedItemRemoved,
  SwipedItemCanceled
} from '../../../components/swipeable-list-item/SwipeableListItem';
import './ExerciseList.css';
import { Exercise } from '../../../store/types';

const mapExerciceItem = (onSwipeLeft: (id: string) => void, onSwipeRight: (id: string) => void) => ({
  id,
  name,
  done
}: Pick<Exercise, 'id' | 'done' | 'name'>) => {
  return (
    <SwipeableListItem
      key={`exercise-${id}`}
      className={'list-group-item p-0 ' + (done ? 'list-group-item-success' : '')}
      onSwipeLeft={() => onSwipeLeft(id)}
      onSwipeRight={() => onSwipeRight(id)}
      leftSwipeElement={done ? <SwipedItemCanceled /> : <SwipedItemAcknowledged />}
      rightSwipeElement={<SwipedItemRemoved />}
    >
      <Link
        to={`/${id}`}
        className={`d-flex py-3 px-3 list-group-item-action ${done ? 'list-group-item-success' : ''} h-100`}
      >
        <span className="flex-grow-1 p-1">{name}</span>
        <div
          className="d-none d-sm-block btn-toolbar list-toolbar-hover"
          role="toolbar"
          aria-label="Toolbar with actions on the exercise"
        >
          <button
            type="button"
            className="btn btn-outline-dark rounded-circle border-0 mx-1"
            aria-label="Delete"
            onClick={e => {
              onSwipeRight(id);
              e.preventDefault();
            }}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
          <button
            type="button"
            className="btn btn-outline-dark rounded-circle border-0 mx-1"
            aria-label="Complete"
            onClick={e => {
              onSwipeLeft(id);
              e.preventDefault();
            }}
          >
            {done ? <FontAwesomeIcon icon={faUndo} /> : <FontAwesomeIcon icon={faCheck} />}
          </button>
        </div>
        <span className="p-1 ml-1">
          <FontAwesomeIcon icon={faAngleRight} />
        </span>
      </Link>
    </SwipeableListItem>
  );
};

export type ExerciseListProps = {
  exercises: Exercise[];
  onAddExercise: () => void;
  onAcknowledgeExercise: (id: string) => void;
  onDeleteExercise: (id: string) => void;
  onCancelExercise: (id: string) => void;
  loading?: boolean;
  errorLoading?: boolean;
};

const ExerciseList = ({
  exercises = [],
  onAddExercise,
  onAcknowledgeExercise,
  onDeleteExercise,
  onCancelExercise,
  loading = false,
  errorLoading = false
}: ExerciseListProps) => {
  return exercises.length > 0 ? (
    <ul className="list-group shadow-y-sm">
      {exercises && exercises.filter(e => !e.done).map(mapExerciceItem(onAcknowledgeExercise, onDeleteExercise))}
      {exercises && exercises.filter(e => e.done).map(mapExerciceItem(onCancelExercise, onDeleteExercise))}
    </ul>
  ) : loading ? (
    <EmptyPage text="Loading ..." icon={faSun} action={<p>Your exercises are being loaded</p>} />
  ) : errorLoading ? (
    <EmptyPage
      text="Error loading your exercises"
      icon={faPoo}
      action={<p>Sorry an error occured loading your exercices !</p>}
    />
  ) : (
    <EmptyPage
      text="You have no exercises yet"
      icon={faListAlt}
      action={
        <>
          <button className="btn btn-primary m-1" onClick={() => onAddExercise()}>
            Create your first exercise
          </button>
          <button className="btn btn-outline-primary m-1">Import exercises</button>
        </>
      }
    />
  );
};

export default ExerciseList;
