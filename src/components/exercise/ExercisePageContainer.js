import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getExerciseById, areExercisesLoading, hasErrorLoadingExercises } from '../../store/selectors';
import ExercisePage from './ExercisePage';
import { fetchAllExercisesRequest, updateExerciseNameRequest, addExerciseStepRequest, deleteExerciseStepRequest } from '../../store/actions';

const mapStateToProps = (state, ownProps) => {
  return {
    exercise: getExerciseById(state)(ownProps.exerciseId),
    loading: areExercisesLoading(state),
    errorLoading: hasErrorLoadingExercises(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    load: () => dispatch(fetchAllExercisesRequest()),
    onAddStep: exerciseId => stepType => stepContent =>
      dispatch(addExerciseStepRequest(exerciseId, stepType, stepContent)),
    onDeleteStep: exerciseId => stepId => dispatch(deleteExerciseStepRequest(exerciseId, stepId)),
    onStartExercise: () => {},
    onExerciseNameChange: id => name => dispatch(updateExerciseNameRequest(id, name))
  };
};

class ExercicePageContainer extends Component {
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

export default connect(mapStateToProps, mapDispatchToProps)(ExercicePageContainer);
