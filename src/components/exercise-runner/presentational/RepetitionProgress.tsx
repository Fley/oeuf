import React from 'react';
import { faDumbbell, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export type RepetitionProgressProps = {
  kg: number;
  repetition: number;
  onFinished: () => void;
};

export const RepetitionProgress = ({ onFinished, kg, repetition }: RepetitionProgressProps) => (
  <>
    <div className="d-flex justify-content-around align-items-center">
      <FontAwesomeIcon className="m-2 display-3" icon={faDumbbell} aria-label="weight in kg" />
      <span className="m-2 text-primary display-2">{kg}</span>
    </div>
    <div className="d-flex justify-content-around align-items-center">
      <FontAwesomeIcon className="m-2 display-2" icon={faTimes} aria-label="repetition" />
      <span className="m-2 text-primary display-3">{repetition}</span>
    </div>
  </>
);
