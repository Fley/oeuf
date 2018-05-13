import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { SortableContainer, SortableElement, SortableHandle, arrayMove } from 'react-sortable-hoc';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faBars from '@fortawesome/fontawesome-free-solid/faBars';
import faDumbbell from '@fortawesome/fontawesome-free-solid/faDumbbell';
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes';
import faHandPaper from '@fortawesome/fontawesome-free-solid/faHandPaper';

const DragHandle = SortableHandle(() => (
  <div className="list-group-item-sortable-drag-handle">
    <FontAwesomeIcon icon={faBars} />
  </div>
));

const RepetitionHeader = () => (
  <li className="list-group-item-sortable d-flex flex-row justify-content-around w-100">
    <div className="text-dark">
      <FontAwesomeIcon icon={faDumbbell} size="lg" />
    </div>
    <div className="text-dark">
      <FontAwesomeIcon icon={faTimes} size="lg" />
    </div>
    <div className="text-dark">
      <FontAwesomeIcon icon={faHandPaper} size="lg" />
    </div>
  </li>
);

const SortableStep = SortableElement(({ step: { type, content } }) => (
  <li className="list-group-item-sortable d-flex">
    <DragHandle />
    <div className="list-group-item-sortable-content d-flex flex-row justify-content-around flex-grow-1">
      <div className="form-inline">
        <input
          type="number"
          className="form-control"
          placeholder="kg"
          defaultValue={content.kg}
          min="0"
          max="999"
          style={{ width: '3em' }}
          required
        />
      </div>
      <div>{content.repetition}</div>
      <div>{content.rest}</div>
    </div>
  </li>
));

const SortableStepList = SortableContainer(({ steps }) => (
  <ul className="list-group">
    {steps.map((step, index, steps) => (
      <div>
        {(index === 0 || steps[index - 1].type !== step.type) && <RepetitionHeader />}
        <SortableStep key={`item-${index}`} index={index} step={step} />
      </div>
    ))}
  </ul>
));

class Exercise extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      steps: props.steps
    };
  }

  onSortStepsEnd = ({ oldIndex, newIndex }) => {
    this.setState({ ...this.state, steps: arrayMove(this.state.steps, oldIndex, newIndex) });
  };

  render() {
    const { name, steps } = this.state;
    return (
      <div>
        <form onSubmit={e => e.preventDefault()}>
          <div className="form-group">
            <label htmlFor="exerciseName" className="d-none">
              Exercise name
            </label>
            <input
              type="text"
              className="form-control font-weight-bold"
              id="exerciseName"
              placeholder="Your exercise name"
              defaultValue={name}
              required
            />
            <div className="mt-3">
              <SortableStepList
                steps={steps}
                onSortEnd={this.onSortStepsEnd}
                lockAxis="y"
                useDragHandle={true}
                helperclassName="list-group-item-sortable-helper"
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

Exercise.propTypes = {
  name: PropTypes.string,
  steps: PropTypes.object
};

export default Exercise;
