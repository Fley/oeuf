import React, { Component } from 'react';
import { connect } from 'react-redux';
import ExerciseListPage from './ExerciseListPage';
import { getExerciceList, isLoading, hasErrorLoading } from '../../redux/exercicesReducers';
import { addExercise, loadAllExercices } from '../../redux/exerciceActions';

const mapStateToProps = (state, ownProps) => {
  return {
    exercises: getExerciceList(state.exercises),
    loading: isLoading(state.exercises),
    errorLoading: hasErrorLoading(state.exercises)
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    load: () => dispatch(loadAllExercices()),
    onAddExercise: () => dispatch(addExercise())
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
