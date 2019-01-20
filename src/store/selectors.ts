import { AppStore } from './reducer';

export const getExerciseList = (state: AppStore) =>
  getExercisesState(state).ids.map(id => getExercisesState(state).byId[id]);

export const getExerciseById = (state: AppStore) => (id: string) => getExercisesState(state).byId[id];

export const areExercisesLoading = (state: AppStore) => getExercisesState(state).loading;

export const hasErrorLoadingExercises = (state: AppStore) => !!getExercisesState(state).error;

export const getExercisesState = (state: AppStore) => state.exercises;
export const getNotificationState = (state: AppStore) => state.notification;
export const getServiceWorkerState = (state: AppStore) => state.serviceWorker;
