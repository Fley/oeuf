import React, { FC, useState } from 'react';
import './ExerciseRunner.css';
import classNames from 'classnames';
import { Exercise, Step, StepTimed, StepRepetition } from 'store/types';
import { Layout, CenteredPageLayout } from 'components/layout';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faStepForward, faStepBackward } from '@fortawesome/free-solid-svg-icons';
import { faSmileBeam } from '@fortawesome/free-regular-svg-icons';
import { TimedProgress } from './TimedProgress';
import { RepetitionProgress } from './RepetitionProgress';
import { Redirect } from 'react-router';

type ProgressProps = { currentStep: Step; type: Exercise['type']; onFinished: () => void };

const Progress: FC<ProgressProps> = ({ type, currentStep, onFinished }) => {
  if (type === 'timed') {
    const step = currentStep as StepTimed;
    return <TimedProgress totalTime={step.duration} onFinished={onFinished} />;
  } else if (type === 'repetition') {
    const step = currentStep as StepRepetition;
    return <RepetitionProgress repetition={step.repetition} kg={step.kg} onFinished={onFinished} />;
  }
  return <>Error displaying progress of the exercise, unknown type</>;
};

export type ExerciseRunnerProps = {
  exerciseId: Exercise['id'];
  exerciseName: Exercise['name'];
  type: Exercise['type'];
  steps: Step[];
  currentStepIndex: number;
  onStepFinished: (stepId: string) => void;
};

export const ExerciseRunner: FC<ExerciseRunnerProps> = ({
  exerciseId,
  exerciseName,
  type,
  steps,
  currentStepIndex = 0,
  onStepFinished
}) => {
  const [rest, setRest] = useState(false);
  const [renderNext, setRenderNext] = useState(false);

  const goToNextStep = () => setRenderNext(true);

  const finishStepAndRest = () => {
    setRest(true);
    onStepFinished(steps[currentStepIndex].id);
  };

  return (
    <Layout
      header={
        <span>
          <Link to={`/${exerciseId}`} className="btn btn-link text-dark" aria-label="Back to exercises list">
            <FontAwesomeIcon icon={faTimes} />
          </Link>
          {`${exerciseName} - Step ${currentStepIndex + 1}`}
        </span>
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
      <CenteredPageLayout className={classNames({ success: steps[currentStepIndex].done })}>
        {rest ? (
          <TimedProgress
            key="rest-timed-progress"
            totalTime={steps[currentStepIndex].rest}
            theme="rest"
            onFinished={goToNextStep}
          />
        ) : (
          <>
            <Progress type={type} currentStep={steps[currentStepIndex]} onFinished={finishStepAndRest} />
            <div className="d-flex">
              <button className="btn btn-outline-info btn-block m-1" onClick={finishStepAndRest}>
                <FontAwesomeIcon icon={faSmileBeam} /> Rest
              </button>
            </div>
          </>
        )}
      </CenteredPageLayout>
      {renderNext && currentStepIndex < steps.length - 1 && (
        <Redirect to={`/${exerciseId}/runner/${steps[currentStepIndex + 1].id}`} />
      )}
    </Layout>
  );
};
