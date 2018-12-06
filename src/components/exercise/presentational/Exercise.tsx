import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell, faStopwatch } from '@fortawesome/free-solid-svg-icons';
import SwipeableListItem, {
  SwipedItemAcknowledged,
  SwipedItemRemoved,
  SwipedItemCanceled
} from '../../../components/swipeable-list-item/SwipeableListItem';
import { EXERCISE_TYPE, TYPE_TIMED, TYPE_REPETITION } from '../../../store/propTypes';
import { StepRepetition, HeaderStepRepetition, HeaderStepTimed, StepTimed } from './ExerciseStep';

const SortableStep = SortableElement(
  ({
    type,
    step: { done, ...content },
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
      {type === TYPE_TIMED ? (
        <StepTimed done={done} duration={content.duration} rest={content.rest} onContentChange={onContentChange} />
      ) : (
        <StepRepetition
          done={done}
          kg={content.kg}
          repetition={content.repetition}
          rest={content.rest}
          onContentChange={onContentChange}
        />
      )}
    </SwipeableListItem>
  )
);

const SortableStepList = SortableContainer(
  ({ type, steps, onSwipeLeft, onSwipeRight, leftSwipeElement, rightSwipeElement, onUpdateStep }) => (
    <ul className="list-group list-group-flush">
      {steps.map((step, index) => (
        <SortableStep
          key={`item-${step.id}`}
          index={index}
          type={type}
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
      exercise: { type, steps }
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
                {type === TYPE_TIMED ? <HeaderStepTimed /> : <HeaderStepRepetition />}
                <SortableStepList
                  type={type}
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
                  type={type}
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
