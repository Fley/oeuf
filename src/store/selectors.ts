import { AppStore } from './reducer';

export const getExerciseList = (state: AppStore) => state.exercises.ids.map(id => state.exercises.byId[id]);

export const getExerciseById = (state: AppStore) => (id: string) => state.exercises.byId[id];

export const areExercisesLoading = (state: AppStore) => state.exercises.loading;

export const hasErrorLoadingExercises = (state: AppStore) => !!state.exercises.error;
