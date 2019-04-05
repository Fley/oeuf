import { openDB } from 'idb';
import { Exercise } from '../store/types';
import { OeufDBSchema } from './types';

const RW = 'readwrite';

const dbname = 'oeuf-db';
const version = 1;

const dbPromise = openDB<OeufDBSchema>(dbname, version, {
  upgrade: (db, oldVersion /* , newVersion, transaction */) => {
    switch (oldVersion) {
      case 0:
      default:
        db.createObjectStore('exercise', { keyPath: 'id' });
    }
  }
});

// EXERCISE

export const putExercise = async (exercise: Exercise) => {
  const db = await dbPromise;
  await db.put('exercise', exercise);
  return exercise;
};

export const patchExerciseById = async (id: string, patchExercise: Partial<Exercise>) => {
  const db = await dbPromise;
  const tx = db.transaction('exercise', RW);
  const store = tx.objectStore('exercise');
  const exercise = await store.get(id);
  if (exercise) {
    const newExercise = { ...exercise, ...patchExercise };
    store.put(newExercise);
    await tx.done;
    return newExercise;
  } else {
    throw new Error(`Exercise not found (id="${id}"")`);
  }
};

export const deleteExercise = async (id: string) => {
  const db = await dbPromise;
  return db.delete('exercise', id);
};

export const getAllExercises = async () => {
  const db = await dbPromise;
  return db.getAll('exercise');
};

export const getExerciseById = async (id: string) => {
  const db = await dbPromise;
  return db.get('exercise', id);
};
