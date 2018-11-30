import React from 'react';
import PropTypes from 'prop-types';
import ExerciseList from './ExerciseList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { EXERCISE_TYPE } from 'store/propTypes';
import Layout from 'components/layout/Layout';

const ExerciseListPage = ({
  exercises,
  onAddExercise,
  onDeleteExercise,
  onAcknowledgeExercise,
  onCancelExercise,
  loading = false,
  errorLoading = false
}) => (
  <Layout
    header={<span className="navbar-brand mb-0 h1">Exercises</span>}
    headerBackground={{ className: 'bg-primary', isLight: false }}
    navItems={[
      <button className="btn btn-link nav-link" disabled={loading || errorLoading} onClick={() => onAddExercise()}>
        <FontAwesomeIcon icon={faPlusSquare} /> New exercise
      </button>
    ]}
  >
    <ExerciseList
      exercises={exercises}
      onAddExercise={onAddExercise}
      onDeleteExercise={onDeleteExercise}
      onAcknowledgeExercise={onAcknowledgeExercise}
      onCancelExercise={onCancelExercise}
      loading={loading}
      errorLoading={errorLoading}
    />
  </Layout>
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
