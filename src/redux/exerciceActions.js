import uuidv4 from 'uuid/v4';
import * as datastore from '../idb/datastore';
import { getExerciseById } from './exercicesReducers';

export const ADD_NEW_EXERCISE = 'EXERCISE_ADD';
export const ADD_NEW_EXERCISE_ERROR = 'EXERCISE_ADD_ERROR';
export const ADD_NEW_EXERCISE_OK = 'EXERCISE_ADD_OK';

export const DELETE_EXERCISE = 'EXERCISE_DELETE';
export const DELETE_EXERCISE_ERROR = 'EXERCISE_DELETE_ERROR';
export const DELETE_EXERCISE_OK = 'EXERCISE_DELETE_OK';

export const ACKNOWLEDGE_EXERCISE = 'EXERCISE_ACKNOWLEDGE';
export const ACKNOWLEDGE_EXERCISE_ERROR = 'EXERCISE_ACKNOWLEDGE_ERROR';
export const ACKNOWLEDGE_EXERCISE_OK = 'EXERCISE_ACKNOWLEDGE_OK';

export const CANCEL_EXERCISE = 'EXERCISE_CANCEL';
export const CANCEL_EXERCISE_ERROR = 'EXERCISE_CANCEL_ERROR';
export const CANCEL_EXERCISE_OK = 'EXERCISE_CANCEL_OK';

export const LOADING_ALL_EXERCISES = 'EXERCISE_LOADING_ALL';
export const LOAD_ALL_EXERCISES_ERROR = 'EXERCISE_LOAD_ALL_ERROR';
export const LOAD_ALL_EXERCISES_OK = 'EXERCISE_LOAD_ALL_OK';

export const addExercise = () => async dispatch => {
  const exercise = { id: uuidv4(), name: 'New exercise' };
  dispatch({
    type: ADD_NEW_EXERCISE,
    exercise
  });
  try {
    const newExercise = await datastore.putExercise(exercise);
    dispatch({
      type: ADD_NEW_EXERCISE_OK,
      exercise: newExercise
    });
  } catch (e) {
    console.error('Error adding exercise.', e);
    dispatch({
      type: ADD_NEW_EXERCISE_ERROR,
      exercise,
      error: e
    });
  }
};

export const deleteExercise = id => async (dispatch, getState) => {
  const exercise = getExerciseById(getState().exercises)(id);
  dispatch({
    type: DELETE_EXERCISE,
    exercise
  });
  try {
    const deletedExercise = await datastore.deleteExercise(id);
    dispatch({
      type: DELETE_EXERCISE_OK,
      exercise: deletedExercise
    });
  } catch (e) {
    console.error('Error deleting exercise.', e);
    dispatch({
      type: DELETE_EXERCISE_ERROR,
      exercise,
      error: e
    });
  }
};

export const acknowledgeExercise = id => async (dispatch, getState) => {
  const exercise = getExerciseById(getState().exercises)(id);
  dispatch({
    type: ACKNOWLEDGE_EXERCISE,
    exercise
  });
  try {
    const acknowledgedExercise = await datastore.putExercise({ ...getExerciseById(getState().exercises)(id), done: true });
    dispatch({
      type: ACKNOWLEDGE_EXERCISE_OK,
      exercise: acknowledgedExercise
    });
  } catch (e) {
    console.error('Error acknowledging exercise.', e);
    dispatch({
      type: ACKNOWLEDGE_EXERCISE_ERROR,
      exercise,
      error: e
    });
  }
};

export const cancelExercise = id => async (dispatch, getState) => {
  const exercise = getExerciseById(getState().exercises)(id);
  dispatch({
    type: CANCEL_EXERCISE,
    exercise
  });
  try {
    const canceledExercise = await datastore.putExercise({ ...getExerciseById(getState().exercises)(id), done: false });
    dispatch({
      type: CANCEL_EXERCISE_OK,
      exercise: canceledExercise
    });
  } catch (e) {
    console.error('Error canceling exercise.', e);
    dispatch({
      type: CANCEL_EXERCISE_ERROR,
      exercise,
      error: e
    });
  }
};

export const loadAllExercices = () => async (dispatch, getState) => {
  dispatch({
    type: LOADING_ALL_EXERCISES
  });
  try {
    const exercises = await datastore.getAllExercises();
    dispatch({
      type: LOAD_ALL_EXERCISES_OK,
      exercises
    });
  } catch (e) {
    console.error('Error loading all exercises.', e);
    dispatch({
      type: LOAD_ALL_EXERCISES_ERROR,
      error: e
    });
  }
};
