import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { EXERCISE_TYPE } from '../../store/propTypes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListAlt } from '@fortawesome/free-regular-svg-icons';
import { faAngleRight, faSun, faPoo, faTrash, faCheck, faUndo } from '@fortawesome/free-solid-svg-icons';
import EmptyPage from '../empty-page/EmptyPage';
import SwipeableListItem, {
  SwipedItemAcknowledged,
  SwipedItemRemoved,
  SwipedItemCanceled
} from '../swipeable-list-item/SwipeableListItem';
import './ExerciseList.css';

const mapExerciceItem = (onAcknowledgeExercise, onCancelExercise, onDeleteExercise) => ({ id, name, done }) => (
  <SwipeableListItem
    key={`exercise-${id}`}
    className={'list-group-item p-0 ' + (done ? 'list-group-item-success' : '')}
    onSwipeLeft={done ? () => onCancelExercise(id) : () => onAcknowledgeExercise(id)}
    onSwipeRight={() => onDeleteExercise(id)}
    leftSwipeElement={done ? <SwipedItemCanceled /> : <SwipedItemAcknowledged />}
    rightSwipeElement={<SwipedItemRemoved />}
  >
    <Link
      to={`/${id}`}
      className={`d-flex py-2 px-3 list-group-item-action ${done ? 'list-group-item-success' : ''} h-100`}
    >
      <span className="flex-grow-1 p-1">{name}</span>
      <div className="btn-toolbar list-toolbar-hover" role="toolbar" aria-label="Toolbar with actions on the exercise">
        <button
          type="button"
          className="btn btn-sm btn-outline-dark rounded-circle border-0 mx-1"
          aria-label="Delete"
          onClick={e => {
            onDeleteExercise(id);
            e.preventDefault();
          }}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
        {done ? (
          <button
            type="button"
            className="btn btn-sm btn-outline-dark rounded-circle border-0 mx-1"
            aria-label="Complete"
            onClick={e => {
              onCancelExercise(id);
              e.preventDefault();
            }}
          >
            <FontAwesomeIcon icon={faUndo} />
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-sm btn-outline-dark rounded-circle border-0 mx-1"
            aria-label="Complete"
            onClick={e => {
              onAcknowledgeExercise(id);
              e.preventDefault();
            }}
          >
            <FontAwesomeIcon icon={faCheck} />
          </button>
        )}
      </div>
      <span className="p-1 ml-1">
        <FontAwesomeIcon icon={faAngleRight} />
      </span>
    </Link>
  </SwipeableListItem>
);

const ExerciseList = ({
  exercises = [],
  onAddExercise,
  onAcknowledgeExercise,
  onDeleteExercise,
  onCancelExercise,
  loading = false,
  errorLoading = false
}) => {
  return exercises.length > 0 ? (
    <ul className="list-group shadow-y-sm">
      {exercises &&
        exercises
          .sort((a, b) => ((a.done && b.done) || (!a.done && !b.done) ? 0 : a.done ? 1 : -1))
          .map(mapExerciceItem(onAcknowledgeExercise, onCancelExercise, onDeleteExercise))}
    </ul>
  ) : loading ? (
    <EmptyPage text="Loading ..." icon={faSun} action={<div>Your exercises are being loaded</div>} />
  ) : errorLoading ? (
    <EmptyPage
      text="Error loading your exercises"
      icon={faPoo}
      action={<div>Sorry an error occured loading your exercices !</div>}
    />
  ) : (
    <EmptyPage
      text="You have no exercises yet"
      icon={faListAlt}
      action={
        <div>
          <button className="btn btn-sm btn-primary m-1" onClick={() => onAddExercise()}>
            Create your first exercise
          </button>
          <button className="btn btn-sm btn-outline-primary m-1">Import exercises</button>
        </div>
      }
    />
  );
};

ExerciseList.propTypes = {
  exercises: PropTypes.arrayOf(EXERCISE_TYPE),
  onAddExercise: PropTypes.func.isRequired,
  onAcknowledgeExercise: PropTypes.func.isRequired,
  onDeleteExercise: PropTypes.func.isRequired,
  onCancelExercise: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  errorLoading: PropTypes.bool
};

export default ExerciseList;
