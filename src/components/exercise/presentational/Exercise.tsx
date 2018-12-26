import React, { Component, ReactNode } from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell, faStopwatch } from '@fortawesome/free-solid-svg-icons';
import SwipeableListItem, {
  SwipedItemAcknowledged,
  SwipedItemRemoved,
  SwipedItemCanceled
} from '../../../components/swipeable-list-item/SwipeableListItem';
import { StepRepetition, HeaderStepRepetition, HeaderStepTimed, StepTimed } from './ExerciseStep';
import {
  Exercise as ExerciseType,
  StepType,
  Step,
  StepTimed as StepTimedType,
  StepRepetition as StepRepetitionType
} from '../../../store/types';

type SortableStepProps = {
  type: StepType;
  step: Step;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  leftSwipeElement: ReactNode;
  rightSwipeElement: ReactNode;
  onContentChange: (content: Partial<StepRepetitionType>) => void;
};

const SortableStep = SortableElement(
  ({
    type,
    step: { done, ...content },
    onSwipeLeft,
    onSwipeRight,
    leftSwipeElement,
    rightSwipeElement,
    onContentChange
  }: SortableStepProps) => (
    <SwipeableListItem
      className={'list-group-item p-0 ' + (done ? 'list-group-item-success' : '')}
      onSwipeLeft={onSwipeLeft}
      onSwipeRight={onSwipeRight}
      leftSwipeElement={leftSwipeElement}
      rightSwipeElement={rightSwipeElement}
    >
      {type === 'timed' ? (
        <StepTimed
          duration={(content as StepTimedType).duration}
          rest={content.rest}
          onContentChange={onContentChange}
        />
      ) : (
        <StepRepetition
          kg={(content as StepRepetitionType).kg}
          repetition={(content as StepRepetitionType).repetition}
          rest={content.rest}
          onContentChange={onContentChange}
        />
      )}
    </SwipeableListItem>
  )
);

type SortableStepListProps = {
  type: StepType;
  onSwipeLeft: (step: Step) => void;
  onSwipeRight: (step: Step) => void;
  leftSwipeElement: ReactNode;
  rightSwipeElement: ReactNode;
  steps: Step[];
  onUpdateStep: (stepId: string) => (content: Partial<StepRepetitionType>) => void;
};

const SortableStepList = SortableContainer(
  ({
    type,
    onSwipeLeft,
    onSwipeRight,
    leftSwipeElement,
    rightSwipeElement,
    steps,
    onUpdateStep
  }: SortableStepListProps) => (
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

export type ExerciseProps = {
  exercise: ExerciseType;
  onAddFirstStep: (stepType: StepType) => (stepContent?: Step) => void;
  onDeleteStep: (stepId: string) => void;
  onAcknowledgeStep: (stepId: string) => void;
  onCancelStep: (stepId: string) => void;
  onUpdateStep: (stepId: string) => (contentPatch: Partial<Step>) => void;
  onMoveStep: (p: { oldIndex: number; newIndex: number }) => void;
  onStartExercise: () => void;
  onExerciseNameChange: (name: string) => void;
};

export type ExerciseState = {
  name: string;
};

class Exercise extends Component<ExerciseProps, ExerciseState> {
  constructor(props: ExerciseProps) {
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
      <article className="card">
        <form onSubmit={e => e.preventDefault()}>
          <header className="card-body">
            <label htmlFor="exerciseName" className="d-none">
              Exercise name
            </label>
            <input
              type="text"
              className="form-control font-weight-bold text-primary"
              id="exerciseName"
              placeholder="Your exercise name"
              defaultValue={name}
              onChange={e => onExerciseNameChange(e.currentTarget.value)}
              autoComplete="off"
              required
            />
          </header>
          <>
            {type && steps && steps.length > 0 ? (
              <section>
                {type === 'timed' ? <HeaderStepTimed /> : <HeaderStepRepetition />}
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
              </section>
            ) : (
              <section className="card-body text-center">
                <p className="card-text lead">Choose your exercise type:</p>
                <button type="button" className="btn btn-outline-primary m-1" onClick={() => onAddFirstStep('timed')()}>
                  <FontAwesomeIcon icon={faStopwatch} /> Time serie
                </button>
                <button
                  type="button"
                  className="btn btn-outline-primary m-1"
                  onClick={() => onAddFirstStep('repetition')()}
                >
                  <FontAwesomeIcon icon={faDumbbell} /> Repetition serie
                </button>
              </section>
            )}
          </>
        </form>
      </article>
    );
  }
}

export default Exercise;
