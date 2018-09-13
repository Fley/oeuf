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
    case actions.ADD_EXERCISE.FAILURE:
      // In case of failure remove added exercise. TODO manage a stack of ALERTS for ERRORS
      return removeExerciseFromStateById(state, action.exercise.id);
    case actions.DELETE_EXERCISE.SUCCESS:
      return removeExerciseFromStateById(state, action.exercise.id);
    case actions.DELETE_EXERCISE.REQUEST:
      return state.byId[action.exercise.id]
        ? {
            ...state,
            byId: { ...state.byId, [action.exercise.id]: { ...state.byId[action.exercise.id], deleting: true } }
          }
        : state;
    case actions.DELETE_EXERCISE.FAILURE:
      return state.byId[action.exercise.id]
        ? {
            ...state,
            byId: { ...state.byId, [action.exercise.id]: { ...state.byId[action.exercise.id], deleting: false } }
          }
        : state;
    case actions.ACKNOWLEDGE_EXERCISE.REQUEST:
      return setExerciseDone(state, action.exercise.id, true);
    case actions.CANCEL_EXERCISE.REQUEST:
      return setExerciseDone(state, action.exercise.id, false);
    case actions.UPDATE_EXERCISE_NAME.REQUEST:
      return {
        ...state,
        byId: { ...state.byId, [action.exercise.id]: { ...state.byId[action.exercise.id], name: action.name } }
      };
    case actions.ACKNOWLEDGE_EXERCISE.FAILURE:
    case actions.ACKNOWLEDGE_EXERCISE.SUCCESS:
    case actions.CANCEL_EXERCISE.FAILURE:
    case actions.CANCEL_EXERCISE.SUCCESS:
    case actions.ACKNOWLEDGE_EXERCISE_STEP.FAILURE:
    case actions.ACKNOWLEDGE_EXERCISE_STEP.SUCCESS:
    case actions.CANCEL_EXERCISE_STEP.FAILURE:
    case actions.CANCEL_EXERCISE_STEP.SUCCESS:
    case actions.UPDATE_EXERCISE_NAME.FAILURE:
    case actions.UPDATE_EXERCISE_NAME.SUCCESS:
    case actions.ADD_EXERCISE_STEP.SUCCESS:
    case actions.ADD_EXERCISE_STEP.FAILURE:
      return { ...state, byId: { ...state.byId, [action.exercise.id]: { ...action.exercise } } };
    case actions.ACKNOWLEDGE_EXERCISE_STEP.REQUEST:
      return setExerciseStepDone(state, action.exercise.id, action.stepIndex, true);
    case actions.CANCEL_EXERCISE_STEP.REQUEST:
      return setExerciseStepDone(state, action.exercise.id, action.stepIndex, false);
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

const setExerciseStepDone = (state, exerciseId, stepIndex, stepDone) =>
  state.byId[exerciseId]
    ? {
        ...state,
        byId: {
          ...state.byId,
          [exerciseId]: {
            ...state.byId[exerciseId],
            steps: state.byId[exerciseId].steps.map(
              (step, index) => (index === stepIndex ? { ...step, done: stepDone } : step)
            )
          }
        }
      }
    : state;

const setExerciseDone = (state, exerciseId, done) =>
  state.byId[exerciseId]
    ? {
        ...state,
        byId: {
          ...state.byId,
          [exerciseId]: {
            ...state.byId[exerciseId],
            done,
            steps: state.byId[exerciseId].steps.map(step => ({ ...step, done }))
          }
        }
      }
    : state;

export default combineReducers({
  exercises
});
