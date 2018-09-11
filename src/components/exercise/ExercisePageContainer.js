import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getExerciseById, areExercisesLoading, hasErrorLoadingExercises } from '../../store/selectors';
import ExercisePage from './ExercisePage';
import { fetchAllExercisesRequest } from '../../store/actions';

const mapStateToProps = (state, ownProps) => {
  return {
    exercise: getExerciseById(state)(ownProps.exerciseId),
    loading: areExercisesLoading(state),
    errorLoading: hasErrorLoadingExercises(state)
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    load: () => dispatch(fetchAllExercisesRequest()),
    onAddStep: () => {},
    onStartExercise: () => {}
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
