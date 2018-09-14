import PropTypes from 'prop-types';

export const STEP_REPETITION_PROPS = {
  id: PropTypes.string.isRequired,
  kg: PropTypes.number,
  repetition: PropTypes.number,
  rest: PropTypes.number,
  done: PropTypes.bool
};
export const STEP_REPETITION_TYPE = PropTypes.shape(STEP_REPETITION_PROPS);

export const STEP_TIMED_PROPS = {
  id: PropTypes.string.isRequired,
  duration: PropTypes.number,
  rest: PropTypes.number,
  done: PropTypes.bool
};
export const STEP_TIMED_TYPE = PropTypes.shape(STEP_TIMED_PROPS);

export const STEP_TYPE = PropTypes.oneOf([STEP_TIMED_TYPE, STEP_REPETITION_TYPE]);

export const TYPE_TIMED = 'timed';
export const TYPE_REPETITION = 'repetition';

export const PROGRESS = {
  STARTED: 'started',
  STOPPED: 'stopped',
  PAUSED: 'paused'
};

export const PROGRESS_PROPS = {
  status: PropTypes.oneOf([PROGRESS.STARTED, PROGRESS.STOPPED, PROGRESS.PAUSED]),
  startedAt: PropTypes.instanceOf(Date)
};
export const PROGRESS_TYPE = PropTypes.shape(PROGRESS_PROPS);

export const EXERCISE_PROPS = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  type: PropTypes.oneOf([TYPE_TIMED, TYPE_REPETITION]),
  steps: PropTypes.arrayOf(STEP_TYPE),
  done: PropTypes.bool,
  progress: PROGRESS_TYPE
};
export const EXERCISE_TYPE = PropTypes.shape(EXERCISE_PROPS);
