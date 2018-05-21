import idb from 'idb';

const RW = 'readwrite';

const dbname = 'oeuf-db';
const version = 1;

const EXERCISE_STORE = 'exercise';

const dbPromise = idb.open(dbname, version, upgradeDB => {
  switch (upgradeDB.oldVersion) {
    case 0:
    default:
      upgradeDB.createObjectStore(EXERCISE_STORE, { keyPath: 'id' });
  }
});

export default dbPromise;

// EXERCISE

export const putExercise = async (exercise) => {
  const db = await dbPromise;
  const tx = db.transaction(EXERCISE_STORE, RW);
  tx.objectStore(EXERCISE_STORE).put(exercise);
  return tx.complete;
};

export const deleteExercise = async id => {
  const db = await dbPromise;
  const tx = db.transaction(EXERCISE_STORE, RW);
  tx.objectStore(EXERCISE_STORE).delete(id);
  return tx.complete;
};

export const getAllExercises = async () => {
  const db = await dbPromise;
  return db
    .transaction(EXERCISE_STORE)
    .objectStore(EXERCISE_STORE)
    .getAll();
};

export const getExerciseById = async id => {
  const db = await dbPromise;
  return db
    .transaction(EXERCISE_STORE)
    .objectStore(EXERCISE_STORE)
    .get(id);
};
