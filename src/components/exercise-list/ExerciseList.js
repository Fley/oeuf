import React from 'react';
import PropTypes from 'prop-types';
import { EXERCISE_TYPE } from '../../store/propTypes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListAlt } from '@fortawesome/free-regular-svg-icons';
import { faAngleRight, faSun, faPoo } from '@fortawesome/free-solid-svg-icons';
import EmptyPage from '../empty-page/EmptyPage';
import SwipeableListItem, {
  SwipedItemAcknowledged,
  SwipedItemRemoved,
  SwipedItemCanceled
} from '../swipeable-list-item/SwipeableListItem';

const mapExerciceItem = (onSwipeLeft, onSwipeRight) => ({ id, name, done }) => (
  <SwipeableListItem
    key={`exercise-${id}`}
    className={'list-group-item p-0 ' + (done ? 'list-group-item-success' : '')}
    onSwipeLeft={() => onSwipeLeft(id)}
    onSwipeRight={() => onSwipeRight(id)}
    leftSwipeElement={done ? <SwipedItemCanceled /> : <SwipedItemAcknowledged />}
    rightSwipeElement={<SwipedItemRemoved />}
  >
    <a href="#" className={`d-flex p-3 list-group-item-action ${done ? 'list-group-item-success' : ''} h-100`}>
      <span className="flex-grow-1">{name}</span>
      <span>
        <FontAwesomeIcon icon={faAngleRight} />
      </span>
    </a>
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
}) => (
  <div>
    {exercises.length > 0 ? (
      <ul className="list-group shadow-y-sm">
        {exercises && exercises.filter(e => !e.done).map(mapExerciceItem(onAcknowledgeExercise, onDeleteExercise))}
        {exercises && exercises.filter(e => e.done).map(mapExerciceItem(onCancelExercise, onDeleteExercise))}
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
    )}
  </div>
);

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
