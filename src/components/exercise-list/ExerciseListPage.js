import React from 'react';
import PropTypes from 'prop-types';
import ExerciseList from './ExerciseList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { EXERCISE_TYPE } from '../../store/propTypes';

const ExerciseListPage = ({
  exercises,
  onAddExercise,
  onDeleteExercise,
  onAcknowledgeExercise,
  onCancelExercise,
  loading = false,
  errorLoading = false
}) => (
  <div>
    <nav className="navbar sticky-top navbar-dark shadow-sm bg-primary">
      <span className="navbar-brand mb-0 h1">Exercises</span>
    </nav>
    <div className="col-sm-10 p-0 mx-auto mb-5 py-3">
      <ExerciseList
        exercises={exercises}
        onAddExercise={onAddExercise}
        onDeleteExercise={onDeleteExercise}
        onAcknowledgeExercise={onAcknowledgeExercise}
        onCancelExercise={onCancelExercise}
        loading={loading}
        errorLoading={errorLoading}
      />
    </div>
    <nav className="navbar fixed-bottom navbar-light bg-white p-0 navbar-expand shadow-up-sm">
      <ul className="d-flex navbar-nav w-100">
        <li className="nav-item flex-grow-1">
          <button className="btn btn-link nav-link" disabled={loading || errorLoading} onClick={() => onAddExercise()}>
            <FontAwesomeIcon icon={faPlusSquare} /> New exercise
          </button>
        </li>
      </ul>
    </nav>
  </div>
);

ExerciseListPage.propTypes = {
  exercises: PropTypes.arrayOf(EXERCISE_TYPE),
  onAddExercise: PropTypes.func.isRequired,
  onDeleteExercise: PropTypes.func.isRequired,
  onAcknowledgeExercise: PropTypes.func.isRequired,
  onCancelExercise: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  errorLoading: PropTypes.bool
};

ExerciseList.defaultProps = {
  exercises: []
};

export default ExerciseListPage;
