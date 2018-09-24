import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faDumbbell, faTimes, faHandPaper, faStopwatch } from '@fortawesome/free-solid-svg-icons';
import SwipeableListItem, {
  SwipedItemAcknowledged,
  SwipedItemRemoved,
  SwipedItemCanceled
} from '../swipeable-list-item/SwipeableListItem';
import { EXERCISE_TYPE, TYPE_TIMED, TYPE_REPETITION } from '../../store/propTypes';

const DragHandle = SortableHandle(() => (
  <div className="list-group-item-drag-handle" style={{ width: '1em' }}>
    <FontAwesomeIcon icon={faBars} />
  </div>
));

const InputNumber = ({ defaultValue, placeholder, onChange }) => (
  <input
    type="number"
    className="form-control form-control-sm mx-auto"
    placeholder={placeholder}
    defaultValue={defaultValue}
    onChange={onChange}
    min="0"
    max="999"
    style={{ width: '4em' }}
    required
  />
);

const StepRepetition = ({ kg, repetition, rest, onContentChange }) => (
  <div className="d-flex justify-content-between p-3">
    <div>
      <InputNumber defaultValue={kg} placeholder="Kg" onChange={e => onContentChange({ kg: e.target.value })} />
    </div>
    <div>
      <InputNumber
        defaultValue={repetition}
        placeholder="Repetition"
        onChange={e => onContentChange({ repetition: e.target.value })}
      />
    </div>
    <div>
      <InputNumber defaultValue={rest} placeholder="Rest" onChange={e => onContentChange({ rest: e.target.value })} />
    </div>
    <DragHandle />
  </div>
);

const SortableStep = SortableElement(
  ({
    step: { kg, repetition, rest, done },
    onSwipeLeft,
    onSwipeRight,
    leftSwipeElement,
    rightSwipeElement,
    onContentChange
  }) => (
    <SwipeableListItem
      className={'list-group-item p-0 ' + (done ? 'list-group-item-success' : '')}
      onSwipeLeft={onSwipeLeft}
      onSwipeRight={onSwipeRight}
      leftSwipeElement={leftSwipeElement}
      rightSwipeElement={rightSwipeElement}
    >
      <StepRepetition done={done} kg={kg} repetition={repetition} rest={rest} onContentChange={onContentChange} />
    </SwipeableListItem>
  )
);

const SortableStepList = SortableContainer(
  ({ steps, onSwipeLeft, onSwipeRight, leftSwipeElement, rightSwipeElement, onUpdateStep }) => (
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
          onContentChange={onUpdateStep(step.id)}
        />
      ))}
    </ul>
  )
);

class Exercise extends Component {
  constructor(props) {
    super(props);
    const { name } = props.exercise;
    this.state = {
      name: name
    };
  }

  render() {
    const { name } = this.state;
    const {
      onAddFirstStep,
      onDeleteStep,
      onAcknowledgeStep,
      onCancelStep,
      onUpdateStep,
      onMoveStep,
      onExerciseNameChange,
      exercise: { steps }
    } = this.props;
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
                  onSortEnd={({ oldIndex, newIndex }) => onMoveStep({ oldIndex, newIndex })}
                  onSwipeLeft={step => onAcknowledgeStep(step.id)}
                  onSwipeRight={step => onDeleteStep(step.id)}
                  leftSwipeElement={<SwipedItemAcknowledged />}
                  rightSwipeElement={<SwipedItemRemoved />}
                  onUpdateStep={onUpdateStep}
                  lockAxis="y"
                  useDragHandle={true}
                  helperClass="list-group-item-sortable-helper"
                />
                <SortableStepList
                  steps={steps.filter(step => step.done)}
                  onSortEnd={({ oldIndex, newIndex }) => onMoveStep({ oldIndex, newIndex })}
                  onSwipeLeft={step => onCancelStep(step.id)}
                  onSwipeRight={step => onDeleteStep(step.id)}
                  leftSwipeElement={<SwipedItemCanceled />}
                  rightSwipeElement={<SwipedItemRemoved />}
                  onUpdateStep={onUpdateStep}
                  lockAxis="y"
                  useDragHandle={true}
                  helperClass="list-group-item-sortable-helper"
                />
              </div>
            ) : (
              <div className="card-body text-center">
                <p className="card-text lead">Choose your exercise type:</p>
                <button
                  type="button"
                  className="btn btn-outline-primary m-1"
                  onClick={() => onAddFirstStep(TYPE_TIMED)()}
                >
                  <FontAwesomeIcon icon={faStopwatch} /> Time serie
                </button>
                <button
                  type="button"
                  className="btn btn-outline-primary m-1"
                  onClick={() => onAddFirstStep(TYPE_REPETITION)()}
                >
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
  onAddFirstStep: PropTypes.func.isRequired
};

export default Exercise;
