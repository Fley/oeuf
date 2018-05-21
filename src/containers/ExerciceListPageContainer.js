import { connect } from 'react-redux';
import ExerciseListPage from '../components/exercise-list/ExerciseListPage';
import { getExerciceList } from '../redux/exercicesReducers';
import { addExercise } from '../redux/exerciceActions';

const mapStateToProps = (state, ownProps) => {
  return {
    exercises: getExerciceList(state.exercises)
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onAddExercise: () => dispatch(addExercise())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseListPage);
