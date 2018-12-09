import React from 'react';
import ExerciseList, { ExerciseListProps } from './ExerciseList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import Layout from '../../../components/layout/Layout';

const ExerciseListPage = ({
  loading = false,
  errorLoading = false,
  exercises,
  onAddExercise,
  onDeleteExercise,
  onAcknowledgeExercise,
  onCancelExercise
}: ExerciseListProps) => (
  <Layout
    header={<span className="navbar-brand mb-0 h1">Exercises</span>}
    headerBackground={{ className: 'bg-primary', isLight: false }}
    navItems={[
      <button
        key="nav-new-exercise"
        className="btn btn-link nav-link"
        disabled={loading || errorLoading}
        onClick={() => onAddExercise()}
      >
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

export default ExerciseListPage;
