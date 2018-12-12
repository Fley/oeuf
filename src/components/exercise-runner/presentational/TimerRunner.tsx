import React from 'react';
import { Exercise, StepTimed } from 'store/types';
import Layout from 'components/layout/Layout';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faStepForward, faStepBackward } from '@fortawesome/free-solid-svg-icons';
import { TimedProgress } from './TimedProgress';

export type TimerRunnerProps = {
  exerciseId: Exercise['id'];
  exerciseName: Exercise['name'];
  steps: StepTimed[];
  currentStepIndex?: number;
};

export const TimerRunner = ({ exerciseId, exerciseName, steps, currentStepIndex = 0 }: TimerRunnerProps) => (
  <Layout
    header={
      <>
        <Link to={`/${exerciseId}`} className="btn btn-link text-dark" aria-label="Back to exercises list">
          <FontAwesomeIcon icon={faTimes} />
        </Link>
        {exerciseName}
      </>
    }
    navItems={[
      <>
        {currentStepIndex > 0 ? (
          <Link
            to={`/${exerciseId}/runner/${steps[currentStepIndex - 1].id}`}
            key="nav-previous"
            className="btn btn-link nav-link btn-block"
          >
            <FontAwesomeIcon icon={faStepBackward} /> Previous
          </Link>
        ) : (
          <button key="nav-previous" className="btn btn-link nav-link btn-block" disabled>
            <FontAwesomeIcon icon={faStepBackward} /> Previous
          </button>
        )}
      </>,
      <>
        {currentStepIndex < steps.length - 1 ? (
          <Link
            to={`/${exerciseId}/runner/${steps[currentStepIndex + 1].id}`}
            key="nav-next"
            className="btn btn-link nav-link btn-block"
          >
            <FontAwesomeIcon icon={faStepForward} /> Next
          </Link>
        ) : (
          <button key="nav-next" className="btn btn-link nav-link btn-block" disabled>
            <FontAwesomeIcon icon={faStepForward} /> Next
          </button>
        )}
      </>
    ]}
  >
    <TimedProgress totalTime={steps[currentStepIndex].duration} />
  </Layout>
);
