import { combineReducers } from 'redux';
import {
  ADD_NEW_EXERCISE,
  ADD_NEW_EXERCISE_ERROR,
  LOADING_ALL_EXERCISES,
  LOAD_ALL_EXERCISES_OK,
  LOAD_ALL_EXERCISES_ERROR
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
    case ADD_NEW_EXERCISE:
      return [...state, action.exercise.id];
    case ADD_NEW_EXERCISE_ERROR:
      return state.filter(e => e.id !== action.exercise.id);
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
    case ADD_NEW_EXERCISE:
      return { ...state, [action.exercise.id]: action.exercise };
    case ADD_NEW_EXERCISE_ERROR:
      const { [action.exercise.id]: exercise, ...restState } = state;
      return restState;
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
