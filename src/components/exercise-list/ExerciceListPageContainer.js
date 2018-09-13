import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getExerciseList, areExercisesLoading, hasErrorLoadingExercises } from '../../store/selectors';
import ExerciseListPage from './ExerciseListPage';
import {
  fetchAllExercisesRequest,
  deleteExerciseRequest,
  acknowledgeExerciseRequest,
  cancelExerciseRequest,
  addExerciseRequest
} from '../../store/actions';

const mapStateToProps = (state, ownProps) => {
  return {
    exercises: getExerciseList(state),
    loading: areExercisesLoading(state),
    errorLoading: hasErrorLoadingExercises(state)
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    load: () => dispatch(fetchAllExercisesRequest()),
    onAddExercise: () => dispatch(addExerciseRequest()),
    onDeleteExercise: exercise => dispatch(deleteExerciseRequest(exercise)),
    onAcknowledgeExercise: exercise => dispatch(acknowledgeExerciseRequest(exercise)),
    onCancelExercise: exercise => dispatch(cancelExerciseRequest(exercise))
  };
};

class ExerciceListPageContainer extends Component {
  componentDidMount() {
    this.props.load();
  }
  render() {
    const { load, ...restProps } = this.props;
    return <ExerciseListPage {...restProps} />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExerciceListPageContainer);
