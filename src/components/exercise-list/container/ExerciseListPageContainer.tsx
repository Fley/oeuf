import React, { Component } from 'react';
import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux';
import { getExerciseList, areExercisesLoading, hasErrorLoadingExercises } from '../../../store/selectors';
import ExerciseListPage from '../presentational/ExerciseListPage';
import {
  fetchAllExercisesRequest,
  deleteExerciseRequest,
  acknowledgeExerciseRequest,
  cancelExerciseRequest,
  addExerciseRequest
} from '../../../store/actions';
import { AppStore } from '../../../store/reducer';
import { Exercise } from '../../../store/types';

type ExerciceListPageContainerStateProps = {
  exercises: Exercise[];
  loading: boolean;
  errorLoading: boolean;
};

type ExerciceListPageContainerDispatchProps = {
  load: () => void;
  onAddExercise: () => void;
  onDeleteExercise: (id: string) => void;
  onAcknowledgeExercise: (id: string) => void;
  onCancelExercise: (id: string) => void;
};

export type ExerciceListPageContainerOwnProps = {};

type ExerciceListPageContainerProps = ExerciceListPageContainerStateProps &
  ExerciceListPageContainerDispatchProps &
  ExerciceListPageContainerOwnProps;

const mapStateToProps: MapStateToProps<
  ExerciceListPageContainerStateProps,
  ExerciceListPageContainerOwnProps,
  AppStore
> = state => ({
  exercises: getExerciseList(state),
  loading: areExercisesLoading(state),
  errorLoading: hasErrorLoadingExercises(state)
});

const mapDispatchToProps: MapDispatchToProps<
  ExerciceListPageContainerDispatchProps,
  ExerciceListPageContainerOwnProps
> = dispatch => ({
  load: () => dispatch(fetchAllExercisesRequest()),
  onAddExercise: () => dispatch(addExerciseRequest()),
  onDeleteExercise: (id: string) => dispatch(deleteExerciseRequest(id)),
  onAcknowledgeExercise: (id: string) => dispatch(acknowledgeExerciseRequest(id)),
  onCancelExercise: (id: string) => dispatch(cancelExerciseRequest(id))
});

class ExerciceListPageContainer extends Component<ExerciceListPageContainerProps> {
  componentDidMount() {
    if (this.props.exercises.length === 0) {
      this.props.load();
    }
  }
  render() {
    const { load, ...restProps } = this.props;
    return <ExerciseListPage {...restProps} />;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExerciceListPageContainer);
