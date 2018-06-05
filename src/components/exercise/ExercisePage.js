import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faPlusSquare from '@fortawesome/fontawesome-free-solid/faPlusSquare';
import faPlay from '@fortawesome/fontawesome-free-solid/faPlay';
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes';
import Exercise from './Exercise';

const ExercisePage = ({
  exercise: { id, name, type, steps } = { steps: [] },
  loading = false,
  errorLoading = false,
  onAddStep,
  onStartExercise
}) => (
  <div>
    <nav className="navbar sticky-top navbar-light shadow-sm bg-white">
      <button className="btn btn-link text-dark">
        <FontAwesomeIcon icon={faTimes} />
      </button>
    </nav>
    <div className="col-sm-10 mx-auto mb-5 py-3 px-0 px-xs-2">
      <Exercise name={name} steps={steps} onAddStep={onAddStep} />
    </div>
    <nav className="navbar fixed-bottom navbar-light bg-white p-0 navbar-expand shadow-up-sm">
      <ul className="navbar-nav nav-justified w-100">
        <li className="nav-item">
          <button
            className="btn btn-link nav-link btn-block"
            disabled={loading || errorLoading}
            onClick={() => onStartExercise()}
          >
            <FontAwesomeIcon icon={faPlay} /> Start
          </button>
        </li>
        {type && (
          <li className="nav-item">
            <button
              className="btn btn-link nav-link btn-block"
              disabled={loading || errorLoading}
              onClick={() => onAddStep(type)}
            >
              <FontAwesomeIcon icon={faPlusSquare} /> New step
            </button>
          </li>
        )}
      </ul>
    </nav>
  </div>
);

ExercisePage.propTypes = {
  exercise: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.oneOf(['time', 'repetition']),
    steps: PropTypes.array
  }).isRequired,
  loading: PropTypes.bool,
  errorLoading: PropTypes.bool,
  onAddStep: PropTypes.func.isRequired,
  onStartExercise: PropTypes.func.isRequired
};

export default ExercisePage;
