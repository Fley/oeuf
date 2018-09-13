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
  updateExerciseNameFailure,
  addExerciseStepSuccess,
  addExerciseStepFailure
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

function* addNewExercise({ exercise }) {
  try {
    const newExercise = yield call(datastore.putExercise, exercise);
    yield put(addExerciseSuccess(newExercise));
  } catch (e) {
    yield put(addExerciseFailure(e));
  }
}
function* watchAddNewExercise() {
  yield takeEvery(TYPES.ADD_EXERCISE.REQUEST, addNewExercise);
}

function* deleteExercise({ exercise }) {
  try {
    yield call(datastore.deleteExercise, exercise.id);
    yield put(deleteExerciseSuccess(exercise));
  } catch (e) {
    yield put(deleteExerciseFailure(exercise, e));
  }
}
function* watchDeleteExercise() {
  yield takeEvery(TYPES.DELETE_EXERCISE.REQUEST, deleteExercise);
}

function* acknowledgeExercise({ exercise }) {
  try {
    const patchedExercise = yield call(datastore.patchExerciseById, exercise.id, {
      done: true,
      steps: exercise.steps.map(step => ({ ...step, done: true }))
    });
    yield put(acknowledgeExerciseSuccess(patchedExercise));
  } catch (e) {
    yield put(acknowledgeExerciseFailure(exercise, e));
  }
}
function* watchAcknowledgeExercise() {
  yield takeEvery(TYPES.ACKNOWLEDGE_EXERCISE.REQUEST, acknowledgeExercise);
}

function* cancelExercise({ exercise }) {
  try {
    const patchedExercise = yield call(datastore.patchExerciseById, exercise.id, {
      done: false,
      steps: exercise.steps.map(step => ({ ...step, done: false }))
    });
    yield put(cancelExerciseSuccess(patchedExercise));
  } catch (e) {
    yield put(cancelExerciseFailure(exercise, e));
  }
}
function* watchCancelExercise() {
  yield takeEvery(TYPES.CANCEL_EXERCISE.REQUEST, cancelExercise);
}

function* updateExerciseName({ exercise, name }) {
  // Debounce
  yield call(delay, 500);
  try {
    const patchedExercise = yield call(datastore.patchExerciseById, exercise.id, { name });
    yield put(updateExerciseNameSuccess(patchedExercise));
  } catch (e) {
    yield put(updateExerciseNameFailure(exercise, e));
  }
}
function* watchUpdateExerciseName() {
  yield takeLatest(TYPES.UPDATE_EXERCISE_NAME.REQUEST, updateExerciseName);
}

function* addNewExerciseStep({ exercise, step }) {
  try {
    const newExercise = yield call(datastore.patchedExercise, {
      type: exercise.type,
      steps: [...exercise.steps, step]
    });
    yield put(addExerciseStepSuccess(newExercise));
  } catch (e) {
    yield put(addExerciseStepFailure(exercise, e));
  }
}
function* watchAddNewExerciseStep() {
  yield takeEvery(TYPES.ADD_EXERCISE_STEP.REQUEST, addNewExerciseStep);
}

export default function* rootSaga() {
  yield all([
    watchFetchExercises(),
    watchAddNewExercise(),
    watchDeleteExercise(),
    watchAcknowledgeExercise(),
    watchCancelExercise(),
    watchUpdateExerciseName(),
    watchAddNewExerciseStep()
  ]);
}
