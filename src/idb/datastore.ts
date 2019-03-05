import { openDb } from 'idb';
import { Exercise } from '../store/types';

const RW = 'readwrite';

const dbname = 'oeuf-db';
const version = 1;

const EXERCISE_STORE = 'exercise';

const dbPromise = openDb(dbname, version, upgradeDB => {
  switch (upgradeDB.oldVersion) {
    case 0:
    default:
      upgradeDB.createObjectStore<Exercise, string>(EXERCISE_STORE, { keyPath: 'id' });
  }
});

// EXERCISE

export const putExercise = async (exercise: Exercise) => {
  const db = await dbPromise;
  const tx = db.transaction(EXERCISE_STORE, RW);
  tx.objectStore<Exercise, string>(EXERCISE_STORE).put(exercise);
  await tx.complete;
  return exercise;
};

export const patchExerciseById = async (id: string, patchExercise: Partial<Exercise>) => {
  const db = await dbPromise;
  const tx = db.transaction(EXERCISE_STORE, RW);
  const store = tx.objectStore<Exercise, string>(EXERCISE_STORE);
  const exercise = await store.get(id);
  if (exercise) {
    const newExercise = { ...exercise, ...patchExercise };
    store.put(newExercise);
    await tx.complete;
    return newExercise;
  } else {
    throw new Error(`Exercise not found (id="${id}"")`);
  }
};

export const deleteExercise = async (id: string) => {
  const db = await dbPromise;
  const tx = db.transaction(EXERCISE_STORE, RW);
  tx.objectStore<Exercise, string>(EXERCISE_STORE).delete(id);
  return tx.complete;
};

export const getAllExercises = async () => {
  const db = await dbPromise;
  return db
    .transaction(EXERCISE_STORE)
    .objectStore<Exercise, string>(EXERCISE_STORE)
    .getAll();
};

export const getExerciseById = async (id: string) => {
  const db = await dbPromise;
  return db
    .transaction(EXERCISE_STORE)
    .objectStore<Exercise, string>(EXERCISE_STORE)
    .get(id);
};
