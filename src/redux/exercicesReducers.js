import { combineReducers } from 'redux';

const ids = (state = [], action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const byIds = (state = {}, action) => {
  switch (action.type) {
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
