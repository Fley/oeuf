import { all, call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import * as datastore from '../idb/datastore';
import {
  TYPES,
  fetchAllExercisesSuccess,
  fetchExerciseFailure,
  addExerciseSuccess,
  addExerciseFailure
} from './actions';

function* fetchExercises(action) {
  try {
    const exercises = yield call(datastore.getAllExercises);
    yield put(fetchAllExercisesSuccess(exercises));
  } catch (e) {
    yield put(fetchExerciseFailure(e));
  }
}
function* watchFetchExercises() {
  yield takeLatest(TYPES.FETCH_EXERCISES.REQUEST, fetchExercises);
}

function* addNewExercise(action) {
  try {
    const exercise = yield call(datastore.putExercise, action.exercise);
    yield put(addExerciseSuccess(exercise));
  } catch (e) {
    yield put(addExerciseFailure(e));
  }
}
function* watchAddNewExercise() {
  yield takeEvery(TYPES.ADD_EXERCISE.REQUEST, addNewExercise);
}

export default function* rootSaga() {
  yield all([watchFetchExercises(), watchAddNewExercise()]);
}
