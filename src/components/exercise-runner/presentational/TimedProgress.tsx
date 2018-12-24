import React, { PureComponent } from 'react';
import classNames from 'classnames';
import './styles.css';
import { faRedo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export type TimedProgressProps = {
  totalTime: number;
  tick_ms?: number;
  theme?: 'rest' | 'exercise';
  onFinished: () => void;
};
export type TimedProgressState = {
  remainingTime: number;
  status: 'STOPPED' | 'RUNNING' | 'FINISHED';
};

export class TimedProgress extends PureComponent<TimedProgressProps, TimedProgressState> {
  constructor(props: TimedProgressProps) {
    super(props);
    this.state = {
      remainingTime: this.props.totalTime,
      status: 'STOPPED'
    };
  }

  static defaultProps = {
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
