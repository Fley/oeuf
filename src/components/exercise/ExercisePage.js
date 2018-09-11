import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faPlay, faTimes, faPoo, faSun, faQuidditch } from '@fortawesome/free-solid-svg-icons';
import Exercise from './Exercise';
import { Link } from 'react-router-dom';
import { EXERCISE_TYPE } from '../../store/propTypes';
import EmptyPage from '../empty-page/EmptyPage';

const LoadingPage = () => (
  <EmptyPage text="Loading ..." icon={faSun} action={<div>Your exercise is being loaded</div>} />
);
const ErrorLoadingPage = () => (
  <EmptyPage
    text="Error loading your exercise"
    icon={faPoo}
    action={<div>Sorry an error occured loading your exercice !</div>}
  />
);
const ExerciseNotFoundPage = () => (
  <EmptyPage
    text="Exercise not found"
    icon={faQuidditch}
    action={
      <Link className="btn btn-sm btn-primary" to="/">
        Back to exercises
      </Link>
    }
  />
);
const ExercisePage = ({ exercise, loading = false, errorLoading = false, onAddStep, onStartExercise }) => (
  <div>
    <nav className="navbar sticky-top navbar-light shadow-sm bg-white">
      <Link to="/" className="btn btn-link text-dark" aria-label="Back to exercises list">
        <FontAwesomeIcon icon={faTimes} />
      </Link>
    </nav>
    <div className="col-sm-10 mx-auto mb-5 py-3 px-0 px-xs-2">
      {loading ? (
        <LoadingPage />
      ) : errorLoading ? (
        <ErrorLoadingPage />
      ) : exercise ? (
        <Exercise name={exercise.name} steps={exercise.steps} onAddStep={onAddStep} />
      ) : (
        <ExerciseNotFoundPage />
      )}
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
        {exercise &&
          exercise.type && (
            <li className="nav-item">
              <button
                className="btn btn-link nav-link btn-block"
                disabled={loading || errorLoading}
                onClick={() => onAddStep(exercise.type)}
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
  exercise: EXERCISE_TYPE,
  loading: PropTypes.bool,
  errorLoading: PropTypes.bool,
  onAddStep: PropTypes.func.isRequired,
  onStartExercise: PropTypes.func.isRequired
};

export default ExercisePage;
