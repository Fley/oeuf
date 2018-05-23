import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes';
import faCheck from '@fortawesome/fontawesome-free-solid/faCheck';
import faUndo from '@fortawesome/fontawesome-free-solid/faUndo';

const SwipeableListItem = ({ className, children, onSwipeRight, onSwipeLeft, rightSwipeElement, leftSwipeElement }) => {
  let onTransitionEnd;
  const onChangeIndex = (index, indexLatest, meta) => {
    onTransitionEnd = index === 0 ? onSwipeLeft : index === 2 ? onSwipeRight : null;
  };
  return (
    <li className={className}>
      <SwipeableViews
        index={1}
        onTransitionEnd={() => onTransitionEnd && onTransitionEnd()}
        onChangeIndex={onChangeIndex}
      >
        {leftSwipeElement}
        {children}
        {rightSwipeElement}
      </SwipeableViews>
    </li>
  );
};

export default SwipeableListItem;

export const SwipedItemAcknowledged = () => (
  <div className="d-flex bg-success text-white p-3 h-100 justify-content-end">
    <FontAwesomeIcon icon={faCheck} className="align-self-center" />
  </div>
);

export const SwipedItemRemoved = () => (
  <div className="bg-danger text-white p-3 h-100">
    <FontAwesomeIcon icon={faTimes} className="align-self-center" />
  </div>
);

export const SwipedItemCanceled = () => (
  <div className="d-flex bg-warning text-white p-3 h-100 justify-content-end">
    <FontAwesomeIcon icon={faUndo} className="align-self-center" />
  </div>
);
