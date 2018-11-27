import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faPlay, faTimes, faPoo, faSun, faQuidditch } from '@fortawesome/free-solid-svg-icons';
import Exercise from './Exercise';
import { Link } from 'react-router-dom';
import { EXERCISE_TYPE } from '../../store/propTypes';
import EmptyPage from '../empty-page/EmptyPage';
import Layout from '../layout/Layout';

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

const ExercisePage = ({
  exercise,
  loading = false,
  errorLoading = false,
  onAddStep,
  onDeleteStep,
  onAcknowledgeStep,
  onCancelStep,
  onStartExercise,
  onUpdateStep,
  onMoveStep,
  onExerciseNameChange
}) => {
  const header = (
    <Link to="/" className="btn btn-link text-dark" aria-label="Back to exercises list">
      <FontAwesomeIcon icon={faTimes} />
    </Link>
  );
  let navItems = [
    <button
      className="btn btn-link nav-link btn-block"
      disabled={loading || errorLoading}
      onClick={() => onStartExercise()}
    >
      <FontAwesomeIcon icon={faPlay} /> Start
    </button>
  ];
  if (exercise && exercise.type) {
    navItems = [
      ...navItems,
      <button
        className="btn btn-link nav-link btn-block"
        disabled={loading || errorLoading}
        onClick={() => onAddStep(exercise.id)(exercise.type)(exercise.steps[exercise.steps.length - 1])}
      >
        <FontAwesomeIcon icon={faPlusSquare} /> New step
      </button>
    ];
  }
  return (
    <Layout header={header} navItems={navItems}>
      {loading ? (
        <LoadingPage />
      ) : errorLoading ? (
        <ErrorLoadingPage />
      ) : exercise ? (
        <Exercise
          exercise={exercise}
          onAddFirstStep={onAddStep(exercise.id)}
          onDeleteStep={onDeleteStep(exercise.id)}
          onAcknowledgeStep={onAcknowledgeStep(exercise.id)}
          onCancelStep={onCancelStep(exercise.id)}
          onUpdateStep={onUpdateStep(exercise.id)}
          onMoveStep={onMoveStep(exercise.id)}
          onExerciseNameChange={onExerciseNameChange(exercise.id)}
        />
      ) : (
        <ExerciseNotFoundPage />
      )}
    </Layout>
  );
};

ExercisePage.propTypes = {
  exercise: EXERCISE_TYPE,
  loading: PropTypes.bool,
  errorLoading: PropTypes.bool,
  onAddStep: PropTypes.func.isRequired,
  onStartExercise: PropTypes.func.isRequired
};

export default ExercisePage;
