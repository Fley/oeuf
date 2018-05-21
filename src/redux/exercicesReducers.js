import { combineReducers } from 'redux';
import { ADD_NEW_EXERCISE, ADD_NEW_EXERCISE_ERROR } from './exerciceActions';

const ids = (state = [], action) => {
  switch (action.type) {
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
  ids,
  byIds
});

// Selectors
export const getExerciceList = state => state.ids.map(id => state.byIds[id]);
