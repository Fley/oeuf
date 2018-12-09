import React, { Component, Dispatch } from 'react';
import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux';
import { getExerciseById, areExercisesLoading, hasErrorLoadingExercises } from '../../../store/selectors';
import ExercisePage from '../presentational/ExercisePage';
import {
  fetchAllExercisesRequest,
  updateExerciseNameRequest,
  addExerciseStepRequest,
  deleteExerciseStepRequest,
  acknowledgeExerciseStepRequest,
  cancelExerciseStepRequest,
  updateExerciseStepRequest,
  moveExerciseStepRequest,
  Action
} from '../../../store/actions';
import { AppStore } from '../../../store/reducer';
import { StepType, Step, Exercise } from '../../../store/types';

type ExercicePageContainerStateProps = {
  exercise: Exercise;
  loading: boolean;
  errorLoading: boolean;
};

type ExercicePageContainerDispatchProps = {
  load: () => void;
  onAddStep: (exerciseId: string) => (stepType: StepType) => (stepContent?: Step) => void;
  onDeleteStep: (exerciseId: string) => (stepId: string) => void;
  onAcknowledgeStep: (exerciseId: string) => (stepId: string) => void;
  onCancelStep: (exerciseId: string) => (stepId: string) => void;
  onUpdateStep: (exerciseId: string) => (stepId: string) => (contentPatch: Partial<Step>) => void;
  onMoveStep: (exerciseId: string) => (p: { oldIndex: number; newIndex: number }) => void;
  onStartExercise: () => void;
  onExerciseNameChange: (id: string) => (name: string) => void;
};

export type ExercicePageContainerOwnProps = {
  exerciseId: string;
};

const mapStateToProps: MapStateToProps<ExercicePageContainerStateProps, ExercicePageContainerOwnProps, AppStore> = (
  state,
  ownProps
) => ({
  exercise: getExerciseById(state)(ownProps.exerciseId),
  loading: areExercisesLoading(state),
  errorLoading: hasErrorLoadingExercises(state)
});

const mapDispatchToProps: MapDispatchToProps<ExercicePageContainerDispatchProps, ExercicePageContainerOwnProps> = (
  dispatch: Dispatch<Action>
) => {
  return {
    load: () => dispatch(fetchAllExercisesRequest()),
    onAddStep: (exerciseId: string) => (stepType: StepType) => (stepContent?: Step) =>
      dispatch(addExerciseStepRequest(exerciseId, stepType, stepContent)),
    onDeleteStep: (exerciseId: string) => (stepId: string) => dispatch(deleteExerciseStepRequest(exerciseId, stepId)),
    onAcknowledgeStep: (exerciseId: string) => (stepId: string) =>
      dispatch(acknowledgeExerciseStepRequest(exerciseId, stepId)),
    onCancelStep: (exerciseId: string) => (stepId: string) => dispatch(cancelExerciseStepRequest(exerciseId, stepId)),
    onUpdateStep: (exerciseId: string) => (stepId: string) => (contentPatch: Partial<Step>) =>
      dispatch(updateExerciseStepRequest(exerciseId, stepId, contentPatch)),
    onMoveStep: (exerciseId: string) => ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) =>
      dispatch(moveExerciseStepRequest(exerciseId, oldIndex, newIndex)),
    onStartExercise: () => {
      return;
    },
    onExerciseNameChange: (id: string) => (name: string) => dispatch(updateExerciseNameRequest(id, name))
  };
};

type ExercicePageContainerProps = ExercicePageContainerStateProps &
  ExercicePageContainerDispatchProps &
  ExercicePageContainerOwnProps;

class ExercicePageContainer extends Component<ExercicePageContainerProps> {
  componentDidMount() {
    if (!this.props.exercise) {
      this.props.load();
    }
  }
  render() {
    const { load, ...restProps } = this.props;
    return <ExercisePage {...restProps} />;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExercicePageContainer);
