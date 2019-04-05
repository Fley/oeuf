import { DBSchema } from 'idb';
import { Exercise } from 'store/types';

export const EXERCISE_STORE = 'exercise';

export interface OeufDBSchema extends DBSchema {
  [EXERCISE_STORE]: {
    key: string;
    value: Exercise;
  };
}
