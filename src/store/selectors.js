export const getExerciseList = state =>
  state.exercises.ids.map(id => state.exercises.byId[id]).filter(exercise => !exercise.deleting);

export const getExerciseById = state => id => state.exercises.byId[id];

export const areExercisesLoading = state => state.exercises.loading;

export const hasErrorLoadingExercises = state => !!state.error;
