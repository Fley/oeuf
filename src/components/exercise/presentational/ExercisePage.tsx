import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faPlay, faTimes, faPoo, faSun, faQuidditch } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import EmptyPage from '../../../components/empty-page/EmptyPage';
import Layout from '../../../components/layout/Layout';
import { StepType, Step, Exercise as ExerciseType } from '../../../store/types';
import Exercise from './Exercise';

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

export type ExercisePageProps = {
  loading?: boolean;
  exercise?: ExerciseType;
  errorLoading?: boolean;
  onAddStep: (exerciseId: string) => (stepType: StepType) => (stepContent?: Step) => void;
  onDeleteStep: (exerciseId: string) => (stepId: string) => void;
  onAcknowledgeStep: (exerciseId: string) => (stepId: string) => void;
  onCancelStep: (exerciseId: string) => (stepId: string) => void;
  onUpdateStep: (exerciseId: string) => (stepId: string) => (contentPatch: Partial<Step>) => void;
  onMoveStep: (exerciseId: string) => (p: { oldIndex: number; newIndex: number }) => void;
  onStartExercise: () => void;
  onExerciseNameChange: (exerciseId: string) => (name: string) => void;
};

const ExercisePage = ({
  loading = false,
  errorLoading = false,
  exercise,
  onAddStep,
  onDeleteStep,
  onAcknowledgeStep,
  onCancelStep,
  onStartExercise,
  onUpdateStep,
  onMoveStep,
  onExerciseNameChange
}: ExercisePageProps) => {
  const header = (
    <Link to="/" className="btn btn-link text-dark" aria-label="Back to exercises list">
      <FontAwesomeIcon icon={faTimes} />
    </Link>
  );
  let navItems = [
    <button
      key="nav-start"
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
        key="nav-new-step"
        className="btn btn-link nav-link btn-block"
        disabled={loading || errorLoading}
        onClick={() => onAddStep(exercise.id)(exercise.type!)(exercise.steps[exercise.steps.length - 1])}
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
          onStartExercise={() => {
            return;
          }}
        />
      ) : (
        <ExerciseNotFoundPage />
      )}
    </Layout>
  );
};

export default ExercisePage;
