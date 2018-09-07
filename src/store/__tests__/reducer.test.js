import { TYPE_REPETITION, TYPE_TIMED } from '../propTypes';
import * as actions from '../actions';
import { exercises, exsercisesInitialState } from '../reducer';

const DATE_TO_USE = new Date('2018');
global.Date = jest.fn(() => DATE_TO_USE);

describe('store/reducer', () => {
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
    it('should fetch all exercises', () => {
      const stateRequest = exercises(exsercisesInitialState, actions.fetchAllExercisesRequest());
      expect(stateRequest).toMatchSnapshot();

      const stateSuccess = exercises(
        stateRequest,
        actions.fetchAllExercisesSuccess(existingState.exercises.ids.map(id => existingState.exercises.byId[id]))
      );
      expect(stateSuccess).toMatchSnapshot();

      const stateFailure = exercises(stateRequest, actions.fetchAllExercisesFailure({ message: 'A failure message' }));
      expect(stateFailure).toMatchSnapshot();
    });

    it('should fetch a specific exercise', () => {
      const fetchedId = 1;
      const stateRequest = exercises(exsercisesInitialState, actions.fetchExerciseRequest(fetchedId));
      expect(stateRequest).toMatchSnapshot();

      const stateSuccess = exercises(
        stateRequest,
        actions.fetchExerciseSuccess(existingState.exercises.byId[fetchedId])
      );
      expect(stateSuccess).toMatchSnapshot();

      const stateFailure = exercises(
        stateRequest,
        actions.fetchExerciseFailure(fetchedId, { message: 'A failure message' })
      );
      expect(stateFailure).toMatchSnapshot();
    });

    it('should add exercise', () => {
      const stateRequest = exercises(exsercisesInitialState, actions.addExerciseRequest());
      expect(stateRequest).toMatchSnapshot();

      const stateSuccess = exercises(stateRequest, actions.addExerciseSuccess(existingState.exercises.byId[1]));
      expect(stateSuccess).toMatchSnapshot();

      const stateFailure = exercises(
        stateRequest,
        actions.addExerciseFailure(existingState.exercises.byId[1], { message: 'A failure message' })
      );
      expect(stateFailure).toMatchSnapshot();
    });

    it('should delete exercise', () => {
      const exerciseId = 1;
      const stateRequest = exercises(existingState.exercises, actions.deleteExerciseRequest(exerciseId));
      expect(stateRequest).toMatchSnapshot();

      const stateSuccess = exercises(stateRequest, actions.deleteExerciseSuccess(exerciseId));
      expect(stateSuccess).toMatchSnapshot();

      const stateFailure = exercises(
        stateRequest,
        actions.deleteExerciseFailure(exerciseId, { message: 'A failure message' })
      );
      expect(stateFailure).toMatchSnapshot();
    });

    it('should acknowledge an exercise', () => {
      const exerciseId = 2;
      const stateRequest = exercises(existingState.exercises, actions.acknowledgeExerciseRequest(exerciseId));
      expect(stateRequest).toMatchSnapshot();

      const stateSuccess = exercises(
        stateRequest,
        actions.acknowledgeExerciseSuccess({
          ...existingState.exercises.byId[exerciseId],
          done: true,
          steps: existingState.exercises.byId[exerciseId].steps.map(step => ({ ...step, done: true }))
        })
      );
      expect(stateSuccess).toMatchSnapshot();

      const stateFailure = exercises(
        stateRequest,
        actions.acknowledgeExerciseFailure(
          { ...existingState.exercises.byId[exerciseId] },
          { message: 'A failure message' }
        )
      );
      expect(stateFailure).toMatchSnapshot();
    });

    it('should cancel an exercise', () => {
      const exerciseId = 1;
      const stateRequest = exercises(existingState.exercises, actions.cancelExerciseRequest(exerciseId));
      expect(stateRequest).toMatchSnapshot();

      const stateSuccess = exercises(
        stateRequest,
        actions.cancelExerciseSuccess({
          ...existingState.exercises.byId[exerciseId],
          done: false,
          steps: existingState.exercises.byId[exerciseId].steps.map(step => ({ ...step, done: false }))
        })
      );
      expect(stateSuccess).toMatchSnapshot();

      const stateFailure = exercises(
        stateRequest,
        actions.cancelExerciseFailure({ ...existingState.exercises.byId[exerciseId] }, { message: 'A failure message' })
      );
      expect(stateFailure).toMatchSnapshot();
    });

    it('should acknowledge an exercise step', () => {
      const exerciseId = 3;
      const stepIndex = 1;
      const stateRequest = exercises(
        existingState.exercises,
        actions.acknowledgeExerciseStepRequest(exerciseId, stepIndex)
      );
      expect(stateRequest).toMatchSnapshot();

      const stateSuccess = exercises(
        stateRequest,
        actions.acknowledgeExerciseStepSuccess({
          ...existingState.exercises.byId[exerciseId],
          steps: existingState.exercises.byId[exerciseId].steps.map(
            (step, index) => (index === stepIndex ? { ...step, done: true } : step)
          )
        })
      );
      expect(stateSuccess).toMatchSnapshot();

      const stateFailure = exercises(
        stateRequest,
        actions.acknowledgeExerciseStepFailure(
          { ...existingState.exercises.byId[exerciseId] },
          { message: 'A failure message' }
        )
      );
      expect(stateFailure).toMatchSnapshot();
    });

    it('should cancel an exercise step', () => {
      const exerciseId = 3;
      const stepIndex = 0;
      const stateRequest = exercises(existingState.exercises, actions.cancelExerciseStepRequest(exerciseId, stepIndex));
      expect(stateRequest).toMatchSnapshot();

      const stateSuccess = exercises(
        stateRequest,
        actions.cancelExerciseStepSuccess({
          ...existingState.exercises.byId[exerciseId],
          steps: existingState.exercises.byId[exerciseId].steps.map(
            (step, index) => (index === stepIndex ? { ...step, done: false } : step)
          )
        })
      );
      expect(stateSuccess).toMatchSnapshot();

      const stateFailure = exercises(
        stateRequest,
        actions.cancelExerciseStepFailure(
          { ...existingState.exercises.byId[exerciseId] },
          { message: 'A failure message' }
        )
      );
      expect(stateFailure).toMatchSnapshot();
    });

    it('should start an exercise', () => {
      const exerciseId = 2;
      const stateRequest = exercises(existingState.exercises, actions.startExercise(exerciseId));
      expect(stateRequest).toMatchSnapshot();
    });

    it('should stop an exercise', () => {
      const exerciseId = 2;
      const stateRequest = exercises(existingState.exercises, actions.stopExercise(exerciseId));
      expect(stateRequest).toMatchSnapshot();
    });

    it('should pause an exercise', () => {
      const exerciseId = 2;
      const stateRequest = exercises(existingState.exercises, actions.pauseExercise(exerciseId));
      expect(stateRequest).toMatchSnapshot();
    });
  });
});
