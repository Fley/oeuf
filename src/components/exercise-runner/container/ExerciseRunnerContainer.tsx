import React, { FC, useEffect } from 'react';
import { MapStateToProps, MapDispatchToProps, connect } from 'react-redux';
import { Exercise, Step } from '../../../store/types';
import { ExerciseRunner } from '../presentational/ExerciseRunner';
import { AppStore } from '../../../store/reducer';
import { getExerciseById, areExercisesLoading, hasErrorLoadingExercises } from '../../../store/selectors';
import { fetchExerciseRequest, acknowledgeExerciseStepRequest } from '../../../store/actions';
import EmptyPage from 'components/empty-page/EmptyPage';
import { faSun, faPoo } from '@fortawesome/free-solid-svg-icons';
import { faFrown } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';

const LoadingPage = () => <EmptyPage text="Loading ..." icon={faSun} action={<p>Your exercise is being loaded</p>} />;
const ErrorLoadingPage = () => (
  <EmptyPage
    text="Error loading your exercise"
    icon={faPoo}
    action={<p>Sorry an error occured loading your exercice !</p>}
  />
);
const ExerciseNotFoundPage = () => (
  <EmptyPage
    text="Exercise not found"
    icon={faFrown}
    action={
      <Link className="btn btn-primary" to="/">
        Back to exercises
      </Link>
    }
  />
);
const ExerciseStepNotFoundPage = () => (
  <EmptyPage
    text="Step not found"
    icon={faFrown}
    action={
      <Link className="btn btn-primary" to="/">
        Back to exercises
      </Link>
    }
  />
);

export type ExerciseRunnerContainerOwnProps = {
  exerciseId: Exercise['id'];
  stepId: Step['id'];
};

type ExerciseRunnerContainerStateProps = {
  exercise: Exercise;
  loading: boolean;
  errorLoading: boolean;
};

type ExerciseRunnerContainerDispatchProps = {
  loadExercise: () => void;
  onStepFinished: () => void;
};

type ExerciseRunnerContainerProps = ExerciseRunnerContainerOwnProps &
  ExerciseRunnerContainerStateProps &
  ExerciseRunnerContainerDispatchProps;

const ExerciseRunnerContainerComponent: FC<ExerciseRunnerContainerProps> = ({
  stepId,
  exercise,
  onStepFinished,
  loading,
  errorLoading,
  loadExercise
}) => {
  useEffect(() => {
    if (!exercise) {
      loadExercise();
    }
  }, []);

  const stepIndex = exercise ? exercise.steps.findIndex(({ id }) => id === stepId) : -1;
  return loading ? (
    <LoadingPage />
  ) : errorLoading ? (
    <ErrorLoadingPage />
  ) : !exercise ? (
    <ExerciseNotFoundPage />
  ) : stepIndex < 0 ? (
    <ExerciseStepNotFoundPage />
  ) : (
    <ExerciseRunner
      key={`exercise-runner-${exercise.id}-${stepId}`}
      exerciseId={exercise.id}
      exerciseName={exercise.name}
      type={exercise.type}
      steps={exercise.steps}
      onStepFinished={onStepFinished}
      currentStepIndex={stepIndex}
    />
  );
};

const mapStateToProps: MapStateToProps<ExerciseRunnerContainerStateProps, ExerciseRunnerContainerOwnProps, AppStore> = (
  state,
  ownProps
) => ({
  exercise: getExerciseById(state)(ownProps.exerciseId),
  loading: areExercisesLoading(state),
  errorLoading: hasErrorLoadingExercises(state)
});

const mapDispatchToProps: MapDispatchToProps<ExerciseRunnerContainerDispatchProps, ExerciseRunnerContainerOwnProps> = (
  dispatch,
  ownProps
) => ({
  loadExercise: () => dispatch(fetchExerciseRequest(ownProps.exerciseId)),
  onStepFinished: () => dispatch(acknowledgeExerciseStepRequest(ownProps.exerciseId, ownProps.stepId))
});

export const ExerciseRunnerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ExerciseRunnerContainerComponent);
