import uuidv4 from 'uuid/v4';
import { putExercise } from '../idb/datastore';

export const ADD_NEW_EXERCISE = 'EXERCISE_ADD';
export const ADD_NEW_EXERCISE_ERROR = 'EXERCISE_ADD_ERROR';
export const ADD_NEW_EXERCISE_OK = 'EXERCISE_ADD_OK';

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
