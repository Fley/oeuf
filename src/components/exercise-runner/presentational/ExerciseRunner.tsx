import React, { PureComponent } from 'react';
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

export type ExerciseRunnerProps = {
  exerciseId: Exercise['id'];
  exerciseName: Exercise['name'];
  type: Exercise['type'];
  steps: Step[];
  currentStepIndex: number;
  onStepFinished: (stepId: string) => void;
};

type ExerciseRunnerLayoutState = {
  rest: boolean;
  renderNext: boolean;
};

export class ExerciseRunner extends PureComponent<ExerciseRunnerProps, ExerciseRunnerLayoutState> {
  constructor(props: ExerciseRunnerProps) {
    super(props);
    this.state = { rest: false, renderNext: false };
  }

  static defaultProps: { currentStepIndex: number } = {
    currentStepIndex: 0
  };

  goToNextStep = () => this.setState({ renderNext: true });

  finishStepAndRest = () => {
    this.setState({ rest: true });
    this.props.onStepFinished(this.props.steps[this.props.currentStepIndex].id);
  };

  renderProgress = (currentStep: Step) => {
    const { type } = this.props;
    if (type === 'timed') {
      const step = currentStep as StepTimed;
      return <TimedProgress totalTime={step.duration} onFinished={this.finishStepAndRest} />;
    } else if (type === 'repetition') {
      const step = currentStep as StepRepetition;
      return <RepetitionProgress repetition={step.repetition} kg={step.kg} onFinished={this.finishStepAndRest} />;
    }
    return 'Error displaying progress of the exercise, unknown type';
  };

  render() {
    const { exerciseId, exerciseName, steps, currentStepIndex } = this.props;
    return (
      <Layout
        header={
          <>
            <Link to={`/${exerciseId}`} className="btn btn-link text-dark" aria-label="Back to exercises list">
              <FontAwesomeIcon icon={faTimes} />
            </Link>
            {`${exerciseName} - Step ${currentStepIndex + 1}`}
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
        <CenteredPageLayout className={classNames({ success: steps[currentStepIndex].done })}>
          {this.state.rest ? (
            <TimedProgress
              key="rest-timed-progress"
              totalTime={steps[currentStepIndex].rest}
              theme="rest"
              onFinished={this.goToNextStep}
            />
          ) : (
            <>
              {this.renderProgress(steps[currentStepIndex])}
              <div className="d-flex">
                <button className="btn btn-outline-info btn-block m-1" onClick={this.finishStepAndRest}>
                  <FontAwesomeIcon icon={faSmileBeam} /> Rest
                </button>
              </div>
            </>
          )}
        </CenteredPageLayout>
        {this.state.renderNext && currentStepIndex < steps.length - 1 && (
          <Redirect to={`/${exerciseId}/runner/${steps[currentStepIndex + 1].id}`} />
        )}
      </Layout>
    );
  }
}
