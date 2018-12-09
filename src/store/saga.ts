import { Exercise } from './types';
import { all, call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { arrayMove } from 'react-sortable-hoc';
import * as datastore from '../idb/datastore';
import {
  TYPES,
  fetchAllExercisesSuccess,
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
  updateExerciseStepFailure,
  moveExerciseStepSuccess,
  moveExerciseStepFailure,
  fetchAllExercisesFailure,
  addExerciseRequest,
  deleteExerciseRequest,
  cancelExerciseRequest,
  updateExerciseNameRequest,
  addExerciseStepRequest,
  deleteExerciseStepRequest,
  acknowledgeExerciseStepRequest,
  cancelExerciseStepRequest,
  moveExerciseStepRequest,
  updateExerciseStepRequest
} from './actions';

function* fetchExercises() {
  try {
    const exercises: Exercise[] = yield call(datastore.getAllExercises);
    yield put(fetchAllExercisesSuccess(exercises));
  } catch (e) {
    yield put(fetchAllExercisesFailure(e));
  }
}
function* watchFetchExercises() {
  yield takeLatest(TYPES.FETCH_EXERCISES.REQUEST, fetchExercises);
}

function* addNewExercise({ exercise }: ReturnType<typeof addExerciseRequest>) {
  try {
    const newExercise: Exercise = yield call(datastore.putExercise, exercise);
    yield put(addExerciseSuccess(newExercise));
  } catch (e) {
    yield put(addExerciseFailure(exercise, e));
  }
}
function* watchAddNewExercise() {
  yield takeEvery(TYPES.ADD_EXERCISE.REQUEST, addNewExercise);
}

function* deleteExercise({ id }: ReturnType<typeof deleteExerciseRequest>) {
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

function* acknowledgeExercise({ id }: ReturnType<typeof acknowledgeExerciseRequest>) {
  try {
    const exercise: Exercise = yield call(datastore.getExerciseById, id);
    const patchedExercise: Exercise = yield call(datastore.putExercise, {
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

function* cancelExercise({ id }: ReturnType<typeof cancelExerciseRequest>) {
  try {
    const exercise: Exercise = yield call(datastore.getExerciseById, id);
    const patchedExercise: Exercise = yield call(datastore.putExercise, {
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

function* updateExerciseName({ id, name }: ReturnType<typeof updateExerciseNameRequest>) {
  // Debounce
  yield call(delay, 500);
  try {
    const patchedExercise: Exercise = yield call(datastore.patchExerciseById, id, { name });
    yield put(updateExerciseNameSuccess(patchedExercise));
  } catch (e) {
    yield put(updateExerciseNameFailure(id, e));
  }
}
function* watchUpdateExerciseName() {
  yield takeLatest(TYPES.UPDATE_EXERCISE_NAME.REQUEST, updateExerciseName);
}

function* addExerciseStep({ exerciseId, stepType, step }: ReturnType<typeof addExerciseStepRequest>) {
  try {
    const exercise: Exercise = yield call(datastore.getExerciseById, exerciseId);
    const patchedExercise: Exercise = yield call(datastore.putExercise, {
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

function* deleteExerciseStep({ exerciseId, stepId }: ReturnType<typeof deleteExerciseStepRequest>) {
  try {
    const exercise: Exercise = yield call(datastore.getExerciseById, exerciseId);
    const patchedExercise: Exercise = yield call(datastore.putExercise, {
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

function* acknowledgeExerciseStep({ exerciseId, stepId }: ReturnType<typeof acknowledgeExerciseStepRequest>) {
  try {
    const exercise: Exercise = yield call(datastore.getExerciseById, exerciseId);
    const steps = [...exercise.steps];
    steps.find(s => s.id === stepId)!.done = true;
    const patchedExercise: Exercise = yield call(datastore.putExercise, {
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

function* cancelExerciseStep({ exerciseId, stepId }: ReturnType<typeof cancelExerciseStepRequest>) {
  try {
    const exercise: Exercise = yield call(datastore.getExerciseById, exerciseId);
    const steps = [...exercise.steps];
    steps.find(s => s.id === stepId)!.done = false;
    const patchedExercise: Exercise = yield call(datastore.putExercise, {
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

function* moveExerciseStep({ exerciseId, oldIndex, newIndex }: ReturnType<typeof moveExerciseStepRequest>) {
  try {
    const exercise: Exercise = yield call(datastore.getExerciseById, exerciseId);
    const steps = arrayMove([...exercise.steps], oldIndex, newIndex);
    const patchedExercise: Exercise = yield call(datastore.putExercise, {
      ...exercise,
      done: false,
      steps
    });
    yield put(moveExerciseStepSuccess(patchedExercise));
  } catch (e) {
    yield put(moveExerciseStepFailure(exerciseId, oldIndex, newIndex, e));
  }
}
function* watchMoveExerciseStep() {
  yield takeEvery(TYPES.MOVE_EXERCISE_STEP.REQUEST, moveExerciseStep);
}

function* updateExerciseStep({ exerciseId, stepId, contentPatch }: ReturnType<typeof updateExerciseStepRequest>) {
  // Debounce
  yield call(delay, 500);
  try {
    const exercise: Exercise = yield call(datastore.getExerciseById, exerciseId);
    const steps = [...exercise.steps];
    const stepIndex = steps.findIndex(s => s.id === stepId);
    steps[stepIndex] = { ...steps[stepIndex], ...contentPatch };
    const patchedExercise: Exercise = yield call(datastore.putExercise, {
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
    watchMoveExerciseStep(),
    watchUpdateExerciseStep()
  ]);
}
