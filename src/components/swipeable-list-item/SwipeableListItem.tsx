import React, { Component, ReactNode } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck, faUndo } from '@fortawesome/free-solid-svg-icons';

export type SwipeableListItemProps = {
  className: string;
  rightSwipeElement: ReactNode;
  leftSwipeElement: ReactNode;
  onSwipeRight: () => void;
  onSwipeLeft: () => void;
};

export type SwipeableListItemState = {
  index: number;
};

export default class SwipeableListItem extends Component<SwipeableListItemProps, SwipeableListItemState> {
  constructor(props: SwipeableListItemProps) {
    super(props);
    this.state = { index: 1 };
  }

  onChangeIndex = (index: number) => {
    this.setState({ index });
  };

  onTransitionEnd = () => {
    if (this.state.index === 0) {
      this.props.onSwipeLeft();
    } else if (this.state.index === 2) {
      this.props.onSwipeRight();
    }
  };

  render() {
    const { className, children, rightSwipeElement, leftSwipeElement } = this.props;

    return (
      <li className={className}>
        <SwipeableViews
          index={this.state.index}
          onTransitionEnd={this.onTransitionEnd}
          onChangeIndex={this.onChangeIndex}
        >
          {leftSwipeElement}
          {children}
          {rightSwipeElement}
        </SwipeableViews>
      </li>
    );
  }
}

export const SwipedItemAcknowledged = () => (
  <div className="d-flex bg-success text-white py-2 px-3 h-100 justify-content-end">
    <FontAwesomeIcon icon={faCheck} className="align-self-center" />
  </div>
);

export const SwipedItemRemoved = () => (
  <div className="bg-danger text-white py-2 px-3 h-100">
    <FontAwesomeIcon icon={faTimes} className="align-self-center" />
  </div>
);

export const SwipedItemCanceled = () => (
  <div className="d-flex bg-warning text-white py-2 px-3 h-100 justify-content-end">
    <FontAwesomeIcon icon={faUndo} className="align-self-center" />
  </div>
);
