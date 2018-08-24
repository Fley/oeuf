import { TYPE_REPETITION, TYPE_TIMED } from '../propTypes';
import * as actions from '../actions';
import { exercises, exsercisesInitialState } from '../reducer';

const DATE_TO_USE = new Date('2018');
global.Date = jest.fn(() => DATE_TO_USE);

describe('exercise/reducer', () => {
  const existingState = {
    exercises: {
      loading: false,
      error: null,
      ids: [1, 2, 3],
      byId: {
        1: {
          id: 1,
          done: true,
          name: 'Chess press',
          type: TYPE_REPETITION,
          steps: [
            { kg: 30, repetition: 15, rest: 60, done: true },
            { kg: 30, repetition: 10, rest: 60, done: true },
            { kg: 30, repetition: 10, rest: 60, done: true },
            { kg: 30, repetition: 10, rest: 60, done: true }
          ]
        },
        2: {
          id: 2,
          done: false,
          name: 'Leg press',
          type: TYPE_REPETITION,
          steps: [
            { kg: 70, repetition: 15, rest: 60, done: false },
            { kg: 70, repetition: 10, rest: 60, done: false },
            { kg: 70, repetition: 10, rest: 60, done: false },
            { kg: 70, repetition: 10, rest: 60, done: false }
          ]
        },
        3: {
          id: 3,
          done: false,
          name: 'Abs',
          type: TYPE_TIMED,
          steps: [
            { duration: 120, rest: 60, done: true },
            { duration: 120, rest: 60, done: false },
            { duration: 120, rest: 60, done: false },
            { duration: 120, rest: 60, done: false }
          ]
        }
      }
    }
  };

  describe('exercises', () => {
    it('should fetch exercises', () => {
      const stateRequest = exercises(exsercisesInitialState, {
        type: actions.FETCH_EXERCISES.REQUEST
      });
      expect(stateRequest).toMatchSnapshot();

      const stateSuccess = exercises(stateRequest, {
        type: actions.FETCH_EXERCISES.SUCCESS,
        exercises: existingState.exercises.ids.map(id => existingState.exercises.byId[id])
      });
      expect(stateSuccess).toMatchSnapshot();

      const stateFailure = exercises(stateRequest, {
        type: actions.FETCH_EXERCISES.FAILURE,
        error: { message: 'A failure message' }
      });
      expect(stateFailure).toMatchSnapshot();
    });

    it('should fetch exercises', () => {
      const fetchedId = 1;
      const stateRequest = exercises(exsercisesInitialState, {
        type: actions.FETCH_EXERCISE.REQUEST,
        id: fetchedId
      });
      expect(stateRequest).toMatchSnapshot();

      const stateSuccess = exercises(stateRequest, {
        type: actions.FETCH_EXERCISE.SUCCESS,
        exercise: existingState.exercises.byId[fetchedId]
      });
      expect(stateSuccess).toMatchSnapshot();

      const stateFailure = exercises(stateRequest, {
        type: actions.FETCH_EXERCISE.FAILURE,
        id: fetchedId,
        error: { message: 'A failure message' }
      });
      expect(stateFailure).toMatchSnapshot();
    });

    it('should add exercise', () => {
      const stateRequest = exercises(exsercisesInitialState, {
        type: actions.ADD_EXERCISE.REQUEST,
        exercise: existingState.exercises.byId[1]
      });
      expect(stateRequest).toMatchSnapshot();

      const stateSuccess = exercises(stateRequest, {
        type: actions.ADD_EXERCISE.SUCCESS
      });
      expect(stateSuccess).toMatchSnapshot();

      const stateFailure = exercises(stateRequest, {
        type: actions.ADD_EXERCISE.FAILURE,
        exercise: existingState.exercises.byId[1],
        error: { message: 'A failure message' }
      });
      expect(stateFailure).toMatchSnapshot();
    });

    it('should delete exercise', () => {
      const exerciseId = 1;
      const stateRequest = exercises(existingState.exercises, {
        type: actions.DELETE_EXERCISE.REQUEST,
        id: exerciseId
      });
      expect(stateRequest).toMatchSnapshot();

      const stateSuccess = exercises(stateRequest, {
        type: actions.DELETE_EXERCISE.SUCCESS,
        id: exerciseId
      });
      expect(stateSuccess).toMatchSnapshot();

      const stateFailure = exercises(stateRequest, {
        type: actions.DELETE_EXERCISE.FAILURE,
        id: exerciseId,
        error: { message: 'A failure message' }
      });
      expect(stateFailure).toMatchSnapshot();
    });

    it('should acknowledge an exercise', () => {
      const exerciseId = 2;
      const stateRequest = exercises(existingState.exercises, {
        type: actions.ACKNOWLEDGE_EXERCISE.REQUEST,
        id: exerciseId
      });
      expect(stateRequest).toMatchSnapshot();

      const stateSuccess = exercises(stateRequest, {
        type: actions.ACKNOWLEDGE_EXERCISE.SUCCESS,
        exercise: {
          ...existingState.exercises.byId[exerciseId],
          done: true,
          steps: existingState.exercises.byId[exerciseId].steps.map(step => ({ ...step, done: true }))
        }
      });
      expect(stateSuccess).toMatchSnapshot();

      const stateFailure = exercises(stateRequest, {
        type: actions.ACKNOWLEDGE_EXERCISE.FAILURE,
        exercise: { ...existingState.exercises.byId[exerciseId] },
        error: { message: 'A failure message' }
      });
      expect(stateFailure).toMatchSnapshot();
    });

    it('should cancel an exercise', () => {
      const exerciseId = 1;
      const stateRequest = exercises(existingState.exercises, {
        type: actions.CANCEL_EXERCISE.REQUEST,
        id: exerciseId
      });
      expect(stateRequest).toMatchSnapshot();

      const stateSuccess = exercises(stateRequest, {
        type: actions.CANCEL_EXERCISE.SUCCESS,
        exercise: {
          ...existingState.exercises.byId[exerciseId],
          done: false,
          steps: existingState.exercises.byId[exerciseId].steps.map(step => ({ ...step, done: false }))
        }
      });
      expect(stateSuccess).toMatchSnapshot();

      const stateFailure = exercises(stateRequest, {
        type: actions.CANCEL_EXERCISE.FAILURE,
        exercise: { ...existingState.exercises.byId[exerciseId] },
        error: { message: 'A failure message' }
      });
      expect(stateFailure).toMatchSnapshot();
    });

    it('should acknowledge an exercise step', () => {
      const exerciseId = 3;
      const stepIndex = 1;
      const stateRequest = exercises(existingState.exercises, {
        type: actions.ACKNOWLEDGE_EXERCISE_STEP.REQUEST,
        exerciseId,
        stepIndex
      });
      expect(stateRequest).toMatchSnapshot();

      const stateSuccess = exercises(stateRequest, {
        type: actions.ACKNOWLEDGE_EXERCISE_STEP.SUCCESS,
        exercise: {
          ...existingState.exercises.byId[exerciseId],
          steps: existingState.exercises.byId[exerciseId].steps.map(
            (step, index) => (index === stepIndex ? { ...step, done: true } : step)
          )
        }
      });
      expect(stateSuccess).toMatchSnapshot();

      const stateFailure = exercises(stateRequest, {
        type: actions.ACKNOWLEDGE_EXERCISE_STEP.FAILURE,
        exercise: { ...existingState.exercises.byId[exerciseId] },
        error: { message: 'A failure message' }
      });
      expect(stateFailure).toMatchSnapshot();
    });

    it('should cancel an exercise step', () => {
      const exerciseId = 3;
      const stepIndex = 0;
      const stateRequest = exercises(existingState.exercises, {
        type: actions.CANCEL_EXERCISE_STEP.REQUEST,
        exerciseId,
        stepIndex
      });
      expect(stateRequest).toMatchSnapshot();

      const stateSuccess = exercises(stateRequest, {
        type: actions.CANCEL_EXERCISE_STEP.SUCCESS,
        exercise: {
          ...existingState.exercises.byId[exerciseId],
          steps: existingState.exercises.byId[exerciseId].steps.map(
            (step, index) => (index === stepIndex ? { ...step, done: false } : step)
          )
        }
      });
      expect(stateSuccess).toMatchSnapshot();

      const stateFailure = exercises(stateRequest, {
        type: actions.CANCEL_EXERCISE_STEP.FAILURE,
        exercise: { ...existingState.exercises.byId[exerciseId] },
        error: { message: 'A failure message' }
      });
      expect(stateFailure).toMatchSnapshot();
    });

    it('should start an exercise', () => {
      const exerciseId = 2;
      const stateRequest = exercises(existingState.exercises, {
        type: actions.START_EXERCISE,
        id: exerciseId
      });
      expect(stateRequest).toMatchSnapshot();
    });

    it('should stop an exercise', () => {
      const exerciseId = 2;
      const stateRequest = exercises(existingState.exercises, {
        type: actions.STOP_EXERCISE,
        id: exerciseId
      });
      expect(stateRequest).toMatchSnapshot();
    });
    
    it('should pause an exercise', () => {
      const exerciseId = 2;
      const stateRequest = exercises(existingState.exercises, {
        type: actions.PAUSE_EXERCISE,
        id: exerciseId
      });
      expect(stateRequest).toMatchSnapshot();
    });
  });
});
