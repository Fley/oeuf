import React, { PureComponent } from 'react';
import './styles.css';

export class TimedProgress extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      time: this.props.time,
      status: 'STOPPED'
    };
  }

  static defaultProps = {
    tick_ms: 1000,
    onFinished: () => {
      return;
    }
  };

  intervalId = null;
  timeoutId = null;

  clearTimers = () => {
    clearInterval(this.intervalId);
    this.intervalId = null;
    clearTimeout(this.timeoutId);
    this.timeoutId = null;
  };
  startTimers = () => {
    this.tick();
    this.clearTimers();
    this.intervalId = setInterval(this.tick, this.props.tick_ms);
    this.timeoutId = setTimeout(this.finish, this.state.time * 1000);
  };

  start = () => {
    if (this.state.status !== 'RUNNING' && this.state.time > 0) {
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
    this.setState({ status: 'FINISHED', time: 0 });
  };
  reset = () => {
    this.setState({ time: this.props.time }, () => {
      if (this.state.status === 'RUNNING') this.startTimers();
    });
  };
  tick = () => {
    this.setState(state => {
      const newTime = state.time - this.props.tick_ms / 1000;
      return newTime >= 0 ? { time: newTime } : {};
    });
  };

  onTapTimer = () => (this.state.status === 'RUNNING' ? this.stop() : this.start());

  getStrokeDashoffset = (percentage = 0) => {
    const r = 90;
    const c = Math.PI * (r * 2);

    return percentage * c;
  };

  render() {
    const { status, time } = this.state;
    return (
      <div
        className="d-flex align-items-center w-100 text-center bg-light text-dark"
        style={{
          height: '100vh',
          position: 'fixed',
          top: 0,
          left: 0
        }}
      >
        <div className="m-auto">
          <div>{status}</div>
          <div className="timer-container" onClick={this.onTapTimer}>
            <svg
              className="timer-svg"
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
                strokeDashoffset={this.getStrokeDashoffset(time / this.props.time)}
                style={{ transition: `stroke-dashoffset ${this.props.tick_ms / 1000}s linear` }}
              />
            </svg>
            <div className="timer-info d-flex">
              <div className="m-auto display-2">{Math.ceil(time)}</div>
            </div>
          </div>
          {
            <div className="m-5">
              <button className="btn btn-sm btn-primary m-1" onClick={this.reset}>
                Reset
              </button>
            </div>
          }
        </div>
      </div>
    );
  }
}
