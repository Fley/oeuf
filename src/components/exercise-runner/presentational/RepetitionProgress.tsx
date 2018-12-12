import React from 'react';
import { faCheck, faDumbbell, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export type RepetitionProgressProps = {
  kg: number;
  repetition: number;
  onFinished: () => void;
};

export const RepetitionProgress = ({ onFinished, kg, repetition }: RepetitionProgressProps) => (
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
      <div className="d-flex justify-content-around align-items-center">
        <FontAwesomeIcon className="m-2 display-3" icon={faDumbbell} aria-label="weight in kg" />
        <span className="m-2 text-primary display-2">{kg}</span>
      </div>
      <div className="d-flex justify-content-around align-items-center">
        <FontAwesomeIcon className="m-2 display-2" icon={faTimes} aria-label="repetition" />
        <span className="m-2 text-primary display-3">{repetition}</span>
      </div>
      <div className="my-5">
        <button className="btn btn-outline-success btn-block m-1" onClick={onFinished}>
          <FontAwesomeIcon icon={faCheck} /> Done
        </button>
      </div>
    </div>
  </div>
);
