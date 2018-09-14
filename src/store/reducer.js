import { TYPES as actions } from './actions';
import { combineReducers } from 'redux';
import { PROGRESS } from './propTypes';

export const exsercisesInitialState = { loading: false, error: null, ids: [], byId: {} };
export const exercises = (state = exsercisesInitialState, action) => {
  switch (action.type) {
    case actions.FETCH_EXERCISES.REQUEST:
      return { ...state, loading: true, error: null };
    case actions.FETCH_EXERCISES.SUCCESS:
      return {
        ...state,
        loading: false,
        ids: action.exercises.map(e => e.id),
        byId: action.exercises.reduce((byId, e) => ({ ...byId, [e.id]: e }), {})
      };
    case actions.FETCH_EXERCISES.FAILURE:
      return { ...state, loading: false, error: action.error };
    case actions.ADD_EXERCISE.SUCCESS:
    case actions.FETCH_EXERCISE.SUCCESS:
      return {
        ...state,
        ids: [...state.ids, action.exercise.id],
        byId: { ...state.byId, [action.exercise.id]: action.exercise }
      };
    case actions.DELETE_EXERCISE.SUCCESS:
      return removeExerciseFromStateById(state, action.id);
    case actions.ACKNOWLEDGE_EXERCISE.SUCCESS:
    case actions.CANCEL_EXERCISE.SUCCESS:
    case actions.ACKNOWLEDGE_EXERCISE_STEP.SUCCESS:
    case actions.CANCEL_EXERCISE_STEP.SUCCESS:
    case actions.UPDATE_EXERCISE_NAME.SUCCESS:
    case actions.ADD_EXERCISE_STEP.SUCCESS:
      return { ...state, byId: { ...state.byId, [action.exercise.id]: { ...action.exercise } } };
    case actions.START_EXERCISE:
      return state.byId[action.exercise.id]
        ? {
            ...state,
            byId: {
              ...state.byId,
              [action.exercise.id]: {
                ...state.byId[action.exercise.id],
                progress: {
                  ...state.byId[action.exercise.id].progress,
                  status: PROGRESS.STARTED,
                  startedAt: new Date()
                }
              }
            }
          }
        : state;
    case actions.STOP_EXERCISE:
      return state.byId[action.exercise.id]
        ? {
            ...state,
            byId: {
              ...state.byId,
              [action.exercise.id]: {
                ...state.byId[action.exercise.id],
                progress: {
                  ...state.byId[action.exercise.id].progress,
                  status: PROGRESS.STOPPED,
                  stoppedAt: new Date()
                }
              }
            }
          }
        : state;
    case actions.PAUSE_EXERCISE:
      return state.byId[action.exercise.id]
        ? {
            ...state,
            byId: {
              ...state.byId,
              [action.exercise.id]: {
                ...state.byId[action.exercise.id],
                progress: { ...state.byId[action.exercise.id].progress, status: PROGRESS.PAUSED, pausedAt: new Date() }
              }
            }
          }
        : state;
    default:
      return state;
  }
};

const removeExerciseFromStateById = (state, exerciseId) => {
  const restIds = state.ids.filter(id => id !== exerciseId);
  const restById = restIds.reduce((byId, id) => ({ ...byId, [id]: state.byId[id] }), {});
  return { ...state, ids: restIds, byId: restById };
};

export default combineReducers({
  exercises
});
