import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import Theme from './components/theme/Theme';
import RootContainer from './redux/RootContainer';
import { StoryDecorator } from '@storybook/react';
import { AppStore } from 'store/reducer';
import configureStore from 'store/configureStore';
import { StepTimed, StepRepetition } from 'store/types';

const defaultStore: AppStore = {
  exercises: {
    byId: {
      timedExerciseId: {
        id: 'timedExerciseId',
        done: false,
        name: 'My timed exercise',
        type: 'timed',
        steps: [
          { id: '1', duration: 45, rest: 20, done: true },
          { id: '2', duration: 50, rest: 30, done: false },
          { id: '3', duration: 60, rest: 40, done: false }
        ] as StepTimed[],
        progress: null
      },
      repetitionExerciseId: {
        id: 'repetitionExerciseId',
        name: 'Chess press',
        type: 'repetition',
        steps: [
          { id: '1', kg: 25, repetition: 15, rest: 30, done: true },
          { id: '2', kg: 20, repetition: 10, rest: 30, done: false },
          { id: '3', kg: 20, repetition: 10, rest: 30, done: false },
          { id: '4', kg: 20, repetition: 10, rest: 30, done: false }
        ] as StepRepetition[],
        done: false,
        progress: null
      }
    },
    ids: ['timedExerciseId', 'repetitionExerciseId'],
    error: null,
    loading: false
  },
  notification: {},
  serviceWorker: {
    newVersionAvailable: false
  }
};

export const ReduxDecorator: (store?: Partial<AppStore>) => StoryDecorator = (store = {}) => storyFn => (
  <RootContainer store={configureStore({ ...defaultStore, ...store })}>{storyFn()}</RootContainer>
);

export const StoryWrapper: StoryDecorator = storyFn => (
  <Router>
    <Theme>{storyFn()}</Theme>
  </Router>
);
