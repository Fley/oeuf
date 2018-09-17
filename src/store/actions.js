import uuidv4 from 'uuid/v4';
import { TYPE_TIMED, TYPE_REPETITION } from './propTypes';

export const TYPES = {
  FETCH_EXERCISES: {
    REQUEST: 'exercises/FETCH_EXERCISES/REQUEST',
    SUCCESS: 'exercises/FETCH_EXERCISES/SUCCESS',
    FAILURE: 'exercises/FETCH_EXERCISES/FAILURE'
  },
  FETCH_EXERCISE: {
    REQUEST: 'exercises/FETCH_EXERCISE/REQUEST',
    SUCCESS: 'exercises/FETCH_EXERCISE/SUCCESS',
    FAILURE: 'exercises/FETCH_EXERCISE/FAILURE'
  },
  ADD_EXERCISE: {
    REQUEST: 'exercises/ADD_EXERCISE/REQUEST',
    SUCCESS: 'exercises/ADD_EXERCISE/SUCCESS',
    FAILURE: 'exercises/ADD_EXERCISE/FAILURE'
  },
  DELETE_EXERCISE: {
    REQUEST: 'exercises/DELETE_EXERCISE/REQUEST',
    SUCCESS: 'exercises/DELETE_EXERCISE/SUCCESS',
    FAILURE: 'exercises/DELETE_EXERCISE/FAILURE'
  },
  ACKNOWLEDGE_EXERCISE: {
    REQUEST: 'exercises/ACKNOWLEDGE_EXERCISE/REQUEST',
    SUCCESS: 'exercises/ACKNOWLEDGE_EXERCISE/SUCCESS',
    FAILURE: 'exercises/ACKNOWLEDGE_EXERCISE/FAILURE'
  },
  CANCEL_EXERCISE: {
    REQUEST: 'exercises/CANCEL_EXERCISE/REQUEST',
    SUCCESS: 'exercises/CANCEL_EXERCISE/SUCCESS',
    FAILURE: 'exercises/CANCEL_EXERCISE/FAILURE'
  },
  UPDATE_EXERCISE_NAME: {
    REQUEST: 'exercises/UPDATE_EXERCISE_NAME/REQUEST',
    SUCCESS: 'exercises/UPDATE_EXERCISE_NAME/SUCCESS',
    FAILURE: 'exercises/UPDATE_EXERCISE_NAME/FAILURE'
  },
  ADD_EXERCISE_STEP: {
    REQUEST: 'exercises/ADD_EXERCISE_STEP/REQUEST',
    SUCCESS: 'exercises/ADD_EXERCISE_STEP/SUCCESS',
    FAILURE: 'exercises/ADD_EXERCISE_STEP/FAILURE'
  },
  ACKNOWLEDGE_EXERCISE_STEP: {
    REQUEST: 'exercises/ACKNOWLEDGE_EXERCISE_STEP/REQUEST',
    SUCCESS: 'exercises/ACKNOWLEDGE_EXERCISE_STEP/SUCCESS',
    FAILURE: 'exercises/ACKNOWLEDGE_EXERCISE_STEP/FAILURE'
  },
  CANCEL_EXERCISE_STEP: {
    REQUEST: 'exercises/CANCEL_EXERCISE_STEP/REQUEST',
    SUCCESS: 'exercises/CANCEL_EXERCISE_STEP/SUCCESS',
    FAILURE: 'exercises/CANCEL_EXERCISE_STEP/FAILURE'
  },
  START_EXERCISE: 'exercises/START',
  STOP_EXERCISE: 'exercises/STOP',
  PAUSE_EXERCISE: 'exercises/PAUSE'
};

// FETCH_EXERCISES
export const fetchAllExercisesRequest = () => ({
  type: TYPES.FETCH_EXERCISES.REQUEST
});
export const fetchAllExercisesSuccess = exercises => ({
  type: TYPES.FETCH_EXERCISES.SUCCESS,
  exercises
});
export const fetchAllExercisesFailure = error => ({
  type: TYPES.FETCH_EXERCISES.FAILURE,
  error
});

// FETCH_EXERCISE
export const fetchExerciseRequest = id => ({
  type: TYPES.FETCH_EXERCISE.REQUEST,
  id
});
export const fetchExerciseSuccess = exercise => ({
  type: TYPES.FETCH_EXERCISE.SUCCESS,
  exercise
});
export const fetchExerciseFailure = (id, error) => ({
  type: TYPES.FETCH_EXERCISE.FAILURE,
  id,
  error
});

// ADD_EXERCISE
export const addExerciseRequest = () => {
  const exercise = {
    id: uuidv4(),
    name: 'New exercise',
    type: null,
    steps: [],
    done: false,
    progress: null,
    deleteting: false
  };
  return {
    type: TYPES.ADD_EXERCISE.REQUEST,
    exercise
  };
};
export const addExerciseSuccess = exercise => ({
  type: TYPES.ADD_EXERCISE.SUCCESS,
  exercise
});
export const addExerciseFailure = (exercise, error) => ({
  type: TYPES.ADD_EXERCISE.FAILURE,
  exercise,
  error
});

