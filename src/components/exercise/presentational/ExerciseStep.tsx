import React from 'react';
import { SortableHandle } from 'react-sortable-hoc';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faDumbbell, faTimes, faHandPaper, faClock } from '@fortawesome/free-solid-svg-icons';
import { StepRepetition as StepRepetitionType, StepTimed as StepTimedType } from '../../../store/types';

const DragHandle = SortableHandle(() => (
  <div className="list-group-item-drag-handle" style={{ width: '1em' }}>
    <FontAwesomeIcon icon={faBars} />
  </div>
));

const InputNumber = ({
  defaultValue,
  placeholder,
  onChange
}: {
  defaultValue: number;
  placeholder: string;
  onChange: (e: React.SyntheticEvent<HTMLInputElement>) => void;
}) => (
  <input
    type="number"
    className="form-control form-control-sm mx-auto"
    placeholder={placeholder}
    defaultValue={`${defaultValue}`}
    onChange={onChange}
    min="0"
    max="999"
    style={{ width: '4em' }}
    required
  />
);

export type StepRepetitionProps = {
  kg: StepRepetitionType['kg'];
  repetition: StepRepetitionType['repetition'];
  rest: StepRepetitionType['rest'];
  onContentChange: (content: Partial<StepRepetitionType>) => void;
};

export const StepRepetition = ({ kg, repetition, rest, onContentChange }: StepRepetitionProps) => (
  <div className="d-flex justify-content-between p-3">
    <div>
      <InputNumber
        defaultValue={kg}
        placeholder="Kg"
        onChange={(e: React.SyntheticEvent<HTMLInputElement>) =>
          onContentChange({ kg: parseFloat(e.currentTarget.value) })
        }
      />
    </div>
    <div>
      <InputNumber
        defaultValue={repetition}
        placeholder="Repetition"
        onChange={e => onContentChange({ repetition: parseFloat(e.currentTarget.value) })}
      />
    </div>
    <div>
      <InputNumber
        defaultValue={rest}
        placeholder="Rest"
        onChange={e => onContentChange({ rest: parseFloat(e.currentTarget.value) })}
      />
    </div>
    <DragHandle />
  </div>
);

export const HeaderStepRepetition = () => (
  <header className="list-group-item-header border-top-0 border-left-0 border-right-0 d-flex justify-content-between text-dark text-center">
    <div style={{ width: '4em' }}>
      <FontAwesomeIcon icon={faDumbbell} size="lg" />
    </div>
    <div style={{ width: '4em' }}>
      <FontAwesomeIcon icon={faTimes} size="lg" />
    </div>
    <div style={{ width: '4em' }}>
      <FontAwesomeIcon icon={faHandPaper} size="lg" />
    </div>
    <div style={{ width: '1em' }} />
  </header>
);

export const HeaderStepTimed = () => (
  <header className="list-group-item-header border-top-0 border-left-0 border-right-0 d-flex justify-content-between text-dark text-center">
    <div style={{ width: '4em' }}>
      <FontAwesomeIcon icon={faClock} size="lg" />
    </div>
    <div style={{ width: '4em' }}>
      <FontAwesomeIcon icon={faHandPaper} size="lg" />
    </div>
    <div style={{ width: '1em' }} />
  </header>
);

export type StepTimedProps = {
  duration: StepTimedType['duration'];
  rest: StepTimedType['rest'];
  onContentChange: (content: Partial<StepTimedType>) => void;
};

export const StepTimed = ({ duration, rest, onContentChange }: StepTimedProps) => (
  <div className="d-flex justify-content-between p-3">
    <div>
      <InputNumber
        defaultValue={duration}
        placeholder="Duration"
        onChange={e => onContentChange({ duration: parseFloat(e.currentTarget.value) })}
      />
    </div>
    <div>
      <InputNumber
        defaultValue={rest}
        placeholder="Rest"
        onChange={e => onContentChange({ rest: parseFloat(e.currentTarget.value) })}
      />
    </div>
    <DragHandle />
  </div>
);
