import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faAngleRight from '@fortawesome/fontawesome-free-solid/faAngleRight';
import faListAlt from '@fortawesome/fontawesome-free-regular/faListAlt';
import faSun from '@fortawesome/fontawesome-free-solid/faSun';
import faPoo from '@fortawesome/fontawesome-free-solid/faPoo';
import EmptyPage from '../empty-page/EmptyPage';
import SwipeableListItem, { SwipedItemAcknowledged, SwipedItemRemoved } from '../swipeable-list-item/SwipeableListItem';

const ExerciceItem = ({ name, done = false, started = false, onAcknowledgeExercise, onDeleteExercise }) => (
  <SwipeableListItem
    className={'list-group-item p-0 ' + (done ? 'list-group-item-success' : '')}
    onSwipeLeft={onAcknowledgeExercise}
    onSwipeRight={onDeleteExercise}
    leftSwipeElement={<SwipedItemAcknowledged />}
    rightSwipeElement={<SwipedItemRemoved />}
  >
    <a
      href="#"
      className={`d-flex list-group-item list-group-item-action ${done ? 'list-group-item-success' : ''} h-100`}
    >
      <span className="flex-grow-1">{name}</span>
      <span>
        <FontAwesomeIcon icon={faAngleRight} />
      </span>
    </a>
  </SwipeableListItem>
);

const ExerciseList = ({ exercises = [], onAddExercise, loading = false, errorLoading = false }) => (
  <div>
    {exercises.length > 0 ? (
      <div className="list-group">
        {exercises &&
          exercises.map(({ name, id, done }) => <ExerciceItem key={`exercise-${id}`} name={name} done={done} />)}
      </div>
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
  exercises: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      done: PropTypes.bool
    })
  ),
  onAddExercise: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  errorLoading: PropTypes.bool
};

export default ExerciseList;
