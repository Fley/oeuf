import { combineReducers } from 'redux';
import {
  ADD_NEW_EXERCISE,
  ADD_NEW_EXERCISE_ERROR,
  LOADING_ALL_EXERCISES,
  LOAD_ALL_EXERCISES_OK,
  LOAD_ALL_EXERCISES_ERROR,
  DELETE_EXERCISE,
  DELETE_EXERCISE_ERROR,
  ACKNOWLEDGE_EXERCISE,
  ACKNOWLEDGE_EXERCISE_ERROR,
  CANCEL_EXERCISE,
  CANCEL_EXERCISE_ERROR,
  CANCEL_EXERCISE_OK
} from './exerciceActions';

const loading = (state = true, action) => {
  switch (action.type) {
    case LOADING_ALL_EXERCISES:
      return true;
    case LOAD_ALL_EXERCISES_OK:
    case LOAD_ALL_EXERCISES_ERROR:
      return false;
    default:
      return state;
  }
};

const errorLoading = (state = null, action) => {
  switch (action.type) {
    case LOADING_ALL_EXERCISES:
    case LOAD_ALL_EXERCISES_OK:
      return null;
    case LOAD_ALL_EXERCISES_ERROR:
      return action.error || {};
    default:
      return state;
  }
};

const ids = (state = [], action) => {
  switch (action.type) {
    case LOAD_ALL_EXERCISES_ERROR:
    case LOADING_ALL_EXERCISES:
      return [];
    case LOAD_ALL_EXERCISES_OK:
      return [...action.exercises.map(e => e.id)];
    case DELETE_EXERCISE_ERROR:
    case ADD_NEW_EXERCISE:
      return [...state, action.exercise.id];
    case ADD_NEW_EXERCISE_ERROR:
    case DELETE_EXERCISE:
      return state.filter(id => id !== action.exercise.id);
    default:
      return state;
  }
};

const byIds = (state = {}, action) => {
  switch (action.type) {
    case LOAD_ALL_EXERCISES_ERROR:
    case LOADING_ALL_EXERCISES:
      return {};
    case LOAD_ALL_EXERCISES_OK:
      return action.exercises.reduce(
        (exercisesByIds, exercise) => ({ ...exercisesByIds, [exercise.id]: exercise }),
        {}
      );
    case DELETE_EXERCISE_ERROR:
    case ADD_NEW_EXERCISE:
      return { ...state, [action.exercise.id]: action.exercise };
    case ADD_NEW_EXERCISE_ERROR:
    case DELETE_EXERCISE:
      const { [action.exercise.id]: exercise, ...restState } = state;
      return restState;
    case ACKNOWLEDGE_EXERCISE:
      return { ...state, [action.exercise.id]: { ...state[action.exercise.id], done: true } };
    case CANCEL_EXERCISE:
      return { ...state, [action.exercise.id]: { ...state[action.exercise.id], done: false } };
    case ACKNOWLEDGE_EXERCISE_ERROR:
    case CANCEL_EXERCISE_ERROR:
      return { ...state, [action.exercise.id]: { ...action.exercise } };
    default:
      return state;
  }
};

export default combineReducers({
  loading,
  errorLoading,
  ids,
  byIds
});

// Selectors
export const isLoading = state => state.loading;
export const hasErrorLoading = state => !!state.errorLoading;
export const getExerciceList = state => state.ids.map(id => state.byIds[id]);
export const getExerciseById = state => id => state.byIds[id];
