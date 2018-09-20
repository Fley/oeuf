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
  addExerciseStepFailure,
  deleteExerciseStepSuccess,
  deleteExerciseStepFailure,
  acknowledgeExerciseStepSuccess,
  acknowledgeExerciseStepFailure,
  acknowledgeExerciseRequest,
  cancelExerciseStepSuccess,
  cancelExerciseStepFailure,
  updateExerciseStepSuccess,
  updateExerciseStepFailure
} from './actions';

function* fetchExercises() {
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

function* deleteExercise({ id }) {
  try {
    yield call(datastore.deleteExercise, id);
    yield put(deleteExerciseSuccess(id));
  } catch (e) {
    yield put(deleteExerciseFailure(id, e));
  }
}
function* watchDeleteExercise() {
  yield takeEvery(TYPES.DELETE_EXERCISE.REQUEST, deleteExercise);
}

function* acknowledgeExercise({ id }) {
  try {
    const exercise = yield call(datastore.getExerciseById, id);
    const patchedExercise = yield call(datastore.putExercise, {
      ...exercise,
      done: true,
      steps: exercise.steps.map(step => ({ ...step, done: true }))
    });
    yield put(acknowledgeExerciseSuccess(patchedExercise));
  } catch (e) {
    yield put(acknowledgeExerciseFailure(id, e));
  }
}
function* watchAcknowledgeExercise() {
  yield takeEvery(TYPES.ACKNOWLEDGE_EXERCISE.REQUEST, acknowledgeExercise);
}

function* cancelExercise({ id }) {
  try {
    const exercise = yield call(datastore.getExerciseById, id);
    const patchedExercise = yield call(datastore.putExercise, {
      ...exercise,
      done: false,
      steps: exercise.steps.map(step => ({ ...step, done: false }))
    });
    yield put(cancelExerciseSuccess(patchedExercise));
  } catch (e) {
    yield put(cancelExerciseFailure(id, e));
  }
}
function* watchCancelExercise() {
  yield takeEvery(TYPES.CANCEL_EXERCISE.REQUEST, cancelExercise);
}

function* updateExerciseName({ id, name }) {
  // Debounce
  yield call(delay, 500);
  try {
    const patchedExercise = yield call(datastore.patchExerciseById, id, { name });
    yield put(updateExerciseNameSuccess(patchedExercise));
  } catch (e) {
    yield put(updateExerciseNameFailure(id, e));
  }
}
function* watchUpdateExerciseName() {
  yield takeLatest(TYPES.UPDATE_EXERCISE_NAME.REQUEST, updateExerciseName);
}

function* addExerciseStep({ exerciseId, stepType, step }) {
  try {
    const exercise = yield call(datastore.getExerciseById, exerciseId);
    const patchedExercise = yield call(datastore.putExercise, {
      ...exercise,
      type: stepType,
      steps: [...exercise.steps, step]
    });
    yield put(addExerciseStepSuccess(patchedExercise));
  } catch (e) {
    yield put(addExerciseStepFailure(exerciseId, e));
  }
}
function* watchAddExerciseStep() {
  yield takeLatest(TYPES.ADD_EXERCISE_STEP.REQUEST, addExerciseStep);
}

function* deleteExerciseStep({ exerciseId, stepId }) {
  try {
    const exercise = yield call(datastore.getExerciseById, exerciseId);
    const patchedExercise = yield call(datastore.putExercise, {
      ...exercise,
      steps: [...exercise.steps.filter(s => s.id !== stepId)]
    });
    yield put(deleteExerciseStepSuccess(patchedExercise));
  } catch (e) {
    yield put(deleteExerciseStepFailure(exerciseId, stepId, e));
  }
}
function* watchDeleteExerciseStep() {
  yield takeEvery(TYPES.DELETE_EXERCISE_STEP.REQUEST, deleteExerciseStep);
}

function* acknowledgeExerciseStep({ exerciseId, stepId }) {
  try {
    const exercise = yield call(datastore.getExerciseById, exerciseId);
    const steps = [...exercise.steps];
    steps.find(s => s.id === stepId).done = true;
    const patchedExercise = yield call(datastore.putExercise, {
      ...exercise,
      steps
    });
    yield put(acknowledgeExerciseStepSuccess(patchedExercise));
    if (patchedExercise.steps.every(s => s.done)) {
      yield put(acknowledgeExerciseRequest(patchedExercise.id));
    }
  } catch (e) {
    yield put(acknowledgeExerciseStepFailure(exerciseId, stepId, e));
  }
}
function* watchAcknowledgeExerciseStep() {
  yield takeEvery(TYPES.ACKNOWLEDGE_EXERCISE_STEP.REQUEST, acknowledgeExerciseStep);
}

function* cancelExerciseStep({ exerciseId, stepId }) {
  try {
    const exercise = yield call(datastore.getExerciseById, exerciseId);
    const steps = [...exercise.steps];
    steps.find(s => s.id === stepId).done = false;
    const patchedExercise = yield call(datastore.putExercise, {
      ...exercise,
      done: false,
      steps
    });
    yield put(cancelExerciseStepSuccess(patchedExercise));
  } catch (e) {
    yield put(cancelExerciseStepFailure(exerciseId, stepId, e));
  }
}
function* watchCancelExerciseStep() {
  yield takeEvery(TYPES.CANCEL_EXERCISE_STEP.REQUEST, cancelExerciseStep);
}

function* updateExerciseStep({ exerciseId, stepId, contentPatch }) {
  // Debounce
  yield call(delay, 500);
  try {
    const exercise = yield call(datastore.getExerciseById, exerciseId);
    const steps = [...exercise.steps];
    const stepIndex = steps.findIndex(s => s.id === stepId);
    steps[stepIndex] = { ...steps[stepIndex], ...contentPatch };
    const patchedExercise = yield call(datastore.putExercise, {
      ...exercise,
      done: false,
      steps
    });
    yield put(updateExerciseStepSuccess(patchedExercise));
  } catch (e) {
    yield put(updateExerciseStepFailure(exerciseId, stepId, contentPatch, e));
  }
}
function* watchUpdateExerciseStep() {
  yield takeLatest(TYPES.UPDATE_EXERCISE_STEP.REQUEST, updateExerciseStep);
}

export default function* rootSaga() {
  yield all([
    watchFetchExercises(),
    watchAddNewExercise(),
    watchDeleteExercise(),
    watchAcknowledgeExercise(),
    watchCancelExercise(),
    watchUpdateExerciseName(),
    watchAddExerciseStep(),
    watchDeleteExerciseStep(),
    watchAcknowledgeExerciseStep(),
    watchCancelExerciseStep(),
    watchUpdateExerciseStep()
  ]);
}
