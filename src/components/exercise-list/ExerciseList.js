import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faAngleRight from '@fortawesome/fontawesome-free-solid/faAngleRight';
import faFrown from '@fortawesome/fontawesome-free-regular/faFrown';

const Exercice = ({ name, done = false }) => (
  <a href="#" className={`d-flex list-group-item list-group-item-action ${done ? 'list-group-item-success' : ''}`}>
    <span className="flex-grow-1">{name}</span>
    <span>
      <FontAwesomeIcon icon={faAngleRight} />
    </span>
  </a>
);

const ExerciseList = ({ exercises = [] }) => (
  <div>
    {exercises.length > 1 || (
      <div className="text-center fixed-centered-message">
        No exercise <FontAwesomeIcon icon={faFrown} />
      </div>
    )}
    <div className="list-group">
      {exercises && exercises.map(({ name, id, done }) => <Exercice key={`exercise-${id}`} name={name} done={done} />)}
    </div>
  </div>
);

export default ExerciseList;

ExerciseList.propTypes = {
  exercises: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      done: PropTypes.bool
    })
  )
};
