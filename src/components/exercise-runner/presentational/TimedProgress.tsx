import React, { PureComponent, FC, useReducer, useEffect } from 'react';
import classNames from 'classnames';
import './styles.css';
import { faRedo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export type TimedProgressProps = {
  totalTime: number;
  tick_ms?: number;
  theme?: 'rest' | 'exercise';
  onFinished?: () => void;
};
export type TimedProgressState = {
  remainingTime: number;
  status: 'STOPPED' | 'RUNNING' | 'FINISHED' | 'RESETING';
};

export const TimedProgress: FC<TimedProgressProps> = ({
  totalTime,
  tick_ms = 1000,
  theme = 'exercise',
  onFinished = () => {}
}) => {
  // Use reducer
  const initialState: TimedProgressState = {
    remainingTime: totalTime,
    status: 'STOPPED'
  };
  const reducer = (
    state: TimedProgressState,
    action: {
      type: 'START' | 'STOP' | 'FINISH' | 'RESET' | 'TICK';
    }
  ): TimedProgressState => {
    switch (action.type) {
      case 'START':
        // Should start timeout + interval
        return { ...state, status: 'RUNNING' };
      case 'STOP':
        // Should clear timeout + interval
        return { ...state, status: 'STOPPED' };
      case 'FINISH':
        // Should clear timeout + interval
        // Should call onFinished()
        return { status: 'FINISHED', remainingTime: 0 };
      case 'RESET':
        // Should restart timeout
        return { status: 'RESETING', remainingTime: totalTime };
      case 'TICK':
        const newTime = state.remainingTime - tick_ms! / 1000;
        return { ...state, remainingTime: newTime > 0 ? newTime : 0 };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  // Actions
  const start = () => dispatch({ type: 'START' });
  const stop = () => dispatch({ type: 'STOP' });
  const finish = () => {
    dispatch({ type: 'FINISH' });
    onFinished();
  };
  const reset = () => {
    dispatch({ type: 'RESET' });
    stop();
    start();
  };
  const tick = () => dispatch({ type: 'TICK' });
  const onTapTimer = () => (state.status === 'RUNNING' ? stop() : start());

  // Effect
  useEffect(() => {
    let intervalId: number | undefined;
    let timeoutId: number | undefined;

    const clearTimers = () => {
      intervalId && clearInterval(intervalId);
      intervalId = undefined;
      timeoutId && clearTimeout(timeoutId);
      timeoutId = undefined;
    };

    const startTimers = () => {
      console.log('hello');
      tick();
      clearTimers();
      intervalId = window.setInterval(tick, tick_ms);
      timeoutId = window.setTimeout(finish, state.remainingTime * 1000);
    };

    switch (state.status) {
      case 'RUNNING':
        startTimers();
        break;
      case 'RESETING':
        start();
      case 'FINISHED':
      case 'STOPPED':
        clearTimers();
        break;
    }

    return () => {
      // Clean up
      clearTimers();
    };
  }, [state.status]);

  const getStrokeDashoffset = (percentage = 0) => {
    const r = 90;
    const c = Math.PI * (r * 2);

    return percentage * c;
  };

  return (
    <>
      <div>{status}</div>
      <div className={classNames('timer-container', { rest: theme === 'rest' })} onClick={onTapTimer}>
        <svg
          className="timer-svg m-auto d-flex"
          width="200"
          height="200"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          transform="rotate(-90)"
        >
          <filter xmlns="http://www.w3.org/2000/svg" id="dropshadow" height="130%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
            <feOffset dx="2" dy="2" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.2" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <circle
            className="progress-bar"
            filter="url(#dropshadow)"
            r="90"
            cx="100"
            cy="100"
            fill="transparent"
            strokeDasharray="565.48"
            strokeDashoffset="0"
          />
          <circle
            className="bar"
            r="90"
            cx="100"
            cy="100"
            fill="transparent"
            strokeDasharray="565.48"
            strokeDashoffset={getStrokeDashoffset(state.remainingTime / totalTime)}
            style={status === 'RUNNING' ? { transition: `stroke-dashoffset ${tick_ms! / 1000}s linear` } : {}}
          />
        </svg>
        <div className="timer-info d-flex">
          <div className="m-auto display-2">{Math.ceil(state.remainingTime)}</div>
        </div>
      </div>
      <div className="my-2">
        <button className="btn btn-block btn-link m-1" onClick={reset}>
          <FontAwesomeIcon flip="horizontal" icon={faRedo} /> Reset
        </button>
      </div>
    </>
  );
};

export class OldTimedProgress extends PureComponent<TimedProgressProps, TimedProgressState> {
  constructor(props: TimedProgressProps) {
    super(props);
    this.state = {
      remainingTime: this.props.totalTime,
      status: 'STOPPED'
    };
  }

  static defaultProps: Pick<TimedProgressProps, 'onFinished' | 'tick_ms' | 'theme'> = {
    tick_ms: 1000,
    theme: 'exercise',
    onFinished: () => {
      return;
    }
  };

  intervalId?: number;
  timeoutId?: number;

  clearTimers = () => {
    this.intervalId && clearInterval(this.intervalId);
    this.intervalId = undefined;
    this.timeoutId && clearTimeout(this.timeoutId);
    this.timeoutId = undefined;
  };
  startTimers = () => {
    this.tick();
    this.clearTimers();
    this.intervalId = window.setInterval(this.tick, this.props.tick_ms);
    this.timeoutId = window.setTimeout(this.finish, this.state.remainingTime * 1000);
  };

  start = () => {
    if (this.state.status !== 'RUNNING' && this.state.remainingTime > 0) {
      this.setState({ status: 'RUNNING' }, () => {
        this.startTimers();
      });
    }
  };
  stop = () => {
    this.clearTimers();
    this.setState({ status: 'STOPPED' });
  };
  finish = () => {
    this.clearTimers();
    this.setState({ status: 'FINISHED', remainingTime: 0 });
    this.props.onFinished!();
  };
  reset = () => {
    this.setState({ remainingTime: this.props.totalTime }, () => {
      if (this.state.status === 'RUNNING') this.startTimers();
    });
  };
  tick = () => {
    this.setState(state => {
      const newTime = state.remainingTime - this.props.tick_ms! / 1000;
      return newTime >= 0 ? { remainingTime: newTime } : { remainingTime: 0 };
    });
  };

  onTapTimer = () => (this.state.status === 'RUNNING' ? this.stop() : this.start());

  getStrokeDashoffset = (percentage = 0) => {
    const r = 90;
    const c = Math.PI * (r * 2);

    return percentage * c;
  };

  componentDidMount() {
    if (this.props.theme === 'rest') {
      this.start();
    }
  }
  componentWillUnmount() {
    this.clearTimers();
  }

  render() {
    const { status, remainingTime } = this.state;
    return (
      <>
        <div>{status}</div>
        <div className={classNames('timer-container', { rest: this.props.theme === 'rest' })} onClick={this.onTapTimer}>
          <svg
            className="timer-svg m-auto d-flex"
            width="200"
            height="200"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            transform="rotate(-90)"
          >
            <filter xmlns="http://www.w3.org/2000/svg" id="dropshadow" height="130%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
              <feOffset dx="2" dy="2" result="offsetblur" />
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.2" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <circle
              className="progress-bar"
              filter="url(#dropshadow)"
              r="90"
              cx="100"
              cy="100"
              fill="transparent"
              strokeDasharray="565.48"
              strokeDashoffset="0"
            />
            <circle
              className="bar"
              r="90"
              cx="100"
              cy="100"
              fill="transparent"
              strokeDasharray="565.48"
              strokeDashoffset={this.getStrokeDashoffset(remainingTime / this.props.totalTime)}
              style={
                status === 'RUNNING' ? { transition: `stroke-dashoffset ${this.props.tick_ms! / 1000}s linear` } : {}
              }
            />
          </svg>
          <div className="timer-info d-flex">
            <div className="m-auto display-2">{Math.ceil(remainingTime)}</div>
          </div>
        </div>
        <div className="my-2">
          <button className="btn btn-block btn-link m-1" onClick={this.reset}>
            <FontAwesomeIcon flip="horizontal" icon={faRedo} /> Reset
          </button>
        </div>
      </>
    );
  }
}
