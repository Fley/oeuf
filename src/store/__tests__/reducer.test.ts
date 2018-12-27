import * as actions from '../actions';
import { exercises, exsercisesInitialState, AppStore } from '../reducer';

describe('store/reducer', () => {
  const existingState: AppStore = {
    exercises: {
      loading: false,
      error: null,
      ids: ['1', '2', '3'],
      byId: {
        '1': {
          id: '1',
          done: true,
          name: 'Chess press',
          type: 'repetition',
          steps: [
            { id: '1', kg: 30, repetition: 15, rest: 60, done: true },
            { id: '2', kg: 30, repetition: 10, rest: 60, done: true },
            { id: '3', kg: 30, repetition: 10, rest: 60, done: true },
            { id: '4', kg: 30, repetition: 10, rest: 60, done: true }
          ],
          progress: null
        },
        '2': {
          id: '2',
          done: false,
          name: 'Leg press',
          type: 'repetition',
          steps: [
            { id: '1', kg: 30, repetition: 15, rest: 60, done: true },
            { id: '2', kg: 30, repetition: 10, rest: 60, done: true },
            { id: '3', kg: 30, repetition: 10, rest: 60, done: true },
            { id: '4', kg: 30, repetition: 10, rest: 60, done: true }
          ],
          progress: null
        },
        '3': {
          id: '3',
          done: false,
          name: 'Abs',
          type: 'timed',
          steps: [
            { id: '1', duration: 120, rest: 60, done: true },
            { id: '2', duration: 120, rest: 60, done: false },
            { id: '3', duration: 120, rest: 60, done: false },
            { id: '4', duration: 120, rest: 60, done: false }
          ],
          progress: null
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
      const fetchedId = '1';
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
      const exerciseId = '1';
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
      const exerciseId = '2';
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
        actions.acknowledgeExerciseFailure(exerciseId, { message: 'A failure message' })
      );
      expect(stateFailure).toMatchSnapshot();
    });

    it('should cancel an exercise', () => {
      const exerciseId = '1';
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
        actions.cancelExerciseFailure(exerciseId, { message: 'A failure message' })
      );
      expect(stateFailure).toMatchSnapshot();
    });

    it('should acknowledge an exercise step', () => {
      const exerciseId = '3';
      const stepId = '2';
      const stateRequest = exercises(
        existingState.exercises,
        actions.acknowledgeExerciseStepRequest(exerciseId, stepId)
      );
      expect(stateRequest).toMatchSnapshot();

      const stateSuccess = exercises(
        stateRequest,
        actions.acknowledgeExerciseStepSuccess({
          ...existingState.exercises.byId[exerciseId],
          steps: existingState.exercises.byId[exerciseId].steps.map(step =>
            step.id === stepId ? { ...step, done: true } : step
          )
        })
      );
      expect(stateSuccess).toMatchSnapshot();

      const stateFailure = exercises(
        stateRequest,
        actions.acknowledgeExerciseStepFailure(exerciseId, stepId, { message: 'A failure message' })
      );
      expect(stateFailure).toMatchSnapshot();
    });

    it('should cancel an exercise step', () => {
      const exerciseId = '3';
      const stepId = '1';
      const stateRequest = exercises(existingState.exercises, actions.cancelExerciseStepRequest(exerciseId, stepId));
      expect(stateRequest).toMatchSnapshot();

      const stateSuccess = exercises(
        stateRequest,
        actions.cancelExerciseStepSuccess({
          ...existingState.exercises.byId[exerciseId],
          steps: existingState.exercises.byId[exerciseId].steps.map((step, index) =>
            step.id === stepId ? { ...step, done: false } : step
          )
        })
      );
      expect(stateSuccess).toMatchSnapshot();

      const stateFailure = exercises(
        stateRequest,
        actions.cancelExerciseStepFailure(exerciseId, stepId, { message: 'A failure message' })
      );
      expect(stateFailure).toMatchSnapshot();
    });
  });
});