// DELETE_EXERCISE
export const deleteExerciseRequest = id => ({
  type: TYPES.DELETE_EXERCISE.REQUEST,
  id
});
export const deleteExerciseSuccess = id => ({
  type: TYPES.DELETE_EXERCISE.SUCCESS,
  id
});
export const deleteExerciseFailure = (id, error) => ({
  type: TYPES.DELETE_EXERCISE.FAILURE,
  id,
  error
});

// ACKNOWLEDGE_EXERCISE
export const acknowledgeExerciseRequest = id => ({
  type: TYPES.ACKNOWLEDGE_EXERCISE.REQUEST,
  id
});
export const acknowledgeExerciseSuccess = exercise => ({
  type: TYPES.ACKNOWLEDGE_EXERCISE.SUCCESS,
  exercise
});
export const acknowledgeExerciseFailure = (exercise, error) => ({
  type: TYPES.ACKNOWLEDGE_EXERCISE.FAILURE,
  exercise,
  error
});

// CANCEL_EXERCISE
export const cancelExerciseRequest = id => ({
  type: TYPES.CANCEL_EXERCISE.REQUEST,
  id
});
export const cancelExerciseSuccess = exercise => ({
  type: TYPES.CANCEL_EXERCISE.SUCCESS,
  exercise
});
export const cancelExerciseFailure = (exercise, error) => ({
  type: TYPES.CANCEL_EXERCISE.FAILURE,
  exercise,
  error
});

// UPDATE EXERCISE NAME
export const updateExerciseNameRequest = (id, name) => ({
  type: TYPES.UPDATE_EXERCISE_NAME.REQUEST,
  id,
  name
});
export const updateExerciseNameSuccess = exercise => ({
  type: TYPES.UPDATE_EXERCISE_NAME.SUCCESS,
  exercise
});
export const updateExerciseNameFailure = (id, error) => ({
  type: TYPES.UPDATE_EXERCISE_NAME.FAILURE,
  id,
  error
});

// ACKNOWLEDGE_EXERCISE_STEP
export const acknowledgeExerciseStepRequest = (exerciseId, stepIndex) => ({
  type: TYPES.ACKNOWLEDGE_EXERCISE_STEP.REQUEST,
  exerciseId,
  stepIndex
});
export const acknowledgeExerciseStepSuccess = exercise => ({
  type: TYPES.ACKNOWLEDGE_EXERCISE_STEP.SUCCESS,
  exercise
});
export const acknowledgeExerciseStepFailure = (exerciseId, stepIndex, error) => ({
  type: TYPES.ACKNOWLEDGE_EXERCISE_STEP.FAILURE,
  exerciseId,
  stepIndex,
  error
});

// ADD_EXERCISE_STEP
export const addExerciseStepRequest = (exerciseId, stepType, stepContent) => {
  const step = createExerciseStep(stepType, stepContent);
  return {
    type: TYPES.ADD_EXERCISE_STEP.REQUEST,
    exerciseId,
    stepType,
    step
  };
};
export const addExerciseStepSuccess = exercise => ({
  type: TYPES.ADD_EXERCISE_STEP.SUCCESS,
  exercise
});
export const addExerciseStepFailure = (exerciseId, error) => ({
  type: TYPES.ADD_EXERCISE_STEP.FAILURE,
  exerciseId,
  error
});

const createExerciseStep = (type, stepContent = {}) => {
  switch (type) {
    case TYPE_TIMED:
      return {
        duration: 0,
        rest: 0,
        ...stepContent,
        id: uuidv4(),
        done: false
      };
    case TYPE_REPETITION:
      return {
        kg: 0,
        repetition: 1,
        rest: 0,
        ...stepContent,
        id: uuidv4(),
        done: false
      };
    default:
      throw new Error(`Unknown step type "${type}"`);
  }
};

// CANCEL_EXERCISE_STEP
export const cancelExerciseStepRequest = (exercise, stepIndex) => ({
  type: TYPES.CANCEL_EXERCISE_STEP.REQUEST,
  exercise,
  stepIndex
});
export const cancelExerciseStepSuccess = exercise => ({
  type: TYPES.CANCEL_EXERCISE_STEP.SUCCESS,
  exercise
});
export const cancelExerciseStepFailure = (exercise, error) => ({
  type: TYPES.CANCEL_EXERCISE_STEP.FAILURE,
  exercise,
  error
});

// START_EXERCISE
export const startExercise = exercise => ({
  type: TYPES.START_EXERCISE,
  exercise
});

// STOP_EXERCISE
export const stopExercise = exercise => ({
  type: TYPES.STOP_EXERCISE,
  exercise
});

// START_EXERCISE
export const pauseExercise = exercise => ({
  type: TYPES.PAUSE_EXERCISE,
  exercise
});
