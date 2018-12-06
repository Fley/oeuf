import uuidv4 from 'uuid/v4';
import { Exercise, StepType, Step, UnexpectedError } from './types';

export type Action = {
  type: string;
  [key: string]: any;
};

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
  DELETE_EXERCISE_STEP: {
    REQUEST: 'exercises/DELETE_EXERCISE_STEP/REQUEST',
    SUCCESS: 'exercises/DELETE_EXERCISE_STEP/SUCCESS',
    FAILURE: 'exercises/DELETE_EXERCISE_STEP/FAILURE'
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
  UPDATE_EXERCISE_STEP: {
    REQUEST: 'exercises/UPDATE_EXERCISE_STEP/REQUEST',
    SUCCESS: 'exercises/UPDATE_EXERCISE_STEP/SUCCESS',
    FAILURE: 'exercises/UPDATE_EXERCISE_STEP/FAILURE'
  },
  MOVE_EXERCISE_STEP: {
    REQUEST: 'exercises/MOVE_EXERCISE_STEP/REQUEST',
    SUCCESS: 'exercises/MOVE_EXERCISE_STEP/SUCCESS',
    FAILURE: 'exercises/MOVE_EXERCISE_STEP/FAILURE'
  },
  START_EXERCISE: 'exercises/START',
  STOP_EXERCISE: 'exercises/STOP',
  PAUSE_EXERCISE: 'exercises/PAUSE'
};

// FETCH_EXERCISES
export const fetchAllExercisesRequest = () => ({
  type: TYPES.FETCH_EXERCISES.REQUEST
});
export const fetchAllExercisesSuccess = (exercises: Exercise[]) => ({
  type: TYPES.FETCH_EXERCISES.SUCCESS,
  exercises
});
export const fetchAllExercisesFailure = (error: UnexpectedError) => ({
  type: TYPES.FETCH_EXERCISES.FAILURE,
  error
});

// FETCH_EXERCISE
export const fetchExerciseRequest = (id: string) => ({
  type: TYPES.FETCH_EXERCISE.REQUEST,
  id
});
export const fetchExerciseSuccess = (exercise: Exercise) => ({
  type: TYPES.FETCH_EXERCISE.SUCCESS,
  exercise
});
export const fetchExerciseFailure = (id: string, error: UnexpectedError) => ({
  type: TYPES.FETCH_EXERCISE.FAILURE,
  id,
  error
});

// ADD_EXERCISE
export const addExerciseRequest = () => {
  const exercise: Exercise = {
    id: uuidv4(),
    name: 'New exercise',
    type: null,
    steps: [],
    done: false,
    progress: null
  };
  return {
    type: TYPES.ADD_EXERCISE.REQUEST,
    exercise
  };
};
export const addExerciseSuccess = (exercise: Exercise) => ({
  type: TYPES.ADD_EXERCISE.SUCCESS,
  exercise
});
export const addExerciseFailure = (exercise: Exercise, error: UnexpectedError) => ({
  type: TYPES.ADD_EXERCISE.FAILURE,
  exercise,
  error
});

// DELETE_EXERCISE
export const deleteExerciseRequest = (id: string) => ({
  type: TYPES.DELETE_EXERCISE.REQUEST,
  id
});
export const deleteExerciseSuccess = (id: string) => ({
  type: TYPES.DELETE_EXERCISE.SUCCESS,
  id
});
export const deleteExerciseFailure = (id: string, error: UnexpectedError) => ({
  type: TYPES.DELETE_EXERCISE.FAILURE,
  id,
  error
});

// ACKNOWLEDGE_EXERCISE
export const acknowledgeExerciseRequest = (id: string) => ({
  type: TYPES.ACKNOWLEDGE_EXERCISE.REQUEST,
  id
});
export const acknowledgeExerciseSuccess = (exercise: Exercise) => ({
  type: TYPES.ACKNOWLEDGE_EXERCISE.SUCCESS,
  exercise
});
export const acknowledgeExerciseFailure = (exerciseId: string, error: UnexpectedError) => ({
  type: TYPES.ACKNOWLEDGE_EXERCISE.FAILURE,
  exerciseId,
  error
});

// CANCEL_EXERCISE
export const cancelExerciseRequest = (id: string) => ({
  type: TYPES.CANCEL_EXERCISE.REQUEST,
  id
});
export const cancelExerciseSuccess = (exercise: Exercise) => ({
  type: TYPES.CANCEL_EXERCISE.SUCCESS,
  exercise
});
export const cancelExerciseFailure = (exerciseId: string, error: UnexpectedError) => ({
  type: TYPES.CANCEL_EXERCISE.FAILURE,
  exerciseId,
  error
});

// UPDATE EXERCISE NAME
export const updateExerciseNameRequest = (id: string, name: string) => ({
  type: TYPES.UPDATE_EXERCISE_NAME.REQUEST,
  id,
  name
});
export const updateExerciseNameSuccess = (exercise: Exercise) => ({
  type: TYPES.UPDATE_EXERCISE_NAME.SUCCESS,
  exercise
});
export const updateExerciseNameFailure = (id: string, error: UnexpectedError) => ({
  type: TYPES.UPDATE_EXERCISE_NAME.FAILURE,
  id,
  error
});

