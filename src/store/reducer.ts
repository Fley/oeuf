import { Exercise } from './types';
import {
  TYPES as actions,
  Action
  // fetchAllExercisesRequest,
  // fetchAllExercisesSuccess,
  // fetchAllExercisesFailure,
  // fetchExerciseRequest,
  // fetchExerciseSuccess,
  // fetchExerciseFailure,
  // addExerciseRequest,
  // addExerciseSuccess,
  // addExerciseFailure,
  // deleteExerciseRequest,
  // deleteExerciseStepSuccess,
  // deleteExerciseFailure,
  // deleteExerciseSuccess,
  // acknowledgeExerciseRequest,
  // acknowledgeExerciseSuccess,
  // acknowledgeExerciseFailure,
  // cancelExerciseRequest,
  // cancelExerciseSuccess,
  // cancelExerciseFailure,
  // updateExerciseNameRequest,
  // updateExerciseNameSuccess,
  // updateExerciseNameFailure,
  // acknowledgeExerciseStepRequest,
  // acknowledgeExerciseStepSuccess,
  // cancelExerciseStepRequest,
  // acknowledgeExerciseStepFailure,
  // cancelExerciseStepSuccess,
  // cancelExerciseStepFailure,
  // addExerciseStepRequest,
  // addExerciseStepSuccess,
  // addExerciseStepFailure,
  // deleteExerciseStepRequest,
  // deleteExerciseStepFailure,
  // updateExerciseStepRequest,
  // updateExerciseStepFailure,
  // updateExerciseStepSuccess,
  // moveExerciseStepRequest,
  // moveExerciseStepSuccess,
  // moveExerciseStepFailure,
  // startExercise,
  // stopExercise,
  // pauseExercise
} from './actions';
import { combineReducers, Reducer } from 'redux';

export type ExerciseStore = {
  loading: boolean;
  error: any;
  ids: string[];
  byId: {
    [id: string]: Exercise;
  };
};

export const exsercisesInitialState: ExerciseStore = { loading: false, error: null, ids: [], byId: {} };

export const exercises: Reducer<ExerciseStore, Action> = (state = exsercisesInitialState, action) => {
  switch (action.type) {
    case actions.FETCH_EXERCISES.REQUEST:
    case actions.FETCH_EXERCISE.REQUEST:
      return { ...state, loading: true, error: null };
    case actions.FETCH_EXERCISES.SUCCESS:
      return {
        ...state,
        loading: false,
        ids: action.exercises.map((e: Exercise) => e.id),
        byId: action.exercises.reduce((byId: ExerciseStore['byId'], e: Exercise) => ({ ...byId, [e.id]: e }), {})
      };
    case actions.FETCH_EXERCISES.FAILURE:
    case actions.FETCH_EXERCISE.FAILURE:
      return { ...state, loading: false, error: action.error };
    case actions.ADD_EXERCISE.SUCCESS:
    case actions.FETCH_EXERCISE.SUCCESS:
      return {
        ...state,
        loading: false,
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
    case actions.DELETE_EXERCISE_STEP.SUCCESS:
    case actions.UPDATE_EXERCISE_STEP.SUCCESS:
    case actions.MOVE_EXERCISE_STEP.SUCCESS:
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
                  status: 'running',
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
                  status: 'stopped',
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
                progress: { ...state.byId[action.exercise.id].progress, status: 'paused', pausedAt: new Date() }
              }
            }
          }
        : state;
    default:
      return state;
  }
};

const removeExerciseFromStateById = (state: ExerciseStore, exerciseId: string) => {
  const restIds = state.ids.filter(id => id !== exerciseId);
  const restById = restIds.reduce((byId, id) => ({ ...byId, [id]: state.byId[id] }), {});
  return { ...state, ids: restIds, byId: restById };
};

const reducer = combineReducers({
  exercises
});

export type AppStore = ReturnType<typeof reducer>;

export default reducer;
