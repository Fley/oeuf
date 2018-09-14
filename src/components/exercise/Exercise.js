import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SortableContainer, SortableElement, SortableHandle, arrayMove } from 'react-sortable-hoc';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faDumbbell, faTimes, faHandPaper, faStopwatch } from '@fortawesome/free-solid-svg-icons';
import SwipeableListItem, {
  SwipedItemAcknowledged,
  SwipedItemRemoved,
  SwipedItemCanceled
} from '../swipeable-list-item/SwipeableListItem';
import { EXERCISE_TYPE } from '../../store/propTypes';

const DragHandle = SortableHandle(() => (
  <div className="list-group-item-drag-handle" style={{ width: '1em' }}>
    <FontAwesomeIcon icon={faBars} />
  </div>
));

const InputNumber = ({ defaultValue, placeholder }) => (
  <input
    type="number"
    className="form-control form-control-sm mx-auto"
    placeholder={placeholder}
    defaultValue={defaultValue}
    min="0"
    max="999"
    style={{ width: '4em' }}
    required
  />
);

const StepRepetition = ({ kg, repetition, rest }) => (
  <div className="d-flex justify-content-between p-3">
    <div>
      <InputNumber defaultValue={kg} placeholder="Kg" />
    </div>
    <div>
      <InputNumber defaultValue={repetition} placeholder="Repetition" />
    </div>
    <div>
      <InputNumber defaultValue={rest} placeholder="Rest" />
    </div>
    <DragHandle />
  </div>
);

const SortableStep = SortableElement(
  ({ step: { kg, repetition, rest, done }, onSwipeLeft, onSwipeRight, leftSwipeElement, rightSwipeElement }) => (
    <SwipeableListItem
      className={'list-group-item p-0 ' + (done ? 'list-group-item-success' : '')}
      onSwipeLeft={onSwipeLeft}
      onSwipeRight={onSwipeRight}
      leftSwipeElement={leftSwipeElement}
      rightSwipeElement={rightSwipeElement}
    >
      <StepRepetition done={done} kg={kg} repetition={repetition} rest={rest} />
    </SwipeableListItem>
  )
);

const SortableStepList = SortableContainer(
  ({ steps, onSwipeLeft, onSwipeRight, leftSwipeElement, rightSwipeElement }) => (
    <ul className="list-group list-group-flush">
      {steps.map((step, index) => (
        <SortableStep
          key={`item-${step.id}`}
          index={index}
          step={step}
          onSwipeRight={() => onSwipeRight(step)}
          onSwipeLeft={() => onSwipeLeft(step)}
          leftSwipeElement={leftSwipeElement}
          rightSwipeElement={rightSwipeElement}
        />
      ))}
    </ul>
  )
);

class Exercise extends Component {
  constructor(props) {
    super(props);
    const { name, steps } = props.exercise;
    this.state = {
      name: name,
      steps: steps
    };
  }

  onSortStepsEnd = ({ oldIndex, newIndex }) => {
    this.setState({ ...this.state, steps: arrayMove(this.state.steps, oldIndex, newIndex) });
  };

  onStepRemoved = step => {
    const newSteps = [...this.state.steps];
    newSteps.splice(newSteps.findIndex(s => s.id === step.id), 1);
    this.setState({ ...this.state, steps: newSteps });
  };

  onStepAknowledged = step => {
    const newSteps = [...this.state.steps];
    newSteps.find(s => s.id === step.id).done = true;
    this.setState({ ...this.state, steps: newSteps });
  };

  onStepCanceled = step => {
    const newSteps = [...this.state.steps];
    newSteps.find(s => s.id === step.id).done = false;
    this.setState({ ...this.state, steps: newSteps });
  };

  render() {
    const { name, steps } = this.state;
    const { onAddStep, onExerciseNameChange } = this.props;
    return (
      <div className="card">
        <form onSubmit={e => e.preventDefault()}>
          <div className="card-body">
            <label htmlFor="exerciseName" className="d-none">
              Exercise name
            </label>
            <input
              type="text"
              className="form-control font-weight-bold text-primary"
              id="exerciseName"
              placeholder="Your exercise name"
              defaultValue={name}
              onChange={e => onExerciseNameChange(e.target.value)}
              autoComplete="off"
              required
            />
          </div>
          <div>
            {steps && steps.length > 0 ? (
              <div>
                <div className="list-group-item-header border-top-0 border-left-0 border-right-0 d-flex justify-content-between text-dark text-center">
                  <div style={{ width: '4em' }}>
                    <FontAwesomeIcon icon={faDumbbell} size="lg" />
                  </div>
                  <div style={{ width: '4em' }}>
                    <FontAwesomeIcon icon={faTimes} size="lg" />
                  </div>
                  <div style={{ width: '4em' }}>
                    <FontAwesomeIcon icon={faHandPaper} size="lg" />
                  </div>
                  <div style={{ width: '1em' }} />
                </div>
                <SortableStepList
                  steps={steps.filter(step => !step.done)}
                  onSortEnd={this.onSortStepsEnd}
                  onSwipeLeft={this.onStepAknowledged}
                  onSwipeRight={this.onStepRemoved}
                  leftSwipeElement={<SwipedItemAcknowledged />}
                  rightSwipeElement={<SwipedItemRemoved />}
                  lockAxis="y"
                  useDragHandle={true}
                  helperClass="list-group-item-sortable-helper"
                />
                <SortableStepList
                  steps={steps.filter(step => step.done)}
                  onSortEnd={this.onSortStepsEnd}
                  onSwipeLeft={this.onStepCanceled}
                  onSwipeRight={this.onStepRemoved}
                  leftSwipeElement={<SwipedItemCanceled />}
                  rightSwipeElement={<SwipedItemRemoved />}
                  lockAxis="y"
                  useDragHandle={true}
                  helperClass="list-group-item-sortable-helper"
                />
              </div>
            ) : (
              <div className="card-body text-center">
                <p className="card-text lead">Choose your exercise type:</p>
                <button type="button" className="btn btn-outline-primary m-1" onClick={() => onAddStep('time')}>
                  <FontAwesomeIcon icon={faStopwatch} /> Time serie
                </button>
                <button type="button" className="btn btn-outline-primary m-1" onClick={() => onAddStep('repetition')}>
                  <FontAwesomeIcon icon={faDumbbell} /> Repetition serie
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    );
  }
}

Exercise.propTypes = {
  exercise: EXERCISE_TYPE.isRequired,
  onAddStep: PropTypes.func.isRequired
};

export default Exercise;