// ACKNOWLEDGE_EXERCISE_STEP
export const acknowledgeExerciseStepRequest = (exerciseId: string, stepId: string) => ({
  type: TYPES.ACKNOWLEDGE_EXERCISE_STEP.REQUEST,
  exerciseId,
  stepId
});
export const acknowledgeExerciseStepSuccess = (exercise: Exercise) => ({
  type: TYPES.ACKNOWLEDGE_EXERCISE_STEP.SUCCESS,
  exercise
});
export const acknowledgeExerciseStepFailure = (exerciseId: string, stepId: string, error: UnexpectedError) => ({
  type: TYPES.ACKNOWLEDGE_EXERCISE_STEP.FAILURE,
  exerciseId,
  stepId,
  error
});

// CANCEL_EXERCISE_STEP
export const cancelExerciseStepRequest = (exerciseId: string, stepId: string) => ({
  type: TYPES.CANCEL_EXERCISE_STEP.REQUEST,
  exerciseId,
  stepId
});
export const cancelExerciseStepSuccess = (exercise: Exercise) => ({
  type: TYPES.CANCEL_EXERCISE_STEP.SUCCESS,
  exercise
});
export const cancelExerciseStepFailure = (exerciseId: string, stepId: string, error: UnexpectedError) => ({
  type: TYPES.CANCEL_EXERCISE_STEP.FAILURE,
  exerciseId,
  stepId,
  error
});

// ADD_EXERCISE_STEP
export const addExerciseStepRequest = (exerciseId: string, stepType: StepType, stepContent: Step) => {
  const step = createExerciseStep(stepType, stepContent);
  return {
    type: TYPES.ADD_EXERCISE_STEP.REQUEST,
    exerciseId,
    stepType,
    step
  };
};
export const addExerciseStepSuccess = (exercise: Exercise) => ({
  type: TYPES.ADD_EXERCISE_STEP.SUCCESS,
  exercise
});
export const addExerciseStepFailure = (exerciseId: string, error: UnexpectedError) => ({
  type: TYPES.ADD_EXERCISE_STEP.FAILURE,
  exerciseId,
  error
});

const createExerciseStep = (type: StepType, stepContent?: Step) => {
  switch (type) {
    case 'timed':
      return {
        duration: 0,
        rest: 0,
        ...stepContent,
        id: uuidv4(),
        done: false
      };
    case 'repetition':
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

// DELETE_EXERCISE_STEP
export const deleteExerciseStepRequest = (exerciseId: string, stepId: string) => ({
  type: TYPES.DELETE_EXERCISE_STEP.REQUEST,
  exerciseId,
  stepId
});
export const deleteExerciseStepSuccess = (exercise: Exercise) => ({
  type: TYPES.DELETE_EXERCISE_STEP.SUCCESS,
  exercise
});
export const deleteExerciseStepFailure = (exerciseId: string, stepId: string, error: UnexpectedError) => ({
  type: TYPES.DELETE_EXERCISE_STEP.FAILURE,
  exerciseId,
  stepId,
  error
});

// UPDATE_EXERCISE_STEP
export const updateExerciseStepRequest = (exerciseId: string, stepId: string, contentPatch: Partial<Step>) => ({
  type: TYPES.UPDATE_EXERCISE_STEP.REQUEST,
  exerciseId,
  stepId,
  contentPatch
});
export const updateExerciseStepSuccess = (exercise: Exercise) => ({
  type: TYPES.UPDATE_EXERCISE_STEP.SUCCESS,
  exercise
});
export const updateExerciseStepFailure = (
  exerciseId: string,
  stepId: string,
  contentPatch: Partial<Step>,
  error: UnexpectedError
) => ({
  type: TYPES.DELETE_EXERCISE_STEP.FAILURE,
  exerciseId,
  stepId,
  contentPatch,
  error
});

// MOVE_EXERCISE_STEP
export const moveExerciseStepRequest = (exerciseId: string, oldIndex: number, newIndex: number) => ({
  type: TYPES.MOVE_EXERCISE_STEP.REQUEST,
  exerciseId,
  oldIndex,
  newIndex
});
export const moveExerciseStepSuccess = (exercise: Exercise) => ({
  type: TYPES.MOVE_EXERCISE_STEP.SUCCESS,
  exercise
});
export const moveExerciseStepFailure = (
  exerciseId: string,
  oldIndex: number,
  newIndex: number,
  error: UnexpectedError
) => ({
  type: TYPES.MOVE_EXERCISE_STEP.FAILURE,
  exerciseId,
  oldIndex,
  newIndex,
  error
});

// START_EXERCISE
export const startExercise = (exercise: Exercise) => ({
  type: TYPES.START_EXERCISE,
  exercise
});

// STOP_EXERCISE
export const stopExercise = (exercise: Exercise) => ({
  type: TYPES.STOP_EXERCISE,
  exercise
});

// PAUSE_EXERCISE
export const pauseExercise = (exercise: Exercise) => ({
  type: TYPES.PAUSE_EXERCISE,
  exercise
});
