import uuidv4 from 'uuid/v4';
import { putExercise, getAllExercises } from '../idb/datastore';

export const ADD_NEW_EXERCISE = 'EXERCISE_ADD';
export const ADD_NEW_EXERCISE_ERROR = 'EXERCISE_ADD_ERROR';
export const ADD_NEW_EXERCISE_OK = 'EXERCISE_ADD_OK';

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
    const newExercise = await putExercise(exercise);
    dispatch({
      type: ADD_NEW_EXERCISE_OK,
      exercise: newExercise
    });
  } catch (e) {
    dispatch({
      type: ADD_NEW_EXERCISE_ERROR,
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
    const exercises = await getAllExercises();
    dispatch({
      type: LOAD_ALL_EXERCISES_OK,
      exercises
    });
  } catch (e) {
    dispatch({
      type: LOAD_ALL_EXERCISES_ERROR,
      error: e
    });
  }
};
