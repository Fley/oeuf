import React from 'react';
import SwipeableViews from 'react-swipeable-views';

const SwipeableListGroupItem = ({
  className,
  children,
  onSwipeRight,
  onSwipeLeft,
  rightSwipeElement,
  leftSwipeElement
}) => {
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

export default SwipeableListGroupItem;
