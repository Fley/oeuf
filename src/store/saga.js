import { all, call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import * as datastore from '../idb/datastore';
import {
  TYPES,
  fetchAllExercisesSuccess,
  fetchExerciseFailure,
  addExerciseSuccess,
  addExerciseFailure,
  deleteExerciseSuccess,
  deleteExerciseFailure,
  acknowledgeExerciseFailure,
  acknowledgeExerciseSuccess,
  cancelExerciseSuccess,
  cancelExerciseFailure,
  updateExerciseNameSuccess,
  updateExerciseNameFailure
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

function* deleteExercise(action) {
  try {
    yield call(datastore.deleteExercise, action.id);
    yield put(deleteExerciseSuccess(action.id));
  } catch (e) {
    yield put(deleteExerciseFailure(action.id, e));
  }
}
function* watchDeleteExercise() {
  yield takeEvery(TYPES.DELETE_EXERCISE.REQUEST, deleteExercise);
}

function* acknowledgeExercise(action) {
  let exercise = null;
  try {
    exercise = yield call(datastore.getExerciseById, action.id);
    if (exercise) {
      const modifiedExercise = yield call(datastore.putExercise, {
        ...exercise,
        done: true,
        steps: exercise.steps.map(step => ({ ...step, done: true }))
      });
      yield put(acknowledgeExerciseSuccess(modifiedExercise));
    } else {
      yield put(acknowledgeExerciseFailure(exercise, new Error(`Exercise not foud id=${action.id}`)));
    }
  } catch (e) {
    yield put(acknowledgeExerciseFailure(exercise, e));
  }
}
function* watchAcknowledgeExercise() {
  yield takeEvery(TYPES.ACKNOWLEDGE_EXERCISE.REQUEST, acknowledgeExercise);
}

function* cancelExercise(action) {
  let exercise = null;
  try {
    exercise = yield call(datastore.getExerciseById, action.id);
    if (exercise) {
      const modifiedExercise = yield call(datastore.putExercise, {
        ...exercise,
        done: false,
        steps: exercise.steps.map(step => ({ ...step, done: false }))
      });
      yield put(cancelExerciseSuccess(modifiedExercise));
    } else {
      yield put(cancelExerciseFailure(exercise, new Error(`Exercise not foud id=${action.id}`)));
    }
  } catch (e) {
    yield put(cancelExerciseFailure(exercise, e));
  }
}
function* watchCancelExercise() {
  yield takeEvery(TYPES.CANCEL_EXERCISE.REQUEST, cancelExercise);
}

function* updateExerciseName(action) {
  // Debounce
  yield call(delay, 500);
  let exercise = null;
  try {
    exercise = yield call(datastore.getExerciseById, action.id);
    if (exercise) {
      const modifiedExercise = yield call(datastore.putExercise, {
        ...exercise,
        name: action.name
      });
      yield put(updateExerciseNameSuccess(modifiedExercise));
    } else {
      yield put(updateExerciseNameFailure(exercise, new Error(`Exercise not foud id=${action.id}`)));
    }
  } catch (e) {
    yield put(updateExerciseNameFailure(exercise, e));
  }
}
function* watchUpdateExerciseName() {
  yield takeLatest(TYPES.UPDATE_EXERCISE_NAME.REQUEST, updateExerciseName);
}

export default function* rootSaga() {
  yield all([
    watchFetchExercises(),
    watchAddNewExercise(),
    watchDeleteExercise(),
    watchAcknowledgeExercise(),
    watchCancelExercise(),
    watchUpdateExerciseName()
  ]);
}
